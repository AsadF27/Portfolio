/**
 * Single source of truth for portfolio content.
 * Projects are curated two-tier: significant points (front) + see-more detail (tucked).
 */

export const profile = {
  name: "Asad Faridi",
  firstName: "Asad",
  initials: "AF",
  title: "Digital Transformation & New Initiatives Engineer",
  company: "Fourth Partner Energy",
  location: "Ranchi, India",
  email: "asadfaridi27@gmail.com",
  phone: "+91 92295 75417",
  available: "Open to building enterprise AI platforms",

  uspLead: "I build enterprise AI systems that turn",
  uspRotate: ["weeks of manual work", "fragmented spreadsheets", "hours of GPU compute", "siloed workflows"],
  uspTail: "into seconds.",

  keywords: ["RAG & Vector Search", "GPU-Accelerated AI", "Enterprise Web Portals", "Sub-Second Latency", "Microservices"],

  bio: "Digital Transformation engineer at Fourth Partner Energy. I build the platforms that replace slow, manual work with fast, auditable systems people use every day.",
  bio2: "Measurable impact over busywork — with a competitive programmer's instinct for getting the fundamentals right. The numbers are in the work below.",
};

export const heroStats = [
  { value: "100+", label: "colleagues using tools I shipped" },
  { value: "88%", label: "faster GPU preprocessing pipeline" },
  { value: "< 5s", label: "to find yourself across event galleries" },
  { value: "2+", label: "years engineering in production" },
];

export const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/asad27" },
  { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/user/asad27" },
  { label: "CodeChef", url: "https://www.codechef.com/users/asad_27" },
  { label: "Codeforces", url: "https://codeforces.com/profile/kaju.pista" },
];

export const proofPoints = [
  "Ranked 1st at institute on GeeksforGeeks (Global Rank 2464)",
  "Max rating 1603 (3★) on CodeChef · Specialist on Codeforces",
  "AI tools adopted across 100+ employees at Fourth Partner Energy",
];

export type SkillGroup = { group: string; items: string[] };
export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["C / C++", "Python", "X++", "SQL"] },
  { group: "AI / ML", items: ["RAG", "FAISS", "InsightFace", "CUDA", "TensorRT"] },
  { group: "Web", items: ["Next.js", "React", "FastAPI", "Flask"] },
  { group: "Cloud", items: ["Azure", "Entra ID (SSO)", "Microsoft Graph", "Microservices"] },
  { group: "Core", items: ["Dynamics 365", "Power BI", "System Design", "DSA"] },
];

export type Experience = { company: string; role: string; period: string; points: string[] };
export const experience: Experience[] = [
  {
    company: "Fourth Partner Energy",
    role: "Digital Transformation & New Initiatives",
    period: "Nov 2024 — Present",
    points: [
      "Built the ESG Digital Hub — one portal for five safety & compliance workflows, with a self-hosted AI assistant.",
      "Shipped FPEL PhotoBooth: find yourself across years of event photos in seconds.",
      "Cut audit cycles 40% and grievance resolution 35% with D365 modules.",
    ],
  },
  {
    company: "Fourth Partner Energy",
    role: "IT Support & Software Management Intern",
    period: "May 2024 — Nov 2024",
    points: [
      "Automated reporting — saved 75% of weekly prep time and cut data errors by 98%.",
      "Rolled out 4 custom GPT tools across 100+ employees.",
    ],
  },
];

export const education = {
  school: "Indian Institute of Information Technology, Bhagalpur",
  degree: "B.Tech, Computer Science & Engineering",
  period: "2020 — 2024 · CGPA 7.75 / 10",
};

/* ============================================================
   FEATURED WORK — significant points up front, detail in "see more"
   ============================================================ */
export type ImpactPoint = { value: string; text: string };
export type Featured = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  status: string;
  accent: string;
  mockup: "dashboard" | "grid" | "faces";
  heroStat: { value: string; label: string };
  significant: ImpactPoint[];
  seeMore: string[];
  stack: string[];
};

export const featured: Featured[] = [
  {
    id: "esg-digital-hub",
    index: "01",
    name: "ESG Digital Hub",
    tagline: "One portal that replaced safety spreadsheets across every FPEL site.",
    status: "Live in production",
    accent: "#2dd4bf",
    mockup: "dashboard",
    heroStat: { value: "5", label: "safety & compliance workflows unified in one portal" },
    significant: [
      { value: "5 modules", text: "Unifies five end-to-end safety & compliance workflows in one portal." },
      { value: "Live", text: "Used daily in production by site engineers, project teams and ESG leadership." },
      { value: "", text: "Replaced scattered spreadsheets, emails and ad-hoc trackers with one auditable system." },
      { value: "0", text: "Self-hosted AI assistant answers EHS questions (English / Hindi) with zero external LLM calls." },
    ],
    seeMore: [
      "Five modules cover the full EHS/ESG function: Observations, Incidents, Permit-to-Work, Good Observation, and Senior Management Walkdowns.",
      "Every state change fires a Microsoft Graph email with deep-link action tokens, so approvers act straight from Outlook on mobile.",
      "Role-aware by design: four personas (ESG, SET, XCOM, USER) enforced server-side on every endpoint, with a full audit log per record.",
      "Incidents get fishbone + why-tree root-cause analysis; observations get 1–25 risk scoring; walkdowns get risk-based SLAs (Fatal 24h, Serious 72h).",
      "The self-hosted RAG assistant (BGE-M3 embeddings → FAISS → reranker → LLM) runs entirely inside FPEL's Azure tenant for data residency.",
      "Grounded in FPEL's own ESMS, EHS and HIRA documents with source citations; answers stream live and auto-switch to Hindi.",
      "Background workers chase pending reviews, overdue closures and expiring permits; dashboards offer filtering and one-click Excel export.",
    ],
    stack: ["Next.js 15", "TypeScript", "Python RAG (FAISS)", "Entra ID", "SQLite", "Azure", "Microsoft Graph"],
  },
  {
    id: "fpel-photobooth",
    index: "02",
    name: "FPEL PhotoBooth",
    tagline: "Upload a selfie, instantly find every photo of yourself.",
    status: "Live in production",
    accent: "#c084fc",
    mockup: "faces",
    heroStat: { value: "< 5s", label: "to find yourself across thousands of event photos" },
    significant: [
      { value: "< 5s", text: "Find every photo of yourself across years of event galleries — in seconds, not by scrolling." },
      { value: "~20 ms", text: "Matches your face against ~93,000 indexed faces per query." },
      { value: "CPU-only", text: "Runs on cheap CPU hosting — the heavy GPU work happens offline." },
      { value: "", text: "Secure FPEL sign-in; photos never leave company control." },
    ],
    seeMore: [
      "Sign in with your FPEL Microsoft account, upload a selfie, and get back every photo of you from event galleries like the Annual Meet.",
      "Deep-learning face matching (InsightFace ArcFace) reduces each face to a 512-dimension embedding, compared by cosine similarity.",
      "Galleries are embedded ahead of time into per-year vector indices, so a live search never re-embeds gallery photos.",
      "Matching is a single vectorised NumPy operation over ~93,000 stored faces — about 20 ms per query — cached in memory.",
      "Search one year or the whole archive; results render as thumbnails proxied securely from SharePoint via Microsoft Graph.",
      "Full-resolution downloads stream chunk-by-chunk from Graph to the browser, avoiding server memory spikes.",
      "GPU (CUDA / TensorRT) builds the indices offline; the live web tier runs CPU-only on Azure App Service.",
    ],
    stack: ["Python / Flask", "InsightFace (ArcFace)", "ONNX Runtime", "NumPy", "Microsoft Graph", "Entra ID SSO", "Azure"],
  },
  {
    id: "fpel-app-directory",
    index: "03",
    name: "FPEL App Directory",
    tagline: "One secure front door to every internal FPEL app.",
    status: "Live in production",
    accent: "#818cf8",
    mockup: "grid",
    heroStat: { value: "40+", label: "internal apps unified behind one login" },
    significant: [
      { value: "40+", text: "A single launchpad for 40+ scattered internal apps, grouped by function." },
      { value: "", text: "Corporate sign-on locked to @fourthpartner.co — every other account is rejected at login." },
      { value: "", text: "Each employee pins favourites and reorders sections, saved per person." },
      { value: "0", text: "No separate web server in production — one app serves everything." },
    ],
    seeMore: [
      "Centralizes 40+ tools (ERP, HRMS, AI automation, governance, analytics, asset, wellness) into seven function-based categories.",
      "Single sign-on via Azure AD (OAuth 2.0 Authorization Code Flow + MSAL); a random state parameter guards every callback against CSRF.",
      "Hard-restricted to verified @fourthpartner.co accounts; signed session cookies expire after 24 hours, HTTPS-only in production.",
      "Per-user personalization: pin favourite apps and drag-reorder categories (@dnd-kit), both saved per user in the database.",
      "Real-time client-side search filters by name and description with no page reloads.",
      "Apps without a configured URL auto-render as 'Coming Soon'; launch URLs come from env, so one build targets any environment.",
      "Decoupled SPA: a FastAPI backend serves the React + Vite build directly — no separate Node server runs in production.",
    ],
    stack: ["FastAPI", "React 18", "Vite", "Azure AD / MSAL", "SQLAlchemy", "Tailwind + Framer Motion", "Azure"],
  },
];

/* ============================================================
   ACTIVE PIPELINE — in UAT, with status + detail from the READMEs
   ============================================================ */
export type Pipeline = {
  id: string;
  name: string;
  tagline: string;
  heroStat: { value: string; label: string };
  statusDetail: string;
  details: string[];
  tags: string[];
};

export const pipeline: Pipeline[] = [
  {
    id: "governease",
    name: "GovernEase",
    tagline: "One auditable system for all company governance and compliance.",
    heroStat: { value: "183", label: "group companies governed from a single platform" },
    statusDetail: "Seeded with production data; deployed to Azure App Service for UAT.",
    details: [
      "Pulls live company and director data from the Ministry of Corporate Affairs by CIN.",
      "A 24-hour smart cache reuses recent data, so paid lookups happen only when something actually changed.",
      "Every change passes a maker-checker approval queue (Admin, Maker, Checker, Auditor) before it counts as official.",
      "One-click statutory documents (DIR-8, MBP-1…) rendered to PDF, with a multi-provider fallback chain so one outage never blocks a sync.",
    ],
    tags: ["Governance", "MCA Sync", "RegTech"],
  },
  {
    id: "it-asset-dashboard",
    name: "IT Asset Dashboard",
    tagline: "A live dashboard that retired the monthly Excel-to-slides grind.",
    heroStat: { value: "0–100", label: "live fleet-health score for every laptop" },
    statusDetail: "Core modules live — allocation, folder access, maintenance, SSO, alerts; mailer pending production consent.",
    details: [
      "Connects to the company ERP (Dynamics 365) for live asset records, cached so reloads are instant and work offline.",
      "Computes a 0–100 fleet-health score weighing asset age, warranty, refresh load and duplicate laptops.",
      "Laptop hand-overs generate a signed policy-acknowledgement email and track pending vs. confirmed.",
      "Folder-access requests flow through separate queues for requester, manager and IT, with a full audit trail.",
    ],
    tags: ["D365", "Dashboard", "IT Ops"],
  },
  {
    id: "mis-dashboard",
    name: "MIS Dashboard",
    tagline: "One secure portal for every department's operations data.",
    heroStat: { value: "3-in-1", label: "department modules behind one access-gated login" },
    statusDetail: "Asset Management & Digital Transformation modules live; HR module in progress.",
    details: [
      "One Next.js app, one server, one origin — no separate backends to run or maintain.",
      "Microsoft sign-in plus a bootstrap admin login; access is granted per person, per module.",
      "A signed 30-minute session is re-checked at the edge on every visit, so revoking access takes effect fast.",
      "Heavy reports (an 80 MB workbook) are pre-crunched into a cached file so everyday loads stay fast.",
    ],
    tags: ["Next.js", "SSO", "Multi-dept"],
  },
  {
    id: "vendor-invoice-portal",
    name: "Vendor Invoice Portal",
    tagline: "Vendors submit invoices; finance approves and books them in one place.",
    heroStat: { value: "6", label: "invoice fields auto-read from a scan — no retyping" },
    statusDetail: "Running end-to-end against the Dynamics 365 F&O sandbox.",
    details: [
      "Vendors self-register and go live only after an admin approves and links them to the ERP vendor code.",
      "On-device OCR (Tesseract + PDF extraction) tuned for Indian invoice formats like GSTIN and PAN.",
      "PO owner and approver are emailed automatically via Microsoft Graph the moment an invoice lands.",
      "Two-way Dynamics 365 sync mirrors vendors and POs locally and pushes approved invoices back on a schedule.",
    ],
    tags: ["OCR", "ERP Sync", "Finance"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Contact", href: "#contact" },
];
