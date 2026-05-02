import { getSnapshot } from "@/lib/aios-snapshot";
import { Section } from "@/components/aios/section";
import { SkillsBrowser } from "./skills-browser";

export const metadata = { title: "Skills & Agents · AIOS" };

export default async function SkillsPage() {
  const snap = await getSnapshot();
  return (
    <div className="space-y-8">
      <Section
        eyebrow="Agents"
        title={`${snap.agents.length} specialist agents`}
        meta={<span className="mono text-[11px]">.claude/agents/</span>}
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {snap.agents.map((a) => (
            <div
              key={a.slug}
              className="aios-card flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="display truncate text-sm font-medium">
                  {a.name}
                </div>
                <div className="mono text-[11px] text-[var(--aios-text-faint)]">
                  {a.slug}
                </div>
              </div>
              <span className="mono shrink-0 text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-dim)]">
                {a.model ?? "—"}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Skills"
        title={`${snap.skills.length} skills`}
        meta={<span className="mono text-[11px]">.claude/skills/</span>}
      >
        <SkillsBrowser skills={snap.skills} />
      </Section>
    </div>
  );
}
