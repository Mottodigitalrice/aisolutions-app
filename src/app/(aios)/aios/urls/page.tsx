import { Section } from "@/components/aios/section";
import { StatusDot } from "@/components/aios/status-dot";

export const metadata = { title: "URLs · AIOS" };

interface UrlEntry {
  url: string;
  label: string;
  group: string;
  notes?: string;
}

const URLS: UrlEntry[] = [
  { url: "https://aisolutions.jp", label: "AI Solutions LP", group: "Customer-facing" },
  { url: "https://aisolutions.jp/request", label: "Intake form", group: "Customer-facing" },
  { url: "https://madeinjapan.com", label: "MIJ Marketplace", group: "Customer-facing" },
  { url: "https://mottodigital.jp", label: "MOTTO Digital corporate", group: "Customer-facing" },
  { url: "https://vps.mottodigital.jp", label: "MOTTO API", group: "Internal" },
  { url: "https://n8n.mottodigital.jp", label: "n8n self-hosted", group: "Internal" },
  { url: "https://canvas.mottodigital.jp", label: "Canvas server", group: "Internal" },
  { url: "https://pixel.mottodigital.jp", label: "Pixel Office", group: "Internal" },
  { url: "https://ryowahouse.com", label: "Ryowa House", group: "Client" },
  { url: "https://eden-solar.jp", label: "Eden Solar", group: "Client", notes: "Demo" },
  { url: "https://line.mottodigital.jp", label: "LINE webhook", group: "Internal" },
  { url: "https://demo.aisolutions.jp", label: "Demo gateway", group: "Customer-facing", notes: "40+ restaurants" },
];

export default function UrlsPage() {
  const groups = Array.from(new Set(URLS.map((u) => u.group)));
  return (
    <div className="space-y-6">
      <Section
        eyebrow="Live URLs"
        title="What's deployed"
        meta={
          <span className="mono text-[11px]">
            v1 · status hardcoded · v2 will live-poll every 15min
          </span>
        }
      >
        <div className="space-y-6">
          {groups.map((group) => {
            const rows = URLS.filter((u) => u.group === group);
            return (
              <div key={group} className="space-y-2">
                <div className="aios-eyebrow">{group}</div>
                <div className="aios-card divide-y divide-[var(--aios-border)] overflow-hidden">
                  {rows.map((u) => (
                    <a
                      key={u.url}
                      href={u.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 text-sm transition hover:bg-white/5"
                    >
                      <StatusDot level="ok" pulse />
                      <div>
                        <div className="display font-medium">{u.label}</div>
                        <div className="mono text-xs text-[var(--aios-text-faint)]">
                          {u.url.replace(/^https?:\/\//, "")}
                          {u.notes && (
                            <span className="ml-2 text-[var(--aios-text-dim)]">
                              · {u.notes}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)]">
                        OK
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
