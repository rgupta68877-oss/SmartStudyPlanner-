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
const API_BASE_URL = (() => {
    const fromGlobal = (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) || "";
    const fromMeta = document.querySelector('meta[name="api-base-url"]')?.getAttribute("content") || "";
    const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const fallbackBase = isLocalHost ? "http://localhost:4000" : window.location.origin;
    const safeMeta = (() => {
        const metaValue = String(fromMeta || "").trim();
        if (!metaValue) return "";
        // Ignore localhost-only meta config when app is running on a non-local host.
        if (!isLocalHost && /localhost|127\.0\.0\.1/i.test(metaValue)) return "";
        return metaValue;
    })();
    const fromEnv = fromGlobal || safeMeta || fallbackBase;
    return String(fromEnv).replace(/\/+$/, "");
})();
const BACKEND_AUTH_TOKEN_KEY = "backendAdminToken";
const FOCUS_SHIELD_SETTINGS_KEY = "focusShieldSettings";
const LOCAL_PEER_CHALLENGES_KEY = "localPeerChallenges";
const LOCAL_STUDY_GROUPS_KEY = "localStudyGroups";
const PRESENCE_CLIENT_ID_KEY = "presenceClientId";
const PRESENCE_PING_INTERVAL_MS = 15000;
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
        level: "Class 8",
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
    },
    {
        id: "note-pack-19",
        title: "Geography Class 7 Unit-Wise Notes",
        subject: "Geography",
        level: "Class 7",
        content: "Unit 1: Environment\n- Natural and human-made environment\n- Ecosystem basics\nUnit 2: Inside Our Earth\n- Crust, mantle, core\n- Rocks and minerals\nUnit 3: Air and Water\n- Atmosphere layers\n- Water cycle\n\nUnit-wise Questions:\n1) Define ecosystem with one example.\n2) Name three layers of the Earth.\n3) Explain water cycle in 4 points.\n4) Differentiate weather and climate.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-20",
        title: "Geography Class 8 Unit-Wise Notes",
        subject: "Geography",
        level: "Class 8",
        content: "Unit 1: Resources\n- Natural, human, and man-made resources\n- Resource conservation\nUnit 2: Agriculture and Industries\n- Types of farming\n- Agro-based and mineral-based industries\nUnit 3: Human Resources\n- Population distribution\n\nUnit-wise Questions:\n1) Classify resources with examples.\n2) Explain two methods of soil conservation.\n3) Compare subsistence and commercial farming.\n4) Why is population considered an asset?",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-21",
        title: "Geography Class 9 Unit-Wise Notes",
        subject: "Geography",
        level: "Class 9",
        content: "Unit 1: India - Size and Location\n- Latitudes, longitudes, standard meridian\nUnit 2: Physical Features of India\n- Himalayas, plains, plateau, coastal plains\nUnit 3: Climate\n- Monsoon mechanism\nUnit 4: Drainage\n- Himalayan and Peninsular rivers\n\nUnit-wise Questions:\n1) Why is India's location strategic?\n2) Distinguish Western and Eastern Ghats.\n3) Explain factors affecting Indian climate.\n4) Compare Himalayan and Peninsular rivers.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-22",
        title: "Math Class 10 Unit-Wise Notes",
        subject: "Math",
        level: "Class 10",
        content: "Unit 1: Real Numbers\n- Euclid division algorithm, HCF and LCM\nUnit 2: Polynomials\n- Relationship between zeros and coefficients\nUnit 3: Pair of Linear Equations\n- Graphical and algebraic methods\nUnit 4: Trigonometry\n- Trigonometric ratios and identities\n\nUnit-wise Questions:\n1) Use Euclid algorithm for 867 and 255.\n2) Find zeros of x^2 - 5x + 6.\n3) Solve: 2x + y = 5 and x - y = 1.\n4) Prove: sin^2A + cos^2A = 1.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-23",
        title: "Science Class 10 Unit-Wise Notes",
        subject: "Science",
        level: "Class 10",
        content: "Unit 1: Chemical Reactions\n- Types of reactions, balancing equations\nUnit 2: Acids, Bases, Salts\n- pH and applications\nUnit 3: Life Processes\n- Nutrition, respiration, transport\nUnit 4: Electricity\n- Ohm's law, resistance, power\n\nUnit-wise Questions:\n1) Write one decomposition and one displacement reaction.\n2) Why is pH important in digestion?\n3) Explain double circulation in humans.\n4) Derive relation P = VI.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-24",
        title: "English Class 10 Unit-Wise Notes",
        subject: "English",
        level: "Class 10",
        content: "Unit 1: Reading Skills\n- Skimming, scanning, inference\nUnit 2: Grammar\n- Modals, reported speech, clauses\nUnit 3: Writing Skills\n- Formal letter, analytical paragraph\nUnit 4: Literature\n- Theme, character, tone, message\n\nUnit-wise Questions:\n1) Write a 120-word analytical paragraph from data.\n2) Change direct to indirect speech for 5 sentences.\n3) Draft a formal complaint letter.\n4) Explain theme of one prescribed chapter.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-25",
        title: "History Class 10 Unit-Wise Notes",
        subject: "History",
        level: "Class 10",
        content: "Unit 1: Rise of Nationalism in Europe\n- Nation-state, liberalism, unification\nUnit 2: Nationalism in India\n- Non-cooperation, civil disobedience\nUnit 3: Making of Global World\n- Trade routes, migration, colonialism\nUnit 4: Print Culture\n- Printing press and public opinion\n\nUnit-wise Questions:\n1) Explain role of Giuseppe Mazzini.\n2) Why did Non-Cooperation movement withdraw?\n3) How did print culture shape nationalism?\n4) Write short note on globalisation in 19th century.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-26",
        title: "Geography Class 10 Unit-Wise Notes",
        subject: "Geography",
        level: "Class 10",
        content: "Unit 1: Resources and Development\n- Types, planning, land resources\nUnit 2: Forest and Wildlife\n- Biodiversity, conservation methods\nUnit 3: Water Resources\n- Multipurpose projects, rainwater harvesting\nUnit 4: Agriculture and Minerals\n- Cropping patterns, mineral distribution\n\nUnit-wise Questions:\n1) Define sustainable development with examples.\n2) Compare renewable and non-renewable resources.\n3) Explain rainwater harvesting methods.\n4) Why is resource planning necessary in India?",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-27",
        title: "Programming Class 10 Unit-Wise Notes",
        subject: "Programming",
        level: "Class 10",
        content: "Unit 1: Data Types and Operators\n- Numeric, string, boolean, precedence\nUnit 2: Control Statements\n- if-else, switch, loops\nUnit 3: Functions and Arrays\n- Parameters, return values, indexing\nUnit 4: Problem Solving\n- Algorithm design and debugging\n\nUnit-wise Questions:\n1) Write algorithm for checking prime number.\n2) Program to find sum and average of array.\n3) Differentiate while and for loop.\n4) Trace output of a nested loop example.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-28",
        title: "General Studies Class 10 Exam Pack",
        subject: "General",
        level: "Class 10",
        content: "Unit 1: Study Planning\n- Weekly target sheets and revision cycle\nUnit 2: Exam Writing Skills\n- Keyword-focused answers, time allocation\nUnit 3: Memory Methods\n- Active recall, spaced repetition, flashcards\nUnit 4: Mock Analysis\n- Error log and improvement plan\n\nUnit-wise Questions:\n1) Make a 7-day revision timetable.\n2) How will you improve from mock test mistakes?\n3) List 5 high-retention study techniques.\n4) Write exam-day strategy in 8 points.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-29",
        title: "Math Class 9 Unit-Wise Question Bank",
        subject: "Math",
        level: "Class 9",
        content: "Unit 1: Number Systems\n- Irrational numbers, rationalization\nUnit 2: Polynomials\n- Zeroes and remainder theorem basics\nUnit 3: Coordinate Geometry\n- Plotting points in Cartesian plane\nUnit 4: Triangles\n- Congruence rules\n\nUnit-wise Questions:\n1) Rationalize 1/(sqrt(3)+1).\n2) Find remainder of p(x)=x^2+3x+2 when divided by x+1.\n3) Plot (2,3), (-1,4), (0,-2).\n4) Prove congruence using SAS rule.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-30",
        title: "Science Class 9 Unit-Wise Question Bank",
        subject: "Science",
        level: "Class 9",
        content: "Unit 1: Matter in Our Surroundings\n- States and interconversion\nUnit 2: Atoms and Molecules\n- Laws of chemical combination\nUnit 3: Motion\n- Distance-time and velocity-time graphs\nUnit 4: Force and Laws of Motion\n- Newton's laws\n\nUnit-wise Questions:\n1) Explain sublimation with one example.\n2) State law of conservation of mass.\n3) Differentiate speed and velocity.\n4) Explain inertia in daily life.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-31",
        title: "CBSE Class 10 Math Board Pack",
        subject: "Math",
        level: "Class 10 (CBSE)",
        content: "Board: CBSE\nUnit 1: Real Numbers\n- Euclid lemma, irrational numbers\nUnit 2: Polynomials and Pair of Linear Equations\n- Zeroes and graphical solution\nUnit 3: Trigonometry\n- Ratios, identities, heights and distances\nUnit 4: Coordinate Geometry and Statistics\n- Distance formula, mean/median/mode\n\nUnit-wise Questions:\n1) Prove irrationality of sqrt(2).\n2) Solve pair: x + y = 7 and x - y = 1.\n3) Prove sin^2A + cos^2A = 1.\n4) Find distance between (2,3) and (8,11).\n5) Find median for grouped data.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-32",
        title: "CBSE Class 10 Science Board Pack",
        subject: "Science",
        level: "Class 10 (CBSE)",
        content: "Board: CBSE\nUnit 1: Chemical Reactions and Acids-Bases-Salts\nUnit 2: Life Processes and Control & Coordination\nUnit 3: Electricity and Magnetic Effects\nUnit 4: Our Environment and Natural Resources\n\nUnit-wise Questions:\n1) Write balanced equation for rusting and classify it.\n2) Explain pH scale and one real life application.\n3) Describe transport of food in plants.\n4) State Ohm's law and derive V = IR.\n5) Explain food chain and 10% law.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-33",
        title: "CBSE Class 10 Social Science (History+Geo) Pack",
        subject: "History",
        level: "Class 10 (CBSE)",
        content: "Board: CBSE\nUnit 1: Nationalism in Europe and India\nUnit 2: Globalisation and Print Culture\nUnit 3: Resources and Development\nUnit 4: Agriculture and Minerals\n\nUnit-wise Questions:\n1) Explain role of nationalism in Europe.\n2) What were causes and outcomes of Non-Cooperation?\n3) Explain any three factors of globalisation.\n4) Why is resource planning important in India?\n5) Distinguish between kharif and rabi crops.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-34",
        title: "ICSE Class 10 Math Board Pack",
        subject: "Math",
        level: "Class 10 (ICSE)",
        content: "Board: ICSE\nUnit 1: Commercial Mathematics\n- GST, banking, shares/dividends\nUnit 2: Algebra\n- Quadratic equations, AP/GP\nUnit 3: Geometry and Mensuration\n- Similarity, circles, solids\nUnit 4: Coordinate Geometry and Probability\n\nUnit-wise Questions:\n1) Calculate GST amount for given marked price.\n2) Solve quadratic using factorization/completing square.\n3) Prove theorem based on tangents.\n4) Find curved surface area of a cone.\n5) Solve probability of drawing red card from deck.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-35",
        title: "ICSE Class 10 Physics-Chemistry-Biology Pack",
        subject: "Science",
        level: "Class 10 (ICSE)",
        content: "Board: ICSE\nPhysics: Force, work-energy-power, electricity\nChemistry: Periodic table, metallurgy, organic chemistry\nBiology: Cell cycle, genetics, human anatomy\n\nUnit-wise Questions:\n1) State and apply laws of motion with numericals.\n2) Explain electrolysis with labeled diagram.\n3) Differentiate ionic and covalent compounds.\n4) Explain Mendel's monohybrid ratio.\n5) Describe structure and function of nephron.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-36",
        title: "ICSE Class 10 History-Civics-Geography Pack",
        subject: "Geography",
        level: "Class 10 (ICSE)",
        content: "Board: ICSE\nHistory: World wars, freedom movement\nCivics: Constitution, parliament, judiciary\nGeography: Climate, soil, transport, map work\n\nUnit-wise Questions:\n1) Explain causes of First World War.\n2) Write structure and functions of Parliament.\n3) Distinguish writs with examples.\n4) Explain monsoon mechanism in India.\n5) Practice map marking: coal, iron, ports.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-37",
        title: "State Board Class 10 Math Board Pack",
        subject: "Math",
        level: "Class 10 (State Board)",
        content: "Board: State Board\nUnit 1: Arithmetic and Algebra Basics\nUnit 2: Trigonometry and Geometry\nUnit 3: Mensuration and Statistics\nUnit 4: Practical Problem Solving\n\nUnit-wise Questions:\n1) Simplify and solve linear equation set.\n2) Find trigonometric ratios for given triangle.\n3) Calculate area and volume of common solids.\n4) Find mean/median from frequency table.\n5) Solve one word problem from daily life data.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-38",
        title: "State Board Class 10 Science Board Pack",
        subject: "Science",
        level: "Class 10 (State Board)",
        content: "Board: State Board\nUnit 1: Matter and Chemical Changes\nUnit 2: Living World and Human Body\nUnit 3: Motion, Light and Electricity\nUnit 4: Environment and Sustainable Development\n\nUnit-wise Questions:\n1) Write two examples of exothermic reactions.\n2) Explain respiration and circulatory system.\n3) Draw ray diagram for image formation.\n4) Solve one numerical using electrical power.\n5) Explain three methods of waste management.",
        createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
        id: "note-pack-39",
        title: "State Board Class 10 English + Social Pack",
        subject: "English",
        level: "Class 10 (State Board)",
        content: "Board: State Board\nEnglish Units: Reading, grammar, writing, literature\nSocial Units: History events, civics basics, geography maps\n\nUnit-wise Questions:\n1) Write formal letter on school issue.\n2) Convert direct speech to reported speech (5 items).\n3) Explain one literary theme with example.\n4) Write short note on freedom movement event.\n5) Mark major rivers and states on blank map.",
        createdAt: "2026-01-01T00:00:00.000Z"
    }
];

const STANDARD_SUBJECTS = ["Math", "Science", "English", "History", "Geography", "Programming"];
const STANDARD_CLASSES = [7, 8, 9, 10];
const STANDARD_CLASS_FOCUS = {
    7: "foundation and concept clarity",
    8: "concept strengthening and application",
    9: "analytical thinking and problem solving",
    10: "board-oriented mastery and revision"
};
const STANDARD_UNIT_MAP = {
    Math: ["Numbers and Algebra", "Geometry and Mensuration", "Data Handling", "Applied Problems"],
    Science: ["Matter and Materials", "Life Processes", "Force and Energy", "Environment and Sustainability"],
    English: ["Reading Skills", "Grammar", "Writing Skills", "Literature Response"],
    History: ["Ancient/Medieval Context", "Modern World Events", "National Movements", "Historical Analysis"],
    Geography: ["Physical Features", "Climate and Resources", "Human Geography", "Maps and Case Studies"],
    Programming: ["Logic and Algorithms", "Syntax and Data Types", "Control Flow and Functions", "Debugging and Projects"]
};

function createStandardNoteContent(subject, classNo) {
    const units = STANDARD_UNIT_MAP[subject] || ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];
    const focus = STANDARD_CLASS_FOCUS[classNo] || "structured learning";
    return [
        `Page 1: Standard ${classNo} ${subject} Syllabus Overview`,
        `- Learning focus: ${focus}`,
        `- Unit 1: ${units[0]}`,
        `- Unit 2: ${units[1]}`,
        `- Unit 3: ${units[2]}`,
        `- Unit 4: ${units[3]}`,
        "",
        `Page 2: Unit 1 Notes (${units[0]})`,
        `- Core definitions and concept map for ${units[0]}.`,
        `- Important rules/theorems/process steps with examples.`,
        `- Common mistakes and correction strategy.`,
        "",
        `Page 3: Unit 2 Notes (${units[1]})`,
        `- Key concepts and summary chart.`,
        `- Solved examples for medium-level questions.`,
        `- Short revision points for quick recall.`,
        "",
        `Page 4: Unit 3 Notes (${units[2]})`,
        `- Diagram/table-based explanation where needed.`,
        `- Standard textbook pattern questions and solutions.`,
        `- Exam writing format for 2-mark and 3-mark answers.`,
        "",
        `Page 5: Unit 4 Notes (${units[3]})`,
        `- Practical/case-based or application-based learning points.`,
        `- High-frequency questions from previous assessments.`,
        `- Last-minute revision checklist.`,
        "",
        `Page 6: Unit-wise Questions with Answers`,
        `Q1 (${units[0]}): State one key concept and one application.`,
        `A1: Define the concept in one line and link it to a real example from classwork.`,
        `Q2 (${units[1]}): Solve/Explain one standard textbook-style problem.`,
        `A2: Use step-by-step method: given data, approach, solution, and final statement.`,
        `Q3 (${units[2]}): Write a short answer question response in exam format.`,
        `A3: Start with keyword definition, then two valid points, then a one-line conclusion.`,
        `Q4 (${units[3]}): Attempt one higher-order/application question.`,
        `A4: Break the problem into parts, apply the correct concept, and justify final answer clearly.`,
        "",
        `Page 7: Practice Set with Answers`,
        `Q5: List two important terms from each unit.`,
        `A5: Any two correct unit terms with proper meaning will be accepted.`,
        `Q6: Which unit needs more practice for you and why?`,
        `A6: Mention one weak unit and one improvement action (daily practice/revision sheet).`,
        `Q7: Write one 5-mark style answer from this standard.`,
        `A7: Structure: introduction, 3-4 valid points, example/diagram, and conclusion.`,
        `Q8: Prepare a one-page revision sheet for all units.`,
        `A8: Include formulas/rules/keywords and 1 solved example per unit.`,
        "",
        `Page 8: Weekly Revision Plan`,
        `Day 1-2: Unit 1 + Unit 2 recap`,
        `Day 3-4: Unit 3 + Unit 4 recap`,
        `Day 5: Mixed worksheet`,
        `Day 6: Self-test + answer checking`,
        `Day 7: Error log revision and quick oral recall`,
        "",
        `Page 9: Extra Question Bank with Answers`,
        `Q9 (${units[0]}): Write one 3-mark and one 5-mark style answer.`,
        `A9: 3-mark answer = definition + 2 points; 5-mark answer = intro + 4 points + conclusion.`,
        `Q10 (${units[1]}): Solve one application-based problem.`,
        `A10: Mention known values, approach, working steps, final answer with unit/context.`,
        `Q11 (${units[2]}): Create one mind map from chapter headings.`,
        `A11: Include keywords, subtopics, and one example for each branch.`,
        `Q12 (${units[3]}): Attempt one previous-year style question.`,
        `A12: Follow board format and underline keywords.`,
        "",
        `Page 10: Final Revision + Answer Writing Guide`,
        `- Keep answers pointwise and cleanly structured.`,
        `- For theory: intro, key points, conclusion.`,
        `- For numericals: formula, substitution, calculation, final statement.`,
        `- For long answers: use headings and subheadings.`,
        `- Last 24-hour plan: quick formulas, key definitions, and one mock answer set.`
    ].join("\n");
}

function buildStandardWiseNotesLibrary() {
    return STANDARD_CLASSES.flatMap((classNo) => (
        STANDARD_SUBJECTS.map((subject) => ({
            id: `std-${subject.toLowerCase()}-${classNo}`,
            title: `${subject} Standard ${classNo} Notes + Unit Q&A`,
            subject,
            level: `Class ${classNo}`,
            content: createStandardNoteContent(subject, classNo),
            createdAt: "2026-01-01T00:00:00.000Z"
        }))
    ));
}

for (const note of buildStandardWiseNotesLibrary()) {
    if (!DEFAULT_FREE_NOTES_LIBRARY.some(existing => existing.id === note.id)) {
        DEFAULT_FREE_NOTES_LIBRARY.push(note);
    }
}

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
    microWinStats: "microWinStats",
    distractionLog: "distractionLog",
    goals: "goals",
    goalRoadmap: "goalRoadmap",
    weakTopicStats: "weakTopicStats",
    chapterTracker: "chapterTracker",
    doubtTracker: "doubtTracker",
    reflectionEntries: "reflectionEntries",
    timetableEntries: "timetableEntries",
    resources: "resources",
    studyMaterials: "studyMaterials",
    freeNotesLibrary: "freeNotesLibrary",
    quizScores: "quizScores",
    mistakeNotebook: "mistakeNotebook",
    pastPaperAttempts: "pastPaperAttempts",
    teacherUpdates: "teacherUpdates",
    smartSettings: "smartSettings",
    studyMood: "studyMood",
    dailyPlan: "dailyPlan",
    recoveryPlan: "recoveryPlan",
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
        { name: "Geography", color: "#8bc34a" },
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
    distractionLog: [],
    microWinStats: {
        points: 0,
        startOnTimeCount: 0,
        focusCompletedCount: 0,
        noDistractionStreak: 0,
        bestNoDistractionStreak: 0,
        history: []
    },
    weakTopicStats: {},
    chapterTracker: [],
    doubtTracker: [],
    reflectionEntries: [],
    goals: {
        tasks: 20,
        studyHours: 10,
        flashcards: 50
    },
    goalRoadmap: {
        rawText: "",
        subject: "",
        targetPercent: 0,
        baselinePercent: 0,
        weeklyHours: 0,
        weeks: 0,
        milestones: [],
        generatedAt: ""
    },
    timetableEntries: [],
    resources: DEFAULT_RESOURCES_LIBRARY,
    studyMaterials: DEFAULT_STUDY_MATERIALS,
    freeNotesLibrary: DEFAULT_FREE_NOTES_LIBRARY,
    quizScores: [],
    mistakeNotebook: [],
    pastPaperAttempts: [],
    teacherUpdates: [],
    smartSettings: DEFAULT_SMART_SETTINGS,
    studyMood: {
        level: "normal",
        updatedAt: ""
    },
    dailyPlan: {
        date: "",
        items: [],
        availableHours: 0
    },
    recoveryPlan: {
        lastAutoDate: "",
        lastGeneratedDate: "",
        lastMode: "",
        lastGapDays: 0,
        generatedCount: 0,
        historyFilter: "all",
        history: []
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
        "dashboard", "tasks", "calendar", "flashcards",
        "analytics", "quiz", "admin", "timetable",
        "free-notes",
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
    const parsedExamWeight = Number(normalized.examWeight);
    const difficulty = normalized.difficulty || "medium";
    const done = Boolean(normalized.done);
    const createdAt = normalized.createdAt || new Date().toISOString();
    const doneAtRaw = normalized.doneAt || "";
    return {
        id: normalized.id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: String(normalized.text || normalized.title || "").trim(),
        subject: normalized.subject || "",
        priority: ["low", "medium", "high"].includes(normalized.priority) ? normalized.priority : "medium",
        dueDate: normalized.dueDate || "",
        done,
        createdAt,
        doneAt: done ? (doneAtRaw || createdAt) : "",
        estimatedHours: Number.isFinite(parsedEstimatedHours) && parsedEstimatedHours > 0 ? parsedEstimatedHours : 1,
        difficulty: ["easy", "medium", "hard"].includes(difficulty) ? difficulty : "medium",
        examWeight: Number.isFinite(parsedExamWeight) ? Math.min(5, Math.max(1, Math.round(parsedExamWeight))) : 3
    };
}

function normalizeMicroWinStats(value) {
    const normalized = value && typeof value === "object" ? value : {};
    const history = Array.isArray(normalized.history) ? normalized.history : [];
    return {
        points: Math.max(0, Math.round(Number(normalized.points) || 0)),
        startOnTimeCount: Math.max(0, Math.round(Number(normalized.startOnTimeCount) || 0)),
        focusCompletedCount: Math.max(0, Math.round(Number(normalized.focusCompletedCount) || 0)),
        noDistractionStreak: Math.max(0, Math.round(Number(normalized.noDistractionStreak) || 0)),
        bestNoDistractionStreak: Math.max(0, Math.round(Number(normalized.bestNoDistractionStreak) || 0)),
        history: history
            .map(item => ({
                reason: String((item && item.reason) || "").trim(),
                points: Math.round(Number(item && item.points) || 0),
                at: String((item && item.at) || "")
            }))
            .filter(item => item.reason && Number.isFinite(item.points))
            .slice(0, 50)
    };
}

function normalizeDistractionLog(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const type = String(normalized.type || "").trim().toLowerCase();
            if (!type) return null;
            return {
                id: normalized.id || `distraction-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                type,
                subject: String(normalized.subject || "General").trim() || "General",
                createdAt: normalized.createdAt || new Date().toISOString()
            };
        })
        .filter(Boolean)
        .slice(0, 300);
}

function normalizeStudyMood(value) {
    const normalized = value && typeof value === "object" ? value : {};
    const level = String(normalized.level || "normal").trim().toLowerCase();
    const safeLevel = ["light", "normal", "intense"].includes(level) ? level : "normal";
    return {
        level: safeLevel,
        updatedAt: String(normalized.updatedAt || "")
    };
}

function normalizeRecoveryPlan(value) {
    const normalized = value && typeof value === "object" ? value : {};
    const history = Array.isArray(normalized.history) ? normalized.history : [];
    return {
        lastAutoDate: String(normalized.lastAutoDate || ""),
        lastGeneratedDate: String(normalized.lastGeneratedDate || ""),
        lastMode: String(normalized.lastMode || ""),
        lastGapDays: Math.max(0, Math.round(Number(normalized.lastGapDays) || 0)),
        generatedCount: Math.max(0, Math.round(Number(normalized.generatedCount) || 0)),
        historyFilter: ["all", "auto", "manual"].includes(String(normalized.historyFilter || "").toLowerCase())
            ? String(normalized.historyFilter).toLowerCase()
            : "all",
        history: history
            .map(item => ({
                id: String((item && item.id) || `recovery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                date: String((item && item.date) || ""),
                mode: String((item && item.mode) || "manual"),
                gapDays: Math.max(0, Math.round(Number(item && item.gapDays) || 0)),
                itemCount: Math.max(0, Math.round(Number(item && item.itemCount) || 0)),
                linkedTaskIds: Array.isArray(item && item.linkedTaskIds)
                    ? item.linkedTaskIds.map(id => String(id || "").trim()).filter(Boolean)
                    : []
            }))
            .filter(item => item.date)
            .slice(0, 20)
    };
}

function normalizeTasks(taskList) {
    if (!Array.isArray(taskList)) return [];
    return taskList
        .map(normalizeTask)
        .filter(task => task.text.length > 0);
}

function normalizePomodoroSession(session) {
    const normalized = session && typeof session === "object" ? session : {};
    const parsedMinutes = Number(normalized.minutes);
    const type = String(normalized.type || "Focus");
    const safeType = ["Focus", "Short Break", "Long Break"].includes(type) ? type : "Focus";
    return {
        minutes: Number.isFinite(parsedMinutes) && parsedMinutes > 0 ? Math.round(parsedMinutes) : 25,
        type: safeType,
        subject: String(normalized.subject || "General").trim() || "General",
        date: normalized.date || new Date().toISOString()
    };
}

function normalizePomodoroSessions(list) {
    if (!Array.isArray(list)) return [];
    return list.map(normalizePomodoroSession);
}

function normalizeGoalRoadmap(value) {
    const normalized = value && typeof value === "object" ? value : {};
    const targetPercent = Number(normalized.targetPercent);
    const baselinePercent = Number(normalized.baselinePercent);
    const weeklyHours = Number(normalized.weeklyHours);
    const weeks = Number(normalized.weeks);
    const milestones = Array.isArray(normalized.milestones) ? normalized.milestones : [];
    return {
        ...DEFAULT_STATE.goalRoadmap,
        ...normalized,
        rawText: String(normalized.rawText || ""),
        subject: String(normalized.subject || ""),
        targetPercent: Number.isFinite(targetPercent) ? Math.max(0, Math.min(100, Math.round(targetPercent))) : 0,
        baselinePercent: Number.isFinite(baselinePercent) ? Math.max(0, Math.min(100, Math.round(baselinePercent))) : 0,
        weeklyHours: Number.isFinite(weeklyHours) ? Math.max(0, Math.round(weeklyHours * 10) / 10) : 0,
        weeks: Number.isFinite(weeks) ? Math.max(0, Math.round(weeks)) : 0,
        milestones: milestones
            .map(item => ({
                week: Number(item && item.week),
                targetPercent: Number(item && item.targetPercent),
                action: String((item && item.action) || "")
            }))
            .filter(item => Number.isFinite(item.week) && Number.isFinite(item.targetPercent))
    };
}

function normalizeWeakTopicStats(value) {
    if (!value || typeof value !== "object") return {};
    const normalized = {};
    Object.entries(value).forEach(([key, item]) => {
        const topic = String((item && item.topic) || "").trim();
        const subject = String((item && item.subject) || "General").trim() || "General";
        const attempts = Number(item && item.attempts);
        const wrong = Number(item && item.wrong);
        if (!topic) return;
        normalized[key] = {
            topic,
            subject,
            attempts: Number.isFinite(attempts) ? Math.max(0, Math.round(attempts)) : 0,
            wrong: Number.isFinite(wrong) ? Math.max(0, Math.round(wrong)) : 0,
            lastSeenAt: item && item.lastSeenAt ? item.lastSeenAt : new Date().toISOString()
        };
    });
    return normalized;
}

function normalizeChapterTracker(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const status = String(normalized.status || "not-started");
            const score = Number(normalized.testScore);
            const prerequisites = Array.isArray(normalized.prerequisites)
                ? normalized.prerequisites.map(id => String(id || "").trim()).filter(Boolean)
                : [];
            return {
                id: normalized.id || `chapter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                subject: String(normalized.subject || "General").trim() || "General",
                chapter: String(normalized.chapter || "").trim(),
                status: ["not-started", "in-progress", "done"].includes(status) ? status : "not-started",
                testScore: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null,
                prerequisites: [...new Set(prerequisites)],
                createdAt: normalized.createdAt || new Date().toISOString()
            };
        })
        .filter(item => item.chapter.length > 0);
}

function normalizeDoubtTracker(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const status = String(normalized.status || "unresolved");
            return {
                id: normalized.id || `doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                subject: String(normalized.subject || "General").trim() || "General",
                chapter: String(normalized.chapter || "General").trim() || "General",
                text: String(normalized.text || "").trim(),
                status: status === "resolved" ? "resolved" : "unresolved",
                createdAt: normalized.createdAt || new Date().toISOString(),
                resolvedAt: status === "resolved" ? (normalized.resolvedAt || new Date().toISOString()) : ""
            };
        })
        .filter(item => item.text.length > 0);
}

function normalizeReflectionEntries(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const minutes = Number(normalized.minutes);
            return {
                id: normalized.id || `reflection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                subject: String(normalized.subject || "General").trim() || "General",
                learned: String(normalized.learned || "").trim(),
                confusing: String(normalized.confusing || "").trim(),
                minutes: Number.isFinite(minutes) ? Math.max(0, Math.round(minutes)) : 0,
                createdAt: normalized.createdAt || new Date().toISOString()
            };
        })
        .filter(item => item.learned || item.confusing);
}

function normalizePastPaperAttempts(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const obtained = Number(normalized.obtained);
            const total = Number(normalized.total);
            const percent = Number(normalized.percent);
            const durationMinutes = Number(normalized.durationMinutes);
            const subject = String(normalized.subject || "General").trim() || "General";
            if (!Number.isFinite(obtained) || !Number.isFinite(total) || total <= 0) return null;
            return {
                id: normalized.id || `paper-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                subject,
                obtained: Math.max(0, Math.round(obtained * 100) / 100),
                total: Math.max(1, Math.round(total * 100) / 100),
                percent: Number.isFinite(percent)
                    ? Math.max(0, Math.min(100, Math.round(percent)))
                    : Math.max(0, Math.min(100, Math.round((obtained / total) * 100))),
                durationMinutes: Number.isFinite(durationMinutes) ? Math.max(1, Math.round(durationMinutes)) : 60,
                createdAt: normalized.createdAt || new Date().toISOString()
            };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function normalizeMistakeNotebook(value) {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => {
            const normalized = item && typeof item === "object" ? item : {};
            const question = String(normalized.question || "").trim();
            const subject = String(normalized.subject || "General").trim() || "General";
            const difficulty = String(normalized.difficulty || "mixed").trim() || "mixed";
            const correctAnswer = String(normalized.correctAnswer || "").trim();
            const selectedAnswer = String(normalized.selectedAnswer || "").trim();
            const wrongReason = String(normalized.wrongReason || "").trim();
            const reviewStage = Number(normalized.reviewStage);
            const wrongCount = Number(normalized.wrongCount);
            const reviewCount = Number(normalized.reviewCount);
            const options = Array.isArray(normalized.options)
                ? normalized.options.map(opt => String(opt || "").trim()).filter(Boolean)
                : [];
            if (!question) return null;
            return {
                id: normalized.id || `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                userEmail: normalizeEmail(normalized.userEmail || ""),
                subject,
                difficulty,
                question,
                options,
                correctAnswer,
                selectedAnswer,
                wrongReason,
                reviewStage: Number.isFinite(reviewStage) ? Math.max(0, Math.min(2, Math.round(reviewStage))) : 0,
                wrongCount: Number.isFinite(wrongCount) ? Math.max(1, Math.round(wrongCount)) : 1,
                reviewCount: Number.isFinite(reviewCount) ? Math.max(0, Math.round(reviewCount)) : 0,
                nextReviewAt: normalized.nextReviewAt || "",
                createdAt: normalized.createdAt || new Date().toISOString(),
                lastWrongAt: normalized.lastWrongAt || normalized.createdAt || new Date().toISOString(),
                lastReviewedAt: normalized.lastReviewedAt || "",
                masteredAt: normalized.masteredAt || ""
            };
        })
        .filter(Boolean)
        .sort((a, b) => {
            const aDue = Date.parse(a.nextReviewAt || a.createdAt || 0);
            const bDue = Date.parse(b.nextReviewAt || b.createdAt || 0);
            return bDue - aDue;
        });
}

function normalizeFlashcardCard(card) {
    const normalized = card && typeof card === "object" ? card : {};
    const front = String(normalized.front || "").trim();
    const back = String(normalized.back || "").trim();
    if (!front || !back) return null;

    const intervalDays = Number(normalized.intervalDays);
    const ease = Number(normalized.ease);
    const reviewCount = Number(normalized.reviewCount);
    const lapses = Number(normalized.lapses);
    const createdAt = normalized.createdAt || new Date().toISOString();
    const parsedNext = Date.parse(normalized.nextReviewAt || createdAt);

    return {
        ...normalized,
        id: normalized.id || `fc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        front,
        back,
        createdAt,
        lastReviewedAt: normalized.lastReviewedAt || "",
        nextReviewAt: Number.isFinite(parsedNext) ? new Date(parsedNext).toISOString() : new Date().toISOString(),
        intervalDays: Number.isFinite(intervalDays) ? Math.max(0, Math.round(intervalDays)) : 0,
        ease: Number.isFinite(ease) ? Math.min(3.5, Math.max(1.3, Math.round(ease * 100) / 100)) : 2.5,
        reviewCount: Number.isFinite(reviewCount) ? Math.max(0, Math.round(reviewCount)) : 0,
        lapses: Number.isFinite(lapses) ? Math.max(0, Math.round(lapses)) : 0
    };
}

function normalizeFlashcards(flashcardState) {
    if (!flashcardState || typeof flashcardState !== "object") return {};
    const normalizedDecks = {};
    Object.entries(flashcardState).forEach(([deckName, cards]) => {
        const safeDeckName = String(deckName || "").trim();
        if (!safeDeckName) return;
        const normalizedCards = (Array.isArray(cards) ? cards : [])
            .map(normalizeFlashcardCard)
            .filter(Boolean);
        normalizedDecks[safeDeckName] = normalizedCards;
    });
    return normalizedDecks;
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
        distractionLog: parseStoredJSON(STORAGE_KEYS.distractionLog, DEFAULT_STATE.distractionLog),
        microWinStats: parseStoredJSON(STORAGE_KEYS.microWinStats, DEFAULT_STATE.microWinStats),
        weakTopicStats: parseStoredJSON(STORAGE_KEYS.weakTopicStats, DEFAULT_STATE.weakTopicStats),
        chapterTracker: parseStoredJSON(STORAGE_KEYS.chapterTracker, DEFAULT_STATE.chapterTracker),
        doubtTracker: parseStoredJSON(STORAGE_KEYS.doubtTracker, DEFAULT_STATE.doubtTracker),
        reflectionEntries: parseStoredJSON(STORAGE_KEYS.reflectionEntries, DEFAULT_STATE.reflectionEntries),
        goals: parseStoredJSON(STORAGE_KEYS.goals, DEFAULT_STATE.goals),
        goalRoadmap: parseStoredJSON(STORAGE_KEYS.goalRoadmap, DEFAULT_STATE.goalRoadmap),
        timetableEntries: parseStoredJSON(STORAGE_KEYS.timetableEntries, DEFAULT_STATE.timetableEntries),
        resources: parseStoredJSON(STORAGE_KEYS.resources, DEFAULT_STATE.resources),
        studyMaterials: parseStoredJSON(STORAGE_KEYS.studyMaterials, DEFAULT_STATE.studyMaterials),
        freeNotesLibrary: parseStoredJSON(STORAGE_KEYS.freeNotesLibrary, DEFAULT_STATE.freeNotesLibrary),
        quizScores: parseStoredJSON(STORAGE_KEYS.quizScores, DEFAULT_STATE.quizScores),
        mistakeNotebook: parseStoredJSON(STORAGE_KEYS.mistakeNotebook, DEFAULT_STATE.mistakeNotebook),
        pastPaperAttempts: parseStoredJSON(STORAGE_KEYS.pastPaperAttempts, DEFAULT_STATE.pastPaperAttempts),
        teacherUpdates: parseStoredJSON(STORAGE_KEYS.teacherUpdates, DEFAULT_STATE.teacherUpdates),
        smartSettings: parseStoredJSON(STORAGE_KEYS.smartSettings, DEFAULT_STATE.smartSettings),
        studyMood: parseStoredJSON(STORAGE_KEYS.studyMood, DEFAULT_STATE.studyMood),
        dailyPlan: parseStoredJSON(STORAGE_KEYS.dailyPlan, DEFAULT_STATE.dailyPlan),
        recoveryPlan: parseStoredJSON(STORAGE_KEYS.recoveryPlan, DEFAULT_STATE.recoveryPlan),
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
        flashcards: normalizeFlashcards(loaded.flashcards),
        pomodoroSessions: normalizePomodoroSessions(loaded.pomodoroSessions),
        weeklyStats: { ...DEFAULT_STATE.weeklyStats, ...(loaded.weeklyStats || {}) },
        distractionLog: normalizeDistractionLog(loaded.distractionLog),
        microWinStats: normalizeMicroWinStats(loaded.microWinStats),
        weakTopicStats: normalizeWeakTopicStats(loaded.weakTopicStats),
        chapterTracker: normalizeChapterTracker(loaded.chapterTracker),
        doubtTracker: normalizeDoubtTracker(loaded.doubtTracker),
        reflectionEntries: normalizeReflectionEntries(loaded.reflectionEntries),
        goals: { ...DEFAULT_STATE.goals, ...(loaded.goals || {}) },
        goalRoadmap: normalizeGoalRoadmap(loaded.goalRoadmap),
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
        mistakeNotebook: normalizeMistakeNotebook(loaded.mistakeNotebook),
        pastPaperAttempts: normalizePastPaperAttempts(loaded.pastPaperAttempts),
        teacherUpdates: Array.isArray(loaded.teacherUpdates) ? loaded.teacherUpdates : [],
        smartSettings: normalizeSmartSettings(loaded.smartSettings),
        studyMood: normalizeStudyMood(loaded.studyMood),
        dailyPlan: { ...DEFAULT_STATE.dailyPlan, ...(loaded.dailyPlan || {}) },
        recoveryPlan: normalizeRecoveryPlan(loaded.recoveryPlan),
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
let distractionLog = initialState.distractionLog;
let microWinStats = initialState.microWinStats;
let weakTopicStats = initialState.weakTopicStats;
let chapterTracker = initialState.chapterTracker;
let doubtTracker = initialState.doubtTracker;
let reflectionEntries = initialState.reflectionEntries;
let goals = initialState.goals;
let goalRoadmap = initialState.goalRoadmap;
let timetableEntries = initialState.timetableEntries;
let resources = initialState.resources;
let studyMaterials = initialState.studyMaterials;
let freeNotesLibrary = initialState.freeNotesLibrary;
let quizScores = initialState.quizScores;
let mistakeNotebook = initialState.mistakeNotebook;
let pastPaperAttempts = initialState.pastPaperAttempts;
let teacherUpdates = initialState.teacherUpdates;
let smartSettings = initialState.smartSettings;
let studyMood = initialState.studyMood;
let dailyPlan = initialState.dailyPlan;
let recoveryPlan = initialState.recoveryPlan;
let authUsers = initialState.authUsers;
let authSession = initialState.authSession;

// Timer
let timerInterval = null;
let timerMinutes = 25;
let timerSeconds = 0;
let isTimerRunning = false;
let timerModeMinutes = 25;
let timerModeSetAt = Date.now();
let timerCurrentSessionPaused = false;
let timerCurrentSessionStartOnTimeAwarded = false;
let focusShieldSettings = (() => {
    try {
        const raw = JSON.parse(localStorage.getItem(FOCUS_SHIELD_SETTINGS_KEY) || "{}");
        const strictCooldownSeconds = Number(raw && raw.strictCooldownSeconds);
        const gentleCooldownSeconds = Number(raw && raw.gentleCooldownSeconds);
        return {
            enabled: Boolean(raw && raw.enabled),
            strict: Boolean(raw && raw.strict),
            strictCooldownSeconds: [5, 10, 15, 20, 30].includes(strictCooldownSeconds) ? strictCooldownSeconds : 10,
            gentleCooldownSeconds: [1, 2, 3, 5].includes(gentleCooldownSeconds) ? gentleCooldownSeconds : 3
        };
    } catch (_) {
        return { enabled: false, strict: true, strictCooldownSeconds: 10, gentleCooldownSeconds: 3 };
    }
})();
let focusShieldPendingViolation = false;
let focusShieldLastHiddenAt = "";
let focusShieldCooldownTimer = null;
let focusShieldListenersAttached = false;
let focusShieldUnlockReady = false;
const BURNOUT_GUARD_MINUTES = 90;
const BURNOUT_GUARD_FOCUS_SESSIONS = 3;
let pendingReflectionRequired = false;
let pendingReflectionContext = { subject: "General", minutes: 0 };
let pomodoroSubjectFilter = "all";
let reminderIntervalId = null;
let deferredInstallPrompt = null;
let serviceWorkerRegistration = null;
let appBootstrapped = false;
let progressTrendChartInstance = null;
let completionSplitChartInstance = null;
let subjectFocusChartInstance = null;
let subjectTrendChartInstance = null;
let pastPaperTrendChartInstance = null;
let pastPaperTimerInterval = null;
let pastPaperSecondsRemaining = 3600;
let pastPaperTimerRunning = false;
let analyticsTrendSubject = "all";
let lastAISuggestionPlan = null;
let pendingAICreationPreview = null;
let pendingExamCountdownPlan = null;
let pendingExamStrategyPlan = null;
let peerChallenges = [];
let studyGroups = [];
let backendAdminToken = localStorage.getItem(BACKEND_AUTH_TOKEN_KEY) || "";
let backendLastAuthError = "";
let firebaseInitPromise = null;
let firebaseAuth = null;
let firebaseDb = null;
let firebaseAuthObserverAttached = false;
let cloudSyncTimeoutId = null;
let isHydratingFromCloud = false;
let cloudStateLoadedForUid = "";
let activeFirebaseUid = "";
let presenceIntervalId = null;
let presencePingInFlight = false;

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
let flashcardStudyQueue = [];
let flashcardStudyMode = "due";
let resourceSearchQuery = "";
let resourceTypeFilter = "all";
let studyMaterialSearchQuery = "";
let studyMaterialFilterSubject = "all";
let freeNotesSearchQuery = "";
let freeNotesFilterSubject = "all";
let sharedFreeNotes = [];
let sharedFreeNotesLoaded = false;
let sharedFreeNotesLoading = false;
let dashboardQuestionBankSubject = "Any";
let memoryBoosterSession = [];
let voiceNoteRecognition = null;
let voiceNoteListening = false;
let voiceFlashcardListening = false;
let draggedTimetableId = null;
let backendFetchSuspendedUntil = 0;

function isBackendFetchAllowed() {
    return Date.now() >= backendFetchSuspendedUntil;
}

function suspendBackendFetch(ms = 30000) {
    backendFetchSuspendedUntil = Date.now() + Math.max(5000, Number(ms) || 30000);
}

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
const PAGE_ALIASES = {
    "student-quiz-weak": "quiz",
    "student-timer": "pomodoro-history",
    "teacher-class-updates": "admin",
    "teacher-quiz-scores": "admin",
    "teacher-student-progress": "analytics",
    "teacher-notes-library": "free-notes",
    "teacher-reminders": "admin"
};

const SIDEBAR_DEFAULT_PAGE = {
    student: "dashboard",
    teacher: "dashboard",
    admin: "dashboard"
};

const SIDEBAR_PAGES_BY_ROLE = {
    student: new Set(["dashboard", "tasks", "calendar", "flashcards", "student-quiz-weak", "student-timer", "goals", "profile"]),
    teacher: new Set(["dashboard", "teacher-class-updates", "teacher-quiz-scores", "teacher-student-progress", "teacher-notes-library", "timetable", "teacher-reminders", "settings"]),
    admin: new Set(["dashboard", "teacher-class-updates", "teacher-quiz-scores", "teacher-student-progress", "teacher-notes-library", "timetable", "teacher-reminders", "settings"])
};

function resolvePageAlias(page) {
    return PAGE_ALIASES[page] || page;
}

function getCurrentSidebarRole() {
    const user = getCurrentUser();
    if (!user) return "student";
    return (user.role === "teacher" || user.role === "admin") ? user.role : "student";
}

function isSidebarPageAllowed(page) {
    const role = getCurrentSidebarRole();
    const allowedPages = SIDEBAR_PAGES_BY_ROLE[role] || SIDEBAR_PAGES_BY_ROLE.student;
    return allowedPages.has(page);
}

function applyRoleBasedSidebar() {
    const role = getCurrentSidebarRole();
    const navItems = Array.from(document.querySelectorAll(".nav-item"));
    navItems.forEach(item => {
        const rolesAttr = String(item.dataset.navRole || "").trim();
        if (!rolesAttr) {
            item.style.display = "none";
            return;
        }
        const allowedRoles = rolesAttr.split(/\s+/).filter(Boolean);
        item.style.display = allowedRoles.includes(role) ? "list-item" : "none";
    });
}

function applyRoleBasedUIVisibility() {
    const role = getCurrentSidebarRole();
    const roleScopedElements = Array.from(document.querySelectorAll("[data-ui-role]"));
    roleScopedElements.forEach(el => {
        const rolesAttr = String(el.getAttribute("data-ui-role") || "").trim();
        if (!rolesAttr) {
            el.style.display = "";
            return;
        }
        const allowedRoles = rolesAttr.split(/\s+/).filter(Boolean);
        el.style.display = allowedRoles.includes(role) ? "" : "none";
    });
}

function navigateTo(page) {
    if (!isSidebarPageAllowed(page)) {
        page = SIDEBAR_DEFAULT_PAGE[getCurrentSidebarRole()] || "dashboard";
    }

    const requestedPage = page;
    const resolvedPage = resolvePageAlias(requestedPage);

    if (resolvedPage === 'admin' && !canAccessAdmin()) {
        alert('Admin page requires teacher/admin account.');
        page = SIDEBAR_DEFAULT_PAGE[getCurrentSidebarRole()] || 'dashboard';
    } else {
        page = requestedPage;
    }
    const targetPage = resolvePageAlias(page);

    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const targetPageEl = document.getElementById(`page-${targetPage}`);
    if (!targetPageEl) {
        document.getElementById('page-dashboard').classList.add('active');
    } else {
        targetPageEl.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNavItem = document.querySelector(`.nav-item[data-page="${page}"]`) || document.querySelector(`.nav-item[data-page="${targetPage}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    const titles = {
        'dashboard': 'Dashboard',
        'tasks': 'Tasks',
        'calendar': 'Calendar',
        'flashcards': 'Flashcards',
        'analytics': 'Student Progress',
        'quiz': 'Quiz',
        'admin': 'Class Updates & Reminders',
        'timetable': 'Timetable',
        'free-notes': 'Notes Library',
        'pomodoro-history': 'Timer',
        'goals': 'Goals',
        'profile': 'Profile',
        'settings': 'Settings',
        'student-quiz-weak': 'Quiz & Weak Topics',
        'student-timer': 'Timer',
        'teacher-class-updates': 'Class Updates',
        'teacher-quiz-scores': 'Quiz Scores',
        'teacher-student-progress': 'Student Progress',
        'teacher-notes-library': 'Notes Library',
        'teacher-reminders': 'Reminders'
    };
    document.getElementById('pageTitle').textContent = titles[page] || titles[targetPage] || 'Dashboard';

    // Refresh page data
    if (targetPage === 'dashboard') renderDashboard();
    if (targetPage === 'tasks') renderTasks();
    if (targetPage === 'calendar') renderCalendar();
    if (targetPage === 'flashcards') renderFlashcards();
    if (targetPage === 'analytics') renderAnalytics();
    if (targetPage === 'quiz') renderQuizPage();
    if (targetPage === 'admin') renderAdminPage();
    if (targetPage === 'timetable') renderTimetable();
    if (targetPage === 'free-notes') renderFreeNotes();
    if (targetPage === 'pomodoro-history') renderPomodoroHistory();
    if (targetPage === 'goals') renderGoals();
    if (targetPage === 'profile') renderProfile();
    if (targetPage === 'settings') renderSmartSettings();

    // Close mobile menu
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').style.display = 'none';
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const page = item.dataset.page;
        const targetPage = resolvePageAlias(page);
        if (targetPage === "admin" && !canAccessAdmin()) {
            alert('Admin page requires teacher/admin account.');
            return;
        }
        navigateTo(page);
    });
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
        distractionLog,
        microWinStats,
        weakTopicStats,
        chapterTracker,
        doubtTracker,
        reflectionEntries,
        studyStreak,
        bestStreak,
        goals,
        goalRoadmap,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        mistakeNotebook,
        pastPaperAttempts,
        teacherUpdates,
        smartSettings,
        studyMood,
        dailyPlan,
        recoveryPlan,
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
    distractionLog = normalizeDistractionLog(DEFAULT_STATE.distractionLog);
    microWinStats = normalizeMicroWinStats(DEFAULT_STATE.microWinStats);
    weakTopicStats = { ...DEFAULT_STATE.weakTopicStats };
    chapterTracker = Array.isArray(DEFAULT_STATE.chapterTracker) ? [...DEFAULT_STATE.chapterTracker] : [];
    doubtTracker = Array.isArray(DEFAULT_STATE.doubtTracker) ? [...DEFAULT_STATE.doubtTracker] : [];
    reflectionEntries = Array.isArray(DEFAULT_STATE.reflectionEntries) ? [...DEFAULT_STATE.reflectionEntries] : [];
    goals = { ...DEFAULT_STATE.goals };
    goalRoadmap = { ...DEFAULT_STATE.goalRoadmap };
    timetableEntries = Array.isArray(DEFAULT_STATE.timetableEntries) ? [...DEFAULT_STATE.timetableEntries] : [];
    resources = DEFAULT_RESOURCES_LIBRARY.map(item => ({ ...item }));
    studyMaterials = DEFAULT_STUDY_MATERIALS.map(item => ({ ...item }));
    freeNotesLibrary = DEFAULT_FREE_NOTES_LIBRARY.map(item => ({ ...item }));
    quizScores = Array.isArray(DEFAULT_STATE.quizScores) ? [...DEFAULT_STATE.quizScores] : [];
    mistakeNotebook = Array.isArray(DEFAULT_STATE.mistakeNotebook) ? [...DEFAULT_STATE.mistakeNotebook] : [];
    pastPaperAttempts = Array.isArray(DEFAULT_STATE.pastPaperAttempts) ? [...DEFAULT_STATE.pastPaperAttempts] : [];
    teacherUpdates = Array.isArray(DEFAULT_STATE.teacherUpdates) ? [...DEFAULT_STATE.teacherUpdates] : [];
    smartSettings = normalizeSmartSettings(DEFAULT_STATE.smartSettings);
    studyMood = normalizeStudyMood(DEFAULT_STATE.studyMood);
    dailyPlan = { ...DEFAULT_STATE.dailyPlan };
    recoveryPlan = normalizeRecoveryPlan(DEFAULT_STATE.recoveryPlan);
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
        distractionLog,
        microWinStats,
        weakTopicStats,
        chapterTracker,
        doubtTracker,
        reflectionEntries,
        studyStreak,
        bestStreak,
        goals,
        goalRoadmap,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        mistakeNotebook,
        pastPaperAttempts,
        teacherUpdates,
        smartSettings,
        studyMood,
        dailyPlan,
        recoveryPlan
    });
}

function applyCloudState(data) {
    if (!data || typeof data !== "object") return;
    isHydratingFromCloud = true;
    try {
        if (Array.isArray(data.tasks)) tasks = normalizeTasks(data.tasks);
        if (Array.isArray(data.notes)) notes = data.notes;
        if (data.flashcards && typeof data.flashcards === "object") flashcards = normalizeFlashcards(data.flashcards);
        if (Array.isArray(data.assignments)) assignments = data.assignments;
        if (Array.isArray(data.exams)) exams = data.exams;
        if (Array.isArray(data.subjects)) subjects = data.subjects;
        if (Array.isArray(data.gpaHistory)) gpaHistory = data.gpaHistory;
        if (Array.isArray(data.pomodoroSessions)) pomodoroSessions = normalizePomodoroSessions(data.pomodoroSessions);
        if (Array.isArray(data.activityLog)) activityLog = data.activityLog;
        if (data.weeklyStats) weeklyStats = { ...DEFAULT_STATE.weeklyStats, ...data.weeklyStats };
        if (Array.isArray(data.distractionLog)) distractionLog = normalizeDistractionLog(data.distractionLog);
        if (data.microWinStats) microWinStats = normalizeMicroWinStats(data.microWinStats);
        if (data.weakTopicStats) weakTopicStats = normalizeWeakTopicStats(data.weakTopicStats);
        if (Array.isArray(data.chapterTracker)) chapterTracker = normalizeChapterTracker(data.chapterTracker);
        if (Array.isArray(data.doubtTracker)) doubtTracker = normalizeDoubtTracker(data.doubtTracker);
        if (Array.isArray(data.reflectionEntries)) reflectionEntries = normalizeReflectionEntries(data.reflectionEntries);
        if (Number.isFinite(data.studyStreak)) studyStreak = data.studyStreak;
        if (Number.isFinite(data.bestStreak)) bestStreak = data.bestStreak;
        if (data.goals) goals = { ...DEFAULT_STATE.goals, ...data.goals };
        if (data.goalRoadmap) goalRoadmap = normalizeGoalRoadmap(data.goalRoadmap);
        if (Array.isArray(data.timetableEntries)) timetableEntries = data.timetableEntries;
        if (Array.isArray(data.resources)) resources = data.resources;
        if (Array.isArray(data.studyMaterials) && data.studyMaterials.length > 0) studyMaterials = data.studyMaterials;
        if (Array.isArray(data.freeNotesLibrary) && data.freeNotesLibrary.length > 0) freeNotesLibrary = data.freeNotesLibrary;
        if (Array.isArray(data.quizScores)) quizScores = data.quizScores;
        if (Array.isArray(data.mistakeNotebook)) mistakeNotebook = normalizeMistakeNotebook(data.mistakeNotebook);
        if (Array.isArray(data.pastPaperAttempts)) pastPaperAttempts = normalizePastPaperAttempts(data.pastPaperAttempts);
        if (Array.isArray(data.teacherUpdates)) teacherUpdates = data.teacherUpdates;
        if (data.smartSettings) smartSettings = normalizeSmartSettings(data.smartSettings);
        if (data.studyMood) studyMood = normalizeStudyMood(data.studyMood);
        if (data.dailyPlan) dailyPlan = { ...DEFAULT_STATE.dailyPlan, ...data.dailyPlan };
        if (data.recoveryPlan) recoveryPlan = normalizeRecoveryPlan(data.recoveryPlan);

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
            distractionLog,
            microWinStats,
            weakTopicStats,
            chapterTracker,
            doubtTracker,
            reflectionEntries,
            studyStreak,
            bestStreak,
            goals,
            goalRoadmap,
            timetableEntries,
            resources,
            studyMaterials,
            freeNotesLibrary,
            quizScores,
            mistakeNotebook,
            pastPaperAttempts,
            teacherUpdates,
            smartSettings,
            studyMood,
            dailyPlan,
            recoveryPlan
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
    backendLastAuthError = "";
    try {
        let response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        let data = await response.json().catch(() => ({}));
        if (!response.ok && response.status === 409) {
            // If backend user already exists, try login to obtain JWT token.
            response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            data = await response.json().catch(() => ({}));
        }
        if (response.ok && data && data.token) {
            backendAdminToken = data.token;
            localStorage.setItem(BACKEND_AUTH_TOKEN_KEY, backendAdminToken);
            return true;
        }
        backendLastAuthError = `HTTP ${response.status}: ${data && data.error ? data.error : 'Backend register/login failed'}`;
    } catch (err) {
        backendLastAuthError = err && err.message ? err.message : 'Network error while connecting backend';
    }
    return false;
}

async function syncLoginWithBackend(email, password, fallbackName = "Student", fallbackRole = "student") {
    backendLastAuthError = "";
    try {
        let response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        let data = await response.json().catch(() => ({}));
        if (!response.ok) {
            // Self-heal: if backend account is missing, create it and get token.
            const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: String(fallbackName || "Student").trim() || "Student",
                    email,
                    password,
                    role: ["student", "teacher", "admin"].includes(fallbackRole) ? fallbackRole : "student"
                })
            });
            if (registerResponse.ok) {
                data = await registerResponse.json().catch(() => ({}));
                response = registerResponse;
            } else if (registerResponse.status === 409) {
                response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                data = await response.json().catch(() => ({}));
            }
        }
        if (response.ok && data && data.token) {
            backendAdminToken = data.token;
            localStorage.setItem(BACKEND_AUTH_TOKEN_KEY, backendAdminToken);
            return true;
        }
        backendLastAuthError = `HTTP ${response.status}: ${data && data.error ? data.error : 'Backend auth failed'}`;
    } catch (err) {
        backendLastAuthError = err && err.message ? err.message : 'Network error while connecting backend';
    }
    return false;
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
            flashcards = normalizeFlashcards(remoteFlashcards);
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

function canManageSharedNotes() {
    return canAccessAdmin();
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
        updateOnlineStudentsVisibility();
        const currentUserName = document.getElementById("currentUserName");
        if (currentUserName) currentUserName.textContent = user.name || "User";
        applyRoleBasedSidebar();
        applyRoleBasedUIVisibility();
        bootstrapAuthenticatedApp();
        startPresenceTracking();
        renderProfile();
        navigateTo("dashboard");
    } else {
        stopPresenceTracking();
        updateOnlineStudentsVisibility();
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
            if (firebaseSdk.signOut) {
                try {
                    await firebaseSdk.signOut(firebaseAuth);
                } catch (_) {}
            }
            authSession = null;
            saveState({ authUsers, authSession });
            setAuthMessage("Account created successfully. Please login.");
            showAuthView("login");
            Promise.allSettled([
                syncCurrentUserProfileToCloud(),
                syncRegisterWithBackend(name, email, password, role),
                syncStateToCloudNow()
            ]);
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
    authSession = null;
    saveState({ authUsers, authSession });
    setAuthMessage("Account created successfully. Please login.");
    showAuthView("login");
    syncRegisterWithBackend(name, email, password, role);
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
            const localUser = getCurrentUser();
            await syncLoginWithBackend(
                email,
                password,
                localUser && localUser.name ? localUser.name : (credential.user.displayName || "Student"),
                localUser && localUser.role ? localUser.role : "student"
            );
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
    await syncLoginWithBackend(
        email,
        password,
        user && user.name ? user.name : "Student",
        user && user.role ? user.role : "student"
    );
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
    await notifyPresenceLogout();
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

function getPresenceClientId() {
    let clientId = localStorage.getItem(PRESENCE_CLIENT_ID_KEY) || "";
    if (clientId) return clientId;

    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        clientId = window.crypto.randomUUID();
    } else {
        clientId = `presence-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    localStorage.setItem(PRESENCE_CLIENT_ID_KEY, clientId);
    return clientId;
}

function updateOnlineStudentsUI(count) {
    const countEl = document.getElementById("onlineStudentsCount");
    if (!countEl) return;
    const safeCount = Number.isFinite(Number(count)) ? Number(count) : 0;
    countEl.textContent = String(safeCount);
}

function canViewOnlineStudentsWidget(user = getCurrentUser()) {
    return !!user && (user.role === "teacher" || user.role === "admin");
}

function updateOnlineStudentsVisibility() {
    const widget = document.getElementById("onlineStudentsStatus");
    if (!widget) return;
    widget.style.display = canViewOnlineStudentsWidget() ? "flex" : "none";
}

async function pingPresence() {
    if (presencePingInFlight) return;
    const user = getCurrentUser();
    if (!user || !navigator.onLine || !isBackendFetchAllowed()) return;

    presencePingInFlight = true;
    try {
        const response = await fetch(`${API_BASE_URL}/api/presence/ping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: getPresenceClientId(),
                role: user.role || "student",
                email: user.email || ""
            })
        });
        if (!response.ok) return;
        const data = await response.json();
        updateOnlineStudentsUI(data.onlineStudents);
    } catch (_) {
        suspendBackendFetch(30000);
    } finally {
        presencePingInFlight = false;
    }
}

async function refreshOnlineStudentsCount() {
    if (!isBackendFetchAllowed()) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/presence/online-students`);
        if (!response.ok) return;
        const data = await response.json();
        updateOnlineStudentsUI(data.onlineStudents);
    } catch (_) {
        suspendBackendFetch(30000);
    }
}

function startPresenceTracking() {
    stopPresenceTracking();
    if (canViewOnlineStudentsWidget()) {
        refreshOnlineStudentsCount();
    }
    pingPresence();
    presenceIntervalId = setInterval(() => {
        if (document.visibilityState !== "hidden") {
            pingPresence();
            if (canViewOnlineStudentsWidget()) {
                refreshOnlineStudentsCount();
            }
        }
    }, PRESENCE_PING_INTERVAL_MS);
}

function stopPresenceTracking() {
    if (presenceIntervalId) {
        clearInterval(presenceIntervalId);
        presenceIntervalId = null;
    }
    updateOnlineStudentsUI(0);
}

async function notifyPresenceLogout() {
    const clientId = localStorage.getItem(PRESENCE_CLIENT_ID_KEY);
    if (!clientId) return;
    try {
        await fetch(`${API_BASE_URL}/api/presence/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientId }),
            keepalive: true
        });
    } catch (_) {
    }
}

function setupPresenceLifecycleListeners() {
    window.addEventListener("beforeunload", () => {
        const clientId = localStorage.getItem(PRESENCE_CLIENT_ID_KEY);
        if (!clientId || !navigator.sendBeacon) return;
        const payload = JSON.stringify({ clientId });
        navigator.sendBeacon(`${API_BASE_URL}/api/presence/logout`, new Blob([payload], { type: "application/json" }));
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            if (canViewOnlineStudentsWidget()) {
                refreshOnlineStudentsCount();
            }
            pingPresence();
        }
    });
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

function subjectMatches(taskSubject, examSubject) {
    const taskValue = String(taskSubject || "").trim().toLowerCase();
    const examValue = String(examSubject || "").trim().toLowerCase();
    if (!taskValue || !examValue) return false;
    return taskValue === examValue;
}

function examWeightScore(task, context = {}) {
    const examWeight = Number.isFinite(Number(task && task.examWeight))
        ? Math.min(5, Math.max(1, Math.round(Number(task.examWeight))))
        : 3;
    const manualWeightScore = examWeight * 8;
    const taskSubject = String(task && task.subject ? task.subject : "").trim();
    const now = context.now || new Date();
    const examList = Array.isArray(context.exams) ? context.exams : [];
    if (!taskSubject || examList.length === 0) return manualWeightScore;

    let nearestDays = Number.POSITIVE_INFINITY;
    examList.forEach(exam => {
        if (!subjectMatches(taskSubject, exam && exam.subject)) return;
        const days = daysUntil(exam.date, now);
        if (days >= 0 && days < nearestDays) nearestDays = days;
    });

    let proximityScore = 0;
    if (nearestDays <= 3) proximityScore = 30;
    else if (nearestDays <= 7) proximityScore = 24;
    else if (nearestDays <= 14) proximityScore = 18;
    else if (nearestDays <= 30) proximityScore = 12;
    else if (nearestDays <= 60) proximityScore = 6;

    return manualWeightScore + proximityScore;
}

function getExamSignal(task, context = {}) {
    const examWeight = Number.isFinite(Number(task && task.examWeight))
        ? Math.min(5, Math.max(1, Math.round(Number(task.examWeight))))
        : 3;
    const manualWeightScore = examWeight * 8;
    const taskSubject = String(task && task.subject ? task.subject : "").trim();
    const now = context.now || new Date();
    const examList = Array.isArray(context.exams) ? context.exams : [];
    if (!taskSubject || examList.length === 0) {
        return { manualWeightScore, proximityScore: 0, nearestDays: Number.POSITIVE_INFINITY };
    }

    let nearestDays = Number.POSITIVE_INFINITY;
    examList.forEach(exam => {
        if (!subjectMatches(taskSubject, exam && exam.subject)) return;
        const days = daysUntil(exam.date, now);
        if (days >= 0 && days < nearestDays) nearestDays = days;
    });

    let proximityScore = 0;
    if (nearestDays <= 3) proximityScore = 30;
    else if (nearestDays <= 7) proximityScore = 24;
    else if (nearestDays <= 14) proximityScore = 18;
    else if (nearestDays <= 30) proximityScore = 12;
    else if (nearestDays <= 60) proximityScore = 6;

    return { manualWeightScore, proximityScore, nearestDays };
}

function getTaskScoreBreakdown(task, context = {}) {
    if (!task || task.done) {
        return { total: Number.NEGATIVE_INFINITY, items: [] };
    }

    const now = context.now || new Date();
    const weakSubjects = Array.isArray(context.weakSubjects) ? context.weakSubjects : [];
    const taskDaysUntil = daysUntil(task.dueDate, now);
    const examSignal = getExamSignal(task, context);
    let dueDateScore = 0;
    if (taskDaysUntil === Number.POSITIVE_INFINITY) dueDateScore = 8;
    else if (taskDaysUntil < 0) dueDateScore = 120 + Math.abs(taskDaysUntil) * 10;
    else dueDateScore = Math.max(0, 70 - taskDaysUntil * 9);

    const weakSubjectScore = weakSubjects.includes(task.subject) ? 15 : 0;
    const items = [
        { label: "Due date urgency", value: dueDateScore },
        { label: "Priority", value: priorityWeight(task.priority) },
        { label: "Difficulty", value: difficultyWeight(task.difficulty) },
        { label: "Exam weight", value: examSignal.manualWeightScore },
        { label: "Exam proximity", value: examSignal.proximityScore },
        { label: "Estimated hours", value: Math.min(20, (Number(task.estimatedHours) || 1) * 4) },
        { label: "Weak-subject boost", value: weakSubjectScore }
    ];

    const total = Math.round(items.reduce((sum, item) => sum + item.value, 0));
    return { total, items };
}

function getTaskScoreHint(task, context = {}, maxItems = 3) {
    const breakdown = getTaskScoreBreakdown(task, context);
    const top = breakdown.items
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, Math.max(1, maxItems));
    if (top.length === 0) return "No active score factors.";
    return top.map(item => `${item.label} +${Math.round(item.value)}`).join(" | ");
}

function getTaskScoreLevel(totalScore) {
    const score = Number(totalScore) || 0;
    if (score >= 170) {
        return { label: "Priority Signal: Urgent", className: "urgent" };
    }
    if (score >= 110) {
        return { label: "Priority Signal: Moderate", className: "moderate" };
    }
    return { label: "Priority Signal: Low", className: "low" };
}

function openTaskScoreModal(encodedTaskId) {
    const taskId = decodeURIComponent(String(encodedTaskId || ""));
    const modal = document.getElementById('taskScoreModal');
    const titleEl = document.getElementById('taskScoreModalTitle');
    const totalEl = document.getElementById('taskScoreTotalText');
    const listEl = document.getElementById('taskScoreBreakdownList');
    const levelBadgeEl = document.getElementById('taskScoreLevelBadge');
    if (!modal || !titleEl || !totalEl || !listEl || !levelBadgeEl) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const context = { now: new Date(), weakSubjects: smartSettings.weakSubjects || [], exams };
    const breakdown = getTaskScoreBreakdown(task, context);
    const level = getTaskScoreLevel(breakdown.total);

    titleEl.textContent = `Task Score Breakdown: ${task.text}`;
    totalEl.innerHTML = `<strong>Total Score:</strong> ${breakdown.total}`;
    levelBadgeEl.textContent = level.label;
    levelBadgeEl.className = `score-level-badge ${level.className}`;
    listEl.innerHTML = breakdown.items.map(item => `
        <li class="score-breakdown-item">
            <span class="score-breakdown-label">${item.label}</span>
            <span class="score-breakdown-value">+${Math.round(item.value)}</span>
        </li>
    `).join('');

    modal.classList.add('active');
}

function closeTaskScoreModal() {
    const modal = document.getElementById('taskScoreModal');
    if (modal) modal.classList.remove('active');
}

function scoreTask(task, context = {}) {
    return getTaskScoreBreakdown(task, context).total;
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

function getStudyMoodProfile() {
    const level = normalizeStudyMood(studyMood).level;
    if (level === "light") {
        return {
            level: "light",
            label: "Light",
            workloadFactor: 0.7,
            minSessionMinutes: 20,
            maxSessionMinutes: 60
        };
    }
    if (level === "intense") {
        return {
            level: "intense",
            label: "Intense",
            workloadFactor: 1.25,
            minSessionMinutes: 30,
            maxSessionMinutes: 150
        };
    }
    return {
        level: "normal",
        label: "Normal",
        workloadFactor: 1,
        minSessionMinutes: 25,
        maxSessionMinutes: 120
    };
}

function renderStudyMoodCheckin() {
    const statusEl = document.getElementById('studyMoodStatus');
    const btnContainer = document.getElementById('studyMoodButtons');
    const hintEl = document.getElementById('todayPlanMoodHint');
    if (!statusEl || !btnContainer) return;

    const mood = getStudyMoodProfile();
    statusEl.textContent = `Energy mood: ${mood.label}`;
    if (hintEl) {
        const factorPercent = Math.round(mood.workloadFactor * 100);
        hintEl.textContent = `Workload mode: ${mood.label} (${factorPercent}% load)`;
    }
    const buttons = Array.from(btnContainer.querySelectorAll('.mood-btn'));
    buttons.forEach(btn => {
        const buttonMood = String(btn.dataset.mood || "").trim().toLowerCase();
        btn.classList.toggle('active-mood', buttonMood === mood.level);
    });
}

function setStudyMood(level) {
    const normalizedLevel = String(level || "normal").trim().toLowerCase();
    const safeLevel = ["light", "normal", "intense"].includes(normalizedLevel) ? normalizedLevel : "normal";
    studyMood = {
        level: safeLevel,
        updatedAt: new Date().toISOString()
    };
    saveState({ studyMood });
    renderStudyMoodCheckin();
}

function getDistractionLabel(type) {
    const map = {
        phone: "Phone",
        social: "Social Media",
        noise: "Noise",
        chat: "Chat",
        fatigue: "Fatigue"
    };
    return map[String(type || "").toLowerCase()] || toSentenceCase(String(type || "Other"));
}

function getDistractionFixes(type) {
    const key = String(type || "").toLowerCase();
    if (key === "phone") {
        return [
            "Put phone on airplane mode for the next 25-minute block.",
            "Keep phone outside arm's reach until timer ends."
        ];
    }
    if (key === "social") {
        return [
            "Block social apps for 30 minutes before the next session.",
            "Use one 5-minute social check only after a completed focus block."
        ];
    }
    if (key === "noise") {
        return [
            "Use earphones or white noise for your next focus session.",
            "Move to a quieter spot for high-difficulty tasks."
        ];
    }
    if (key === "chat") {
        return [
            "Set status to busy and reply after the current timer ends.",
            "Batch messages into one 10-minute window after two focus blocks."
        ];
    }
    if (key === "fatigue") {
        return [
            "Take a 5-minute break: water + stretch, then restart with Light mood.",
            "Switch to one easy micro-task before returning to hard topics."
        ];
    }
    return ["Use a short timer and remove one distraction source before starting."];
}

function getRecentDistractionStats(days = 7) {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    from.setDate(from.getDate() - Math.max(0, Number(days) - 1));

    const counts = {};
    (distractionLog || []).forEach(item => {
        const ts = new Date(item.createdAt || 0);
        if (Number.isNaN(ts.getTime()) || ts < from) return;
        const type = String(item.type || "").toLowerCase();
        if (!type) return;
        counts[type] = (counts[type] || 0) + 1;
    });

    const ranked = Object.entries(counts)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
    return { counts, ranked };
}

function renderDistractionPanel() {
    const statusEl = document.getElementById('distractionLogStatus');
    const listEl = document.getElementById('distractionFixList');
    if (!statusEl || !listEl) return;

    const stats = getRecentDistractionStats(7);
    if (!stats.ranked.length) {
        statusEl.textContent = 'Distraction Log: Tap what pulled your attention.';
        listEl.innerHTML = '<li class="empty-state">Personalized anti-distraction fixes will appear here.</li>';
        return;
    }

    const top = stats.ranked[0];
    const topLabel = getDistractionLabel(top.type);
    statusEl.textContent = `Top distraction this week: ${topLabel} (${top.count} time${top.count === 1 ? '' : 's'}).`;
    const fixes = getDistractionFixes(top.type);
    listEl.innerHTML = fixes.map(item => `<li>${item}</li>`).join('');
}

function logDistractionEvent(type) {
    const normalizedType = String(type || "").trim().toLowerCase();
    if (!normalizedType) return;
    distractionLog.unshift({
        id: `distraction-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: normalizedType,
        subject: getSelectedTimerSubject(),
        createdAt: new Date().toISOString()
    });
    distractionLog = normalizeDistractionLog(distractionLog);
    saveState({ distractionLog });
    addActivity('ban', 'Distraction Logged', getDistractionLabel(normalizedType));
    renderDistractionPanel();
}

function hasMoodCheckinForToday() {
    const updatedAt = String((studyMood && studyMood.updatedAt) || "");
    if (!updatedAt) return false;
    const checkinDate = new Date(updatedAt);
    if (Number.isNaN(checkinDate.getTime())) return false;
    return checkinDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
}

function formatHourLabel(hour24) {
    const safeHour = ((Number(hour24) || 0) + 24) % 24;
    const suffix = safeHour >= 12 ? "PM" : "AM";
    const hour12 = safeHour % 12 === 0 ? 12 : safeHour % 12;
    return `${hour12}:00 ${suffix}`;
}

function formatClockLabelFromMinutes(totalMinutes) {
    const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
    const hour = Math.floor(normalized / 60);
    const minute = normalized % 60;
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function getFocusDNAProfile() {
    const focusSessions = (pomodoroSessions || [])
        .filter(session => String(session && session.type || "") === "Focus")
        .map(session => ({
            subject: String(session && session.subject || "General").trim() || "General",
            minutes: Math.max(0, Number(session && session.minutes) || 0),
            date: new Date(session && session.date || "")
        }))
        .filter(session => session.minutes > 0 && !Number.isNaN(session.date.getTime()));

    if (focusSessions.length < 4) {
        return {
            hasData: false,
            totalSessions: focusSessions.length,
            peakHours: [],
            topSubjects: [],
            preferredSessionMinutes: 25,
            recommendedStartHour: 18
        };
    }

    const hourStats = Array.from({ length: 24 }, (_, hour) => ({ hour, sessions: 0, minutes: 0 }));
    const subjectStats = new Map();
    let totalMinutes = 0;

    focusSessions.forEach(session => {
        const hour = session.date.getHours();
        hourStats[hour].sessions += 1;
        hourStats[hour].minutes += session.minutes;
        totalMinutes += session.minutes;

        const current = subjectStats.get(session.subject) || { subject: session.subject, sessions: 0, minutes: 0 };
        current.sessions += 1;
        current.minutes += session.minutes;
        subjectStats.set(session.subject, current);
    });

    const peakHours = hourStats
        .filter(item => item.sessions > 0)
        .sort((a, b) => {
            if (b.minutes !== a.minutes) return b.minutes - a.minutes;
            return b.sessions - a.sessions;
        })
        .slice(0, 3)
        .map(item => item.hour);

    const topSubjects = [...subjectStats.values()]
        .sort((a, b) => {
            if (b.minutes !== a.minutes) return b.minutes - a.minutes;
            return b.sessions - a.sessions;
        })
        .slice(0, 3);

    const preferredSessionMinutes = Math.max(20, Math.min(90, Math.round((totalMinutes / focusSessions.length) / 5) * 5));
    const recommendedStartHour = peakHours.length > 0 ? peakHours[0] : 18;

    return {
        hasData: true,
        totalSessions: focusSessions.length,
        peakHours,
        topSubjects,
        preferredSessionMinutes,
        recommendedStartHour
    };
}

function renderFocusDNAProfile() {
    const statusEl = document.getElementById('focusDNAStatus');
    const listEl = document.getElementById('focusDNAInsightsList');
    if (!statusEl || !listEl) return;

    const dna = getFocusDNAProfile();
    if (!dna.hasData) {
        statusEl.textContent = `Not enough focus sessions yet (${dna.totalSessions}/4). Complete a few timer sessions to unlock your profile.`;
        listEl.innerHTML = '<li class="empty-state">Your peak study hours, best subjects, and ideal session length will appear here.</li>';
        return;
    }

    const peakHourText = dna.peakHours.length > 0
        ? dna.peakHours.map(formatHourLabel).join(", ")
        : "No peak window detected";
    const topSubjectsText = dna.topSubjects.length > 0
        ? dna.topSubjects.map(item => `${item.subject} (${Math.round(item.minutes)} min)`).join(", ")
        : "General";

    statusEl.textContent = `Focus DNA ready: hard topics will be scheduled first around ${formatHourLabel(dna.recommendedStartHour)}.`;
    listEl.innerHTML = `
        <li><strong>Peak hours:</strong> ${peakHourText}</li>
        <li><strong>Top focus subjects:</strong> ${topSubjectsText}</li>
        <li><strong>Ideal session length:</strong> ${dna.preferredSessionMinutes} minutes</li>
    `;
}

function generateDailyPlan(taskList, options = {}) {
    const now = options.now || new Date();
    const availableHours = Math.max(1, Number(options.availableHours) || 2);
    const weakSubjects = Array.isArray(options.weakSubjects) ? options.weakSubjects : [];
    const examList = Array.isArray(options.exams) ? options.exams : [];
    const prioritizeTaskIds = new Set(Array.isArray(options.prioritizeTaskIds) ? options.prioritizeTaskIds : []);
    const focusDNA = options.focusDNAProfile && options.focusDNAProfile.hasData ? options.focusDNAProfile : null;
    const studyMoodProfile = options.studyMoodProfile || getStudyMoodProfile();
    const remainingMinutes = Math.max(30, Math.round(availableHours * 60 * (studyMoodProfile.workloadFactor || 1)));
    let usedMinutes = 0;

    const ranked = rankTasks(taskList, { now, weakSubjects, exams: examList })
        .filter(task => !task.done)
        .sort((a, b) => {
            const aPriority = prioritizeTaskIds.has(a.id) ? 1 : 0;
            const bPriority = prioritizeTaskIds.has(b.id) ? 1 : 0;
            if (aPriority !== bPriority) return bPriority - aPriority;
            if (studyMoodProfile.level === "light" || studyMoodProfile.level === "intense") {
                const weightFor = (task) => {
                    const diff = String(task && task.difficulty || "medium");
                    if (studyMoodProfile.level === "intense") {
                        if (diff === "hard") return 2;
                        if (diff === "medium") return 1;
                        return 0;
                    }
                    if (diff === "easy") return 2;
                    if (diff === "medium") return 1;
                    return 0;
                };
                const aMoodWeight = weightFor(a);
                const bMoodWeight = weightFor(b);
                if (aMoodWeight !== bMoodWeight) return bMoodWeight - aMoodWeight;
            }
            if (focusDNA) {
                const topSubject = String((focusDNA.topSubjects[0] && focusDNA.topSubjects[0].subject) || "").trim().toLowerCase();
                const aSubject = String(a.subject || "").trim().toLowerCase();
                const bSubject = String(b.subject || "").trim().toLowerCase();
                const aHardPriority =
                    (a.difficulty === "hard" ? 2 : (a.difficulty === "medium" ? 1 : 0)) +
                    (topSubject && aSubject === topSubject ? 1 : 0);
                const bHardPriority =
                    (b.difficulty === "hard" ? 2 : (b.difficulty === "medium" ? 1 : 0)) +
                    (topSubject && bSubject === topSubject ? 1 : 0);
                if (aHardPriority !== bHardPriority) return bHardPriority - aHardPriority;
            }
            return b._score - a._score;
        });

    const items = [];
    const startHour = focusDNA ? focusDNA.recommendedStartHour : now.getHours();
    const baseStartMinutes = Math.max(0, Math.min(23, startHour)) * 60;
    for (const task of ranked) {
        const recommendedMinutes = Math.max(
            studyMoodProfile.minSessionMinutes,
            Math.min(studyMoodProfile.maxSessionMinutes, Math.round(estimateTaskHours(task) * 60))
        );
        if (usedMinutes + recommendedMinutes > remainingMinutes && items.length > 0) continue;
        if (usedMinutes >= remainingMinutes) break;

        const plannedStartMinutes = baseStartMinutes + usedMinutes;
        const allocatedMinutes = Math.min(recommendedMinutes, remainingMinutes - usedMinutes);
        usedMinutes += allocatedMinutes;
        items.push({
            taskId: task.id,
            text: task.text,
            subject: task.subject || "General",
            priority: task.priority,
            score: task._score,
            allocatedMinutes,
            plannedStartLabel: formatClockLabelFromMinutes(plannedStartMinutes)
        });
    }

    return {
        date: now.toISOString().split("T")[0],
        availableHours,
        mode: focusDNA ? "focus-dna" : "default",
        mood: studyMoodProfile.level,
        focusDNARecommendedStartHour: focusDNA ? focusDNA.recommendedStartHour : null,
        items
    };
}

function replanAfterMissedTasks(taskList, previousPlan, options = {}) {
    const now = options.now || new Date();
    const weakSubjects = Array.isArray(options.weakSubjects) ? options.weakSubjects : [];
    const focusDNAProfile = options.focusDNAProfile || getFocusDNAProfile();
    const studyMoodProfile = options.studyMoodProfile || getStudyMoodProfile();
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
        exams: options.exams,
        prioritizeTaskIds: Array.from(carryOverIds),
        focusDNAProfile,
        studyMoodProfile
    });
}

// ==================== DASHBOARD ====================
function renderDashboard() {
    renderTimerSubjectOptions();
    renderBurnoutGuardHint();
    renderFocusShieldStatus();
    const completed = tasks.filter(t => t.done).length;
    document.getElementById('totalTasks').textContent = tasks.length;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = tasks.length - completed;
    const assignmentsCountEl = document.getElementById('assignmentsCount');
    if (assignmentsCountEl) assignmentsCountEl.textContent = assignments.length;
    document.getElementById('studyHours').textContent = Math.round(weeklyStats.studyHours * 10) / 10;
    
    let totalFlashcards = 0;
    Object.values(flashcards).forEach(deck => totalFlashcards += deck.length);
    document.getElementById('flashcardCount').textContent = totalFlashcards;
    
    // Streak (optional header widget)
    const streakCountEl = document.getElementById('streakCount');
    if (streakCountEl) {
        streakCountEl.textContent = studyStreak;
    }
    
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
    renderConsistencyRewards();
    
    // Recent activity
    renderRecentActivity();
    
    // Upcoming deadlines
    renderUpcomingDeadlines();
    renderScholarshipExamAlerts();
    renderDailyTop3AdaptiveTasks();
    renderWeakTopicDetection();
    renderMistakeDueBadges();
    renderStudyMoodCheckin();
    renderDistractionPanel();
    renderLiveClassMode();
    renderFocusDNAProfile();
    renderMicroWinStats();
    renderPeerChallenges();
    renderStudyGroupRooms();
    loadPeerChallengesFromServer();
    loadStudyGroupsFromServer();
    renderFlashcardsDueToday();
    renderTodayPlan();
    renderRecoveryPlanStatus();
    renderRecoveryHistory();
    renderDashboardQuestionBank();
    renderMemoryBoosterSession();
}

function getDateKeyUTC(value) {
    const date = value instanceof Date ? new Date(value) : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

function getConsecutiveDayStreak(dayKeySet, now = new Date()) {
    let streak = 0;
    const cursor = new Date(now);
    cursor.setHours(0, 0, 0, 0);

    while (true) {
        const key = getDateKeyUTC(cursor);
        if (!dayKeySet.has(key)) break;
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
}

function getConsecutiveFocusDayStreak(focusMinutesByDay, minMinutes, maxMinutes = Infinity, now = new Date()) {
    let streak = 0;
    const cursor = new Date(now);
    cursor.setHours(0, 0, 0, 0);

    while (true) {
        const key = getDateKeyUTC(cursor);
        const minutes = Number(focusMinutesByDay[key] || 0);
        if (minutes < minMinutes || minutes > maxMinutes) break;
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
}

function getConsistencyRewardData(now = new Date()) {
    const windowDays = 14;
    const windowStart = new Date(now);
    windowStart.setHours(0, 0, 0, 0);
    windowStart.setDate(windowStart.getDate() - (windowDays - 1));
    const windowStartKey = getDateKeyUTC(windowStart);

    const activeDays = new Set();
    const focusMinutesByDay = {};

    (pomodoroSessions || [])
        .filter(session => String((session && session.type) || "") === "Focus")
        .forEach((session) => {
            const key = getDateKeyUTC(session.date);
            if (!key || key < windowStartKey) return;
            activeDays.add(key);
            focusMinutesByDay[key] = (focusMinutesByDay[key] || 0) + (Number(session.minutes) || 0);
        });

    (tasks || [])
        .filter(task => task && task.done && task.doneAt)
        .forEach((task) => {
            const key = getDateKeyUTC(task.doneAt);
            if (!key || key < windowStartKey) return;
            activeDays.add(key);
        });

    const activeDayCount = activeDays.size;
    const consistencyStreak = getConsecutiveDayStreak(activeDays, now);
    const sustainableDayCount = Object.values(focusMinutesByDay)
        .filter(minutes => minutes >= 20 && minutes <= 120)
        .length;
    const overloadDayCount = Object.values(focusMinutesByDay)
        .filter(minutes => minutes > 180)
        .length;

    const activeDaysPoints = Math.min(56, activeDayCount * 4);
    const streakPoints = Math.min(24, consistencyStreak * 4);
    const sustainablePoints = Math.min(20, sustainableDayCount * 2);
    const overloadPenalty = Math.min(20, overloadDayCount * 5);
    const focusStreak = getConsecutiveFocusDayStreak(focusMinutesByDay, 20, Infinity, now);
    const balancedFocusStreak = getConsecutiveFocusDayStreak(focusMinutesByDay, 20, 120, now);
    const recent7Keys = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        return getDateKeyUTC(d);
    });
    const recent7OverloadDays = recent7Keys.filter(key => Number(focusMinutesByDay[key] || 0) > 180).length;
    const recent7ActiveFocusDays = recent7Keys.filter(key => Number(focusMinutesByDay[key] || 0) >= 20).length;

    const challenges = [
        {
            id: "focus-3",
            name: "3-Day Focus Streak",
            achieved: focusStreak >= 3,
            progress: `${Math.min(focusStreak, 3)}/3 days`,
            bonus: 8
        },
        {
            id: "focus-5",
            name: "5-Day Focus Streak",
            achieved: focusStreak >= 5,
            progress: `${Math.min(focusStreak, 5)}/5 days`,
            bonus: 12
        },
        {
            id: "balanced-7",
            name: "7-Day Balanced Streak (20-120 min)",
            achieved: balancedFocusStreak >= 7,
            progress: `${Math.min(balancedFocusStreak, 7)}/7 days`,
            bonus: 20
        },
        {
            id: "no-overload-7",
            name: "No Overload Week",
            achieved: recent7OverloadDays === 0 && recent7ActiveFocusDays >= 4,
            progress: `${recent7ActiveFocusDays}/4 active | overload days ${recent7OverloadDays}`,
            bonus: 10
        }
    ];
    const challengeBonus = challenges
        .filter(item => item.achieved)
        .reduce((sum, item) => sum + item.bonus, 0);

    const rawScore = activeDaysPoints + streakPoints + sustainablePoints - overloadPenalty + challengeBonus;
    const points = Math.max(0, Math.min(140, Math.round(rawScore)));

    let level = "Starter";
    if (points >= 110) level = "Streak Legend";
    else if (points >= 85) level = "Consistency Champion";
    else if (points >= 60) level = "Rhythm Builder";
    else if (points >= 40) level = "Habit Maker";

    return {
        points,
        level,
        activeDayCount,
        consistencyStreak,
        sustainableDayCount,
        overloadDayCount,
        activeDaysPoints,
        streakPoints,
        sustainablePoints,
        overloadPenalty,
        challengeBonus,
        challenges
    };
}

function renderConsistencyRewards() {
    const pointsEl = document.getElementById('consistencyPoints');
    const levelEl = document.getElementById('consistencyLevel');
    const breakdownEl = document.getElementById('consistencyBreakdownList');
    const challengeListEl = document.getElementById('consistencyChallengeList');
    if (!pointsEl || !levelEl || !breakdownEl || !challengeListEl) return;

    const data = getConsistencyRewardData();
    pointsEl.textContent = data.points;
    levelEl.textContent = `Level: ${data.level}`;

    breakdownEl.innerHTML = `
        <li>Active days (last 14): ${data.activeDayCount} (+${data.activeDaysPoints})</li>
        <li>Current consistency streak: ${data.consistencyStreak} day${data.consistencyStreak === 1 ? '' : 's'} (+${data.streakPoints})</li>
        <li>Balanced focus days (20-120 min): ${data.sustainableDayCount} (+${data.sustainablePoints})</li>
        <li>Overload days (&gt;180 min): ${data.overloadDayCount} (-${data.overloadPenalty})</li>
        <li>Challenge bonus: +${data.challengeBonus}</li>
    `;

    challengeListEl.innerHTML = data.challenges.map(challenge => `
        <li class="challenge-item ${challenge.achieved ? 'done' : 'pending'}">
            ${challenge.achieved ? 'Completed' : 'In progress'}: ${challenge.name}
            <span>(${challenge.progress}${challenge.achieved ? ` | +${challenge.bonus}` : ''})</span>
        </li>
    `).join('');
}

function renderMicroWinStats() {
    const pointsEl = document.getElementById('microWinPoints');
    const streakEl = document.getElementById('microWinStreak');
    const bestEl = document.getElementById('microWinBest');
    const historyListEl = document.getElementById('microWinHistoryList');
    const badgeListEl = document.getElementById('microWinBadgeList');
    if (!pointsEl || !streakEl || !bestEl || !historyListEl || !badgeListEl) return;

    pointsEl.textContent = String(Math.max(0, Number(microWinStats.points) || 0));
    streakEl.textContent = `No-distraction streak: ${Math.max(0, Number(microWinStats.noDistractionStreak) || 0)}`;
    bestEl.textContent = `Best no-distraction streak: ${Math.max(0, Number(microWinStats.bestNoDistractionStreak) || 0)}`;

    const history = Array.isArray(microWinStats.history) ? microWinStats.history.slice(0, 6) : [];
    if (history.length === 0) {
        historyListEl.innerHTML = '<li class="empty-state">Start focus sessions on time and finish clean Pomodoros to earn points.</li>';
        return;
    }

    historyListEl.innerHTML = history.map(item => `
        <li>
            <strong>${item.reason}</strong>
            <span>+${item.points} pts</span>
        </li>
    `).join('');

    const weeklyBadges = getMicroWinWeeklyBadges();
    badgeListEl.innerHTML = weeklyBadges.map(badge => `
        <li class="${badge.achieved ? '' : 'empty-state'}">
            <strong>${badge.achieved ? 'Completed' : 'In progress'}: ${badge.name}</strong>
            <span>${badge.progress}${badge.achieved ? ` | +${badge.bonus} pts` : ''}</span>
        </li>
    `).join('');
}

function getTodayDateKey() {
    return new Date().toISOString().split('T')[0];
}

function getCurrentPeerChallengeParticipant(challenge) {
    const user = getCurrentUser();
    if (!user || !challenge || !Array.isArray(challenge.participants)) return null;
    const email = normalizeEmail(user.email || "");
    return challenge.participants.find(p => normalizeEmail(p && p.email || "") === email) || null;
}

function randomLocalChallengeCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < 8; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

function addDaysISO(dateKey, dayCount) {
    const base = new Date(`${String(dateKey || "").slice(0, 10)}T00:00:00.000Z`);
    if (Number.isNaN(base.getTime())) return String(dateKey || "").slice(0, 10);
    base.setUTCDate(base.getUTCDate() + Number(dayCount || 0));
    return base.toISOString().slice(0, 10);
}

function normalizeLocalParticipant(value) {
    const participant = value && typeof value === "object" ? value : {};
    const checkins = Array.isArray(participant.checkins)
        ? [...new Set(participant.checkins.map(d => String(d || "").slice(0, 10)).filter(Boolean))].sort()
        : [];
    return {
        email: normalizeEmail(participant.email || ""),
        name: String(participant.name || "").trim() || "Student",
        role: ["student", "teacher", "admin"].includes(participant.role) ? participant.role : "student",
        joinedAt: participant.joinedAt || new Date().toISOString(),
        checkins,
        currentStreak: Math.max(0, Number(participant.currentStreak) || 0),
        bestStreak: Math.max(0, Number(participant.bestStreak) || 0),
        lastCheckinDate: String(participant.lastCheckinDate || "")
    };
}

function normalizeLocalPeerChallenge(value) {
    const challenge = value && typeof value === "object" ? value : {};
    const durationDays = Math.max(1, Math.min(30, Number(challenge.durationDays) || 7));
    const startDate = String(challenge.startDate || getTodayDateKey()).slice(0, 10);
    const endDate = String(challenge.endDate || addDaysISO(startDate, durationDays - 1)).slice(0, 10);
    const participants = Array.isArray(challenge.participants)
        ? challenge.participants.map(normalizeLocalParticipant).filter(p => p.email)
        : [];
    const active = getTodayDateKey() <= endDate;
    return {
        id: String(challenge.id || `local-challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        code: String(challenge.code || randomLocalChallengeCode()).trim().toUpperCase(),
        name: String(challenge.name || "7-Day Streak Challenge").trim() || "7-Day Streak Challenge",
        durationDays,
        startDate,
        endDate,
        createdBy: normalizeEmail(challenge.createdBy || ""),
        createdAt: challenge.createdAt || new Date().toISOString(),
        status: active ? "active" : "completed",
        participants
    };
}

function loadLocalPeerChallenges() {
    try {
        const raw = JSON.parse(localStorage.getItem(LOCAL_PEER_CHALLENGES_KEY) || "[]");
        const list = Array.isArray(raw) ? raw.map(normalizeLocalPeerChallenge) : [];
        return list.slice(0, 500);
    } catch (_) {
        return [];
    }
}

function saveLocalPeerChallenges(list) {
    const safe = Array.isArray(list) ? list.map(normalizeLocalPeerChallenge).slice(0, 500) : [];
    localStorage.setItem(LOCAL_PEER_CHALLENGES_KEY, JSON.stringify(safe));
    peerChallenges = safe;
}

function normalizeLocalStudyGroupMember(value) {
    const member = value && typeof value === "object" ? value : {};
    const checkins = Array.isArray(member.checkins)
        ? [...new Set(member.checkins.map(d => String(d || "").slice(0, 10)).filter(Boolean))].sort()
        : [];
    return {
        email: normalizeEmail(member.email || ""),
        name: String(member.name || "").trim() || "Student",
        role: ["student", "teacher", "admin"].includes(member.role) ? member.role : "student",
        joinedAt: member.joinedAt || new Date().toISOString(),
        checkins,
        currentStreak: Math.max(0, Number(member.currentStreak) || 0),
        bestStreak: Math.max(0, Number(member.bestStreak) || 0),
        lastCheckinDate: String(member.lastCheckinDate || "")
    };
}

function normalizeLocalStudyGroup(value) {
    const group = value && typeof value === "object" ? value : {};
    const durationDays = Math.max(1, Math.min(60, Number(group.durationDays) || 30));
    const startDate = String(group.startDate || getTodayDateKey()).slice(0, 10);
    const endDate = String(group.endDate || addDaysISO(startDate, durationDays - 1)).slice(0, 10);
    const members = Array.isArray(group.members)
        ? group.members.map(normalizeLocalStudyGroupMember).filter(m => m.email)
        : [];
    const goals = Array.isArray(group.goals)
        ? group.goals.map(goal => ({
            id: String(goal && goal.id || `group-goal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
            text: String(goal && goal.text || "").trim(),
            createdBy: normalizeEmail(goal && goal.createdBy || ""),
            createdByName: String(goal && goal.createdByName || "").trim() || "Student",
            createdAt: goal && goal.createdAt || new Date().toISOString()
        })).filter(goal => goal.text).slice(0, 200)
        : [];
    const doubts = Array.isArray(group.doubts)
        ? group.doubts.map(doubt => ({
            id: String(doubt && doubt.id || `group-doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
            text: String(doubt && doubt.text || "").trim(),
            subject: String(doubt && doubt.subject || "General").trim() || "General",
            createdBy: normalizeEmail(doubt && doubt.createdBy || ""),
            createdByName: String(doubt && doubt.createdByName || "").trim() || "Student",
            createdAt: doubt && doubt.createdAt || new Date().toISOString()
        })).filter(doubt => doubt.text).slice(0, 500)
        : [];
    const active = getTodayDateKey() <= endDate;
    return {
        id: String(group.id || `local-room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        code: String(group.code || randomLocalChallengeCode()).trim().toUpperCase(),
        name: String(group.name || "Study Room").trim() || "Study Room",
        durationDays,
        startDate,
        endDate,
        createdBy: normalizeEmail(group.createdBy || ""),
        createdAt: group.createdAt || new Date().toISOString(),
        status: active ? "active" : "completed",
        members,
        goals,
        doubts
    };
}

function loadLocalStudyGroups() {
    try {
        const raw = JSON.parse(localStorage.getItem(LOCAL_STUDY_GROUPS_KEY) || "[]");
        return Array.isArray(raw) ? raw.map(normalizeLocalStudyGroup).slice(0, 300) : [];
    } catch (_) {
        return [];
    }
}

function saveLocalStudyGroups(groups) {
    const safe = Array.isArray(groups) ? groups.map(normalizeLocalStudyGroup).slice(0, 300) : [];
    localStorage.setItem(LOCAL_STUDY_GROUPS_KEY, JSON.stringify(safe));
    studyGroups = safe;
}

function setPeerChallengeBackendIndicator(state, message) {
    const indicator = document.getElementById('peerChallengeBackendIndicator');
    if (!indicator) return;
    indicator.classList.remove('connected', 'disconnected', 'checking');
    const normalized = ['connected', 'disconnected', 'checking'].includes(state) ? state : 'disconnected';
    indicator.classList.add(normalized);
    indicator.textContent = message || (
        normalized === 'connected'
            ? 'Backend: Connected'
            : normalized === 'checking'
                ? 'Backend: Checking...'
                : 'Backend: Disconnected'
    );
}

function renderPeerChallenges() {
    const statusEl = document.getElementById('peerChallengeStatus');
    const listEl = document.getElementById('peerChallengeList');
    if (!statusEl || !listEl) return;

    if (!backendAdminToken) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: Local mode');
        if (!Array.isArray(peerChallenges) || peerChallenges.length === 0) {
            peerChallenges = loadLocalPeerChallenges();
        }
    }
    if (backendAdminToken) {
        setPeerChallengeBackendIndicator('connected', 'Backend: Token active');
    }

    const active = (peerChallenges || []).filter(ch => ch && ch.status !== 'completed');
    if (active.length === 0) {
        statusEl.textContent = backendAdminToken
            ? 'Create or join a private invite-code challenge.'
            : 'Local mode active. Create and join challenges on this device.';
        listEl.innerHTML = '<li class="empty-state">No active peer challenges yet.</li>';
        return;
    }

    statusEl.textContent = backendAdminToken
        ? `${active.length} active challenge(s). Invite your friends with the code.`
        : `${active.length} active local challenge(s).`;
    listEl.innerHTML = active.map(challenge => {
        const participant = getCurrentPeerChallengeParticipant(challenge);
        const checkins = Array.isArray(participant && participant.checkins) ? participant.checkins : [];
        const checkedToday = checkins.includes(getTodayDateKey());
        const currentStreak = Number(participant && participant.currentStreak || 0);
        const bestStreak = Number(participant && participant.bestStreak || 0);
        const memberCount = Array.isArray(challenge.participants) ? challenge.participants.length : 0;
        return `
            <li>
                <strong>${escapeHtml(challenge.name || '7-Day Streak Challenge')}</strong>
                <span>Code: ${escapeHtml(challenge.code || '-')} | Members: ${memberCount}</span>
                <div class="assignment-meta">
                    <span>My streak: ${currentStreak} | Best: ${bestStreak}</span>
                    <span class="task-due">${escapeHtml(challenge.startDate || '')} to ${escapeHtml(challenge.endDate || '')}</span>
                </div>
                <div class="task-options">
                    <button class="action-btn" onclick="checkInPeerChallenge('${encodeURIComponent(challenge.id || '')}')" ${checkedToday ? 'disabled' : ''}>
                        <i class="fas fa-check"></i> ${checkedToday ? 'Checked In Today' : 'Check In Today'}
                    </button>
                </div>
            </li>
        `;
    }).join('');
}

async function loadPeerChallengesFromServer() {
    if (!backendAdminToken) {
        peerChallenges = loadLocalPeerChallenges();
        renderPeerChallenges();
        return;
    }
    try {
        setPeerChallengeBackendIndicator('checking', 'Backend: Syncing...');
        const response = await fetch(`${API_BASE_URL}/api/peer-challenges`, {
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            }
        });
        if (!response.ok) {
            if (response.status === 401) {
                backendAdminToken = "";
                localStorage.removeItem(BACKEND_AUTH_TOKEN_KEY);
                setPeerChallengeBackendIndicator('disconnected', 'Backend: Session expired');
                renderPeerChallenges();
                return;
            }
            setPeerChallengeBackendIndicator('disconnected', 'Backend: Sync failed');
            return;
        }
        const data = await response.json().catch(() => []);
        peerChallenges = Array.isArray(data) ? data : [];
        setPeerChallengeBackendIndicator('connected', 'Backend: Connected');
        renderPeerChallenges();
    } catch (_) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: Offline');
    }
}

async function reconnectPeerChallengeSync() {
    setPeerChallengeBackendIndicator('checking', 'Backend: Checking...');
    if (!navigator.onLine) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: No internet');
        alert('No internet connection. Please reconnect and try again.');
        return;
    }

    if (backendAdminToken) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...getBackendAuthHeaders()
                }
            });
            if (response.ok) {
                await loadPeerChallengesFromServer();
                return;
            }
            backendAdminToken = "";
            localStorage.removeItem(BACKEND_AUTH_TOKEN_KEY);
        } catch (_) {}
    }

    const user = getCurrentUser();
    if (!user || !user.email) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: Disconnected');
        alert('Login to your account first, then press Reconnect.');
        return;
    }

    const password = prompt('Enter your login password to reconnect invite-code challenges:');
    if (!password) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: Disconnected');
        return;
    }

    const ok = await syncLoginWithBackend(
        normalizeEmail(user.email),
        password,
        user.name || 'Student',
        user.role || 'student'
    );

    if (!ok) {
        setPeerChallengeBackendIndicator('disconnected', 'Backend: Login failed');
        const reason = backendLastAuthError || 'Unknown backend error';
        alert(`Reconnect failed.\n\nReason: ${reason}\n\nCheck backend server and password, then try again.`);
        return;
    }

    await loadPeerChallengesFromServer();
}

async function createPeerChallenge() {
    const input = document.getElementById('peerChallengeNameInput');
    const name = String(input && input.value ? input.value : '').trim() || '7-Day Streak Challenge';
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const role = user && user.role ? user.role : 'student';
        const challenge = normalizeLocalPeerChallenge({
            id: `local-challenge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            code: randomLocalChallengeCode(),
            name,
            durationDays: 7,
            startDate: getTodayDateKey(),
            endDate: addDaysISO(getTodayDateKey(), 6),
            createdBy: email,
            createdAt: new Date().toISOString(),
            participants: [{
                email,
                name: user && user.name ? user.name : 'Student',
                role,
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }]
        });
        const all = loadLocalPeerChallenges();
        all.unshift(challenge);
        saveLocalPeerChallenges(all);
        if (input) input.value = '';
        renderPeerChallenges();
        addActivity('user-group', 'Peer Challenge Created (Local)', `${name} | Code ${challenge.code}`);
        alert(`Challenge created (local mode). Invite code: ${challenge.code}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/peer-challenges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ name, durationDays: 7 })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to create challenge');
        if (input) input.value = '';
        await loadPeerChallengesFromServer();
        addActivity('user-group', 'Peer Challenge Created', `${name} | Code ${data.code || ''}`);
        alert(`Challenge created. Invite code: ${data.code || ''}`);
    } catch (err) {
        alert(`Create failed: ${err.message}`);
    }
}

async function joinPeerChallenge() {
    const input = document.getElementById('peerChallengeJoinCodeInput');
    const code = String(input && input.value ? input.value : '').trim().toUpperCase();
    if (!code) {
        alert('Enter invite code first.');
        return;
    }
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const all = loadLocalPeerChallenges();
        const idx = all.findIndex(ch => String(ch && ch.code || "").toUpperCase() === code);
        if (idx < 0) {
            alert('Invite code not found in local mode.');
            return;
        }
        const challenge = normalizeLocalPeerChallenge(all[idx]);
        const exists = Array.isArray(challenge.participants)
            && challenge.participants.some(p => normalizeEmail(p && p.email || "") === email);
        if (!exists) {
            challenge.participants.push(normalizeLocalParticipant({
                email,
                name: user && user.name ? user.name : "Student",
                role: user && user.role ? user.role : "student",
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }));
        }
        all[idx] = normalizeLocalPeerChallenge(challenge);
        saveLocalPeerChallenges(all);
        if (input) input.value = '';
        renderPeerChallenges();
        addActivity('link', 'Peer Challenge Joined (Local)', `${challenge.name || 'Challenge'} | Code ${code}`);
        alert(`Joined (local mode): ${challenge.name || 'Challenge'}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/peer-challenges/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ code })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to join challenge');
        if (input) input.value = '';
        await loadPeerChallengesFromServer();
        addActivity('link', 'Peer Challenge Joined', `${data.name || 'Challenge'} | Code ${code}`);
        alert(`Joined: ${data.name || 'Challenge'}`);
    } catch (err) {
        alert(`Join failed: ${err.message}`);
    }
}

async function checkInPeerChallenge(encodedId) {
    const id = decodeURIComponent(String(encodedId || ''));
    if (!id) return;
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) return;
        const today = getTodayDateKey();
        const all = loadLocalPeerChallenges();
        const idx = all.findIndex(ch => String(ch && ch.id || "") === id);
        if (idx < 0) {
            alert('Challenge not found.');
            return;
        }
        const challenge = normalizeLocalPeerChallenge(all[idx]);
        if (today > challenge.endDate) {
            challenge.status = 'completed';
            all[idx] = normalizeLocalPeerChallenge(challenge);
            saveLocalPeerChallenges(all);
            renderPeerChallenges();
            alert('Challenge has ended.');
            return;
        }
        const pIdx = (challenge.participants || []).findIndex(p => normalizeEmail(p && p.email || "") === email);
        if (pIdx < 0) {
            alert('Join this challenge first.');
            return;
        }
        const participant = normalizeLocalParticipant(challenge.participants[pIdx]);
        if (participant.checkins.includes(today)) {
            renderPeerChallenges();
            return;
        }
        const previousDate = participant.lastCheckinDate || "";
        if (!previousDate) participant.currentStreak = 1;
        else {
            const prev = new Date(`${previousDate}T00:00:00.000Z`).getTime();
            const curr = new Date(`${today}T00:00:00.000Z`).getTime();
            const gapDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
            participant.currentStreak = gapDays === 1 ? participant.currentStreak + 1 : 1;
        }
        participant.bestStreak = Math.max(participant.bestStreak, participant.currentStreak);
        participant.lastCheckinDate = today;
        participant.checkins = [...participant.checkins, today].sort();
        challenge.participants[pIdx] = participant;
        all[idx] = normalizeLocalPeerChallenge(challenge);
        saveLocalPeerChallenges(all);
        renderPeerChallenges();
        addActivity('check', 'Peer Challenge Check-In (Local)', `${challenge.name || 'Challenge'} | Streak ${participant.currentStreak}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/peer-challenges/${encodeURIComponent(id)}/checkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to check in');
        await loadPeerChallengesFromServer();
        const participant = getCurrentPeerChallengeParticipant(data);
        const streak = Number(participant && participant.currentStreak || 0);
        addActivity('check', 'Peer Challenge Check-In', `${data.name || 'Challenge'} | Streak ${streak}`);
    } catch (err) {
        alert(`Check-in failed: ${err.message}`);
    }
}

function renderStudyGroupRoomSelect() {
    const select = document.getElementById('studyGroupRoomSelect');
    if (!select) return;
    const options = (studyGroups || []).map(room => `<option value="${escapeHtmlAttribute(room.id || '')}">${escapeHtml(room.name || 'Study Room')} (${escapeHtml(room.code || '-')})</option>`);
    const current = select.value;
    select.innerHTML = `<option value="">Select room</option>${options.join('')}`;
    if ((studyGroups || []).some(room => room.id === current)) select.value = current;
}

function getCurrentStudyGroupRoom() {
    const select = document.getElementById('studyGroupRoomSelect');
    const selectedId = String(select && select.value ? select.value : '').trim();
    if (!selectedId) return null;
    return (studyGroups || []).find(room => String(room.id || '') === selectedId) || null;
}

function getCurrentStudyGroupMember(room) {
    const user = getCurrentUser();
    if (!user || !room || !Array.isArray(room.members)) return null;
    const email = normalizeEmail(user.email || '');
    return room.members.find(member => normalizeEmail(member && member.email || '') === email) || null;
}

function renderStudyGroupRooms() {
    const statusEl = document.getElementById('studyGroupStatus');
    const listEl = document.getElementById('studyGroupList');
    if (!statusEl || !listEl) return;

    renderStudyGroupRoomSelect();
    if (!backendAdminToken) {
        if (!Array.isArray(studyGroups) || studyGroups.length === 0) {
            studyGroups = loadLocalStudyGroups();
            renderStudyGroupRoomSelect();
        }
    }

    const activeRooms = (studyGroups || []).filter(room => room && room.status !== 'completed');
    if (activeRooms.length === 0) {
        statusEl.textContent = backendAdminToken
            ? 'Create or join a private room to share goals and doubts.'
            : 'Local mode active. Create or join a room on this device.';
        listEl.innerHTML = '<li class="empty-state">No study rooms joined yet.</li>';
        return;
    }

    statusEl.textContent = backendAdminToken
        ? `${activeRooms.length} room(s) active. Share goals, track streaks, and exchange doubts.`
        : `${activeRooms.length} local room(s) active.`;
    listEl.innerHTML = activeRooms.map(room => {
        const members = Array.isArray(room.members) ? room.members : [];
        const goalsList = Array.isArray(room.goals) ? room.goals.slice(0, 3) : [];
        const doubtsList = Array.isArray(room.doubts) ? room.doubts.slice(0, 3) : [];
        const streakBoard = [...members]
            .sort((a, b) => Number(b.currentStreak || 0) - Number(a.currentStreak || 0))
            .slice(0, 3)
            .map(member => `${member.name || 'Student'} (${Number(member.currentStreak || 0)})`)
            .join(', ') || 'No streak check-ins yet';
        const me = getCurrentStudyGroupMember(room);
        const checkedToday = Boolean(me && Array.isArray(me.checkins) && me.checkins.includes(getTodayDateKey()));
        return `
            <li>
                <strong>${escapeHtml(room.name || 'Study Room')}</strong>
                <span>Code: ${escapeHtml(room.code || '-')} | Members: ${members.length}</span>
                <div class="assignment-meta">
                    <span>Streak board: ${escapeHtml(streakBoard)}</span>
                    <span class="task-due">${escapeHtml(room.startDate || '')} to ${escapeHtml(room.endDate || '')}</span>
                </div>
                <p><strong>Shared goals:</strong> ${goalsList.length > 0 ? goalsList.map(goal => escapeHtml(goal.text || '')).join(' | ') : 'No goals yet'}</p>
                <p><strong>Doubt exchange:</strong> ${doubtsList.length > 0 ? doubtsList.map(doubt => `${escapeHtml(doubt.subject || 'General')}: ${escapeHtml(doubt.text || '')}`).join(' | ') : 'No doubts yet'}</p>
                <div class="task-options">
                    <button class="action-btn" onclick="checkInStudyGroupRoom('${encodeURIComponent(room.id || '')}')" ${checkedToday ? 'disabled' : ''}>
                        <i class="fas fa-fire"></i> ${checkedToday ? 'Checked In Today' : 'Check In'}
                    </button>
                </div>
            </li>
        `;
    }).join('');
}

async function loadStudyGroupsFromServer() {
    if (!backendAdminToken) {
        studyGroups = loadLocalStudyGroups();
        renderStudyGroupRooms();
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups`, {
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            }
        });
        if (!response.ok) return;
        const data = await response.json().catch(() => []);
        studyGroups = Array.isArray(data) ? data : [];
        renderStudyGroupRooms();
    } catch (_) {}
}

async function createStudyGroupRoom() {
    const input = document.getElementById('studyGroupNameInput');
    const name = String(input && input.value ? input.value : '').trim() || 'Study Room';
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const room = normalizeLocalStudyGroup({
            id: `local-room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            code: randomLocalChallengeCode(),
            name,
            durationDays: 30,
            startDate: getTodayDateKey(),
            endDate: addDaysISO(getTodayDateKey(), 29),
            createdBy: email,
            createdAt: new Date().toISOString(),
            members: [{
                email,
                name: user && user.name ? user.name : "Student",
                role: user && user.role ? user.role : "student",
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }],
            goals: [],
            doubts: []
        });
        const groups = loadLocalStudyGroups();
        groups.unshift(room);
        saveLocalStudyGroups(groups);
        if (input) input.value = '';
        renderStudyGroupRooms();
        addActivity('people-roof', 'Study Room Created (Local)', `${room.name} | Code ${room.code}`);
        alert(`Room created (local mode). Invite code: ${room.code}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ name, durationDays: 30 })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to create study room');
        if (input) input.value = '';
        await loadStudyGroupsFromServer();
        addActivity('people-roof', 'Study Room Created', `${name} | Code ${data.code || ''}`);
        alert(`Room created. Invite code: ${data.code || ''}`);
    } catch (err) {
        alert(`Create failed: ${err.message}`);
    }
}

async function joinStudyGroupRoom() {
    const input = document.getElementById('studyGroupJoinCodeInput');
    const code = String(input && input.value ? input.value : '').trim().toUpperCase();
    if (!code) {
        alert('Enter invite code first.');
        return;
    }
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const groups = loadLocalStudyGroups();
        const idx = groups.findIndex(room => String(room && room.code || "").toUpperCase() === code);
        if (idx < 0) {
            alert('Room not found for this invite code (local mode).');
            return;
        }
        const room = normalizeLocalStudyGroup(groups[idx]);
        const exists = Array.isArray(room.members)
            && room.members.some(member => normalizeEmail(member && member.email || "") === email);
        if (!exists) {
            room.members.push(normalizeLocalStudyGroupMember({
                email,
                name: user && user.name ? user.name : "Student",
                role: user && user.role ? user.role : "student",
                joinedAt: new Date().toISOString(),
                checkins: [],
                currentStreak: 0,
                bestStreak: 0,
                lastCheckinDate: ""
            }));
        }
        groups[idx] = normalizeLocalStudyGroup(room);
        saveLocalStudyGroups(groups);
        if (input) input.value = '';
        renderStudyGroupRooms();
        addActivity('link', 'Study Room Joined (Local)', `${room.name} | Code ${code}`);
        alert(`Joined room (local mode): ${room.name}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ code })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to join study room');
        if (input) input.value = '';
        await loadStudyGroupsFromServer();
        addActivity('link', 'Study Room Joined', `${data.name || 'Study Room'} | Code ${code}`);
        alert(`Joined: ${data.name || 'Study Room'}`);
    } catch (err) {
        alert(`Join failed: ${err.message}`);
    }
}

async function checkInStudyGroupRoom(encodedId = '') {
    const fromArg = decodeURIComponent(String(encodedId || ''));
    const room = fromArg
        ? (studyGroups || []).find(item => String(item.id || '') === fromArg)
        : getCurrentStudyGroupRoom();
    const id = String(room && room.id ? room.id : '').trim();
    if (!id) return;
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) return;
        const today = getTodayDateKey();
        const groups = loadLocalStudyGroups();
        const idx = groups.findIndex(item => String(item && item.id || "") === id);
        if (idx < 0) return;

        const localRoom = normalizeLocalStudyGroup(groups[idx]);
        if (today > localRoom.endDate) {
            localRoom.status = 'completed';
            groups[idx] = normalizeLocalStudyGroup(localRoom);
            saveLocalStudyGroups(groups);
            renderStudyGroupRooms();
            alert('Room has ended.');
            return;
        }

        const mIdx = (localRoom.members || []).findIndex(member => normalizeEmail(member && member.email || "") === email);
        if (mIdx < 0) {
            alert('Join this room first.');
            return;
        }

        const member = normalizeLocalStudyGroupMember(localRoom.members[mIdx]);
        if (!member.checkins.includes(today)) {
            const previousDate = member.lastCheckinDate || "";
            if (!previousDate) member.currentStreak = 1;
            else {
                const prev = new Date(`${previousDate}T00:00:00.000Z`).getTime();
                const curr = new Date(`${today}T00:00:00.000Z`).getTime();
                const gapDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
                member.currentStreak = gapDays === 1 ? member.currentStreak + 1 : 1;
            }
            member.bestStreak = Math.max(member.bestStreak, member.currentStreak);
            member.lastCheckinDate = today;
            member.checkins = [...member.checkins, today].sort();
            localRoom.members[mIdx] = member;
            groups[idx] = normalizeLocalStudyGroup(localRoom);
            saveLocalStudyGroups(groups);
            renderStudyGroupRooms();
            addActivity('fire', 'Study Group Check-In (Local)', `${localRoom.name} | Streak ${member.currentStreak}`);
        }
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups/${encodeURIComponent(id)}/checkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to check in');
        await loadStudyGroupsFromServer();
        const me = getCurrentStudyGroupMember(data);
        const streak = Number(me && me.currentStreak || 0);
        addActivity('fire', 'Study Group Check-In', `${data.name || 'Study Room'} | Streak ${streak}`);
    } catch (err) {
        alert(`Check-in failed: ${err.message}`);
    }
}

async function postStudyGroupGoal() {
    const room = getCurrentStudyGroupRoom();
    if (!room) {
        alert('Select a room first.');
        return;
    }
    const input = document.getElementById('studyGroupGoalInput');
    const text = String(input && input.value ? input.value : '').trim();
    if (!text) {
        alert('Enter a goal first.');
        return;
    }
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const groups = loadLocalStudyGroups();
        const idx = groups.findIndex(item => String(item && item.id || "") === String(room.id || ""));
        if (idx < 0) {
            alert('Room not found.');
            return;
        }
        const localRoom = normalizeLocalStudyGroup(groups[idx]);
        const isMember = Array.isArray(localRoom.members)
            && localRoom.members.some(member => normalizeEmail(member && member.email || "") === email);
        if (!isMember) {
            alert('Join this room first.');
            return;
        }
        localRoom.goals.unshift({
            id: `group-goal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text,
            createdBy: email,
            createdByName: user && user.name ? user.name : "Student",
            createdAt: new Date().toISOString()
        });
        localRoom.goals = localRoom.goals.slice(0, 200);
        groups[idx] = normalizeLocalStudyGroup(localRoom);
        saveLocalStudyGroups(groups);
        if (input) input.value = '';
        renderStudyGroupRooms();
        addActivity('bullseye', 'Study Group Goal Shared (Local)', `${localRoom.name}: ${text}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups/${encodeURIComponent(room.id)}/goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ text })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to post goal');
        if (input) input.value = '';
        await loadStudyGroupsFromServer();
        addActivity('bullseye', 'Study Group Goal Shared', `${data.name || room.name}: ${text}`);
    } catch (err) {
        alert(`Share goal failed: ${err.message}`);
    }
}

async function postStudyGroupDoubt() {
    const room = getCurrentStudyGroupRoom();
    if (!room) {
        alert('Select a room first.');
        return;
    }
    const doubtInput = document.getElementById('studyGroupDoubtInput');
    const subjectInput = document.getElementById('studyGroupDoubtSubject');
    const text = String(doubtInput && doubtInput.value ? doubtInput.value : '').trim();
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'General').trim() || 'General';
    if (!text) {
        alert('Enter a doubt first.');
        return;
    }
    if (!backendAdminToken) {
        const user = getCurrentUser();
        const email = normalizeEmail(user && user.email || "");
        if (!email) {
            alert('Please login first.');
            return;
        }
        const groups = loadLocalStudyGroups();
        const idx = groups.findIndex(item => String(item && item.id || "") === String(room.id || ""));
        if (idx < 0) {
            alert('Room not found.');
            return;
        }
        const localRoom = normalizeLocalStudyGroup(groups[idx]);
        const isMember = Array.isArray(localRoom.members)
            && localRoom.members.some(member => normalizeEmail(member && member.email || "") === email);
        if (!isMember) {
            alert('Join this room first.');
            return;
        }
        localRoom.doubts.unshift({
            id: `group-doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text,
            subject,
            createdBy: email,
            createdByName: user && user.name ? user.name : "Student",
            createdAt: new Date().toISOString()
        });
        localRoom.doubts = localRoom.doubts.slice(0, 500);
        groups[idx] = normalizeLocalStudyGroup(localRoom);
        saveLocalStudyGroups(groups);
        if (doubtInput) doubtInput.value = '';
        renderStudyGroupRooms();
        addActivity('circle-question', 'Study Group Doubt Shared (Local)', `${localRoom.name}: ${subject}`);
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/study-groups/${encodeURIComponent(room.id)}/doubts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getBackendAuthHeaders()
            },
            body: JSON.stringify({ text, subject })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || 'Unable to post doubt');
        if (doubtInput) doubtInput.value = '';
        await loadStudyGroupsFromServer();
        addActivity('circle-question', 'Study Group Doubt Shared', `${data.name || room.name}: ${subject}`);
    } catch (err) {
        alert(`Post doubt failed: ${err.message}`);
    }
}

function awardMicroWin(points, reason, skipActivity = false) {
    const safePoints = Math.max(0, Math.round(Number(points) || 0));
    const safeReason = String(reason || '').trim();
    if (!safePoints || !safeReason) return;

    microWinStats.points = Math.max(0, Number(microWinStats.points) || 0) + safePoints;
    if (!Array.isArray(microWinStats.history)) microWinStats.history = [];
    microWinStats.history.unshift({
        reason: safeReason,
        points: safePoints,
        at: new Date().toISOString()
    });
    microWinStats.history = microWinStats.history.slice(0, 50);
    saveState({ microWinStats });
    renderMicroWinStats();
    if (!skipActivity) {
        addActivity('seedling', 'Micro-Win Earned', `${safeReason} (+${safePoints})`);
    }
}

function getMicroWinWeeklyBadges(now = new Date()) {
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - 6);

    const history = Array.isArray(microWinStats.history) ? microWinStats.history : [];
    let onTimeStarts = 0;
    let completedPomodoros = 0;
    let cleanStreakWins = 0;
    let totalPoints = 0;

    history.forEach(item => {
        const at = new Date(item.at || '');
        if (Number.isNaN(at.getTime()) || at < weekStart) return;
        const reason = String(item.reason || '').toLowerCase();
        const pts = Number(item.points) || 0;
        totalPoints += pts;
        if (reason.includes('started focus session on time')) onTimeStarts += 1;
        if (reason.includes('finished pomodoro focus session')) completedPomodoros += 1;
        if (reason.includes('no-distraction focus streak')) cleanStreakWins += 1;
    });

    return [
        {
            name: 'Starter Spark',
            achieved: onTimeStarts >= 3,
            progress: `${Math.min(onTimeStarts, 3)}/3 on-time starts`,
            bonus: 5
        },
        {
            name: 'Pomodoro Finisher',
            achieved: completedPomodoros >= 5,
            progress: `${Math.min(completedPomodoros, 5)}/5 completed focus sessions`,
            bonus: 8
        },
        {
            name: 'No-Distraction Rookie',
            achieved: cleanStreakWins >= 4,
            progress: `${Math.min(cleanStreakWins, 4)}/4 clean streak wins`,
            bonus: 10
        },
        {
            name: 'Habit Momentum',
            achieved: totalPoints >= 40,
            progress: `${Math.min(totalPoints, 40)}/40 weekly micro-win points`,
            bonus: 12
        }
    ];
}

function getFlashcardsDueTodayByDeck(now = new Date()) {
    const byDeck = Object.entries(flashcards).map(([deckName, cards]) => {
        const dueCount = getDueTodayFlashcardIndexes(deckName, now).length;
        return { deckName, dueCount };
    }).filter(item => item.dueCount > 0);

    byDeck.sort((a, b) => b.dueCount - a.dueCount);
    return byDeck;
}

function startFlashcardReviewFromDashboard(encodedDeckName) {
    const deckName = decodeURIComponent(String(encodedDeckName || ""));
    if (!deckName || !flashcards[deckName] || flashcards[deckName].length === 0) {
        alert('Selected deck is unavailable.');
        return;
    }
    const dueTodayIndexes = getDueTodayFlashcardIndexes(deckName);
    if (dueTodayIndexes.length === 0) {
        alert('No flashcards due today in this deck.');
        return;
    }

    navigateTo('flashcards');
    selectDeck(deckName);
    startStudy("due-today");
}

function renderFlashcardsDueToday() {
    const list = document.getElementById('flashcardsDueTodayList');
    if (!list) return;

    const dueDecks = getFlashcardsDueTodayByDeck();
    if (dueDecks.length === 0) {
        list.innerHTML = '<li class="empty-state">No flashcards due today</li>';
        return;
    }

    list.innerHTML = dueDecks.map(item => `
        <li>
            <strong>${item.deckName}</strong>
            <span>${item.dueCount} due today</span>
            <button class="action-btn" onclick="startFlashcardReviewFromDashboard('${encodeURIComponent(item.deckName)}')">
                Review
            </button>
        </li>
    `).join('');
}

function getDashboardQuestionBankSample(sampleSize = 8, subject = "Any") {
    if (!Array.isArray(quizQuestionBank) || quizQuestionBank.length === 0) return [];
    const pool = subject === "Any"
        ? quizQuestionBank
        : quizQuestionBank.filter(q => q.subject === subject);
    if (pool.length === 0) return [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(sampleSize, shuffled.length));
}

function renderDashboardQuestionBank() {
    const list = document.getElementById('dashboardQuestionBankList');
    const subjectSelect = document.getElementById('dashboardQuestionSubject');
    if (!list) return;
    if (subjectSelect) {
        dashboardQuestionBankSubject = subjectSelect.value || dashboardQuestionBankSubject || "Any";
    }

    const sample = getDashboardQuestionBankSample(10, dashboardQuestionBankSubject);
    if (sample.length === 0) {
        list.innerHTML = '<li class="empty-state">No questions available for selected subject</li>';
        return;
    }

    list.innerHTML = sample.map((q, idx) => `
        <li>
            <strong>Q${idx + 1}. ${q.question}</strong>
            <span>${q.subject}</span>
        </li>
    `).join('');
}

function refreshDashboardQuestionBank() {
    const subjectSelect = document.getElementById('dashboardQuestionSubject');
    if (subjectSelect) {
        dashboardQuestionBankSubject = subjectSelect.value || "Any";
    }
    renderDashboardQuestionBank();
}

function shuffleArray(list) {
    return [...list].sort(() => Math.random() - 0.5);
}

function normalizeMemoryBoosterSubject(value) {
    return String(value || "").trim() || "General";
}

function getMemoryBoosterPool() {
    const pool = [];

    if (Array.isArray(notes)) {
        notes.forEach((note) => {
            const subject = normalizeMemoryBoosterSubject(note.subject);
            const title = String(note.title || "").trim() || `${subject} Note`;
            const rawContent = String(note.content || "").trim();
            if (!rawContent) return;
            const snippets = rawContent
                .split(/\r?\n|[.?!]\s+/)
                .map(line => line.replace(/^[-*]\s*/, "").trim())
                .filter(line => line.length >= 10 && line.length <= 140)
                .slice(0, 4);
            snippets.forEach((snippet) => {
                pool.push({
                    subject,
                    prompt: `From your note "${title}", which point is included?`,
                    answer: snippet
                });
            });
        });
    }

    Object.entries(flashcards || {}).forEach(([deckName, cards]) => {
        (cards || []).forEach((card) => {
            const front = String(card && card.front ? card.front : "").trim();
            const back = String(card && card.back ? card.back : "").trim();
            if (!front || !back) return;
            pool.push({
                subject: normalizeMemoryBoosterSubject(deckName),
                prompt: `In your "${deckName}" flashcards, what is the best answer for: "${front}"?`,
                answer: back
            });
        });
    });

    (chapterTracker || []).forEach((item) => {
        const chapter = String(item.chapter || "").trim();
        if (!chapter) return;
        const status = String(item.status || "not-started").trim();
        const statusLabel = status === "done" ? "Done" : status === "in-progress" ? "In progress" : "Not started";
        const subject = normalizeMemoryBoosterSubject(item.subject);
        pool.push({
            subject,
            prompt: `What is the current status of chapter "${chapter}" in ${subject}?`,
            answer: statusLabel
        });
    });

    (doubtTracker || []).forEach((item) => {
        if (item.resolved) return;
        const text = String(item.text || "").trim();
        if (!text) return;
        const subject = normalizeMemoryBoosterSubject(item.subject);
        const chapter = String(item.chapter || "General").trim() || "General";
        pool.push({
            subject,
            prompt: `Which unresolved doubt belongs to ${subject} (${chapter})?`,
            answer: text.length > 140 ? `${text.slice(0, 137)}...` : text
        });
    });

    return pool.filter(item => item.prompt && item.answer);
}

function generateMemoryBoosterSession() {
    const subject = document.getElementById('memoryBoosterSubject')?.value || "Any";
    const countRaw = Number(document.getElementById('memoryBoosterCount')?.value || 5);
    const count = Math.max(3, Math.min(12, Number.isFinite(countRaw) ? Math.round(countRaw) : 5));

    const pool = getMemoryBoosterPool();
    const filteredPool = subject === "Any"
        ? pool
        : pool.filter(item => subjectMatches(item.subject || "", subject));

    if (filteredPool.length < 3) {
        memoryBoosterSession = [];
        renderMemoryBoosterSession();
        const result = document.getElementById('memoryBoosterResult');
        if (result) {
            result.innerHTML = '<p class="empty-state">Not enough personal content yet. Add notes/flashcards/chapters first.</p>';
        }
        return;
    }

    const selected = shuffleArray(filteredPool).slice(0, Math.min(count, filteredPool.length));
    const answerBank = [...new Set(filteredPool.map(item => item.answer).filter(Boolean))];

    memoryBoosterSession = selected.map((item) => {
        const distractors = shuffleArray(
            answerBank.filter(answer => answer !== item.answer)
        ).slice(0, 3);

        const fallbackOptions = ['Need to revise this', 'Not in my notes', 'I am not sure']
            .filter(text => text !== item.answer);
        const combined = [...distractors];
        for (const fallback of fallbackOptions) {
            if (combined.length >= 3) break;
            if (!combined.includes(fallback)) combined.push(fallback);
        }
        const options = shuffleArray([item.answer, ...combined.slice(0, 3)]);
        return {
            subject: item.subject,
            prompt: item.prompt,
            answer: item.answer,
            options,
            correctIndex: options.findIndex(opt => opt === item.answer)
        };
    });

    const result = document.getElementById('memoryBoosterResult');
    if (result) result.innerHTML = '';
    renderMemoryBoosterSession();
}

function renderMemoryBoosterSession() {
    const container = document.getElementById('memoryBoosterContainer');
    const submitBtn = document.getElementById('memoryBoosterSubmitBtn');
    if (!container) return;

    if (!Array.isArray(memoryBoosterSession) || memoryBoosterSession.length === 0) {
        container.innerHTML = '<div class="empty-state">Generate a recall test to begin.</div>';
        if (submitBtn) submitBtn.disabled = true;
        return;
    }

    if (submitBtn) submitBtn.disabled = false;
    container.innerHTML = memoryBoosterSession.map((item, idx) => `
        <div class="memory-question">
            <h4>Q${idx + 1}. ${escapeHtml(item.prompt)}</h4>
            <p class="memory-question-meta">${escapeHtml(item.subject)}</p>
            ${item.options.map((option, optionIdx) => `
                <label>
                    <input type="radio" name="memory-q-${idx}" value="${optionIdx}">
                    ${escapeHtml(option)}
                </label>
            `).join("")}
        </div>
    `).join("");
}

function submitMemoryBoosterSession() {
    if (!Array.isArray(memoryBoosterSession) || memoryBoosterSession.length === 0) {
        alert('Generate a recall test first.');
        return;
    }

    let score = 0;
    let answered = 0;
    const incorrect = [];

    memoryBoosterSession.forEach((item, idx) => {
        const selected = document.querySelector(`input[name="memory-q-${idx}"]:checked`);
        if (!selected) return;
        answered++;
        const selectedIndex = Number(selected.value);
        const correct = selectedIndex === item.correctIndex;
        if (correct) {
            score++;
        } else {
            incorrect.push(item);
        }
        trackWeakTopicAttempt({ subject: item.subject, question: item.prompt }, correct);
    });

    saveState({ weakTopicStats });
    const total = memoryBoosterSession.length;
    const percent = Math.round((score / total) * 100);
    const result = document.getElementById('memoryBoosterResult');
    if (!result) return;

    if (answered === 0) {
        result.innerHTML = '<p class="empty-state">Select at least one answer before submitting.</p>';
        return;
    }

    const review = incorrect.slice(0, 3).map(item => `
        <li><strong>${escapeHtml(item.subject)}:</strong> ${escapeHtml(item.answer)}</li>
    `).join("");

    result.innerHTML = `
        <p><strong>Score:</strong> ${score}/${total} (${percent}%) | <strong>Answered:</strong> ${answered}/${total}</p>
        ${review ? `<ul class="memory-review-list">${review}</ul>` : '<p>Excellent recall. Keep this streak going.</p>'}
    `;

    addActivity('brain', 'Memory Booster', `Score ${percent}%`);
    renderWeakTopicDetection();
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

const SCHOLARSHIP_EXAM_ALERTS = [
    {
        id: 'alert-ntse-stage',
        type: 'Exam',
        title: 'NTSE Stage Practice Window',
        classMin: 10,
        classMax: 10,
        subjects: ['Math', 'Science', 'English'],
        deadlineMonthDay: '04-15',
        prepChecklist: [
            'Revise mental ability sample paper (timed).',
            'Solve one previous year NTSE paper.',
            'Prepare formula and concept quick sheets.'
        ]
    },
    {
        id: 'alert-olympiad-stem',
        type: 'Scholarship',
        title: 'STEM Olympiad Scholarship',
        classMin: 8,
        classMax: 12,
        subjects: ['Math', 'Science'],
        deadlineMonthDay: '05-10',
        prepChecklist: [
            'Complete 3 chapter-level mock sets.',
            'Review weak-topic error log from quizzes.',
            'Run 60-minute simulation with section split.'
        ]
    },
    {
        id: 'alert-kvpy-foundation',
        type: 'Scholarship',
        title: 'Research Aptitude Scholarship (Foundation)',
        classMin: 11,
        classMax: 12,
        subjects: ['Science', 'Math'],
        deadlineMonthDay: '06-05',
        prepChecklist: [
            'Build concept map for Physics/Chemistry/Biology.',
            'Practice mixed aptitude questions daily.',
            'Take one full timed mock and analyze mistakes.'
        ]
    },
    {
        id: 'alert-language-merit',
        type: 'Scholarship',
        title: 'Language Merit Scholarship',
        classMin: 7,
        classMax: 12,
        subjects: ['English'],
        deadlineMonthDay: '04-30',
        prepChecklist: [
            'Practice reading comprehension passages.',
            'Write two structured long answers each week.',
            'Improve grammar accuracy with mini-tests.'
        ]
    },
    {
        id: 'alert-board-prep',
        type: 'Exam',
        title: 'Board Exam Preparation Alert',
        classMin: 10,
        classMax: 12,
        subjects: ['General', 'Math', 'Science', 'English', 'History', 'Geography'],
        deadlineMonthDay: '11-30',
        prepChecklist: [
            'Finalize chapter completion tracker.',
            'Start spaced revision on weak chapters.',
            'Take one subject-wise mock every week.'
        ]
    },
    {
        id: 'alert-coding-talent',
        type: 'Scholarship',
        title: 'Coding Talent Grant',
        classMin: 8,
        classMax: 12,
        subjects: ['Programming', 'Math'],
        deadlineMonthDay: '07-20',
        prepChecklist: [
            'Solve 20 topic-wise coding problems.',
            'Build one mini project for portfolio.',
            'Review algorithm complexity fundamentals.'
        ]
    }
];

function resolveAlertDeadline(deadlineMonthDay, now = new Date()) {
    const raw = String(deadlineMonthDay || '').trim();
    if (!raw) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    const match = raw.match(/^(\d{1,2})-(\d{1,2})$/);
    if (!match) return '';

    const month = Math.max(1, Math.min(12, Number(match[1])));
    const day = Math.max(1, Math.min(31, Number(match[2])));
    const currentYear = now.getFullYear();
    const thisYear = new Date(currentYear, month - 1, day);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    if (thisYear >= today) return thisYear.toISOString().slice(0, 10);
    const nextYear = new Date(currentYear + 1, month - 1, day);
    return nextYear.toISOString().slice(0, 10);
}

function getAlertDaysLeft(dateStr, now = new Date()) {
    const due = new Date(dateStr);
    if (Number.isNaN(due.getTime())) return Number.POSITIVE_INFINITY;
    const startNow = new Date(now);
    startNow.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return Math.ceil((due - startNow) / (24 * 60 * 60 * 1000));
}

function getScholarshipAlertMatches() {
    const classFilter = Number(document.getElementById('alertClassFilter')?.value || 10);
    const subjectFilter = String(document.getElementById('alertSubjectFilter')?.value || 'Any').trim() || 'Any';
    const now = new Date();

    return SCHOLARSHIP_EXAM_ALERTS
        .filter(item => classFilter >= item.classMin && classFilter <= item.classMax)
        .filter(item => {
            if (subjectFilter === 'Any') return true;
            return (item.subjects || []).some(subject => subjectMatches(subject, subjectFilter));
        })
        .map(item => {
            const deadline = resolveAlertDeadline(item.deadlineMonthDay, now);
            const daysLeft = getAlertDaysLeft(deadline, now);
            return { ...item, deadline, daysLeft };
        })
        .sort((a, b) => a.daysLeft - b.daysLeft);
}

function renderScholarshipExamAlerts() {
    const summaryEl = document.getElementById('alertMatchSummary');
    const listEl = document.getElementById('alertMatchList');
    if (!summaryEl || !listEl) return;

    scholarshipAlertMatches = getScholarshipAlertMatches();
    if (scholarshipAlertMatches.length === 0) {
        summaryEl.textContent = 'No matching scholarship/exam alerts for this class/subject yet.';
        listEl.innerHTML = '<li class="empty-state">No alert match yet.</li>';
        return;
    }

    summaryEl.textContent = `${scholarshipAlertMatches.length} matching alert(s) sorted by deadline.`;
    listEl.innerHTML = scholarshipAlertMatches.map(item => `
        <li>
            <span class="deadline-type">${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <span class="deadline-days">Deadline: ${escapeHtml(item.deadline)} (${item.daysLeft <= 0 ? 'Today' : `in ${item.daysLeft} days`})</span>
            <p>Class ${item.classMin}${item.classMax !== item.classMin ? `-${item.classMax}` : ''} | ${escapeHtml((item.subjects || []).join(', '))}</p>
            <p>Prep checklist: ${escapeHtml((item.prepChecklist || []).join(' | '))}</p>
            <button class="action-btn" onclick="createAlertPrepChecklistTasks('${item.id}')">
                <i class="fas fa-list-check"></i> Add Prep Checklist Tasks
            </button>
        </li>
    `).join('');
}

function createAlertPrepChecklistTasks(alertId) {
    const match = scholarshipAlertMatches.find(item => item.id === alertId) || SCHOLARSHIP_EXAM_ALERTS.find(item => item.id === alertId);
    if (!match) {
        alert('Alert not found.');
        return;
    }

    const checklist = Array.isArray(match.prepChecklist) ? match.prepChecklist : [];
    if (checklist.length === 0) {
        alert('No prep checklist available for this alert.');
        return;
    }

    const subject = (match.subjects && match.subjects[0]) ? match.subjects[0] : 'General';
    const deadline = resolveAlertDeadline(match.deadline || match.deadlineMonthDay || '');
    const today = new Date();
    const deadlineDate = deadline ? new Date(deadline) : new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
    const totalDays = Math.max(1, Math.ceil((deadlineDate - today) / (24 * 60 * 60 * 1000)));
    const stepGap = Math.max(1, Math.floor(totalDays / checklist.length));

    let created = 0;
    checklist.forEach((step, idx) => {
        const due = new Date(today);
        const offset = Math.min(totalDays, (idx + 1) * stepGap);
        due.setDate(due.getDate() + offset);
        const dueDate = due.toISOString().slice(0, 10);
        const text = `Alert Prep: ${match.title} - ${step}`;
        const exists = tasks.some(task => String(task.text || '').trim() === text && String(task.dueDate || '') === dueDate);
        if (exists) return;
        tasks.push(normalizeTask({
            text,
            subject,
            priority: 'high',
            difficulty: 'medium',
            examWeight: 4,
            estimatedHours: 1,
            dueDate,
            done: false,
            createdAt: new Date().toISOString()
        }));
        created += 1;
    });

    if (created === 0) {
        alert('Checklist tasks already exist.');
        return;
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    renderCalendar();
    addActivity('bell', 'Scholarship/Exam Checklist Added', `${match.title}: ${created} task(s)`);
    alert(`${created} prep checklist task(s) added.`);
}

function getAdaptiveWeakSubjects(limit = 4) {
    const fromSettings = Array.isArray(smartSettings.weakSubjects) ? smartSettings.weakSubjects : [];
    const fromWeakTopics = getWeakTopics(6).map(item => String(item.subject || '').trim()).filter(Boolean);
    return [...new Set([...fromSettings, ...fromWeakTopics])].slice(0, Math.max(1, limit));
}

function renderDailyTop3AdaptiveTasks() {
    const list = document.getElementById('doNextList');
    if (!list) return;

    const weakSubjects = getAdaptiveWeakSubjects(4);
    const ranked = rankTasks(tasks.filter(task => !task.done), {
        now: new Date(),
        weakSubjects,
        exams
    }).slice(0, 3);
    if (ranked.length === 0) {
        list.innerHTML = '<li class="empty-state">No active tasks to prioritize</li>';
        return;
    }

    list.innerHTML = ranked.map(task => {
        const hint = getTaskScoreHint(task, { now: new Date(), weakSubjects, exams }, 5);
        const subject = String(task.subject || 'General');
        const weakTag = weakSubjects.some(name => subjectMatches(subject, name)) ? ' | Weak area boost' : '';
        return `
        <li>
            <strong>${task.text}</strong>
            <span title="${escapeHtmlAttribute(hint)}">${subject} | ${task.priority} | Score ${task._score}${weakTag}</span>
            <button class="task-rank-hint" type="button" onclick="openTaskScoreModal('${encodeURIComponent(task.id)}')" title="${escapeHtmlAttribute(hint)}">Why ranked</button>
        </li>
    `;
    }).join('');
}

function renderDoNext() {
    renderDailyTop3AdaptiveTasks();
}

function extractTopicFromQuestion(questionLike) {
    const rawQuestion = String((questionLike && questionLike.question) || "").trim();
    if (questionLike && typeof questionLike.topic === "string" && questionLike.topic.trim()) {
        return questionLike.topic.trim();
    }
    if (!rawQuestion) return "General Concepts";

    let normalized = rawQuestion
        .replace(/\?.*$/, '')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    normalized = normalized.replace(/^(what|which|choose|solve|find|if|how|why|when|where)\s+/i, '');
    normalized = normalized.replace(/^(is|are|was|were|the|a|an)\s+/i, '');
    const words = normalized.split(' ').filter(Boolean).slice(0, 5);
    if (words.length === 0) return "General Concepts";
    const topic = words.join(' ');
    return topic.charAt(0).toUpperCase() + topic.slice(1);
}

function buildWeakTopicKey(subject, topic) {
    return `${String(subject || "General").trim().toLowerCase()}::${String(topic || "General Concepts").trim().toLowerCase()}`;
}

function trackWeakTopicAttempt(questionLike, isCorrect) {
    const subject = String((questionLike && questionLike.subject) || "General").trim() || "General";
    const topic = extractTopicFromQuestion(questionLike);
    const key = buildWeakTopicKey(subject, topic);
    const current = weakTopicStats[key] || {
        subject,
        topic,
        attempts: 0,
        wrong: 0,
        lastSeenAt: new Date().toISOString()
    };
    weakTopicStats[key] = {
        ...current,
        subject,
        topic,
        attempts: (Number(current.attempts) || 0) + 1,
        wrong: (Number(current.wrong) || 0) + (isCorrect ? 0 : 1),
        lastSeenAt: new Date().toISOString()
    };
}

function getWeakTopics(limit = 5) {
    return Object.entries(weakTopicStats || {})
        .map(([key, item]) => {
            const attempts = Number(item.attempts) || 0;
            const wrong = Number(item.wrong) || 0;
            const wrongRate = attempts > 0 ? wrong / attempts : 0;
            const severity = Math.round((wrongRate * 100) + Math.min(25, attempts * 2));
            return {
                key,
                subject: item.subject || "General",
                topic: item.topic || "General Concepts",
                attempts,
                wrong,
                wrongRate,
                severity
            };
        })
        .filter(item => item.attempts >= 2 && item.wrongRate >= 0.4)
        .sort((a, b) => {
            if (b.severity !== a.severity) return b.severity - a.severity;
            return b.attempts - a.attempts;
        })
        .slice(0, Math.max(1, limit));
}

function addWeakTopicPracticeTask(encodedKey) {
    const key = decodeURIComponent(String(encodedKey || ""));
    const weak = (weakTopicStats && weakTopicStats[key]) ? weakTopicStats[key] : null;
    if (!weak) {
        alert('Weak topic not found.');
        return;
    }

    const title = `Practice weak topic: ${weak.topic}`;
    const exists = tasks.some(task => String(task.text || "").trim() === title && subjectMatches(task.subject || "", weak.subject || ""));
    if (exists) {
        alert('Practice task already exists for this topic.');
        return;
    }

    const due = new Date();
    due.setDate(due.getDate() + 2);
    tasks.push({
        text: title,
        subject: weak.subject || "General",
        priority: "high",
        difficulty: "hard",
        examWeight: 4,
        estimatedHours: 1.5,
        dueDate: due.toISOString().split('T')[0],
        done: false,
        createdAt: new Date().toISOString()
    });
    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('book-open', 'Practice Task Added', `${weak.subject}: ${weak.topic}`);
}

function renderWeakTopicDetection() {
    const list = document.getElementById('weakTopicList');
    if (!list) return;
    const weakTopics = getWeakTopics(5);
    if (weakTopics.length === 0) {
        list.innerHTML = '<li class="empty-state">No weak topics detected yet. Submit quizzes to build insights.</li>';
        return;
    }

    list.innerHTML = weakTopics.map(item => `
        <li>
            <strong>${item.subject}: ${item.topic}</strong>
            <span>Accuracy ${Math.round((1 - item.wrongRate) * 100)}% (${item.attempts} attempts)</span>
            <button class="action-btn" onclick="addWeakTopicPracticeTask('${encodeURIComponent(item.key)}')">Add Practice</button>
        </li>
    `).join('');
}

function renderTodayPlan() {
    const list = document.getElementById('todayPlanList');
    const hoursInput = document.getElementById('planHoursToday');
    const todayOnlyActions = document.getElementById('todayOnlyTimerActions');
    if (!list) return;

    if (hoursInput) {
        const defaultPlanHours = Number(smartSettings.defaultPlanHours) || 2;
        hoursInput.value = dailyPlan.availableHours || defaultPlanHours;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!dailyPlan.items || dailyPlan.items.length === 0 || dailyPlan.date !== today) {
        list.innerHTML = '<li class="empty-state">No plan generated yet</li>';
        if (todayOnlyActions) todayOnlyActions.innerHTML = '';
        renderRecoveryPlanStatus();
        return;
    }

    list.innerHTML = dailyPlan.items.map(item => `
        <li>
            <strong>${item.text}</strong>
            <span>${item.subject} | ${item.allocatedMinutes} min | ${item.plannedStartLabel ? `Starts ${item.plannedStartLabel} | ` : ''}Score ${item.score}</span>
        </li>
    `).join('');

    if (todayOnlyActions) {
        if (dailyPlan.mode === 'today-only') {
            const subject = String(dailyPlan.focusSubject || 'General');
            todayOnlyActions.innerHTML = `
                <button class="action-btn" onclick="startTodayOnlyFocusTimer()">
                    <i class="fas fa-play"></i> Start 25-min Focus Timer (${subject})
                </button>
            `;
        } else if (dailyPlan.mode === 'low-motivation') {
            const subject = String(dailyPlan.focusSubject || 'General');
            todayOnlyActions.innerHTML = `
                <button class="action-btn" onclick="startLowMotivationFocusSprint()">
                    <i class="fas fa-bolt"></i> Start Gentle Focus Sprint (${subject})
                </button>
            `;
        } else {
            todayOnlyActions.innerHTML = '';
        }
    }
    renderRecoveryPlanStatus();
    renderRecoveryHistory();
}

function generateTodayPlan() {
    const input = document.getElementById('planHoursToday');
    const availableHours = Number(input && input.value ? input.value : 2);
    const focusDNAProfile = getFocusDNAProfile();
    const studyMoodProfile = getStudyMoodProfile();
    dailyPlan = generateDailyPlan(tasks, {
        now: new Date(),
        availableHours,
        weakSubjects: smartSettings.weakSubjects || [],
        exams,
        focusDNAProfile,
        studyMoodProfile
    });
    saveState({ dailyPlan });
    renderTodayPlan();
    const planNote = `${studyMoodProfile.label} workload${focusDNAProfile.hasData ? ` + Focus DNA at ${formatHourLabel(focusDNAProfile.recommendedStartHour)}` : ''}`;
    addActivity('calendar-day', 'Daily Plan Generated', `${dailyPlan.items.length} study blocks created (${planNote})`);
}

function generateTodayOnlyMode() {
    const input = document.getElementById('planHoursToday');
    const availableHours = Number(input && input.value ? input.value : 2);
    const availableMinutes = Math.max(60, Math.round(availableHours * 60));
    const ranked = rankTasks(tasks.filter(task => !task.done), {
        now: new Date(),
        weakSubjects: smartSettings.weakSubjects || [],
        exams
    });
    const weakest = getWeakTopics(1)[0];

    const maxItems = 3;
    const reservedForWeak = weakest ? 1 : 0;
    const maxTaskItems = Math.max(1, maxItems - reservedForWeak);
    const selectedTasks = ranked.slice(0, maxTaskItems);

    if (selectedTasks.length === 0) {
        alert('No pending tasks to plan today.');
        return;
    }

    const perTaskMinutes = Math.max(20, Math.round(availableMinutes / maxItems));
    const items = selectedTasks.map(task => ({
        taskId: task.id,
        text: task.text,
        subject: task.subject || 'General',
        allocatedMinutes: perTaskMinutes,
        score: scoreTask(task, { now: new Date(), weakSubjects: smartSettings.weakSubjects || [], exams })
    }));

    if (weakest) {
        items.push({
            taskId: '',
            text: `Weak-topic practice: ${weakest.topic}`,
            subject: weakest.subject || 'General',
            allocatedMinutes: 20,
            score: 99
        });
    }

    const focusSubject = (selectedTasks.find(item => String(item.subject || '').trim()) || selectedTasks[0] || {}).subject || 'General';
    dailyPlan = {
        date: new Date().toISOString().split('T')[0],
        items,
        availableHours,
        mode: 'today-only',
        focusSubject
    };
    saveState({ dailyPlan });
    renderTodayPlan();
    addActivity('list-check', 'Today Only Mode', `${items.length} blocks prepared (max 3)`);
}

function generateLowMotivationMode() {
    const ranked = rankTasks(tasks.filter(task => !task.done), {
        now: new Date(),
        weakSubjects: smartSettings.weakSubjects || [],
        exams
    });
    const weakest = getWeakTopics(1)[0];

    if (ranked.length === 0 && !weakest) {
        alert('No pending tasks available for low-motivation mode.');
        return;
    }

    const microTaskCount = ranked.length >= 2 ? 2 : 1;
    const selectedTasks = ranked.slice(0, microTaskCount);
    const items = selectedTasks.map(task => ({
        taskId: task.id,
        text: `Quick win: ${task.text}`,
        subject: task.subject || 'General',
        allocatedMinutes: 15,
        score: scoreTask(task, { now: new Date(), weakSubjects: smartSettings.weakSubjects || [], exams })
    }));

    if (weakest) {
        items.push({
            taskId: '',
            text: `Quick weak-topic fix: ${weakest.topic}`,
            subject: weakest.subject || 'General',
            allocatedMinutes: 10,
            score: 98
        });
    } else {
        items.push({
            taskId: '',
            text: '2-minute desk reset + open one chapter summary',
            subject: selectedTasks[0] ? (selectedTasks[0].subject || 'General') : 'General',
            allocatedMinutes: 10,
            score: 95
        });
    }

    const focusSubject = (selectedTasks.find(item => String(item.subject || '').trim()) || selectedTasks[0] || {}).subject
        || (weakest ? weakest.subject : 'General')
        || 'General';

    dailyPlan = {
        date: new Date().toISOString().split('T')[0],
        items: items.slice(0, 3),
        availableHours: 1,
        mode: 'low-motivation',
        focusSubject
    };
    saveState({ dailyPlan });
    renderTodayPlan();
    addActivity('seedling', 'Low-Motivation Mode', `${dailyPlan.items.length} micro wins prepared`);
}

function startTodayOnlyFocusTimer() {
    const subject = String((dailyPlan && dailyPlan.focusSubject) || 'General');
    const subjectSelect = document.getElementById('timerSubjectSelect');
    if (subjectSelect) {
        const optionValues = Array.from(subjectSelect.options).map(opt => opt.value);
        subjectSelect.value = optionValues.includes(subject) ? subject : 'General';
    }
    setTimerMode(25);
    navigateTo('dashboard');
    if (!isTimerRunning) startTimer();
}

function startLowMotivationFocusSprint() {
    const subject = String((dailyPlan && dailyPlan.focusSubject) || 'General');
    const subjectSelect = document.getElementById('timerSubjectSelect');
    if (subjectSelect) {
        const optionValues = Array.from(subjectSelect.options).map(opt => opt.value);
        subjectSelect.value = optionValues.includes(subject) ? subject : 'General';
    }
    setTimerMode(25);
    navigateTo('dashboard');
    if (!isTimerRunning) startTimer();
}

function quickActionOpenAddTask() {
    navigateTo('tasks');
    const input = document.getElementById('taskInput');
    if (input) input.focus();
}

function quickActionStartFocusNow() {
    navigateTo('dashboard');
    setTimerMode(25);
    if (!isTimerRunning) startTimer();
}

function quickActionRunRecoveryPlan() {
    navigateTo('dashboard');
    const success = generateRecoveryPlan('manual');
    if (success) renderDashboard();
}

function quickActionRunSpacedRevision() {
    runSpacedRevisionScheduler();
    navigateTo('calendar');
    renderSpacedRevisionCalendar();
}

function quickActionCreateChallenge() {
    navigateTo('dashboard');
    void createPeerChallenge();
}

function quickActionCreateStudyRoom() {
    navigateTo('dashboard');
    void createStudyGroupRoom();
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
        weakSubjects: smartSettings.weakSubjects || [],
        exams,
        focusDNAProfile: getFocusDNAProfile(),
        studyMoodProfile: getStudyMoodProfile()
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
        weakSubjects: smartSettings.weakSubjects || [],
        exams,
        focusDNAProfile: getFocusDNAProfile(),
        studyMoodProfile: getStudyMoodProfile()
    });
    saveState({ dailyPlan });
    addActivity('calendar-day', 'Auto Replan Complete', `${unfinishedIds.length} missed task(s) moved to today`);
}

function getLatestStudyActivityDate() {
    let latest = null;
    const updateLatest = (value) => {
        if (!value) return;
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return;
        if (!latest || date > latest) latest = date;
    };

    (tasks || [])
        .filter(task => task && task.done && task.doneAt)
        .forEach(task => updateLatest(task.doneAt));

    (pomodoroSessions || [])
        .filter(session => String((session && session.type) || "") === "Focus")
        .forEach(session => updateLatest(session.date));

    return latest;
}

function getMissedStudyDayCount(now = new Date()) {
    const latest = getLatestStudyActivityDate();
    if (!latest) return 0;
    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);
    const startLatest = new Date(latest);
    startLatest.setHours(0, 0, 0, 0);
    const dayMs = 24 * 60 * 60 * 1000;
    return Math.max(0, Math.floor((startToday - startLatest) / dayMs));
}

function createRecoveryPlan(options = {}) {
    const now = options.now || new Date();
    const gapDays = Math.max(0, Number(options.gapDays) || 0);
    const fallbackHours = Number(smartSettings.defaultPlanHours) || 2;
    const availableHours = Math.max(1, Math.min(2, Number(options.availableHours) || fallbackHours));
    const availableMinutes = Math.max(45, Math.round(availableHours * 60));
    const ranked = rankTasks(tasks.filter(task => !task.done), {
        now,
        weakSubjects: smartSettings.weakSubjects || [],
        exams
    });
    const easyFirst = ranked.sort((a, b) => {
        const weight = (task) => {
            const diff = String((task && task.difficulty) || "medium");
            if (diff === "easy") return 0;
            if (diff === "medium") return 1;
            return 2;
        };
        const byDifficulty = weight(a) - weight(b);
        if (byDifficulty !== 0) return byDifficulty;
        return b._score - a._score;
    });
    const weakest = getWeakTopics(1)[0];

    const items = [{
        taskId: "",
        text: "Restart ritual: 10-min setup + open one chapter summary",
        subject: "General",
        allocatedMinutes: 10,
        score: 100
    }];

    for (const task of easyFirst.slice(0, 3)) {
        const minutesByDifficulty = task.difficulty === "hard" ? 25 : (task.difficulty === "easy" ? 15 : 20);
        items.push({
            taskId: task.id,
            text: `Comeback step: ${task.text}`,
            subject: task.subject || "General",
            allocatedMinutes: minutesByDifficulty,
            score: task._score
        });
    }

    if (weakest && items.length < 4) {
        items.push({
            taskId: "",
            text: `Quick weak-topic fix: ${weakest.topic}`,
            subject: weakest.subject || "General",
            allocatedMinutes: 15,
            score: 98
        });
    }

    let used = 0;
    const trimmed = [];
    for (const item of items) {
        if (used + item.allocatedMinutes > availableMinutes && trimmed.length > 0) continue;
        used += item.allocatedMinutes;
        trimmed.push(item);
        if (trimmed.length >= 4) break;
    }

    const focusSubject = (trimmed.find(item => String(item.subject || "").trim() && item.subject !== "General") || {}).subject || "General";
    return {
        date: now.toISOString().split("T")[0],
        items: trimmed,
        availableHours,
        mode: "recovery",
        focusSubject,
        recoveryGapDays: gapDays
    };
}

function updateRecoveryPlanMeta(mode, gapDays, now = new Date()) {
    const today = now.toISOString().split("T")[0];
    recoveryPlan = normalizeRecoveryPlan({
        ...recoveryPlan,
        lastGeneratedDate: today,
        lastMode: mode,
        lastGapDays: gapDays,
        generatedCount: (Number(recoveryPlan.generatedCount) || 0) + 1,
        lastAutoDate: mode === "auto" ? today : recoveryPlan.lastAutoDate
    });
}

function renderRecoveryPlanStatus() {
    const statusEl = document.getElementById('recoveryPlanStatus');
    if (!statusEl) return;
    const today = new Date().toISOString().split('T')[0];
    const latest = getLatestStudyActivityDate();
    if (!latest) {
        statusEl.textContent = 'Recovery plan activates after you complete tasks or focus sessions.';
        return;
    }

    if (dailyPlan.mode === "recovery" && dailyPlan.date === today) {
        const gapDays = Math.max(0, Number(dailyPlan.recoveryGapDays) || 0);
        statusEl.textContent = `Comeback plan ready (${gapDays} missed day${gapDays === 1 ? "" : "s"}). Start with Step 1.`;
        return;
    }

    const gapDays = getMissedStudyDayCount();
    if (gapDays >= 2) {
        statusEl.textContent = `${gapDays} inactive days detected. Tap One-Click Recovery Plan for small restart steps.`;
    } else {
        statusEl.textContent = 'Recovery status: on track. If you miss 2+ days, a comeback plan is generated.';
    }
}

function getRecoveryHistoryStats(entry) {
    const linkedIds = Array.isArray(entry && entry.linkedTaskIds) ? entry.linkedTaskIds : [];
    if (linkedIds.length === 0) {
        return { total: 0, done: 0, rate: null };
    }
    let done = 0;
    linkedIds.forEach(id => {
        const task = tasks.find(t => t.id === id);
        if (task && task.done) done += 1;
    });
    const rate = Math.round((done / linkedIds.length) * 100);
    return { total: linkedIds.length, done, rate };
}

function renderRecoveryHistory() {
    const summaryEl = document.getElementById('recoveryHistorySummary');
    const listEl = document.getElementById('recoveryHistoryList');
    const filterEl = document.getElementById('recoveryHistoryFilter');
    if (!summaryEl || !listEl) return;

    const history = Array.isArray(recoveryPlan.history) ? recoveryPlan.history.slice(0, 6) : [];
    const filter = ["all", "auto", "manual"].includes(String(recoveryPlan.historyFilter || "").toLowerCase())
        ? String(recoveryPlan.historyFilter).toLowerCase()
        : "all";
    if (filterEl) filterEl.value = filter;

    const filtered = filter === "all" ? history : history.filter(item => String(item.mode || "").toLowerCase() === filter);
    if (history.length === 0) {
        summaryEl.textContent = 'Recovery history: no attempts yet.';
        listEl.innerHTML = '<li class="empty-state">Generate a recovery plan to track comeback success.</li>';
        return;
    }
    if (filtered.length === 0) {
        summaryEl.textContent = `Recovery history: ${history.length} total attempt(s), 0 in current filter.`;
        listEl.innerHTML = '<li class="empty-state">No recovery attempts for this filter yet.</li>';
        return;
    }

    const withRates = filtered
        .map(entry => getRecoveryHistoryStats(entry))
        .filter(stats => stats.rate !== null);
    const avgRate = withRates.length > 0
        ? Math.round(withRates.reduce((sum, item) => sum + item.rate, 0) / withRates.length)
        : null;

    summaryEl.textContent = avgRate === null
        ? `Recovery history: ${filtered.length}/${history.length} attempt(s) shown.`
        : `Recovery history: ${filtered.length}/${history.length} shown, average success ${avgRate}%.`;

    listEl.innerHTML = filtered.map(entry => {
        const stats = getRecoveryHistoryStats(entry);
        const modeLabel = entry.mode === 'auto' ? 'Auto' : 'Manual';
        const successText = stats.rate === null
            ? 'Task success: N/A'
            : `Task success: ${stats.done}/${stats.total} (${stats.rate}%)`;
        return `
            <li>
                <strong>${entry.date} | ${modeLabel} recovery</strong>
                <span>${entry.gapDays} missed day(s), ${entry.itemCount} step(s)</span>
                <span>${successText}</span>
            </li>
        `;
    }).join('');
}

function setRecoveryHistoryFilter(value) {
    const next = ["all", "auto", "manual"].includes(String(value || "").toLowerCase())
        ? String(value).toLowerCase()
        : "all";
    recoveryPlan = normalizeRecoveryPlan({
        ...recoveryPlan,
        historyFilter: next
    });
    saveState({ recoveryPlan });
    renderRecoveryHistory();
}

function clearRecoveryHistory() {
    const history = Array.isArray(recoveryPlan.history) ? recoveryPlan.history : [];
    if (history.length === 0) {
        alert('Recovery history is already empty.');
        return;
    }
    if (!confirm('Clear all recovery history?')) return;
    recoveryPlan = normalizeRecoveryPlan({
        ...recoveryPlan,
        history: []
    });
    saveState({ recoveryPlan });
    renderRecoveryHistory();
    addActivity('trash', 'Recovery History Cleared', 'All recovery attempts removed');
}

function generateRecoveryPlan(mode = "manual", options = {}) {
    const now = options.now || new Date();
    const input = document.getElementById('planHoursToday');
    const availableHours = Number(options.availableHours || (input && input.value) || dailyPlan.availableHours || smartSettings.defaultPlanHours || 2);
    const gapDays = Math.max(0, Number(options.gapDays) || getMissedStudyDayCount(now));

    const hasPending = tasks.some(task => !task.done);
    if (!hasPending) {
        alert('No pending tasks. Add tasks first to build a recovery plan.');
        return false;
    }

    dailyPlan = createRecoveryPlan({ now, availableHours, gapDays });
    const linkedTaskIds = (dailyPlan.items || [])
        .map(item => item.taskId)
        .filter(Boolean);
    const historyEntry = {
        id: `recovery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: dailyPlan.date,
        mode,
        gapDays,
        itemCount: Array.isArray(dailyPlan.items) ? dailyPlan.items.length : 0,
        linkedTaskIds
    };
    recoveryPlan = normalizeRecoveryPlan({
        ...recoveryPlan,
        history: [historyEntry, ...(Array.isArray(recoveryPlan.history) ? recoveryPlan.history : [])]
    });
    updateRecoveryPlanMeta(mode, gapDays, now);
    saveState({ dailyPlan, recoveryPlan });
    renderTodayPlan();
    renderRecoveryHistory();
    addActivity('life-ring', 'Recovery Plan Generated', `${dailyPlan.items.length} small-step comeback blocks (${mode})`);
    return true;
}

function autoGenerateRecoveryPlanIfNeeded() {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const gapDays = getMissedStudyDayCount(now);
    const hasPending = tasks.some(task => !task.done);
    if (gapDays < 2 || !hasPending) return;
    if (String(recoveryPlan.lastAutoDate || "") === today) return;

    const hasCurrentPlan = dailyPlan && dailyPlan.date === today && Array.isArray(dailyPlan.items) && dailyPlan.items.length > 0;
    if (hasCurrentPlan && dailyPlan.mode !== "recovery") return;

    generateRecoveryPlan("auto", { now, gapDays, availableHours: dailyPlan.availableHours || smartSettings.defaultPlanHours || 2 });
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
let taskSortMode = "smart-score";
let selectedTaskIds = new Set();
let liveClassSession = {
    active: false,
    startedAt: ""
};
let assignmentScannerImageDataUrl = "";
let assignmentScannerParsedPreview = null;
let assignmentScannerWorkerPromise = null;
let scholarshipAlertMatches = [];

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
        const scoreHint = getTaskScoreHint(task, { now: today, weakSubjects: smartSettings.weakSubjects || [], exams }, 5);
        
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
                <span class="priority-badge">exam wt ${task.examWeight || 3}/5</span>
                <span class="task-subject">${estimateTaskHours(task)}h est</span>
                <button class="task-rank-hint" type="button" title="${escapeHtmlAttribute(scoreHint)}"
                    onclick="event.stopPropagation(); openTaskScoreModal('${encodeURIComponent(task.id)}')">Why ranked</button>
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
    if (taskSortMode === "smart-score") {
        const scoreA = scoreTask(a, { now: today, weakSubjects: smartSettings.weakSubjects || [], exams });
        const scoreB = scoreTask(b, { now: today, weakSubjects: smartSettings.weakSubjects || [], exams });
        if (scoreB !== scoreA) return scoreB - scoreA;
    }
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

function getLiveClassDueDateValue() {
    const dueInput = document.getElementById('liveClassActionDueDate');
    if (dueInput && dueInput.value) return dueInput.value;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
}

function renderLiveClassMode() {
    const statusEl = document.getElementById('liveClassStatus');
    const toggleBtn = document.getElementById('liveClassToggleBtn');
    const dueInput = document.getElementById('liveClassActionDueDate');
    if (!statusEl || !toggleBtn) return;
    if (dueInput && !dueInput.value) {
        dueInput.value = getLiveClassDueDateValue();
    }

    if (!liveClassSession.active) {
        statusEl.textContent = 'Not in class. Tap In Class when lecture starts.';
        toggleBtn.innerHTML = '<i class="fas fa-play"></i> In Class';
        return;
    }

    const started = liveClassSession.startedAt ? new Date(liveClassSession.startedAt) : null;
    const timeLabel = started && !Number.isNaN(started.getTime())
        ? started.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : 'now';
    statusEl.textContent = `Live class running since ${timeLabel}. Quick notes, doubts, and action items auto-save.`;
    toggleBtn.innerHTML = '<i class="fas fa-stop"></i> End Class';
}

function collectLiveClassDraft() {
    const subject = String(document.getElementById('liveClassSubject')?.value || 'General').trim() || 'General';
    const notesText = String(document.getElementById('liveClassQuickNotes')?.value || '').trim();
    const doubtText = String(document.getElementById('liveClassDoubtText')?.value || '').trim();
    const actionRaw = String(document.getElementById('liveClassActionItems')?.value || '').trim();
    const dueDate = getLiveClassDueDateValue();
    const actionItems = actionRaw
        .split(/\r?\n|;/g)
        .map(line => String(line || '').trim())
        .filter(Boolean);
    return { subject, notesText, doubtText, actionItems, dueDate };
}

function clearLiveClassInputs() {
    const notesInput = document.getElementById('liveClassQuickNotes');
    const doubtInput = document.getElementById('liveClassDoubtText');
    const actionInput = document.getElementById('liveClassActionItems');
    if (notesInput) notesInput.value = '';
    if (doubtInput) doubtInput.value = '';
    if (actionInput) actionInput.value = '';
}

function saveLiveClassCapture(options = {}) {
    const silent = Boolean(options.silent);
    const draft = collectLiveClassDraft();
    const hasContent = draft.notesText || draft.doubtText || draft.actionItems.length > 0;
    if (!hasContent) {
        if (!silent) alert('Add quick notes, doubt, or action items first.');
        return 0;
    }

    let savedCount = 0;
    if (draft.notesText) {
        notes.push({
            title: `Live Class Note - ${draft.subject}`,
            subject: draft.subject,
            content: draft.notesText,
            color: '#d9f7ff',
            date: new Date().toISOString()
        });
        savedCount += 1;
    }

    if (draft.doubtText) {
        doubtTracker.unshift({
            id: `doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            subject: draft.subject,
            chapter: 'Live Class',
            text: draft.doubtText,
            status: 'unresolved',
            createdAt: new Date().toISOString(),
            resolvedAt: ''
        });
        savedCount += 1;
    }

    draft.actionItems.forEach(item => {
        tasks.push({
            text: `Live Class Action: ${item}`,
            subject: draft.subject,
            priority: 'high',
            difficulty: 'medium',
            examWeight: 3,
            estimatedHours: 0.5,
            dueDate: draft.dueDate,
            done: false,
            doneAt: '',
            createdAt: new Date().toISOString()
        });
        savedCount += 1;
    });

    saveTasks();
    saveState({ notes, doubtTracker });
    renderTasks();
    renderNotes();
    renderGoals();
    renderDashboard();
    addActivity('chalkboard-user', 'Live Class Capture Saved', `${savedCount} item(s) saved`);
    clearLiveClassInputs();
    if (!silent) alert(`${savedCount} item(s) saved from Live Class.`);
    return savedCount;
}

function toggleLiveClassMode() {
    if (!liveClassSession.active) {
        liveClassSession = {
            active: true,
            startedAt: new Date().toISOString()
        };
        renderLiveClassMode();
        addActivity('play', 'Live Class Started', 'Quick capture enabled');
        return;
    }

    saveLiveClassCapture({ silent: true });
    liveClassSession = {
        active: false,
        startedAt: ''
    };
    renderLiveClassMode();
    addActivity('stop', 'Live Class Ended', 'Session closed and draft auto-saved');
}

function setAssignmentScannerStatus(message) {
    const statusEl = document.getElementById('assignmentScannerStatus');
    if (!statusEl) return;
    statusEl.textContent = String(message || '');
}

function openAssignmentPhotoPicker() {
    const input = document.getElementById('assignmentPhotoInput');
    if (!input) return;
    input.click();
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Failed to read image file.'));
        reader.readAsDataURL(file);
    });
}

function ensureAssignmentScannerWorker() {
    if (window.Tesseract && window.Tesseract.recognize) {
        return Promise.resolve(window.Tesseract);
    }
    if (assignmentScannerWorkerPromise) return assignmentScannerWorkerPromise;

    assignmentScannerWorkerPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector('script[data-scan-ocr="tesseract"]');
        if (existing) {
            const checkReady = () => {
                if (window.Tesseract && window.Tesseract.recognize) resolve(window.Tesseract);
                else reject(new Error('OCR library unavailable.'));
            };
            if (existing.dataset.loaded === '1') {
                checkReady();
            } else {
                existing.addEventListener('load', checkReady, { once: true });
                existing.addEventListener('error', () => reject(new Error('OCR library failed to load.')), { once: true });
            }
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
        script.async = true;
        script.dataset.scanOcr = 'tesseract';
        script.onload = () => {
            script.dataset.loaded = '1';
            if (window.Tesseract && window.Tesseract.recognize) resolve(window.Tesseract);
            else reject(new Error('OCR library loaded but Tesseract is missing.'));
        };
        script.onerror = () => reject(new Error('Failed to load OCR library.'));
        document.head.appendChild(script);
    }).catch((error) => {
        assignmentScannerWorkerPromise = null;
        throw error;
    });

    return assignmentScannerWorkerPromise;
}

function parseDueDateFromAssignmentText(text) {
    const raw = String(text || '');
    if (!raw.trim()) return '';

    if (/\btomorrow\b/i.test(raw)) {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0, 10);
    }

    const iso = raw.match(/\b(20\d{2})[-\/.](0?[1-9]|1[0-2])[-\/.](0?[1-9]|[12]\d|3[01])\b/);
    if (iso) {
        const yyyy = Number(iso[1]);
        const mm = Number(iso[2]);
        const dd = Number(iso[3]);
        return new Date(yyyy, mm - 1, dd).toISOString().slice(0, 10);
    }

    const slash = raw.match(/\b(0?[1-9]|1[0-2])[\/.-](0?[1-9]|[12]\d|3[01])[\/.-]((?:20)?\d{2})\b/);
    if (slash) {
        const mm = Number(slash[1]);
        const dd = Number(slash[2]);
        const yyRaw = Number(slash[3]);
        const yyyy = yyRaw < 100 ? (2000 + yyRaw) : yyRaw;
        return new Date(yyyy, mm - 1, dd).toISOString().slice(0, 10);
    }

    const monthNames = {
        january: 1, jan: 1, february: 2, feb: 2, march: 3, mar: 3, april: 4, apr: 4,
        may: 5, june: 6, jun: 6, july: 7, jul: 7, august: 8, aug: 8, september: 9, sep: 9,
        october: 10, oct: 10, november: 11, nov: 11, december: 12, dec: 12
    };
    const monthPattern = /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sep|october|oct|november|nov|december|dec)\s+(\d{1,2})(?:,?\s*(20\d{2}))?\b/i;
    const named = raw.match(monthPattern);
    if (named) {
        const mm = monthNames[String(named[1] || '').toLowerCase()] || 0;
        const dd = Number(named[2]);
        const yyyy = Number(named[3] || new Date().getFullYear());
        if (mm > 0) {
            return new Date(yyyy, mm - 1, dd).toISOString().slice(0, 10);
        }
    }

    return '';
}

function inferSubjectFromAssignmentText(text) {
    const lower = String(text || '').toLowerCase();
    const subjectKeywords = [
        { subject: 'Math', keys: ['math', 'algebra', 'geometry', 'trigonometry', 'calculus'] },
        { subject: 'Science', keys: ['science', 'physics', 'chemistry', 'biology'] },
        { subject: 'English', keys: ['english', 'grammar', 'essay', 'literature', 'comprehension'] },
        { subject: 'History', keys: ['history', 'civilization', 'ancient', 'medieval', 'freedom movement'] },
        { subject: 'Geography', keys: ['geography', 'map', 'climate', 'resources', 'latitude', 'longitude'] },
        { subject: 'Programming', keys: ['programming', 'coding', 'javascript', 'python', 'algorithm', 'computer'] }
    ];
    for (const group of subjectKeywords) {
        if (group.keys.some(key => lower.includes(key))) return group.subject;
    }
    return 'General';
}

function inferTaskTitleFromAssignmentText(text) {
    const normalized = String(text || '').replace(/\r/g, '\n');
    const lines = normalized.split('\n').map(line => line.trim()).filter(Boolean);
    const preferred = lines.find(line => /homework|assignment|worksheet|project|exercise|chapter|task|submit/i.test(line));
    const fallback = lines.find(line => line.length >= 10);
    const title = preferred || fallback || 'Complete scanned homework task';
    return title.slice(0, 140);
}

function parseAssignmentScannerText() {
    const textArea = document.getElementById('assignmentScanText');
    const titleInput = document.getElementById('assignmentScanTaskTitle');
    const subjectInput = document.getElementById('assignmentScanSubject');
    const dueDateInput = document.getElementById('assignmentScanDueDate');
    const text = String(textArea && textArea.value ? textArea.value : '').trim();
    if (!text) {
        setAssignmentScannerStatus('No text detected yet. Upload a clear photo first.');
        return;
    }

    const parsed = {
        text,
        title: inferTaskTitleFromAssignmentText(text),
        subject: inferSubjectFromAssignmentText(text),
        dueDate: parseDueDateFromAssignmentText(text)
    };
    assignmentScannerParsedPreview = parsed;

    if (titleInput) titleInput.value = parsed.title;
    if (subjectInput) subjectInput.value = parsed.subject;
    if (dueDateInput) dueDateInput.value = parsed.dueDate;

    const dueLabel = parsed.dueDate ? parsed.dueDate : 'no due date found';
    setAssignmentScannerStatus(`Parsed: ${parsed.subject} | Due: ${dueLabel}`);
}

async function scanAssignmentPhoto(event) {
    const input = event && event.target ? event.target : document.getElementById('assignmentPhotoInput');
    const file = input && input.files && input.files[0] ? input.files[0] : null;
    if (!file) return;

    try {
        setAssignmentScannerStatus('Reading photo...');
        const dataUrl = await readFileAsDataUrl(file);
        assignmentScannerImageDataUrl = dataUrl;
        const previewImg = document.getElementById('assignmentScannerPreviewImage');
        if (previewImg) {
            previewImg.src = dataUrl;
            previewImg.style.display = 'block';
        }

        setAssignmentScannerStatus('Loading OCR engine...');
        const tesseract = await ensureAssignmentScannerWorker();
        setAssignmentScannerStatus('Extracting text from photo...');
        const result = await tesseract.recognize(dataUrl, 'eng');
        const extractedText = String((result && result.data && result.data.text) || '').trim();

        const textArea = document.getElementById('assignmentScanText');
        if (textArea) textArea.value = extractedText;
        parseAssignmentScannerText();
    } catch (error) {
        setAssignmentScannerStatus(`Scan failed: ${error && error.message ? error.message : 'unknown error'}`);
    } finally {
        if (input) input.value = '';
    }
}

function createTaskFromAssignmentScan() {
    const titleInput = document.getElementById('assignmentScanTaskTitle');
    const subjectInput = document.getElementById('assignmentScanSubject');
    const dueDateInput = document.getElementById('assignmentScanDueDate');
    const title = String(titleInput && titleInput.value ? titleInput.value : '').trim();
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'General').trim() || 'General';
    const dueDate = String(dueDateInput && dueDateInput.value ? dueDateInput.value : '').trim();

    if (!title) {
        alert('Task title is empty. Scan or parse text first.');
        return;
    }

    const exists = tasks.some(task =>
        String(task.text || '').trim().toLowerCase() === title.toLowerCase() &&
        String(task.subject || '').trim().toLowerCase() === subject.toLowerCase() &&
        String(task.dueDate || '') === dueDate
    );
    if (exists) {
        alert('This scanned task already exists.');
        return;
    }

    tasks.push({
        text: title,
        subject,
        priority: "medium",
        difficulty: "medium",
        examWeight: 3,
        estimatedHours: 1,
        dueDate,
        done: false,
        doneAt: "",
        createdAt: new Date().toISOString()
    });

    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('camera', 'Task Created from Photo', `${title}${dueDate ? ` | Due ${dueDate}` : ''}`);
    setAssignmentScannerStatus('Task created successfully from scanned assignment.');
}

function addTask() {
    const input = document.getElementById("taskInput");
    const subject = document.getElementById("subjectSelect");
    const priority = document.getElementById("prioritySelect");
    const difficulty = document.getElementById("difficultySelect");
    const examWeightSelect = document.getElementById("examWeightSelect");
    const estimatedHoursInput = document.getElementById("estimatedHoursInput");
    const dueDate = document.getElementById("dueDateInput");
    
    if (input.value.trim() === "") return;
    
    tasks.push({
        text: input.value.trim(),
        subject: subject.value,
        priority: priority.value,
        difficulty: difficulty ? difficulty.value : "medium",
        examWeight: Math.min(5, Math.max(1, Number(examWeightSelect && examWeightSelect.value ? examWeightSelect.value : 3))),
        estimatedHours: Math.max(0.5, Number(estimatedHoursInput && estimatedHoursInput.value ? estimatedHoursInput.value : 1)),
        dueDate: dueDate.value,
        done: false,
        doneAt: "",
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
    if (examWeightSelect) examWeightSelect.value = "3";
    if (estimatedHoursInput) estimatedHoursInput.value = "";
    dueDate.value = "";
}

function toggleTask(index) {
    const wasDone = tasks[index].done;
    tasks[index].done = !tasks[index].done;
    tasks[index].doneAt = tasks[index].done ? new Date().toISOString() : "";
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
    taskSortMode = mode || "smart-score";
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
            return { ...task, done: true, doneAt: new Date().toISOString() };
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
const SPACED_REVISION_DAYS = [1, 3, 7, 14];

function toDateInputValue(dateLike) {
    const date = dateLike instanceof Date ? new Date(dateLike) : new Date(dateLike);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);
}

function getSpacedRevisionChapterSourceDate(entry) {
    const fallback = entry && entry.createdAt ? entry.createdAt : new Date().toISOString();
    return new Date(fallback);
}

function getSpacedRevisionMistakeSourceDate(entry) {
    const source = (entry && (entry.lastWrongAt || entry.createdAt || entry.nextReviewAt)) || new Date().toISOString();
    return new Date(source);
}

function buildSpacedRevisionBlueprints() {
    const plans = [];

    (chapterTracker || []).forEach(entry => {
        if (!entry || !entry.chapter) return;
        const sourceDate = getSpacedRevisionChapterSourceDate(entry);
        if (Number.isNaN(sourceDate.getTime())) return;
        SPACED_REVISION_DAYS.forEach(day => {
            const due = new Date(sourceDate);
            due.setDate(due.getDate() + day);
            plans.push({
                text: `Spaced Revision D+${day}: ${entry.subject || 'General'} - ${entry.chapter}`,
                subject: entry.subject || 'General',
                dueDate: toDateInputValue(due),
                priority: day <= 3 ? 'high' : 'medium',
                difficulty: 'medium',
                examWeight: 3,
                estimatedHours: 0.5
            });
        });
    });

    (mistakeNotebook || [])
        .filter(entry => !entry.masteredAt)
        .forEach(entry => {
            const sourceDate = getSpacedRevisionMistakeSourceDate(entry);
            if (Number.isNaN(sourceDate.getTime())) return;
            const q = String(entry.question || '').trim();
            const compactQuestion = q.length > 70 ? `${q.slice(0, 67)}...` : q;
            SPACED_REVISION_DAYS.forEach(day => {
                const due = new Date(sourceDate);
                due.setDate(due.getDate() + day);
                plans.push({
                    text: `Spaced Revision D+${day}: ${entry.subject || 'General'} - Mistake: ${compactQuestion}`,
                    subject: entry.subject || 'General',
                    dueDate: toDateInputValue(due),
                    priority: day <= 3 ? 'high' : 'medium',
                    difficulty: 'hard',
                    examWeight: 4,
                    estimatedHours: 0.5
                });
            });
        });

    return plans;
}

function autoScheduleSpacedRevisionTasks(options = {}) {
    const silent = Boolean(options.silent);
    const today = toDateInputValue(new Date());
    const plans = buildSpacedRevisionBlueprints()
        .filter(item => item.dueDate && item.dueDate >= today);
    if (plans.length === 0) {
        if (!silent) alert('No chapter/mistake entries available for spaced revision scheduling.');
        return 0;
    }

    let created = 0;
    plans.forEach(plan => {
        const exists = tasks.some(task =>
            String(task.text || '').trim() === String(plan.text || '').trim() &&
            String(task.dueDate || '') === String(plan.dueDate || '')
        );
        if (exists) return;
        tasks.push({
            text: plan.text,
            subject: plan.subject,
            priority: plan.priority,
            difficulty: plan.difficulty,
            examWeight: plan.examWeight,
            estimatedHours: plan.estimatedHours,
            dueDate: plan.dueDate,
            done: false,
            doneAt: '',
            createdAt: new Date().toISOString()
        });
        created += 1;
    });

    if (created > 0) {
        saveTasks();
        renderTasks();
        renderDashboard();
        if (!silent) {
            addActivity('calendar-check', 'Spaced Revision Scheduled', `${created} revision task(s) auto-created`);
        }
    }
    return created;
}

function getUpcomingSpacedRevisionTasks(limit = 16) {
    const today = toDateInputValue(new Date());
    return tasks
        .filter(task => !task.done)
        .filter(task => String(task.text || '').startsWith('Spaced Revision D+'))
        .filter(task => String(task.dueDate || '') >= today)
        .sort((a, b) => {
            const dueCmp = String(a.dueDate || '').localeCompare(String(b.dueDate || ''));
            if (dueCmp !== 0) return dueCmp;
            return String(a.text || '').localeCompare(String(b.text || ''));
        })
        .slice(0, Math.max(1, limit));
}

function renderSpacedRevisionCalendar() {
    const summaryEl = document.getElementById('spacedRevisionSummary');
    const listEl = document.getElementById('spacedRevisionList');
    if (!summaryEl || !listEl) return;

    const upcoming = getUpcomingSpacedRevisionTasks(16);
    if (upcoming.length === 0) {
        summaryEl.textContent = 'Auto-schedules revision at D+1, D+3, D+7, D+14 for chapters and mistakes.';
        listEl.innerHTML = '<li class="empty-state">No spaced revision tasks yet.</li>';
        return;
    }

    summaryEl.textContent = `${upcoming.length} upcoming spaced revision task(s).`;
    listEl.innerHTML = upcoming.map(task => `
        <li>
            <strong>${escapeHtml(task.text)}</strong>
            <span>${escapeHtml(task.subject || 'General')} | Due ${escapeHtml(task.dueDate || '')}</span>
        </li>
    `).join('');
}

function runSpacedRevisionScheduler() {
    const created = autoScheduleSpacedRevisionTasks({ silent: false });
    renderSpacedRevisionCalendar();
    renderCalendar();
    if (created > 0) {
        alert(`${created} spaced revision task(s) scheduled.`);
    } else {
        alert('No new spaced revision tasks were needed.');
    }
}

function renderCalendar() {
    autoScheduleSpacedRevisionTasks({ silent: true });
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
    renderSpacedRevisionCalendar();
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
function getDueFlashcardIndexes(deckName, now = new Date()) {
    const cards = flashcards[deckName] || [];
    const nowMs = now.getTime();
    const due = [];
    cards.forEach((card, index) => {
        const dueMs = Date.parse(card.nextReviewAt || 0);
        if (!Number.isFinite(dueMs) || dueMs <= nowMs) due.push(index);
    });
    return due;
}

function getDueTodayFlashcardIndexes(deckName, now = new Date()) {
    const cards = flashcards[deckName] || [];
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    todayEnd.setMilliseconds(todayEnd.getMilliseconds() - 1);
    const startMs = todayStart.getTime();
    const endMs = todayEnd.getTime();
    const dueToday = [];

    cards.forEach((card, index) => {
        const dueMs = Date.parse(card && card.nextReviewAt ? card.nextReviewAt : "");
        if (Number.isFinite(dueMs) && dueMs >= startMs && dueMs <= endMs) {
            dueToday.push(index);
        }
    });

    return dueToday;
}

function getFlashcardDueBuckets(deckName, now = new Date()) {
    const cards = flashcards[deckName] || [];
    const dueNow = getDueFlashcardIndexes(deckName, now);
    const dueToday = getDueTodayFlashcardIndexes(deckName, now);
    return {
        total: cards.length,
        dueNow,
        dueToday,
        upcoming: Math.max(0, cards.length - dueNow.length)
    };
}

function buildStudyQueue(deckName, mode = "due") {
    const cards = flashcards[deckName] || [];
    const dueIndexes = getDueFlashcardIndexes(deckName);
    const dueTodayIndexes = getDueTodayFlashcardIndexes(deckName);

    if (mode === "all") {
        flashcardStudyMode = "all";
        return cards.map((_, idx) => idx);
    }

    if (mode === "due-today") {
        flashcardStudyMode = "due-today";
        return dueTodayIndexes;
    }

    if (dueIndexes.length > 0) {
        flashcardStudyMode = "due";
        return dueIndexes;
    }

    flashcardStudyMode = "all";
    return cards.map((_, idx) => idx);
}

function getCurrentFlashcardRef() {
    if (!currentDeck || !flashcards[currentDeck]) return null;
    if (!Array.isArray(flashcardStudyQueue) || flashcardStudyQueue.length === 0) return null;
    const cardIndex = flashcardStudyQueue[currentFlashcardIndex];
    if (!Number.isFinite(cardIndex) || !flashcards[currentDeck][cardIndex]) return null;
    return {
        deck: currentDeck,
        cardIndex,
        card: flashcards[currentDeck][cardIndex]
    };
}

function setFlashcardReviewButtonsEnabled(enabled) {
    document.querySelectorAll('.flashcard-review-btn').forEach(btn => {
        btn.disabled = !enabled;
    });
}

function setFlashcardStudyModeSelectValue(mode) {
    const modeSelect = document.getElementById('flashcardStudyModeSelect');
    if (!modeSelect) return;
    if (modeSelect.value !== mode) modeSelect.value = mode;
}

function renderFlashcardSummary(deckName) {
    const dueNowEl = document.getElementById('flashcardDueNowCount');
    const dueTodayEl = document.getElementById('flashcardDueTodayCount');
    const upcomingEl = document.getElementById('flashcardUpcomingCount');
    if (!dueNowEl || !dueTodayEl || !upcomingEl) return;

    if (!deckName || !flashcards[deckName]) {
        dueNowEl.textContent = 'Due now: 0';
        dueTodayEl.textContent = 'Due today: 0';
        upcomingEl.textContent = 'Upcoming: 0';
        return;
    }

    const buckets = getFlashcardDueBuckets(deckName);
    dueNowEl.textContent = `Due now: ${buckets.dueNow.length}`;
    dueTodayEl.textContent = `Due today: ${buckets.dueToday.length}`;
    upcomingEl.textContent = `Upcoming: ${buckets.upcoming}`;
}

function formatRelativeReviewTime(dateLike, now = new Date()) {
    const target = new Date(dateLike);
    const targetMs = target.getTime();
    if (!Number.isFinite(targetMs)) return "unscheduled";

    const diffMs = targetMs - now.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    if (diffMins <= 0) return "now";
    if (diffMins < 60) return `in ${diffMins} min`;

    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `in ${diffHours} hr`;

    const diffDays = Math.round(diffHours / 24);
    return `in ${diffDays} day${diffDays === 1 ? "" : "s"}`;
}

function updateFlashcardNextReviewInfo(card) {
    const infoEl = document.getElementById('flashcardNextReviewInfo');
    if (!infoEl) return;
    if (!card) {
        infoEl.textContent = 'Next review: --';
        return;
    }

    const nextAt = card.nextReviewAt ? new Date(card.nextReviewAt) : null;
    if (!nextAt || !Number.isFinite(nextAt.getTime())) {
        infoEl.textContent = 'Next review: unscheduled';
        return;
    }

    const absolute = nextAt.toLocaleString();
    const relative = formatRelativeReviewTime(nextAt);
    infoEl.textContent = `Next review: ${absolute} (${relative})`;
}

function getNextIntervalFromRating(card, rating) {
    const previousInterval = Math.max(0, Number(card.intervalDays) || 0);
    const previousEase = Math.max(1.3, Number(card.ease) || 2.5);
    const reviewCount = Math.max(0, Number(card.reviewCount) || 0);
    const lapses = Math.max(0, Number(card.lapses) || 0);
    let intervalDays = previousInterval;
    let ease = previousEase;
    let nextReviewMinutes = 0;

    if (rating === "again") {
        intervalDays = 0;
        ease = Math.max(1.3, previousEase - 0.2);
        nextReviewMinutes = 10;
    } else if (rating === "hard") {
        intervalDays = previousInterval <= 1 ? 1 : Math.max(1, Math.round(previousInterval * 1.2));
        ease = Math.max(1.3, previousEase - 0.15);
    } else if (rating === "easy") {
        intervalDays = previousInterval === 0
            ? 4
            : Math.max(2, Math.round(previousInterval * previousEase * 1.35));
        ease = Math.min(3.5, previousEase + 0.15);
    } else {
        intervalDays = previousInterval === 0
            ? 2
            : Math.max(1, Math.round(previousInterval * previousEase));
    }

    if (reviewCount > 0 && rating !== "again" && lapses > 0) {
        intervalDays = Math.max(1, Math.round(intervalDays * 0.9));
    }

    return {
        intervalDays,
        ease: Math.round(ease * 100) / 100,
        nextReviewMinutes
    };
}

function reviewCurrentFlashcard(rating) {
    const ref = getCurrentFlashcardRef();
    if (!ref) return;

    const acceptedRatings = new Set(["again", "hard", "good", "easy"]);
    const safeRating = acceptedRatings.has(rating) ? rating : "good";
    const now = new Date();
    const schedule = getNextIntervalFromRating(ref.card, safeRating);
    const nextDate = new Date(now);
    if (schedule.nextReviewMinutes > 0) {
        nextDate.setMinutes(nextDate.getMinutes() + schedule.nextReviewMinutes);
    } else {
        nextDate.setDate(nextDate.getDate() + schedule.intervalDays);
    }

    flashcards[ref.deck][ref.cardIndex] = {
        ...ref.card,
        intervalDays: schedule.intervalDays,
        ease: schedule.ease,
        reviewCount: (Number(ref.card.reviewCount) || 0) + 1,
        lapses: (Number(ref.card.lapses) || 0) + (safeRating === "again" ? 1 : 0),
        lastReviewedAt: now.toISOString(),
        nextReviewAt: nextDate.toISOString()
    };
    updateFlashcardNextReviewInfo(flashcards[ref.deck][ref.cardIndex]);

    if (safeRating === "again") {
        flashcardStudyQueue.push(ref.cardIndex);
    }

    weeklyStats.flashcardsReviewed++;
    saveState({ flashcards, weeklyStats });
    saveFlashcardsToBackend();
    renderFlashcardSummary(ref.deck);

    if (currentFlashcardIndex < flashcardStudyQueue.length - 1) {
        currentFlashcardIndex++;
        isFlipped = false;
        document.querySelector('.flashcard').classList.remove('flipped');
        showFlashcard();
    } else {
        flashcardStudyQueue = [];
        currentFlashcardIndex = 0;
        setFlashcardReviewButtonsEnabled(false);
        renderFlashcards();
        renderDashboard();
        alert('Review session complete.');
    }
}

function renderFlashcards() {
    const deckSelect = document.getElementById('flashcardDeck');
    const deckSelectModal = document.getElementById('flashcardDeckSelect');
    const decks = Object.keys(flashcards);
    
    let options = '<option value="">Select Deck</option>';
    decks.forEach(deck => {
        const dueCount = getDueFlashcardIndexes(deck).length;
        options += `<option value="${deck}">${deck} (${flashcards[deck].length} cards, ${dueCount} due)</option>`;
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
                <p>${flashcards[deck].length} cards | ${getDueFlashcardIndexes(deck).length} due</p>
            </div>
        `).join('');
    }
    
    flashcardStudyQueue = [];
    currentFlashcardIndex = 0;
    setFlashcardReviewButtonsEnabled(false);
    setFlashcardStudyModeSelectValue("due");
    document.getElementById('flashcardCounter').textContent = '0 / 0';
    document.getElementById('flashcardFront').innerHTML = '<p>Select a deck and click Study to start</p>';
    document.getElementById('flashcardBack').innerHTML = '<p></p>';
    updateFlashcardNextReviewInfo(null);
    renderFlashcardSummary(currentDeck);
}

function selectDeck(deck) {
    currentDeck = deck;
    currentFlashcardIndex = 0;
    flashcardStudyQueue = [];
    isFlipped = false;
    setFlashcardReviewButtonsEnabled(false);
    document.getElementById('flashcardDeck').value = deck;
    document.querySelector('.flashcard').classList.remove('flipped');
    renderFlashcardSummary(deck);
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
    flashcards[deck].push(normalizeFlashcardCard({ front, back }));
    
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

const DRILL_CARDS_BY_SUBJECT = {
    Math: [
        { type: "formula", front: "Area of triangle", back: "A = 1/2 x base x height" },
        { type: "formula", front: "Area of circle", back: "A = pi x r x r" },
        { type: "formula", front: "Circumference of circle", back: "C = 2 x pi x r" },
        { type: "formula", front: "Simple interest", back: "SI = (P x R x T) / 100" },
        { type: "formula", front: "Average", back: "Average = Sum of values / Number of values" },
        { type: "definition", front: "Prime number", back: "A number greater than 1 with exactly two factors: 1 and itself." },
        { type: "definition", front: "Rational number", back: "A number that can be written in the form p/q where q is not 0." },
        { type: "definition", front: "Linear equation", back: "An equation in which highest power of variable is 1." }
    ],
    Science: [
        { type: "formula", front: "Speed formula", back: "Speed = Distance / Time" },
        { type: "formula", front: "Density formula", back: "Density = Mass / Volume" },
        { type: "formula", front: "Ohm's Law", back: "V = I x R" },
        { type: "formula", front: "Work formula", back: "Work = Force x Displacement" },
        { type: "formula", front: "Power formula", back: "Power = Work / Time" },
        { type: "definition", front: "Photosynthesis", back: "Process by which green plants make food using sunlight, water and carbon dioxide." },
        { type: "definition", front: "Atom", back: "Smallest unit of an element that retains its chemical properties." },
        { type: "definition", front: "Ecosystem", back: "A community of living organisms interacting with each other and their environment." }
    ],
    English: [
        { type: "definition", front: "Noun", back: "A word used to name a person, place, thing or idea." },
        { type: "definition", front: "Pronoun", back: "A word used in place of a noun." },
        { type: "definition", front: "Adjective", back: "A word that describes a noun or pronoun." },
        { type: "definition", front: "Adverb", back: "A word that modifies a verb, adjective or another adverb." },
        { type: "definition", front: "Metaphor", back: "A figure of speech that compares two unlike things directly." },
        { type: "definition", front: "Simile", back: "A figure of speech comparing two things using like or as." },
        { type: "definition", front: "Tense", back: "A verb form that indicates time of action or state." },
        { type: "definition", front: "Subject-verb agreement", back: "The subject and verb must agree in number and person." }
    ],
    History: [
        { type: "definition", front: "Primary source", back: "An original historical record from the time being studied." },
        { type: "definition", front: "Secondary source", back: "A source that interprets or analyzes primary sources." },
        { type: "definition", front: "Nationalism", back: "A sense of shared identity and loyalty toward a nation." },
        { type: "definition", front: "Colonialism", back: "Control of one country by another for political and economic gain." },
        { type: "definition", front: "Reform movement", back: "An organized effort to improve social, political or religious systems." },
        { type: "definition", front: "Industrialization", back: "Shift from hand production to machine-based manufacturing." },
        { type: "definition", front: "Revolution", back: "A major and often sudden change in political power or social structure." },
        { type: "definition", front: "Constitution", back: "A fundamental set of rules and principles for governing a state." }
    ],
    Geography: [
        { type: "formula", front: "Population density", back: "Population density = Total population / Land area" },
        { type: "definition", front: "Latitude", back: "Imaginary lines measured east-west used to locate places north or south of the Equator." },
        { type: "definition", front: "Longitude", back: "Imaginary lines measured north-south used to locate places east or west of Prime Meridian." },
        { type: "definition", front: "Climate", back: "Average weather conditions of a place over a long period." },
        { type: "definition", front: "Weathering", back: "Breaking down of rocks at Earth's surface by natural processes." },
        { type: "definition", front: "Erosion", back: "Removal and transport of soil or rock by water, wind or ice." },
        { type: "definition", front: "Plate tectonics", back: "Theory that Earth's crust is made of moving plates." },
        { type: "definition", front: "Natural resource", back: "Materials from nature used by humans, such as water, forests and minerals." }
    ],
    Programming: [
        { type: "definition", front: "Variable", back: "A named storage location for data in a program." },
        { type: "definition", front: "Function", back: "A reusable block of code that performs a specific task." },
        { type: "definition", front: "Loop", back: "A control structure that repeats instructions while a condition is true." },
        { type: "definition", front: "Array", back: "A data structure that stores multiple values in an ordered list." },
        { type: "definition", front: "Conditional statement", back: "A statement that runs code only if a condition is met." },
        { type: "definition", front: "Algorithm", back: "A step-by-step procedure to solve a problem." },
        { type: "definition", front: "Debugging", back: "The process of finding and fixing errors in code." },
        { type: "definition", front: "Syntax", back: "The set of rules that defines valid code structure in a language." }
    ]
};

function setDrillCardsStatus(message, tone = "neutral") {
    const statusEl = document.getElementById('drillCardsStatus');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('success', 'warning');
    if (tone === 'success') statusEl.classList.add('success');
    if (tone === 'warning') statusEl.classList.add('warning');
}

function generateSubjectDrillCards() {
    const subject = document.getElementById('drillSubjectSelect')?.value || 'Math';
    const drillType = document.getElementById('drillTypeSelect')?.value || 'mixed';
    const requestedCount = Math.max(3, Math.min(20, Number(document.getElementById('drillCountSelect')?.value || 10)));

    const library = Array.isArray(DRILL_CARDS_BY_SUBJECT[subject]) ? DRILL_CARDS_BY_SUBJECT[subject] : [];
    if (library.length === 0) {
        setDrillCardsStatus(`No drill library available for ${subject}.`, 'warning');
        return;
    }

    const filtered = drillType === 'mixed'
        ? library
        : library.filter(item => item.type === drillType);
    if (filtered.length === 0) {
        setDrillCardsStatus(`No ${drillType} cards available for ${subject}.`, 'warning');
        return;
    }

    const deckName = `${subject} ${drillType === 'mixed' ? 'Drill' : drillType === 'formula' ? 'Formula Drill' : 'Definition Drill'}`;
    if (!flashcards[deckName]) flashcards[deckName] = [];

    const existingKeys = new Set(
        flashcards[deckName].map(card =>
            `${String(card.front || '').trim().toLowerCase()}||${String(card.back || '').trim().toLowerCase()}`
        )
    );

    let added = 0;
    shuffleArray(filtered).forEach((item) => {
        if (added >= requestedCount) return;
        const front = String(item.front || '').trim();
        const back = String(item.back || '').trim();
        if (!front || !back) return;
        const key = `${front.toLowerCase()}||${back.toLowerCase()}`;
        if (existingKeys.has(key)) return;
        existingKeys.add(key);
        flashcards[deckName].push(normalizeFlashcardCard({ front, back }));
        added += 1;
    });

    saveState({ flashcards });
    saveFlashcardsToBackend();
    renderFlashcards();
    selectDeck(deckName);
    setFlashcardStudyModeSelectValue('all');
    startStudy('all');

    if (added === 0) {
        setDrillCardsStatus(`${deckName} already has these cards. No new cards added.`, 'warning');
    } else {
        setDrillCardsStatus(`Added ${added} new cards to "${deckName}". Session started.`, 'success');
        addActivity('bolt', 'Drill Cards Generated', `${deckName}: +${added}`);
    }
}

function startStudy(modeOverride = "") {
    if (!currentDeck || !flashcards[currentDeck] || flashcards[currentDeck].length === 0) {
        alert('Please select a deck first!');
        return;
    }

    const modeSelect = document.getElementById('flashcardStudyModeSelect');
    const requestedMode = modeOverride || (modeSelect ? modeSelect.value : "due");
    flashcardStudyQueue = buildStudyQueue(currentDeck, requestedMode);
    if (flashcardStudyQueue.length === 0) {
        alert(requestedMode === "due-today" ? 'No flashcards due today in this deck.' : 'No cards available in this deck.');
        return;
    }
    currentFlashcardIndex = 0;
    isFlipped = false;
    setFlashcardReviewButtonsEnabled(true);
    setFlashcardStudyModeSelectValue(flashcardStudyMode);
    document.querySelector('.flashcard').classList.remove('flipped');
    showFlashcard();
}

function showFlashcard() {
    const ref = getCurrentFlashcardRef();
    if (!ref) return;
    const card = ref.card;
    document.getElementById('flashcardFront').innerHTML = `<p>${card.front}</p>`;
    document.getElementById('flashcardBack').innerHTML = `<p>${card.back}</p>`;
    updateFlashcardNextReviewInfo(card);
    const dueCount = getDueFlashcardIndexes(currentDeck).length;
    const modeLabel = flashcardStudyMode === "due"
        ? "Due Session"
        : flashcardStudyMode === "due-today"
            ? "Due Today Session"
            : "All Cards";
    document.getElementById('flashcardCounter').textContent = `${currentFlashcardIndex + 1} / ${flashcardStudyQueue.length} | ${modeLabel} | ${dueCount} due`;
}

function flipFlashcard() {
    isFlipped = !isFlipped;
    document.querySelector('.flashcard').classList.toggle('flipped', isFlipped);
}

function prevFlashcard() {
    if (flashcardStudyQueue.length > 0 && currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        isFlipped = false;
        document.querySelector('.flashcard').classList.remove('flipped');
        showFlashcard();
    }
}

function nextFlashcard() {
    if (currentDeck && flashcards[currentDeck] && flashcardStudyQueue.length > 0 && currentFlashcardIndex < flashcardStudyQueue.length - 1) {
        currentFlashcardIndex++;
        isFlipped = false;
        document.querySelector('.flashcard').classList.remove('flipped');
        showFlashcard();
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

function getWeeklySubjectFocusData() {
    const now = new Date();
    const from = new Date(now);
    from.setDate(now.getDate() - 6);
    from.setHours(0, 0, 0, 0);

    const bySubject = new Map();
    pomodoroSessions
        .filter(session => session.type === 'Focus')
        .filter(session => new Date(session.date) >= from)
        .forEach(session => {
            const subject = session.subject || 'General';
            const next = (bySubject.get(subject) || 0) + (Number(session.minutes) || 0);
            bySubject.set(subject, next);
        });

    return [...bySubject.entries()]
        .map(([subject, minutes]) => ({
            subject,
            hours: Math.round((minutes / 60) * 10) / 10
        }))
        .sort((a, b) => b.hours - a.hours)
        .slice(0, 8);
}

function getAnalyticsTrendSubjectOptions() {
    const fromSessions = pomodoroSessions
        .filter(session => session.type === 'Focus')
        .map(session => String(session.subject || '').trim())
        .filter(Boolean);
    return [...new Set(fromSessions)].sort((a, b) => a.localeCompare(b));
}

function renderAnalyticsTrendSubjectOptions() {
    const select = document.getElementById('analyticsTrendSubjectSelect');
    if (!select) return;
    const options = getAnalyticsTrendSubjectOptions();
    select.innerHTML = ['<option value="all">All Subjects</option>', ...options.map(subject => `<option value="${subject}">${subject}</option>`)].join('');
    select.value = options.includes(analyticsTrendSubject) ? analyticsTrendSubject : 'all';
    analyticsTrendSubject = select.value;
}

function setAnalyticsTrendSubject(value) {
    analyticsTrendSubject = String(value || 'all');
    renderAnalytics();
}

function getSubjectTrendData(subject = "all") {
    const labels = [];
    const values = [];
    const now = new Date();
    for (let offset = 6; offset >= 0; offset--) {
        const day = new Date(now);
        day.setHours(0, 0, 0, 0);
        day.setDate(day.getDate() - offset);
        const nextDay = new Date(day);
        nextDay.setDate(nextDay.getDate() + 1);

        labels.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
        const minutes = pomodoroSessions
            .filter(session => session.type === 'Focus')
            .filter(session => subject === 'all' || (session.subject || 'General') === subject)
            .filter(session => {
                const sessionDate = new Date(session.date);
                return sessionDate >= day && sessionDate < nextDay;
            })
            .reduce((sum, session) => sum + (Number(session.minutes) || 0), 0);
        values.push(Math.round((minutes / 60) * 10) / 10);
    }
    return { labels, values };
}

function renderAnalyticsCharts(completed, pending) {
    if (typeof Chart === 'undefined') return;

    const trendCanvas = document.getElementById('progressTrendChart');
    const splitCanvas = document.getElementById('completionSplitChart');
    const subjectCanvas = document.getElementById('subjectFocusChart');
    const subjectTrendCanvas = document.getElementById('subjectTrendChart');
    if (!trendCanvas || !splitCanvas || !subjectCanvas || !subjectTrendCanvas) return;
    renderAnalyticsTrendSubjectOptions();

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

    const subjectData = getWeeklySubjectFocusData();
    if (subjectFocusChartInstance) subjectFocusChartInstance.destroy();
    subjectFocusChartInstance = new Chart(subjectCanvas, {
        type: 'bar',
        data: {
            labels: subjectData.length > 0 ? subjectData.map(item => item.subject) : ['No focus sessions'],
            datasets: [{
                label: 'Focus Hours (Last 7 days)',
                data: subjectData.length > 0 ? subjectData.map(item => item.hours) : [0],
                backgroundColor: '#f59e0b'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const subjectTrend = getSubjectTrendData(analyticsTrendSubject);
    if (subjectTrendChartInstance) subjectTrendChartInstance.destroy();
    subjectTrendChartInstance = new Chart(subjectTrendCanvas, {
        type: 'line',
        data: {
            labels: subjectTrend.labels,
            datasets: [{
                label: analyticsTrendSubject === 'all'
                    ? 'All Subjects Focus Hours'
                    : `${analyticsTrendSubject} Focus Hours`,
                data: subjectTrend.values,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.18)',
                tension: 0.35,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
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
    renderTimerSubjectOptions();
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
function mergeFreeNotesForView() {
    const merged = [];
    const seen = new Set();

    for (const note of sharedFreeNotes) {
        if (!note || !note.id || seen.has(note.id)) continue;
        seen.add(note.id);
        merged.push({ ...note, isShared: true });
    }

    for (const note of freeNotesLibrary) {
        if (!note || !note.id || seen.has(note.id)) continue;
        seen.add(note.id);
        merged.push({ ...note, isShared: false });
    }

    return merged;
}

async function fetchSharedFreeNotes(force = false) {
    if (sharedFreeNotesLoading) return;
    if (!force && sharedFreeNotesLoaded) return;
    if (!isBackendFetchAllowed()) return;

    sharedFreeNotesLoading = true;
    try {
        const response = await fetch(`${API_BASE_URL}/api/shared-notes`);
        if (!response.ok) return;
        const data = await response.json().catch(() => []);
        sharedFreeNotes = Array.isArray(data) ? data : [];
        sharedFreeNotesLoaded = true;
        renderFreeNotes();
    } catch (_) {
        suspendBackendFetch(30000);
    } finally {
        sharedFreeNotesLoading = false;
    }
}

function renderFreeNotes() {
    const list = document.getElementById('freeNotesList');
    const searchInput = document.getElementById('freeNotesSearchInput');
    const filterSelect = document.getElementById('freeNotesFilterSubject');
    if (!list) return;
    if (!sharedFreeNotesLoaded) {
        fetchSharedFreeNotes();
    }
    if (searchInput) searchInput.value = freeNotesSearchQuery;
    if (filterSelect) filterSelect.value = freeNotesFilterSubject;

    const notesForView = mergeFreeNotesForView();
    const query = freeNotesSearchQuery.trim().toLowerCase();
    const filtered = notesForView.filter(note => {
        const subjectMatch = freeNotesFilterSubject === 'all' || note.subject === freeNotesFilterSubject;
        const queryMatch = !query
            || String(note.title || '').toLowerCase().includes(query)
            || String(note.subject || '').toLowerCase().includes(query)
            || String(note.level || '').toLowerCase().includes(query)
            || String(note.content || '').toLowerCase().includes(query);
        return subjectMatch && queryMatch;
    });

    if (filtered.length === 0) {
        list.innerHTML = notesForView.length === 0
            ? '<li class="empty-state">No notes available yet</li>'
            : '<li class="empty-state">No notes match your search</li>';
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
                ${note.isShared ? '<span class="task-subject">Shared</span>' : ''}
            </div>
            <p class="assignment-desc">${String(note.content || '').slice(0, 220)}${String(note.content || '').length > 220 ? '...' : ''}</p>
            <div class="task-options">
                <button class="action-btn" type="button" onclick="downloadNoteDoc('${note.id}')">
                    <i class="fas fa-file-arrow-down"></i> Download DOC
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

function updateVoiceNoteUI(statusText, isRecording) {
    const statusEl = document.getElementById('voiceNoteStatus');
    const startBtn = document.getElementById('voiceNoteStartBtn');
    const stopBtn = document.getElementById('voiceNoteStopBtn');
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.classList.toggle('recording', Boolean(isRecording));
    }
    if (startBtn) startBtn.disabled = Boolean(isRecording);
    if (stopBtn) stopBtn.disabled = !isRecording;
}

function appendVoiceTextToNote(text) {
    const contentInput = document.getElementById('freeNoteContentInput');
    if (!contentInput) return;
    const current = String(contentInput.value || '').trim();
    const cleaned = String(text || '').trim();
    if (!cleaned) return;

    const point = `- ${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
    contentInput.value = current ? `${current}\n${point}` : point;
}

function stopVoiceNoteCapture() {
    if (voiceNoteRecognition && voiceNoteListening) {
        voiceNoteRecognition.stop();
    }
    voiceNoteListening = false;
    updateVoiceNoteUI('Ready', false);
}

function startVoiceNoteCapture() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Voice capture is not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    if (voiceNoteListening) return;
    if (voiceFlashcardListening) stopVoiceFlashcardCapture();

    voiceNoteRecognition = new SpeechRecognition();
    voiceNoteRecognition.lang = 'en-US';
    voiceNoteRecognition.interimResults = true;
    voiceNoteRecognition.maxAlternatives = 1;
    voiceNoteRecognition.continuous = true;

    let transcriptBuffer = '';

    voiceNoteRecognition.onstart = () => {
        voiceNoteListening = true;
        updateVoiceNoteUI('Listening...', true);
    };

    voiceNoteRecognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = String(event.results[i][0].transcript || '').trim();
            if (!transcript) continue;
            if (event.results[i].isFinal) {
                transcriptBuffer = `${transcriptBuffer} ${transcript}`.trim();
                appendVoiceTextToNote(transcript);
            } else {
                interim = transcript;
            }
        }
        const previewText = interim || transcriptBuffer;
        updateVoiceNoteUI(previewText ? `Listening... ${previewText.slice(0, 50)}` : 'Listening...', true);
    };

    voiceNoteRecognition.onerror = () => {
        voiceNoteListening = false;
        updateVoiceNoteUI('Voice capture error', false);
    };

    voiceNoteRecognition.onend = () => {
        voiceNoteListening = false;
        updateVoiceNoteUI('Ready', false);
    };

    try {
        voiceNoteRecognition.start();
    } catch (_) {
        updateVoiceNoteUI('Unable to start mic', false);
    }
}

function updateVoiceFlashUI(statusText, isRecording) {
    const statusEl = document.getElementById('voiceFlashStatus');
    const startBtn = document.getElementById('voiceFlashStartBtn');
    const stopBtn = document.getElementById('voiceFlashStopBtn');
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.classList.toggle('recording', Boolean(isRecording));
    }
    if (startBtn) startBtn.disabled = Boolean(isRecording);
    if (stopBtn) stopBtn.disabled = !isRecording;
}

function appendVoiceTextToFlashTranscript(text) {
    const transcriptEl = document.getElementById('voiceFlashTranscriptInput');
    if (!transcriptEl) return;
    const cleaned = String(text || '').trim();
    if (!cleaned) return;
    const current = String(transcriptEl.value || '').trim();
    transcriptEl.value = current ? `${current}\n${cleaned}` : cleaned;
}

function stopVoiceFlashcardCapture() {
    if (voiceNoteRecognition && voiceFlashcardListening) {
        voiceNoteRecognition.stop();
    }
    voiceFlashcardListening = false;
    updateVoiceFlashUI('Ready', false);
}

function startVoiceFlashcardCapture() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Voice capture is not supported in this browser. Please use Chrome or Edge.');
        return;
    }
    if (voiceFlashcardListening) return;
    if (voiceNoteListening) stopVoiceNoteCapture();

    voiceNoteRecognition = new SpeechRecognition();
    voiceNoteRecognition.lang = 'en-US';
    voiceNoteRecognition.interimResults = true;
    voiceNoteRecognition.maxAlternatives = 1;
    voiceNoteRecognition.continuous = true;

    let transcriptBuffer = '';

    voiceNoteRecognition.onstart = () => {
        voiceFlashcardListening = true;
        updateVoiceFlashUI('Listening...', true);
    };

    voiceNoteRecognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = String(event.results[i][0].transcript || '').trim();
            if (!transcript) continue;
            if (event.results[i].isFinal) {
                transcriptBuffer = `${transcriptBuffer} ${transcript}`.trim();
                appendVoiceTextToFlashTranscript(transcript);
            } else {
                interim = transcript;
            }
        }
        const previewText = interim || transcriptBuffer;
        updateVoiceFlashUI(previewText ? `Listening... ${previewText.slice(0, 50)}` : 'Listening...', true);
    };

    voiceNoteRecognition.onerror = () => {
        voiceFlashcardListening = false;
        updateVoiceFlashUI('Voice capture error', false);
    };

    voiceNoteRecognition.onend = () => {
        voiceFlashcardListening = false;
        updateVoiceFlashUI('Ready', false);
    };

    try {
        voiceNoteRecognition.start();
    } catch (_) {
        updateVoiceFlashUI('Unable to start mic', false);
    }
}

function clearVoiceFlashTranscript() {
    const transcriptEl = document.getElementById('voiceFlashTranscriptInput');
    if (transcriptEl) transcriptEl.value = '';
    updateVoiceFlashUI('Ready', false);
}

function toSentenceCase(text) {
    const value = String(text || '').trim();
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function sanitizeVoiceLine(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .replace(/^[\-*\d\.\)\s]+/, '')
        .trim();
}

function buildFlashcardFromVoiceLine(line, subject) {
    const cleaned = sanitizeVoiceLine(line);
    if (!cleaned || cleaned.length < 8) return null;
    const sentence = cleaned.replace(/[;]+$/g, '').trim();

    const colonIdx = sentence.indexOf(':');
    if (colonIdx > 1 && colonIdx < sentence.length - 2) {
        const left = sentence.slice(0, colonIdx).trim();
        const right = sentence.slice(colonIdx + 1).trim();
        if (left && right) {
            const front = /[?]$/.test(left) ? left : `${toSentenceCase(left)}?`;
            const back = toSentenceCase(right);
            return { front, back };
        }
    }

    const definitional = sentence.match(/^(.{2,90})\s+(is|are|means|refers to|can be defined as)\s+(.{3,240})$/i);
    if (definitional) {
        const term = toSentenceCase(definitional[1].trim().replace(/[,.!?]$/g, ''));
        const back = toSentenceCase(sentence);
        const front = `What is ${term}?`;
        return { front, back };
    }

    const words = sentence.split(' ').filter(Boolean);
    const cue = words.slice(0, Math.min(7, words.length)).join(' ');
    const front = `Explain: ${toSentenceCase(cue)}${words.length > 7 ? '...' : ''}`;
    const back = toSentenceCase(sentence);
    return { front, back };
}

function convertVoiceNotesToFlashcards() {
    if (voiceFlashcardListening) {
        stopVoiceFlashcardCapture();
    }

    const transcriptEl = document.getElementById('voiceFlashTranscriptInput');
    const deckInput = document.getElementById('voiceFlashDeckInput');
    const subjectSelect = document.getElementById('voiceFlashSubjectSelect');
    const selectedDeck = document.getElementById('flashcardDeck')?.value || '';
    const subject = String(subjectSelect?.value || 'General');
    const transcript = String(transcriptEl?.value || '').trim();
    if (!transcript) {
        alert('Capture or type some short notes first.');
        return;
    }

    const deckName = String(deckInput?.value || '').trim() || selectedDeck || `${subject} Voice Notes`;
    if (!flashcards[deckName]) flashcards[deckName] = [];

    const existingKeys = new Set(
        flashcards[deckName].map(card =>
            `${String(card.front || '').trim().toLowerCase()}||${String(card.back || '').trim().toLowerCase()}`
        )
    );

    const segments = transcript
        .split(/\n|[.!?]+/g)
        .map(sanitizeVoiceLine)
        .filter(Boolean);

    let added = 0;
    segments.forEach(segment => {
        const qa = buildFlashcardFromVoiceLine(segment, subject);
        if (!qa || !qa.front || !qa.back) return;
        const key = `${qa.front.toLowerCase()}||${qa.back.toLowerCase()}`;
        if (existingKeys.has(key)) return;
        existingKeys.add(key);
        flashcards[deckName].push(normalizeFlashcardCard({ front: qa.front, back: qa.back }));
        added += 1;
    });

    if (added === 0) {
        alert('No new flashcards generated (content may be too short or already exists).');
        return;
    }

    saveState({ flashcards });
    saveFlashcardsToBackend();
    renderFlashcards();
    selectDeck(deckName);
    if (deckInput) deckInput.value = deckName;
    updateVoiceFlashUI(`Created ${added} flashcards`, false);
    addActivity('microphone-lines', 'Voice Notes Converted', `${deckName}: +${added} flashcards`);
}

async function addFreeNote() {
    if (voiceNoteListening) {
        stopVoiceNoteCapture();
    }

    const title = document.getElementById('freeNoteTitleInput')?.value.trim();
    const subject = document.getElementById('freeNoteSubjectInput')?.value || 'General';
    const level = document.getElementById('freeNoteLevelInput')?.value.trim() || 'General';
    const content = document.getElementById('freeNoteContentInput')?.value.trim();

    if (!title || !content) {
        alert('Please enter note title and content.');
        return;
    }

    const newNote = {
        id: `note-pack-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        subject,
        level,
        content,
        createdAt: new Date().toISOString()
    };

    if (canManageSharedNotes()) {
        let published = false;
        try {
            const response = await fetch(`${API_BASE_URL}/api/shared-notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getBackendAuthHeaders()
                },
                body: JSON.stringify(newNote)
            });
            if (response.ok) {
                const saved = await response.json().catch(() => null);
                if (saved && saved.id) {
                    sharedFreeNotes.unshift(saved);
                    sharedFreeNotesLoaded = true;
                    published = true;
                    addActivity('file-circle-plus', 'Shared Note Published', title);
                }
            }
        } catch (_) {}

        if (!published) {
            freeNotesLibrary.unshift(newNote);
            saveState({ freeNotesLibrary });
            addActivity('file-circle-plus', 'Note Added (Local)', title);
            alert('Shared publish failed. Note saved only on this device/account.');
        }
    } else {
        freeNotesLibrary.unshift(newNote);
        saveState({ freeNotesLibrary });
        addActivity('file-circle-plus', 'Note Added', title);
    }

    renderFreeNotes();

    document.getElementById('freeNoteTitleInput').value = '';
    document.getElementById('freeNoteLevelInput').value = '';
    document.getElementById('freeNoteContentInput').value = '';
}

function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function downloadNoteDoc(noteId) {
    const note = mergeFreeNotesForView().find(item => item.id === noteId);
    if (!note) return;

    const safeTitle = String(note.title || 'note').replace(/[^\w\-]+/g, '_').toLowerCase();
    const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(note.title || "Note")}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; color: #1f2937; }
    h1 { margin-bottom: 8px; color: #0f766e; }
    .meta { margin-bottom: 16px; color: #475569; }
    .content { line-height: 1.6; }
  </style>
</head>
<body>
  <h1>${escapeHtml(note.title || "Note")}</h1>
  <div class="meta"><strong>Subject:</strong> ${escapeHtml(note.subject || "General")} | <strong>Level:</strong> ${escapeHtml(note.level || "General")}</div>
  <div class="content">${escapeHtml(note.content || "").replace(/\n/g, "<br>")}</div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeTitle}.doc`;
    a.click();
    URL.revokeObjectURL(url);

    addActivity('file-arrow-down', 'Note Document Downloaded', note.title);
}

async function deleteFreeNote(id) {
    const target = mergeFreeNotesForView().find(note => note.id === id);
    if (!target) return;

    if (target.isShared) {
        if (!canManageSharedNotes()) {
            alert('Only teacher/admin can delete shared notes.');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/shared-notes/${encodeURIComponent(id)}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...getBackendAuthHeaders()
                }
            });
            if (response.ok) {
                sharedFreeNotes = sharedFreeNotes.filter(note => note.id !== id);
                renderFreeNotes();
                return;
            }
        } catch (_) {}
        alert('Failed to delete shared note.');
        return;
    }

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
    { subject: "Geography", difficulty: "hard", question: "Which line roughly follows 180 deg longitude?", options: ["Prime Meridian", "Equator", "International Date Line", "Tropic of Capricorn"], answerIndex: 2 },
    { subject: "Geography", difficulty: "hard", question: "Which country has no natural rivers?", options: ["Egypt", "Saudi Arabia", "India", "Brazil"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Which current causes mild climate in Western Europe?", options: ["Labrador Current", "Gulf Stream", "Canary Current", "Benguela Current"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Ring of Fire is around which ocean?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answerIndex: 1 },
    { subject: "Geography", difficulty: "hard", question: "Which country is both in Europe and Asia?", options: ["Spain", "Turkey", "Portugal", "Norway"], answerIndex: 1 }
];

for (let i = quizQuestionBank.length - 1; i >= 0; i--) {
    if (quizQuestionBank[i].subject === "Geography") {
        quizQuestionBank.splice(i, 1);
    }
}

const QUIZ_SUBJECTS = ["Math", "Science", "English", "Programming", "History"];
const QUIZ_DIFFICULTIES = ["easy", "medium", "hard"];
const QUIZ_MIN_PER_SUBJECT_DIFFICULTY = 25;

const autoQuestionTopics = {
    Math: ["fractions", "percentages", "algebra", "geometry", "ratio", "number patterns", "equations", "integers", "probability", "measurement"],
    Science: ["matter", "atoms", "force", "energy", "cells", "ecosystem", "electricity", "acids and bases", "motion", "reactions"],
    English: ["grammar", "vocabulary", "tenses", "punctuation", "synonyms", "antonyms", "reading comprehension", "sentence structure", "parts of speech", "spelling"],
    Programming: ["variables", "loops", "functions", "arrays", "objects", "debugging", "algorithms", "conditionals", "syntax", "data types"],
    History: ["ancient civilizations", "medieval period", "freedom movements", "world wars", "constitutions", "timelines", "sources", "reforms", "leaders", "historical interpretation"]
};

function createAutoQuizQuestion(subject, difficulty, idx) {
    const topics = autoQuestionTopics[subject] || ["general knowledge"];
    const mainTopic = topics[idx % topics.length];
    const alt1 = topics[(idx + 1) % topics.length];
    const alt2 = topics[(idx + 2) % topics.length];
    const alt3 = topics[(idx + 3) % topics.length];

    const stem = `Which option is most related to "${mainTopic}"? (#${idx})`;

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
let currentQuizMode = "standard";
let currentQuizAdaptiveEnabled = true;
let mistakeNotebookFilter = "due";
let chapterSearchQuery = "";
let chapterFilterSubject = "all";
let chapterIncompleteOnly = false;
let conceptDependencySubjectFilter = "all";
const MISTAKE_RETRY_DAYS = [2, 7, 14];

function daysFromNow(days) {
    const now = new Date();
    return new Date(now.getTime() + (days * 24 * 60 * 60 * 1000)).toISOString();
}

function findMistakeNotebookEntryIndex(userEmail, question, subject) {
    const normalizedEmail = normalizeEmail(userEmail || "");
    return mistakeNotebook.findIndex(item =>
        normalizeEmail(item.userEmail) === normalizedEmail &&
        String(item.question || "").trim() === String(question || "").trim() &&
        String(item.subject || "General").trim() === String(subject || "General").trim()
    );
}

function updateQuizSessionModeLabel() {
    const label = document.getElementById('quizSessionModeLabel');
    if (!label) return;
    if (currentQuizMode === "retry") {
        label.textContent = `Mode: Retry Due Now (${currentQuizSession.length} questions)`;
        return;
    }
    label.textContent = currentQuizAdaptiveEnabled
        ? 'Mode: Adaptive Quiz (weak boosted, mastered reduced)'
        : 'Mode: Standard Quiz';
}

function isAdaptiveQuizEnabled() {
    const toggle = document.getElementById('adaptiveQuizToggle');
    if (!toggle) return true;
    return Boolean(toggle.checked);
}

function getAdaptiveTopicBuckets() {
    const weak = new Set();
    const mastered = new Set();

    Object.entries(weakTopicStats || {}).forEach(([key, item]) => {
        const attempts = Number(item && item.attempts) || 0;
        const wrong = Number(item && item.wrong) || 0;
        const wrongRate = attempts > 0 ? wrong / attempts : 0;
        if (attempts >= 2 && wrongRate >= 0.4) {
            weak.add(key);
        } else if (attempts >= 3 && wrongRate <= 0.2) {
            mastered.add(key);
        }
    });

    return { weak, mastered };
}

function getAdaptiveQuestionWeight(question, buckets) {
    const topic = extractTopicFromQuestion(question);
    const key = buildWeakTopicKey(question && question.subject, topic);
    if (buckets.weak.has(key)) return 3.4;
    if (buckets.mastered.has(key)) return 0.45;
    return 1;
}

function pickAdaptiveQuizQuestions(pool, requestedCount) {
    const selected = [];
    const available = [...pool];
    const buckets = getAdaptiveTopicBuckets();

    while (selected.length < requestedCount && available.length > 0) {
        const weights = available.map(item => getAdaptiveQuestionWeight(item, buckets));
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        if (!Number.isFinite(totalWeight) || totalWeight <= 0) {
            selected.push(...shuffleArray(available).slice(0, requestedCount - selected.length));
            break;
        }

        let roll = Math.random() * totalWeight;
        let pickedIndex = 0;
        for (let i = 0; i < weights.length; i++) {
            roll -= weights[i];
            if (roll <= 0) {
                pickedIndex = i;
                break;
            }
        }
        selected.push(available[pickedIndex]);
        available.splice(pickedIndex, 1);
    }

    return selected;
}

function buildRetryQuestionFromMistake(entry) {
    const correctAnswer = String(entry.correctAnswer || "").trim();
    const selectedAnswer = String(entry.selectedAnswer || "").trim();
    let options = Array.isArray(entry.options) ? entry.options.map(opt => String(opt || "").trim()).filter(Boolean) : [];

    if (correctAnswer && !options.includes(correctAnswer)) {
        options.push(correctAnswer);
    }
    if (selectedAnswer && !options.includes(selectedAnswer)) {
        options.push(selectedAnswer);
    }

    options = Array.from(new Set(options));
    if (options.length < 2) {
        options.push("Not sure yet");
    }
    if (options.length < 2) {
        options.push("Need to revise");
    }

    const shuffledOptions = shuffleArray(options.slice(0, 6));
    const answerIndex = Math.max(0, shuffledOptions.findIndex(opt => opt === correctAnswer));

    return {
        subject: entry.subject || "General",
        difficulty: entry.difficulty || "mixed",
        question: entry.question || "",
        options: shuffledOptions,
        answerIndex,
        mistakeId: entry.id || "",
        isRetryQuestion: true
    };
}

function generateDueMistakeRetrySession() {
    const requestedCount = Math.max(5, Math.min(25, Number(document.getElementById('quizQuestionCount')?.value || 5)));
    const subject = document.getElementById('quizSubject')?.value || 'Any';
    const now = Date.now();
    const dueEntries = getCurrentUserMistakeNotebook()
        .filter(item => !item.masteredAt)
        .filter(item => Date.parse(item.nextReviewAt || "") <= now || !item.nextReviewAt)
        .filter(item => subject === 'Any' || item.subject === subject);

    if (dueEntries.length === 0) {
        alert('No due mistakes available right now for the selected subject.');
        return;
    }

    const selectedEntries = dueEntries.slice(0, Math.min(requestedCount, dueEntries.length));
    currentQuizSession = selectedEntries.map(buildRetryQuestionFromMistake).filter(q => q.question && Array.isArray(q.options) && q.options.length >= 2);
    if (currentQuizSession.length === 0) {
        alert('Unable to generate retry quiz from due mistakes.');
        return;
    }
    currentQuizMode = "retry";
    currentQuizAdaptiveEnabled = false;
    renderQuizQuestions();
    updateQuizSessionModeLabel();
}

function logQuizMistake(question, selectedIndex) {
    const user = getCurrentUser();
    if (!user || !question) return;

    const subject = String(question.subject || "General").trim() || "General";
    const selectedAnswer = Number.isFinite(selectedIndex)
        ? String(question.options && question.options[selectedIndex] ? question.options[selectedIndex] : "").trim()
        : "";
    const correctAnswer = String(question.options && question.options[question.answerIndex] ? question.options[question.answerIndex] : "").trim();
    const wrongReason = selectedAnswer
        ? `Selected "${selectedAnswer}" instead of "${correctAnswer}".`
        : `Skipped the question. Correct answer: "${correctAnswer}".`;

    const existingIdx = findMistakeNotebookEntryIndex(user.email, question.question, subject);
    const nextReviewAt = daysFromNow(MISTAKE_RETRY_DAYS[0]);

    if (existingIdx >= 0) {
        const existing = mistakeNotebook[existingIdx];
        mistakeNotebook[existingIdx] = {
            ...existing,
            difficulty: String(question.difficulty || existing.difficulty || "mixed"),
            options: Array.isArray(question.options) ? [...question.options] : (existing.options || []),
            correctAnswer: correctAnswer || existing.correctAnswer || "",
            selectedAnswer,
            wrongReason,
            reviewStage: 0,
            wrongCount: (Number(existing.wrongCount) || 0) + 1,
            nextReviewAt,
            lastWrongAt: new Date().toISOString(),
            masteredAt: ""
        };
    } else {
        mistakeNotebook.unshift({
            id: `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            userEmail: normalizeEmail(user.email),
            subject,
            difficulty: String(question.difficulty || "mixed"),
            question: String(question.question || "").trim(),
            options: Array.isArray(question.options) ? [...question.options] : [],
            correctAnswer,
            selectedAnswer,
            wrongReason,
            reviewStage: 0,
            wrongCount: 1,
            reviewCount: 0,
            nextReviewAt,
            createdAt: new Date().toISOString(),
            lastWrongAt: new Date().toISOString(),
            lastReviewedAt: "",
            masteredAt: ""
        });
    }

    mistakeNotebook = normalizeMistakeNotebook(mistakeNotebook).slice(0, 300);
}

function getCurrentUserMistakeNotebook() {
    const user = getCurrentUser();
    if (!user || !user.email) return [];
    const userEmail = normalizeEmail(user.email);
    return mistakeNotebook
        .filter(item => normalizeEmail(item.userEmail) === userEmail)
        .sort((a, b) => {
            const aMastered = Boolean(a.masteredAt);
            const bMastered = Boolean(b.masteredAt);
            if (aMastered !== bMastered) return aMastered ? 1 : -1;
            const aDue = Date.parse(a.nextReviewAt || a.createdAt || 0);
            const bDue = Date.parse(b.nextReviewAt || b.createdAt || 0);
            return aDue - bDue;
        });
}

function formatMistakeDueText(entry) {
    if (!entry) return "No schedule";
    if (entry.masteredAt) return "Mastered";
    const dueTime = Date.parse(entry.nextReviewAt || "");
    if (!Number.isFinite(dueTime)) return "Review soon";
    const deltaMs = dueTime - Date.now();
    const deltaDays = Math.ceil(deltaMs / (24 * 60 * 60 * 1000));
    if (deltaDays <= 0) return "Due now";
    if (deltaDays === 1) return "Due in 1 day";
    return `Due in ${deltaDays} days`;
}

function getDueMistakeCountForCurrentUser() {
    const now = Date.now();
    return getCurrentUserMistakeNotebook()
        .filter(item => !item.masteredAt)
        .filter(item => Date.parse(item.nextReviewAt || "") <= now || !item.nextReviewAt)
        .length;
}

function renderMistakeDueBadges() {
    const dueCount = getDueMistakeCountForCurrentUser();
    const badgeIds = ['sidebarMistakesDueBadge', 'dashboardMistakesDueBadge'];
    badgeIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = String(dueCount);
        el.classList.toggle('zero', dueCount === 0);
        el.title = dueCount === 0
            ? 'No mistakes due now'
            : `${dueCount} mistake${dueCount === 1 ? '' : 's'} due now`;
    });
}

function openDueMistakesFromBadge(event) {
    if (event && typeof event.stopPropagation === "function") {
        event.stopPropagation();
    }
    if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
    }
    mistakeNotebookFilter = "due";
    navigateTo('student-quiz-weak');
    renderMistakeNotebook();
}

function setMistakeNotebookFilter(value) {
    const next = String(value || "due").trim().toLowerCase();
    if (!["due", "all", "mastered"].includes(next)) {
        mistakeNotebookFilter = "due";
    } else {
        mistakeNotebookFilter = next;
    }
    renderMistakeNotebook();
}

function renderMistakeNotebook() {
    const list = document.getElementById('quizMistakeNotebookList');
    const summary = document.getElementById('mistakeNotebookSummary');
    const filterSelect = document.getElementById('mistakeNotebookFilter');
    if (!list || !summary) return;
    if (filterSelect) filterSelect.value = mistakeNotebookFilter;
    renderMistakeDueBadges();

    const items = getCurrentUserMistakeNotebook();
    const now = Date.now();
    const dueItems = items.filter(item => !item.masteredAt && (Date.parse(item.nextReviewAt || "") <= now || !item.nextReviewAt));
    const masteredItems = items.filter(item => Boolean(item.masteredAt));
    const activeItems = items.filter(item => !item.masteredAt);

    let filteredItems = items;
    if (mistakeNotebookFilter === "due") {
        filteredItems = dueItems;
    } else if (mistakeNotebookFilter === "mastered") {
        filteredItems = masteredItems;
    }

    if (items.length === 0) {
        summary.textContent = 'No mistakes captured yet.';
        list.innerHTML = '<li class="empty-state">Wrong quiz answers will be saved here with retry reminders (2/7/14 days).</li>';
        return;
    }

    summary.textContent = `${activeItems.length} active | ${dueItems.length} due now | ${masteredItems.length} mastered`;

    if (filteredItems.length === 0) {
        const emptyByFilter = mistakeNotebookFilter === "mastered"
            ? 'No mastered mistakes yet.'
            : mistakeNotebookFilter === "due"
                ? 'No due mistakes right now.'
                : 'No mistakes available.';
        list.innerHTML = `<li class="empty-state">${emptyByFilter}</li>`;
        return;
    }

    list.innerHTML = filteredItems.slice(0, 20).map(item => {
        const stage = Number(item.reviewStage) || 0;
        const stageText = item.masteredAt ? 'Completed' : `Stage ${Math.min(stage + 1, MISTAKE_RETRY_DAYS.length)}/${MISTAKE_RETRY_DAYS.length}`;
        return `
            <li>
                <div class="assignment-header">
                    <span class="assignment-title">${escapeHtml(item.subject)} | ${escapeHtml(String(item.difficulty || 'mixed'))}</span>
                    <span class="assignment-type">${escapeHtml(formatMistakeDueText(item))}</span>
                </div>
                <p class="assignment-desc"><strong>Q:</strong> ${escapeHtml(item.question)}</p>
                <p class="assignment-desc"><strong>Your answer:</strong> ${escapeHtml(item.selectedAnswer || 'Not answered')}</p>
                <p class="assignment-desc"><strong>Correct answer:</strong> ${escapeHtml(item.correctAnswer || '-')}</p>
                <p class="assignment-desc"><strong>Why wrong:</strong> ${escapeHtml(item.wrongReason || 'Review concept and retry')}</p>
                <div class="assignment-meta">
                    <span>${escapeHtml(stageText)} | Wrong ${Number(item.wrongCount) || 0}x</span>
                    <span class="task-due">${item.nextReviewAt ? new Date(item.nextReviewAt).toLocaleDateString() : 'No due date'}</span>
                </div>
                <div class="task-options">
                    <button class="action-btn" onclick="markMistakeReviewCorrect('${encodeURIComponent(item.id)}')">
                        <i class="fas fa-check"></i> Reviewed Correctly
                    </button>
                    <button class="action-btn" onclick="markMistakeReviewWrong('${encodeURIComponent(item.id)}')">
                        <i class="fas fa-rotate-left"></i> Still Wrong
                    </button>
                    <button class="clear-btn" onclick="deleteMistakeEntry('${encodeURIComponent(item.id)}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </li>
        `;
    }).join('');
}

function markMistakeReviewCorrect(encodedId) {
    const id = decodeURIComponent(encodedId || "");
    const updated = updateMistakeReviewById(id, true);
    if (!updated) return;
    mistakeNotebook = normalizeMistakeNotebook(mistakeNotebook);
    saveState({ mistakeNotebook });
    renderMistakeNotebook();
    renderMistakeDueBadges();
}

function markMistakeReviewWrong(encodedId) {
    const id = decodeURIComponent(encodedId || "");
    const updated = updateMistakeReviewById(id, false);
    if (!updated) return;
    mistakeNotebook = normalizeMistakeNotebook(mistakeNotebook);
    saveState({ mistakeNotebook });
    renderMistakeNotebook();
    renderMistakeDueBadges();
}

function deleteMistakeEntry(encodedId) {
    const id = decodeURIComponent(encodedId || "");
    const before = mistakeNotebook.length;
    mistakeNotebook = mistakeNotebook.filter(item => item.id !== id);
    if (mistakeNotebook.length === before) return;
    saveState({ mistakeNotebook });
    renderMistakeNotebook();
    renderMistakeDueBadges();
}

function updateMistakeReviewById(id, isCorrect) {
    const idx = mistakeNotebook.findIndex(item => item.id === id);
    if (idx < 0) return false;

    const entry = mistakeNotebook[idx];
    const nowIso = new Date().toISOString();
    if (isCorrect) {
        const nextStage = (Number(entry.reviewStage) || 0) + 1;
        if (nextStage >= MISTAKE_RETRY_DAYS.length) {
            mistakeNotebook[idx] = {
                ...entry,
                reviewStage: MISTAKE_RETRY_DAYS.length - 1,
                reviewCount: (Number(entry.reviewCount) || 0) + 1,
                lastReviewedAt: nowIso,
                masteredAt: nowIso,
                nextReviewAt: ""
            };
            addActivity('brain', 'Mistake Mastered', `${entry.subject}: ${entry.question}`);
            return true;
        }
        mistakeNotebook[idx] = {
            ...entry,
            reviewStage: nextStage,
            reviewCount: (Number(entry.reviewCount) || 0) + 1,
            lastReviewedAt: nowIso,
            nextReviewAt: daysFromNow(MISTAKE_RETRY_DAYS[nextStage]),
            masteredAt: ""
        };
        return true;
    }

    mistakeNotebook[idx] = {
        ...entry,
        reviewStage: 0,
        wrongCount: (Number(entry.wrongCount) || 0) + 1,
        lastWrongAt: nowIso,
        masteredAt: "",
        nextReviewAt: daysFromNow(MISTAKE_RETRY_DAYS[0])
    };
    return true;
}

function generateQuizSession() {
    const subject = document.getElementById('quizSubject')?.value || 'Any';
    const difficulty = document.getElementById('quizDifficulty')?.value || 'mixed';
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

    currentQuizAdaptiveEnabled = isAdaptiveQuizEnabled();
    if (currentQuizAdaptiveEnabled) {
        currentQuizSession = pickAdaptiveQuizQuestions(pool, requestedCount);
    } else {
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        currentQuizSession = shuffled.slice(0, requestedCount);
    }
    currentQuizMode = "standard";
    renderQuizQuestions();
    updateQuizSessionModeLabel();
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
        const selectedIndex = selected ? Number(selected.value) : NaN;
        const isCorrect = Number.isFinite(selectedIndex) && selectedIndex === q.answerIndex;
        if (isCorrect) score++;
        if (q && q.mistakeId) {
            updateMistakeReviewById(q.mistakeId, isCorrect);
        } else if (!isCorrect) {
            logQuizMistake(q, selectedIndex);
        }
        trackWeakTopicAttempt(q, isCorrect);
    });
    const percent = Math.round((score / currentQuizSession.length) * 100);
    const user = getCurrentUser();
    const record = {
        id: `quiz-${Date.now()}`,
        userEmail: user ? user.email : 'unknown',
        userName: user ? user.name : 'Unknown',
        subject: document.getElementById('quizSubject')?.value || 'Any',
        score,
        total: currentQuizSession.length,
        percent,
        createdAt: new Date().toISOString()
    };
    quizScores.unshift(record);
    saveState({ quizScores, weakTopicStats, mistakeNotebook });
    document.getElementById('quizScoreResult').textContent = `${score}/${currentQuizSession.length} (${percent}%)`;
    addActivity('graduation-cap', 'Quiz Submitted', `Score ${percent}%`);
    renderMistakeNotebook();
    renderMistakeDueBadges();
    await syncQuizScoreWithServer(record);
}

function formatClockFromSeconds(totalSeconds) {
    const safe = Math.max(0, Number(totalSeconds) || 0);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updatePastPaperTimerDisplay() {
    const display = document.getElementById('pastPaperTimerDisplay');
    if (!display) return;
    display.textContent = formatClockFromSeconds(pastPaperSecondsRemaining);
}

function resetPastPaperPracticeTimer() {
    clearInterval(pastPaperTimerInterval);
    pastPaperTimerInterval = null;
    pastPaperTimerRunning = false;
    const durationInput = document.getElementById('pastPaperDurationInput');
    const duration = Math.max(15, Math.min(180, Number(durationInput && durationInput.value ? durationInput.value : 60)));
    pastPaperSecondsRemaining = duration * 60;
    updatePastPaperTimerDisplay();
}

function startPastPaperPracticeTimer() {
    const durationInput = document.getElementById('pastPaperDurationInput');
    const duration = Math.max(15, Math.min(180, Number(durationInput && durationInput.value ? durationInput.value : 60)));

    if (!pastPaperTimerRunning || pastPaperSecondsRemaining <= 0) {
        pastPaperSecondsRemaining = duration * 60;
    }
    if (pastPaperTimerRunning) return;

    pastPaperTimerRunning = true;
    updatePastPaperTimerDisplay();
    pastPaperTimerInterval = setInterval(() => {
        if (pastPaperSecondsRemaining <= 0) {
            clearInterval(pastPaperTimerInterval);
            pastPaperTimerInterval = null;
            pastPaperTimerRunning = false;
            alert('Past paper timer complete. Submit your score now.');
            return;
        }
        pastPaperSecondsRemaining -= 1;
        updatePastPaperTimerDisplay();
    }, 1000);
}

function submitPastPaperScore() {
    const subject = document.getElementById('pastPaperSubjectSelect')?.value || 'Math';
    const obtained = Number(document.getElementById('pastPaperObtainedInput')?.value);
    const total = Number(document.getElementById('pastPaperTotalInput')?.value);
    const duration = Math.max(15, Math.min(180, Number(document.getElementById('pastPaperDurationInput')?.value || 60)));

    if (!Number.isFinite(obtained) || !Number.isFinite(total) || total <= 0) {
        alert('Enter valid score and total marks.');
        return;
    }
    if (obtained < 0 || obtained > total) {
        alert('Score must be between 0 and total marks.');
        return;
    }

    const percent = Math.round((obtained / total) * 100);
    const attempt = {
        id: `paper-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        subject,
        obtained: Math.round(obtained * 100) / 100,
        total: Math.round(total * 100) / 100,
        percent,
        durationMinutes: duration,
        createdAt: new Date().toISOString()
    };

    pastPaperAttempts.unshift(attempt);
    pastPaperAttempts = normalizePastPaperAttempts(pastPaperAttempts).slice(0, 100);
    saveState({ pastPaperAttempts });
    addActivity('file-pen', 'Past Paper Attempt', `${subject}: ${percent}%`);
    renderPastPaperTrend();

    const scoreInput = document.getElementById('pastPaperObtainedInput');
    if (scoreInput) scoreInput.value = '';
}

function renderPastPaperTrend() {
    const summary = document.getElementById('pastPaperTrendSummary');
    const subjectFilter = document.getElementById('pastPaperTrendSubject')?.value || 'All';
    const canvas = document.getElementById('pastPaperTrendChart');
    if (!summary || !canvas) return;

    const filtered = (pastPaperAttempts || [])
        .filter(item => subjectFilter === 'All' || item.subject === subjectFilter)
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    if (pastPaperTrendChartInstance) {
        pastPaperTrendChartInstance.destroy();
        pastPaperTrendChartInstance = null;
    }

    if (filtered.length === 0) {
        summary.textContent = 'No past paper attempts yet.';
        return;
    }

    const latest = filtered[filtered.length - 1];
    const avg = Math.round(filtered.reduce((sum, item) => sum + (Number(item.percent) || 0), 0) / filtered.length);
    summary.textContent = `${subjectFilter === 'All' ? 'All subjects' : subjectFilter}: ${filtered.length} attempts | Latest ${latest.percent}% | Avg ${avg}%`;

    const labels = filtered.map((item, idx) => `A${idx + 1}`);
    const values = filtered.map(item => Number(item.percent) || 0);

    pastPaperTrendChartInstance = new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Past Paper Score %',
                data: values,
                borderColor: '#0f766e',
                backgroundColor: 'rgba(15, 118, 110, 0.18)',
                fill: true,
                tension: 0.25
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });
}

function parseExamStrategySections(rawText) {
    const lines = String(rawText || '')
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);
    if (lines.length === 0) {
        return [
            { name: 'Section A (MCQ)', weight: 40 },
            { name: 'Section B (Short)', weight: 35 },
            { name: 'Section C (Long)', weight: 25 }
        ];
    }

    const sections = lines.map((line, idx) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const name = String(parts[0] || '').trim() || `Section ${idx + 1}`;
            const weight = Number(String(parts.slice(1).join(':')).replace(/[^\d.]/g, ''));
            return { name, weight: Number.isFinite(weight) && weight > 0 ? weight : 0 };
        }
        return { name: line, weight: 0 };
    }).filter(item => item.name);

    const hasWeights = sections.some(item => item.weight > 0);
    if (!hasWeights) {
        const equal = Math.max(1, Math.round(100 / sections.length));
        return sections.map(item => ({ ...item, weight: equal }));
    }
    return sections.map(item => ({ ...item, weight: item.weight > 0 ? item.weight : 1 }));
}

function buildExamStrategyPlan(values) {
    const duration = Math.max(30, Math.min(360, Number(values.durationMinutes) || 120));
    const reviewBuffer = Math.max(0, Math.min(30, Number(values.reviewBufferMinutes) || 10));
    const sections = parseExamStrategySections(values.sectionsText);
    if (sections.length === 0) {
        return { error: 'Add at least one section.' };
    }

    const answerWindow = Math.max(20, duration - reviewBuffer);
    const totalWeight = sections.reduce((sum, item) => sum + (Number(item.weight) || 0), 0) || sections.length;
    const withMinutes = sections.map(section => {
        const raw = (answerWindow * (Number(section.weight) || 0)) / totalWeight;
        return {
            name: section.name,
            weight: section.weight,
            allocatedMinutes: Math.max(5, Math.floor(raw))
        };
    });

    let used = withMinutes.reduce((sum, item) => sum + item.allocatedMinutes, 0);
    let left = Math.max(0, answerWindow - used);
    let idx = 0;
    while (left > 0 && withMinutes.length > 0) {
        withMinutes[idx % withMinutes.length].allocatedMinutes += 1;
        left -= 1;
        idx += 1;
    }

    const running = [];
    let cursor = 0;
    withMinutes.forEach(section => {
        const start = cursor;
        const end = cursor + section.allocatedMinutes;
        cursor = end;
        running.push({
            ...section,
            startMinute: start,
            endMinute: end
        });
    });

    const practiceItems = withMinutes.map((section, i) => ({
        dayOffset: i,
        text: `Exam Strategy Drill: ${section.name}`,
        allocatedMinutes: Math.max(20, Math.round(section.allocatedMinutes * 1.2))
    }));

    return {
        duration,
        reviewBuffer,
        answerWindow,
        sections: running,
        practiceItems
    };
}

function formatStrategyMinuteRange(startMinute, endMinute) {
    return `${String(startMinute).padStart(2, '0')}-${String(endMinute).padStart(2, '0')} min`;
}

function renderExamStrategyPlan(plan) {
    const summaryEl = document.getElementById('examStrategySummary');
    const listEl = document.getElementById('examStrategyPlanList');
    if (!summaryEl || !listEl) return;

    if (!plan || !Array.isArray(plan.sections) || plan.sections.length === 0) {
        summaryEl.textContent = 'Enter exam duration and sections to generate a time-split strategy.';
        listEl.innerHTML = '<li class="empty-state">No exam strategy generated yet.</li>';
        return;
    }

    summaryEl.textContent = `Total ${plan.duration} min | Answering ${plan.answerWindow} min | Final review ${plan.reviewBuffer} min`;
    const sectionRows = plan.sections.map(section => `
        <li>
            <strong>${escapeHtml(section.name)}</strong>
            <span>${formatStrategyMinuteRange(section.startMinute, section.endMinute)} | ${section.allocatedMinutes} min | Weight ${Math.round(section.weight)}%</span>
        </li>
    `).join('');
    const reviewRow = `<li><strong>Final Review</strong><span>${plan.reviewBuffer} min reserved for checking.</span></li>`;
    const practiceRows = plan.practiceItems.map((item, idx) => `
        <li>
            <strong>Practice Day ${idx + 1}</strong>
            <span>${escapeHtml(item.text)} (${item.allocatedMinutes} min timed drill)</span>
        </li>
    `).join('');
    listEl.innerHTML = `${sectionRows}${reviewRow}${practiceRows}`;
}

function simulateExamStrategy() {
    const durationMinutes = Number(document.getElementById('examStrategyDurationInput')?.value || 120);
    const reviewBufferMinutes = Number(document.getElementById('examStrategyReviewBufferInput')?.value || 10);
    const sectionsText = String(document.getElementById('examStrategySectionsInput')?.value || '');
    const plan = buildExamStrategyPlan({ durationMinutes, reviewBufferMinutes, sectionsText });
    if (plan.error) {
        alert(plan.error);
        pendingExamStrategyPlan = null;
        renderExamStrategyPlan(null);
        return;
    }
    pendingExamStrategyPlan = plan;
    renderExamStrategyPlan(plan);
}

function createExamStrategyPracticeTasks() {
    if (!pendingExamStrategyPlan) {
        simulateExamStrategy();
        if (!pendingExamStrategyPlan) return;
    }
    const plan = pendingExamStrategyPlan;
    const subject = document.getElementById('pastPaperSubjectSelect')?.value || 'General';
    let created = 0;

    plan.practiceItems.forEach(item => {
        const due = new Date();
        due.setDate(due.getDate() + item.dayOffset + 1);
        const dueDate = due.toISOString().slice(0, 10);
        const title = `${item.text} (${subject})`;
        const exists = tasks.some(task =>
            String(task.text || '').trim() === title &&
            String(task.dueDate || '') === dueDate
        );
        if (exists) return;
        tasks.push(normalizeTask({
            text: title,
            subject,
            priority: 'high',
            difficulty: 'medium',
            examWeight: 4,
            estimatedHours: Math.max(0.5, Math.round((item.allocatedMinutes / 60) * 10) / 10),
            dueDate,
            done: false,
            createdAt: new Date().toISOString()
        }));
        created += 1;
    });

    if (created === 0) {
        alert('Practice tasks already exist for this strategy.');
        return;
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    renderCalendar();
    addActivity('chess-clock', 'Exam Strategy Tasks Created', `${created} timed drill task(s) added`);
    alert(`${created} exam strategy practice task(s) created.`);
}

function tokenizeAnswerText(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .map(t => t.trim())
        .filter(Boolean);
}

function evaluateAnswerStructure(answerText) {
    const text = String(answerText || '').trim();
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const words = tokenizeAnswerText(text);
    const hasIntroCue = /(introduction|in summary|overall|firstly|to begin|definition)/i.test(text);
    const hasConclusionCue = /(therefore|thus|in conclusion|finally|to conclude|hence)/i.test(text);
    const hasParagraphFlow = lines.length >= 3;

    let score = 0;
    if (words.length >= 60) score += 35;
    else if (words.length >= 35) score += 25;
    else if (words.length >= 20) score += 15;
    else score += 8;
    if (hasParagraphFlow) score += 25;
    if (hasIntroCue) score += 20;
    if (hasConclusionCue) score += 20;

    return {
        score: Math.max(0, Math.min(100, Math.round(score))),
        words: words.length,
        hasParagraphFlow,
        hasIntroCue,
        hasConclusionCue
    };
}

function evaluateAnswerContent(answerText, keywordText) {
    const answerTokens = new Set(tokenizeAnswerText(answerText));
    const keywords = String(keywordText || '')
        .split(',')
        .map(k => k.trim().toLowerCase())
        .filter(Boolean);
    if (keywords.length === 0) {
        return {
            score: 70,
            matchedCount: 0,
            totalKeywords: 0,
            missedKeywords: []
        };
    }

    let matchedCount = 0;
    const missedKeywords = [];
    keywords.forEach(keyword => {
        const parts = keyword.split(/\s+/).filter(Boolean);
        const matched = parts.every(part => answerTokens.has(part));
        if (matched) matchedCount += 1;
        else missedKeywords.push(keyword);
    });
    const coverage = matchedCount / keywords.length;
    const score = Math.round(coverage * 100);
    return {
        score: Math.max(0, Math.min(100, score)),
        matchedCount,
        totalKeywords: keywords.length,
        missedKeywords
    };
}

function evaluateAnswerClarity(answerText) {
    const text = String(answerText || '').trim();
    const words = tokenizeAnswerText(text);
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    if (words.length === 0) return { score: 0, avgSentenceLength: 0 };

    const avgSentenceLength = sentences.length > 0
        ? Math.round((words.length / sentences.length) * 10) / 10
        : words.length;
    let score = 65;
    if (avgSentenceLength >= 8 && avgSentenceLength <= 22) score += 20;
    if (/\b(for example|because|therefore|thus|hence|as a result)\b/i.test(text)) score += 10;
    if (/\b(very very|thing|stuff)\b/i.test(text)) score -= 10;
    return {
        score: Math.max(0, Math.min(100, Math.round(score))),
        avgSentenceLength
    };
}

function buildAnswerImprovementPoints(structure, content, clarity) {
    const points = [];
    if (structure.words < 35) {
        points.push(`Increase depth: current answer has ${structure.words} words, target at least 50-80 words.`);
    }
    if (!structure.hasParagraphFlow) {
        points.push('Use 3 short paragraphs: intro, explanation, and conclusion.');
    }
    if (!structure.hasConclusionCue) {
        points.push('Add a conclusion line starting with "Therefore" or "In conclusion".');
    }
    if (content.totalKeywords > 0 && content.missedKeywords.length > 0) {
        points.push(`Cover missing key terms: ${content.missedKeywords.slice(0, 5).join(', ')}.`);
    }
    if (clarity.avgSentenceLength > 24) {
        points.push('Split long sentences into smaller clear statements.');
    }
    if (points.length === 0) {
        points.push('Strong answer. Next step: add one example and one diagram/flow reference for full marks.');
    }
    return points;
}

function renderAnswerEvaluationResult(result) {
    const summaryEl = document.getElementById('answerEvalSummary');
    const listEl = document.getElementById('answerEvalFeedbackList');
    if (!summaryEl || !listEl) return;

    if (!result) {
        summaryEl.textContent = 'Submit an answer to get structure/content score and improvement points.';
        listEl.innerHTML = '<li class="empty-state">No evaluation yet.</li>';
        return;
    }

    summaryEl.textContent = `Overall ${result.overall}/100 | Structure ${result.structure.score} | Content ${result.content.score} | Clarity ${result.clarity.score}`;
    const lines = [
        `Keyword coverage: ${result.content.matchedCount}/${result.content.totalKeywords}${result.content.totalKeywords === 0 ? ' (no keyword list provided)' : ''}`,
        `Word count: ${result.structure.words} | Avg sentence length: ${result.clarity.avgSentenceLength}`,
        ...result.improvementPoints
    ];
    listEl.innerHTML = lines.map(line => `<li>${escapeHtml(line)}</li>`).join('');
}

function evaluateStudentAnswer() {
    const question = String(document.getElementById('answerEvalQuestionInput')?.value || '').trim();
    const keywords = String(document.getElementById('answerEvalKeywordsInput')?.value || '').trim();
    const answer = String(document.getElementById('answerEvalStudentAnswerInput')?.value || '').trim();
    if (!answer) {
        alert('Write your answer first.');
        return;
    }

    const structure = evaluateAnswerStructure(answer);
    const content = evaluateAnswerContent(answer, keywords);
    const clarity = evaluateAnswerClarity(answer);
    const overall = Math.round((structure.score * 0.35) + (content.score * 0.45) + (clarity.score * 0.20));
    const improvementPoints = buildAnswerImprovementPoints(structure, content, clarity);

    const result = { question, structure, content, clarity, overall, improvementPoints };
    renderAnswerEvaluationResult(result);
    addActivity('pen-ruler', 'Answer Evaluated', `${question || 'Custom answer'} | ${overall}%`);
}

function clearAnswerEvaluationForm() {
    const ids = ['answerEvalQuestionInput', 'answerEvalKeywordsInput', 'answerEvalStudentAnswerInput'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    renderAnswerEvaluationResult(null);
}

function getExamCountdownFormValues() {
    const examName = String(document.getElementById('countdownExamName')?.value || '').trim();
    const subject = String(document.getElementById('countdownExamSubject')?.value || 'General').trim() || 'General';
    const examDate = String(document.getElementById('countdownExamDate')?.value || '').trim();
    const revisionWaves = Math.max(1, Math.min(6, Number(document.getElementById('countdownRevisionWaves')?.value || 3)));
    const mockTests = Math.max(0, Math.min(6, Number(document.getElementById('countdownMockTests')?.value || 2)));
    const bufferDays = Math.max(0, Math.min(7, Number(document.getElementById('countdownBufferDays')?.value || 2)));
    return { examName, subject, examDate, revisionWaves, mockTests, bufferDays };
}

function buildExamCountdownPlan(values) {
    const examName = String(values.examName || '').trim();
    const subject = String(values.subject || 'General').trim() || 'General';
    const examDateStr = String(values.examDate || '').trim();
    const revisionWaves = Math.max(1, Math.min(6, Number(values.revisionWaves) || 3));
    const mockTests = Math.max(0, Math.min(6, Number(values.mockTests) || 2));
    const bufferDays = Math.max(0, Math.min(7, Number(values.bufferDays) || 2));

    if (!examName || !examDateStr) {
        return { error: 'Enter exam name and exam date first.' };
    }

    const examDate = new Date(examDateStr);
    examDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft < 2) {
        return { error: 'Exam date must be at least 2 days in the future.' };
    }

    const availableDays = daysLeft - 1;
    const effectiveBufferDays = Math.min(bufferDays, Math.max(0, availableDays - 1));
    const nonBufferDays = Math.max(1, availableDays - effectiveBufferDays);
    const effectiveMockTests = Math.min(mockTests, Math.max(0, nonBufferDays - 1));
    const effectiveRevisionWaves = Math.min(revisionWaves, Math.max(1, nonBufferDays - effectiveMockTests));

    const planItems = [];
    const usedOffsets = new Set();
    const toDate = (offsetBeforeExam) => {
        const due = new Date(examDate);
        due.setDate(examDate.getDate() - offsetBeforeExam);
        return due.toISOString().split('T')[0];
    };

    const mockOffsets = [];
    if (effectiveMockTests > 0) {
        const rangeLen = Math.max(1, nonBufferDays);
        for (let i = 0; i < effectiveMockTests; i++) {
            const pos = Math.max(1, Math.round(((i + 1) * rangeLen) / (effectiveMockTests + 1)));
            const offset = Math.max(effectiveBufferDays + 1, Math.min(availableDays, effectiveBufferDays + pos));
            if (usedOffsets.has(offset)) continue;
            usedOffsets.add(offset);
            mockOffsets.push(offset);
        }
    }

    const revisionCandidateOffsets = [];
    for (let offset = effectiveBufferDays + 1; offset <= availableDays; offset++) {
        if (!usedOffsets.has(offset)) revisionCandidateOffsets.push(offset);
    }
    const selectedRevisionOffsets = [];
    for (let i = 0; i < effectiveRevisionWaves; i++) {
        if (revisionCandidateOffsets.length === 0) break;
        const idx = Math.max(0, Math.min(revisionCandidateOffsets.length - 1, Math.floor(((i + 1) * revisionCandidateOffsets.length) / (effectiveRevisionWaves + 1))));
        const offset = revisionCandidateOffsets.splice(idx, 1)[0];
        selectedRevisionOffsets.push(offset);
    }

    selectedRevisionOffsets.forEach((offset, idx) => {
        const waveNumber = idx + 1;
        planItems.push({
            kind: 'revision',
            text: `${examName} - Revision Wave ${waveNumber}`,
            dueDate: toDate(offset),
            subject,
            priority: waveNumber >= Math.ceil(effectiveRevisionWaves * 0.67) ? 'high' : 'medium',
            difficulty: waveNumber >= Math.ceil(effectiveRevisionWaves * 0.67) ? 'hard' : 'medium',
            estimatedHours: waveNumber >= Math.ceil(effectiveRevisionWaves * 0.67) ? 2 : 1.5,
            examWeight: 4
        });
    });

    mockOffsets.forEach((offset, idx) => {
        const mockNumber = idx + 1;
        planItems.push({
            kind: 'mock',
            text: `${examName} - Mock Test ${mockNumber}`,
            dueDate: toDate(offset),
            subject,
            priority: 'high',
            difficulty: 'hard',
            estimatedHours: 2,
            examWeight: 5
        });
    });

    for (let offset = effectiveBufferDays; offset >= 1; offset--) {
        const dayNumber = effectiveBufferDays - offset + 1;
        planItems.push({
            kind: 'buffer',
            text: `${examName} - Buffer Day ${dayNumber} (Final Revision + Error Log)`,
            dueDate: toDate(offset),
            subject,
            priority: 'high',
            difficulty: 'medium',
            estimatedHours: 1,
            examWeight: 5
        });
    }

    planItems.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return {
        examName,
        subject,
        examDate: examDate.toISOString().split('T')[0],
        daysLeft,
        revisionWaves: effectiveRevisionWaves,
        mockTests: mockOffsets.length,
        bufferDays: effectiveBufferDays,
        items: planItems
    };
}

function renderExamCountdownPlanPreview(plan) {
    const summary = document.getElementById('countdownEngineSummary');
    const list = document.getElementById('countdownEnginePlanList');
    if (!summary || !list) return;

    if (!plan || !Array.isArray(plan.items) || plan.items.length === 0) {
        summary.textContent = 'No countdown plan generated yet.';
        list.innerHTML = '<li class="empty-state">No countdown plan generated yet.</li>';
        return;
    }

    summary.textContent = `${plan.examName}: ${plan.daysLeft} day(s) left | ${plan.revisionWaves} revision wave(s) | ${plan.mockTests} mock test(s) | ${plan.bufferDays} buffer day(s)`;
    list.innerHTML = plan.items.map(item => `
        <li>
            <strong>${item.text}</strong>
            <span>${item.subject} | ${item.dueDate} | ${item.kind}</span>
        </li>
    `).join('');
}

function previewExamCountdownPlan() {
    const plan = buildExamCountdownPlan(getExamCountdownFormValues());
    if (plan.error) {
        alert(plan.error);
        pendingExamCountdownPlan = null;
        renderExamCountdownPlanPreview(null);
        return;
    }
    pendingExamCountdownPlan = plan;
    renderExamCountdownPlanPreview(plan);
}

function createExamCountdownPlanTasks() {
    if (!pendingExamCountdownPlan) {
        previewExamCountdownPlan();
        if (!pendingExamCountdownPlan) return;
    }

    const plan = pendingExamCountdownPlan;
    let createdCount = 0;
    plan.items.forEach(item => {
        const exists = tasks.some(task => String(task.text || '').trim() === item.text && String(task.dueDate || '') === item.dueDate);
        if (exists) return;
        tasks.push(normalizeTask({
            text: item.text,
            subject: item.subject,
            priority: item.priority,
            difficulty: item.difficulty,
            estimatedHours: item.estimatedHours,
            examWeight: item.examWeight,
            dueDate: item.dueDate,
            done: false,
            createdAt: new Date().toISOString()
        }));
        createdCount++;
    });

    const examExists = exams.some(exam =>
        String(exam && exam.name || '').trim() === plan.examName &&
        String(exam && exam.date || '').trim() === plan.examDate
    );
    if (!examExists) {
        exams.push({
            name: plan.examName,
            subject: plan.subject,
            date: plan.examDate,
            notes: `Countdown Engine: ${plan.revisionWaves} waves, ${plan.mockTests} mocks, ${plan.bufferDays} buffers`
        });
    }

    saveTasks();
    saveState({ exams });
    renderTasks();
    renderDashboard();
    renderCalendar();
    renderQuizPage();
    addActivity('hourglass-half', 'Exam Countdown Plan Created', `${plan.examName}: ${createdCount} task(s)`);
    alert(`${createdCount} task(s) created for ${plan.examName}.`);
}

function removeExamCountdownTasksForExam(examName) {
    const normalizedExamName = String(examName || '').trim();
    if (!normalizedExamName) return 0;

    const before = tasks.length;
    tasks = tasks.filter(task => {
        const text = String(task && task.text || '').trim();
        if (!text.startsWith(`${normalizedExamName} - `)) return true;
        if (text.includes(' - Revision Wave ')) return false;
        if (text.includes(' - Mock Test ')) return false;
        if (text.includes(' - Buffer Day ')) return false;
        return true;
    });

    const removed = before - tasks.length;
    if (removed > 0) {
        saveTasks();
    }
    return removed;
}

function regenerateExamCountdownPlan() {
    const values = getExamCountdownFormValues();
    if (!values.examName || !values.examDate) {
        alert('Enter exam name and exam date first.');
        return;
    }

    const freshPlan = buildExamCountdownPlan(values);
    if (freshPlan.error) {
        alert(freshPlan.error);
        return;
    }
    pendingExamCountdownPlan = freshPlan;

    const removed = removeExamCountdownTasksForExam(freshPlan.examName);
    createExamCountdownPlanTasks();
    addActivity('arrows-rotate', 'Exam Countdown Plan Regenerated', `${freshPlan.examName}: removed ${removed}, rebuilt`);
}

function renderQuizPage() {
    renderQuizQuestions();
    updateQuizSessionModeLabel();
    const sectionsInput = document.getElementById('examStrategySectionsInput');
    if (sectionsInput && !sectionsInput.value.trim()) {
        sectionsInput.value = 'MCQ:40\nShort Answer:35\nLong Answer:25';
    }
    const countdownDateInput = document.getElementById('countdownExamDate');
    if (countdownDateInput && !countdownDateInput.value) {
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        countdownDateInput.value = nextMonth.toISOString().split('T')[0];
    }
    if (!pastPaperTimerRunning) {
        resetPastPaperPracticeTimer();
    } else {
        updatePastPaperTimerDisplay();
    }
    renderPastPaperTrend();
    renderMistakeNotebook();
    renderMistakeDueBadges();
    if (pendingExamStrategyPlan) {
        renderExamStrategyPlan(pendingExamStrategyPlan);
    } else {
        renderExamStrategyPlan(null);
    }
    if (pendingExamCountdownPlan) {
        renderExamCountdownPlanPreview(pendingExamCountdownPlan);
    } else {
        renderExamCountdownPlanPreview(null);
    }
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
function getPomodoroSubjectOptions() {
    const defaults = ["General", "Math", "Science", "English", "History", "Geography", "Programming", "Break"];
    const fromSessions = pomodoroSessions
        .map(session => String((session && session.subject) || "").trim())
        .filter(Boolean);
    const fromSubjects = subjects
        .map(subject => String((subject && subject.name) || "").trim())
        .filter(Boolean);
    return [...new Set([...defaults, ...fromSubjects, ...fromSessions])];
}

function renderPomodoroSubjectFilter() {
    const select = document.getElementById('pomodoroSubjectFilter');
    if (!select) return;
    const options = getPomodoroSubjectOptions();
    select.innerHTML = ['<option value="all">All Subjects</option>', ...options.map(name => `<option value="${name}">${name}</option>`)].join('');
    select.value = options.includes(pomodoroSubjectFilter) ? pomodoroSubjectFilter : "all";
    pomodoroSubjectFilter = select.value;
}

function setPomodoroSubjectFilter(value) {
    pomodoroSubjectFilter = String(value || "all");
    renderPomodoroHistory();
}

function renderPomodoroHistory() {
    renderPomodoroSubjectFilter();
    const filteredSessions = pomodoroSubjectFilter === "all"
        ? pomodoroSessions
        : pomodoroSessions.filter(session => (session.subject || "General") === pomodoroSubjectFilter);

    const totalFocusMinutes = filteredSessions
        .filter(s => s.type === 'Focus')
        .reduce((sum, s) => sum + (Number(s.minutes) || 0), 0);
    document.getElementById('totalFocusTime').textContent = Math.round(totalFocusMinutes / 60 * 10) / 10;
    document.getElementById('totalSessions').textContent = filteredSessions.length;

    const today = new Date();
    const todaySessions = filteredSessions.filter(s => new Date(s.date).toDateString() === today.toDateString());
    document.getElementById('sessionsToday').textContent = todaySessions.length;

    // Find longest streak
    let longest = 0;
    let current = 0;
    const dates = [...new Set(filteredSessions.map(s => new Date(s.date).toDateString()))].sort();
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
    if (filteredSessions.length === 0) {
        list.innerHTML = '<li class="empty-state">No sessions yet</li>';
    } else {
        list.innerHTML = filteredSessions.slice(0, 20).map(session => `
        <li>
            <span>${session.minutes} min ${session.type} | ${session.subject || 'General'}</span>
            <span class="activity-time">${formatDate(session.date)}</span>
        </li>
    `).join('');
    }

    const subjectStatsList = document.getElementById('pomodoroSubjectStatsList');
    if (!subjectStatsList) return;
    const bySubject = new Map();
    filteredSessions
        .filter(session => session.type === 'Focus')
        .forEach(session => {
            const subject = session.subject || 'General';
            const current = bySubject.get(subject) || { subject, minutes: 0, sessions: 0 };
            current.minutes += Number(session.minutes) || 0;
            current.sessions += 1;
            bySubject.set(subject, current);
        });

    const sorted = [...bySubject.values()].sort((a, b) => b.minutes - a.minutes);
    if (sorted.length === 0) {
        subjectStatsList.innerHTML = '<li class="empty-state">No focus sessions by subject yet</li>';
        return;
    }

    subjectStatsList.innerHTML = sorted.map(item => `
        <li>
            <span>${item.subject}</span>
            <span>${(Math.round((item.minutes / 60) * 10) / 10)}h | ${item.sessions} sessions</span>
        </li>
    `).join('');

    renderReflectionHistory();
}

// ==================== GOALS ====================
function getKnownGoalSubjects() {
    const fromSubjects = Array.isArray(subjects) ? subjects.map(item => String((item && item.name) || "").trim()).filter(Boolean) : [];
    const fromTasks = tasks.map(task => String(task.subject || "").trim()).filter(Boolean);
    const fromQuiz = quizScores.map(score => String(score.subject || "").trim()).filter(Boolean);
    const defaults = ["Math", "Science", "English", "History", "Geography", "Programming", "General"];
    return [...new Set([...defaults, ...fromSubjects, ...fromTasks, ...fromQuiz])];
}

function parseGoalStatement(text) {
    const rawText = String(text || "").trim();
    if (!rawText) return null;
    const targetMatch = rawText.match(/(\d{1,3})\s*%/);
    const targetPercent = targetMatch ? Math.max(1, Math.min(100, Math.round(Number(targetMatch[1])))) : NaN;
    if (!Number.isFinite(targetPercent)) return null;

    const knownSubjects = getKnownGoalSubjects();
    const lower = rawText.toLowerCase();
    let subject = "";
    let bestLen = 0;
    knownSubjects.forEach(name => {
        const normalized = name.toLowerCase();
        if (!normalized) return;
        if (lower.includes(normalized) && normalized.length > bestLen) {
            subject = name;
            bestLen = normalized.length;
        }
    });

    if (!subject) {
        const phraseMatch = rawText.match(/(?:in|for)\s+([a-zA-Z][a-zA-Z\s&-]{1,40})/i);
        if (phraseMatch && phraseMatch[1]) {
            subject = phraseMatch[1].trim().replace(/\s+/g, " ");
        }
    }

    return {
        rawText,
        targetPercent,
        subject: subject.trim()
    };
}

function getSubjectQuizBaseline(subjectName) {
    const subjectScores = quizScores
        .filter(score => score && score.subject && subjectMatches(score.subject, subjectName))
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 10);
    if (subjectScores.length > 0) {
        const avg = subjectScores.reduce((sum, score) => sum + (Number(score.percent) || 0), 0) / subjectScores.length;
        return Math.max(0, Math.min(100, Math.round(avg)));
    }

    const overall = quizScores
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 10);
    if (overall.length > 0) {
        const avg = overall.reduce((sum, score) => sum + (Number(score.percent) || 0), 0) / overall.length;
        return Math.max(0, Math.min(100, Math.round(avg * 0.92)));
    }
    return null;
}

function getSubjectTaskStats(subjectName) {
    const related = tasks.filter(task => subjectMatches(task.subject || "", subjectName));
    const done = related.filter(task => task.done).length;
    const pending = related.length - done;
    const completionPercent = related.length > 0 ? Math.round((done / related.length) * 100) : null;
    return { total: related.length, done, pending, completionPercent };
}

function getSubjectFocusHours(subjectName, daysBack = 14) {
    const from = new Date();
    from.setDate(from.getDate() - Math.max(1, Number(daysBack) || 14));
    from.setHours(0, 0, 0, 0);
    const minutes = pomodoroSessions
        .filter(session => session.type === "Focus")
        .filter(session => subjectMatches(session.subject || "", subjectName))
        .filter(session => new Date(session.date) >= from)
        .reduce((sum, session) => sum + (Number(session.minutes) || 0), 0);
    return Math.round((minutes / 60) * 10) / 10;
}

function buildGoalRoadmapPlan(parsedGoal) {
    const subject = parsedGoal.subject || "General";
    const targetPercent = parsedGoal.targetPercent;
    const quizBaseline = getSubjectQuizBaseline(subject);
    const taskStats = getSubjectTaskStats(subject);
    const focusHours = getSubjectFocusHours(subject, 14);

    const weighted = [];
    if (Number.isFinite(quizBaseline)) weighted.push({ value: quizBaseline, weight: 0.5 });
    if (Number.isFinite(taskStats.completionPercent)) weighted.push({ value: taskStats.completionPercent, weight: 0.3 });
    if (focusHours > 0) weighted.push({ value: Math.min(92, Math.round(40 + focusHours * 4)), weight: 0.2 });

    let baselinePercent = 60;
    if (weighted.length > 0) {
        const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
        baselinePercent = Math.round(weighted.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight);
    }

    const gap = Math.max(0, targetPercent - baselinePercent);
    const weeks = Math.max(2, Math.min(16, Math.ceil(gap / 4) || 2));
    const weeklyHours = Math.max(2, Math.min(20, Math.round((2 + gap * 0.22 + (taskStats.pending * 0.25)) * 10) / 10));

    const milestoneTemplates = [
        "Build core concepts and fix weak chapter notes.",
        "Practice mixed-level questions and maintain error log.",
        "Run timed topic tests and revise mistakes daily.",
        "Take full-length mocks and optimize exam strategy."
    ];
    const milestones = [];
    for (let week = 1; week <= weeks; week++) {
        const weekTarget = Math.round(baselinePercent + ((targetPercent - baselinePercent) * week) / weeks);
        const templateIndex = Math.min(milestoneTemplates.length - 1, Math.floor(((week - 1) / weeks) * milestoneTemplates.length));
        milestones.push({
            week,
            targetPercent: Math.max(0, Math.min(100, weekTarget)),
            action: milestoneTemplates[templateIndex]
        });
    }

    return {
        rawText: parsedGoal.rawText,
        subject,
        targetPercent,
        baselinePercent,
        weeklyHours,
        weeks,
        milestones,
        generatedAt: new Date().toISOString(),
        quizBaseline,
        taskCompletionBaseline: taskStats.completionPercent,
        focusHours14d: focusHours
    };
}

function renderGoalRoadmap() {
    const summaryEl = document.getElementById('goalRoadmapSummary');
    const listEl = document.getElementById('goalRoadmapList');
    const inputEl = document.getElementById('targetGoalInput');
    if (!summaryEl || !listEl) return;

    const hasRoadmap = goalRoadmap && goalRoadmap.subject && Array.isArray(goalRoadmap.milestones) && goalRoadmap.milestones.length > 0;
    if (inputEl && goalRoadmap && goalRoadmap.rawText) {
        inputEl.value = goalRoadmap.rawText;
    }
    if (!hasRoadmap) {
        summaryEl.textContent = 'No roadmap generated yet.';
        listEl.innerHTML = '<li class="empty-state">Add a goal statement to generate your roadmap</li>';
        return;
    }

    summaryEl.textContent = `Target: ${goalRoadmap.targetPercent}% in ${goalRoadmap.subject} | Baseline: ${goalRoadmap.baselinePercent}% | Plan: ${goalRoadmap.weeks} weeks | Suggested: ${goalRoadmap.weeklyHours} hrs/week`;
    listEl.innerHTML = goalRoadmap.milestones.map(item => `
        <li>
            <strong>Week ${item.week}: Aim ${item.targetPercent}%</strong>
            <span>${item.action}</span>
        </li>
    `).join('');
}

function generateGoalRoadmap() {
    const input = document.getElementById('targetGoalInput');
    const rawText = input ? input.value : '';
    const parsed = parseGoalStatement(rawText);
    if (!parsed || !parsed.subject || !parsed.targetPercent) {
        alert('Use a clear statement like: "I need 85% in Math".');
        return;
    }

    goalRoadmap = buildGoalRoadmapPlan(parsed);
    saveState({ goalRoadmap });
    renderGoalRoadmap();
    addActivity('bullseye', 'Goal Roadmap Generated', `${goalRoadmap.targetPercent}% in ${goalRoadmap.subject}`);
}

function createTasksFromGoalRoadmap() {
    const hasRoadmap = goalRoadmap && goalRoadmap.subject && Array.isArray(goalRoadmap.milestones) && goalRoadmap.milestones.length > 0;
    if (!hasRoadmap) {
        alert('Generate a roadmap first.');
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const perTaskHours = Math.max(1, Math.min(4, Math.round(((Number(goalRoadmap.weeklyHours) || 4) / 3) * 10) / 10));
    const baseExamWeight = Math.max(3, Math.min(5, Math.round(((Number(goalRoadmap.targetPercent) || 80) - (Number(goalRoadmap.baselinePercent) || 60)) / 10) + 3));
    let created = 0;

    goalRoadmap.milestones.forEach(item => {
        const weekNumber = Number(item.week) || 1;
        const taskText = `Roadmap Week ${weekNumber}: ${goalRoadmap.subject} target ${item.targetPercent}%`;
        const alreadyExists = tasks.some(task => String(task.text || "").trim() === taskText && subjectMatches(task.subject || "", goalRoadmap.subject || ""));
        if (alreadyExists) return;

        const due = new Date(today);
        due.setDate(due.getDate() + (weekNumber * 7) - 1);
        tasks.push({
            text: taskText,
            subject: goalRoadmap.subject || "General",
            priority: weekNumber <= 2 ? "high" : "medium",
            difficulty: weekNumber <= 2 ? "hard" : "medium",
            examWeight: baseExamWeight,
            estimatedHours: perTaskHours,
            dueDate: due.toISOString().split('T')[0],
            done: false,
            createdAt: new Date().toISOString()
        });
        created++;
    });

    if (created === 0) {
        alert('Roadmap tasks already exist.');
        return;
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('list-check', 'Roadmap Tasks Created', `${created} tasks for ${goalRoadmap.subject}`);
    alert(`${created} roadmap task(s) created.`);
}

const CAREER_PATH_LIBRARY = {
    Math: [
        {
            name: "Data Scientist",
            roadmap: [
                "Master algebra, statistics, and probability.",
                "Practice Python + data analysis projects weekly.",
                "Learn machine learning basics and model evaluation.",
                "Build 3 portfolio projects and prepare interviews."
            ]
        },
        {
            name: "Mechanical/Software Engineer",
            roadmap: [
                "Strengthen core math problem solving.",
                "Practice numerical reasoning and coding basics.",
                "Study entrance-level physics integration.",
                "Take timed mocks and track weak chapters."
            ]
        }
    ],
    Science: [
        {
            name: "Doctor (MBBS Path)",
            roadmap: [
                "Build NCERT mastery in Biology and Chemistry.",
                "Practice concept-to-application MCQs daily.",
                "Use spaced revision for high-yield chapters.",
                "Take full-length mocks and fix error log weekly."
            ]
        },
        {
            name: "Biotech / Research Scientist",
            roadmap: [
                "Strengthen Biology fundamentals and lab concepts.",
                "Learn scientific reading and note-making.",
                "Practice data interpretation and experiment design.",
                "Join projects/olympiad-style science practice."
            ]
        }
    ],
    English: [
        {
            name: "Law / Civil Services (Language Edge)",
            roadmap: [
                "Improve grammar precision and comprehension speed.",
                "Practice analytical writing 3 times per week.",
                "Build current-affairs vocabulary notebook.",
                "Take timed reading + essay drills."
            ]
        },
        {
            name: "Journalism / Content Strategy",
            roadmap: [
                "Train summary writing and headline framing.",
                "Practice research-backed article writing.",
                "Develop editing and clarity skills.",
                "Publish small portfolio pieces consistently."
            ]
        }
    ],
    History: [
        {
            name: "Civil Services / Policy Studies",
            roadmap: [
                "Create timeline-first chapter notes.",
                "Practice cause-effect answer structure.",
                "Revise maps/events with weekly tests.",
                "Write short and long answers under time limit."
            ]
        }
    ],
    Geography: [
        {
            name: "GIS Analyst / Urban Planner",
            roadmap: [
                "Strengthen map-work and physical geography basics.",
                "Practice data tables, climate and resource analysis.",
                "Learn GIS fundamentals from beginner resources.",
                "Build mini location-analysis projects."
            ]
        }
    ],
    Programming: [
        {
            name: "Software Engineer",
            roadmap: [
                "Master variables, loops, functions, and debugging.",
                "Solve coding problems by topic each week.",
                "Build 2-3 small apps with clean code.",
                "Prepare DSA basics and interview-style questions."
            ]
        },
        {
            name: "AI/ML Engineer",
            roadmap: [
                "Strengthen Python + math for ML.",
                "Learn data preprocessing and model basics.",
                "Train on small datasets and evaluate results.",
                "Create a practical ML mini-project portfolio."
            ]
        }
    ],
    General: [
        {
            name: "Multi-Skill Academic Path",
            roadmap: [
                "Stabilize core subjects with daily study rhythm.",
                "Identify top 2 strengths and 1 weak area.",
                "Use weekly quizzes and chapter checklists.",
                "Choose specialization after 6-8 weeks of data."
            ]
        }
    ]
};

function getSubjectChapterCompletion(subjectName) {
    const related = chapterTracker.filter(item => subjectMatches(item.subject || "", subjectName));
    if (related.length === 0) return null;
    const done = related.filter(item => item.status === "done").length;
    return Math.round((done / related.length) * 100);
}

function getSubjectStrengthRanking(limit = 3) {
    const candidateSubjects = getKnownGoalSubjects()
        .map(name => String(name || "").trim())
        .filter(name => name && name.toLowerCase() !== "general");
    const unique = [...new Set(candidateSubjects)];

    const scored = unique.map(subjectName => {
        const quiz = getSubjectQuizBaseline(subjectName);
        const task = getSubjectTaskStats(subjectName).completionPercent;
        const focus = getSubjectFocusHours(subjectName, 14);
        const focusScore = focus > 0 ? Math.min(100, Math.round((focus / 8) * 100)) : null;
        const chapter = getSubjectChapterCompletion(subjectName);

        const weighted = [];
        if (Number.isFinite(quiz)) weighted.push({ value: quiz, weight: 0.45 });
        if (Number.isFinite(chapter)) weighted.push({ value: chapter, weight: 0.25 });
        if (Number.isFinite(task)) weighted.push({ value: task, weight: 0.15 });
        if (Number.isFinite(focusScore)) weighted.push({ value: focusScore, weight: 0.15 });
        const score = weighted.length > 0
            ? Math.round(weighted.reduce((sum, item) => sum + (item.value * item.weight), 0) / weighted.reduce((sum, item) => sum + item.weight, 0))
            : 40;

        return { subject: subjectName, score };
    }).sort((a, b) => b.score - a.score);

    return scored.slice(0, Math.max(1, limit));
}

function getCareerSuggestionsFromStrength(strengthList) {
    const picks = [];
    strengthList.forEach(item => {
        const subject = item.subject || "General";
        const options = CAREER_PATH_LIBRARY[subject] || CAREER_PATH_LIBRARY.General;
        if (!Array.isArray(options) || options.length === 0) return;
        const selection = options[0];
        picks.push({
            subject,
            strengthScore: item.score,
            career: selection.name,
            roadmap: selection.roadmap
        });
    });
    if (picks.length === 0) {
        const fallback = CAREER_PATH_LIBRARY.General[0];
        picks.push({
            subject: "General",
            strengthScore: 40,
            career: fallback.name,
            roadmap: fallback.roadmap
        });
    }
    return picks.slice(0, 3);
}

function renderCareerPathTeaser(suggestions = null) {
    const summaryEl = document.getElementById('careerTeaserSummary');
    const listEl = document.getElementById('careerTeaserList');
    if (!summaryEl || !listEl) return;

    const strength = getSubjectStrengthRanking(3);
    const picks = Array.isArray(suggestions) ? suggestions : getCareerSuggestionsFromStrength(strength);
    if (!Array.isArray(picks) || picks.length === 0) {
        summaryEl.textContent = 'Add quiz/chapter/focus data to unlock career teaser.';
        listEl.innerHTML = '<li class="empty-state">Generate to see career matches.</li>';
        return;
    }

    const strengthText = strength.map(item => `${item.subject} (${item.score})`).join(", ");
    summaryEl.textContent = `Top strengths: ${strengthText}. Suggested careers with roadmap below.`;
    listEl.innerHTML = picks.map(item => `
        <li>
            <strong>${escapeHtml(item.career)} (from ${escapeHtml(item.subject)} strength ${item.strengthScore})</strong>
            <span>Roadmap: ${(item.roadmap || []).map(step => escapeHtml(step)).join(" -> ")}</span>
        </li>
    `).join('');
}

function generateCareerPathTeaser() {
    const suggestions = getCareerSuggestionsFromStrength(getSubjectStrengthRanking(3));
    renderCareerPathTeaser(suggestions);
    addActivity('briefcase', 'Career Teaser Generated', `${suggestions.length} career path(s) suggested`);
}

function renderChapterTracker() {
    const list = document.getElementById('chapterTrackerList');
    const progressList = document.getElementById('chapterTrackerProgressList');
    const completionText = document.getElementById('chapterChecklistCompletionText');
    const searchInput = document.getElementById('chapterSearchInput');
    const incompleteCheck = document.getElementById('chapterIncompleteOnlyCheck');
    if (!list) return;
    if (searchInput && searchInput.value !== chapterSearchQuery) searchInput.value = chapterSearchQuery;
    if (incompleteCheck) incompleteCheck.checked = Boolean(chapterIncompleteOnly);

    renderChapterFilterSubjects();
    renderConceptDependencyControls();

    if (!Array.isArray(chapterTracker) || chapterTracker.length === 0) {
        if (completionText) completionText.textContent = 'Completion: 0% (0/0 chapters)';
        if (progressList) {
            progressList.innerHTML = '<li class="empty-state">Subject progress will appear after adding chapters.</li>';
        }
        list.innerHTML = '<li class="empty-state">No chapters added yet</li>';
        renderConceptDependencyMap();
        return;
    }

    const statusLabel = {
        'not-started': 'Not Started',
        'in-progress': 'In Progress',
        'done': 'Done'
    };

    if (progressList) {
        const bySubject = new Map();
        chapterTracker.forEach(item => {
            const subject = item.subject || 'General';
            const current = bySubject.get(subject) || { subject, total: 0, done: 0, scoreSum: 0, scoreCount: 0 };
            current.total += 1;
            if (item.status === 'done') current.done += 1;
            if (Number.isFinite(item.testScore)) {
                current.scoreSum += item.testScore;
                current.scoreCount += 1;
            }
            bySubject.set(subject, current);
        });

        const subjectRows = [...bySubject.values()]
            .sort((a, b) => a.subject.localeCompare(b.subject))
            .map(item => {
                const completion = item.total > 0 ? Math.round((item.done / item.total) * 100) : 0;
                const avgScore = item.scoreCount > 0 ? Math.round(item.scoreSum / item.scoreCount) : null;
                return `
                    <li class="chapter-progress-item">
                        <div class="chapter-progress-head">
                            <strong>${item.subject}</strong>
                            <span>${item.done}/${item.total} done${avgScore !== null ? ` | Avg score ${avgScore}%` : ''}</span>
                        </div>
                        <div class="goal-bar-large">
                            <div class="goal-fill-large" style="width:${completion}%"></div>
                        </div>
                    </li>
                `;
            });
        progressList.innerHTML = subjectRows.join('');
    }

    if (completionText) {
        const total = chapterTracker.length;
        const done = chapterTracker.filter(item => item.status === 'done').length;
        const percent = total > 0 ? Math.round((done / total) * 100) : 0;
        completionText.textContent = `Completion: ${percent}% (${done}/${total} chapters)`;
    }

    const visibleItems = chapterTracker.filter(item => {
        if (chapterFilterSubject !== 'all' && !subjectMatches(item.subject || '', chapterFilterSubject)) {
            return false;
        }
        if (chapterIncompleteOnly && item.status === 'done') {
            return false;
        }
        if (chapterSearchQuery) {
            const hay = `${item.subject} ${item.chapter}`.toLowerCase();
            if (!hay.includes(chapterSearchQuery.toLowerCase())) return false;
        }
        return true;
    });

    if (visibleItems.length === 0) {
        list.innerHTML = '<li class="empty-state">No chapters match current filters.</li>';
        return;
    }

    list.innerHTML = visibleItems.map(item => `
        <li>
            <strong>${item.subject}: ${item.chapter}</strong>
            <span>${statusLabel[item.status] || 'Not Started'} | Test score: ${Number.isFinite(item.testScore) ? `${item.testScore}%` : 'N/A'}</span>
            <span>Prerequisites: ${Array.isArray(item.prerequisites) && item.prerequisites.length > 0 ? item.prerequisites.length : 0}</span>
            <div class="task-options">
                <label>
                    <input type="checkbox" ${item.status === 'done' ? 'checked' : ''} onchange="toggleChapterChecklistDone('${item.id}', this.checked)">
                    Done
                </label>
                <select onchange="updateChapterStatus('${item.id}', this.value)">
                    <option value="not-started" ${item.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                    <option value="in-progress" ${item.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="done" ${item.status === 'done' ? 'selected' : ''}>Done</option>
                </select>
                <input type="number" min="0" max="100" value="${Number.isFinite(item.testScore) ? item.testScore : ''}" placeholder="Score %" onchange="updateChapterScore('${item.id}', this.value)">
                <button class="delete-btn" onclick="deleteChapterTrackerEntry('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');
    renderConceptDependencyMap();
}

function toggleChapterChecklistDone(id, checked) {
    const idx = chapterTracker.findIndex(item => item.id === id);
    if (idx < 0) return;
    chapterTracker[idx].status = checked ? 'done' : 'in-progress';
    saveState({ chapterTracker });
    renderChapterTracker();
}

function getChapterFilterSubjects() {
    const defaults = ['Math', 'Science', 'English', 'History', 'Geography', 'Programming', 'General'];
    const fromTracker = chapterTracker.map(item => String(item.subject || '').trim()).filter(Boolean);
    return [...new Set([...defaults, ...fromTracker])];
}

function renderChapterFilterSubjects() {
    const select = document.getElementById('chapterFilterSubject');
    if (!select) return;
    const options = getChapterFilterSubjects();
    select.innerHTML = ['<option value="all">All Subjects</option>', ...options.map(name => `<option value="${name}">${name}</option>`)].join('');
    select.value = options.includes(chapterFilterSubject) ? chapterFilterSubject : 'all';
    chapterFilterSubject = select.value;
}

function renderConceptDependencyControls() {
    const subjectSelect = document.getElementById('conceptDependencySubjectFilter');
    const chapterSelect = document.getElementById('dependencyChapterSelect');
    const prereqSelect = document.getElementById('dependencyPrereqSelect');
    const subjects = getChapterFilterSubjects();

    if (subjectSelect) {
        subjectSelect.innerHTML = ['<option value="all">All Subjects</option>', ...subjects.map(name => `<option value="${name}">${name}</option>`)].join('');
        subjectSelect.value = subjects.includes(conceptDependencySubjectFilter) ? conceptDependencySubjectFilter : 'all';
        conceptDependencySubjectFilter = subjectSelect.value;
    }

    const filtered = chapterTracker.filter(item =>
        conceptDependencySubjectFilter === 'all' || subjectMatches(item.subject || '', conceptDependencySubjectFilter)
    );
    const toOption = (item) => `<option value="${escapeHtmlAttribute(item.id)}">${escapeHtml(item.subject)}: ${escapeHtml(item.chapter)}</option>`;
    const options = filtered.map(toOption).join('');
    const currentChapterValue = chapterSelect ? chapterSelect.value : '';
    const currentPrereqValue = prereqSelect ? prereqSelect.value : '';

    if (chapterSelect) {
        chapterSelect.innerHTML = `<option value="">Chapter to learn</option>${options}`;
        if (filtered.some(item => item.id === currentChapterValue)) chapterSelect.value = currentChapterValue;
    }
    if (prereqSelect) {
        prereqSelect.innerHTML = `<option value="">Prerequisite chapter</option>${options}`;
        if (filtered.some(item => item.id === currentPrereqValue)) prereqSelect.value = currentPrereqValue;
    }
}

function setConceptDependencySubjectFilter(value) {
    conceptDependencySubjectFilter = String(value || 'all');
    renderConceptDependencyControls();
    renderConceptDependencyMap();
}

function addChapterDependency() {
    const chapterSelect = document.getElementById('dependencyChapterSelect');
    const prereqSelect = document.getElementById('dependencyPrereqSelect');
    const chapterId = String(chapterSelect && chapterSelect.value ? chapterSelect.value : '').trim();
    const prereqId = String(prereqSelect && prereqSelect.value ? prereqSelect.value : '').trim();

    if (!chapterId || !prereqId) {
        alert('Select both chapter and prerequisite.');
        return;
    }
    if (chapterId === prereqId) {
        alert('A chapter cannot depend on itself.');
        return;
    }

    const chapterIdx = chapterTracker.findIndex(item => item.id === chapterId);
    const prereq = chapterTracker.find(item => item.id === prereqId);
    if (chapterIdx < 0 || !prereq) {
        alert('Selected chapters not found.');
        return;
    }

    const current = Array.isArray(chapterTracker[chapterIdx].prerequisites) ? chapterTracker[chapterIdx].prerequisites : [];
    if (current.includes(prereqId)) {
        alert('This prerequisite link already exists.');
        return;
    }

    chapterTracker[chapterIdx].prerequisites = [...current, prereqId];
    saveState({ chapterTracker });
    renderChapterTracker();
    renderConceptDependencyMap();
}

function removeChapterDependency(chapterId, prereqId) {
    const idx = chapterTracker.findIndex(item => item.id === chapterId);
    if (idx < 0) return;
    const current = Array.isArray(chapterTracker[idx].prerequisites) ? chapterTracker[idx].prerequisites : [];
    chapterTracker[idx].prerequisites = current.filter(id => id !== prereqId);
    saveState({ chapterTracker });
    renderChapterTracker();
    renderConceptDependencyMap();
}

function getChapterComplexityScore(chapterName) {
    const name = String(chapterName || "").toLowerCase();
    if (!name) return 2;
    const basicKeywords = ["intro", "introduction", "basic", "basics", "foundation", "fundamentals", "concept", "overview"];
    const advancedKeywords = ["advanced", "application", "applied", "mixed", "revision", "mock", "test", "challenge"];
    if (basicKeywords.some(word => name.includes(word))) return 0;
    if (advancedKeywords.some(word => name.includes(word))) return 3;
    return 2;
}

function getChapterSequenceNumber(chapterName) {
    const text = String(chapterName || "").trim();
    if (!text) return Number.POSITIVE_INFINITY;
    const patterns = [
        /(chapter|unit|lesson)\s*(\d{1,2})/i,
        /^(\d{1,2})[\s)\].:-]/i
    ];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && Number.isFinite(Number(match[2] || match[1]))) {
            return Number(match[2] || match[1]);
        }
    }
    return Number.POSITIVE_INFINITY;
}

function autoSuggestChapterDependencies() {
    if (!Array.isArray(chapterTracker) || chapterTracker.length < 2) {
        alert('Add at least 2 chapters to auto-suggest prerequisites.');
        return;
    }

    const filtered = chapterTracker.filter(item =>
        conceptDependencySubjectFilter === 'all' || subjectMatches(item.subject || '', conceptDependencySubjectFilter)
    );
    if (filtered.length < 2) {
        alert('Need at least 2 chapters in this filter to suggest dependencies.');
        return;
    }

    const bySubject = new Map();
    filtered.forEach(item => {
        const key = String(item.subject || "General").trim() || "General";
        const list = bySubject.get(key) || [];
        list.push(item);
        bySubject.set(key, list);
    });

    let added = 0;
    bySubject.forEach((items) => {
        const ordered = [...items].sort((a, b) => {
            const numA = getChapterSequenceNumber(a.chapter);
            const numB = getChapterSequenceNumber(b.chapter);
            if (numA !== numB) return numA - numB;
            const levelA = getChapterComplexityScore(a.chapter);
            const levelB = getChapterComplexityScore(b.chapter);
            if (levelA !== levelB) return levelA - levelB;
            const timeA = new Date(a.createdAt || 0).getTime();
            const timeB = new Date(b.createdAt || 0).getTime();
            return timeA - timeB;
        });

        for (let i = 1; i < ordered.length; i++) {
            const previous = ordered[i - 1];
            const current = ordered[i];
            const idx = chapterTracker.findIndex(item => item.id === current.id);
            if (idx < 0) continue;

            const currentPrereqs = Array.isArray(chapterTracker[idx].prerequisites) ? chapterTracker[idx].prerequisites : [];
            if (currentPrereqs.length > 0) continue;
            if (previous.id === current.id) continue;

            chapterTracker[idx].prerequisites = [...new Set([...currentPrereqs, previous.id])];
            added += 1;
        }
    });

    if (added === 0) {
        alert('No new prerequisite links suggested. Existing links already cover current order.');
        return;
    }

    saveState({ chapterTracker });
    renderChapterTracker();
    renderConceptDependencyMap();
    addActivity('diagram-project', 'Dependencies Auto-Suggested', `${added} prerequisite link(s) added`);
    alert(`Added ${added} prerequisite link(s).`);
}

function getConceptDependencyNodes() {
    const base = chapterTracker.filter(item =>
        conceptDependencySubjectFilter === 'all' || subjectMatches(item.subject || '', conceptDependencySubjectFilter)
    );
    const idSet = new Set(base.map(item => item.id));
    return base.map(item => ({
        ...item,
        prerequisites: (Array.isArray(item.prerequisites) ? item.prerequisites : []).filter(id => idSet.has(id))
    }));
}

function getConceptDependencyOrder(nodes) {
    const inDegree = new Map();
    const dependents = new Map();
    nodes.forEach(node => {
        inDegree.set(node.id, 0);
        dependents.set(node.id, []);
    });

    nodes.forEach(node => {
        node.prerequisites.forEach(prereqId => {
            inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
            const list = dependents.get(prereqId) || [];
            list.push(node.id);
            dependents.set(prereqId, list);
        });
    });

    const queue = nodes
        .filter(node => (inDegree.get(node.id) || 0) === 0)
        .sort((a, b) => String(a.subject || '').localeCompare(String(b.subject || '')) || String(a.chapter || '').localeCompare(String(b.chapter || '')))
        .map(node => node.id);

    const ordered = [];
    while (queue.length > 0) {
        const id = queue.shift();
        ordered.push(id);
        const next = dependents.get(id) || [];
        next.forEach(depId => {
            const deg = (inDegree.get(depId) || 0) - 1;
            inDegree.set(depId, deg);
            if (deg === 0) queue.push(depId);
        });
    }

    const hasCycle = ordered.length !== nodes.length;
    if (hasCycle) {
        nodes
            .filter(node => !ordered.includes(node.id))
            .forEach(node => ordered.push(node.id));
    }
    return { ordered, hasCycle };
}

function renderConceptDependencyMap() {
    const list = document.getElementById('conceptDependencyMapList');
    const summary = document.getElementById('conceptDependencySummary');
    if (!list || !summary) return;

    const nodes = getConceptDependencyNodes();
    if (nodes.length === 0) {
        summary.textContent = 'Add chapters first, then connect prerequisites.';
        list.innerHTML = '<li class="empty-state">No dependency map yet.</li>';
        return;
    }

    const byId = new Map(nodes.map(node => [node.id, node]));
    const order = getConceptDependencyOrder(nodes);
    const completedIds = new Set(nodes.filter(node => node.status === 'done').map(node => node.id));
    const withPrereq = nodes.filter(node => node.prerequisites.length > 0).length;
    summary.textContent = `${nodes.length} chapter(s) | ${withPrereq} with prerequisites${order.hasCycle ? ' | Warning: cycle detected' : ''}`;

    list.innerHTML = order.ordered.map((id, index) => {
        const node = byId.get(id);
        if (!node) return '';
        const missing = node.prerequisites.filter(prereqId => !completedIds.has(prereqId));
        const prereqItems = node.prerequisites.map(prereqId => {
            const prereq = byId.get(prereqId);
            if (!prereq) return '';
            return `
                <span class="task-subject">
                    ${escapeHtml(prereq.chapter)}
                    <button class="delete-btn" onclick="removeChapterDependency('${node.id}', '${prereqId}')"><i class="fas fa-xmark"></i></button>
                </span>
            `;
        }).join('');
        const readiness = missing.length === 0 ? 'Ready now' : `Learn ${missing.length} prerequisite(s) first`;
        return `
            <li>
                <strong>Step ${index + 1}: ${escapeHtml(node.subject)} - ${escapeHtml(node.chapter)}</strong>
                <span>${readiness} | Status: ${escapeHtml(String(node.status || 'not-started'))}</span>
                <div class="task-options">
                    ${prereqItems || '<span class="task-subject">No prerequisites</span>'}
                </div>
            </li>
        `;
    }).join('');
}

function setChapterSearchQuery(value) {
    chapterSearchQuery = String(value || '').trim();
    renderChapterTracker();
}

function setChapterFilterSubject(value) {
    chapterFilterSubject = String(value || 'all');
    renderChapterTracker();
}

function toggleChapterIncompleteOnly(checked) {
    chapterIncompleteOnly = Boolean(checked);
    renderChapterTracker();
}

function addChapterTrackerEntry() {
    const subjectInput = document.getElementById('chapterSubjectInput');
    const chapterInput = document.getElementById('chapterNameInput');
    const statusInput = document.getElementById('chapterStatusInput');
    const scoreInput = document.getElementById('chapterScoreInput');

    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'General').trim() || 'General';
    const chapter = String(chapterInput && chapterInput.value ? chapterInput.value : '').trim();
    const status = String(statusInput && statusInput.value ? statusInput.value : 'not-started');
    const score = Number(scoreInput && scoreInput.value ? scoreInput.value : NaN);

    if (!chapter) {
        alert('Please enter a chapter name.');
        return;
    }

    chapterTracker.unshift({
        id: `chapter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        subject,
        chapter,
        status: ['not-started', 'in-progress', 'done'].includes(status) ? status : 'not-started',
        testScore: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null,
        prerequisites: [],
        createdAt: new Date().toISOString()
    });
    saveState({ chapterTracker });
    renderChapterTracker();
    if (chapterInput) chapterInput.value = '';
    if (scoreInput) scoreInput.value = '';
}

function updateChapterStatus(id, status) {
    const idx = chapterTracker.findIndex(item => item.id === id);
    if (idx < 0) return;
    chapterTracker[idx].status = ['not-started', 'in-progress', 'done'].includes(status) ? status : 'not-started';
    saveState({ chapterTracker });
    renderChapterTracker();
}

function updateChapterScore(id, scoreValue) {
    const idx = chapterTracker.findIndex(item => item.id === id);
    if (idx < 0) return;
    const score = Number(scoreValue);
    chapterTracker[idx].testScore = Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : null;
    saveState({ chapterTracker });
    renderChapterTracker();
}

function deleteChapterTrackerEntry(id) {
    chapterTracker = chapterTracker
        .filter(item => item.id !== id)
        .map(item => ({
            ...item,
            prerequisites: (Array.isArray(item.prerequisites) ? item.prerequisites : []).filter(prereqId => prereqId !== id)
        }));
    saveState({ chapterTracker });
    renderChapterTracker();
}

function getRevisionTemplatePreset(grade, subject) {
    const presets = {
        "7": {
            Math: [
                "Integers and fractions fundamentals",
                "Algebra basics and simple equations",
                "Geometry fundamentals and constructions",
                "Weekly mixed worksheet and chapter test"
            ],
            Science: [
                "Nutrition in plants and animals",
                "Heat and temperature concepts",
                "Acids, bases and salts basics",
                "Weekly practical-based revision and test"
            ],
            English: [
                "Reading comprehension and vocabulary",
                "Grammar practice (tenses, modals, prepositions)",
                "Writing skills (paragraph, letter, story)",
                "Weekly literature recap and test"
            ],
            History: [
                "Early medieval world overview",
                "Regional kingdoms and culture",
                "Social change and trade",
                "Weekly map-work and chapter test"
            ]
        },
        "8": {
            Math: [
                "Rational numbers and linear equations",
                "Understanding quadrilaterals and mensuration",
                "Data handling and probability basics",
                "Weekly mixed practice and chapter test"
            ],
            Science: [
                "Crop production and microorganisms",
                "Force, friction and pressure",
                "Metals and non-metals",
                "Weekly concept recap and test"
            ],
            English: [
                "Comprehension and inference practice",
                "Grammar consolidation (voice, reported speech)",
                "Writing tasks (article, notice, email)",
                "Weekly literature revision and test"
            ],
            History: [
                "Colonial period foundations",
                "Social and political changes",
                "National movement key events",
                "Weekly timeline revision and test"
            ]
        },
        "9": {
            Math: [
                "Number systems and polynomials",
                "Linear equations and coordinate geometry",
                "Triangles and circles basics",
                "Weekly mixed NCERT exercise and test"
            ],
            Science: [
                "Matter, atoms and cells",
                "Motion and force laws",
                "Tissues and life processes basics",
                "Weekly numericals + diagram test"
            ],
            English: [
                "Reading passages and question strategy",
                "Grammar and editing practice",
                "Writing section formats",
                "Weekly literature chapter test"
            ],
            History: [
                "French Revolution and Nazism overview",
                "Indian history themes and sources",
                "Democracy and institutions recap",
                "Weekly long-answer practice and test"
            ]
        },
        "10": {
            Math: [
                "Real numbers, polynomials and pair of equations",
                "Quadratic equations, AP and coordinate geometry",
                "Triangles, circles and trigonometry",
                "Weekly full syllabus mixed mock test"
            ],
            Science: [
                "Chemical reactions, acids-bases-salts",
                "Life processes and heredity",
                "Electricity and magnetic effects",
                "Weekly board-style mixed test and error log"
            ],
            English: [
                "Reading and unseen passage strategy",
                "Grammar and editing with timed practice",
                "Writing section board patterns",
                "Weekly literature + full section test"
            ],
            History: [
                "Nationalism in Europe and India",
                "Global world and print culture",
                "Democratic politics and economy themes",
                "Weekly board-style source-based test"
            ]
        }
    };

    const byGrade = presets[String(grade)] || presets["10"];
    return byGrade[String(subject)] || byGrade.Math;
}

function renderRevisionTemplatePreview() {
    const gradeInput = document.getElementById('revisionTemplateGrade');
    const subjectInput = document.getElementById('revisionTemplateSubject');
    const previewList = document.getElementById('revisionTemplatePreviewList');
    if (!previewList) return;

    const grade = String(gradeInput && gradeInput.value ? gradeInput.value : '10');
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'Math');
    const topics = getRevisionTemplatePreset(grade, subject);

    previewList.innerHTML = topics.map((topic, idx) => `
        <li>
            <strong>Week ${idx + 1}: ${topic}</strong>
            <span>Grade ${grade} ${subject}</span>
        </li>
    `).join('');
}

function createRevisionTemplatePlan() {
    const gradeInput = document.getElementById('revisionTemplateGrade');
    const subjectInput = document.getElementById('revisionTemplateSubject');
    const previewList = document.getElementById('revisionTemplatePreviewList');

    const grade = String(gradeInput && gradeInput.value ? gradeInput.value : '10');
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'Math');
    const topics = getRevisionTemplatePreset(grade, subject);

    const createdTasks = [];
    for (let week = 1; week <= 4; week++) {
        const text = `Grade ${grade} ${subject} Revision Week ${week}: ${topics[week - 1]}`;
        const exists = tasks.some(task => String(task.text || '').trim() === text);
        if (exists) continue;
        const due = new Date();
        due.setDate(due.getDate() + (week * 7) - 1);
        const task = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text,
            subject,
            priority: week >= 3 ? 'high' : 'medium',
            difficulty: week >= 3 ? 'hard' : 'medium',
            examWeight: 4,
            estimatedHours: 1.5,
            dueDate: due.toISOString().split('T')[0],
            done: false,
            createdAt: new Date().toISOString()
        };
        tasks.push(normalizeTask(task));
        createdTasks.push(task);
    }

    if (createdTasks.length === 0) {
        renderRevisionTemplatePreview();
        alert('Revision tasks already exist for this grade and subject.');
        return;
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('calendar-check', 'Revision Template Created', `${createdTasks.length} tasks for Grade ${grade} ${subject}`);

    if (previewList) {
        previewList.innerHTML = createdTasks.map(task => `
        <li>
            <strong>${task.text}</strong>
            <span>Due: ${task.dueDate}</span>
        </li>
    `).join('');
    }
}

function getSprintRevisionPlan(days, subject) {
    const totalDays = Math.max(7, Math.min(30, Number(days) || 7));
    const normalizedSubject = String(subject || 'Math');
    const focusLibrary = {
        Math: [
            'Core formulas and concepts',
            'Worked examples from key chapters',
            'Timed problem-solving set',
            'Weak-topic drill and corrections',
            'Mixed chapter practice',
            'Previous paper questions',
            'Mock test and error log'
        ],
        Science: [
            'Concept recap and definitions',
            'Diagrams and labelled practice',
            'Numericals/application questions',
            'Weak-topic correction session',
            'Chapter-wise short tests',
            'Previous paper questions',
            'Mock test and corrections'
        ],
        English: [
            'Reading comprehension strategy',
            'Grammar drill and editing',
            'Writing format practice',
            'Literature chapter recap',
            'Weak-topic correction session',
            'Sample paper practice',
            'Mock test and corrections'
        ],
        History: [
            'Timeline and chronology recap',
            'Causes-effects long-answer prep',
            'Map/source-based practice',
            'Weak-topic correction session',
            'Chapter summary recall',
            'Previous paper questions',
            'Mock test and corrections'
        ]
    };
    const focuses = focusLibrary[normalizedSubject] || focusLibrary.Math;
    const totalBlocks = totalDays <= 7 ? 7 : totalDays <= 14 ? 8 : 12;
    const plan = [];
    for (let i = 0; i < totalBlocks; i++) {
        const dayOffset = totalBlocks === 1 ? 0 : Math.round((i * (totalDays - 1)) / (totalBlocks - 1));
        plan.push({
            dayOffset,
            title: `Sprint Day ${dayOffset + 1}: ${focuses[i % focuses.length]}`
        });
    }
    return plan;
}

function renderSprintRevisionPreview() {
    const daysInput = document.getElementById('sprintRevisionDays');
    const subjectInput = document.getElementById('sprintRevisionSubject');
    const list = document.getElementById('sprintRevisionPreviewList');
    if (!list) return;

    const days = Number(daysInput && daysInput.value ? daysInput.value : 7);
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'Math');
    const plan = getSprintRevisionPlan(days, subject);
    if (plan.length === 0) {
        list.innerHTML = '<li class="empty-state">No sprint plan generated.</li>';
        return;
    }

    list.innerHTML = plan.map(item => `
        <li>
            <strong>${item.title}</strong>
            <span>${subject} | Day ${item.dayOffset + 1}</span>
        </li>
    `).join('');
}

function createSprintRevisionTasks() {
    const daysInput = document.getElementById('sprintRevisionDays');
    const subjectInput = document.getElementById('sprintRevisionSubject');
    const days = Number(daysInput && daysInput.value ? daysInput.value : 7);
    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'Math');
    const plan = getSprintRevisionPlan(days, subject);

    if (plan.length === 0) {
        alert('Unable to generate sprint plan.');
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examWeight = days <= 7 ? 5 : days <= 14 ? 4 : 3;
    const createdTasks = [];

    plan.forEach(item => {
        const text = `${subject} ${item.title}`;
        const exists = tasks.some(task => String(task.text || '').trim() === text);
        if (exists) return;
        const due = new Date(today);
        due.setDate(due.getDate() + item.dayOffset);
        const task = normalizeTask({
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text,
            subject,
            priority: item.dayOffset >= Math.floor(days * 0.7) ? 'high' : 'medium',
            difficulty: item.dayOffset >= Math.floor(days * 0.7) ? 'hard' : 'medium',
            examWeight,
            estimatedHours: days <= 7 ? 2 : 1.5,
            dueDate: due.toISOString().split('T')[0],
            done: false,
            doneAt: '',
            createdAt: new Date().toISOString()
        });
        tasks.push(task);
        createdTasks.push(task);
    });

    if (createdTasks.length === 0) {
        alert('Sprint tasks already exist for this selection.');
        renderSprintRevisionPreview();
        return;
    }

    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('bolt', 'Sprint Revision Plan Created', `${createdTasks.length} tasks for ${days}-day ${subject} sprint`);
    alert(`${createdTasks.length} sprint revision task(s) created.`);
    renderSprintRevisionPreview();
}

function renderDoubtTracker() {
    const list = document.getElementById('doubtTrackerList');
    if (!list) return;
    if (!Array.isArray(doubtTracker) || doubtTracker.length === 0) {
        list.innerHTML = '<li class="empty-state">No doubts added yet</li>';
        return;
    }

    const ordered = [...doubtTracker].sort((a, b) => {
        if (a.status !== b.status) return a.status === 'unresolved' ? -1 : 1;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    list.innerHTML = ordered.map(item => `
        <li>
            <strong>${item.subject} | ${item.chapter}</strong>
            <span>${item.text}</span>
            <div class="task-options">
                <span class="assignment-type">${item.status === 'resolved' ? 'Resolved' : 'Unresolved'}</span>
                <button class="action-btn" onclick="toggleDoubtResolved('${item.id}')">
                    <i class="fas ${item.status === 'resolved' ? 'fa-rotate-left' : 'fa-check'}"></i>
                    ${item.status === 'resolved' ? 'Mark Unresolved' : 'Mark Resolved'}
                </button>
                <button class="delete-btn" onclick="deleteDoubtTrackerEntry('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');
}

function getDoubtEscalationQueue(limit = 10, now = new Date()) {
    const unresolved = (doubtTracker || []).filter(item => item && item.status !== 'resolved');
    if (unresolved.length === 0) return [];

    const frequencyMap = new Map();
    unresolved.forEach(item => {
        const subject = String(item.subject || 'General').trim().toLowerCase();
        const chapter = String(item.chapter || 'General').trim().toLowerCase();
        const key = `${subject}||${chapter}`;
        frequencyMap.set(key, (frequencyMap.get(key) || 0) + 1);
    });

    const scored = unresolved.map(item => {
        const createdAt = new Date(item.createdAt || 0);
        const ageDays = Math.max(1, Math.ceil((now - createdAt) / (1000 * 60 * 60 * 24)));
        const ageScore = Math.min(40, ageDays * 4);

        const subject = String(item.subject || 'General').trim();
        const chapter = String(item.chapter || 'General').trim();
        const freqKey = `${subject.toLowerCase()}||${chapter.toLowerCase()}`;
        const frequency = frequencyMap.get(freqKey) || 1;
        const frequencyScore = Math.min(25, Math.max(0, frequency - 1) * 8);

        const matchingExamDays = (exams || [])
            .filter(exam => exam && exam.date && subjectMatches(subject, exam.subject))
            .map(exam => daysUntil(exam.date, now))
            .filter(days => Number.isFinite(days) && days >= 0);
        const closestExamDays = matchingExamDays.length > 0 ? Math.min(...matchingExamDays) : null;
        let examScore = 0;
        if (closestExamDays !== null) {
            if (closestExamDays <= 1) examScore = 35;
            else if (closestExamDays <= 3) examScore = 30;
            else if (closestExamDays <= 7) examScore = 24;
            else if (closestExamDays <= 14) examScore = 16;
            else if (closestExamDays <= 30) examScore = 8;
        }

        return {
            ...item,
            ageDays,
            frequency,
            closestExamDays,
            ageScore,
            examScore,
            frequencyScore,
            escalationScore: Math.round(ageScore + examScore + frequencyScore)
        };
    });

    return scored
        .sort((a, b) => {
            if (b.escalationScore !== a.escalationScore) return b.escalationScore - a.escalationScore;
            return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        })
        .slice(0, Math.max(1, limit));
}

function addEscalatedDoubtTask(id) {
    const queueItem = getDoubtEscalationQueue(100).find(item => item.id === id);
    if (!queueItem) return;

    const title = `Resolve doubt: ${queueItem.subject} - ${queueItem.chapter}`;
    const alreadyExists = tasks.some(task =>
        String(task.text || '').trim() === title &&
        String(task.subject || '').trim().toLowerCase() === String(queueItem.subject || '').trim().toLowerCase() &&
        !task.done
    );
    if (alreadyExists) {
        alert('A priority task for this doubt already exists.');
        return;
    }

    const due = new Date();
    const nearestExam = Number.isFinite(queueItem.closestExamDays) ? queueItem.closestExamDays : null;
    due.setDate(due.getDate() + (nearestExam !== null && nearestExam <= 3 ? 0 : 1));

    tasks.push(normalizeTask({
        text: title,
        subject: queueItem.subject || 'General',
        priority: 'high',
        difficulty: 'hard',
        examWeight: nearestExam !== null ? 5 : 4,
        estimatedHours: 1,
        dueDate: due.toISOString().split('T')[0],
        done: false,
        createdAt: new Date().toISOString()
    }));

    saveTasks();
    renderTasks();
    renderDashboard();
    addActivity('triangle-exclamation', 'Escalated Doubt Task Added', title);
}

function renderDoubtEscalationQueue() {
    const summary = document.getElementById('doubtEscalationSummary');
    const list = document.getElementById('doubtEscalationList');
    if (!summary || !list) return;

    const unresolvedCount = (doubtTracker || []).filter(item => item && item.status !== 'resolved').length;
    const queue = getDoubtEscalationQueue(10);
    if (queue.length === 0) {
        summary.textContent = unresolvedCount === 0
            ? 'No unresolved doubts in queue.'
            : 'No escalated items available right now.';
        list.innerHTML = '<li class="empty-state">Doubts will be auto-prioritized by age, exam relevance, and frequency.</li>';
        return;
    }

    const topScore = queue[0].escalationScore;
    summary.textContent = `${unresolvedCount} unresolved doubts | Top escalation score: ${topScore}`;
    list.innerHTML = queue.map(item => `
        <li>
            <strong>${item.subject} | ${item.chapter}</strong>
            <span>${item.text}</span>
            <div class="assignment-meta">
                <span>Score ${item.escalationScore} = Age ${item.ageScore} + Exam ${item.examScore} + Frequency ${item.frequencyScore}</span>
                <span class="task-due">${item.closestExamDays === null ? 'No upcoming exam' : `${item.closestExamDays} day(s) to exam`}</span>
            </div>
            <div class="task-options">
                <button class="action-btn" onclick="addEscalatedDoubtTask('${item.id}')">
                    <i class="fas fa-list-check"></i> Add Priority Task
                </button>
                <button class="action-btn" onclick="toggleDoubtResolved('${item.id}')">
                    <i class="fas fa-check"></i> Mark Resolved
                </button>
            </div>
        </li>
    `).join('');
}

function addDoubtTrackerEntry() {
    const subjectInput = document.getElementById('doubtSubjectInput');
    const chapterInput = document.getElementById('doubtChapterInput');
    const textInput = document.getElementById('doubtTextInput');

    const subject = String(subjectInput && subjectInput.value ? subjectInput.value : 'General').trim() || 'General';
    const chapter = String(chapterInput && chapterInput.value ? chapterInput.value : 'General').trim() || 'General';
    const text = String(textInput && textInput.value ? textInput.value : '').trim();
    if (!text) {
        alert('Please write your doubt.');
        return;
    }

    doubtTracker.unshift({
        id: `doubt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        subject,
        chapter,
        text,
        status: 'unresolved',
        createdAt: new Date().toISOString(),
        resolvedAt: ''
    });
    saveState({ doubtTracker });
    renderDoubtTracker();
    renderDoubtEscalationQueue();
    addActivity('circle-question', 'Doubt Added', `${subject} | ${chapter}`);
    if (textInput) textInput.value = '';
}

function toggleDoubtResolved(id) {
    const idx = doubtTracker.findIndex(item => item.id === id);
    if (idx < 0) return;
    const current = doubtTracker[idx];
    const resolved = current.status !== 'resolved';
    doubtTracker[idx] = {
        ...current,
        status: resolved ? 'resolved' : 'unresolved',
        resolvedAt: resolved ? new Date().toISOString() : ''
    };
    saveState({ doubtTracker });
    renderDoubtTracker();
    renderDoubtEscalationQueue();
}

function deleteDoubtTrackerEntry(id) {
    doubtTracker = doubtTracker.filter(item => item.id !== id);
    saveState({ doubtTracker });
    renderDoubtTracker();
    renderDoubtEscalationQueue();
}

function renderReflectionHistory() {
    const list = document.getElementById('reflectionHistoryList');
    if (!list) return;
    if (!Array.isArray(reflectionEntries) || reflectionEntries.length === 0) {
        list.innerHTML = '<li class="empty-state">No reflections yet</li>';
        return;
    }
    list.innerHTML = reflectionEntries.slice(0, 12).map(item => `
        <li>
            <strong>${item.subject} | ${item.minutes} min</strong>
            <span>Learned: ${item.learned || '-'} | Confusing: ${item.confusing || '-'}</span>
        </li>
    `).join('');
}

function openReflectionCheckin(context = {}) {
    const modal = document.getElementById('reflectionModal');
    if (!modal) return;
    pendingReflectionContext = {
        subject: String(context.subject || pendingReflectionContext.subject || 'General'),
        minutes: Number(context.minutes) || pendingReflectionContext.minutes || 0
    };
    const subjectInput = document.getElementById('reflectionSubjectInput');
    const minutesInput = document.getElementById('reflectionSessionMinutesInput');
    const learnedInput = document.getElementById('reflectionLearnedInput');
    const confusingInput = document.getElementById('reflectionConfusingInput');
    if (subjectInput) subjectInput.value = String(pendingReflectionContext.subject || 'General');
    if (minutesInput) minutesInput.value = String(Number(pendingReflectionContext.minutes) || 0);
    if (learnedInput) learnedInput.value = '';
    if (confusingInput) confusingInput.value = '';
    modal.classList.add('active');
}

function closeReflectionCheckin() {
    const modal = document.getElementById('reflectionModal');
    if (!modal) return;
    modal.classList.remove('active');
}

function saveReflectionCheckin() {
    const subject = String(document.getElementById('reflectionSubjectInput')?.value || 'General').trim() || 'General';
    const minutes = Number(document.getElementById('reflectionSessionMinutesInput')?.value || 0);
    const learned = String(document.getElementById('reflectionLearnedInput')?.value || '').trim();
    const confusing = String(document.getElementById('reflectionConfusingInput')?.value || '').trim();

    if (!learned && !confusing) {
        alert('Please add at least one reflection point.');
        return;
    }

    reflectionEntries.unshift({
        id: `reflection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        subject,
        minutes: Number.isFinite(minutes) ? Math.max(0, Math.round(minutes)) : 0,
        learned,
        confusing,
        createdAt: new Date().toISOString()
    });
    saveState({ reflectionEntries });
    pendingReflectionRequired = false;
    pendingReflectionContext = { subject: "General", minutes: 0 };
    closeReflectionCheckin();
    renderReflectionHistory();
    addActivity('pen', 'Reflection Saved', `${subject} study reflection logged`);
}

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
    renderGoalRoadmap();
    renderCareerPathTeaser();
    renderChapterTracker();
    renderRevisionTemplatePreview();
    renderSprintRevisionPreview();
    renderDoubtTracker();
    renderDoubtEscalationQueue();
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
function getTimerModeLabel(minutes) {
    if (minutes >= 25) return 'Focus';
    if (minutes >= 15) return 'Long Break';
    return 'Short Break';
}

function getSelectedTimerSubject() {
    const select = document.getElementById('timerSubjectSelect');
    return select && select.value ? select.value : 'General';
}

function renderTimerSubjectOptions() {
    const select = document.getElementById('timerSubjectSelect');
    if (!select) return;
    const existing = select.value || 'General';
    const defaultSubjects = ['General', 'Math', 'Science', 'English', 'History', 'Geography', 'Programming'];
    const customSubjects = subjects
        .map(s => String((s && s.name) || '').trim())
        .filter(Boolean);
    const options = [...new Set([...defaultSubjects, ...customSubjects])];
    select.innerHTML = options.map(name => `<option value="${name}">${name}</option>`).join('');
    select.value = options.includes(existing) ? existing : 'General';
}

function updateTimerDisplay() {
    document.getElementById('timerMinutes').textContent = timerMinutes.toString().padStart(2, '0');
    document.getElementById('timerSeconds').textContent = timerSeconds.toString().padStart(2, '0');
}

function getConsecutiveFocusStats() {
    let focusMinutes = 0;
    let focusSessions = 0;

    for (let i = pomodoroSessions.length - 1; i >= 0; i--) {
        const session = pomodoroSessions[i];
        const type = String((session && session.type) || "");
        if (type === "Short Break" || type === "Long Break" || type === "Break") break;
        if (type === "Focus") {
            focusSessions += 1;
            focusMinutes += Number(session.minutes) || 0;
        }
    }

    return { focusMinutes, focusSessions };
}

function isBurnoutRisk(stats = getConsecutiveFocusStats()) {
    return stats.focusMinutes >= BURNOUT_GUARD_MINUTES || stats.focusSessions >= BURNOUT_GUARD_FOCUS_SESSIONS;
}

function renderBurnoutGuardHint() {
    const hint = document.getElementById('burnoutGuardHint');
    if (!hint) return;

    const stats = getConsecutiveFocusStats();
    if (isBurnoutRisk(stats)) {
        hint.textContent = `Burnout Guard: ${stats.focusMinutes} min across ${stats.focusSessions} focus sessions. Break recommended.`;
        hint.style.color = '#b91c1c';
        return;
    }

    hint.textContent = `Burnout Guard: ${stats.focusMinutes} min focus streak (${stats.focusSessions} session${stats.focusSessions === 1 ? '' : 's'}).`;
    hint.style.color = '';
}

function persistFocusShieldSettings() {
    localStorage.setItem(FOCUS_SHIELD_SETTINGS_KEY, JSON.stringify({
        enabled: Boolean(focusShieldSettings.enabled),
        strict: Boolean(focusShieldSettings.strict),
        strictCooldownSeconds: Number(focusShieldSettings.strictCooldownSeconds) || 10,
        gentleCooldownSeconds: Number(focusShieldSettings.gentleCooldownSeconds) || 3
    }));
}

function renderFocusShieldStatus() {
    const enableCheck = document.getElementById('focusShieldEnableCheck');
    const strictCheck = document.getElementById('focusShieldStrictCheck');
    const strictCooldownSelect = document.getElementById('focusShieldStrictCooldown');
    const gentleCooldownSelect = document.getElementById('focusShieldGentleCooldown');
    const statusEl = document.getElementById('focusShieldStatus');
    if (enableCheck) enableCheck.checked = Boolean(focusShieldSettings.enabled);
    if (strictCheck) strictCheck.checked = Boolean(focusShieldSettings.strict);
    if (strictCooldownSelect) strictCooldownSelect.value = String(Number(focusShieldSettings.strictCooldownSeconds) || 10);
    if (gentleCooldownSelect) gentleCooldownSelect.value = String(Number(focusShieldSettings.gentleCooldownSeconds) || 3);
    if (!statusEl) return;

    if (!focusShieldSettings.enabled) {
        statusEl.textContent = 'Focus Shield: Off';
        return;
    }
    statusEl.textContent = focusShieldSettings.strict
        ? `Focus Shield: Strict mode on (${Number(focusShieldSettings.strictCooldownSeconds) || 10}s lock after switching apps).`
        : `Focus Shield: Gentle mode on (${Number(focusShieldSettings.gentleCooldownSeconds) || 3}s reminder lock).`;
}

function setFocusShieldEnabled(checked) {
    focusShieldSettings.enabled = Boolean(checked);
    if (!focusShieldSettings.enabled) {
        focusShieldPendingViolation = false;
        closeFocusShieldModal();
    }
    persistFocusShieldSettings();
    renderFocusShieldStatus();
}

function setFocusShieldStrict(checked) {
    focusShieldSettings.strict = Boolean(checked);
    persistFocusShieldSettings();
    renderFocusShieldStatus();
}

function setFocusShieldStrictCooldown(value) {
    const seconds = Number(value);
    focusShieldSettings.strictCooldownSeconds = [5, 10, 15, 20, 30].includes(seconds) ? seconds : 10;
    persistFocusShieldSettings();
    renderFocusShieldStatus();
}

function setFocusShieldGentleCooldown(value) {
    const seconds = Number(value);
    focusShieldSettings.gentleCooldownSeconds = [1, 2, 3, 5].includes(seconds) ? seconds : 3;
    persistFocusShieldSettings();
    renderFocusShieldStatus();
}

function isFocusSessionRunning() {
    return Boolean(isTimerRunning) && getTimerModeLabel(timerModeMinutes) === 'Focus';
}

function isFocusShieldWatchActive() {
    return Boolean(focusShieldSettings.enabled) && isFocusSessionRunning();
}

function closeFocusShieldModal() {
    const modal = document.getElementById('focusShieldModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.classList.remove('strict');
    document.body.classList.remove('focus-shield-lock');
    if (focusShieldCooldownTimer) {
        clearInterval(focusShieldCooldownTimer);
        focusShieldCooldownTimer = null;
    }
    focusShieldUnlockReady = false;
}

function resumeFromFocusShield() {
    if (!focusShieldUnlockReady) return;
    closeFocusShieldModal();
    focusShieldPendingViolation = false;
    renderFocusShieldStatus();
}

function openFocusShieldModal() {
    const modal = document.getElementById('focusShieldModal');
    const text = document.getElementById('focusShieldModalText');
    const button = document.getElementById('focusShieldResumeBtn');
    if (!modal || !text || !button) return;

    const cooldownSeconds = focusShieldSettings.strict
        ? (Number(focusShieldSettings.strictCooldownSeconds) || 10)
        : (Number(focusShieldSettings.gentleCooldownSeconds) || 3);
    let left = cooldownSeconds;
    focusShieldUnlockReady = false;
    modal.classList.toggle('strict', Boolean(focusShieldSettings.strict));
    document.body.classList.add('focus-shield-lock');
    text.textContent = focusShieldSettings.strict
        ? 'Strict Focus Shield: return to study only. Unlock starts after cooldown.'
        : 'Focus Shield reminder: return to study mode and continue your session.';
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-hourglass-half"></i> Resume in ${left}s`;
    modal.classList.add('active');

    if (focusShieldCooldownTimer) clearInterval(focusShieldCooldownTimer);
    focusShieldCooldownTimer = setInterval(() => {
        left -= 1;
        if (left <= 0) {
            clearInterval(focusShieldCooldownTimer);
            focusShieldCooldownTimer = null;
            button.disabled = false;
            focusShieldUnlockReady = true;
            button.innerHTML = '<i class="fas fa-lock-open"></i> Resume Focus';
            return;
        }
        button.innerHTML = `<i class="fas fa-hourglass-half"></i> Resume in ${left}s`;
    }, 1000);
}

function handleFocusShieldVisibilityChange() {
    if (!focusShieldSettings.enabled) return;

    if (document.visibilityState === 'hidden') {
        if (isFocusShieldWatchActive()) {
            focusShieldPendingViolation = true;
            focusShieldLastHiddenAt = new Date().toISOString();
            timerCurrentSessionPaused = true;
        }
        return;
    }

    if (document.visibilityState === 'visible' && focusShieldPendingViolation && isFocusShieldWatchActive()) {
        openFocusShieldModal();
        addActivity('shield-halved', 'Focus Shield Triggered', 'Returned after leaving active focus session');
    }
}

function setupFocusShieldListeners() {
    if (focusShieldListenersAttached) return;
    focusShieldListenersAttached = true;
    const modal = document.getElementById('focusShieldModal');
    document.addEventListener('visibilitychange', handleFocusShieldVisibilityChange);
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!modal || !modal.classList.contains('active')) return;
        event.preventDefault();
    });
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target !== modal) return;
            if (!focusShieldUnlockReady) {
                const text = document.getElementById('focusShieldModalText');
                if (text) text.textContent = 'Complete cooldown, then press Resume Focus.';
            }
        });
    }
    window.addEventListener('blur', () => {
        if (!focusShieldSettings.enabled) return;
        if (isFocusShieldWatchActive()) {
            focusShieldPendingViolation = true;
            focusShieldLastHiddenAt = new Date().toISOString();
            timerCurrentSessionPaused = true;
        }
    });
}

function promptBurnoutGuardBreak(contextLabel) {
    const stats = getConsecutiveFocusStats();
    if (!isBurnoutRisk(stats)) {
        renderBurnoutGuardHint();
        return false;
    }

    const startBreakNow = confirm(
        `Burnout Guard: You have focused for ${stats.focusMinutes} minutes across ${stats.focusSessions} sessions without a break. ` +
        `Start a 5-minute break now?`
    );

    if (startBreakNow) {
        setTimerMode(5);
        addActivity('mug-hot', 'Burnout Guard Break', `Suggested after ${stats.focusMinutes} min focus streak (${contextLabel})`);
    }
    renderBurnoutGuardHint();
    return startBreakNow;
}

function startTimer() {
    if (isTimerRunning) return;
    const modeLabel = getTimerModeLabel(timerModeMinutes);
    if (modeLabel === 'Focus' && !hasMoodCheckinForToday()) {
        const quickSetNormal = confirm('Mood check-in for today is missing. Press OK to set Normal now, or Cancel to choose Light/Intense first.');
        if (quickSetNormal) {
            setStudyMood('normal');
        } else {
            alert('Select Light, Normal, or Intense mood before starting Focus timer.');
            return;
        }
    }
    if (modeLabel === 'Focus' && pendingReflectionRequired) {
        alert('Please complete your previous reflection check-in before starting the next focus session.');
        openReflectionCheckin(pendingReflectionContext);
        return;
    }
    if (modeLabel === 'Focus' && promptBurnoutGuardBreak('before focus session')) {
        return;
    }

    if (modeLabel === 'Focus' && timerMinutes === timerModeMinutes && timerSeconds === 0) {
        timerCurrentSessionPaused = false;
        timerCurrentSessionStartOnTimeAwarded = false;
        const startLagMs = Date.now() - (timerModeSetAt || Date.now());
        if (startLagMs <= (2 * 60 * 1000)) {
            timerCurrentSessionStartOnTimeAwarded = true;
            microWinStats.startOnTimeCount = Math.max(0, Number(microWinStats.startOnTimeCount) || 0) + 1;
            awardMicroWin(2, 'Started focus session on time');
        }
    }

    isTimerRunning = true;
    focusShieldPendingViolation = false;
    closeFocusShieldModal();
    renderFocusShieldStatus();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                playNotificationSound();
                
                // Save session
                const sessionMinutes = timerModeMinutes;
                const type = getTimerModeLabel(timerModeMinutes);
                const subject = type === 'Focus' ? getSelectedTimerSubject() : 'Break';
                pomodoroSessions.push(normalizePomodoroSession({
                    minutes: sessionMinutes,
                    type,
                    subject,
                    date: new Date().toISOString()
                }));
                if (type === 'Focus') {
                    weeklyStats.studyHours += (sessionMinutes / 60);
                    microWinStats.focusCompletedCount = Math.max(0, Number(microWinStats.focusCompletedCount) || 0) + 1;
                    awardMicroWin(5, 'Finished Pomodoro focus session');
                    if (!timerCurrentSessionPaused) {
                        microWinStats.noDistractionStreak = Math.max(0, Number(microWinStats.noDistractionStreak) || 0) + 1;
                        microWinStats.bestNoDistractionStreak = Math.max(
                            Math.max(0, Number(microWinStats.bestNoDistractionStreak) || 0),
                            microWinStats.noDistractionStreak
                        );
                        awardMicroWin(3, 'No-distraction focus streak');
                        if (microWinStats.noDistractionStreak % 3 === 0) {
                            awardMicroWin(8, `No-distraction streak ${microWinStats.noDistractionStreak}`);
                        }
                    } else {
                        microWinStats.noDistractionStreak = 0;
                    }
                    saveState({ microWinStats });
                }
                saveState({ pomodoroSessions, weeklyStats });
                renderPomodoroHistory();
                renderDashboard();
                renderAnalytics();
                renderBurnoutGuardHint();

                if (type === 'Focus') {
                    promptBurnoutGuardBreak('after focus session');
                    pendingReflectionRequired = true;
                    pendingReflectionContext = { subject, minutes: sessionMinutes };
                    openReflectionCheckin({ subject, minutes: sessionMinutes });
                } else {
                    alert('Timer complete! Take a break!');
                }
                document.getElementById('startBtn').disabled = false;
                document.getElementById('pauseBtn').disabled = true;
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }

        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if (getTimerModeLabel(timerModeMinutes) === 'Focus') {
        timerCurrentSessionPaused = true;
    }
    closeFocusShieldModal();
    renderFocusShieldStatus();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetTimer() {
    pauseTimer();
    focusShieldPendingViolation = false;
    setTimerMode(timerModeMinutes || 25);
    renderFocusShieldStatus();
}

function setTimerMode(minutes) {
    timerModeMinutes = minutes;
    timerMinutes = minutes;
    timerSeconds = 0;
    timerModeSetAt = Date.now();
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

    const topTask = rankTasks(dueSoon, { now: new Date(), weakSubjects: smartSettings.weakSubjects || [], exams })[0];
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
        distractionLog,
        microWinStats,
        weakTopicStats,
        chapterTracker,
        doubtTracker,
        reflectionEntries,
        studyStreak,
        bestStreak,
        goals,
        goalRoadmap,
        timetableEntries,
        resources,
        studyMaterials,
        freeNotesLibrary,
        quizScores,
        mistakeNotebook,
        pastPaperAttempts,
        teacherUpdates,
        smartSettings,
        studyMood,
        dailyPlan,
        recoveryPlan,
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
            if (data.flashcards) flashcards = normalizeFlashcards(data.flashcards);
            if (data.assignments) assignments = data.assignments;
            if (data.exams) exams = data.exams;
            if (data.subjects) subjects = data.subjects;
            if (data.gpaHistory) gpaHistory = data.gpaHistory;
            if (data.pomodoroSessions) pomodoroSessions = normalizePomodoroSessions(data.pomodoroSessions);
            if (Array.isArray(data.activityLog)) activityLog = data.activityLog;
            if (data.weeklyStats) weeklyStats = { ...DEFAULT_STATE.weeklyStats, ...data.weeklyStats };
            if (Array.isArray(data.distractionLog)) distractionLog = normalizeDistractionLog(data.distractionLog);
            if (data.microWinStats) microWinStats = normalizeMicroWinStats(data.microWinStats);
            if (data.weakTopicStats) weakTopicStats = normalizeWeakTopicStats(data.weakTopicStats);
            if (Array.isArray(data.chapterTracker)) chapterTracker = normalizeChapterTracker(data.chapterTracker);
            if (Array.isArray(data.doubtTracker)) doubtTracker = normalizeDoubtTracker(data.doubtTracker);
            if (Array.isArray(data.reflectionEntries)) reflectionEntries = normalizeReflectionEntries(data.reflectionEntries);
            if (Number.isFinite(data.studyStreak)) studyStreak = data.studyStreak;
            if (Number.isFinite(data.bestStreak)) bestStreak = data.bestStreak;
            if (data.goals) goals = { ...DEFAULT_STATE.goals, ...data.goals };
            if (data.goalRoadmap) goalRoadmap = normalizeGoalRoadmap(data.goalRoadmap);
            if (Array.isArray(data.timetableEntries)) timetableEntries = data.timetableEntries;
            if (Array.isArray(data.resources)) resources = data.resources;
            if (Array.isArray(data.studyMaterials) && data.studyMaterials.length > 0) studyMaterials = data.studyMaterials;
            if (Array.isArray(data.freeNotesLibrary) && data.freeNotesLibrary.length > 0) freeNotesLibrary = data.freeNotesLibrary;
            if (Array.isArray(data.quizScores)) quizScores = data.quizScores;
            if (Array.isArray(data.mistakeNotebook)) mistakeNotebook = normalizeMistakeNotebook(data.mistakeNotebook);
            if (Array.isArray(data.pastPaperAttempts)) pastPaperAttempts = normalizePastPaperAttempts(data.pastPaperAttempts);
            if (Array.isArray(data.teacherUpdates)) teacherUpdates = data.teacherUpdates;
            if (data.smartSettings) smartSettings = normalizeSmartSettings(data.smartSettings);
            if (data.studyMood) studyMood = normalizeStudyMood(data.studyMood);
            if (data.dailyPlan) dailyPlan = { ...DEFAULT_STATE.dailyPlan, ...data.dailyPlan };
            if (data.recoveryPlan) recoveryPlan = normalizeRecoveryPlan(data.recoveryPlan);
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
                distractionLog,
                microWinStats,
                weakTopicStats,
                chapterTracker,
                doubtTracker,
                reflectionEntries,
                studyStreak,
                bestStreak,
                goals,
                goalRoadmap,
                timetableEntries,
                resources,
                studyMaterials,
                freeNotesLibrary,
                quizScores,
                mistakeNotebook,
                pastPaperAttempts,
                teacherUpdates,
                smartSettings,
                studyMood,
                dailyPlan,
                recoveryPlan,
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

function escapeHtmlAttribute(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;");
}

function bootstrapAuthenticatedApp() {
    if (appBootstrapped) return;
    appBootstrapped = true;

    loadTheme();
    setupNetworkStatusListeners();
    setupPresenceLifecycleListeners();
    setupPWAInstall();
    registerServiceWorker();
    autoScheduleSpacedRevisionTasks({ silent: true });
    autoReplanMissedTasksOnNewDay();
    autoGenerateRecoveryPlanIfNeeded();
    smartSettings = normalizeSmartSettings(smartSettings);
    applySmartSettingsEffects();
    setupFocusShieldListeners();
    renderDashboard();
    renderTasks();
    renderCalendar();
    renderFlashcards();
    renderQuizPage();
    renderAdminPage();
    renderTimetable();
    renderFreeNotes();
    renderAnalytics();
    renderPomodoroHistory();
    renderProfile();
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

function ensureVisibleShellState() {
    const authContainer = document.getElementById('authContainer');
    const appContainer = document.getElementById('appContainer');
    const activePage = document.querySelector('.page-content.active');
    const dashboardPage = document.getElementById('page-dashboard');

    // If both shells are hidden, recover to auth view.
    const authDisplay = authContainer ? authContainer.style.display : '';
    const appDisplay = appContainer ? appContainer.style.display : '';
    if ((authDisplay === 'none' || !authDisplay) && appDisplay === 'none') {
        if (authContainer) authContainer.style.display = 'flex';
        if (appContainer) appContainer.style.display = 'none';
    }

    // If app shell is visible but no active page exists, force dashboard visible.
    if (appContainer && appContainer.style.display !== 'none' && !activePage && dashboardPage) {
        dashboardPage.classList.add('active');
        const dashboardNav = document.querySelector('.nav-item[data-page="dashboard"]');
        if (dashboardNav) {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            dashboardNav.classList.add('active');
        }
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) pageTitle.textContent = 'Dashboard';
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Skip full app bootstrapping when script.js is loaded by lightweight test pages.
    if (!document.getElementById('page-dashboard')) {
        return;
    }

    try {
        ensureVisibleShellState();
        setupFirebaseAuthObserver();
        applyAuthState();
        ensureVisibleShellState();

        const taskScoreModal = document.getElementById('taskScoreModal');
        if (taskScoreModal) {
            taskScoreModal.addEventListener('click', (event) => {
                if (event.target === taskScoreModal) {
                    closeTaskScoreModal();
                }
            });
        }

        const reflectionModal = document.getElementById('reflectionModal');
        if (reflectionModal) {
            reflectionModal.addEventListener('click', (event) => {
                if (event.target === reflectionModal) {
                    closeReflectionCheckin();
                }
            });
        }
    } catch (err) {
        const authContainer = document.getElementById('authContainer');
        const appContainer = document.getElementById('appContainer');
        if (authContainer) authContainer.style.display = 'flex';
        if (appContainer) appContainer.style.display = 'none';
        console.error('Startup error:', err);
    }
});







