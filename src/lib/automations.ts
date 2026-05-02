// Hand-curated automation flows. Source of truth is Notion + n8n + .claude/skills/;
// v2 will pull this from MOTTO API (/aios/automations) once the cutover ships.

export type Integration =
  | "form"
  | "webhook"
  | "n8n"
  | "cron"
  | "agent"
  | "skill"
  | "notion"
  | "slack"
  | "gmail"
  | "calendar"
  | "drive"
  | "sheets"
  | "motto-api"
  | "convex"
  | "supabase"
  | "vercel"
  | "r2"
  | "gbp"
  | "line"
  | "canvas"
  | "pixel"
  | "freee"
  | "openai"
  | "anthropic"
  | "playwright"
  | "human";

export interface IntegrationMeta {
  label: string;
  short: string;
  color: string;
  ring: string;
}

export const INTEGRATIONS: Record<Integration, IntegrationMeta> = {
  form: { label: "Form", short: "FORM", color: "#22d3ee", ring: "rgba(34,211,238,0.35)" },
  webhook: { label: "Webhook", short: "HOOK", color: "#94a3b8", ring: "rgba(148,163,184,0.3)" },
  n8n: { label: "n8n", short: "N8N", color: "#ea4b71", ring: "rgba(234,75,113,0.4)" },
  cron: { label: "Cron", short: "CRON", color: "#94a3b8", ring: "rgba(148,163,184,0.3)" },
  agent: { label: "Agent", short: "AGT", color: "#a78bfa", ring: "rgba(167,139,250,0.4)" },
  skill: { label: "Skill", short: "SKL", color: "#c4b5fd", ring: "rgba(196,181,253,0.4)" },
  notion: { label: "Notion", short: "NTN", color: "#e7e7e7", ring: "rgba(231,231,231,0.4)" },
  slack: { label: "Slack", short: "SLK", color: "#ecb22e", ring: "rgba(236,178,46,0.4)" },
  gmail: { label: "Gmail", short: "GML", color: "#ea4335", ring: "rgba(234,67,53,0.4)" },
  calendar: { label: "Calendar", short: "CAL", color: "#4285f4", ring: "rgba(66,133,244,0.4)" },
  drive: { label: "Drive", short: "DRV", color: "#0f9d58", ring: "rgba(15,157,88,0.4)" },
  sheets: { label: "Sheets", short: "SHT", color: "#0f9d58", ring: "rgba(15,157,88,0.4)" },
  "motto-api": { label: "MOTTO API", short: "API", color: "#f0a04b", ring: "rgba(240,160,75,0.45)" },
  convex: { label: "Convex", short: "CVX", color: "#ee342f", ring: "rgba(238,52,47,0.4)" },
  supabase: { label: "Supabase", short: "SBA", color: "#3ecf8e", ring: "rgba(62,207,142,0.4)" },
  vercel: { label: "Vercel", short: "VRC", color: "#f5f5f5", ring: "rgba(245,245,245,0.35)" },
  r2: { label: "R2", short: "R2", color: "#f59e0b", ring: "rgba(245,158,11,0.4)" },
  gbp: { label: "GBP", short: "GBP", color: "#4285f4", ring: "rgba(66,133,244,0.4)" },
  line: { label: "LINE", short: "LIN", color: "#06c755", ring: "rgba(6,199,85,0.4)" },
  canvas: { label: "Canvas", short: "CVS", color: "#22d3ee", ring: "rgba(34,211,238,0.4)" },
  pixel: { label: "Pixel", short: "PXL", color: "#a78bfa", ring: "rgba(167,139,250,0.4)" },
  freee: { label: "Freee", short: "FRE", color: "#36b37e", ring: "rgba(54,179,126,0.4)" },
  openai: { label: "OpenAI", short: "OAI", color: "#10a37f", ring: "rgba(16,163,127,0.4)" },
  anthropic: { label: "Claude", short: "CLD", color: "#d97706", ring: "rgba(217,119,6,0.4)" },
  playwright: { label: "Playwright", short: "PLW", color: "#22c55e", ring: "rgba(34,197,94,0.4)" },
  human: { label: "Human", short: "YOU", color: "#f0a04b", ring: "rgba(240,160,75,0.4)" },
};

export interface FlowNode {
  id: string;
  col: number;
  row: number;
  integration: Integration;
  title: string;
  detail?: string;
  description?: string;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Flow {
  slug: string;
  project: string;
  projectName: string;
  name: string;
  trigger: string;
  cadence: string;
  description: string;
  status: "live" | "draft" | "paused";
  nodes: FlowNode[];
  edges: FlowEdge[];
  notes?: string[];
}

export const FLOWS: Flow[] = [
  // ─────────────────────────────────────────────────────────
  // AIOS
  // ─────────────────────────────────────────────────────────
  {
    slug: "aios-new-lead",
    project: "aios",
    projectName: "AIOS",
    name: "New Lead Intake",
    trigger: "Form submission · aisolutions.jp/request",
    cadence: "On webhook · ~instant",
    description:
      "Anyone hitting the AIOS or aisolutions.jp request form fans out to Notion CRM, Slack, and an instant auto-reply, with a follow-up task assigned to the CMO agent for tomorrow morning.",
    status: "live",
    nodes: [
      { id: "form", col: 0, row: 0, integration: "form", title: "Lead Form", detail: "aisolutions.jp/request", description: "Standalone intake form" },
      { id: "hook", col: 1, row: 0, integration: "webhook", title: "Webhook", detail: "Vercel /api/intake", description: "Receives + validates payload" },
      { id: "n8n", col: 2, row: 0, integration: "n8n", title: "Lead Router", detail: "Workflow #04", description: "Enrich + branch" },
      { id: "notion", col: 3, row: 0, integration: "notion", title: "CRM Lead Created", detail: "Leads DB", description: "Status = NEW" },
      { id: "slack", col: 3, row: 1, integration: "slack", title: "Slack Alert", detail: "#leads", description: "Real-time ping" },
      { id: "gmail", col: 4, row: 0, integration: "gmail", title: "Auto-Reply", detail: "JP template", description: "Confirms receipt" },
      { id: "task", col: 4, row: 1, integration: "agent", title: "CMO Review Task", detail: "Tomorrow 9am", description: "Assigned to CMO" },
    ],
    edges: [
      { from: "form", to: "hook" },
      { from: "hook", to: "n8n" },
      { from: "n8n", to: "notion", label: "primary" },
      { from: "n8n", to: "slack", label: "branch" },
      { from: "notion", to: "gmail" },
      { from: "notion", to: "task" },
    ],
    notes: [
      "Notion DB: 1ede0cb5-63d9-8061-8571-df183897d8e2",
      "Webhook: aisolutions.jp/api/intake → POST n8n",
      "CMO agent picks up the task in next /superbrief",
    ],
  },
  {
    slug: "aios-audit-report",
    project: "aios",
    projectName: "AIOS",
    name: "Free Audit → Report Delivery",
    trigger: "Audit form completion",
    cadence: "On webhook · ~2 min end-to-end",
    description:
      "The bilingual audit form persists answers progressively, then triggers report generation, PDF rendering, and email delivery — all without manual intervention.",
    status: "live",
    nodes: [
      { id: "form", col: 0, row: 0, integration: "form", title: "Audit Form", detail: "EN + JP, branched", description: "Personal vs corporate" },
      { id: "n8n", col: 1, row: 0, integration: "n8n", title: "Persist Answers", detail: "Workflow #11", description: "Progressive save" },
      { id: "notion", col: 2, row: 0, integration: "notion", title: "Notion Submission", detail: "Audits DB" },
      { id: "skill", col: 3, row: 0, integration: "skill", title: "audit-report-generator", detail: "Skill", description: "Templated report" },
      { id: "claude", col: 4, row: 0, integration: "anthropic", title: "Claude · Opus", detail: "Synthesis", description: "Personalized insights" },
      { id: "pdf", col: 5, row: 0, integration: "skill", title: "PDF Render", detail: "ReportLab", description: "Branded PDF" },
      { id: "drive", col: 6, row: 0, integration: "drive", title: "Drive Upload", detail: "Audits/" },
      { id: "gmail", col: 7, row: 0, integration: "gmail", title: "Email Report", detail: "Branded JP" },
    ],
    edges: [
      { from: "form", to: "n8n" },
      { from: "n8n", to: "notion" },
      { from: "notion", to: "skill" },
      { from: "skill", to: "claude" },
      { from: "claude", to: "pdf" },
      { from: "pdf", to: "drive" },
      { from: "drive", to: "gmail" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Website outreach (aisolutions.jp B2B pipeline)
  // ─────────────────────────────────────────────────────────
  {
    slug: "outreach-crawl-build-pitch",
    project: "website-outreach",
    projectName: "Website Outreach",
    name: "Crawl → Demo → Pitch",
    trigger: "Manual run per ward",
    cadence: "Weekly · 50–200 leads / pass",
    description:
      "End-to-end outbound pipeline. Picks a Tokyo ward, scrapes restaurants from Google Maps, scores their existing site, builds a demo, then sends a personalized cold email — all without touching a single restaurant manually.",
    status: "live",
    nodes: [
      { id: "human", col: 0, row: 0, integration: "human", title: "Ward Pick", detail: "Lewis", description: "e.g. Sumida-ku" },
      { id: "crawl", col: 1, row: 0, integration: "playwright", title: "Maps Crawl", detail: "Playwright", description: "Restaurant data" },
      { id: "convex", col: 2, row: 0, integration: "convex", title: "Convex · leads", detail: "by_ward index", description: "Status = CRAWLED" },
      { id: "score", col: 3, row: 0, integration: "skill", title: "Site Score", detail: "skill", description: "Grade A–F" },
      { id: "qual", col: 4, row: 0, integration: "convex", title: "QUALIFIED", detail: "Filter pass", description: "Site grade D/F" },
      { id: "demo", col: 5, row: 0, integration: "skill", title: "restaurant-demo-builder", detail: "5 templates · 6 langs" },
      { id: "vercel", col: 6, row: 0, integration: "vercel", title: "Demo Deploy", detail: "demo.aisolutions.jp/[slug]", description: "Live URL" },
      { id: "email", col: 7, row: 0, integration: "skill", title: "cold-email", detail: "Personalized JP" },
      { id: "gmail", col: 8, row: 0, integration: "gmail", title: "Send Outreach", detail: "From hello@" },
      { id: "convex2", col: 9, row: 0, integration: "convex", title: "OUTREACH_SENT", detail: "Status update" },
      { id: "reply", col: 9, row: 1, integration: "gmail", title: "Reply Detected", detail: "Triage label" },
      { id: "triage", col: 10, row: 1, integration: "skill", title: "email-triage", detail: "Classifies intent" },
      { id: "notion", col: 11, row: 1, integration: "notion", title: "Hot Lead", detail: "CRM RESPONDED" },
    ],
    edges: [
      { from: "human", to: "crawl" },
      { from: "crawl", to: "convex" },
      { from: "convex", to: "score" },
      { from: "score", to: "qual" },
      { from: "qual", to: "demo" },
      { from: "demo", to: "vercel" },
      { from: "vercel", to: "email" },
      { from: "email", to: "gmail" },
      { from: "gmail", to: "convex2" },
      { from: "convex2", to: "reply", label: "watcher" },
      { from: "reply", to: "triage" },
      { from: "triage", to: "notion" },
    ],
    notes: [
      "40+ restaurant demos shipped to date across 18 cities",
      "Demo URL is the cold email's hook — prospect sees their own site rebuilt",
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Ryowa House — GBP auto-poster
  // ─────────────────────────────────────────────────────────
  {
    slug: "ryowa-gbp-daily-post",
    project: "ryowa-house",
    projectName: "Ryowa House",
    name: "Daily GBP Auto-Post",
    trigger: "Cron · daily 10:00 JST",
    cadence: "Daily · always-on",
    description:
      "Ryowa House's Google Business Profile gets a fresh post every morning — template + photo rotation + AI-written JP copy — keeping their MEO score up without anyone touching the GBP console.",
    status: "live",
    nodes: [
      { id: "cron", col: 0, row: 0, integration: "cron", title: "n8n Cron", detail: "10:00 JST" },
      { id: "gbp-mgr", col: 1, row: 0, integration: "skill", title: "gbp-manager", detail: "Skill" },
      { id: "tpl", col: 2, row: 0, integration: "notion", title: "Template Pick", detail: "Notion Templates DB" },
      { id: "photo", col: 2, row: 1, integration: "drive", title: "Photo Pick", detail: "Drive · rotation" },
      { id: "ai", col: 3, row: 0, integration: "anthropic", title: "JP Copy Gen", detail: "Claude · Sonnet" },
      { id: "gbp", col: 4, row: 0, integration: "gbp", title: "GBP Post", detail: "Google Business" },
      { id: "log", col: 5, row: 0, integration: "notion", title: "Post Log", detail: "GBP History DB" },
    ],
    edges: [
      { from: "cron", to: "gbp-mgr" },
      { from: "gbp-mgr", to: "tpl" },
      { from: "gbp-mgr", to: "photo" },
      { from: "tpl", to: "ai" },
      { from: "photo", to: "ai" },
      { from: "ai", to: "gbp" },
      { from: "gbp", to: "log" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Eden — solar lead finder
  // ─────────────────────────────────────────────────────────
  {
    slug: "eden-solar-discovery",
    project: "eden",
    projectName: "Eden Solar",
    name: "Residential Solar Lead Discovery",
    trigger: "Manual · /solar-lead-finder",
    cadence: "On-demand per neighborhood",
    description:
      "Picks a neighborhood, queries Google Solar API per parcel, captures Street View + satellite imagery, classifies whether the roof already has panels, and outputs a qualified lead list as Excel for Furumoto-san.",
    status: "live",
    nodes: [
      { id: "human", col: 0, row: 0, integration: "human", title: "Pick Area", detail: "Lewis" },
      { id: "skill", col: 1, row: 0, integration: "skill", title: "solar-lead-finder", detail: "Skill" },
      { id: "solar", col: 2, row: 0, integration: "motto-api", title: "Google Solar API", detail: "Per-parcel scan" },
      { id: "playwright", col: 3, row: 0, integration: "playwright", title: "Imagery Capture", detail: "Street View + satellite" },
      { id: "claude", col: 4, row: 0, integration: "anthropic", title: "Roof Classifier", detail: "Vision · existing panels" },
      { id: "xlsx", col: 5, row: 0, integration: "skill", title: "Excel Output", detail: "openpyxl" },
      { id: "notion", col: 5, row: 1, integration: "notion", title: "CRM Upload", detail: "Eden Leads DB" },
      { id: "drive", col: 6, row: 0, integration: "drive", title: "Drive Share", detail: "Furumoto-san" },
    ],
    edges: [
      { from: "human", to: "skill" },
      { from: "skill", to: "solar" },
      { from: "solar", to: "playwright" },
      { from: "playwright", to: "claude" },
      { from: "claude", to: "xlsx" },
      { from: "claude", to: "notion" },
      { from: "xlsx", to: "drive" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Email triage
  // ─────────────────────────────────────────────────────────
  {
    slug: "email-triage",
    project: "auto-improvement-system",
    projectName: "Email Triage",
    name: "Inbox Auto-Triage",
    trigger: "Cron · every 30 min · or /triage-inbox",
    cadence: "30-min sweep, all-day",
    description:
      "Every unlabeled inbox message is classified by Opus 4.7, gets Mailbox/* + Triage/* labels, and noise is auto-archived. Only actionable mail stays in the inbox; an inline digest is printed on demand.",
    status: "live",
    nodes: [
      { id: "cron", col: 0, row: 0, integration: "cron", title: "Trigger", detail: "30-min cron · or manual" },
      { id: "skill", col: 1, row: 0, integration: "skill", title: "email-triage", detail: "Skill" },
      { id: "gmail", col: 2, row: 0, integration: "gmail", title: "Pull Unlabeled", detail: "rice@mottodigital.jp" },
      { id: "claude", col: 3, row: 0, integration: "anthropic", title: "Classify", detail: "Opus 4.7" },
      { id: "label", col: 4, row: 0, integration: "gmail", title: "Apply Labels", detail: "Mailbox/* + Triage/*" },
      { id: "archive", col: 4, row: 1, integration: "gmail", title: "Archive Noise", detail: "Promo · newsletter" },
      { id: "digest", col: 5, row: 0, integration: "human", title: "Digest", detail: "Inline summary" },
    ],
    edges: [
      { from: "cron", to: "skill" },
      { from: "skill", to: "gmail" },
      { from: "gmail", to: "claude" },
      { from: "claude", to: "label" },
      { from: "claude", to: "archive" },
      { from: "label", to: "digest" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // LINE member search
  // ─────────────────────────────────────────────────────────
  {
    slug: "line-member-search",
    project: "line-member-search",
    projectName: "LINE Member Search",
    name: "Conversational Member Lookup",
    trigger: "User message in LINE",
    cadence: "On webhook · sub-second",
    description:
      "User types a fuzzy query into LINE; webhook fires MOTTO API; vector search across the member DB ranks matches; AI formats a response back into the LINE chat.",
    status: "live",
    nodes: [
      { id: "user", col: 0, row: 0, integration: "human", title: "Query", detail: "LINE message" },
      { id: "line", col: 1, row: 0, integration: "line", title: "LINE Webhook", detail: "Messaging API" },
      { id: "api", col: 2, row: 0, integration: "motto-api", title: "MOTTO API", detail: "/line/search" },
      { id: "supabase", col: 3, row: 0, integration: "supabase", title: "Vector Search", detail: "pgvector" },
      { id: "claude", col: 4, row: 0, integration: "anthropic", title: "Rank + Format", detail: "Sonnet" },
      { id: "reply", col: 5, row: 0, integration: "line", title: "Reply", detail: "Back to user" },
      { id: "log", col: 5, row: 1, integration: "notion", title: "Log Query", detail: "Notion · Search Log" },
    ],
    edges: [
      { from: "user", to: "line" },
      { from: "line", to: "api" },
      { from: "api", to: "supabase" },
      { from: "supabase", to: "claude" },
      { from: "claude", to: "reply" },
      { from: "claude", to: "log" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // /superbrief
  // ─────────────────────────────────────────────────────────
  {
    slug: "superbrief",
    project: "auto-improvement-system",
    projectName: "Superbrief",
    name: "Morning Briefing Pipeline",
    trigger: "/superbrief · or 7am cron",
    cadence: "Daily · ~90s",
    description:
      "The single command that compiles the day. Reconciles Notion ↔ repo, pulls focus files + tasks + calendar + TidyCal, picks ONE THING, and renders a Canvas dashboard.",
    status: "live",
    nodes: [
      { id: "trig", col: 0, row: 0, integration: "human", title: "/superbrief", detail: "Lewis · or cron" },
      { id: "sync", col: 1, row: 0, integration: "skill", title: "/sync-state", detail: "Phase 1" },
      { id: "focus", col: 2, row: 0, integration: "drive", title: "Focus Files", detail: "daily.md + weekly.md" },
      { id: "notion", col: 2, row: 1, integration: "notion", title: "Open Tasks", detail: "All projects" },
      { id: "cal", col: 2, row: 2, integration: "calendar", title: "Calendar", detail: "Today + tomorrow" },
      { id: "tidycal", col: 2, row: 3, integration: "motto-api", title: "TidyCal", detail: "Booked meetings" },
      { id: "claude", col: 3, row: 0, integration: "anthropic", title: "Synthesize", detail: "Opus 4.7" },
      { id: "one", col: 4, row: 0, integration: "human", title: "ONE THING", detail: "Confirmed by Lewis" },
      { id: "canvas", col: 5, row: 0, integration: "canvas", title: "Canvas Dashboard", detail: "Live link" },
    ],
    edges: [
      { from: "trig", to: "sync" },
      { from: "sync", to: "focus" },
      { from: "sync", to: "notion" },
      { from: "sync", to: "cal" },
      { from: "sync", to: "tidycal" },
      { from: "focus", to: "claude" },
      { from: "notion", to: "claude" },
      { from: "cal", to: "claude" },
      { from: "tidycal", to: "claude" },
      { from: "claude", to: "one" },
      { from: "one", to: "canvas" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Freee finance loop
  // ─────────────────────────────────────────────────────────
  {
    slug: "freee-bookkeeping",
    project: "finance-compliance",
    projectName: "Freee Bookkeeping",
    name: "Receipt → Booked Deal",
    trigger: "Receipt photo · or 'I spent ¥X on…'",
    cadence: "On-demand · approval-gated",
    description:
      "A receipt image becomes a categorized, partner-attached, receipt-attached Freee deal. Always pauses for Lewis approval before posting writes.",
    status: "live",
    nodes: [
      { id: "human", col: 0, row: 0, integration: "human", title: "Receipt", detail: "Image or text" },
      { id: "skill", col: 1, row: 0, integration: "skill", title: "freee-bookkeeper", detail: "Skill" },
      { id: "claude", col: 2, row: 0, integration: "anthropic", title: "OCR + Classify", detail: "Vision" },
      { id: "freee-r", col: 3, row: 0, integration: "freee", title: "Match Deal", detail: "Freee API · read" },
      { id: "approve", col: 4, row: 0, integration: "human", title: "Approval", detail: "Lewis confirms" },
      { id: "freee-w", col: 5, row: 0, integration: "freee", title: "Write Deal", detail: "Categorize + partner" },
      { id: "upload", col: 6, row: 0, integration: "freee", title: "Attach Receipt", detail: "Image upload" },
    ],
    edges: [
      { from: "human", to: "skill" },
      { from: "skill", to: "claude" },
      { from: "claude", to: "freee-r" },
      { from: "freee-r", to: "approve", label: "gate" },
      { from: "approve", to: "freee-w" },
      { from: "freee-w", to: "upload" },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // VPS migration (active project)
  // ─────────────────────────────────────────────────────────
  {
    slug: "vps-cutover",
    project: "vps-migration-contabo",
    projectName: "VPS Migration",
    name: "RackNerd → Contabo Cutover",
    trigger: "One-shot · 2026-05-10 02:00 JST",
    cadence: "Single event",
    description:
      "Phase 3 cutover. Contabo Tokyo is provisioned and hardened; cutover swings DNS, drains RackNerd, and switches MOTTO API + n8n to Contabo as primary.",
    status: "draft",
    nodes: [
      { id: "snap", col: 0, row: 0, integration: "skill", title: "Final Snapshot", detail: "RackNerd" },
      { id: "rsync", col: 1, row: 0, integration: "skill", title: "rsync Data", detail: "n8n · Notion API · logs" },
      { id: "contabo", col: 2, row: 0, integration: "motto-api", title: "Contabo Up", detail: "vps.mottodigital.jp" },
      { id: "dns", col: 3, row: 0, integration: "motto-api", title: "DNS Swing", detail: "Hostinger" },
      { id: "verify", col: 4, row: 0, integration: "skill", title: "Smoke Test", detail: "All endpoints" },
      { id: "drain", col: 5, row: 0, integration: "motto-api", title: "Drain RackNerd", detail: "Read-only · 7d hold" },
      { id: "decom", col: 6, row: 0, integration: "human", title: "Decommission", detail: "Cancel billing" },
    ],
    edges: [
      { from: "snap", to: "rsync" },
      { from: "rsync", to: "contabo" },
      { from: "contabo", to: "dns" },
      { from: "dns", to: "verify" },
      { from: "verify", to: "drain" },
      { from: "drain", to: "decom" },
    ],
    notes: [
      "Hard cutover window: 2026-05-10 02:00 JST",
      "RackNerd disk at 100% — cutover unblocks all v2 dashboard work",
    ],
  },
];

export function flowsByProject(): Map<string, Flow[]> {
  const map = new Map<string, Flow[]>();
  for (const f of FLOWS) {
    const list = map.get(f.project) ?? [];
    list.push(f);
    map.set(f.project, list);
  }
  return map;
}

export function findFlow(slug: string): Flow | undefined {
  return FLOWS.find((f) => f.slug === slug);
}
