import { cn } from "@/lib/utils";

export interface KpiItem {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "good" | "warn";
}

export function KpiStrip({
  items,
  className,
}: {
  items: KpiItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "aios-card grid grid-cols-2 gap-px overflow-hidden md:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-[var(--aios-surface)] px-5 py-4"
        >
          <div className="aios-eyebrow">{item.label}</div>
          <div
            className={cn(
              "aios-num mt-1 text-2xl font-medium tracking-tight",
              item.tone === "good" && "text-emerald-300",
              item.tone === "warn" && "text-amber-300",
            )}
          >
            {item.value}
          </div>
          {item.hint && (
            <div className="mt-1 text-xs text-[var(--aios-text-dim)]">
              {item.hint}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
