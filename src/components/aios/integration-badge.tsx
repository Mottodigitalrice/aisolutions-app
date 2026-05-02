import { cn } from "@/lib/utils";
import { INTEGRATIONS, type Integration } from "@/lib/automations";

export function IntegrationBadge({
  integration,
  size = "sm",
  className,
}: {
  integration: Integration;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const meta = INTEGRATIONS[integration];
  const sizeClass = {
    xs: "h-4 px-1.5 text-[8px] tracking-[0.16em]",
    sm: "h-5 px-2 text-[9px] tracking-[0.18em]",
    md: "h-6 px-2.5 text-[10px] tracking-[0.18em]",
  }[size];

  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 rounded font-medium uppercase",
        sizeClass,
        className,
      )}
      style={{
        color: meta.color,
        background: `${meta.color}10`,
        boxShadow: `inset 0 0 0 1px ${meta.color}26`,
      }}
      title={meta.label}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: meta.color, boxShadow: `0 0 6px ${meta.ring}` }}
      />
      {meta.short}
    </span>
  );
}
