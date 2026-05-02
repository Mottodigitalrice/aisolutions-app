import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/aios/section";
import { StatusDot } from "@/components/aios/status-dot";
import { FlowMap } from "@/components/aios/flow-map";
import { IntegrationBadge } from "@/components/aios/integration-badge";
import { FLOWS, findFlow } from "@/lib/automations";

export function generateStaticParams() {
  return FLOWS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flow = findFlow(slug);
  return {
    title: flow ? `${flow.name} · ${flow.projectName} · AIOS` : "Flow · AIOS",
  };
}

export default async function FlowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flow = findFlow(slug);
  if (!flow) notFound();

  const integrations = Array.from(new Set(flow.nodes.map((n) => n.integration)));

  return (
    <div className="space-y-6">
      <Link
        href="/aios/automations"
        className="aios-link inline-block text-[11px] uppercase tracking-[0.18em] text-[var(--aios-text-dim)]"
      >
        ← Automations
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="aios-eyebrow">{flow.projectName}</div>
          <h1 className="display mt-1 flex items-center gap-3 text-2xl font-semibold tracking-tight">
            {flow.name}
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
          </h1>
          <p className="mt-2 max-w-prose text-sm text-[var(--aios-text-dim)]">
            {flow.description}
          </p>
        </div>
        <div className="aios-card-flat min-w-[220px] space-y-2 px-4 py-3 text-right">
          <div>
            <div className="aios-eyebrow">Trigger</div>
            <div className="mt-1 text-sm">{flow.trigger}</div>
          </div>
          <div>
            <div className="aios-eyebrow">Cadence</div>
            <div className="mono mt-1 text-sm">{flow.cadence}</div>
          </div>
        </div>
      </header>

      <Section eyebrow="Flow Map" title={`${flow.nodes.length} steps · ${flow.edges.length} connections`}>
        <FlowMap flow={flow} />
      </Section>

      <div className="grid gap-4 md:grid-cols-2">
        <Section eyebrow="Integrations" title="What's involved">
          <div className="aios-card flex flex-wrap gap-2 p-4">
            {integrations.map((i) => (
              <IntegrationBadge key={i} integration={i} size="md" />
            ))}
          </div>
        </Section>

        {flow.notes && flow.notes.length > 0 && (
          <Section eyebrow="Notes" title="Operator details">
            <ul className="aios-card space-y-2 p-4 text-sm text-[var(--aios-text-dim)]">
              {flow.notes.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mono text-[var(--aios-text-faint)]">·</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Sequence — readable list version */}
      <Section eyebrow="Sequence" title="Step-by-step">
        <ol className="aios-card divide-y divide-[var(--aios-border)] overflow-hidden">
          {flow.nodes
            .slice()
            .sort((a, b) => a.col - b.col || a.row - b.row)
            .map((n, i) => (
              <li
                key={n.id}
                className="grid grid-cols-[2.5rem_auto_1fr] items-center gap-3 px-4 py-3 text-sm"
              >
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--aios-text-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IntegrationBadge integration={n.integration} size="sm" />
                <div>
                  <div className="display font-medium">{n.title}</div>
                  <div className="text-xs text-[var(--aios-text-dim)]">
                    {n.detail ?? n.description ?? "—"}
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </Section>
    </div>
  );
}
