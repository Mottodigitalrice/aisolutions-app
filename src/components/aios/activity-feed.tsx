import { cn } from "@/lib/utils";
import type { SnapshotCommit } from "@/lib/aios-types";

function classifyCommit(
  subject: string,
): { tag: string; tone: string } {
  const s = subject.toLowerCase();
  if (s.startsWith("vps") || s.includes("contabo") || s.includes("racknerd"))
    return { tag: "vps", tone: "text-cyan-300" };
  if (s.startsWith("aios") || s.includes("aios"))
    return { tag: "aios", tone: "text-amber-300" };
  if (s.startsWith("line") || s.includes("line"))
    return { tag: "line", tone: "text-emerald-300" };
  if (s.startsWith("security") || s.includes("hardening"))
    return { tag: "sec", tone: "text-rose-300" };
  if (s.startsWith("notion") || s.includes("notion"))
    return { tag: "notion", tone: "text-violet-300" };
  if (s.includes("workflow") || s.startsWith("n8n"))
    return { tag: "n8n", tone: "text-blue-300" };
  return { tag: "repo", tone: "text-[var(--aios-text-dim)]" };
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes(),
    ).padStart(2, "0")}`;
  } catch {
    return iso;
  }
}

export function ActivityFeed({
  commits,
  limit = 20,
  className,
}: {
  commits: SnapshotCommit[];
  limit?: number;
  className?: string;
}) {
  const rows = commits.slice(0, limit);
  if (rows.length === 0) {
    return (
      <div
        className={cn(
          "aios-card p-6 text-sm text-[var(--aios-text-dim)]",
          className,
        )}
      >
        No commits in the last 7 days.
      </div>
    );
  }

  return (
    <div className={cn("aios-card overflow-hidden", className)}>
      <ul className="divide-y divide-[var(--aios-border)]">
        {rows.map((c) => {
          const { tag, tone } = classifyCommit(c.subject);
          return (
            <li
              key={c.hash}
              className="aios-feed-row grid grid-cols-[auto_3rem_4rem_1fr] items-center gap-3 px-4 py-2.5 text-sm"
            >
              <span className="mono text-[11px] text-[var(--aios-text-faint)]">
                {formatDate(c.date)}
              </span>
              <span
                className={cn(
                  "mono text-[10px] uppercase tracking-wider",
                  tone,
                )}
              >
                {tag}
              </span>
              <span className="mono text-[11px] text-[var(--aios-text-faint)]">
                {c.hash}
              </span>
              <span className="truncate text-[var(--aios-text)]">
                {c.subject}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
