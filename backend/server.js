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
const PEER_CHALLENGES_FILE = path.join(DATA_DIR, "peer-challenges.json");
const STUDY_GROUPS_FILE = path.join(DATA_DIR, "study-groups.json");
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

function getTodayKeyUTC() {
    return new Date().toISOString().slice(0, 10);
}

function toDateKey(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

function addDays(dateKey, dayCount) {
    const base = new Date(`${dateKey}T00:00:00.000Z`);
    if (Number.isNaN(base.getTime())) return dateKey;
    base.setUTCDate(base.getUTCDate() + Number(dayCount || 0));
    return base.toISOString().slice(0, 10);
}

function daysBetween(dateA, dateB) {
    const a = new Date(`${dateA}T00:00:00.000Z`);
    const b = new Date(`${dateB}T00:00:00.000Z`);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function randomChallengeCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < 8; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

function normalizeParticipant(value) {
    const participant = value && typeof value === "object" ? value : {};
    const checkins = Array.isArray(participant.checkins)
        ? [...new Set(participant.checkins.map((d) => String(d || "").slice(0, 10)).filter(Boolean))].sort()
        : [];
    return {
        email: String(participant.email || "").trim().toLowerCase(),
        name: String(participant.name || "").trim() || "Student",
        role: ["student", "teacher", "admin"].includes(participant.role) ? participant.role : "student",
        joinedAt: participant.joinedAt || new Date().toISOString(),
        checkins,
        currentStreak: Math.max(0, Number(participant.currentStreak) || 0),
        bestStreak: Math.max(0, Number(participant.bestStreak) || 0),
        lastCheckinDate: String(participant.lastCheckinDate || "")
    };
}

function normalizePeerChallenge(value) {
    const challenge = value && typeof value === "object" ? value : {};
    const durationDays = Math.max(1, Math.min(30, Number(challenge.durationDays) || 7));
    const startDate = String(challenge.startDate || getTodayKeyUTC()).slice(0, 10);
    const endDate = String(challenge.endDate || addDays(startDate, durationDays - 1)).slice(0, 10);
    const participants = Array.isArray(challenge.participants)
        ? challenge.participants.map(normalizeParticipant).filter((p) => p.email)
        : [];
    const today = getTodayKeyUTC();
    const active = today <= endDate;
    return {
        id: String(challenge.id || `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        code: String(challenge.code || randomChallengeCode()).trim().toUpperCase(),
        name: String(challenge.name || "7-Day Streak Challenge").trim() || "7-Day Streak Challenge",
        durationDays,
        startDate,
        endDate,
        createdBy: String(challenge.createdBy || "").trim().toLowerCase(),
        createdAt: challenge.createdAt || new Date().toISOString(),
        status: active ? "active" : "completed",
        participants
    };
}

function getPeerChallenges() {
    const raw = readJson(PEER_CHALLENGES_FILE, []);
    return Array.isArray(raw) ? raw.map(normalizePeerChallenge) : [];
}

function savePeerChallenges(challenges) {
    const safe = Array.isArray(challenges) ? challenges.map(normalizePeerChallenge) : [];
    writeJson(PEER_CHALLENGES_FILE, safe.slice(0, 500));
}

function normalizeStudyGroupMember(value) {
    const member = value && typeof value === "object" ? value : {};
    const checkins = Array.isArray(member.checkins)
        ? [...new Set(member.checkins.map((d) => String(d || "").slice(0, 10)).filter(Boolean))].sort()
        : [];
    return {
        email: String(member.email || "").trim().toLowerCase(),
        name: String(member.name || "").trim() || "Student",
        role: ["student", "teacher", "admin"].includes(member.role) ? member.role : "student",
        joinedAt: member.joinedAt || new Date().toISOString(),
        checkins,
        currentStreak: Math.max(0, Number(member.currentStreak) || 0),
        bestStreak: Math.max(0, Number(member.bestStreak) || 0),
        lastCheckinDate: String(member.lastCheckinDate || "")
    };
}

function normalizeStudyGroupGoal(value) {
    const goal = value && typeof value === "object" ? value : {};
    return {
        id: String(goal.id || `group-goal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        text: String(goal.text || "").trim(),
        createdBy: String(goal.createdBy || "").trim().toLowerCase(),
        createdByName: String(goal.createdByName || "").trim() || "Student",
        createdAt: goal.createdAt || new Date().toISOString()
    };
}

function normalizeStudyGroupDoubt(value) {
    const doubt = value && typeof value === "object" ? value : {};
    return {
        id: String(doubt.id || `group-doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        text: String(doubt.text || "").trim(),
        subject: String(doubt.subject || "General").trim() || "General",
        createdBy: String(doubt.createdBy || "").trim().toLowerCase(),
        createdByName: String(doubt.createdByName || "").trim() || "Student",
        createdAt: doubt.createdAt || new Date().toISOString()
    };
}

function normalizeStudyGroup(value) {
    const group = value && typeof value === "object" ? value : {};
    const durationDays = Math.max(1, Math.min(60, Number(group.durationDays) || 30));
    const startDate = String(group.startDate || getTodayKeyUTC()).slice(0, 10);
    const endDate = String(group.endDate || addDays(startDate, durationDays - 1)).slice(0, 10);
    const members = Array.isArray(group.members)
        ? group.members.map(normalizeStudyGroupMember).filter((m) => m.email)
        : [];
    const goals = Array.isArray(group.goals)
        ? group.goals.map(normalizeStudyGroupGoal).filter((g) => g.text).slice(0, 200)
        : [];
    const doubts = Array.isArray(group.doubts)
        ? group.doubts.map(normalizeStudyGroupDoubt).filter((d) => d.text).slice(0, 500)
        : [];
    const today = getTodayKeyUTC();
    const active = today <= endDate;
    return {
        id: String(group.id || `room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        code: String(group.code || randomChallengeCode()).trim().toUpperCase(),
        name: String(group.name || "Study Room").trim() || "Study Room",
        durationDays,
        startDate,
        endDate,
        createdBy: String(group.createdBy || "").trim().toLowerCase(),
        createdAt: group.createdAt || new Date().toISOString(),
        status: active ? "active" : "completed",
        members,
        goals,
        doubts
    };
}

function getStudyGroups() {
    const raw = readJson(STUDY_GROUPS_FILE, []);
    return Array.isArray(raw) ? raw.map(normalizeStudyGroup) : [];
}

function saveStudyGroups(groups) {
    const safe = Array.isArray(groups) ? groups.map(normalizeStudyGroup) : [];
    writeJson(STUDY_GROUPS_FILE, safe.slice(0, 300));
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

app.get("/api/peer-challenges", authenticateJWT, (req, res) => {
    const email = String(req.user?.email || "").trim().toLowerCase();
    const challenges = getPeerChallenges();
    const mine = challenges.filter((challenge) =>
        Array.isArray(challenge.participants) &&
        challenge.participants.some((participant) => participant.email === email)
    );
    return res.json(mine);
});

app.post("/api/peer-challenges", authenticateJWT, (req, res) => {
    const name = String(req.body?.name || "").trim() || "7-Day Streak Challenge";
    const durationDays = Math.max(1, Math.min(30, Number(req.body?.durationDays) || 7));
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const userRole = ["student", "teacher", "admin"].includes(req.user?.role) ? req.user.role : "student";

    const challenges = getPeerChallenges();
    const usedCodes = new Set(challenges.map((c) => String(c.code || "").toUpperCase()));
    let code = randomChallengeCode();
    let attempts = 0;
    while (usedCodes.has(code) && attempts < 10) {
        code = randomChallengeCode();
        attempts += 1;
    }

    const startDate = getTodayKeyUTC();
    const challenge = normalizePeerChallenge({
        id: `challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        code,
        name,
        durationDays,
        startDate,
        endDate: addDays(startDate, durationDays - 1),
        createdBy: userEmail,
        createdAt: new Date().toISOString(),
        participants: [
            {
                email: userEmail,
                name: userName,
                role: userRole,
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }
        ]
    });

    challenges.unshift(challenge);
    savePeerChallenges(challenges);
    return res.status(201).json(challenge);
});

app.post("/api/peer-challenges/join", authenticateJWT, (req, res) => {
    const code = String(req.body?.code || "").trim().toUpperCase();
    if (!code) {
        return res.status(400).json({ error: "Invite code is required" });
    }

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const userRole = ["student", "teacher", "admin"].includes(req.user?.role) ? req.user.role : "student";

    const challenges = getPeerChallenges();
    const idx = challenges.findIndex((challenge) => String(challenge.code || "").toUpperCase() === code);
    if (idx < 0) {
        return res.status(404).json({ error: "Challenge not found for invite code" });
    }

    const challenge = challenges[idx];
    if (challenge.status !== "active") {
        return res.status(400).json({ error: "Challenge has already ended" });
    }

    const exists = challenge.participants.some((participant) => participant.email === userEmail);
    if (!exists) {
        challenge.participants.push(
            normalizeParticipant({
                email: userEmail,
                name: userName,
                role: userRole,
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            })
        );
        challenges[idx] = normalizePeerChallenge(challenge);
        savePeerChallenges(challenges);
    }

    return res.json(challenges[idx]);
});

app.post("/api/peer-challenges/:id/checkin", authenticateJWT, (req, res) => {
    const id = String(req.params?.id || "").trim();
    if (!id) return res.status(400).json({ error: "Challenge id is required" });

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const today = getTodayKeyUTC();

    const challenges = getPeerChallenges();
    const idx = challenges.findIndex((challenge) => challenge.id === id);
    if (idx < 0) return res.status(404).json({ error: "Challenge not found" });

    const challenge = challenges[idx];
    if (today > challenge.endDate) {
        challenge.status = "completed";
        challenges[idx] = normalizePeerChallenge(challenge);
        savePeerChallenges(challenges);
        return res.status(400).json({ error: "Challenge has ended" });
    }

    const pIdx = challenge.participants.findIndex((participant) => participant.email === userEmail);
    if (pIdx < 0) return res.status(403).json({ error: "Join this challenge first" });

    const participant = normalizeParticipant(challenge.participants[pIdx]);
    if (participant.checkins.includes(today)) {
        challenges[idx] = normalizePeerChallenge(challenge);
        return res.json(challenges[idx]);
    }

    const previousDate = participant.lastCheckinDate || "";
    const gap = previousDate ? daysBetween(previousDate, today) : 0;
    if (!previousDate) participant.currentStreak = 1;
    else if (gap === 1) participant.currentStreak += 1;
    else participant.currentStreak = 1;
    participant.bestStreak = Math.max(participant.bestStreak, participant.currentStreak);
    participant.lastCheckinDate = today;
    participant.checkins = [...participant.checkins, today].sort();

    challenge.participants[pIdx] = participant;
    challenges[idx] = normalizePeerChallenge(challenge);
    savePeerChallenges(challenges);
    return res.json(challenges[idx]);
});

app.get("/api/study-groups", authenticateJWT, (req, res) => {
    const email = String(req.user?.email || "").trim().toLowerCase();
    const groups = getStudyGroups();
    const mine = groups.filter((group) =>
        Array.isArray(group.members) &&
        group.members.some((member) => member.email === email)
    );
    return res.json(mine);
});

app.post("/api/study-groups", authenticateJWT, (req, res) => {
    const name = String(req.body?.name || "").trim() || "Study Room";
    const durationDays = Math.max(1, Math.min(60, Number(req.body?.durationDays) || 30));
    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const userRole = ["student", "teacher", "admin"].includes(req.user?.role) ? req.user.role : "student";

    const groups = getStudyGroups();
    const usedCodes = new Set(groups.map((g) => String(g.code || "").toUpperCase()));
    let code = randomChallengeCode();
    let attempts = 0;
    while (usedCodes.has(code) && attempts < 10) {
        code = randomChallengeCode();
        attempts += 1;
    }

    const startDate = getTodayKeyUTC();
    const room = normalizeStudyGroup({
        id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        code,
        name,
        durationDays,
        startDate,
        endDate: addDays(startDate, durationDays - 1),
        createdBy: userEmail,
        createdAt: new Date().toISOString(),
        members: [
            {
                email: userEmail,
                name: userName,
                role: userRole,
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }
        ],
        goals: [],
        doubts: []
    });

    groups.unshift(room);
    saveStudyGroups(groups);
    return res.status(201).json(room);
});

app.post("/api/study-groups/join", authenticateJWT, (req, res) => {
    const code = String(req.body?.code || "").trim().toUpperCase();
    if (!code) {
        return res.status(400).json({ error: "Invite code is required" });
    }

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const userRole = ["student", "teacher", "admin"].includes(req.user?.role) ? req.user.role : "student";
    const groups = getStudyGroups();
    const idx = groups.findIndex((group) => String(group.code || "").toUpperCase() === code);
    if (idx < 0) {
        return res.status(404).json({ error: "Study group not found for invite code" });
    }

    const group = groups[idx];
    if (group.status !== "active") {
        return res.status(400).json({ error: "Study group has ended" });
    }

    const exists = group.members.some((member) => member.email === userEmail);
    if (!exists) {
        group.members.push(
            normalizeStudyGroupMember({
                email: userEmail,
                name: userName,
                role: userRole,
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            })
        );
        groups[idx] = normalizeStudyGroup(group);
        saveStudyGroups(groups);
    }

    return res.json(groups[idx]);
});

app.post("/api/study-groups/:id/checkin", authenticateJWT, (req, res) => {
    const id = String(req.params?.id || "").trim();
    if (!id) return res.status(400).json({ error: "Study group id is required" });

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const today = getTodayKeyUTC();
    const groups = getStudyGroups();
    const idx = groups.findIndex((group) => group.id === id);
    if (idx < 0) return res.status(404).json({ error: "Study group not found" });

    const group = groups[idx];
    if (today > group.endDate) {
        group.status = "completed";
        groups[idx] = normalizeStudyGroup(group);
        saveStudyGroups(groups);
        return res.status(400).json({ error: "Study group has ended" });
    }

    const mIdx = group.members.findIndex((member) => member.email === userEmail);
    if (mIdx < 0) return res.status(403).json({ error: "Join this study group first" });

    const member = normalizeStudyGroupMember(group.members[mIdx]);
    if (member.checkins.includes(today)) {
        groups[idx] = normalizeStudyGroup(group);
        return res.json(groups[idx]);
    }

    const previousDate = member.lastCheckinDate || "";
    const gap = previousDate ? daysBetween(previousDate, today) : 0;
    if (!previousDate) member.currentStreak = 1;
    else if (gap === 1) member.currentStreak += 1;
    else member.currentStreak = 1;
    member.bestStreak = Math.max(member.bestStreak, member.currentStreak);
    member.lastCheckinDate = today;
    member.checkins = [...member.checkins, today].sort();

    group.members[mIdx] = member;
    groups[idx] = normalizeStudyGroup(group);
    saveStudyGroups(groups);
    return res.json(groups[idx]);
});

app.post("/api/study-groups/:id/goals", authenticateJWT, (req, res) => {
    const id = String(req.params?.id || "").trim();
    const text = String(req.body?.text || "").trim();
    if (!id) return res.status(400).json({ error: "Study group id is required" });
    if (!text) return res.status(400).json({ error: "Goal text is required" });

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const groups = getStudyGroups();
    const idx = groups.findIndex((group) => group.id === id);
    if (idx < 0) return res.status(404).json({ error: "Study group not found" });

    const group = groups[idx];
    const isMember = group.members.some((member) => member.email === userEmail);
    if (!isMember) return res.status(403).json({ error: "Join this study group first" });

    group.goals.unshift(normalizeStudyGroupGoal({
        text,
        createdBy: userEmail,
        createdByName: userName,
        createdAt: new Date().toISOString()
    }));
    group.goals = group.goals.slice(0, 200);
    groups[idx] = normalizeStudyGroup(group);
    saveStudyGroups(groups);
    return res.json(groups[idx]);
});

app.post("/api/study-groups/:id/doubts", authenticateJWT, (req, res) => {
    const id = String(req.params?.id || "").trim();
    const text = String(req.body?.text || "").trim();
    const subject = String(req.body?.subject || "General").trim() || "General";
    if (!id) return res.status(400).json({ error: "Study group id is required" });
    if (!text) return res.status(400).json({ error: "Doubt text is required" });

    const userEmail = String(req.user?.email || "").trim().toLowerCase();
    const userName = String(req.user?.name || userEmail || "Student");
    const groups = getStudyGroups();
    const idx = groups.findIndex((group) => group.id === id);
    if (idx < 0) return res.status(404).json({ error: "Study group not found" });

    const group = groups[idx];
    const isMember = group.members.some((member) => member.email === userEmail);
    if (!isMember) return res.status(403).json({ error: "Join this study group first" });

    group.doubts.unshift(normalizeStudyGroupDoubt({
        text,
        subject,
        createdBy: userEmail,
        createdByName: userName,
        createdAt: new Date().toISOString()
    }));
    group.doubts = group.doubts.slice(0, 500);
    groups[idx] = normalizeStudyGroup(group);
    saveStudyGroups(groups);
    return res.json(groups[idx]);
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

setInterval(() => {
    cleanupPresence();
}, Math.max(15_000, Math.floor(PRESENCE_TTL_MS / 2)));
