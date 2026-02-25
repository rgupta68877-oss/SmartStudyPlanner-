const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";
const ALLOWED_ORIGINS = String(process.env.FRONTEND_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const UPDATES_FILE = path.join(DATA_DIR, "teacher-updates.json");
const SCORES_FILE = path.join(DATA_DIR, "quiz-scores.json");
const FLASHCARDS_FILE = path.join(DATA_DIR, "flashcards.json");
const SHARED_NOTES_FILE = path.join(DATA_DIR, "shared-notes.json");
const PRESENCE_TTL_MS = Math.max(30_000, Number(process.env.PRESENCE_TTL_MS || 60_000));
const presenceByClientId = new Map();

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson(filePath, fallback) {
    try {
        if (!fs.existsSync(filePath)) return fallback;
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (_) {
        return fallback;
    }
}

function writeJson(filePath, value) {
    fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

function issueToken(user) {
    return jwt.sign(
        { email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: "12h" }
    );
}

function authenticateJWT(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ error: "Missing bearer token" });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        return next();
    } catch (_) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden for current role" });
        }
        return next();
    };
}

function normalizePresenceRole(role) {
    const normalized = String(role || "").trim().toLowerCase();
    return ["student", "teacher", "admin"].includes(normalized) ? normalized : "student";
}

function cleanupPresence(now = Date.now()) {
    for (const [clientId, meta] of presenceByClientId.entries()) {
        if (!meta || now - Number(meta.lastSeen || 0) > PRESENCE_TTL_MS) {
            presenceByClientId.delete(clientId);
        }
    }
}

function getPresenceSnapshot() {
    const now = Date.now();
    cleanupPresence(now);
    let onlineStudents = 0;
    let onlineTotal = 0;

    for (const meta of presenceByClientId.values()) {
        if (!meta) continue;
        onlineTotal += 1;
        if (meta.role === "student") {
            onlineStudents += 1;
        }
    }

    return {
        onlineStudents,
        onlineTotal,
        asOf: new Date(now).toISOString()
    };
}

function ensureSeedAdmin() {
    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "";
    if (!adminEmail || !adminPassword) return;

    const users = readJson(USERS_FILE, []);
    if (users.some((u) => u.email === adminEmail)) return;

    users.push({
        id: `user-${Date.now()}`,
        name: process.env.ADMIN_NAME || "Initial Admin",
        email: adminEmail,
        role: "admin",
        passwordHash: bcrypt.hashSync(adminPassword, 10),
        createdAt: new Date().toISOString()
    });
    writeJson(USERS_FILE, users);
}

ensureSeedAdmin();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }
        if (ALLOWED_ORIGINS.length === 0) {
            callback(null, true);
            return;
        }
        callback(null, ALLOWED_ORIGINS.includes(origin));
    }
}));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "smart-study-planner-backend" });
});

app.post("/api/presence/ping", (req, res) => {
    const clientId = String(req.body?.clientId || "").trim().slice(0, 128);
    if (!clientId) {
        return res.status(400).json({ error: "clientId is required" });
    }

    const role = normalizePresenceRole(req.body?.role);
    const email = String(req.body?.email || "").trim().toLowerCase().slice(0, 256);

    presenceByClientId.set(clientId, {
        role,
        email,
        lastSeen: Date.now()
    });

    return res.json(getPresenceSnapshot());
});

app.get("/api/presence/online-students", (_req, res) => {
    return res.json(getPresenceSnapshot());
});

app.post("/api/presence/logout", (req, res) => {
    const clientId = String(req.body?.clientId || "").trim().slice(0, 128);
    if (clientId) {
        presenceByClientId.delete(clientId);
    }
    return res.json(getPresenceSnapshot());
});

app.post("/api/auth/register", async (req, res) => {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const role = ["student", "teacher", "admin"].includes(req.body.role) ? req.body.role : "student";

    if (!name || !email || password.length < 6) {
        return res.status(400).json({ error: "name, valid email, password(>=6) required" });
    }

    const users = readJson(USERS_FILE, []);
    if (users.some((u) => u.email === email)) {
        return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        passwordHash,
        createdAt: new Date().toISOString()
    };
    users.push(user);
    writeJson(USERS_FILE, users);
    const token = issueToken(user);
    return res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

app.post("/api/auth/login", async (req, res) => {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const users = readJson(USERS_FILE, []);
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash || "");
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = issueToken(user);
    return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

app.get("/api/auth/me", authenticateJWT, (req, res) => {
    return res.json({ user: req.user });
});

app.get("/api/teacher-updates", (_req, res) => {
    const updates = readJson(UPDATES_FILE, []);
    res.json(updates);
});

app.get("/api/shared-notes", (_req, res) => {
    const notes = readJson(SHARED_NOTES_FILE, []);
    res.json(Array.isArray(notes) ? notes : []);
});

app.post("/api/shared-notes", authenticateJWT, authorizeRoles("teacher", "admin"), (req, res) => {
    const title = String(req.body?.title || "").trim();
    const subject = String(req.body?.subject || "General").trim() || "General";
    const level = String(req.body?.level || "General").trim() || "General";
    const content = String(req.body?.content || "").trim();

    if (!title || !content) {
        return res.status(400).json({ error: "title and content are required" });
    }

    const notes = readJson(SHARED_NOTES_FILE, []);
    const note = {
        id: req.body?.id || `shared-note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        subject,
        level,
        content,
        createdAt: req.body?.createdAt || new Date().toISOString(),
        by: req.user?.name || req.user?.email || "admin"
    };

    const next = Array.isArray(notes) ? notes : [];
    next.unshift(note);
    writeJson(SHARED_NOTES_FILE, next.slice(0, 2000));
    return res.status(201).json(note);
});

app.delete("/api/shared-notes/:id", authenticateJWT, authorizeRoles("teacher", "admin"), (req, res) => {
    const id = String(req.params?.id || "").trim();
    if (!id) return res.status(400).json({ error: "id is required" });

    const notes = readJson(SHARED_NOTES_FILE, []);
    if (!Array.isArray(notes) || notes.length === 0) {
        return res.status(404).json({ error: "Note not found" });
    }

    const next = notes.filter((note) => String(note?.id || "") !== id);
    if (next.length === notes.length) {
        return res.status(404).json({ error: "Note not found" });
    }

    writeJson(SHARED_NOTES_FILE, next);
    return res.json({ ok: true, id });
});

app.post("/api/teacher-updates", authenticateJWT, authorizeRoles("teacher", "admin"), (req, res) => {
    const updates = readJson(UPDATES_FILE, []);
    const update = {
        id: req.body.id || `upd-${Date.now()}`,
        title: req.body.title || "Update",
        message: req.body.message || "",
        by: req.body.by || `${req.user.name || "Teacher"} (${req.user.role})`,
        createdAt: req.body.createdAt || new Date().toISOString()
    };
    updates.unshift(update);
    writeJson(UPDATES_FILE, updates.slice(0, 200));
    res.status(201).json(update);
});

app.post("/api/quiz-scores", (req, res) => {
    const scores = readJson(SCORES_FILE, []);
    const score = {
        id: req.body.id || `quiz-${Date.now()}`,
        userEmail: req.body.userEmail || "unknown",
        userName: req.body.userName || "Unknown",
        score: Number(req.body.score || 0),
        total: Number(req.body.total || 0),
        percent: Number(req.body.percent || 0),
        createdAt: req.body.createdAt || new Date().toISOString()
    };
    scores.unshift(score);
    writeJson(SCORES_FILE, scores.slice(0, 1000));
    res.status(201).json(score);
});

app.get("/api/admin/quiz-scores", authenticateJWT, authorizeRoles("teacher", "admin"), (_req, res) => {
    const scores = readJson(SCORES_FILE, []);
    res.json(scores);
});

app.get("/api/flashcards", authenticateJWT, (req, res) => {
    const allFlashcards = readJson(FLASHCARDS_FILE, {});
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userFlashcards = allFlashcards[userEmail] || {};
    return res.json({ flashcards: userFlashcards });
});

app.put("/api/flashcards", authenticateJWT, (req, res) => {
    const incoming = req.body?.flashcards;
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
        return res.status(400).json({ error: "flashcards object is required" });
    }

    const allFlashcards = readJson(FLASHCARDS_FILE, {});
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    allFlashcards[userEmail] = incoming;
    writeJson(FLASHCARDS_FILE, allFlashcards);
    return res.json({ ok: true });
});

app.post("/api/flashcards/decks", authenticateJWT, (req, res) => {
    const deck = String(req.body?.deck || "").trim();
    if (!deck) {
        return res.status(400).json({ error: "deck is required" });
    }

    const allFlashcards = readJson(FLASHCARDS_FILE, {});
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userFlashcards = allFlashcards[userEmail] && typeof allFlashcards[userEmail] === "object"
        ? allFlashcards[userEmail]
        : {};

    if (!Array.isArray(userFlashcards[deck])) {
        userFlashcards[deck] = [];
    }

    allFlashcards[userEmail] = userFlashcards;
    writeJson(FLASHCARDS_FILE, allFlashcards);
    return res.status(201).json({ ok: true, deck });
});

app.post("/api/flashcards/cards", authenticateJWT, (req, res) => {
    const deck = String(req.body?.deck || "").trim();
    const front = String(req.body?.front || "").trim();
    const back = String(req.body?.back || "").trim();

    if (!deck || !front || !back) {
        return res.status(400).json({ error: "deck, front, and back are required" });
    }

    const allFlashcards = readJson(FLASHCARDS_FILE, {});
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userFlashcards = allFlashcards[userEmail] && typeof allFlashcards[userEmail] === "object"
        ? allFlashcards[userEmail]
        : {};

    if (!Array.isArray(userFlashcards[deck])) {
        userFlashcards[deck] = [];
    }

    const card = {
        id: `card-${Date.now()}`,
        front,
        back,
        createdAt: new Date().toISOString()
    };
    userFlashcards[deck].push(card);
    allFlashcards[userEmail] = userFlashcards;
    writeJson(FLASHCARDS_FILE, allFlashcards);
    return res.status(201).json({ ok: true, card });
});

app.post("/api/reminders/send", authenticateJWT, authorizeRoles("teacher", "admin"), async (req, res) => {
    const { to, task, dueDate } = req.body || {};
    if (!to || !task || !dueDate) {
        return res.status(400).json({ error: "to, task, and dueDate are required" });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || "false") === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject: `Task Reminder: ${task}`,
            text: `Reminder: "${task}" is due on ${dueDate}.`,
            html: `<p>Reminder:</p><p><strong>${task}</strong> is due on <strong>${dueDate}</strong>.</p>`
        });
        return res.json({ ok: true, messageId: info.messageId });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

setInterval(() => {
    cleanupPresence();
}, Math.max(15_000, Math.floor(PRESENCE_TTL_MS / 2)));
