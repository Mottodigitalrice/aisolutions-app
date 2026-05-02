import { Section } from "@/components/aios/section";
import { StatusDot } from "@/components/aios/status-dot";

export const metadata = { title: "VPS · AIOS" };

const SERVICES = [
  { name: "notion-api", type: "pm2", status: "ok" as const, host: "Contabo" },
  { name: "slack-bridge", type: "pm2", status: "ok" as const, host: "Contabo" },
  { name: "n8n", type: "docker", status: "ok" as const, host: "Contabo" },
  { name: "caddy", type: "docker", status: "ok" as const, host: "Contabo" },
];

export default function VpsPage() {
  return (
    <div className="space-y-6">
      <Section
        eyebrow="Infrastructure"
        title="VPS health"
        meta={
          <span className="mono text-[11px]">
            v1 · placeholder · live data lands post-cutover
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="aios-card space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="display text-sm font-medium">Contabo Tokyo</div>
                <div className="text-xs text-[var(--aios-text-dim)]">
                  Primary · post-cutover target
                </div>
              </div>
              <StatusDot level="ok" pulse />
            </div>
            <dl className="grid grid-cols-2 gap-2 border-t border-[var(--aios-border)] pt-3 text-xs">
              <div>
                <dt className="text-[var(--aios-text-faint)]">CPU</dt>
                <dd className="aios-num mt-0.5">— %</dd>
              </div>
              <div>
                <dt className="text-[var(--aios-text-faint)]">Memory</dt>
                <dd className="aios-num mt-0.5">— GB</dd>
              </div>
              <div>
                <dt className="text-[var(--aios-text-faint)]">Disk</dt>
                <dd className="aios-num mt-0.5">— %</dd>
              </div>
              <div>
                <dt className="text-[var(--aios-text-faint)]">Uptime</dt>
                <dd className="aios-num mt-0.5">—</dd>
              </div>
            </dl>
          </div>

          <div className="aios-card space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="display text-sm font-medium">RackNerd</div>
                <div className="text-xs text-[var(--aios-text-dim)]">
                  Legacy · sunset 2026-05-10 02:00 JST
                </div>
              </div>
              <StatusDot level="warn" />
            </div>
            <dl className="grid grid-cols-2 gap-2 border-t border-[var(--aios-border)] pt-3 text-xs">
              <div>
                <dt className="text-[var(--aios-text-faint)]">Disk</dt>
                <dd className="aios-num mt-0.5 text-amber-300">100%</dd>
              </div>
              <div>
                <dt className="text-[var(--aios-text-faint)]">Status</dt>
                <dd className="aios-num mt-0.5">Migration</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section eyebrow="Services" title="Process & container roster">
        <div className="aios-card divide-y divide-[var(--aios-border)] overflow-hidden">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-3 text-sm"
            >
              <StatusDot level={s.status} pulse />
              <div>
                <div className="display font-medium">{s.name}</div>
                <div className="mono text-xs text-[var(--aios-text-faint)]">
                  {s.host}
                </div>
              </div>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-dim)]">
                {s.type}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)]">
                online
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Logs" title="Tail">
        <div className="aios-card p-5 text-sm text-[var(--aios-text-dim)]">
          Log streams (notion-api, slack-bridge, n8n, caddy) wire to MOTTO API{" "}
          <span className="mono text-[var(--aios-text)]">/vps/logs/&lt;svc&gt;</span>{" "}
          in v2. The standalone artifact at{" "}
          <span className="mono text-[var(--aios-text)]">
            DEVELOPMENT/builds/artifacts/vps-dashboard/
          </span>{" "}
          ports into this pane post-cutover.
        </div>
      </Section>
    </div>
  );
}
