import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusDot, type StatusLevel } from "./status-dot";

export interface SystemTileProps {
  name: string;
  caption: string;
  url?: string;
  status?: StatusLevel;
  metric?: string;
  metricLabel?: string;
  accent?: string;
  className?: string;
}

export function SystemTile({
  name,
  caption,
  url,
  status = "ok",
  metric,
  metricLabel,
  accent,
  className,
}: SystemTileProps) {
  const Body = (
    <div
      className={cn(
        "aios-card group flex h-full flex-col gap-3 p-4 transition hover:border-[var(--aios-border-strong)]",
        url && "cursor-pointer",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="display text-sm font-medium">{name}</div>
          <div className="mt-0.5 text-xs text-[var(--aios-text-dim)]">
            {caption}
          </div>
        </div>
        <StatusDot level={status} pulse={status === "ok"} />
      </div>
      {metric !== undefined && (
        <div className="mt-auto">
          <div
            className={cn("aios-num text-xl font-medium")}
            style={accent ? { color: accent } : undefined}
          >
            {metric}
          </div>
          {metricLabel && (
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-dim)]">
              {metricLabel}
            </div>
          )}
        </div>
      )}
      {url && (
        <div className="mono truncate text-[11px] text-[var(--aios-text-faint)]">
          {url.replace(/^https?:\/\//, "")}
        </div>
      )}
    </div>
  );

  if (!url) return Body;
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {Body}
    </Link>
  );
}
