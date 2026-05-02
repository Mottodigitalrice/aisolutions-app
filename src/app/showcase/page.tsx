import "@/components/aios/aios-theme.css";
import type { Metadata } from "next";
import { getSnapshot, bucketStatus } from "@/lib/aios-snapshot";
import { KpiStrip } from "@/components/aios/kpi-strip";
import { Section } from "@/components/aios/section";
import { SystemMap } from "@/components/aios/system-map";
import { BuiltSystemsGallery } from "@/components/aios/built-systems-gallery";
import { ProjectCard } from "@/components/aios/project-card";
import { StatusDot } from "@/components/aios/status-dot";

export const metadata: Metadata = {
  title: "MOTTO AIOS — What we've built",
  description:
    "A live look at the MOTTO AI Operating System: 35 projects, 87 skills, 12 specialist agents, 142 workflows, 30+ live deployments.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MOTTO AIOS",
    description:
      "MOTTO Digital's AI Operating System — what's built, what's live, what's running.",
    url: "https://aisolutions.jp/showcase",
    siteName: "MOTTO AIOS",
    type: "website",
  },
};

export const revalidate = 3600;

const SHOWCASE_PROJECT_SLUGS = [
  "aios",
  "mij",
  "ryowa-house",
  "eden",
  "hikari-agent",
  "line-member-search",
  "skill-hunters",
  "vps-migration-contabo",
  "personal-brand",
];

export default async function ShowcasePage() {
  const snap = await getSnapshot();

  const featured = SHOWCASE_PROJECT_SLUGS
    .map((slug) => snap.projects.find((p) => p.slug === slug))
    .filter(
      (p): p is (typeof snap.projects)[number] => Boolean(p),
    );

  const showcaseProjects =
    featured.length > 0
      ? featured
      : snap.projects
          .filter((p) => {
            const b = bucketStatus(p.status);
            return b === "active" || b === "deployed";
          })
          .slice(0, 9);

  // Filtered activity — deploy/ship signals only, no internal noise
  const showcaseCommits = snap.commits.filter((c) => {
    const s = c.subject.toLowerCase();
    return (
      s.includes("ship") ||
      s.includes("deploy") ||
      s.includes("phase") ||
      s.includes("release") ||
      s.startsWith("aios") ||
      s.startsWith("vps") ||
      s.startsWith("line") ||
      s.startsWith("workflow")
    );
  });

  return (
    <div className="aios-shell">
      <header className="border-b border-[var(--aios-border)]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="display text-base font-semibold tracking-tight">
              MOTTO
            </span>
            <span className="text-[var(--aios-text-faint)]">▸</span>
            <span className="display text-base tracking-tight">AIOS</span>
            <span className="ml-3 mono hidden text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)] md:inline">
              AI Operating System
            </span>
          </div>
          <a
            href="https://aisolutions.jp"
            className="aios-link text-sm"
          >
            aisolutions.jp →
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] space-y-10 px-5 py-10">
        {/* Hero */}
        <section className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="aios-eyebrow flex items-center gap-2">
              <StatusDot level="ok" pulse />
              All systems operational
            </div>
            <h1 className="display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              An AI operating system that{" "}
              <span className="text-[var(--aios-accent)]">runs</span> a
              business.
            </h1>
            <p className="max-w-prose text-base text-[var(--aios-text-dim)] md:text-lg">
              MOTTO Digital builds, operates, and continuously improves the
              software, agents, and workflows that run our company — and
              increasingly, our clients&apos;. This is a live look at what&apos;s
              shipped, what&apos;s deployed, and what&apos;s running right now.
            </p>
          </div>
          <div className="aios-card-strong space-y-4 p-6">
            <div className="aios-eyebrow">By the numbers</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Projects", value: snap.counts.projects },
                { label: "Skills", value: snap.counts.skills },
                { label: "Agents", value: snap.counts.agents },
                { label: "Workflows", value: 142 },
                { label: "Live URLs", value: "30+" },
                { label: "Demo sites", value: "40+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="aios-num text-3xl font-semibold">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--aios-text-dim)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <KpiStrip
          items={[
            { label: "Projects", value: snap.counts.projects },
            { label: "Skills", value: snap.counts.skills },
            { label: "Agents", value: snap.counts.agents },
            { label: "Workflows", value: 142, hint: "n8n self-hosted" },
            { label: "Live URLs", value: "30+", hint: "8 domains" },
            {
              label: "Restaurant demos",
              value: "40+",
              hint: "18 cities",
              tone: "good",
            },
          ]}
        />

        {/* System Map */}
        <Section
          eyebrow="System Map"
          title="The architecture that runs MOTTO"
          meta="Hover any node"
        >
          <SystemMap showcase />
        </Section>

        {/* Built systems */}
        <Section
          eyebrow="Built Systems"
          title="What's shipped"
          meta="Each tile is a real, deployed product"
        >
          <BuiltSystemsGallery showcase />
        </Section>

        {/* Project ledger (filtered) */}
        <Section
          eyebrow="Active Projects"
          title="In motion right now"
          meta={`${showcaseProjects.length} of ${snap.counts.projects}`}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseProjects.map((p) => (
              <ProjectCard
                key={p.slug}
                project={{ ...p, owner: null }}
                showOwner={false}
              />
            ))}
          </div>
        </Section>

        {/* Activity ticker */}
        {showcaseCommits.length > 0 && (
          <Section
            eyebrow="Live Ticker"
            title="Shipping in real time"
            meta="Last 7 days"
          >
            <div className="aios-card aios-live-panel max-h-[360px] overflow-y-auto">
              <ul className="divide-y divide-[var(--aios-border)]">
                {showcaseCommits.slice(0, 30).map((c) => (
                  <li
                    key={c.hash}
                    className="aios-feed-row grid grid-cols-[auto_1fr] items-center gap-3 px-4 py-2.5 text-sm"
                  >
                    <span className="mono text-[11px] text-[var(--aios-text-faint)]">
                      {c.date.slice(5, 10)}
                    </span>
                    <span className="truncate text-[var(--aios-text)]">
                      {c.subject}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        {/* CTA */}
        <section className="aios-card-strong flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="aios-eyebrow">Want this for your company?</div>
            <h2 className="display mt-2 text-2xl font-semibold tracking-tight">
              MOTTO builds AI operating systems for Japanese businesses.
            </h2>
            <p className="mt-2 max-w-prose text-sm text-[var(--aios-text-dim)]">
              Three tiers — Company Build, One-on-One, and Group Cohort.
              Start with a free agentic AI audit.
            </p>
          </div>
          <a
            href="https://aisolutions.jp/request"
            className="rounded-md border border-[var(--aios-accent)] bg-[var(--aios-accent)] px-5 py-2.5 text-sm font-medium text-[var(--aios-bg)] transition hover:bg-amber-300"
          >
            Get an AI audit →
          </a>
        </section>
      </main>

      <footer className="mx-auto max-w-[1280px] border-t border-[var(--aios-border)] px-5 py-6 text-[11px] text-[var(--aios-text-faint)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            運営: Multidigital合同会社 ·{" "}
            <a className="aios-link" href="https://mottodigital.jp">
              mottodigital.jp
            </a>
          </span>
          <span className="mono">
            Snapshot · {snap.generatedAt.slice(0, 10)}
          </span>
        </div>
      </footer>
    </div>
  );
}
