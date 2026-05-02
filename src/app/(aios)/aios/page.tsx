import { getSnapshot, bucketStatus } from "@/lib/aios-snapshot";
import { KpiStrip } from "@/components/aios/kpi-strip";
import { Section } from "@/components/aios/section";
import { SystemMap } from "@/components/aios/system-map";
import { BuiltSystemsGallery } from "@/components/aios/built-systems-gallery";
import { ProjectCard } from "@/components/aios/project-card";
import { ActivityFeed } from "@/components/aios/activity-feed";
import { PortalGrid } from "@/components/aios/portal-grid";
import { StatusDot } from "@/components/aios/status-dot";
import Link from "next/link";

export default async function AiosOverviewPage() {
  const snap = await getSnapshot();

  const activeProjects = snap.projects.filter((p) => {
    const b = bucketStatus(p.status);
    return b === "active" || b === "deployed";
  });

  const featured = activeProjects.slice(0, 6);

  const generatedDate = (() => {
    try {
      return new Date(snap.generatedAt).toISOString().slice(0, 16).replace("T", " ");
    } catch {
      return snap.generatedAt;
    }
  })();

  const focus = snap.dailyFocus;

  return (
    <div className="space-y-8">
      {/* Header strip */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="aios-eyebrow">System Status</div>
          <h1 className="display mt-1 text-2xl font-semibold tracking-tight">
            All systems operational
            <StatusDot level="ok" pulse className="ml-3 align-middle" />
          </h1>
          <p className="mt-1 text-sm text-[var(--aios-text-dim)]">
            Snapshot · {generatedDate} · {snap.counts.commits7d} commits in
            last 7 days
          </p>
        </div>
        <div className="text-right text-xs text-[var(--aios-text-faint)]">
          <div>v1 · read-only mirror</div>
          <div className="mono">Contabo cutover · 2026-05-10</div>
        </div>
      </div>

      <KpiStrip
        items={[
          { label: "Projects", value: snap.counts.projects },
          { label: "Skills", value: snap.counts.skills },
          { label: "Agents", value: snap.counts.agents },
          { label: "Workflows", value: 142, hint: "n8n self-hosted" },
          { label: "Live URLs", value: 30, hint: "8 domains" },
          {
            label: "7-day commits",
            value: snap.counts.commits7d,
            tone: snap.counts.commits7d > 0 ? "good" : "default",
          },
        ]}
      />

      {/* Today + Pipeline */}
      <div className="grid gap-4 md:grid-cols-2">
        <Section eyebrow="Today" title={focus?.heading ?? "Daily focus"}>
          <div className="aios-card space-y-4 p-5">
            {focus?.oneThing && (
              <div>
                <div className="aios-eyebrow">One Thing</div>
                <div className="display mt-1 text-base font-medium text-[var(--aios-accent)]">
                  {focus.oneThing}
                </div>
              </div>
            )}
            {focus?.tasks && focus.tasks.length > 0 ? (
              <ul className="space-y-1.5 text-sm">
                {focus.tasks
                  .filter((t) => t.section === "Must Do")
                  .slice(0, 6)
                  .map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[var(--aios-text)]"
                    >
                      <span
                        className={`mono mt-1 inline-block h-1.5 w-1.5 rounded-full ${
                          t.done
                            ? "bg-[var(--aios-text-faint)]"
                            : "bg-[var(--aios-accent)]"
                        }`}
                      />
                      <span
                        className={
                          t.done
                            ? "text-[var(--aios-text-faint)] line-through"
                            : ""
                        }
                      >
                        {t.label}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-sm text-[var(--aios-text-dim)]">
                No daily focus parsed.
              </div>
            )}
          </div>
        </Section>

        <Section eyebrow="Pipeline" title="Deal flow">
          <div className="aios-card grid grid-cols-3 gap-px overflow-hidden">
            {[
              { label: "Proposal", value: 4, hint: "Drafted, awaiting send" },
              { label: "Waiting", value: 6, hint: "Sent, no reply" },
              { label: "Active", value: 3, hint: "In delivery" },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--aios-surface)] p-5">
                <div className="aios-eyebrow">{s.label}</div>
                <div className="aios-num mt-1 text-3xl font-medium">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-[var(--aios-text-dim)]">
                  {s.hint}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--aios-text-faint)]">
            v2 will read from Notion CRM via MOTTO API.
          </p>
        </Section>
      </div>

      {/* System Map */}
      <Section
        eyebrow="System Map"
        title="MOTTO AIOS architecture"
        meta="Hover any node"
      >
        <SystemMap />
      </Section>

      {/* Built Systems Gallery */}
      <Section eyebrow="Built Systems" title="What's shipped">
        <BuiltSystemsGallery />
      </Section>

      {/* Active projects */}
      <Section
        eyebrow="Active Projects"
        title="Currently in motion"
        meta={
          <Link
            href="/aios/projects"
            className="aios-link text-[11px] uppercase tracking-[0.18em]"
          >
            View all {snap.counts.projects} →
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* VPS pane + Activity */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Section eyebrow="VPS" title="Infrastructure">
          <div className="aios-card space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="display text-sm font-medium">Contabo Tokyo</div>
                <div className="text-xs text-[var(--aios-text-dim)]">
                  Primary · cutover 2026-05-10
                </div>
              </div>
              <StatusDot level="ok" pulse />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="display text-sm font-medium">RackNerd</div>
                <div className="text-xs text-[var(--aios-text-dim)]">
                  Legacy · disk 100% · sunset 05-10
                </div>
              </div>
              <StatusDot level="warn" />
            </div>
            <div className="border-t border-[var(--aios-border)] pt-3 text-xs text-[var(--aios-text-faint)]">
              Live PM2 / Docker / disk gauges land in v2 once Contabo is
              source of truth.
            </div>
            <Link
              href="/aios/vps"
              className="aios-link block pt-1 text-[11px] uppercase tracking-[0.18em]"
            >
              VPS detail →
            </Link>
          </div>
        </Section>
        <Section
          eyebrow="Activity"
          title="Recent commits"
          meta={
            <Link
              href="/aios/activity"
              className="aios-link text-[11px] uppercase tracking-[0.18em]"
            >
              Full feed →
            </Link>
          }
        >
          <ActivityFeed commits={snap.commits} limit={8} />
        </Section>
      </div>

      {/* Portal */}
      <Section eyebrow="Portal" title="Quick links">
        <PortalGrid />
      </Section>
    </div>
  );
}
