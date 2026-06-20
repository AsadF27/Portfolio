/**
 * Single source of truth for portfolio content.
 * Distilled from Asad Faridi's resume + 7 project READMEs.
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

  // The USP — a few powerful words, audience + edge
  uspLead: "I build enterprise AI systems that turn",
  uspRotate: ["weeks of manual work", "fragmented spreadsheets", "hours of GPU compute", "siloed workflows"],
  uspTail: "into seconds.",

  keywords: [
    "RAG & Vector Search",
    "GPU-Accelerated AI",
    "Enterprise Web Portals",
    "Sub-Second Latency",
    "Microservices",
  ],

  bio: "I'm a Digital Transformation engineer at Fourth Partner Energy, where I architect AI-powered enterprise platforms that replace manual, fragmented workflows with fast, auditable digital systems — RAG assistants, GPU-accelerated face search, and microservices portals secured with Azure Entra ID.",
  bio2: "I care about shipping measurable impact: sub-second latency, 88% faster pipelines, and tools that hundreds of colleagues use every day. A competitive programmer at heart, I bring a deep foundation in data structures, algorithms and system design to every problem I touch.",
};

export const heroStats = [
  { value: "100+", label: "colleagues using tools I shipped" },
  { value: "88%", label: "faster GPU preprocessing pipeline" },
  { value: "90K+", label: "indexed faces searched in under 5s" },
  { value: "2+", label: "years engineering in production" },
];

export const socials = [
  { label: "LinkedIn", short: "in", url: "https://www.linkedin.com/in/asad27" },
  { label: "GeeksforGeeks", short: "GfG", url: "https://www.geeksforgeeks.org/user/asad27" },
  { label: "CodeChef", short: "CC", url: "https://www.codechef.com/users/asad_27" },
  { label: "Codeforces", short: "CF", url: "https://codeforces.com/profile/kaju.pista" },
];

export const proofPoints = [
  "Ranked 1st at institute on GeeksforGeeks (Global Rank 2464)",
  "Max rating 1603 (3★) on CodeChef · Specialist (1511) on Codeforces",
  "Level 8 on Code360 with 70k+ EXP",
  "AI tools adopted across 100+ employees at Fourth Partner Energy",
];

export type SkillGroup = { group: string; items: string[] };
export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["C / C++", "Python", "X++", "MS SQL"] },
  {
    group: "AI / ML & Search",
    items: ["RAG", "FAISS", "Vector Search", "InsightFace (ArcFace)", "Hugging Face", "CUDA", "TensorRT", "Prompt Engineering"],
  },
  { group: "Frameworks & Web", items: ["Flask", "FastAPI", "Next.js", "React", "Gunicorn", "REST APIs"] },
  {
    group: "Cloud & Architecture",
    items: ["Azure App Service", "Entra ID (SSO/RBAC)", "Microsoft Graph", "Microservices", "Hub-and-Spoke", "Zero-Copy Streaming"],
  },
  { group: "Tools & Core", items: ["Dynamics 365 F&O", "Power BI", "Git", "DSA", "System Design", "DBMS"] },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};
export const experience: Experience[] = [
  {
    company: "Fourth Partner Energy",
    role: "Digital Transformation & New Initiatives",
    period: "Nov 2024 — Present",
    points: [
      "Architected the ESG Digital Hub — a Hub-and-Spoke microservices portal unifying 5 EHS/ESG safety workflows with a self-hosted RAG assistant.",
      "Built FPEL PhotoBooth: in-memory vector search returning matches in ~20 ms over ~90k face embeddings, with an 88% faster GPU embedding pipeline.",
      "Shipped D365 F&O submodules — Audit Checklist (+40% audit efficiency) and Grievance Redressal (−35% resolution time).",
    ],
  },
  {
    company: "Fourth Partner Energy",
    role: "IT Support & Software Management Intern",
    period: "May 2024 — Nov 2024",
    points: [
      "Automated reporting & asset tracking via Power BI and D365 — saved 75% of weekly prep time and cut data errors by 98%.",
      "Deployed 4 domain-specific custom GPT solutions, driving AI adoption across 100+ employees.",
    ],
  },
];

export const education = {
  school: "Indian Institute of Information Technology, Bhagalpur",
  degree: "B.Tech, Computer Science & Engineering",
  period: "2020 — 2024 · CGPA 7.75 / 10",
};

/* ============================================================
   FEATURED WORK — completed, production platforms
   ============================================================ */
export type Metric = { value: string; label: string };
export type Featured = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  value: string;
  status: string;
  accent: string; // subtle per-project decorative tint
  mockup: "dashboard" | "grid" | "faces";
  bigStat: Metric;
  metrics: Metric[];
  features: string[];
  stack: string[];
};

export const featured: Featured[] = [
  {
    id: "esg-digital-hub",
    index: "01",
    name: "ESG Digital Hub",
    tagline: "A unified, role-aware EHS/ESG safety & compliance portal — with a fully self-hosted RAG assistant.",
    value:
      "Replaces a sprawl of spreadsheets, email threads and ad-hoc trackers with auditable, end-to-end digital safety workflows. The RAG assistant runs entirely inside FPEL's Azure tenant — zero external LLM calls.",
    status: "Live in production",
    accent: "#3fb984",
    mockup: "dashboard",
    bigStat: { value: "5", label: "EHS/ESG modules unified into one portal" },
    metrics: [
      { value: "0", label: "external LLM calls — self-hosted RAG" },
      { value: "4", label: "role personas via Entra ID SSO + RBAC" },
      { value: "1–25", label: "risk scoring with auto-flagged SLAs" },
    ],
    features: [
      "Five audit-logged workflow state machines: Observations, Incidents (fishbone + CAPA), Permit-to-Work, Best Practice and Management Walkdowns",
      "Self-hosted bilingual RAG: embed → FAISS retrieve → rerank → bounded context → LLM, streamed over SSE with source citations",
      "Email-driven approvals — every state transition fires a Microsoft Graph mail with deep-link action tokens",
      "Cross-module dashboards with Recharts and one-click ExcelJS export",
    ],
    stack: ["Next.js 15", "Python", "FastAPI", "FAISS", "BGE-M3", "Entra ID", "SQLite", "Azure"],
  },
  {
    id: "fpel-app-directory",
    index: "02",
    name: "FPEL App Directory",
    tagline: "One secure gateway to every enterprise app at FPEL.",
    value:
      "A single Azure AD-secured launchpad unifying 40+ internal enterprise applications — ERP, HRMS, AI automation, governance and analytics — into one personalized, glassmorphic dashboard for the whole organization.",
    status: "Live in production",
    accent: "#5a8cff",
    mockup: "grid",
    bigStat: { value: "40+", label: "enterprise apps in one personalized hub" },
    metrics: [
      { value: "SSO", label: "Azure AD, domain-restricted via MSAL" },
      { value: "7", label: "app categories, drag-to-reorder per user" },
      { value: "7", label: "REST endpoints behind a FastAPI core" },
    ],
    features: [
      "Azure AD single sign-on (OAuth 2.0 Authorization Code Flow) with strict @fourthpartner.co domain restriction",
      "Per-user app pinning and drag-to-reorder categories (@dnd-kit), persisted server-side",
      "Real-time client-side search with no page reloads",
      "Glassmorphic UI with per-category themes and GPU-accelerated, rAF-throttled scroll",
    ],
    stack: ["FastAPI", "React 18", "Vite", "MSAL", "SQLAlchemy", "Framer Motion", "Azure"],
  },
  {
    id: "fpel-photobooth",
    index: "03",
    name: "FPEL PhotoBooth",
    tagline: "Upload a selfie, instantly find every photo of yourself.",
    value:
      "AI face search that scans a 90,000+ face index across thousands of event photos and returns every match in under 5 seconds — on CPU-only hosting — using deep-learning face embeddings and cosine-similarity matching against pre-computed indices.",
    status: "Live in production",
    accent: "#a86bff",
    mockup: "faces",
    bigStat: { value: "< 5s", label: "to find yourself across a 90,000+ face index" },
    metrics: [
      { value: "~20 ms", label: "to match a face across ~90k embeddings" },
      { value: "88%", label: "faster GPU preprocessing: 70h → 8h for 13k images" },
      { value: "512-d", label: "ArcFace embeddings via InsightFace" },
    ],
    features: [
      "Microsoft Entra ID SSO, tenant + domain restricted, with per-user isolation of uploads & results",
      "Hybrid engine: in-process NumPy matcher over an .npz index (~20 ms / query) with subprocess fallback",
      "Secure SharePoint proxy — zero-buffer streaming of full-res downloads via an app-only Graph token",
      "Offline CUDA / TensorRT embedding pipeline keeps live search near-instant on CPU",
    ],
    stack: ["Python", "Flask", "InsightFace", "ONNX", "Microsoft Graph", "CUDA", "TensorRT", "Azure"],
  },
];

/* ============================================================
   ACTIVE PIPELINE — in-progress / UAT enterprise platforms
   ============================================================ */
export type Pipeline = {
  id: string;
  name: string;
  tagline: string;
  stat: string;
  tags: string[];
};

export const pipeline: Pipeline[] = [
  {
    id: "governease",
    name: "GovernEase",
    tagline: "Corporate governance & secretarial automation across FPEL's entire SPV portfolio, with live MCA sync and maker-checker control.",
    stat: "183 entities · live MCA sync",
    tags: ["RegTech", "Flask", "React", "Document Automation"],
  },
  {
    id: "it-asset-dashboard",
    name: "IT Asset Dashboard",
    tagline: "Always-on IT asset governance wired live into Dynamics 365 F&O — a composite fleet health score replacing a manual Excel-to-PPT ritual.",
    stat: "Live D365 health score 0–100",
    tags: ["D365 OData", "Node.js", "Dashboard"],
  },
  {
    id: "mis-dashboard",
    name: "MIS Dashboard",
    tagline: "One immersive Next.js hub unifying every department's MIS behind a single access-gated, SSO-protected origin.",
    stat: "One app · one origin · edge-gated",
    tags: ["Next.js", "MSAL", "MSSQL", "Edge Auth"],
  },
  {
    id: "vendor-invoice-portal",
    name: "Vendor Invoice Portal",
    tagline: "Self-service vendor invoicing with OCR auto-fill tuned for Indian GST invoices and bi-directional Dynamics 365 sync.",
    stat: "OCR auto-fill ⇄ D365 sync",
    tags: ["OCR", "Node.js", "ERP", "FinTech"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Contact", href: "#contact" },
];
