import { cn } from "@/lib/utils";
import {
  bucketStatus,
  statusColor,
  type SnapshotProject,
} from "@/lib/aios-types";
import { StatusDot, type StatusLevel } from "./status-dot";

function bucketLevel(bucket: string): StatusLevel {
  switch (bucket) {
    case "active":
    case "deployed":
      return "ok";
    case "paused":
      return "warn";
    case "planning":
      return "idle";
    case "done":
      return "idle";
    default:
      return "idle";
  }
}

export function ProjectCard({
  project,
  showOwner = true,
  className,
}: {
  project: SnapshotProject;
  showOwner?: boolean;
  className?: string;
}) {
  const bucket = bucketStatus(project.status);
  const level = bucketLevel(bucket);
  return (
    <article
      className={cn(
        "aios-card flex flex-col gap-3 p-4 transition hover:border-[var(--aios-border-strong)]",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)]">
            {project.slug}
          </div>
          <h3 className="display mt-0.5 truncate text-sm font-medium">
            {project.name}
          </h3>
        </div>
        <StatusDot level={level} pulse={level === "ok"} />
      </header>

      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
            statusColor(project.status),
          )}
        >
          {project.status}
        </span>
        {showOwner && project.owner && (
          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-[var(--aios-text-dim)]">
            {project.owner}
          </span>
        )}
      </div>

      <dl className="grid grid-cols-3 gap-2 border-t border-[var(--aios-border)] pt-3 text-xs">
        <div>
          <dt className="text-[var(--aios-text-faint)]">Tasks</dt>
          <dd className="aios-num mt-0.5 text-[var(--aios-text)]">
            {project.taskCount}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--aios-text-faint)]">Logs</dt>
          <dd className="aios-num mt-0.5 text-[var(--aios-text)]">
            {project.progressCount}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--aios-text-faint)]">Last</dt>
          <dd className="mono mt-0.5 truncate text-[11px] text-[var(--aios-text)]">
            {project.lastProgress ?? "—"}
          </dd>
        </div>
      </dl>
    </article>
  );
}
