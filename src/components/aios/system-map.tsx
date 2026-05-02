"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Layer = "surface" | "apps" | "orchestration" | "data" | "infra";

interface MapNode {
  id: string;
  label: string;
  caption: string;
  layer: Layer;
  x: number;
  y: number;
  url?: string;
  status?: "ok" | "warn" | "err";
  hideOnShowcase?: boolean;
}

interface MapEdge {
  from: string;
  to: string;
  label?: string;
  hideOnShowcase?: boolean;
}

const NODES: MapNode[] = [
  // Surface (y=80)
  { id: "aisolutions", label: "aisolutions.jp", caption: "Public LP + dashboard", layer: "surface", x: 100, y: 80, url: "https://aisolutions.jp", status: "ok" },
  { id: "mij", label: "MIJ", caption: "Marketplace", layer: "surface", x: 280, y: 80, url: "https://madeinjapan.com", status: "ok" },
  { id: "demo-gw", label: "Demo Gateway", caption: "40+ restaurant demos", layer: "surface", x: 460, y: 80, status: "ok" },
  { id: "pixel", label: "Pixel Office", caption: "Live agent stage", layer: "surface", x: 640, y: 80, status: "ok" },
  { id: "canvas", label: "Canvas", caption: "Visual artifacts", layer: "surface", x: 820, y: 80, status: "ok" },

  // Apps (y=200)
  { id: "aios-platform", label: "AIOS Platform", caption: "Curriculum + cohorts", layer: "apps", x: 100, y: 200, status: "ok" },
  { id: "gbp", label: "GBP Auto-Poster", caption: "Ryowa House posts", layer: "apps", x: 280, y: 200, status: "ok" },
  { id: "freee", label: "Freee Bridge", caption: "Accounting ops", layer: "apps", x: 460, y: 200, status: "ok" },
  { id: "gws", label: "GWS Bridge", caption: "Gmail / Drive / Cal", layer: "apps", x: 640, y: 200, status: "ok" },

  // Orchestration (y=320)
  { id: "n8n", label: "n8n", caption: "142 workflows", layer: "orchestration", x: 190, y: 320, status: "ok" },
  { id: "motto-api", label: "MOTTO API", caption: "Internal proxy", layer: "orchestration", x: 460, y: 320, url: "https://vps.mottodigital.jp", status: "ok" },
  { id: "agents", label: "Agents", caption: "12 specialists", layer: "orchestration", x: 730, y: 320, status: "ok" },

  // Data (y=440)
  { id: "notion", label: "Notion", caption: "Source of truth", layer: "data", x: 190, y: 440, status: "ok" },
  { id: "supabase", label: "Supabase", caption: "MIJ + auth", layer: "data", x: 460, y: 440, status: "ok" },
  { id: "convex", label: "Convex", caption: "aisolutions data", layer: "data", x: 640, y: 440, status: "ok" },
  { id: "r2", label: "R2", caption: "Object storage", layer: "data", x: 820, y: 440, status: "ok" },

  // Infra (y=560)
  { id: "contabo", label: "Contabo", caption: "Tokyo VPS · primary", layer: "infra", x: 190, y: 560, status: "ok" },
  { id: "racknerd", label: "RackNerd", caption: "Legacy · cutover 05-10", layer: "infra", x: 370, y: 560, status: "warn", hideOnShowcase: true },
  { id: "vercel", label: "Vercel", caption: "Edge + builds", layer: "infra", x: 550, y: 560, status: "ok" },
  { id: "cloudflare", label: "Cloudflare", caption: "DNS + CDN", layer: "infra", x: 730, y: 560, status: "ok" },
];

const EDGES: MapEdge[] = [
  // Surface → Apps / Orchestration
  { from: "aisolutions", to: "aios-platform" },
  { from: "mij", to: "supabase" },
  { from: "demo-gw", to: "vercel" },
  { from: "pixel", to: "agents" },
  { from: "canvas", to: "motto-api" },

  // Apps → Orchestration
  { from: "aios-platform", to: "motto-api" },
  { from: "gbp", to: "n8n" },
  { from: "freee", to: "n8n" },
  { from: "gws", to: "motto-api" },

  // Orchestration ↔
  { from: "n8n", to: "motto-api", label: "events" },
  { from: "agents", to: "motto-api" },

  // Orchestration → Data
  { from: "motto-api", to: "notion", label: "340 writes/day" },
  { from: "n8n", to: "notion" },
  { from: "motto-api", to: "supabase" },
  { from: "aios-platform", to: "convex" },
  { from: "demo-gw", to: "r2" },

  // Data → Infra
  { from: "notion", to: "contabo" },
  { from: "supabase", to: "cloudflare" },
  { from: "convex", to: "vercel" },
  { from: "motto-api", to: "contabo" },
  { from: "motto-api", to: "racknerd", hideOnShowcase: true },
];

const LAYER_LABEL: Record<Layer, string> = {
  surface: "Surface",
  apps: "Apps",
  orchestration: "Orchestration",
  data: "Data",
  infra: "Infra",
};

const LAYER_Y: Record<Layer, number> = {
  surface: 80,
  apps: 200,
  orchestration: 320,
  data: 440,
  infra: 560,
};

const LAYER_COLOR: Record<Layer, string> = {
  surface: "#22d3ee",
  apps: "#a78bfa",
  orchestration: "#f0a04b",
  data: "#4ade80",
  infra: "#60a5fa",
};

export function SystemMap({
  showcase = false,
  className,
}: {
  showcase?: boolean;
  className?: string;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const nodes = NODES.filter((n) => !showcase || !n.hideOnShowcase);
  const edges = EDGES.filter(
    (e) =>
      (!showcase || !e.hideOnShowcase) &&
      nodes.find((n) => n.id === e.from) &&
      nodes.find((n) => n.id === e.to),
  );

  const w = 940;
  const h = 660;

  return (
    <div className={cn("aios-card overflow-hidden p-4 md:p-6", className)}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="aios-live-panel block w-full"
        style={{ minHeight: 420 }}
        role="img"
        aria-label="MOTTO AIOS system map"
      >
        {/* Layer backbones */}
        {(Object.keys(LAYER_Y) as Layer[]).map((layer) => (
          <g key={layer}>
            <line
              x1={40}
              x2={w - 40}
              y1={LAYER_Y[layer]}
              y2={LAYER_Y[layer]}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="2 4"
            />
            <text
              x={w - 40}
              y={LAYER_Y[layer] - 12}
              textAnchor="end"
              fontSize={9}
              letterSpacing={2}
              fill="rgba(255,255,255,0.25)"
              style={{ textTransform: "uppercase" }}
            >
              {LAYER_LABEL[layer]}
            </text>
          </g>
        ))}

        {/* Edges */}
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e.from)!;
          const b = nodes.find((n) => n.id === e.to)!;
          const active = hoverId && (hoverId === e.from || hoverId === e.to);
          return (
            <g key={i}>
              <path
                d={`M ${a.x} ${a.y + 22} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y - 22}`}
                stroke={active ? "rgba(240,160,75,0.55)" : "rgba(255,255,255,0.07)"}
                strokeWidth={active ? 1.4 : 1}
                fill="none"
              />
              {active && e.label && (
                <text
                  x={(a.x + b.x) / 2}
                  y={(a.y + b.y) / 2}
                  textAnchor="middle"
                  fontSize={10}
                  fill="rgba(240,160,75,0.85)"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => {
          const color = LAYER_COLOR[n.layer];
          const status = showcase ? "ok" : n.status ?? "ok";
          const ring =
            status === "ok"
              ? "rgba(74,222,128,0.55)"
              : status === "warn"
              ? "rgba(250,204,21,0.55)"
              : "rgba(248,113,113,0.6)";
          const isHover = hoverId === n.id;
          return (
            <g
              key={n.id}
              onMouseEnter={() => setHoverId(n.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: n.url ? "pointer" : "default" }}
              onClick={() => {
                if (n.url) window.open(n.url, "_blank", "noopener");
              }}
            >
              <rect
                x={n.x - 70}
                y={n.y - 22}
                width={140}
                height={44}
                rx={8}
                fill="#111114"
                stroke={isHover ? color : "rgba(255,255,255,0.1)"}
                strokeWidth={isHover ? 1.5 : 1}
              />
              {/* status ring */}
              <circle
                cx={n.x + 60}
                cy={n.y - 12}
                r={3.2}
                fill={ring}
                opacity={0.95}
              >
                {status === "ok" && (
                  <animate
                    attributeName="opacity"
                    values="0.45;1;0.45"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                x={n.x - 60}
                y={n.y - 4}
                fontSize={11.5}
                fontFamily="var(--font-display, Inter), Inter, sans-serif"
                fontWeight={500}
                fill="#ededee"
              >
                {n.label}
              </text>
              <text
                x={n.x - 60}
                y={n.y + 12}
                fontSize={9}
                fill="rgba(255,255,255,0.45)"
              >
                {n.caption}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--aios-border)] pt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-dim)]">
        {(Object.keys(LAYER_LABEL) as Layer[]).map((l) => (
          <span key={l} className="inline-flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-3 rounded-full"
              style={{ background: LAYER_COLOR[l] }}
            />
            {LAYER_LABEL[l]}
          </span>
        ))}
        <span className="ml-auto normal-case tracking-normal text-[11px] text-[var(--aios-text-faint)]">
          {nodes.length} nodes · hover to highlight flows
        </span>
      </div>
    </div>
  );
}
