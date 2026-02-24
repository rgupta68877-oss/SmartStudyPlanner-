// Motivational Quotes
const quotes = [
    "Education is the passport to the future.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner.",
    "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    "The more that you read, the more things you will know.",
    "Study without desire spoils the memory.",
    "An investment in knowledge pays the best interest.",
    "The mind is not a vessel to be filled but a fire to be kindled.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "Dream big and dare to fail.",
    "The only way to do great work is to love what you do."
];

// Data Storage
const APP_STATE_VERSION = 1;
const API_BASE_URL = "http://localhost:4000";
const BACKEND_AUTH_TOKEN_KEY = "backendAdminToken";
const DEFAULT_STUDY_MATERIALS = [
    {
        id: "mat-1",
        title: "Algebra Formula Sheet",
        subject: "Math",
        type: "Cheat Sheet",
        url: "",
        description: "Quick reference formulas for linear equations, identities, and factorization.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "mat-2",
        title: "Newton's Laws Summary",
        subject: "Science",
        type: "Notes",
        url: "",
        description: "Short explanations and daily-life examples of the 3 laws of motion.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "mat-3",
        title: "JavaScript Basics Playlist",
        subject: "Programming",
        type: "Video",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        description: "Beginner-friendly learning path for JavaScript fundamentals.",
        createdAt: "2026-01-01T00:00:00.000Z"
    }
];

const DEFAULT_FREE_NOTES_LIBRARY = [
    {
        id: "note-pack-1",
        title: "Math Class 7 Full Revision",
        subject: "Math",
        level: "Class 7",
        content: "Chapter focus:\n- Integers and operations\n- Fractions and decimals\n- Simple equations\n- Ratio and proportion\n- Lines and angles\n- Perimeter and area\n\nFormulas:\n- Perimeter of rectangle = 2(l + b)\n- Area of rectangle = l x b\n- Area of square = side x side\n\nHow to solve:\n1) Read the question and list given values.\n2) Convert units if needed.\n3) Apply formula step by step.\n4) Write final answer with unit.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-2",
        title: "Science Class 7 Full Revision",
        subject: "Science",
        level: "Class 7",
        content: "Chapter focus:\n- Nutrition in plants and animals\n- Heat and temperature\n- Acids, bases and salts\n- Physical and chemical changes\n- Respiration and transportation\n- Reproduction in plants\n\nQuick points:\n- Photosynthesis makes food in green plants.\n- Acids turn blue litmus red.\n- Bases turn red litmus blue.\n- Physical change is often reversible.\n- Chemical change forms new substance.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-3",
        title: "English Class 7 Full Revision",
        subject: "English",
        level: "Class 7",
        content: "Grammar:\n- Noun, pronoun, adjective, verb, adverb\n- Tenses: present, past, future\n- Subject verb agreement\n- Articles and prepositions\n\nWriting:\n- Paragraph writing: topic sentence, supporting lines, conclusion.\n- Letter writing: sender, date, greeting, body, closing.\n- Story writing: beginning, problem, action, ending.\n\nReading tip:\n- Underline keywords and answer in complete sentences.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-4",
        title: "History Class 7 Full Revision",
        subject: "History",
        level: "Class 7",
        content: "Topics:\n- Medieval kingdoms and rulers\n- Delhi Sultanate overview\n- Mughal Empire basics\n- Towns, traders and crafts\n- Bhakti and Sufi traditions\n\nAnswer strategy:\n- Use timeline words: first, then, later, finally.\n- Mention ruler, period, and major contribution.\n- Keep short answers factual and direct.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-5",
        title: "Programming Class 7 Full Revision",
        subject: "Programming",
        level: "Class 7",
        content: "Basics:\n- Computer parts: input, process, output\n- Algorithm and flowchart\n- Block coding concepts\n- Internet safety and digital citizenship\n\nCoding habits:\n- Break problem into small steps.\n- Test one step at a time.\n- Fix one error at a time.\n- Save versions of your work.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-6",
        title: "General Studies Class 7 Full Revision",
        subject: "General",
        level: "Class 7",
        content: "Skills:\n- Time management and daily routine\n- Note making and mind maps\n- Active recall and spaced revision\n- Exam preparation checklist\n\nDaily plan:\n- 30 min concept study\n- 30 min practice questions\n- 15 min revision\n- 15 min error review",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-7",
        title: "Math Class 8 Full Revision",
        subject: "Math",
        level: "Class 8",
        content: "Chapter focus:\n- Rational numbers\n- Linear equations in one variable\n- Understanding quadrilaterals\n- Data handling\n- Squares and square roots\n- Algebraic identities and factorization\n\nKey identities:\n- (a + b)^2 = a^2 + 2ab + b^2\n- (a - b)^2 = a^2 - 2ab + b^2\n- (a + b)(a - b) = a^2 - b^2",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-8",
        title: "Science Class 8 Full Revision",
        subject: "Science",
        level: "Class 9",
        content: "Chapter focus:\n- Crop production and microorganisms\n- Metals and non metals\n- Coal and petroleum\n- Combustion and flame\n- Cell structure and functions\n- Reproduction in animals\n\nQuick points:\n- Metals are generally malleable and conductive.\n- Non metals are brittle and poor conductors.\n- Conservation of fossil fuels is essential.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-9",
        title: "English Class 8 Full Revision",
        subject: "English",
        level: "Class 8",
        content: "Grammar:\n- Direct and indirect speech\n- Active and passive voice\n- Modals and auxiliaries\n- Clauses and conjunctions\n\nWriting:\n- Formal letter format\n- Notice and message writing\n- Article writing with heading and clear points\n\nReading:\n- Identify theme, tone, and supporting evidence.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-10",
        title: "History Class 8 Full Revision",
        subject: "History",
        level: "Class 8",
        content: "Topics:\n- Rise of British power in India\n- Colonial administration\n- Revolt of 1857\n- Social and religious reform movements\n- Freedom struggle basics\n\nRevision method:\n- Learn cause, event, result for each chapter.\n- Prepare one page timeline for quick review.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-11",
        title: "Programming Class 8 Full Revision",
        subject: "Programming",
        level: "Class 8",
        content: "Coding concepts:\n- Variables and data types\n- Conditionals (if else)\n- Loops (for, while)\n- Functions\n- Debugging basics\n\nPractice plan:\n- Write 5 small programs weekly.\n- Trace outputs line by line.\n- Keep a bug notebook.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-12",
        title: "General Studies Class 8 Full Revision",
        subject: "General",
        level: "Class 8",
        content: "Skills:\n- Goal setting and weekly planning\n- Memory techniques: chunking, mnemonics\n- Presentation and communication basics\n- Healthy study habits\n\nExam checklist:\n- Revise formulas and definitions\n- Solve mixed worksheet\n- Review common mistakes",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-13",
        title: "Math Class 9 Full Revision",
        subject: "Math",
        level: "Class 9",
        content: "Chapter focus:\n- Number systems\n- Polynomials\n- Linear equations in two variables\n- Coordinate geometry\n- Euclid geometry\n- Triangles\n- Surface areas and volumes\n- Statistics and probability\n\nFormula block:\n- Heron formula: Area = sqrt(s(s-a)(s-b)(s-c))\n- Total surface area of cube = 6a^2\n- Volume of cylinder = pi r^2 h",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-14",
        title: "Science Class 9 Full Revision",
        subject: "Science",
        level: "Class 9",
        content: "Physics:\n- Motion, force and laws\n- Work and energy\n\nChemistry:\n- Matter in our surroundings\n- Atoms and molecules\n\nBiology:\n- Cell and tissues\n- Diversity in living organisms\n- Health and disease\n\nImportant:\n- Learn definitions with examples.\n- Draw and label diagrams clearly.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-15",
        title: "English Class 9 Full Revision",
        subject: "English",
        level: "Class 9",
        content: "Grammar:\n- Tenses and mixed practice\n- Reported speech\n- Determiners and modifiers\n- Sentence transformation\n\nWriting:\n- Descriptive and narrative paragraphs\n- Diary entry and story completion\n- Formal letter and article writing\n\nLiterature:\n- Focus on theme, character, and message.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-16",
        title: "History Class 9 Full Revision",
        subject: "History",
        level: "Class 9",
        content: "Topics:\n- French Revolution\n- Socialism and Russian Revolution\n- Nazism and rise of Hitler\n- Forest society and colonialism\n- Pastoralists in modern world\n\nAnswer structure:\n- Introduction line\n- 3 to 5 key points\n- Conclusion line linked to impact",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-17",
        title: "Programming Class 9 Full Revision",
        subject: "Programming",
        level: "Class 9",
        content: "Core topics:\n- Problem solving and pseudocode\n- Input output in programming language\n- Conditional statements\n- Loops and nested loops\n- Functions and modular code\n- Arrays or lists basics\n\nProject idea:\n- Student marks calculator with menu options.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-18",
        title: "General Studies Class 9 Full Revision",
        subject: "General",
        level: "Class 9",
        content: "Study framework:\n- Set monthly, weekly, daily targets\n- Use Pomodoro and active recall\n- Maintain formula and vocabulary notebook\n- Weekly self test and performance review\n\nBoard prep strategy:\n- Finish syllabus early\n- Revise with past papers\n- Solve timed mock tests",
        createdAt: "2026-01-01T00:00:00.000Z"
    }
];

const DEFAULT_RESOURCES_LIBRARY = [
    {
        id: "res-1",
        title: "Maths Practice Hub",
        url: "https://www.khanacademy.org/math",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "res-2",
        title: "Science Learning Hub",
        url: "https://www.khanacademy.org/science",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "res-3",
        title: "English Grammar & Writing",
        url: "https://owl.purdue.edu/owl/general_writing/index.html",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "res-4",
        title: "History Timeline Resource",
        url: "https://www.britannica.com/topic/history",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "res-5",
        title: "Programming Learning Path",
        url: "https://www.freecodecamp.org/learn/",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "res-6",
        title: "General Study Skills",
        url: "https://www.coursera.org/articles/study-skills",
        type: "Website",
        createdAt: "2026-01-01T00:00:00.000Z"
    }
];

const STORAGE_KEYS = {
    tasks: "tasks",
    notes: "notes",
    flashcards: "flashcards",
    assignments: "assignments",
    exams: "exams",
    subjects: "subjects",
    gpaHistory: "gpaHistory",
    pomodoroSessions: "pomodoroSessions",
    activityLog: "activityLog",
    weeklyStats: "weeklyStats",
    goals: "goals",
    timetableEntries: "timetableEntries",
    resources: "resources",
    studyMaterials: "studyMaterials",
    freeNotesLibrary: "freeNotesLibrary",
    quizScores: "quizScores",
    teacherUpdates: "teacherUpdates",
    smartSettings: "smartSettings",
    dailyPlan: "dailyPlan",
    authUsers: "authUsers",
    authSession: "authSession",
    studyStreak: "studyStreak",
    bestStreak: "bestStreak",
    stateVersion: "stateVersion"
};

const DEFAULT_SMART_SETTINGS = {
    weakSubjects: [],
    remindersEnabled: false,
    reminderLeadDays: 1,
    startPage: "dashboard",
    compactMode: false,
    defaultPlanHours: 2
};

const DEFAULT_STATE = {
    tasks: [],
    notes: [],
    flashcards: {},
    assignments: [],
    exams: [],
    subjects: [
        { name: "Math", color: "#2193b0" },
        { name: "Science", color: "#4caf50" },
        { name: "English", color: "#9c27b0" },
        { name: "History", color: "#ff9800" },
        { name: "Programming", color: "#00bcd4" }
    ],
    gpaHistory: [],
    pomodoroSessions: [],
    activityLog: [],
    studyStreak: 0,
    bestStreak: 0,
    weeklyStats: {
        tasksCompleted: 0,
        studyHours: 0,
        flashcardsReviewed: 0
    },
    goals: {
        tasks: 20,
        studyHours: 10,
        flashcards: 50
    },
    timetableEntries: [],
    resources: DEFAULT_RESOURCES_LIBRARY,
    studyMaterials: DEFAULT_STUDY_MATERIALS,
    freeNotesLibrary: DEFAULT_FREE_NOTES_LIBRARY,
    quizScores: [],
    teacherUpdates: [],
    smartSettings: DEFAULT_SMART_SETTINGS,
    dailyPlan: {
        date: "",
        items: [],
        availableHours: 0
    },
    authUsers: [],
    authSession: null
};

function parseStoredJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
        return fallback;
    }
}

function normalizeSmartSettings(settings) {
    const normalized = settings && typeof settings === "object" ? settings : {};
    const reminderLeadDays = Number(normalized.reminderLeadDays);
    const defaultPlanHours = Number(normalized.defaultPlanHours);
    const startPage = String(normalized.startPage || "dashboard");
    const allowedStartPages = new Set([
        "dashboard", "tasks", "calendar", "notes", "flashcards", "assignments",
        "gpa", "exams", "analytics", "quiz", "admin", "subjects", "timetable",
        "resources", "study-materials", "free-notes", "achievements",
        "pomodoro-history", "goals", "profile", "settings"
    ]);

    return {
        ...DEFAULT_SMART_SETTINGS,
        ...normalized,
        weakSubjects: Array.isArray(normalized.weakSubjects)
            ? normalized.weakSubjects.map(s => String(s || "").trim()).filter(Boolean)
            : [],
        remindersEnabled: Boolean(normalized.remindersEnabled),
        reminderLeadDays: Number.isFinite(reminderLeadDays) ? Math.min(7, Math.max(0, Math.round(reminderLeadDays))) : 1,
        startPage: allowedStartPages.has(startPage) ? startPage : "dashboard",
        compactMode: Boolean(normalized.compactMode),
        defaultPlanHours: Number.isFinite(defaultPlanHours) ? Math.min(16, Math.max(1, Math.round(defaultPlanHours))) : 2
    };
}

function normalizeTask(task) {
    const normalized = task && typeof task === "object" ? task : {};
    const parsedEstimatedHours = Number(normalized.estimatedHours);
    const difficulty = normalized.difficulty || "medium";
    return {
        id: normalized.id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: String(normalized.text || normalized.title || "").trim(),
        subject: normalized.subject || "",
        priority: ["low", "medium", "high"].includes(normalized.priority) ? normalized.priority : "medium",
        dueDate: normalized.dueDate || "",
        done: Boolean(normalized.done),
        createdAt: normalized.createdAt || new Date().toISOString(),
        estimatedHours: Number.isFinite(parsedEstimatedHours) && parsedEstimatedHours > 0 ? parsedEstimatedHours : 1,
        difficulty: ["easy", "medium", "hard"].includes(difficulty) ? difficulty : "medium"
    };
}

function normalizeTasks(taskList) {
    if (!Array.isArray(taskList)) return [];
    return taskList
        .map(normalizeTask)
        .filter(task => task.text.length > 0);
}

function migrateState(state, fromVersion) {
    const migrated = { ...state };
    if (!Number.isFinite(fromVersion) || fromVersion < 1) {
        migrated.tasks = normalizeTasks(migrated.tasks);
    }
    return migrated;
}

function loadState() {
    const loaded = {
        tasks: parseStoredJSON(STORAGE_KEYS.tasks, DEFAULT_STATE.tasks),
        notes: parseStoredJSON(STORAGE_KEYS.notes, DEFAULT_STATE.notes),
        flashcards: parseStoredJSON(STORAGE_KEYS.flashcards, DEFAULT_STATE.flashcards),
        assignments: parseStoredJSON(STORAGE_KEYS.assignments, DEFAULT_STATE.assignments),
        exams: parseStoredJSON(STORAGE_KEYS.exams, DEFAULT_STATE.exams),
        subjects: parseStoredJSON(STORAGE_KEYS.subjects, DEFAULT_STATE.subjects),
        gpaHistory: parseStoredJSON(STORAGE_KEYS.gpaHistory, DEFAULT_STATE.gpaHistory),
        pomodoroSessions: parseStoredJSON(STORAGE_KEYS.pomodoroSessions, DEFAULT_STATE.pomodoroSessions),
        activityLog: parseStoredJSON(STORAGE_KEYS.activityLog, DEFAULT_STATE.activityLog),
        weeklyStats: parseStoredJSON(STORAGE_KEYS.weeklyStats, DEFAULT_STATE.weeklyStats),
        goals: parseStoredJSON(STORAGE_KEYS.goals, DEFAULT_STATE.goals),
        timetableEntries: parseStoredJSON(STORAGE_KEYS.timetableEntries, DEFAULT_STATE.timetableEntries),
        resources: parseStoredJSON(STORAGE_KEYS.resources, DEFAULT_STATE.resources),
        studyMaterials: parseStoredJSON(STORAGE_KEYS.studyMaterials, DEFAULT_STATE.studyMaterials),
        freeNotesLibrary: parseStoredJSON(STORAGE_KEYS.freeNotesLibrary, DEFAULT_STATE.freeNotesLibrary),
        quizScores: parseStoredJSON(STORAGE_KEYS.quizScores, DEFAULT_STATE.quizScores),
        teacherUpdates: parseStoredJSON(STORAGE_KEYS.teacherUpdates, DEFAULT_STATE.teacherUpdates),
        smartSettings: parseStoredJSON(STORAGE_KEYS.smartSettings, DEFAULT_STATE.smartSettings),
        dailyPlan: parseStoredJSON(STORAGE_KEYS.dailyPlan, DEFAULT_STATE.dailyPlan),
        authUsers: parseStoredJSON(STORAGE_KEYS.authUsers, DEFAULT_STATE.authUsers),
        authSession: parseStoredJSON(STORAGE_KEYS.authSession, DEFAULT_STATE.authSession),
        studyStreak: parseInt(localStorage.getItem(STORAGE_KEYS.studyStreak), 10),
        bestStreak: parseInt(localStorage.getItem(STORAGE_KEYS.bestStreak), 10)
    };

    const version = parseInt(localStorage.getItem(STORAGE_KEYS.stateVersion), 10);
    const migrated = migrateState({
        ...DEFAULT_STATE,
        ...loaded,
        tasks: normalizeTasks(loaded.tasks),
        weeklyStats: { ...DEFAULT_STATE.weeklyStats, ...(loaded.weeklyStats || {}) },
        goals: { ...DEFAULT_STATE.goals, ...(loaded.goals || {}) },
        timetableEntries: Array.isArray(loaded.timetableEntries) ? loaded.timetableEntries : [],
        resources: Array.isArray(loaded.resources) && loaded.resources.length > 0
            ? loaded.resources.map(item => ({ ...item }))
            : DEFAULT_RESOURCES_LIBRARY.map(item => ({ ...item })),
        studyMaterials: Array.isArray(loaded.studyMaterials) && loaded.studyMaterials.length > 0
            ? loaded.studyMaterials.map(item => ({ ...item }))
            : DEFAULT_STUDY_MATERIALS.map(item => ({ ...item })),
        freeNotesLibrary: (() => {
            const savedNotes = Array.isArray(loaded.freeNotesLibrary)
                ? loaded.freeNotesLibrary.map(item => ({ ...item }))
                : [];
            const defaultNotes = DEFAULT_FREE_NOTES_LIBRARY.map(item => ({ ...item }));
            if (savedNotes.length === 0) return defaultNotes;
            const existingIds = new Set(savedNotes.map(item => item.id));
            const missingDefaults = defaultNotes.filter(item => !existingIds.has(item.id));
            return [...savedNotes, ...missingDefaults];
        })(),
        quizScores: Array.isArray(loaded.quizScores) ? loaded.quizScores : [],
        teacherUpdates: Array.isArray(loaded.teacherUpdates) ? loaded.teacherUpdates : [],
        smartSettings: normalizeSmartSettings(loaded.smartSettings),
        dailyPlan: { ...DEFAULT_STATE.dailyPlan, ...(loaded.dailyPlan || {}) },
        authUsers: Array.isArray(loaded.authUsers) ? loaded.authUsers : [],
        authSession: loaded.authSession || null,
        studyStreak: Number.isFinite(loaded.studyStreak) ? loaded.studyStreak : 0,
        bestStreak: Number.isFinite(loaded.bestStreak) ? loaded.bestStreak : 0
    }, version);

    localStorage.setItem(STORAGE_KEYS.stateVersion, String(APP_STATE_VERSION));
    return migrated;
}

function saveState(partialState) {
    if (!partialState || typeof partialState !== "object") return;

    Object.entries(partialState).forEach(([key, value]) => {
        if (!Object.values(STORAGE_KEYS).includes(key) && !(key in STORAGE_KEYS)) return;
        const storageKey = STORAGE_KEYS[key] || key;
        const isNumberField = key === "studyStreak" || key === "bestStreak";
        localStorage.setItem(storageKey, isNumberField ? String(value || 0) : JSON.stringify(value));
    });
    localStorage.setItem(STORAGE_KEYS.stateVersion, String(APP_STATE_VERSION));
    scheduleCloudStateSync();
}

const initialState = loadState();
let tasks = initialState.tasks;
let notes = initialState.notes;
let flashcards = initialState.flashcards;
let assignments = initialState.assignments;
let exams = initialState.exams;
let subjects = initialState.subjects;
let gpaHistory = initialState.gpaHistory;
let pomodoroSessions = initialState.pomodoroSessions;
let activityLog = initialState.activityLog;
let studyStreak = initialState.studyStreak;
let bestStreak = initialState.bestStreak;
let weeklyStats = initialState.weeklyStats;
let goals = initialState.goals;
let timetableEntries = initialState.timetableEntries;
let resources = initialState.resources;
let studyMaterials = initialState.studyMaterials;
let freeNotesLibrary = initialState.freeNotesLibrary;
let quizScores = initialState.quizScores;
let teacherUpdates = initialState.teacherUpdates;
let smartSettings = initialState.smartSettings;
let dailyPlan = initialState.dailyPlan;
let authUsers = initialState.authUsers;
let authSession = initialState.authSession;

// Timer
let timerInterval = null;
let timerMinutes = 25;
let timerSeconds = 0;
let isTimerRunning = false;
let reminderIntervalId = null;
let deferredInstallPrompt = null;
let serviceWorkerRegistration = null;
let appBootstrapped = false;
let progressTrendChartInstance = null;
let completionSplitChartInstance = null;
let lastAISuggestionPlan = null;
let pendingAICreationPreview = null;
let backendAdminToken = localStorage.getItem(BACKEND_AUTH_TOKEN_KEY) || "";
let firebaseInitPromise = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseAuthObserverAttached = false;
let cloudSyncTimeoutId = null;
let isHydratingFromCloud = false;
let cloudStateLoadedForUid = "";
let activeFirebaseUid = "";

const CLOUD_SYNC_DEBOUNCE_MS = 800;
const firebaseSdk = {
    createUserWithEmailAndPassword: null,
    signInWithEmailAndPassword: null,
    sendPasswordResetEmail: null,
    signOut: null,
    updateProfile: null,
    onAuthStateChanged: null,
    doc: null,
    getDoc: null,
    setDoc: null,
    serverTimestamp: null
};

// Calendar
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Flashcards
let currentDeck = "";
let currentFlashcardIndex = 0;
let isFlipped = false;
let resourceSearchQuery = "";
let resourceTypeFilter = "all";
let studyMaterialSearchQuery = "";
let studyMaterialFilterSubject = "all";
let freeNotesSearchQuery = "";
let freeNotesFilterSubject = "all";
let draggedTimetableId = null;

// ==================== THEME ====================
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const themeBtn = document.getElementById("themeToggle");
    if (document.body.classList.contains("dark-theme")) {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
    }
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        const themeBtn = document.getElementById("themeToggle");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    }
}

// ==================== NAVIGATION ====================
function navigateTo(page) {
    if (page === 'admin' && !canAccessAdmin()) {
        alert('Admin page requires teacher/admin account.');
        page = 'dashboard';
    }

    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    const titles = {
        'dashboard': 'Dashboard',
        'tasks': 'Tasks',
        'calendar': 'Calendar',
        'notes': 'Notes',
        'flashcards': 'Flashcards',
        'assignments': 'Assignments',
        'gpa': 'GPA Calculator',
        'exams': 'Exam Countdown',
        'analytics': 'Analytics',
        'quiz': 'Quiz',
        'admin': 'Admin',
        'subjects': 'Subjects',
        'timetable': 'Timetable',
        'resources': 'Resources',
        'study-materials': 'Study Materials',
        'free-notes': 'Free Notes',
        'achievements': 'Achievements',
        'pomodoro-history': 'Timer History',
        'goals': 'Goals',
        'profile': 'Profile',
        'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
    
    // Refresh page data
    if (page === 'dashboard') renderDashboard();
    if (page === 'tasks') renderTasks();
    if (page === 'calendar') renderCalendar();
    if (page === 'notes') renderNotes();
    if (page === 'flashcards') renderFlashcards();
    if (page === 'assignments') renderAssignments();
    if (page === 'gpa') renderGPAPage();
    if (page === 'exams') renderExams();
    if (page === 'analytics') renderAnalytics();
    if (page === 'quiz') renderQuizPage();
    if (page === 'admin') renderAdminPage();
    if (page === 'subjects') renderSubjects();
    if (page === 'timetable') renderTimetable();
    if (page === 'resources') renderResources();
    if (page === 'study-materials') renderStudyMaterials();
    if (page === 'free-notes') renderFreeNotes();
    if (page === 'achievements') renderAchievements();
    if (page === 'pomodoro-history') renderPomodoroHistory();
    if (page === 'goals') renderGoals();
    if (page === 'profile') renderProfile();
    if (page === 'settings') renderSmartSettings();
    
    // Close mobile menu
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').style.display = 'none';
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
});

// Mobile menu
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
}

// ==================== QUOTES ====================
function newQuote() {
    const quoteText = document.getElementById("quoteText");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.style.opacity = 0;
    setTimeout(() => {
        quoteText.textContent = `"${randomQuote}"`;
        quoteText.style.opacity = 1;
    }, 300);
}

// ==================== AUTH ====================
function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function setAuthMessage(message, isError = false) {
    const el = document.getElementById("authMessage");
    if (!el) return;
    el.textContent = message || "";
    el.style.color = isError ? "#dc2626" : "#16a34a";
}

function showAuthView(view) {
    const title = document.getElementById("authTitle");
    const views = {
        login: document.getElementById("authLoginView"),
        register: document.getElementById("authRegisterView"),
        forgot: document.getElementById("authForgotView")
    };
    Object.values(views).forEach(v => {
        if (v) v.style.display = "none";
    });
    if (views[view]) views[view].style.display = "block";
    if (title) {
        title.textContent = view === "register" ? "Register" : view === "forgot" ? "Reset Password" : "Login";
    }
    setAuthMessage("");
}

async function hashPassword(password) {
    const text = String(password || "");
    if (!window.crypto || !window.crypto.subtle) {
        return btoa(unescape(encodeURIComponent(text)));
    }
    const data = new TextEncoder().encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getFirebaseAuthErrorMessage(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "This email is already registered.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Incorrect email or password.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        default:
            return "Authentication failed. Please try again.";
    }
}


function upsertLocalUser(userLike, preferredRole = "student") {
    if (!userLike || !userLike.email) return null;
    const email = normalizeEmail(userLike.email);
    const idx = authUsers.findIndex(u => normalizeEmail(u.email) === email);
    const displayName = String(userLike.name || userLike.displayName || email.split("@")[0] || "Student").trim();

    if (idx >= 0) {
        authUsers[idx] = {
            ...authUsers[idx],
            firebaseUid: userLike.uid || authUsers[idx].firebaseUid,
            name: displayName || authUsers[idx].name || "Student",
            email,
            role: authUsers[idx].role || preferredRole || "student",
            profile: {
                studyGoal: "",
                bio: "",
                ...(authUsers[idx].profile || {})
            }
        };
        return authUsers[idx];
    }

    const user = {
        id: `user-${userLike.uid || Date.now()}`,
        firebaseUid: userLike.uid || null,
        name: displayName || "Student",
        email,
        role: preferredRole || "student",
        profile: {
            studyGoal: "",
            bio: ""
        },
        createdAt: new Date().toISOString()
    };
    authUsers.push(user);
    return user;
}

function getCloudStateDocRef(uid) {
    if (!uid || !firebaseDb || !firebaseSdk.doc) return null;
    return firebaseSdk.doc(firebaseDb, "users", uid, "planner", "state");
}

function getUserProfileDocRef(uid) {
    if (!uid || !firebaseDb || !firebaseSdk.doc) return null;
    return firebaseSdk.doc(firebaseDb, "users", uid);
}

function getCurrentLocalUserByUidOrEmail(firebaseUser) {
    if (!firebaseUser) return null;
    const email = normalizeEmail(firebaseUser.email);
    const byUid = authUsers.find(u => u.firebaseUid && u.firebaseUid === firebaseUser.uid);
    if (byUid) return byUid;
    return authUsers.find(u => normalizeEmail(u.email) === email) || null;
}

async function syncCurrentUserProfileToCloud() {
    if (!firebaseAuth || !firebaseDb || !firebaseSdk.setDoc) return;
    const firebaseUser = firebaseAuth.currentUser;
    if (!firebaseUser || !firebaseUser.uid || !firebaseUser.email) return;
    const userRef = getUserProfileDocRef(firebaseUser.uid);
    if (!userRef) return;

    const localUser = getCurrentLocalUserByUidOrEmail(firebaseUser);
    const payload = {
        uid: firebaseUser.uid,
        email: normalizeEmail(firebaseUser.email),
        name: localUser?.name || firebaseUser.displayName || "Student",
        role: localUser?.role || "student",
        profile: {
            studyGoal: "",
            bio: "",
            ...(localUser?.profile || {})
        },
        createdAt: localUser?.createdAt || new Date().toISOString(),
        updatedAt: firebaseSdk.serverTimestamp ? firebaseSdk.serverTimestamp() : new Date().toISOString()
    };

    try {
        await firebaseSdk.setDoc(userRef, payload, { merge: true });
    } catch (_) {
    }
}

async function loadCurrentUserProfileFromCloud() {
    if (!firebaseAuth || !firebaseDb || !firebaseSdk.getDoc) return;
    const firebaseUser = firebaseAuth.currentUser;
    if (!firebaseUser || !firebaseUser.uid || !firebaseUser.email) return;
    const userRef = getUserProfileDocRef(firebaseUser.uid);
    if (!userRef) return;

    try {
        const snap = await firebaseSdk.getDoc(userRef);
        if (!snap.exists()) {
            await syncCurrentUserProfileToCloud();
            return;
        }
        const profileDoc = snap.data() || {};
        const local = upsertLocalUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: profileDoc.name || firebaseUser.displayName || ""
        }, profileDoc.role || "student");
        if (!local) return;
        const idx = authUsers.findIndex(u => u.id === local.id);
        if (idx >= 0) {
            authUsers[idx] = {
                ...authUsers[idx],
                role: profileDoc.role || authUsers[idx].role || "student",
                profile: {
                    studyGoal: "",
                    bio: "",
                    ...(profileDoc.profile || authUsers[idx].profile || {})
                },
                createdAt: profileDoc.createdAt || authUsers[idx].createdAt
            };
            saveState({ authUsers });
        }
    } catch (_) {
    }
}

function getCloudStatePayload() {
    const payload = {
        stateVersion: APP_STATE_VERSION,
        tasks,
        notes,
        flashcards,
        assignments,
        exams,
        subjects,
        gpaHistory,
        pomodoroSessions,
        activityLog,
        weeklyStats,
        studyStreak,
        bestStreak,
        goals,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        teacherUpdates,
        smartSettings,
        dailyPlan,
        updatedAt: new Date().toISOString()
    };
    if (firebaseSdk.serverTimestamp) {
        payload.updatedAt = firebaseSdk.serverTimestamp();
    }
    return payload;
}

function resetUserScopedStateToDefaults() {
    tasks = normalizeTasks(DEFAULT_STATE.tasks);
    notes = Array.isArray(DEFAULT_STATE.notes) ? [...DEFAULT_STATE.notes] : [];
    flashcards = { ...(DEFAULT_STATE.flashcards || {}) };
    assignments = Array.isArray(DEFAULT_STATE.assignments) ? [...DEFAULT_STATE.assignments] : [];
    exams = Array.isArray(DEFAULT_STATE.exams) ? [...DEFAULT_STATE.exams] : [];
    subjects = Array.isArray(DEFAULT_STATE.subjects) ? DEFAULT_STATE.subjects.map(item => ({ ...item })) : [];
    gpaHistory = Array.isArray(DEFAULT_STATE.gpaHistory) ? [...DEFAULT_STATE.gpaHistory] : [];
    pomodoroSessions = Array.isArray(DEFAULT_STATE.pomodoroSessions) ? [...DEFAULT_STATE.pomodoroSessions] : [];
    activityLog = Array.isArray(DEFAULT_STATE.activityLog) ? [...DEFAULT_STATE.activityLog] : [];
    weeklyStats = { ...DEFAULT_STATE.weeklyStats };
    goals = { ...DEFAULT_STATE.goals };
    timetableEntries = Array.isArray(DEFAULT_STATE.timetableEntries) ? [...DEFAULT_STATE.timetableEntries] : [];
    resources = DEFAULT_RESOURCES_LIBRARY.map(item => ({ ...item }));
    studyMaterials = DEFAULT_STUDY_MATERIALS.map(item => ({ ...item }));
    freeNotesLibrary = DEFAULT_FREE_NOTES_LIBRARY.map(item => ({ ...item }));
    quizScores = Array.isArray(DEFAULT_STATE.quizScores) ? [...DEFAULT_STATE.quizScores] : [];
    teacherUpdates = Array.isArray(DEFAULT_STATE.teacherUpdates) ? [...DEFAULT_STATE.teacherUpdates] : [];
    smartSettings = normalizeSmartSettings(DEFAULT_STATE.smartSettings);
    dailyPlan = { ...DEFAULT_STATE.dailyPlan };
    studyStreak = DEFAULT_STATE.studyStreak;
    bestStreak = DEFAULT_STATE.bestStreak;

    saveTasks();
    saveState({
        notes,
        flashcards,
        assignments,
        exams,
        subjects,
        gpaHistory,
        pomodoroSessions,
        activityLog,
        weeklyStats,
        studyStreak,
        bestStreak,
        goals,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        teacherUpdates,
        smartSettings,
        dailyPlan
    });
}

function applyCloudState(data) {
    if (!data || typeof data !== "object") return;
    isHydratingFromCloud = true;
    try {
        if (Array.isArray(data.tasks)) tasks = normalizeTasks(data.tasks);
        if (Array.isArray(data.notes)) notes = data.notes;
        if (data.flashcards && typeof data.flashcards === "object") flashcards = data.flashcards;
        if (Array.isArray(data.assignments)) assignments = data.assignments;
        if (Array.isArray(data.exams)) exams = data.exams;
        if (Array.isArray(data.subjects)) subjects = data.subjects;
        if (Array.isArray(data.gpaHistory)) gpaHistory = data.gpaHistory;
        if (Array.isArray(data.pomodoroSessions)) pomodoroSessions = data.pomodoroSessions;
        if (Array.isArray(data.activityLog)) activityLog = data.activityLog;
        if (data.weeklyStats) weeklyStats = { ...DEFAULT_STATE.weeklyStats, ...data.weeklyStats };
        if (Number.isFinite(data.studyStreak)) studyStreak = data.studyStreak;
        if (Number.isFinite(data.bestStreak)) bestStreak = data.bestStreak;
        if (data.goals) goals = { ...DEFAULT_STATE.goals, ...data.goals };
        if (Array.isArray(data.timetableEntries)) timetableEntries = data.timetableEntries;
        if (Array.isArray(data.resources)) resources = data.resources;
        if (Array.isArray(data.studyMaterials) && data.studyMaterials.length > 0) studyMaterials = data.studyMaterials;
        if (Array.isArray(data.freeNotesLibrary) && data.freeNotesLibrary.length > 0) freeNotesLibrary = data.freeNotesLibrary;
        if (Array.isArray(data.quizScores)) quizScores = data.quizScores;
        if (Array.isArray(data.teacherUpdates)) teacherUpdates = data.teacherUpdates;
        if (data.smartSettings) smartSettings = normalizeSmartSettings(data.smartSettings);
        if (data.dailyPlan) dailyPlan = { ...DEFAULT_STATE.dailyPlan, ...data.dailyPlan };

        saveTasks();
        saveState({
            notes,
            flashcards,
            assignments,
            exams,
            subjects,
            gpaHistory,
            pomodoroSessions,
            activityLog,
            weeklyStats,
            studyStreak,
            bestStreak,
            goals,
            timetableEntries,
            resources,
            studyMaterials,
            freeNotesLibrary,
            quizScores,
            teacherUpdates,
            smartSettings,
            dailyPlan
        });
    } finally {
        isHydratingFromCloud = false;
    }
}

async function syncStateToCloudNow() {
    if (isHydratingFromCloud || !firebaseAuth || !firebaseDb || !firebaseSdk.setDoc) return;
    const user = firebaseAuth.currentUser;
    if (!user || !user.uid) return;
    const stateRef = getCloudStateDocRef(user.uid);
    if (!stateRef) return;

    try {
        await firebaseSdk.setDoc(stateRef, getCloudStatePayload(), { merge: true });
    } catch (_) {
    }
}

function scheduleCloudStateSync() {
    if (isHydratingFromCloud || !firebaseAuth || !firebaseDb) return;
    if (!navigator.onLine) {
        return;
    }
    if (cloudSyncTimeoutId) clearTimeout(cloudSyncTimeoutId);
    cloudSyncTimeoutId = setTimeout(() => {
        syncStateToCloudNow();
    }, CLOUD_SYNC_DEBOUNCE_MS);
}

async function loadCloudStateForCurrentUser() {
    if (!firebaseAuth || !firebaseDb || !firebaseSdk.getDoc) return;
    const user = firebaseAuth.currentUser;
    if (!user || !user.uid || cloudStateLoadedForUid === user.uid) return;
    const stateRef = getCloudStateDocRef(user.uid);
    if (!stateRef) return;
    try {
        const snapshot = await firebaseSdk.getDoc(stateRef);
        cloudStateLoadedForUid = user.uid;
        if (!snapshot.exists()) {
            await syncStateToCloudNow();
            return;
        }
        applyCloudState(snapshot.data());
    } catch (_) {
    }
}

async function ensureFirebaseServices() {
    if (firebaseInitPromise) return firebaseInitPromise;
    firebaseInitPromise = (async () => {
        if (!window.firebaseApp) {
            return null;
        }
        try {
            const [authModule, firestoreModule] = await Promise.all([
                import("https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js"),
                import("https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js")
            ]);

            firebaseAuth = authModule.getAuth(window.firebaseApp);
            firebaseDb = firestoreModule.getFirestore(window.firebaseApp);

            firebaseSdk.createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;
            firebaseSdk.signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
            firebaseSdk.sendPasswordResetEmail = authModule.sendPasswordResetEmail;
            firebaseSdk.signOut = authModule.signOut;
            firebaseSdk.updateProfile = authModule.updateProfile;
            firebaseSdk.onAuthStateChanged = authModule.onAuthStateChanged;
            firebaseSdk.doc = firestoreModule.doc;
            firebaseSdk.getDoc = firestoreModule.getDoc;
            firebaseSdk.setDoc = firestoreModule.setDoc;
            firebaseSdk.serverTimestamp = firestoreModule.serverTimestamp;
            return true;
        } catch (_) {
            firebaseAuth = null;
            firebaseDb = null;
            return null;
        }
    })();
    return firebaseInitPromise;
}

async function setupFirebaseAuthObserver() {
    await ensureFirebaseServices();
    if (!firebaseAuth || firebaseAuthObserverAttached || !firebaseSdk.onAuthStateChanged) return;
    firebaseAuthObserverAttached = true;

    firebaseSdk.onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
            if (activeFirebaseUid !== firebaseUser.uid) {
                resetUserScopedStateToDefaults();
                cloudStateLoadedForUid = "";
                activeFirebaseUid = firebaseUser.uid;
            }
            upsertLocalUser(firebaseUser);
            authSession = { email: normalizeEmail(firebaseUser.email) };
            saveState({ authUsers, authSession });
            await loadCurrentUserProfileFromCloud();
            await syncCurrentUserProfileToCloud();
            await loadCloudStateForCurrentUser();
            await loadFlashcardsFromBackend();
            if (document.getElementById("page-dashboard")) applyAuthState();
            return;
        }

        cloudStateLoadedForUid = "";
        activeFirebaseUid = "";
        if (authSession) {
            authSession = null;
            saveState({ authSession });
        }
        if (document.getElementById("page-dashboard")) applyAuthState();
    });
}

async function syncRegisterWithBackend(name, email, password, role) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.token) {
            backendAdminToken = data.token;
            localStorage.setItem(BACKEND_AUTH_TOKEN_KEY, backendAdminToken);
        }
    } catch (_) {}
}

async function syncLoginWithBackend(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.token) {
            backendAdminToken = data.token;
            localStorage.setItem(BACKEND_AUTH_TOKEN_KEY, backendAdminToken);
        }
    } catch (_) {}
}

function hasAnyFlashcards(flashcardState) {
    if (!flashcardState || typeof flashcardState !== "object") return false;
    const decks = Object.values(flashcardState);
    if (decks.length === 0) return false;
    return decks.some(deck => Array.isArray(deck) && deck.length > 0);
}

async function saveFlashcardsToBackend() {
    if (!backendAdminToken) return;
    try {
        await fetch(`${API_BASE_URL}/api/flashcards`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ flashcards })
        });
    } catch (_) {}
}

async function loadFlashcardsFromBackend() {
    if (!backendAdminToken) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/flashcards`, {
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            }
        });
        if (!response.ok) return;
        const data = await response.json().catch(() => ({}));
        const remoteFlashcards = data && typeof data.flashcards === "object" ? data.flashcards : null;
        if (!remoteFlashcards) return;

        if (hasAnyFlashcards(remoteFlashcards)) {
            flashcards = remoteFlashcards;
            saveState({ flashcards });
            renderFlashcards();
            renderDashboard();
            return;
        }

        if (hasAnyFlashcards(flashcards)) {
            await saveFlashcardsToBackend();
        }
    } catch (_) {}
}

function getCurrentUser() {
    if (!authSession || !authSession.email) return null;
    const user = authUsers.find(u => normalizeEmail(u.email) === normalizeEmail(authSession.email)) || null;
    if (user && !user.role) user.role = "student";
    return user;
}

function canAccessAdmin() {
    const user = getCurrentUser();
    return Boolean(user && (user.role === "admin" || user.role === "teacher"));
}

function getBackendAuthHeaders() {
    return backendAdminToken
        ? { Authorization: `Bearer ${backendAdminToken}` }
        : {};
}

function updateBackendAuthStatus() {
    const status = document.getElementById('backendAuthStatus');
    if (!status) return;
    status.textContent = backendAdminToken ? 'Connected (JWT token active)' : 'Not connected';
}

async function backendAdminLogin() {
    const email = document.getElementById('backendAuthEmail')?.value.trim();
    const password = document.getElementById('backendAuthPassword')?.value || '';
    if (!email || !password) {
        alert('Enter backend email and password.');
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');
        backendAdminToken = data.token || "";
        localStorage.setItem(BACKEND_AUTH_TOKEN_KEY, backendAdminToken);
        updateBackendAuthStatus();
        alert('Backend auth connected.');
    } catch (err) {
        alert(`Backend auth failed: ${err.message}`);
    }
}

function backendAdminLogout() {
    backendAdminToken = "";
    localStorage.removeItem(BACKEND_AUTH_TOKEN_KEY);
    updateBackendAuthStatus();
}

function applyAuthState() {
    const appContainer = document.getElementById("appContainer");
    const authContainer = document.getElementById("authContainer");
    const user = getCurrentUser();

    if (user) {
        if (authContainer) authContainer.style.display = "none";
        if (appContainer) appContainer.style.display = "flex";
        const currentUserName = document.getElementById("currentUserName");
        if (currentUserName) currentUserName.textContent = user.name || "User";
        const adminNavItem = document.querySelector('[data-page="admin"]');
        if (adminNavItem) {
            adminNavItem.style.display = canAccessAdmin() ? "list-item" : "none";
        }
        bootstrapAuthenticatedApp();
        renderProfile();
        navigateTo("dashboard");
    } else {
        if (appContainer) appContainer.style.display = "none";
        if (authContainer) authContainer.style.display = "flex";
        showAuthView("login");
    }
}

async function registerUser() {
    const name = document.getElementById("registerName")?.value.trim();
    const email = normalizeEmail(document.getElementById("registerEmail")?.value);
    const password = document.getElementById("registerPassword")?.value || "";
    const role = document.getElementById("registerRole")?.value || "student";

    if (!name || !email || password.length < 6) {
        setAuthMessage("Provide name, valid email, and password with at least 6 characters.", true);
        return;
    }
    await ensureFirebaseServices();

    if (firebaseAuth && firebaseSdk.createUserWithEmailAndPassword) {
        try {
            const credential = await firebaseSdk.createUserWithEmailAndPassword(firebaseAuth, email, password);
            if (firebaseSdk.updateProfile) {
                await firebaseSdk.updateProfile(credential.user, { displayName: name });
            }
            upsertLocalUser({
                uid: credential.user.uid,
                email: credential.user.email || email,
                name
            }, role);
            authSession = { email };
            saveState({ authUsers, authSession });
            await syncCurrentUserProfileToCloud();
            await syncRegisterWithBackend(name, email, password, role);
            await syncStateToCloudNow();
            setAuthMessage("Account created successfully.");
            applyAuthState();
            return;
        } catch (err) {
            setAuthMessage(getFirebaseAuthErrorMessage(err?.code), true);
            return;
        }
    }

    if (authUsers.some(u => normalizeEmail(u.email) === email)) {
        setAuthMessage("Email is already registered.", true);
        return;
    }

    const passwordHash = await hashPassword(password);
    const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        passwordHash,
        profile: {
            studyGoal: "",
            bio: ""
        },
        createdAt: new Date().toISOString()
    };
    authUsers.push(user);
    authSession = { email };
    saveState({ authUsers, authSession });
    await syncRegisterWithBackend(name, email, password, role);
    setAuthMessage("Account created successfully.");
    applyAuthState();
}

async function loginUser() {
    const email = normalizeEmail(document.getElementById("loginEmail")?.value);
    const password = document.getElementById("loginPassword")?.value || "";

    if (!email || !password) {
        setAuthMessage("Enter your email and password.", true);
        return;
    }

    await ensureFirebaseServices();

    if (firebaseAuth && firebaseSdk.signInWithEmailAndPassword) {
        try {
            const credential = await firebaseSdk.signInWithEmailAndPassword(firebaseAuth, email, password);
            upsertLocalUser({
                uid: credential.user.uid,
                email: credential.user.email || email,
                name: credential.user.displayName || ""
            });
            authSession = { email: normalizeEmail(credential.user.email || email) };
            saveState({ authUsers, authSession });
            await loadCurrentUserProfileFromCloud();
            await syncCurrentUserProfileToCloud();
            await loadCloudStateForCurrentUser();
            await syncLoginWithBackend(email, password);
            await loadFlashcardsFromBackend();
            setAuthMessage("Login successful.");
            applyAuthState();
            return;
        } catch (err) {
            setAuthMessage(getFirebaseAuthErrorMessage(err?.code), true);
            return;
        }
    }

    const user = authUsers.find(u => normalizeEmail(u.email) === email);
    if (!user) {
        setAuthMessage("No account found for this email.", true);
        return;
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        setAuthMessage("Incorrect password.", true);
        return;
    }

    authSession = { email: user.email };
    saveState({ authSession });
    await syncLoginWithBackend(email, password);
    await loadFlashcardsFromBackend();
    setAuthMessage("Login successful.");
    applyAuthState();
}

async function resetPassword() {
    const email = normalizeEmail(document.getElementById("forgotEmail")?.value);
    const newPassword = document.getElementById("forgotNewPassword")?.value || "";
    if (!email) {
        setAuthMessage("Enter your registered email.", true);
        return;
    }

    await ensureFirebaseServices();
    if (firebaseAuth && firebaseSdk.sendPasswordResetEmail) {
        try {
            await firebaseSdk.sendPasswordResetEmail(firebaseAuth, email);
            setAuthMessage("Password reset email sent. Check your inbox.");
            showAuthView("login");
            return;
        } catch (err) {
            setAuthMessage(getFirebaseAuthErrorMessage(err?.code), true);
            return;
        }
    }

    if (newPassword.length < 6) {
        setAuthMessage("Enter registered email and a new password (min 6 characters).", true);
        return;
    }

    const idx = authUsers.findIndex(u => normalizeEmail(u.email) === email);
    if (idx < 0) {
        setAuthMessage("No account found for this email.", true);
        return;
    }

    authUsers[idx].passwordHash = await hashPassword(newPassword);
    saveState({ authUsers });
    setAuthMessage("Password reset successful. You can login now.");
    showAuthView("login");
}

async function logoutUser() {
    await ensureFirebaseServices();
    if (firebaseAuth && firebaseSdk.signOut && firebaseAuth.currentUser) {
        try {
            await firebaseSdk.signOut(firebaseAuth);
        } catch (_) {}
    }
    authSession = null;
    saveState({ authSession });
    backendAdminToken = "";
    localStorage.removeItem(BACKEND_AUTH_TOKEN_KEY);
    applyAuthState();
}

function renderProfile() {
    const user = getCurrentUser();
    if (!user) return;
    const profile = user.profile || {};
    const nameEl = document.getElementById("profileName");
    const emailEl = document.getElementById("profileEmail");
    const goalEl = document.getElementById("profileStudyGoal");
    const bioEl = document.getElementById("profileBio");
    if (nameEl) nameEl.value = user.name || "";
    if (emailEl) emailEl.value = user.email || "";
    if (goalEl) goalEl.value = profile.studyGoal || "";
    if (bioEl) bioEl.value = profile.bio || "";
}

async function saveProfile() {
    const user = getCurrentUser();
    if (!user) return;

    const name = document.getElementById("profileName")?.value.trim() || user.name;
    const studyGoal = document.getElementById("profileStudyGoal")?.value.trim() || "";
    const bio = document.getElementById("profileBio")?.value.trim() || "";

    const idx = authUsers.findIndex(u => u.id === user.id);
    if (idx < 0) return;
    authUsers[idx] = {
        ...authUsers[idx],
        name,
        profile: {
            ...(authUsers[idx].profile || {}),
            studyGoal,
            bio
        }
    };
    saveState({ authUsers });
    addActivity('user', 'Profile Updated', 'Profile changes saved');
    const currentUserName = document.getElementById("currentUserName");
    if (currentUserName) currentUserName.textContent = name;
    await ensureFirebaseServices();
    if (firebaseAuth && firebaseSdk.updateProfile && firebaseAuth.currentUser) {
        try {
            await firebaseSdk.updateProfile(firebaseAuth.currentUser, { displayName: name });
        } catch (_) {}
    }
    await syncCurrentUserProfileToCloud();
    alert("Profile updated.");
}

function updateNetworkStatusUI() {
    const statusEl = document.getElementById('networkStatus');
    if (!statusEl) return;
    const isOnline = navigator.onLine;
    statusEl.innerHTML = isOnline
        ? '<i class="fas fa-wifi"></i><span>Online</span>'
        : '<i class="fas fa-triangle-exclamation"></i><span>Offline</span>';
    if (!isOnline) {
    } else if (getCurrentUser()) {
    }
}

function setupNetworkStatusListeners() {
    updateNetworkStatusUI();
    window.addEventListener('online', updateNetworkStatusUI);
    window.addEventListener('offline', updateNetworkStatusUI);
}

async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
        serviceWorkerRegistration = await navigator.serviceWorker.register('./service-worker.js');
        await serviceWorkerRegistration.update();

        if (serviceWorkerRegistration.waiting) {
            serviceWorkerRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });
    } catch (_) {
        serviceWorkerRegistration = null;
    }
}

function setupPWAInstall() {
    const installBtn = document.getElementById('installAppBtn');
    if (!installBtn) return;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        installBtn.disabled = false;
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        installBtn.disabled = true;
        addActivity('mobile-screen-button', 'App Installed', 'Installed as a progressive web app');
    });
}

async function installPWA() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    const installBtn = document.getElementById('installAppBtn');
    if (installBtn) installBtn.disabled = true;
}

async function checkForAppUpdates() {
    if (!serviceWorkerRegistration) {
        alert('Update checks are available after loading over http/https with Service Worker support.');
        return;
    }
    try {
        await serviceWorkerRegistration.update();
        alert('Update check complete.');
    } catch (_) {
        alert('Unable to check for updates right now.');
    }
}

// ==================== TASK SCORING (PURE FUNCTIONS) ====================
function daysUntil(dueDate, now = new Date()) {
    if (!dueDate) return Number.POSITIVE_INFINITY;
    const current = new Date(now);
    current.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return Math.ceil((due - current) / (1000 * 60 * 60 * 24));
}

function priorityWeight(priority) {
    const weights = { low: 10, medium: 25, high: 45 };
    return weights[priority] || weights.medium;
}

function difficultyWeight(level) {
    const weights = { easy: 5, medium: 12, hard: 20 };
    return weights[level] || weights.medium;
}

function scoreTask(task, context = {}) {
    if (!task || task.done) return Number.NEGATIVE_INFINITY;

    const now = context.now || new Date();
    const weakSubjects = Array.isArray(context.weakSubjects) ? context.weakSubjects : [];
    const taskDaysUntil = daysUntil(task.dueDate, now);
    let score = 0;

    if (taskDaysUntil === Number.POSITIVE_INFINITY) {
        score += 8;
    } else if (taskDaysUntil < 0) {
        score += 120 + Math.abs(taskDaysUntil) * 10;
    } else {
        score += Math.max(0, 70 - taskDaysUntil * 9);
    }

    score += priorityWeight(task.priority);
    score += difficultyWeight(task.difficulty);
    score += Math.min(20, (Number(task.estimatedHours) || 1) * 4);
    if (weakSubjects.includes(task.subject)) score += 15;

    return Math.round(score);
}

function rankTasks(taskList, context = {}) {
    if (!Array.isArray(taskList)) return [];

    return taskList
        .map((task, index) => ({
            ...task,
            _idx: index,
            _score: scoreTask(task, context)
        }))
        .filter(task => Number.isFinite(task._score))
        .sort((a, b) => {
            if (b._score !== a._score) return b._score - a._score;
            const dueA = daysUntil(a.dueDate, context.now || new Date());
            const dueB = daysUntil(b.dueDate, context.now || new Date());
            if (dueA !== dueB) return dueA - dueB;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
}

function estimateTaskHours(task) {
    const parsed = Number(task && task.estimatedHours);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
    return 1;
}

function generateDailyPlan(taskList, options = {}) {
    const now = options.now || new Date();
    const availableHours = Math.max(1, Number(options.availableHours) || 2);
    const weakSubjects = Array.isArray(options.weakSubjects) ? options.weakSubjects : [];
    const prioritizeTaskIds = new Set(Array.isArray(options.prioritizeTaskIds) ? options.prioritizeTaskIds : []);
    const remainingMinutes = Math.round(availableHours * 60);
    let usedMinutes = 0;

    const ranked = rankTasks(taskList, { now, weakSubjects })
        .filter(task => !task.done)
        .sort((a, b) => {
            const aPriority = prioritizeTaskIds.has(a.id) ? 1 : 0;
            const bPriority = prioritizeTaskIds.has(b.id) ? 1 : 0;
            if (aPriority !== bPriority) return bPriority - aPriority;
            return b._score - a._score;
        });

    const items = [];
    for (const task of ranked) {
        const recommendedMinutes = Math.max(25, Math.min(120, Math.round(estimateTaskHours(task) * 60)));
        if (usedMinutes + recommendedMinutes > remainingMinutes && items.length > 0) continue;
        if (usedMinutes >= remainingMinutes) break;

        const allocatedMinutes = Math.min(recommendedMinutes, remainingMinutes - usedMinutes);
        usedMinutes += allocatedMinutes;
        items.push({
            taskId: task.id,
            text: task.text,
            subject: task.subject || "General",
            priority: task.priority,
            score: task._score,
            allocatedMinutes
        });
    }

    return {
        date: now.toISOString().split("T")[0],
        availableHours,
        items
    };
}

function replanAfterMissedTasks(taskList, previousPlan, options = {}) {
    const now = options.now || new Date();
    const weakSubjects = Array.isArray(options.weakSubjects) ? options.weakSubjects : [];
    const previousItems = previousPlan && Array.isArray(previousPlan.items) ? previousPlan.items : [];
    const carryOverIds = new Set(
        previousItems
            .map(item => item.taskId)
            .filter(Boolean)
    );

    return generateDailyPlan(taskList, {
        now,
        availableHours: options.availableHours,
        weakSubjects,
        prioritizeTaskIds: Array.from(carryOverIds)
    });
}

// ==================== DASHBOARD ====================
function renderDashboard() {
    const completed = tasks.filter(t => t.done).length;
    document.getElementById('totalTasks').textContent = tasks.length;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = tasks.length - completed;
    document.getElementById('assignmentsCount').textContent = assignments.length;
    document.getElementById('studyHours').textContent = Math.round(weeklyStats.studyHours * 10) / 10;
    
    let totalFlashcards = 0;
    Object.values(flashcards).forEach(deck => totalFlashcards += deck.length);
    document.getElementById('flashcardCount').textContent = totalFlashcards;
    
    // Streak
    document.getElementById('streakCount').textContent = studyStreak;
    
    // Weekly goals
    const taskGoal = Math.min((weeklyStats.tasksCompleted / goals.tasks) * 100, 100);
    const studyGoal = Math.min((weeklyStats.studyHours / goals.studyHours) * 100, 100);
    const flashcardGoal = Math.min((weeklyStats.flashcardsReviewed / goals.flashcards) * 100, 100);
    
    document.getElementById('goalTaskFill').style.width = taskGoal + '%';
    document.getElementById('goalTaskText').textContent = `${weeklyStats.tasksCompleted}/${goals.tasks}`;
    document.getElementById('goalStudyFill').style.width = studyGoal + '%';
    document.getElementById('goalStudyText').textContent = `${Math.round(weeklyStats.studyHours)}/${goals.studyHours} hrs`;
    document.getElementById('goalFlashcardFill').style.width = flashcardGoal + '%';
    document.getElementById('goalFlashcardText').textContent = `${weeklyStats.flashcardsReviewed}/${goals.flashcards}`;
    
    // Recent activity
    renderRecentActivity();
    
    // Upcoming deadlines
    renderUpcomingDeadlines();
    renderDoNext();
    renderTodayPlan();
}

function renderRecentActivity() {
    const list = document.getElementById('recentActivityList');
    if (activityLog.length === 0) {
        list.innerHTML = '<li class="empty-state">No recent activity</li>';
        return;
    }
    
    list.innerHTML = activityLog.slice(0, 5).map(activity => `
        <li>
            <div class="activity-icon"><i class="fas fa-${activity.icon}"></i></div>
            <div>
                <strong>${activity.title}</strong>
                <p>${activity.desc}</p>
            </div>
            <span class="activity-time">${activity.time}</span>
        </li>
    `).join('');
}

function renderUpcomingDeadlines() {
    const list = document.getElementById('upcomingDeadlines');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = [];
    
    tasks.filter(t => !t.done && t.dueDate).forEach(task => {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff <= 7) {
            upcoming.push({ type: 'task', item: task, days: diff });
        }
    });
    
    assignments.filter(a => !a.done && a.dueDate).forEach(assignment => {
        const due = new Date(assignment.dueDate);
        due.setHours(0, 0, 0, 0);
        const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff <= 7) {
            upcoming.push({ type: 'assignment', item: assignment, days: diff });
        }
    });
    
    upcoming.sort((a, b) => a.days - b.days);
    
    if (upcoming.length === 0) {
        list.innerHTML = '<li class="empty-state">No upcoming deadlines</li>';
        return;
    }
    
    list.innerHTML = upcoming.slice(0, 5).map(u => `
        <li>
            <span class="deadline-type">${u.type === 'task' ? 'Task' : 'Assignment'}</span>
            <strong>${u.item.title || u.item.text}</strong>
            <span class="deadline-days">${u.days === 0 ? 'Today' : u.days === 1 ? 'Tomorrow' : `In ${u.days} days`}</span>
        </li>
    `).join('');
}

function renderDoNext() {
    const list = document.getElementById('doNextList');
    if (!list) return;

    const ranked = rankTasks(tasks, {
        now: new Date(),
        weakSubjects: smartSettings.weakSubjects || []
    }).slice(0, 5);
    if (ranked.length === 0) {
        list.innerHTML = '<li class="empty-state">No active tasks to prioritize</li>';
        return;
    }

    list.innerHTML = ranked.map(task => `
        <li>
            <strong>${task.text}</strong>
            <span>${task.subject || 'General'} • ${task.priority} • Score ${task._score}</span>
        </li>
    `).join('');
}

function renderTodayPlan() {
    const list = document.getElementById('todayPlanList');
    const hoursInput = document.getElementById('planHoursToday');
    if (!list) return;

    if (hoursInput) {
        const defaultPlanHours = Number(smartSettings.defaultPlanHours) || 2;
        hoursInput.value = dailyPlan.availableHours || defaultPlanHours;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!dailyPlan.items || dailyPlan.items.length === 0 || dailyPlan.date !== today) {
        list.innerHTML = '<li class="empty-state">No plan generated yet</li>';
        return;
    }

    list.innerHTML = dailyPlan.items.map(item => `
        <li>
            <strong>${item.text}</strong>
            <span>${item.subject} • ${item.allocatedMinutes} min • Score ${item.score}</span>
        </li>
    `).join('');
}

function generateTodayPlan() {
    const input = document.getElementById('planHoursToday');
    const availableHours = Number(input && input.value ? input.value : 2);
    dailyPlan = generateDailyPlan(tasks, {
        now: new Date(),
        availableHours,
        weakSubjects: smartSettings.weakSubjects || []
    });
    saveState({ dailyPlan });
    renderTodayPlan();
    addActivity('calendar-day', 'Daily Plan Generated', `${dailyPlan.items.length} study blocks created`);
}

function getUnfinishedPlannedTaskIds(plan) {
    const items = plan && Array.isArray(plan.items) ? plan.items : [];
    return items
        .map(item => item.taskId)
        .filter(taskId => {
            const task = tasks.find(t => t.id === taskId);
            return task && !task.done;
        });
}

function replanMissedTasks() {
    const input = document.getElementById('planHoursToday');
    const availableHours = Number(input && input.value ? input.value : (dailyPlan.availableHours || 2));
    const unfinishedIds = getUnfinishedPlannedTaskIds(dailyPlan);

    if (unfinishedIds.length === 0) {
        alert('No missed planned tasks found.');
        return;
    }

    dailyPlan = replanAfterMissedTasks(tasks, dailyPlan, {
        now: new Date(),
        availableHours,
        weakSubjects: smartSettings.weakSubjects || []
    });
    saveState({ dailyPlan });
    renderTodayPlan();
    addActivity('rotate-right', 'Plan Rebuilt', `${unfinishedIds.length} missed task(s) carried over`);
}

function autoReplanMissedTasksOnNewDay() {
    if (!dailyPlan.date) return;
    const today = new Date().toISOString().split('T')[0];
    if (dailyPlan.date >= today) return;

    const unfinishedIds = getUnfinishedPlannedTaskIds(dailyPlan);
    if (unfinishedIds.length === 0) return;

    dailyPlan = replanAfterMissedTasks(tasks, dailyPlan, {
        now: new Date(),
        availableHours: dailyPlan.availableHours || 2,
        weakSubjects: smartSettings.weakSubjects || []
    });
    saveState({ dailyPlan });
    addActivity('calendar-day', 'Auto Replan Complete', `${unfinishedIds.length} missed task(s) moved to today`);
}

function renderSmartSettings() {
    const weakSubjectsInput = document.getElementById('weakSubjectsInput');
    const remindersCheck = document.getElementById('enableRemindersCheck');
    const reminderLeadDaysInput = document.getElementById('reminderLeadDaysInput');
    const startPageSelect = document.getElementById('startPageSelect');
    const compactModeCheck = document.getElementById('compactModeCheck');
    const defaultPlanHoursInput = document.getElementById('defaultPlanHoursInput');
    if (weakSubjectsInput) {
        weakSubjectsInput.value = (smartSettings.weakSubjects || []).join(', ');
    }
    if (remindersCheck) {
        remindersCheck.checked = Boolean(smartSettings.remindersEnabled);
    }
    if (reminderLeadDaysInput) {
        reminderLeadDaysInput.value = Number(smartSettings.reminderLeadDays);
    }
    if (startPageSelect) {
        startPageSelect.value = smartSettings.startPage || 'dashboard';
    }
    if (compactModeCheck) {
        compactModeCheck.checked = Boolean(smartSettings.compactMode);
    }
    if (defaultPlanHoursInput) {
        defaultPlanHoursInput.value = Number(smartSettings.defaultPlanHours) || 2;
    }
}

function applySmartSettingsEffects() {
    document.body.classList.toggle('compact-mode', Boolean(smartSettings.compactMode));
}

function saveSmartSettings() {
    const weakSubjectsInput = document.getElementById('weakSubjectsInput');
    const remindersCheck = document.getElementById('enableRemindersCheck');
    const reminderLeadDaysInput = document.getElementById('reminderLeadDaysInput');
    const startPageSelect = document.getElementById('startPageSelect');
    const compactModeCheck = document.getElementById('compactModeCheck');
    const defaultPlanHoursInput = document.getElementById('defaultPlanHoursInput');
    const weakSubjects = weakSubjectsInput
        ? weakSubjectsInput.value.split(',').map(s => s.trim()).filter(Boolean)
        : [];
    const remindersEnabled = remindersCheck ? remindersCheck.checked : false;
    const reminderLeadDays = reminderLeadDaysInput ? Number(reminderLeadDaysInput.value) : 1;
    const startPage = startPageSelect ? startPageSelect.value : 'dashboard';
    const compactMode = compactModeCheck ? compactModeCheck.checked : false;
    const defaultPlanHours = defaultPlanHoursInput ? Number(defaultPlanHoursInput.value) : 2;

    smartSettings = normalizeSmartSettings({
        ...smartSettings,
        weakSubjects,
        remindersEnabled,
        reminderLeadDays,
        startPage,
        compactMode,
        defaultPlanHours
    });
    saveState({ smartSettings });
    addActivity('robot', 'Smart Settings Updated', 'Prioritization preferences saved');
    applySmartSettingsEffects();

    if (remindersEnabled) {
        requestReminderPermission();
        checkDueTaskReminders();
        if (reminderIntervalId) clearInterval(reminderIntervalId);
        reminderIntervalId = setInterval(checkDueTaskReminders, 30 * 60 * 1000);
    } else if (reminderIntervalId) {
        clearInterval(reminderIntervalId);
        reminderIntervalId = null;
    }
    renderDashboard();
}

function addActivity(icon, title, desc) {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    activityLog.unshift({ icon, title, desc, time, date: now.toISOString() });
    if (activityLog.length > 20) activityLog.pop();
    saveState({ activityLog });
}

// ==================== TASKS ====================
let currentTaskFilter = "all";
let taskSearchQuery = "";
let taskSortMode = "priority-due";
let selectedTaskIds = new Set();

function saveTasks() {
    tasks = normalizeTasks(tasks);
    saveState({ tasks });
}

function getVisibleTasks(today) {
    const dateRef = today || new Date();
    dateRef.setHours(0, 0, 0, 0);

    const filtered = tasks.filter(task => {
        if (currentTaskFilter === "active") return !task.done;
        if (currentTaskFilter === "completed") return task.done;
        if (currentTaskFilter === "overdue") {
            if (!task.done && task.dueDate) {
                const due = new Date(task.dueDate);
                due.setHours(0, 0, 0, 0);
                return due < dateRef;
            }
            return false;
        }
        if (currentTaskFilter === "today") {
            if (!task.done && task.dueDate) {
                const due = new Date(task.dueDate);
                due.setHours(0, 0, 0, 0);
                return due.getTime() === dateRef.getTime();
            }
            return false;
        }
        return true;
    });

    const query = taskSearchQuery.trim().toLowerCase();
    const searched = query
        ? filtered.filter(task => {
            const text = String(task.text || "").toLowerCase();
            const subject = String(task.subject || "").toLowerCase();
            return text.includes(query) || subject.includes(query);
        })
        : filtered;

    return [...searched].sort((a, b) => compareTasks(a, b, dateRef));
}

function updateSelectedTaskCount() {
    const selectedInfo = document.getElementById('selectedTasksInfo');
    if (!selectedInfo) return;
    selectedInfo.textContent = `${selectedTaskIds.size} selected`;
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const allTaskIds = new Set(tasks.map(task => task.id));
    selectedTaskIds = new Set([...selectedTaskIds].filter(id => allTaskIds.has(id)));
    const sorted = getVisibleTasks(today);
    
    if (sorted.length === 0) {
        taskList.innerHTML = '<li class="empty-state"><i class="fas fa-clipboard-list"></i><p>No tasks found</p></li>';
    }
    
    sorted.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `priority-${task.priority}`;
        if (task.done) li.classList.add("completed");
        
        let dueDateClass = "";
        if (task.dueDate) {
            const due = new Date(task.dueDate);
            due.setHours(0, 0, 0, 0);
            if (due < today) dueDateClass = "overdue";
            else if (due.getTime() === today.getTime()) dueDateClass = "today";
        }
        
        li.innerHTML = `
            <div class="task-content">
                <label class="task-select-wrap" title="Select for bulk actions">
                    <input type="checkbox" class="task-select-check" ${selectedTaskIds.has(task.id) ? 'checked' : ''}
                        onclick="event.stopPropagation(); toggleTaskSelection('${task.id}', this.checked)">
                </label>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${tasks.indexOf(task)})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="task-meta">
                ${task.subject ? `<span class="task-subject">${task.subject}</span>` : ''}
                <span class="priority-badge ${task.priority}">${task.priority}</span>
                <span class="priority-badge">${task.difficulty || 'medium'} diff</span>
                <span class="task-subject">${estimateTaskHours(task)}h est</span>
                ${task.dueDate ? `<span class="task-due ${dueDateClass}"><i class="fas fa-calendar-alt"></i> ${formatDate(task.dueDate)}</span>` : ''}
            </div>
        `;
        
        li.onclick = (e) => {
            if (!e.target.closest('.delete-btn') && !e.target.closest('.task-select-wrap')) {
                toggleTask(tasks.indexOf(task));
            }
        };
        
        taskList.appendChild(li);
    });
    
    // Progress
    const completed = tasks.filter(t => t.done).length;
    const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('progressText').textContent = Math.round(percent) + '%';
    updateSelectedTaskCount();
}

function getPriorityWeight(priority) {
    if (priority === "high") return 3;
    if (priority === "medium") return 2;
    return 1;
}

function getDueTime(task) {
    if (!task || !task.dueDate) return Number.POSITIVE_INFINITY;
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime();
}

function getCreatedTime(task) {
    const created = new Date(task.createdAt || 0).getTime();
    return Number.isFinite(created) ? created : 0;
}

function compareTasks(a, b, today) {
    if (taskSortMode === "due-soon") {
        return getDueTime(a) - getDueTime(b);
    }
    if (taskSortMode === "newest") {
        return getCreatedTime(b) - getCreatedTime(a);
    }
    if (taskSortMode === "oldest") {
        return getCreatedTime(a) - getCreatedTime(b);
    }

    const priorityDelta = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    if (priorityDelta !== 0) return priorityDelta;

    const dueDelta = getDueTime(a) - getDueTime(b);
    if (dueDelta !== 0) return dueDelta;

    const isDoneDelta = Number(a.done) - Number(b.done);
    if (isDoneDelta !== 0) return isDoneDelta;

    return getCreatedTime(b) - getCreatedTime(a);
}

function addTask() {
    const input = document.getElementById("taskInput");
    const subject = document.getElementById("subjectSelect");
    const priority = document.getElementById("prioritySelect");
    const difficulty = document.getElementById("difficultySelect");
    const estimatedHoursInput = document.getElementById("estimatedHoursInput");
    const dueDate = document.getElementById("dueDateInput");
    
    if (input.value.trim() === "") return;
    
    tasks.push({
        text: input.value.trim(),
        subject: subject.value,
        priority: priority.value,
        difficulty: difficulty ? difficulty.value : "medium",
        estimatedHours: Math.max(0.5, Number(estimatedHoursInput && estimatedHoursInput.value ? estimatedHoursInput.value : 1)),
        dueDate: dueDate.value,
        done: false,
        createdAt: new Date().toISOString()
    });
    
    saveTasks();
    renderTasks();
    renderDashboard();
    
    addActivity('plus', 'Task Added', input.value.trim());
    
    input.value = "";
    subject.value = "";
    priority.value = "medium";
    if (difficulty) difficulty.value = "medium";
    if (estimatedHoursInput) estimatedHoursInput.value = "";
    dueDate.value = "";
}

function toggleTask(index) {
    const wasDone = tasks[index].done;
    tasks[index].done = !tasks[index].done;
    if (tasks[index].done) selectedTaskIds.delete(tasks[index].id);
    saveTasks();
    renderTasks();
    
    if (!wasDone) {
        weeklyStats.tasksCompleted++;
        saveState({ weeklyStats });
        addActivity('check', 'Task Completed', tasks[index].text);
        
        const lastActivity = localStorage.getItem('lastActivityDate');
        const today = new Date().toDateString();
        if (lastActivity !== today) {
            studyStreak++;
            if (studyStreak > bestStreak) bestStreak = studyStreak;
            saveState({ studyStreak, bestStreak });
            localStorage.setItem('lastActivityDate', today);
        }
    }
    renderDashboard();
}

function deleteTask(index) {
    if (tasks[index] && tasks[index].id) selectedTaskIds.delete(tasks[index].id);
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    addActivity('trash', 'Task Deleted', 'A task was removed');
    renderDashboard();
}

function clearTasks() {
    if (tasks.length === 0) return;
    if (confirm("Delete all tasks?")) {
        tasks = [];
        selectedTaskIds.clear();
        saveTasks();
        renderTasks();
        renderDashboard();
    }
}

function filterTasks(filter) {
    currentTaskFilter = filter;
    document.querySelectorAll('#page-tasks .filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    renderTasks();
}

function setTaskSearchQuery(query) {
    taskSearchQuery = String(query || "");
    renderTasks();
}

function setTaskSortMode(mode) {
    taskSortMode = mode || "priority-due";
    renderTasks();
}

function clearTaskSearch() {
    taskSearchQuery = "";
    const searchInput = document.getElementById('taskSearchInput');
    if (searchInput) searchInput.value = "";
    renderTasks();
}

function toggleTaskSelection(taskId, selected) {
    if (!taskId) return;
    if (selected) {
        selectedTaskIds.add(taskId);
    } else {
        selectedTaskIds.delete(taskId);
    }
    updateSelectedTaskCount();
}

function selectVisibleTasks() {
    const visibleTasks = getVisibleTasks(new Date());
    visibleTasks.forEach(task => {
        if (!task.done) selectedTaskIds.add(task.id);
    });
    renderTasks();
}

function clearTaskSelection() {
    selectedTaskIds.clear();
    renderTasks();
}

function completeSelectedTasks() {
    const selectedIds = new Set(selectedTaskIds);
    let completedCount = 0;

    tasks = tasks.map(task => {
        if (selectedIds.has(task.id) && !task.done) {
            completedCount++;
            return { ...task, done: true };
        }
        return task;
    });

    if (completedCount === 0) {
        alert('No selected active tasks to complete.');
        return;
    }

    weeklyStats.tasksCompleted += completedCount;
    saveState({ weeklyStats });

    const lastActivity = localStorage.getItem('lastActivityDate');
    const today = new Date().toDateString();
    if (lastActivity !== today) {
        studyStreak++;
        if (studyStreak > bestStreak) bestStreak = studyStreak;
        saveState({ studyStreak, bestStreak });
        localStorage.setItem('lastActivityDate', today);
    }

    selectedTaskIds.clear();
    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('check-double', 'Bulk Task Complete', `${completedCount} task(s) marked complete`);
}

function handleEnter(e) {
    if (e.key === 'Enter') addTask();
}

// ==================== CALENDAR ====================
function renderCalendar() {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
    
    document.getElementById('calendarMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let html = "";
    
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day"></div>';
    }
    
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        
        const hasTask = tasks.some(t => t.dueDate === dateStr);
        const hasAssignment = assignments.some(a => a.dueDate === dateStr);
        const hasExam = exams.some(e => e.date && e.date.startsWith(dateStr));
        
        let classes = "calendar-day";
        if (isToday) classes += " today";
        if (hasTask) classes += " has-task";
        if (hasAssignment) classes += " has-assignment";
        if (hasExam) classes += " has-exam";
        
        html += `<div class="${classes}">${day}</div>`;
    }
    
    document.getElementById('calendarDays').innerHTML = html;
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// ==================== NOTES ====================
let editingNoteIndex = null;

function renderNotes() {
    const grid = document.getElementById('notesGrid');
    const searchTerm = document.getElementById('noteSearch')?.value.toLowerCase() || '';
    
    const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.content.toLowerCase().includes(searchTerm) ||
        String(note.subject || 'General').toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-sticky-note"></i><p>No notes yet</p></div>';
        return;
    }
    
    grid.innerHTML = filtered.map((note, index) => {
        const actualIndex = notes.indexOf(note);
        return `
            <div class="note-card" style="background: ${note.color}; border-left: 4px solid ${note.color}" onclick="editNote(${actualIndex})">
                <button class="delete-note" onclick="event.stopPropagation(); deleteNote(${actualIndex})">
                    <i class="fas fa-trash"></i>
                </button>
                <h4>${note.title}</h4>
                <span class="assignment-type">${note.subject || 'General'}</span>
                <p>${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}</p>
                <span class="note-date">${formatDate(note.date)}</span>
            </div>
        `;
    }).join('');
}

function showNoteEditor() {
    editingNoteIndex = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteSubject').value = 'General';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteColor').value = '#ffffff';
    document.getElementById('noteModal').classList.add('active');
}

function editNote(index) {
    editingNoteIndex = index;
    const note = notes[index];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteSubject').value = note.subject || 'General';
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteColor').value = note.color;
    document.getElementById('noteModal').classList.add('active');
}

function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const subject = document.getElementById('noteSubject').value || 'General';
    const content = document.getElementById('noteContent').value.trim();
    const color = document.getElementById('noteColor').value;
    
    if (!title || !content) return;
    
    if (editingNoteIndex !== null) {
        notes[editingNoteIndex] = { ...notes[editingNoteIndex], title, subject, content, color };
        addActivity('edit', 'Note Updated', title);
    } else {
        notes.push({ title, subject, content, color, date: new Date().toISOString() });
        addActivity('plus', 'Note Added', title);
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    closeNoteModal();
    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    addActivity('trash', 'Note Deleted', 'A note was removed');
}

function closeNoteModal() {
    document.getElementById('noteModal').classList.remove('active');
}

function searchNotes() {
    renderNotes();
}

// ==================== FLASHCARDS ====================
function renderFlashcards() {
    const deckSelect = document.getElementById('flashcardDeck');
    const deckSelectModal = document.getElementById('flashcardDeckSelect');
    const decks = Object.keys(flashcards);
    
    let options = '<option value="">Select Deck</option>';
    decks.forEach(deck => {
        options += `<option value="${deck}">${deck} (${flashcards[deck].length} cards)</option>`;
    });
    
    deckSelect.innerHTML = options;
    deckSelectModal.innerHTML = options;
    
    const deckCards = document.getElementById('deckCards');
    if (decks.length === 0) {
        deckCards.innerHTML = '<div class="empty-state"><i class="fas fa-layer-group"></i><p>No flashcard decks yet</p></div>';
    } else {
        deckCards.innerHTML = decks.map(deck => `
            <div class="deck-card" onclick="selectDeck('${deck}')">
                <i class="fas fa-layer-group"></i>
                <h4>${deck}</h4>
                <p>${flashcards[deck].length} cards</p>
            </div>
        `).join('');
    }
    
    document.getElementById('flashcardCounter').textContent = '0 / 0';
    document.getElementById('flashcardFront').innerHTML = '<p>Select a deck and click Study to start</p>';
    document.getElementById('flashcardBack').innerHTML = '<p></p>';
}

function selectDeck(deck) {
    currentDeck = deck;
    currentFlashcardIndex = 0;
    isFlipped = false;
    document.getElementById('flashcardDeck').value = deck;
    document.querySelector('.flashcard').classList.remove('flipped');
}

function showFlashcardEditor() {
    document.getElementById('flashcardModal').classList.add('active');
}

function closeFlashcardModal() {
    document.getElementById('flashcardModal').classList.remove('active');
}

function saveFlashcard() {
    const deck = document.getElementById('flashcardDeckSelect').value;
    const front = document.getElementById('flashcardFrontText').value.trim();
    const back = document.getElementById('flashcardBackText').value.trim();
    
    if (!deck || !front || !back) return;
    
    if (!flashcards[deck]) flashcards[deck] = [];
    flashcards[deck].push({ front, back });
    
    saveState({ flashcards });
    saveFlashcardsToBackend();
    
    document.getElementById('flashcardFrontText').value = '';
    document.getElementById('flashcardBackText').value = '';
    
    closeFlashcardModal();
    renderFlashcards();
    addActivity('plus', 'Flashcard Added', `Added to ${deck}`);
}

function createNewDeck() {
    const deckName = prompt("Enter deck name:");
    if (deckName && !flashcards[deckName]) {
        flashcards[deckName] = [];
        saveState({ flashcards });
        saveFlashcardsToBackend();
        renderFlashcards();
        addActivity('folder-plus', 'Deck Created', deckName);
    }
}

function startStudy() {
    if (!currentDeck || !flashcards[currentDeck] || flashcards[currentDeck].length === 0) {
        alert('Please select a deck first!');
        return;
    }
    
    currentFlashcardIndex = 0;
    isFlipped = false;
    document.querySelector('.flashcard').classList.remove('flipped');
    showFlashcard();
}

function showFlashcard() {
    const card = flashcards[currentDeck][currentFlashcardIndex];
    document.getElementById('flashcardFront').innerHTML = `<p>${card.front}</p>`;
    document.getElementById('flashcardBack').innerHTML = `<p>${card.back}</p>`;
    document.getElementById('flashcardCounter').textContent = `${currentFlashcardIndex + 1} / ${flashcards[currentDeck].length}`;
}

function flipFlashcard() {
    isFlipped = !isFlipped;
    document.querySelector('.flashcard').classList.toggle('flipped', isFlipped);
}

function prevFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        isFlipped = false;
        document.querySelector('.flashcard').classList.remove('flipped');
        showFlashcard();
    }
}

function nextFlashcard() {
    if (currentDeck && flashcards[currentDeck] && currentFlashcardIndex < flashcards[currentDeck].length - 1) {
        currentFlashcardIndex++;
        isFlipped = false;
        document.querySelector('.flashcard').classList.remove('flipped');
        showFlashcard();
        
        weeklyStats.flashcardsReviewed++;
        localStorage.setItem('weeklyStats', JSON.stringify(weeklyStats));
    }
}

// ==================== ASSIGNMENTS ====================
let assignmentFilter = "all";

function renderAssignments() {
    const list = document.getElementById('assignmentsList');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const filtered = assignments.filter(a => {
        if (assignmentFilter === "pending") return !a.done;
        if (assignmentFilter === "completed") return a.done;
        if (assignmentFilter === "overdue") {
            if (!a.done && a.dueDate) {
                const due = new Date(a.dueDate);
                due.setHours(0, 0, 0, 0);
                return due < today;
            }
            return false;
        }
        return true;
    });
    
    if (filtered.length === 0) {
        list.innerHTML = '<li class="empty-state"><i class="fas fa-file-alt"></i><p>No assignments yet</p></li>';
        return;
    }
    
    list.innerHTML = filtered.map((assignment, index) => {
        const actualIndex = assignments.indexOf(assignment);
        let dueDateClass = "";
        if (assignment.dueDate) {
            const due = new Date(assignment.dueDate);
            due.setHours(0, 0, 0, 0);
            if (due < today && !assignment.done) dueDateClass = "overdue";
            else if (due.getTime() === today.getTime()) dueDateClass = "today";
        }
        
        return `
            <li class="${assignment.done ? 'completed' : ''}" onclick="toggleAssignment(${actualIndex})">
                <div class="assignment-header">
                    <span class="assignment-title">${assignment.title}</span>
                    <span class="assignment-type">${assignment.type}</span>
                </div>
                <div class="assignment-meta">
                    ${assignment.subject ? `<span class="task-subject">${assignment.subject}</span>` : ''}
                    ${assignment.dueDate ? `<span class="task-due ${dueDateClass}"><i class="fas fa-calendar-alt"></i> Due: ${formatDate(assignment.dueDate)}</span>` : ''}
                </div>
                ${assignment.description ? `<p class="assignment-desc">${assignment.description}</p>` : ''}
                <button class="delete-btn" onclick="event.stopPropagation(); deleteAssignment(${actualIndex})">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        `;
    }).join('');
}

function addAssignment() {
    const title = document.getElementById('assignmentTitle').value.trim();
    const subject = document.getElementById('assignmentSubject').value;
    const type = document.getElementById('assignmentType').value;
    const dueDate = document.getElementById('assignmentDue').value;
    const description = document.getElementById('assignmentDesc').value.trim();
    
    if (!title) return;
    
    assignments.push({
        title, subject, type, dueDate, description,
        done: false,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('assignments', JSON.stringify(assignments));
    renderAssignments();
    
    addActivity('file-plus', 'Assignment Added', title);
    
    document.getElementById('assignmentTitle').value = '';
    document.getElementById('assignmentSubject').value = '';
    document.getElementById('assignmentType').value = 'Essay';
    document.getElementById('assignmentDue').value = '';
    document.getElementById('assignmentDesc').value = '';
}

function toggleAssignment(index) {
    assignments[index].done = !assignments[index].done;
    localStorage.setItem('assignments', JSON.stringify(assignments));
    renderAssignments();
    
    if (assignments[index].done) {
        addActivity('check', 'Assignment Completed', assignments[index].title);
    }
}

function deleteAssignment(index) {
    assignments.splice(index, 1);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    renderAssignments();
    addActivity('trash', 'Assignment Deleted', 'An assignment was removed');
}

function filterAssignments(filter) {
    assignmentFilter = filter;
    document.querySelectorAll('#page-assignments .filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    renderAssignments();
}

// ==================== GPA CALCULATOR ====================
function renderGPAPage() {
    const list = document.getElementById('gpaHistoryList');
    if (gpaHistory.length === 0) {
        list.innerHTML = '<li class="empty-state">No GPA records yet</li>';
    } else {
        list.innerHTML = gpaHistory.map((gpa, index) => `
            <li>
                <span class="gpa-value">${gpa.gpa}</span>
                <span class="gpa-date">${formatDate(gpa.date)}</span>
                <button class="delete-btn" onclick="deleteGPARecord(${index})"><i class="fas fa-trash"></i></button>
            </li>
        `).join('');
    }
}

function addGPARow() {
    const container = document.getElementById('gpaSubjects');
    const row = document.createElement('div');
    row.className = 'gpa-subject-row';
    row.innerHTML = `
        <input type="text" placeholder="Subject Name" class="gpa-subject-name">
        <input type="number" placeholder="Credits" class="gpa-credits" min="1" max="10">
        <select class="gpa-grade">
            <option value="4.0">A (4.0)</option>
            <option value="3.7">A- (3.7)</option>
            <option value="3.3">B+ (3.3)</option>
            <option value="3.0">B (3.0)</option>
            <option value="2.7">B- (2.7)</option>
            <option value="2.3">C+ (2.3)</option>
            <option value="2.0">C (2.0)</option>
            <option value="1.7">C- (1.7)</option>
            <option value="1.3">D+ (1.3)</option>
            <option value="1.0">D (1.0)</option>
            <option value="0.0">F (0.0)</option>
        </select>
        <button class="delete-btn" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(row);
}

function calculateGPA() {
    const rows = document.querySelectorAll('.gpa-subject-row');
    let totalPoints = 0;
    let totalCredits = 0;
    
    rows.forEach(row => {
        const credits = parseFloat(row.querySelector('.gpa-credits').value) || 0;
        const grade = parseFloat(row.querySelector('.gpa-grade').value) || 0;
        
        if (credits > 0) {
            totalPoints += credits * grade;
            totalCredits += credits;
        }
    });
    
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    
    document.getElementById('gpaResult').textContent = gpa;
    document.getElementById('totalCredits').textContent = totalCredits;
    
    // Save to history
    gpaHistory.unshift({ gpa, credits: totalCredits, date: new Date().toISOString() });
    if (gpaHistory.length > 10) gpaHistory.pop();
    localStorage.setItem('gpaHistory', JSON.stringify(gpaHistory));
    
    addActivity('calculator', 'GPA Calculated', `GPA: ${gpa}`);
    renderGPAPage();
}

function deleteGPARecord(index) {
    gpaHistory.splice(index, 1);
    localStorage.setItem('gpaHistory', JSON.stringify(gpaHistory));
    renderGPAPage();
}

// ==================== EXAM COUNTDOWN ====================
function renderExams() {
    const grid = document.getElementById('examCountdownGrid');
    const list = document.getElementById('examList');
    toggleCustomScheduleRange();
    
    const now = new Date();
    
    // Sort exams by date
    exams.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (exams.length === 0) {
        grid.innerHTML = '<div class="empty-state">No exams added yet</div>';
        list.innerHTML = '<li class="empty-state">No exams added yet</li>';
        return;
    }
    
    // Countdown cards
    grid.innerHTML = exams.filter(e => new Date(e.date) > now).slice(0, 3).map(exam => {
        const examDate = new Date(exam.date);
        const diff = examDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        return `
            <div class="exam-countdown-card">
                <h4>${exam.name}</h4>
                <p class="exam-subject">${exam.subject}</p>
                <div class="countdown">
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Full list
    list.innerHTML = exams.map((exam, index) => {
        const examDate = new Date(exam.date);
        const isPast = examDate < now;
        
        return `
            <li class="${isPast ? 'completed' : ''}">
                <div class="assignment-header">
                    <span class="assignment-title">${exam.name}</span>
                    <span class="assignment-type">${exam.subject}</span>
                </div>
                <div class="assignment-meta">
                    <span class="task-due"><i class="fas fa-calendar-alt"></i> ${formatDate(exam.date)}</span>
                </div>
                ${exam.notes ? `<p class="assignment-desc">${exam.notes}</p>` : ''}
                <button class="delete-btn" onclick="deleteExam(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </li>
        `;
    }).join('');
}

function generateAISmartPlanSuggestion(examDate, subjectCount, difficultyLevel) {
    const parsedExamDate = new Date(examDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedExamDate.setHours(0, 0, 0, 0);
    const daysLeft = Math.max(1, Math.ceil((parsedExamDate - today) / (1000 * 60 * 60 * 24)));

    const difficultyMultiplier = {
        easy: 0.8,
        medium: 1.0,
        hard: 1.25
    };
    const multiplier = difficultyMultiplier[difficultyLevel] || 1.0;
    const baseDailyHours = Math.max(1.5, Math.min(8, (subjectCount * 0.6 * multiplier) + (daysLeft <= 14 ? 1 : 0)));
    const totalHours = Math.round(baseDailyHours * daysLeft * 10) / 10;

    const distribution = [];
    const subjectNames = subjects.map(s => s.name).slice(0, subjectCount);
    const subjectHours = Math.round((baseDailyHours / subjectCount) * 100) / 100;
    for (let i = 1; i <= subjectCount; i++) {
        distribution.push({
            subject: subjectNames[i - 1] || `Subject ${i}`,
            dailyHours: subjectHours
        });
    }

    return {
        examDate: parsedExamDate.toISOString().split("T")[0],
        daysLeft,
        dailyHours: Math.round(baseDailyHours * 100) / 100,
        totalHours,
        distribution
    };
}

function generateAISmartPlan() {
    const examDate = document.getElementById('aiExamDate')?.value;
    const subjectCount = Number(document.getElementById('aiSubjectCount')?.value || 0);
    const difficultyLevel = document.getElementById('aiDifficultyLevel')?.value || 'medium';
    const list = document.getElementById('aiPlanList');

    if (!examDate || !subjectCount || subjectCount < 1) {
        alert('Please enter exam date and number of subjects.');
        return;
    }

    const plan = generateAISmartPlanSuggestion(examDate, subjectCount, difficultyLevel);
    lastAISuggestionPlan = {
        ...plan,
        difficultyLevel
    };
    if (!list) return;

    list.innerHTML = `
        <li><strong>Exam countdown:</strong> ${plan.daysLeft} day(s)</li>
        <li><strong>Suggested daily study:</strong> ${plan.dailyHours} hour(s)</li>
        <li><strong>Estimated total study load:</strong> ${plan.totalHours} hour(s)</li>
        <li><strong>Daily time distribution:</strong></li>
        ${plan.distribution.map(item => `<li>${item.subject}: ${item.dailyHours} hr/day</li>`).join('')}
    `;

    addActivity('robot', 'AI Plan Generated', `${plan.daysLeft} days plan for ${subjectCount} subjects`);
}

function formatDateInput(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function toggleCustomScheduleRange() {
    const rangeSelect = document.getElementById('aiScheduleRange');
    const customInput = document.getElementById('aiCustomRangeDays');
    if (!rangeSelect || !customInput) return;
    customInput.style.display = rangeSelect.value === 'custom' ? 'block' : 'none';
}

function getSelectedAIDayRange(maxByExam) {
    const rangeSelect = document.getElementById('aiScheduleRange');
    const customInput = document.getElementById('aiCustomRangeDays');
    const selected = rangeSelect ? rangeSelect.value : '30';

    if (selected === 'custom') {
        const customDays = Number(customInput && customInput.value ? customInput.value : 0);
        if (!customDays || customDays < 1) return 0;
        return Math.min(customDays, maxByExam);
    }

    const days = Number(selected || 30);
    return Math.min(days, maxByExam);
}

function buildAICreationPreview() {
    if (!lastAISuggestionPlan) {
        return { error: 'Generate an AI study plan first.' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(lastAISuggestionPlan.examDate);
    examDate.setHours(0, 0, 0, 0);
    if (examDate <= today) {
        return { error: 'Exam date must be in the future to create scheduled tasks.' };
    }

    const maxDaysByExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    const totalDays = getSelectedAIDayRange(maxDaysByExam);
    if (!totalDays) {
        return { error: 'Please provide a valid day range.' };
    }
    const weekdaysOnly = Boolean(document.getElementById('aiWeekdaysOnlyCheck')?.checked);

    const perSubjectHours = Math.max(0.5, Math.round((lastAISuggestionPlan.dailyHours / Math.max(lastAISuggestionPlan.distribution.length, 1)) * 10) / 10);
    const toCreate = [];

    for (let dayOffset = 0; dayOffset < totalDays; dayOffset++) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayOffset + 1);
        const dayOfWeek = targetDate.getDay();
        if (weekdaysOnly && (dayOfWeek === 0 || dayOfWeek === 6)) continue;
        const dueDate = formatDateInput(targetDate);

        lastAISuggestionPlan.distribution.forEach(subjectPlan => {
            const title = `AI Plan: ${subjectPlan.subject} Revision (${dayOffset + 1}/${totalDays})`;
            const alreadyExists = tasks.some(task => task.text === title && task.dueDate === dueDate);
            if (alreadyExists) return;

            const newTask = normalizeTask({
                text: title,
                subject: subjectPlan.subject,
                priority: dayOffset < 7 ? "high" : "medium",
                difficulty: lastAISuggestionPlan.difficultyLevel || "medium",
                estimatedHours: perSubjectHours,
                dueDate,
                done: false,
                createdAt: new Date().toISOString()
            });
            toCreate.push(newTask);
        });
    }

    return { toCreate, totalDays, weekdaysOnly };
}

function closeAITaskConfirmModal() {
    const modal = document.getElementById('aiTaskConfirmModal');
    if (modal) modal.classList.remove('active');
}

function refreshAICreationPreviewSummary() {
    const preview = buildAICreationPreview();
    if (preview.error) {
        const summary = document.getElementById('aiTaskConfirmSummary');
        if (summary) summary.textContent = preview.error;
        pendingAICreationPreview = null;
        return;
    }

    pendingAICreationPreview = preview;
    const summary = document.getElementById('aiTaskConfirmSummary');
    if (summary) {
        const modeLabel = preview.weekdaysOnly ? 'weekdays only' : 'all days';
        summary.textContent = `${preview.toCreate.length} task(s) will be created across the next ${preview.totalDays} day(s) (${modeLabel}).`;
    }
}

function createTasksFromAIPlan() {
    const modal = document.getElementById('aiTaskConfirmModal');
    if (modal) modal.classList.add('active');
    refreshAICreationPreviewSummary();
}

function confirmCreateTasksFromAIPlan() {
    refreshAICreationPreviewSummary();
    if (!pendingAICreationPreview || !pendingAICreationPreview.toCreate || pendingAICreationPreview.toCreate.length === 0) {
        alert('No new tasks were created (similar AI tasks already exist).');
        return;
    }

    pendingAICreationPreview.toCreate.forEach(task => tasks.push(task));
    saveTasks();
    renderTasks();
    renderDashboard();
    renderCalendar();
    renderAnalytics();
    addActivity('list-check', 'AI Tasks Created', `${pendingAICreationPreview.toCreate.length} tasks scheduled`);
    alert(`${pendingAICreationPreview.toCreate.length} AI-scheduled tasks created for the next ${pendingAICreationPreview.totalDays} day(s).`);
    pendingAICreationPreview = null;
    closeAITaskConfirmModal();
}

function addExam() {
    const name = document.getElementById('examName').value.trim();
    const subject = document.getElementById('examSubject').value;
    const date = document.getElementById('examDate').value;
    const notes = document.getElementById('examNotes').value.trim();
    
    if (!name || !date) {
        alert('Please enter exam name and date');
        return;
    }
    
    exams.push({ name, subject, date, notes });
    saveState({ exams });
    renderExams();
    
    addActivity('stopwatch', 'Exam Added', name);
    
    document.getElementById('examName').value = '';
    document.getElementById('examSubject').value = '';
    document.getElementById('examDate').value = '';
    document.getElementById('examNotes').value = '';
}

function deleteExam(index) {
    exams.splice(index, 1);
    saveState({ exams });
    renderExams();
    addActivity('trash', 'Exam Deleted', 'An exam was removed');
}

// ==================== ANALYTICS ====================
function getCompletionCountForDays(daysBack) {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - (daysBack - 1));
    from.setHours(0, 0, 0, 0);
    return activityLog.filter(item => item.title === 'Task Completed' && new Date(item.date) >= from).length;
}

function getStudyHoursForDays(daysBack) {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - (daysBack - 1));
    from.setHours(0, 0, 0, 0);
    const totalMinutes = pomodoroSessions
        .filter(session => new Date(session.date) >= from)
        .reduce((sum, session) => sum + (session.minutes || 0), 0);
    return Math.round((totalMinutes / 60) * 10) / 10;
}

function renderAnalyticsCharts(completed, pending) {
    if (typeof Chart === 'undefined') return;

    const trendCanvas = document.getElementById('progressTrendChart');
    const splitCanvas = document.getElementById('completionSplitChart');
    if (!trendCanvas || !splitCanvas) return;

    const weeklyCompleted = getCompletionCountForDays(7);
    const monthlyCompleted = getCompletionCountForDays(30);
    const weeklyHours = getStudyHoursForDays(7);
    const monthlyHours = getStudyHoursForDays(30);

    if (progressTrendChartInstance) progressTrendChartInstance.destroy();
    progressTrendChartInstance = new Chart(trendCanvas, {
        type: 'bar',
        data: {
            labels: ['Weekly', 'Monthly'],
            datasets: [
                {
                    label: 'Completed Tasks',
                    data: [weeklyCompleted, monthlyCompleted],
                    backgroundColor: '#2193b0'
                },
                {
                    label: 'Study Hours',
                    data: [weeklyHours, monthlyHours],
                    backgroundColor: '#4caf50'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

    if (completionSplitChartInstance) completionSplitChartInstance.destroy();
    completionSplitChartInstance = new Chart(splitCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ['#4caf50', '#ff9800']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    const weeklyReportText = document.getElementById('weeklyReportText');
    const monthlyReportText = document.getElementById('monthlyReportText');
    if (weeklyReportText) {
        weeklyReportText.textContent = `Weekly Report: ${weeklyCompleted} tasks completed, ${weeklyHours} study hours logged.`;
    }
    if (monthlyReportText) {
        monthlyReportText.textContent = `Monthly Report: ${monthlyCompleted} tasks completed, ${monthlyHours} study hours logged.`;
    }
}

function renderAnalytics() {
    const completed = tasks.filter(t => t.done).length;
    const pending = tasks.filter(t => !t.done).length;
    const total = tasks.length;
    
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('taskCompletionPercent').textContent = percent + '%';
    document.getElementById('analyticsCompleted').textContent = completed;
    document.getElementById('analyticsPending').textContent = pending;
    
    // Study time
    const totalHours = Math.round(weeklyStats.studyHours * 10) / 10;
    document.getElementById('studyTimeHours').textContent = totalHours + 'h';
    
    const today = new Date();
    let todayMinutes = 0;
    pomodoroSessions.forEach(session => {
        const sessionDate = new Date(session.date);
        if (sessionDate.toDateString() === today.toDateString()) {
            todayMinutes += session.minutes;
        }
    });
    document.getElementById('studyToday').textContent = todayMinutes + ' min';
    
    // Week
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    let weekMinutes = 0;
    pomodoroSessions.forEach(session => {
        const sessionDate = new Date(session.date);
        if (sessionDate >= weekStart) {
            weekMinutes += session.minutes;
        }
    });
    document.getElementById('studyWeek').textContent = Math.round(weekMinutes / 60 * 10) / 10 + ' hrs';
    
    // Flashcards
    let totalCards = 0;
    Object.values(flashcards).forEach(deck => totalCards += deck.length);
    document.getElementById('totalFlashcards').textContent = totalCards;
    document.getElementById('totalDecks').textContent = Object.keys(flashcards).length;
    document.getElementById('flashcardReviewed').textContent = weeklyStats.flashcardsReviewed;
    
    // Streak
    document.getElementById('currentStreak').textContent = studyStreak;
    document.getElementById('bestStreak').textContent = bestStreak + ' days';
    
    // Productivity score
    let score = 0;
    score += Math.min(percent, 30); // up to 30 points for task completion
    score += Math.min(totalHours * 2, 30); // up to 30 points for study hours
    score += Math.min(weeklyStats.flashcardsReviewed, 20); // up to 20 points for flashcards
    score += Math.min(studyStreak, 20); // up to 20 points for streak
    
    document.getElementById('productivityScore').textContent = score;
    document.getElementById('scoreFill').style.width = score + '%';

    renderAnalyticsCharts(completed, pending);
}

// ==================== SUBJECTS ====================
function renderSubjects() {
    const grid = document.getElementById('subjectsGrid');
    
    if (subjects.length === 0) {
        grid.innerHTML = '<div class="empty-state">No subjects yet</div>';
        return;
    }
    
    grid.innerHTML = subjects.map((subject, index) => {
        const taskCount = tasks.filter(t => t.subject === subject.name).length;
        const completedCount = tasks.filter(t => t.subject === subject.name && t.done).length;
        
        return `
            <div class="subject-card" style="border-left: 4px solid ${subject.color}">
                <h4>${subject.name}</h4>
                <p>${taskCount} tasks (${completedCount} completed)</p>
                <button class="delete-btn" onclick="deleteSubject(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

function addSubject() {
    const name = document.getElementById('newSubjectName').value.trim();
    const color = document.getElementById('subjectColor').value;
    
    if (!name) {
        alert('Please enter subject name');
        return;
    }
    
    if (subjects.some(s => s.name === name)) {
        alert('Subject already exists');
        return;
    }
    
    subjects.push({ name, color });
    localStorage.setItem('subjects', JSON.stringify(subjects));
    renderSubjects();
    
    addActivity('book', 'Subject Added', name);
    
    document.getElementById('newSubjectName').value = '';
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    localStorage.setItem('subjects', JSON.stringify(subjects));
    renderSubjects();
}

// ==================== TIMETABLE ====================
function renderTimetable() {
    const list = document.getElementById('timetableList');
    const grid = document.getElementById('timetableGridView');
    if (!list) return;

    const entries = [...timetableEntries];

    if (entries.length === 0) {
        list.innerHTML = '<li class="empty-state">No timetable entries yet</li>';
        if (grid) grid.innerHTML = '<div class="empty-state">Weekly grid will appear after you add entries.</div>';
        return;
    }

    list.innerHTML = entries.map(entry => `
        <li class="timetable-draggable" draggable="true" ondragstart="onTimetableDragStart('${entry.id}')" ondragover="onTimetableDragOver(event)" ondrop="onTimetableDrop('${entry.id}')">
            <div class="assignment-header">
                <span class="assignment-title">${entry.subject}</span>
                <span class="assignment-type">${entry.day}</span>
            </div>
            <div class="assignment-meta">
                <span class="task-due"><i class="fas fa-clock"></i> ${entry.time}</span>
                ${entry.topic ? `<span class="task-subject">${entry.topic}</span>` : ''}
            </div>
            <button class="delete-btn" onclick="deleteTimetableEntry('${entry.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');

    if (grid) {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
        const sortedEntries = [...entries].sort((a, b) => {
            if (dayOrder[a.day] !== dayOrder[b.day]) return (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
            return String(a.time || '').localeCompare(String(b.time || ''));
        });
        grid.innerHTML = `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;">
                ${weekDays.map(day => {
                    const dayEntries = sortedEntries.filter(e => e.day === day);
                    return `
                        <div style="border:1px solid #e5e7eb;border-radius:10px;padding:10px;background:#fff;">
                            <strong>${day}</strong>
                            ${dayEntries.length === 0
                                ? '<p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">No sessions</p>'
                                : dayEntries.map(e => `<p style="margin:8px 0 0;font-size:13px;"><b>${e.time}</b> ${e.subject}</p>`).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
}

function onTimetableDragStart(id) {
    draggedTimetableId = id;
}

function onTimetableDragOver(event) {
    event.preventDefault();
}

function onTimetableDrop(targetId) {
    if (!draggedTimetableId || draggedTimetableId === targetId) return;

    const fromIndex = timetableEntries.findIndex(entry => entry.id === draggedTimetableId);
    const toIndex = timetableEntries.findIndex(entry => entry.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;

    const [moved] = timetableEntries.splice(fromIndex, 1);
    timetableEntries.splice(toIndex, 0, moved);
    saveState({ timetableEntries });
    renderTimetable();
    draggedTimetableId = null;
}

function addTimetableEntry() {
    const day = document.getElementById('timetableDay')?.value;
    const time = document.getElementById('timetableTime')?.value;
    const subject = document.getElementById('timetableSubject')?.value.trim();
    const topic = document.getElementById('timetableTopic')?.value.trim();

    if (!day || !time || !subject) {
        alert('Please enter day, time, and subject.');
        return;
    }

    timetableEntries.push({
        id: `tt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        day,
        time,
        subject,
        topic
    });
    saveState({ timetableEntries });
    renderTimetable();
    addActivity('calendar-alt', 'Timetable Entry Added', `${subject} on ${day}`);

    document.getElementById('timetableSubject').value = '';
    document.getElementById('timetableTopic').value = '';
}

function deleteTimetableEntry(id) {
    timetableEntries = timetableEntries.filter(entry => entry.id !== id);
    saveState({ timetableEntries });
    renderTimetable();
}

// ==================== RESOURCES ====================
function renderResources() {
    const list = document.getElementById('resourcesList');
    const searchInput = document.getElementById('resourceSearchInput');
    const filterSelect = document.getElementById('resourceFilterType');
    if (!list) return;
    if (searchInput) searchInput.value = resourceSearchQuery;
    if (filterSelect) filterSelect.value = resourceTypeFilter;

    const filteredResources = resources.filter(resource => {
        const matchesType = resourceTypeFilter === "all" || resource.type === resourceTypeFilter;
        const q = resourceSearchQuery.trim().toLowerCase();
        const matchesQuery = !q || resource.title.toLowerCase().includes(q) || resource.url.toLowerCase().includes(q);
        return matchesType && matchesQuery;
    });

    if (filteredResources.length === 0) {
        list.innerHTML = resources.length === 0
            ? '<li class="empty-state">No resources saved yet</li>'
            : '<li class="empty-state">No resources match your search/filter</li>';
        return;
    }

    list.innerHTML = filteredResources.map(resource => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${resource.title}</span>
                <span class="assignment-type">${resource.type}</span>
            </div>
            <div class="assignment-meta">
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.url}</a>
            </div>
            <button class="action-btn" onclick="openResource('${encodeURIComponent(resource.url)}')">
                <i class="fas fa-up-right-from-square"></i> Open
            </button>
            <button class="delete-btn" onclick="deleteResource('${resource.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');
}

function openResource(encodedUrl) {
    const url = decodeURIComponent(encodedUrl);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (opened) return;

    // Fallback for stricter popup settings in some Chrome configurations.
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function searchResources() {
    const input = document.getElementById('resourceSearchInput');
    resourceSearchQuery = input ? input.value : "";
    renderResources();
}

function filterResources() {
    const select = document.getElementById('resourceFilterType');
    resourceTypeFilter = select ? select.value : "all";
    renderResources();
}

function addResource() {
    const title = document.getElementById('resourceTitle')?.value.trim();
    let url = document.getElementById('resourceUrl')?.value.trim();
    const type = document.getElementById('resourceType')?.value || 'Article';

    if (!title || !url) {
        alert('Please enter resource title and URL.');
        return;
    }
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    resources.unshift({
        id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        url,
        type,
        createdAt: new Date().toISOString()
    });
    saveState({ resources });
    renderResources();
    addActivity('link', 'Resource Added', title);

    document.getElementById('resourceTitle').value = '';
    document.getElementById('resourceUrl').value = '';
}

function deleteResource(id) {
    resources = resources.filter(resource => resource.id !== id);
    saveState({ resources });
    renderResources();
}

// ==================== STUDY MATERIALS ====================
function renderStudyMaterials() {
    const list = document.getElementById('studyMaterialsList');
    const searchInput = document.getElementById('studyMaterialSearchInput');
    const filterSelect = document.getElementById('studyMaterialFilterSubject');
    if (!list) return;
    if (searchInput) searchInput.value = studyMaterialSearchQuery;
    if (filterSelect) filterSelect.value = studyMaterialFilterSubject;

    const query = studyMaterialSearchQuery.trim().toLowerCase();
    const filtered = studyMaterials.filter(item => {
        const subjectMatch = studyMaterialFilterSubject === 'all' || item.subject === studyMaterialFilterSubject;
        const queryMatch = !query
            || String(item.title || '').toLowerCase().includes(query)
            || String(item.subject || '').toLowerCase().includes(query)
            || String(item.description || '').toLowerCase().includes(query)
            || String(item.type || '').toLowerCase().includes(query);
        return subjectMatch && queryMatch;
    });

    if (filtered.length === 0) {
        list.innerHTML = studyMaterials.length === 0
            ? '<li class="empty-state">No study materials yet</li>'
            : '<li class="empty-state">No study materials match your search</li>';
        return;
    }

    list.innerHTML = filtered.map(item => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${item.title}</span>
                <span class="assignment-type">${item.type}</span>
            </div>
            <div class="task-meta">
                <span class="task-subject">${item.subject}</span>
                <span>${item.description || 'No description provided.'}</span>
            </div>
            <div class="task-options">
                ${item.url ? `<button class="action-btn" onclick="openStudyMaterial('${encodeURIComponent(item.url)}')"><i class="fas fa-up-right-from-square"></i> Open Link</button>` : ''}
                <button class="action-btn" onclick="saveMaterialToResources('${item.id}')"><i class="fas fa-bookmark"></i> Save to Resources</button>
                <button class="delete-btn" onclick="deleteStudyMaterial('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');
}

function searchStudyMaterials() {
    const input = document.getElementById('studyMaterialSearchInput');
    studyMaterialSearchQuery = input ? input.value : '';
    renderStudyMaterials();
}

function filterStudyMaterials() {
    const select = document.getElementById('studyMaterialFilterSubject');
    studyMaterialFilterSubject = select ? select.value : 'all';
    renderStudyMaterials();
}

function addStudyMaterial() {
    const title = document.getElementById('studyMaterialTitleInput')?.value.trim();
    const subject = document.getElementById('studyMaterialSubjectInput')?.value || 'General';
    const type = document.getElementById('studyMaterialTypeInput')?.value || 'Notes';
    let url = document.getElementById('studyMaterialUrlInput')?.value.trim() || '';
    const description = document.getElementById('studyMaterialDescInput')?.value.trim() || '';

    if (!title) {
        alert('Please enter material title.');
        return;
    }
    if (url && !/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    studyMaterials.unshift({
        id: `mat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        subject,
        type,
        url,
        description,
        createdAt: new Date().toISOString()
    });
    saveState({ studyMaterials });
    renderStudyMaterials();
    addActivity('book-open', 'Study Material Added', title);

    document.getElementById('studyMaterialTitleInput').value = '';
    document.getElementById('studyMaterialUrlInput').value = '';
    document.getElementById('studyMaterialDescInput').value = '';
}

function openStudyMaterial(encodedUrl) {
    const url = decodeURIComponent(encodedUrl || '');
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function saveMaterialToResources(materialId) {
    const material = studyMaterials.find(item => item.id === materialId);
    if (!material) return;

    const alreadyExists = resources.some(res => res.title === material.title && res.url === material.url);
    if (alreadyExists) {
        alert('This material is already saved in Resources.');
        return;
    }

    const resourceUrl = material.url
        ? material.url
        : `data:text/plain;charset=utf-8,${encodeURIComponent(`${material.title}\n\n${material.description || 'No description available.'}`)}`;

    resources.unshift({
        id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: material.title,
        url: resourceUrl,
        type: material.type || 'Article',
        createdAt: new Date().toISOString()
    });
    saveState({ resources });
    addActivity('bookmark', 'Material Saved', material.title);
    alert('Saved to Resources page.');
}

function deleteStudyMaterial(id) {
    studyMaterials = studyMaterials.filter(item => item.id !== id);
    saveState({ studyMaterials });
    renderStudyMaterials();
}

// ==================== FREE NOTES ====================
function renderFreeNotes() {
    const list = document.getElementById('freeNotesList');
    const searchInput = document.getElementById('freeNotesSearchInput');
    const filterSelect = document.getElementById('freeNotesFilterSubject');
    if (!list) return;
    if (searchInput) searchInput.value = freeNotesSearchQuery;
    if (filterSelect) filterSelect.value = freeNotesFilterSubject;

    const query = freeNotesSearchQuery.trim().toLowerCase();
    const filtered = freeNotesLibrary.filter(note => {
        const subjectMatch = freeNotesFilterSubject === 'all' || note.subject === freeNotesFilterSubject;
        const queryMatch = !query
            || String(note.title || '').toLowerCase().includes(query)
            || String(note.subject || '').toLowerCase().includes(query)
            || String(note.level || '').toLowerCase().includes(query)
            || String(note.content || '').toLowerCase().includes(query);
        return subjectMatch && queryMatch;
    });

    if (filtered.length === 0) {
        list.innerHTML = freeNotesLibrary.length === 0
            ? '<li class="empty-state">No free notes available yet</li>'
            : '<li class="empty-state">No free notes match your search</li>';
        return;
    }

    list.innerHTML = filtered.map(note => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${note.title}</span>
                <span class="assignment-type">${note.level || 'General'}</span>
            </div>
            <div class="task-meta">
                <span class="task-subject">${note.subject || 'General'}</span>
            </div>
            <p class="assignment-desc">${String(note.content || '').slice(0, 220)}${String(note.content || '').length > 220 ? '...' : ''}</p>
            <div class="task-options">
                <button class="action-btn" type="button" onclick="downloadFreeNote('${note.id}')">
                    <i class="fas fa-download"></i> Download Free
                </button>
                <button class="action-btn" type="button" onclick="downloadFreeNotePDF('${note.id}')">
                    <i class="fas fa-file-pdf"></i> Download PDF
                </button>
                <button class="delete-btn" onclick="deleteFreeNote('${note.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');
}

function searchFreeNotes() {
    const input = document.getElementById('freeNotesSearchInput');
    freeNotesSearchQuery = input ? input.value : '';
    renderFreeNotes();
}

function filterFreeNotes() {
    const select = document.getElementById('freeNotesFilterSubject');
    freeNotesFilterSubject = select ? select.value : 'all';
    renderFreeNotes();
}

function addFreeNote() {
    const title = document.getElementById('freeNoteTitleInput')?.value.trim();
    const subject = document.getElementById('freeNoteSubjectInput')?.value || 'General';
    const level = document.getElementById('freeNoteLevelInput')?.value.trim() || 'General';
    const content = document.getElementById('freeNoteContentInput')?.value.trim();

    if (!title || !content) {
        alert('Please enter note title and content.');
        return;
    }

    freeNotesLibrary.unshift({
        id: `note-pack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        subject,
        level,
        content,
        createdAt: new Date().toISOString()
    });
    saveState({ freeNotesLibrary });
    renderFreeNotes();
    addActivity('file-circle-plus', 'Free Note Added', title);

    document.getElementById('freeNoteTitleInput').value = '';
    document.getElementById('freeNoteLevelInput').value = '';
    document.getElementById('freeNoteContentInput').value = '';
}

function downloadFreeNote(noteId) {
    const note = freeNotesLibrary.find(item => item.id === noteId);
    if (!note) return;

    const safeTitle = String(note.title || 'free-note').replace(/[^\w\-]+/g, '_').toLowerCase();
    const content = `${note.title}\nSubject: ${note.subject}\nLevel: ${note.level}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    addActivity('file-arrow-down', 'Free Note Downloaded', note.title);
}

function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function downloadFreeNotePDF(noteId) {
    const note = freeNotesLibrary.find(item => item.id === noteId);
    if (!note) return;

    const printableTitle = escapeHtml(note.title || "Free Note");
    const printableSubject = escapeHtml(note.subject || "General");
    const printableLevel = escapeHtml(note.level || "General");
    const printableContent = escapeHtml(note.content || "").replace(/\n/g, "<br>");

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
        alert("Popup blocked. Please allow popups to export PDF.");
        return;
    }

    printWindow.document.write(`
        <html>
        <head>
            <title>${printableTitle}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 32px; color: #1f2937; }
                h1 { margin-bottom: 8px; color: #0f766e; }
                .meta { margin-bottom: 16px; color: #475569; }
                .content { line-height: 1.6; white-space: normal; }
            </style>
        </head>
        <body>
            <h1>${printableTitle}</h1>
            <div class="meta"><strong>Subject:</strong> ${printableSubject} | <strong>Level:</strong> ${printableLevel}</div>
            <div class="content">${printableContent}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 300);

    addActivity('file-pdf', 'Free Note PDF Exported', note.title);
}

function deleteFreeNote(id) {
    freeNotesLibrary = freeNotesLibrary.filter(note => note.id !== id);
    saveState({ freeNotesLibrary });
    renderFreeNotes();
}

// ==================== ACHIEVEMENTS ====================
function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;

    const completedTasks = tasks.filter(t => t.done).length;
    const badges = [];

    if (completedTasks >= 10) badges.push({ icon: 'check-circle', name: 'Task Finisher', desc: 'Completed at least 10 tasks.' });
    if (completedTasks >= 50) badges.push({ icon: 'trophy', name: 'Task Master', desc: 'Completed at least 50 tasks.' });
    if (studyStreak >= 3) badges.push({ icon: 'fire', name: 'Streak Starter', desc: 'Maintained a 3-day streak.' });
    if (studyStreak >= 10) badges.push({ icon: 'medal', name: 'Consistency Pro', desc: 'Maintained a 10-day streak.' });
    if (weeklyStats.studyHours >= 5) badges.push({ icon: 'clock', name: 'Focused Learner', desc: 'Studied 5+ hours this week.' });
    if (weeklyStats.flashcardsReviewed >= 20) badges.push({ icon: 'layer-group', name: 'Flashcard Hero', desc: 'Reviewed 20+ flashcards.' });

    if (badges.length === 0) {
        list.innerHTML = '<li class="empty-state">No badges yet. Keep studying to unlock achievements.</li>';
        return;
    }

    list.innerHTML = badges.map(badge => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title"><i class="fas fa-${badge.icon}"></i> ${badge.name}</span>
            </div>
            <p class="assignment-desc">${badge.desc}</p>
        </li>
    `).join('');
}

// ==================== QUIZ ====================
const quizQuestionBank = [
    { subject: "Math", difficulty: "easy", question: "What is 8 + 5?", options: ["11", "12", "13", "14"], answerIndex: 2 },
    { subject: "Math", difficulty: "easy", question: "What is 15 - 7?", options: ["6", "7", "8", "9"], answerIndex: 2 },
    { subject: "Math", difficulty: "easy", question: "What is 6 x 4?", options: ["20", "22", "24", "26"], answerIndex: 2 },
    { subject: "Math", difficulty: "easy", question: "What is 36 / 6?", options: ["5", "6", "7", "8"], answerIndex: 1 },
    { subject: "Math", difficulty: "easy", question: "What is half of 20?", options: ["8", "9", "10", "12"], answerIndex: 2 },
    { subject: "English", difficulty: "easy", question: "Choose the correct spelling.", options: ["Recieve", "Receive", "Receeve", "Receve"], answerIndex: 1 },
    { subject: "English", difficulty: "easy", question: "Which is a noun?", options: ["Quickly", "Beautiful", "Happiness", "Run"], answerIndex: 2 },
    { subject: "English", difficulty: "easy", question: "Choose the antonym of hot.", options: ["Warm", "Cold", "Heat", "Boiling"], answerIndex: 1 },
    { subject: "English", difficulty: "easy", question: "What is the plural of child?", options: ["Childs", "Children", "Childes", "Childrens"], answerIndex: 1 },
    { subject: "English", difficulty: "easy", question: "Choose the correct sentence.", options: ["i like apples.", "I like apples.", "I like Apples.", "i Like apples."], answerIndex: 1 },
    { subject: "Programming", difficulty: "easy", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language", "Hyperlinks Text Machine Language"], answerIndex: 0 },
    { subject: "Programming", difficulty: "easy", question: "Which symbol is used for JavaScript single-line comments?", options: ["<!-- -->", "//", "##", "**"], answerIndex: 1 },
    { subject: "Programming", difficulty: "easy", question: "What does CSS stand for?", options: ["Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System"], answerIndex: 2 },
    { subject: "Programming", difficulty: "easy", question: "Which language runs in the browser?", options: ["Python", "Java", "JavaScript", "C++"], answerIndex: 2 },
    { subject: "Programming", difficulty: "easy", question: "Which symbol is used to assign a value in JS?", options: ["==", "=", "===", ":"], answerIndex: 1 },
    { subject: "History", difficulty: "easy", question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "John Adams", "George Washington", "Thomas Jefferson"], answerIndex: 2 },
    { subject: "History", difficulty: "easy", question: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], answerIndex: 1 },
    { subject: "History", difficulty: "easy", question: "Who discovered America in 1492?", options: ["Marco Polo", "Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan"], answerIndex: 1 },
    { subject: "History", difficulty: "easy", question: "The Great Wall is in which country?", options: ["India", "Japan", "China", "Korea"], answerIndex: 2 },
    { subject: "History", difficulty: "easy", question: "Which city was the capital of the Roman Empire?", options: ["Athens", "Rome", "Alexandria", "Sparta"], answerIndex: 1 },
    { subject: "Geography", difficulty: "easy", question: "What is the capital city of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answerIndex: 2 },
    { subject: "Geography", difficulty: "easy", question: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answerIndex: 3 },
    { subject: "Geography", difficulty: "easy", question: "Which continent is Brazil in?", options: ["Africa", "Europe", "South America", "Asia"], answerIndex: 2 },
    { subject: "Geography", difficulty: "easy", question: "Which river flows through Egypt?", options: ["Amazon", "Yangtze", "Nile", "Danube"], answerIndex: 2 },
    { subject: "Geography", difficulty: "easy", question: "Which is the largest hot desert?", options: ["Gobi", "Kalahari", "Sahara", "Atacama"], answerIndex: 2 },

    { subject: "Math", difficulty: "medium", question: "Solve: 3x = 21. x = ?", options: ["6", "7", "8", "9"], answerIndex: 1 },
    { subject: "Math", difficulty: "medium", question: "What is 2^3 + 4?", options: ["10", "11", "12", "13"], answerIndex: 2 },
    { subject: "Math", difficulty: "medium", question: "Find 25% of 200.", options: ["25", "40", "50", "60"], answerIndex: 2 },
    { subject: "Math", difficulty: "medium", question: "If a triangle angles are 50 and 60, third angle is?", options: ["60", "65", "70", "75"], answerIndex: 2 },
    { subject: "Math", difficulty: "medium", question: "What is the area of rectangle 8 x 5?", options: ["13", "30", "40", "45"], answerIndex: 2 },
    { subject: "English", difficulty: "medium", question: "Which sentence is in past tense?", options: ["She writes daily.", "She wrote daily.", "She will write daily.", "She is writing daily."], answerIndex: 1 },
    { subject: "English", difficulty: "medium", question: "Pick the correctly punctuated sentence.", options: ["Lets eat grandma.", "Let's eat, grandma.", "Lets, eat grandma.", "Let's eat grandma"], answerIndex: 1 },
    { subject: "English", difficulty: "medium", question: "Choose the adverb.", options: ["Happy", "Quickly", "Blue", "Book"], answerIndex: 1 },
    { subject: "English", difficulty: "medium", question: "Which is a synonym of begin?", options: ["End", "Start", "Stop", "Close"], answerIndex: 1 },
    { subject: "English", difficulty: "medium", question: "Which sentence uses a conjunction?", options: ["The sky is blue.", "I ran and she walked.", "Open the door.", "He is tall."], answerIndex: 1 },
    { subject: "Programming", difficulty: "medium", question: "Which method converts JSON text to object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.objectify()"], answerIndex: 1 },
    { subject: "Programming", difficulty: "medium", question: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "static"], answerIndex: 2 },
    { subject: "Programming", difficulty: "medium", question: "Which loop is best for arrays in JS?", options: ["do...until", "for...of", "repeat", "goto"], answerIndex: 1 },
    { subject: "Programming", difficulty: "medium", question: "What does DOM stand for?", options: ["Data Object Model", "Document Object Model", "Digital Ordinance Model", "Document Oriented Module"], answerIndex: 1 },
    { subject: "Programming", difficulty: "medium", question: "Which array method adds item to end?", options: ["pop()", "shift()", "push()", "slice()"], answerIndex: 2 },
    { subject: "History", difficulty: "medium", question: "Which civilization built pyramids of Giza?", options: ["Romans", "Greeks", "Egyptians", "Mayans"], answerIndex: 2 },
    { subject: "History", difficulty: "medium", question: "The Renaissance began in which country?", options: ["France", "Italy", "Germany", "Spain"], answerIndex: 1 },
    { subject: "History", difficulty: "medium", question: "Magna Carta was signed in which year?", options: ["1066", "1215", "1492", "1776"], answerIndex: 1 },
    { subject: "History", difficulty: "medium", question: "Industrial Revolution first began in?", options: ["France", "Germany", "Britain", "USA"], answerIndex: 2 },
    { subject: "History", difficulty: "medium", question: "Main rivals in Cold War were?", options: ["USA and USSR", "UK and France", "China and Japan", "India and Pakistan"], answerIndex: 0 },
    { subject: "Geography", difficulty: "medium", question: "Mount Everest is on Nepal border with?", options: ["Bhutan", "Tibet", "India", "Pakistan"], answerIndex: 1 },
    { subject: "Geography", difficulty: "medium", question: "Sahara Desert is in which continent?", options: ["Asia", "Africa", "Australia", "South America"], answerIndex: 1 },
    { subject: "Geography", difficulty: "medium", question: "Prime Meridian passes through which place?", options: ["Greenwich", "Paris", "Rome", "New York"], answerIndex: 0 },
    { subject: "Geography", difficulty: "medium", question: "Which country has the most population?", options: ["USA", "India", "Brazil", "Russia"], answerIndex: 1 },
    { subject: "Geography", difficulty: "medium", question: "Which line divides Earth into hemispheres?", options: ["Tropic of Cancer", "Prime Meridian", "Equator", "Date Line"], answerIndex: 2 },

    { subject: "Math", difficulty: "hard", question: "If y = 2x + 3, what is y when x = 5?", options: ["11", "12", "13", "14"], answerIndex: 2 },
    { subject: "Math", difficulty: "hard", question: "Roots of x^2 - 5x + 6 = 0 are?", options: ["1 and 6", "2 and 3", "-2 and -3", "3 and 4"], answerIndex: 1 },
    { subject: "Math", difficulty: "hard", question: "Derivative of x^2 is?", options: ["x", "2x", "x^2", "2"], answerIndex: 1 },
    { subject: "Math", difficulty: "hard", question: "If sin A = 1, A equals?", options: ["0 deg", "30 deg", "60 deg", "90 deg"], answerIndex: 3 },
    { subject: "Math", difficulty: "hard", question: "What is the value of pi (approx)?", options: ["2.14", "3.14", "4.13", "3.41"], answerIndex: 1 },
    { subject: "English", difficulty: "hard", question: "What is the synonym of abundant?", options: ["Scarce", "Plentiful", "Tiny", "Narrow"], answerIndex: 1 },
    { subject: "English", difficulty: "hard", question: "Identify the literary device: 'Time is a thief.'", options: ["Alliteration", "Metaphor", "Hyperbole", "Irony"], answerIndex: 1 },
    { subject: "English", difficulty: "hard", question: "Choose the passive voice sentence.", options: ["The chef cooked dinner.", "Dinner was cooked by the chef.", "The chef is cooking dinner.", "Cook dinner now."], answerIndex: 1 },
    { subject: "English", difficulty: "hard", question: "Choose the correct reported speech: He said, 'I am tired.'", options: ["He said he is tired.", "He said he was tired.", "He says he was tired.", "He told I am tired."], answerIndex: 1 },
    { subject: "English", difficulty: "hard", question: "What is the antonym of 'transparent'?", options: ["Clear", "Opaque", "Visible", "Bright"], answerIndex: 1 },
    { subject: "Programming", difficulty: "hard", question: "What is typeof null in JavaScript?", options: ["null", "object", "undefined", "boolean"], answerIndex: 1 },
    { subject: "Programming", difficulty: "hard", question: "What is a closure in JavaScript?", options: ["A CSS style", "A function with preserved outer scope", "A loop keyword", "An HTML tag"], answerIndex: 1 },
    { subject: "Programming", difficulty: "hard", question: "Which method is immutable for arrays?", options: ["splice()", "push()", "slice()", "pop()"], answerIndex: 2 },
    { subject: "Programming", difficulty: "hard", question: "Which complexity is binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answerIndex: 1 },
    { subject: "Programming", difficulty: "hard", question: "In async JS, which waits for Promise result?", options: ["yield", "await", "defer", "pause"], answerIndex: 1 },
    { subject: "History", difficulty: "hard", question: "Which treaty ended World War I?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Rome", "Treaty of Vienna"], answerIndex: 1 },
    { subject: "History", difficulty: "hard", question: "Fall of Constantinople happened in?", options: ["1204", "1453", "1498", "1526"], answerIndex: 1 },
    { subject: "History", difficulty: "hard", question: "French Revolution began in?", options: ["1688", "1776", "1789", "1815"], answerIndex: 2 },
    { subject: "History", difficulty: "hard", question: "Who wrote 'The Prince'?", options: ["Plato", "Aristotle", "Machiavelli", "Socrates"], answerIndex: 2 },
    { subject: "History", difficulty: "hard", question: "Which empire was ruled by Suleiman the Magnificent?", options: ["Roman", "Ottoman", "Mughal", "Byzantine"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Which line roughly follows 180 deg longitude?", options: ["Prime Meridian", "Equator", "International Date Line", "Tropic of Capricorn"], answerIndex: 2 },
    { subject: "Geography", difficulty: "hard", question: "Which country has no natural rivers?", options: ["Egypt", "Saudi Arabia", "India", "Brazil"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Which current causes mild climate in Western Europe?", options: ["Labrador Current", "Gulf Stream", "Canary Current", "Benguela Current"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Ring of Fire is around which ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Which country is both in Europe and Asia?", options: ["Spain", "Turkey", "Portugal", "Norway"], answerIndex: 1 }
];

const QUIZ_SUBJECTS = ["Math", "English", "Programming", "History", "Geography"];
const QUIZ_DIFFICULTIES = ["easy", "medium", "hard"];
const QUIZ_MIN_PER_SUBJECT_DIFFICULTY = 25;

const autoQuestionTopics = {
    Math: ["fractions", "percentages", "algebra", "geometry", "ratio", "number patterns", "equations", "integers", "probability", "measurement"],
    English: ["grammar", "vocabulary", "tenses", "punctuation", "synonyms", "antonyms", "reading comprehension", "sentence structure", "parts of speech", "spelling"],
    Programming: ["variables", "loops", "functions", "arrays", "objects", "debugging", "algorithms", "conditionals", "syntax", "data types"],
    History: ["ancient civilizations", "world wars", "revolutions", "empires", "treaties", "important leaders", "timelines", "historical sources", "industrial era", "cold war"],
    Geography: ["continents", "oceans", "landforms", "climate", "countries", "capitals", "maps", "coordinates", "rivers", "resources"]
};

function createAutoQuizQuestion(subject, difficulty, idx) {
    const topics = autoQuestionTopics[subject] || ["general knowledge"];
    const mainTopic = topics[idx % topics.length];
    const alt1 = topics[(idx + 1) % topics.length];
    const alt2 = topics[(idx + 2) % topics.length];
    const alt3 = topics[(idx + 3) % topics.length];

    let stem = "";
    if (difficulty === "easy") {
        stem = `[${subject} Easy ${idx}] Which option is most related to "${mainTopic}"?`;
    } else if (difficulty === "medium") {
        stem = `[${subject} Medium ${idx}] In ${subject}, choose the best concept linked with "${mainTopic}".`;
    } else {
        stem = `[${subject} Hard ${idx}] Select the most accurate advanced concept for "${mainTopic}" in ${subject}.`;
    }

    return {
        subject,
        difficulty,
        question: stem,
        options: [
            `${mainTopic} concept`,
            `${alt1} concept`,
            `${alt2} concept`,
            `${alt3} concept`
        ],
        answerIndex: 0
    };
}

function ensureMinimumQuizQuestionsPerSubjectDifficulty(minCount) {
    const existingKeys = new Set(quizQuestionBank.map(q => `${q.subject}|${q.difficulty}|${q.question}`));

    QUIZ_SUBJECTS.forEach((subject) => {
        QUIZ_DIFFICULTIES.forEach((difficulty) => {
            const currentCount = quizQuestionBank.filter(q => q.subject === subject && q.difficulty === difficulty).length;
            let needed = Math.max(0, minCount - currentCount);
            let seed = 1;

            while (needed > 0) {
                const candidate = createAutoQuizQuestion(subject, difficulty, seed);
                const key = `${candidate.subject}|${candidate.difficulty}|${candidate.question}`;
                seed++;
                if (existingKeys.has(key)) continue;
                existingKeys.add(key);
                quizQuestionBank.push(candidate);
                needed--;
            }
        });
    });
}

ensureMinimumQuizQuestionsPerSubjectDifficulty(QUIZ_MIN_PER_SUBJECT_DIFFICULTY);
let currentQuizSession = [];

function generateQuizSession() {
    const subject = document.getElementById('quizSubject')?.value || 'Any';
    const difficulty = document.getElementById('quizDifficulty')?.value || 'medium';
    const requestedCount = Math.max(5, Math.min(25, Number(document.getElementById('quizQuestionCount')?.value || 5)));

    const matchesDifficulty = (q) => difficulty === 'mixed' || q.difficulty === difficulty;
    let pool = quizQuestionBank.filter(q => matchesDifficulty(q));
    if (subject !== 'Any') {
        pool = pool.filter(q => q.subject === subject);
    }

    if (pool.length === 0) {
        alert('No questions available for selected filters.');
        return;
    }

    if (pool.length < requestedCount) {
        const selectedLabel = `${subject}${difficulty === 'mixed' ? '' : ` (${difficulty})`}`;
        alert(
            `Need at least ${requestedCount} unique questions for ${selectedLabel}. ` +
            `Currently available: ${pool.length}. Please add more questions first.`
        );
        return;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    currentQuizSession = shuffled.slice(0, requestedCount);
    renderQuizQuestions();
}

function renderQuizQuestions() {
    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;
    if (currentQuizSession.length === 0) {
        container.innerHTML = '<div class="empty-state">Generate a quiz to start.</div>';
        return;
    }

    container.innerHTML = currentQuizSession.map((q, idx) => `
        <div class="card">
            <h4>Q${idx + 1}. ${q.question}</h4>
            <div>
                ${q.options.map((opt, optIdx) => `
                    <label style="display:block;margin:6px 0;">
                        <input type="radio" name="quiz-q-${idx}" value="${optIdx}"> ${opt}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

async function submitQuiz() {
    if (currentQuizSession.length === 0) {
        alert('Generate a quiz first.');
        return;
    }

    let score = 0;
    currentQuizSession.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="quiz-q-${idx}"]:checked`);
        if (selected && Number(selected.value) === q.answerIndex) score++;
    });
    const percent = Math.round((score / currentQuizSession.length) * 100);
    const user = getCurrentUser();
    const record = {
        id: `quiz-${Date.now()}`,
        userEmail: user ? user.email : 'unknown',
        userName: user ? user.name : 'Unknown',
        score,
        total: currentQuizSession.length,
        percent,
        createdAt: new Date().toISOString()
    };
    quizScores.unshift(record);
    saveState({ quizScores });
    document.getElementById('quizScoreResult').textContent = `${score}/${currentQuizSession.length} (${percent}%)`;
    addActivity('graduation-cap', 'Quiz Submitted', `Score ${percent}%`);
    await syncQuizScoreWithServer(record);
}

function renderQuizPage() {
    renderQuizQuestions();
    const history = document.getElementById('quizHistoryList');
    if (!history) return;
    const currentUser = getCurrentUser();
    const userScores = quizScores.filter(q => currentUser && q.userEmail === currentUser.email).slice(0, 10);
    if (userScores.length === 0) {
        history.innerHTML = '<li class="empty-state">No quiz attempts yet</li>';
        return;
    }
    history.innerHTML = userScores.map(item => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${item.score}/${item.total} (${item.percent}%)</span>
                <span class="assignment-type">${new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
        </li>
    `).join('');
}

async function syncQuizScoreWithServer(record) {
    try {
        await fetch(`${API_BASE_URL}/api/quiz-scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });
    } catch (_) {}
}

// ==================== ADMIN ====================
function renderAdminPage() {
    const panel = document.getElementById('adminAccessNotice');
    if (panel) {
        panel.textContent = canAccessAdmin()
            ? 'Admin access granted.'
            : 'Read-only mode. Register/Login as teacher/admin for update and reminder actions.';
    }
    updateBackendAuthStatus();
    renderTeacherUpdatesList();
    renderAdminQuizScores();
    loadTeacherUpdatesFromServer();
    loadQuizScoresFromServer();
}

function renderTeacherUpdatesList() {
    const list = document.getElementById('teacherUpdatesList');
    if (!list) return;
    if (teacherUpdates.length === 0) {
        list.innerHTML = '<li class="empty-state">No teacher updates yet</li>';
        return;
    }
    list.innerHTML = teacherUpdates.slice(0, 20).map(update => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${update.title}</span>
                <span class="assignment-type">${update.by || 'Teacher'}</span>
            </div>
            <p class="assignment-desc">${update.message}</p>
            <div class="assignment-meta">
                <span class="task-due">${new Date(update.createdAt).toLocaleString()}</span>
            </div>
        </li>
    `).join('');
}

function renderAdminQuizScores() {
    const list = document.getElementById('adminQuizScoresList');
    if (!list) return;
    if (quizScores.length === 0) {
        list.innerHTML = '<li class="empty-state">No quiz scores recorded yet</li>';
        return;
    }
    list.innerHTML = quizScores.slice(0, 30).map(score => `
        <li>
            <div class="assignment-header">
                <span class="assignment-title">${score.userName || score.userEmail}</span>
                <span class="assignment-type">${score.percent}%</span>
            </div>
            <div class="assignment-meta">
                <span>${score.score}/${score.total}</span>
                <span class="task-due">${new Date(score.createdAt).toLocaleString()}</span>
            </div>
        </li>
    `).join('');
}

async function postTeacherUpdate() {
    if (!canAccessAdmin()) {
        alert('Only teacher/admin can post updates.');
        return;
    }
    const title = document.getElementById('teacherUpdateTitle')?.value.trim();
    const message = document.getElementById('teacherUpdateMessage')?.value.trim();
    if (!title || !message) {
        alert('Please enter update title and message.');
        return;
    }
    const user = getCurrentUser();
    const update = {
        id: `upd-${Date.now()}`,
        title,
        message,
        by: user ? `${user.name} (${user.role})` : 'Teacher',
        createdAt: new Date().toISOString()
    };
    teacherUpdates.unshift(update);
    saveState({ teacherUpdates });
    renderTeacherUpdatesList();
    addActivity('bullhorn', 'Teacher Update Posted', title);
    document.getElementById('teacherUpdateTitle').value = '';
    document.getElementById('teacherUpdateMessage').value = '';

    try {
        const response = await fetch(`${API_BASE_URL}/api/teacher-updates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getBackendAuthHeaders() },
            body: JSON.stringify(update)
        });
        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            throw new Error(result.error || 'Teacher update sync failed');
        }
    } catch (err) {
        alert(`Teacher update sync warning: ${err.message}`);
    }
}

async function sendTaskReminderEmail() {
    if (!canAccessAdmin()) {
        alert('Only teacher/admin can send reminders.');
        return;
    }
    const to = document.getElementById('reminderEmailTo')?.value.trim();
    const task = document.getElementById('reminderTaskName')?.value.trim();
    const dueDate = document.getElementById('reminderDueDate')?.value;
    if (!to || !task || !dueDate) {
        alert('Please enter recipient email, task and due date.');
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/reminders/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getBackendAuthHeaders() },
            body: JSON.stringify({ to, task, dueDate })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Send failed');
        alert('Reminder email sent.');
        addActivity('envelope', 'Reminder Sent', `${task} -> ${to}`);
    } catch (err) {
        alert(`Reminder send failed: ${err.message}. Start backend server to enable mailer.`);
    }
}

async function loadTeacherUpdatesFromServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/teacher-updates`);
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            teacherUpdates = data;
            saveState({ teacherUpdates });
            renderTeacherUpdatesList();
        }
    } catch (_) {}
}

async function loadQuizScoresFromServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/quiz-scores`, {
            headers: { ...getBackendAuthHeaders() }
        });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            quizScores = data;
            saveState({ quizScores });
            renderAdminQuizScores();
        }
    } catch (_) {}
}

// ==================== POMODORO HISTORY ====================
function renderPomodoroHistory() {
    document.getElementById('totalFocusTime').textContent = Math.round(pomodoroSessions.reduce((sum, s) => sum + s.minutes, 0) / 60 * 10) / 10;
    document.getElementById('totalSessions').textContent = pomodoroSessions.length;
    
    const today = new Date();
    const todaySessions = pomodoroSessions.filter(s => new Date(s.date).toDateString() === today.toDateString());
    document.getElementById('sessionsToday').textContent = todaySessions.length;
    
    // Find longest streak
    let longest = 0;
    let current = 0;
    const dates = [...new Set(pomodoroSessions.map(s => new Date(s.date).toDateString()))].sort();
    dates.forEach((date, i) => {
        if (i === 0) current = 1;
        else {
            const prev = new Date(dates[i - 1]);
            const curr = new Date(date);
            const diff = (curr - prev) / (1000 * 60 * 60 * 24);
            if (diff === 1) current++;
            else current = 1;
        }
        if (current > longest) longest = current;
    });
    document.getElementById('longestStreak').textContent = longest;
    
    // List
    const list = document.getElementById('pomodoroHistoryList');
    if (pomodoroSessions.length === 0) {
        list.innerHTML = '<li class="empty-state">No sessions yet</li>';
        return;
    }
    
    list.innerHTML = pomodoroSessions.slice(0, 20).map(session => `
        <li>
            <span>${session.minutes} min ${session.type}</span>
            <span class="activity-time">${formatDate(session.date)}</span>
        </li>
    `).join('');
}

// ==================== GOALS ====================
function renderGoals() {
    document.getElementById('goalTasks').value = goals.tasks;
    document.getElementById('goalStudyHours').value = goals.studyHours;
    document.getElementById('goalFlashcards').value = goals.flashcards;
    
    const taskPercent = Math.min((weeklyStats.tasksCompleted / goals.tasks) * 100, 100);
    const studyPercent = Math.min((weeklyStats.studyHours / goals.studyHours) * 100, 100);
    const flashcardPercent = Math.min((weeklyStats.flashcardsReviewed / goals.flashcards) * 100, 100);
    
    document.getElementById('goalTasksFill').style.width = taskPercent + '%';
    document.getElementById('goalTasksProgress').textContent = `${weeklyStats.tasksCompleted} / ${goals.tasks}`;
    document.getElementById('goalStudyFill').style.width = studyPercent + '%';
    document.getElementById('goalStudyProgress').textContent = `${Math.round(weeklyStats.studyHours)} / ${goals.studyHours}`;
    document.getElementById('goalFlashcardsFill').style.width = flashcardPercent + '%';
    document.getElementById('goalFlashcardsProgress').textContent = `${weeklyStats.flashcardsReviewed} / ${goals.flashcards}`;
}

function saveGoals() {
    goals.tasks = parseInt(document.getElementById('goalTasks').value) || 20;
    goals.studyHours = parseInt(document.getElementById('goalStudyHours').value) || 10;
    goals.flashcards = parseInt(document.getElementById('goalFlashcards').value) || 50;
    
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
    alert('Goals saved!');
}

// ==================== TIMER ====================
function updateTimerDisplay() {
    document.getElementById('timerMinutes').textContent = timerMinutes.toString().padStart(2, '0');
    document.getElementById('timerSeconds').textContent = timerSeconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                playNotificationSound();
                
                // Save session
                const sessionMinutes = timerMinutes;
                const type = sessionMinutes >= 25 ? 'Focus' : sessionMinutes >= 15 ? 'Long Break' : 'Short Break';
                pomodoroSessions.push({ minutes: 25, type, date: new Date().toISOString() });
                localStorage.setItem('pomodoroSessions', JSON.stringify(pomodoroSessions));
                
                alert('Timer complete! Take a break!');
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        
        // Track study time every minute
        if (timerSeconds === 59 && timerMinutes < 25) {
            weeklyStats.studyHours += 1/60;
            localStorage.setItem('weeklyStats', JSON.stringify(weeklyStats));
        }
        
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetTimer() {
    pauseTimer();
    setTimerMode(25);
}

function setTimerMode(minutes) {
    timerMinutes = minutes;
    timerSeconds = 0;
    updateTimerDisplay();
    
    document.querySelectorAll('.timer-modes .mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.minutes) === minutes) btn.classList.add('active');
    });
}

function playNotificationSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch(e) {}
}

function requestReminderPermission() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }
}

function checkDueTaskReminders() {
    if (!smartSettings.remindersEnabled || !("Notification" in window) || Notification.permission !== "granted") {
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reminderKey = "lastReminderDate";
    const reminderDate = localStorage.getItem(reminderKey);
    const todayStr = today.toISOString().split("T")[0];
    if (reminderDate === todayStr) return;

    const dueSoon = tasks
        .filter(task => !task.done && task.dueDate)
        .filter(task => {
            const due = new Date(task.dueDate);
            due.setHours(0, 0, 0, 0);
            const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
            const reminderLeadDays = Number(smartSettings.reminderLeadDays);
            const leadDays = Number.isFinite(reminderLeadDays) ? reminderLeadDays : 1;
            return diffDays >= 0 && diffDays <= leadDays;
        });

    if (dueSoon.length === 0) return;

    const topTask = rankTasks(dueSoon, { now: new Date(), weakSubjects: smartSettings.weakSubjects || [] })[0];
    const message = dueSoon.length === 1
        ? `1 task is due soon: ${topTask.text}`
        : `${dueSoon.length} tasks are due soon. Start with: ${topTask.text}`;

    new Notification("Smart Study Planner", { body: message });
    localStorage.setItem(reminderKey, todayStr);
}

// ==================== EXPORT/IMPORT ====================
function showExportImportModal() {
    document.getElementById('exportImportModal').classList.add('active');
}

function closeExportImportModal() {
    document.getElementById('exportImportModal').classList.remove('active');
}

function exportData() {
    const data = {
        stateVersion: APP_STATE_VERSION,
        tasks,
        notes,
        flashcards,
        assignments,
        exams,
        subjects,
        gpaHistory,
        pomodoroSessions,
        activityLog,
        weeklyStats,
        studyStreak,
        bestStreak,
        goals,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        teacherUpdates,
        smartSettings,
        dailyPlan,
        authUsers
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smart-study-planner-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    
    addActivity('download', 'Data Exported', 'Backup file downloaded');
    closeExportImportModal();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.tasks) tasks = normalizeTasks(data.tasks);
            if (data.notes) notes = data.notes;
            if (data.flashcards) flashcards = data.flashcards;
            if (data.assignments) assignments = data.assignments;
            if (data.exams) exams = data.exams;
            if (data.subjects) subjects = data.subjects;
            if (data.gpaHistory) gpaHistory = data.gpaHistory;
            if (data.pomodoroSessions) pomodoroSessions = data.pomodoroSessions;
            if (Array.isArray(data.activityLog)) activityLog = data.activityLog;
            if (data.weeklyStats) weeklyStats = { ...DEFAULT_STATE.weeklyStats, ...data.weeklyStats };
            if (Number.isFinite(data.studyStreak)) studyStreak = data.studyStreak;
            if (Number.isFinite(data.bestStreak)) bestStreak = data.bestStreak;
            if (data.goals) goals = { ...DEFAULT_STATE.goals, ...data.goals };
            if (Array.isArray(data.timetableEntries)) timetableEntries = data.timetableEntries;
            if (Array.isArray(data.resources)) resources = data.resources;
            if (Array.isArray(data.studyMaterials) && data.studyMaterials.length > 0) studyMaterials = data.studyMaterials;
            if (Array.isArray(data.freeNotesLibrary) && data.freeNotesLibrary.length > 0) freeNotesLibrary = data.freeNotesLibrary;
            if (Array.isArray(data.quizScores)) quizScores = data.quizScores;
            if (Array.isArray(data.teacherUpdates)) teacherUpdates = data.teacherUpdates;
            if (data.smartSettings) smartSettings = normalizeSmartSettings(data.smartSettings);
            if (data.dailyPlan) dailyPlan = { ...DEFAULT_STATE.dailyPlan, ...data.dailyPlan };
            if (Array.isArray(data.authUsers)) authUsers = data.authUsers;
            
            saveTasks();
            saveState({
                notes,
                flashcards,
                assignments,
                exams,
                subjects,
                gpaHistory,
                pomodoroSessions,
                activityLog,
                weeklyStats,
                studyStreak,
                bestStreak,
                goals,
                timetableEntries,
                resources,
                studyMaterials,
                freeNotesLibrary,
                quizScores,
                teacherUpdates,
                smartSettings,
                dailyPlan,
                authUsers
            });
            
            addActivity('upload', 'Data Imported', 'Backup restored');
            alert('Data imported successfully!');
            location.reload();
        } catch(err) {
            alert('Error importing data. Invalid file format.');
        }
    };
    reader.readAsText(file);
    closeExportImportModal();
}

// ==================== PRINT FUNCTIONS ====================
function showPrintModal() {
    document.getElementById('printModal').classList.add('active');
}

function closePrintModal() {
    document.getElementById('printModal').classList.remove('active');
}

function printDailyPlan() {
    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = tasks.filter(t => t.dueDate === today && !t.done);
    const todaysAssignments = assignments.filter(a => a.dueDate === today && !a.done);
    
    let printContent = `<h1>Daily Study Plan - ${new Date().toLocaleDateString()}</h1>`;
    
    if (todaysTasks.length > 0) {
        printContent += '<h2>Tasks Due Today</h2><ul>';
        todaysTasks.forEach(task => {
            printContent += `<li>[ ] ${task.text} - ${task.subject || ''}</li>`;
        });
        printContent += '</ul>';
    }
    
    if (todaysAssignments.length > 0) {
        printContent += '<h2>Assignments Due Today</h2><ul>';
        todaysAssignments.forEach(a => {
            printContent += `<li>[ ] ${a.title} - ${a.type}</li>`;
        });
        printContent += '</ul>';
    }
    
    if (todaysTasks.length === 0 && todaysAssignments.length === 0) {
        printContent += '<p>No tasks or assignments due today!</p>';
    }
    
    openPrintWindow(printContent);
    closePrintModal();
}

function printWeeklyPlan() {
    let printContent = `<h1>Weekly Study Plan</h1>`;
    
    printContent += '<h2>Pending Tasks</h2><ul>';
    tasks.filter(t => !t.done).forEach(task => {
        printContent += `<li>[ ] ${task.text} - ${task.subject || ''}</li>`;
    });
    printContent += '</ul>';
    
    printContent += '<h2>Pending Assignments</h2><ul>';
    assignments.filter(a => !a.done).forEach(a => {
        printContent += `<li>[ ] ${a.title} - ${a.type}</li>`;
    });
    printContent += '</ul>';
    
    openPrintWindow(printContent);
    closePrintModal();
}

function printTasks() {
    let printContent = `<h1>All Tasks</h1>`;
    tasks.forEach(task => {
        const status = task.done ? '[x]' : '[ ]';
        printContent += `<p>${status} ${task.text}</p>`;
    });
    openPrintWindow(printContent);
    closePrintModal();
}

function printAssignments() {
    let printContent = `<h1>All Assignments</h1>`;
    assignments.forEach(a => {
        const status = a.done ? '[x]' : '[ ]';
        printContent += `<p>${status} ${a.title} - ${a.type}</p>`;
    });
    openPrintWindow(printContent);
    closePrintModal();
}

function openPrintWindow(content) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Print</title>
        <style>
            body { font-family: Arial; padding: 40px; }
            h1 { color: #2193b0; }
            ul { list-style: none; padding: 0; }
            li, p { padding: 8px 0; border-bottom: 1px solid #eee; }
        </style>
        </head><body>${content}</body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
}

// ==================== CLEAR ALL DATA ====================
function clearAllData() {
    if (confirm("Are you sure you want to clear ALL data? This cannot be undone!")) {
        localStorage.clear();
        location.reload();
    }
}

// ==================== UTILITIES ====================
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function bootstrapAuthenticatedApp() {
    if (appBootstrapped) return;
    appBootstrapped = true;

    loadTheme();
    setupNetworkStatusListeners();
    setupPWAInstall();
    registerServiceWorker();
    autoReplanMissedTasksOnNewDay();
    smartSettings = normalizeSmartSettings(smartSettings);
    applySmartSettingsEffects();
    renderDashboard();
    renderTasks();
    renderCalendar();
    renderNotes();
    renderFlashcards();
    renderAssignments();
    renderExams();
    renderQuizPage();
    renderAdminPage();
    renderSubjects();
    renderTimetable();
    renderResources();
    renderStudyMaterials();
    renderFreeNotes();
    renderAchievements();
    renderGoals();
    renderSmartSettings();
    updateTimerDisplay();
    navigateTo(smartSettings.startPage || 'dashboard');

    if (smartSettings.remindersEnabled) {
        requestReminderPermission();
        checkDueTaskReminders();
        reminderIntervalId = setInterval(checkDueTaskReminders, 30 * 60 * 1000);
    }

    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) pauseBtn.disabled = true;

    // Recurring task controls are optional in the current UI.
    const recurringCheck = document.getElementById('recurringCheck');
    const recurringType = document.getElementById('recurringType');
    if (recurringCheck && recurringType) {
        recurringCheck.addEventListener('change', function() {
            recurringType.disabled = !this.checked;
        });
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Skip full app bootstrapping when script.js is loaded by lightweight test pages.
    if (!document.getElementById('page-dashboard')) {
        return;
    }

    setupFirebaseAuthObserver();
    applyAuthState();
});

