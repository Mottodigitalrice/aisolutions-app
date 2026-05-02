import { cn } from "@/lib/utils";

export function Section({
  title,
  eyebrow,
  meta,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  eyebrow?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      {(title || eyebrow || meta) && (
        <header className="flex items-end justify-between gap-3 border-b border-[var(--aios-border)] pb-2">
          <div>
            {eyebrow && <div className="aios-eyebrow">{eyebrow}</div>}
            {title && (
              <h2 className="display text-base font-medium tracking-tight">
                {title}
              </h2>
            )}
          </div>
          {meta && (
            <div className="text-xs text-[var(--aios-text-dim)]">{meta}</div>
          )}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
