export type ProjectStatus =
  | "ACTIVE"
  | "IN PROGRESS"
  | "DEPLOYED"
  | "PAUSED"
  | "BLOCKED"
  | "PLANNING"
  | "COMPLETED"
  | "UNKNOWN"
  | string;

export interface SnapshotProject {
  slug: string;
  name: string;
  status: ProjectStatus;
  owner: string | null;
  hasOverview: boolean;
  updated: string | null;
  created: string | null;
  notion_id: string | null;
  taskCount: number;
  progressCount: number;
  lastProgress: string | null;
}

export interface SnapshotSkill {
  slug: string;
  name: string;
  description: string;
}

export interface SnapshotAgent {
  slug: string;
  name: string;
  model: string | null;
}

export interface SnapshotCommit {
  hash: string;
  date: string;
  subject: string;
}

export interface DailyFocusTask {
  section: string;
  label: string;
  done: boolean;
}

export interface DailyFocus {
  updated: string | null;
  heading: string | null;
  oneThing: string | null;
  tasks: DailyFocusTask[];
}

export interface RepoSnapshot {
  generatedAt: string;
  counts: {
    projects: number;
    skills: number;
    agents: number;
    commits7d: number;
  };
  dailyFocus: DailyFocus | null;
  projects: SnapshotProject[];
  skills: SnapshotSkill[];
  agents: SnapshotAgent[];
  commits: SnapshotCommit[];
}

const STATUS_BUCKETS: Record<string, ProjectStatus[]> = {
  active: ["ACTIVE", "IN PROGRESS"],
  deployed: ["DEPLOYED", "LIVE", "SHIPPED"],
  paused: ["PAUSED", "BLOCKED", "WAITING"],
  planning: ["PLANNING", "DRAFT"],
  done: ["COMPLETED", "DONE", "ARCHIVED"],
};

export function bucketStatus(
  status: string,
): keyof typeof STATUS_BUCKETS | "other" {
  const upper = status.toUpperCase();
  for (const [bucket, statuses] of Object.entries(STATUS_BUCKETS)) {
    if (statuses.some((s) => upper.includes(s))) {
      return bucket as keyof typeof STATUS_BUCKETS;
    }
  }
  return "other";
}

export function statusColor(status: string): string {
  const bucket = bucketStatus(status);
  switch (bucket) {
    case "active":
      return "text-emerald-300 border-emerald-400/30 bg-emerald-400/10";
    case "deployed":
      return "text-cyan-300 border-cyan-400/30 bg-cyan-400/10";
    case "paused":
      return "text-amber-300 border-amber-400/30 bg-amber-400/10";
    case "planning":
      return "text-violet-300 border-violet-400/30 bg-violet-400/10";
    case "done":
      return "text-zinc-300 border-zinc-400/30 bg-zinc-400/10";
    default:
      return "text-zinc-400 border-white/10 bg-white/5";
  }
}
