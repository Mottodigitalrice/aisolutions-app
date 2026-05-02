import Link from "next/link";
import { Section } from "@/components/aios/section";
import { IntegrationBadge } from "@/components/aios/integration-badge";
import { StatusDot } from "@/components/aios/status-dot";
import { FLOWS, flowsByProject, type Flow } from "@/lib/automations";

export const metadata = { title: "Automations · AIOS" };

function uniqueIntegrations(flow: Flow) {
  const seen = new Set<string>();
  const out: typeof flow.nodes[number]["integration"][] = [];
  for (const n of flow.nodes) {
    if (!seen.has(n.integration)) {
      seen.add(n.integration);
      out.push(n.integration);
    }
  }
  return out;
}

export default function AutomationsIndexPage() {
  const grouped = flowsByProject();
  const projects = Array.from(grouped.keys());

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="aios-eyebrow">Automations</div>
          <h1 className="display mt-1 text-2xl font-semibold tracking-tight">
            What runs in the background
          </h1>
          <p className="mt-1 max-w-prose text-sm text-[var(--aios-text-dim)]">
            Every product Lewis has shipped has a background flow — a chain of
            webhooks, n8n workflows, agents, and skills that runs without
            anyone watching. This is the map.
          </p>
        </div>
        <div className="text-right text-xs text-[var(--aios-text-faint)]">
          <div className="aios-num">
            {FLOWS.length} flows · {projects.length} projects
          </div>
          <div>v1 · hand-curated · v2 will sync from Notion</div>
        </div>
      </header>

      {projects.map((projectSlug) => {
        const flows = grouped.get(projectSlug)!;
        const projectName = flows[0].projectName;
        return (
          <Section
            key={projectSlug}
            eyebrow={projectSlug}
            title={projectName}
            meta={
              <span className="mono text-[11px]">
                {flows.length} flow{flows.length === 1 ? "" : "s"}
              </span>
            }
          >
            <div className="grid gap-3 md:grid-cols-2">
              {flows.map((flow) => (
                <Link
                  key={flow.slug}
                  href={`/aios/automations/${flow.slug}`}
                  className="aios-card group flex flex-col gap-3 p-5 transition hover:border-[var(--aios-border-strong)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="display text-base font-medium leading-tight">
                        {flow.name}
                      </div>
                      <div className="mt-1 text-xs text-[var(--aios-text-dim)]">
                        {flow.trigger}
                      </div>
                    </div>
                    <StatusDot
                      level={
                        flow.status === "live"
                          ? "ok"
                          : flow.status === "draft"
                          ? "warn"
                          : "idle"
                      }
                      pulse={flow.status === "live"}
                    />
                  </div>
                  <p className="line-clamp-2 text-sm text-[var(--aios-text-dim)]">
                    {flow.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 border-t border-[var(--aios-border)] pt-3">
                    {uniqueIntegrations(flow).map((i) => (
                      <IntegrationBadge key={i} integration={i} size="xs" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--aios-text-faint)]">
                    <span className="mono">{flow.cadence}</span>
                    <span className="text-[var(--aios-text-dim)] transition group-hover:text-[var(--aios-accent)]">
                      Open flow →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}
    </div>
  );
}
