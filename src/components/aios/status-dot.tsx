import { cn } from "@/lib/utils";

export type StatusLevel = "ok" | "warn" | "err" | "idle";

export function StatusDot({
  level,
  pulse = false,
  className,
}: {
  level: StatusLevel;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "aios-dot",
        `aios-dot--${level}`,
        pulse && "aios-dot--pulse",
        className,
      )}
      aria-hidden
    />
  );
}
