import { SystemTile } from "./system-tile";

export interface BuiltSystem {
  name: string;
  caption: string;
  url?: string;
  metric: string;
  metricLabel: string;
  accent?: string;
}

export const BUILT_SYSTEMS: BuiltSystem[] = [
  {
    name: "AIOS Platform",
    caption: "Managed AI operating system for Japanese SMBs",
    metric: "3",
    metricLabel: "Pricing tiers live",
    accent: "#f0a04b",
  },
  {
    name: "aisolutions.jp",
    caption: "AI-built websites for restaurants",
    url: "https://aisolutions.jp",
    metric: "9,800",
    metricLabel: "JPY / month",
    accent: "#22d3ee",
  },
  {
    name: "MIJ Marketplace",
    caption: "Made-in-Japan product platform",
    url: "https://madeinjapan.com",
    metric: "Live",
    metricLabel: "Multi-vendor",
    accent: "#a78bfa",
  },
  {
    name: "GBP Auto-Poster",
    caption: "Ryowa House Google Business posts",
    metric: "Daily",
    metricLabel: "Automated",
    accent: "#4ade80",
  },
  {
    name: "n8n Workflow Engine",
    caption: "Self-hosted at n8n.mottodigital.jp",
    metric: "142",
    metricLabel: "Workflows",
    accent: "#60a5fa",
  },
  {
    name: "MOTTO API",
    caption: "Unified gateway: Notion · GWS · Freee · VPS",
    metric: "20+",
    metricLabel: "Integrations",
    accent: "#f0a04b",
  },
  {
    name: "Pixel Office",
    caption: "Live recording stage for visual agents",
    metric: "Live",
    metricLabel: "Recording",
    accent: "#a78bfa",
  },
  {
    name: "Canvas Server",
    caption: "Self-hosted HTML artifact renderer",
    metric: "5",
    metricLabel: "Active slots",
    accent: "#22d3ee",
  },
  {
    name: "Demo Gateway",
    caption: "Multilingual restaurant demo sites",
    metric: "40+",
    metricLabel: "Sites · 18 cities",
    accent: "#4ade80",
  },
];

export function BuiltSystemsGallery({ showcase = false }: { showcase?: boolean }) {
  void showcase;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {BUILT_SYSTEMS.map((s) => (
        <SystemTile
          key={s.name}
          name={s.name}
          caption={s.caption}
          url={s.url}
          metric={s.metric}
          metricLabel={s.metricLabel}
          accent={s.accent}
        />
      ))}
    </div>
  );
}
