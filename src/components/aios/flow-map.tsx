import { cn } from "@/lib/utils";
import {
  INTEGRATIONS,
  type Flow,
  type FlowNode,
  type FlowEdge,
} from "@/lib/automations";
import { IntegrationBadge } from "./integration-badge";

const NODE_W = 220;
const NODE_H = 96;
const COL_GAP = 64;
const ROW_GAP = 28;
const PAD_X = 32;
const PAD_Y = 32;

function nodeX(col: number) {
  return PAD_X + col * (NODE_W + COL_GAP);
}

function nodeY(row: number) {
  return PAD_Y + row * (NODE_H + ROW_GAP);
}

function nodeCenter(node: FlowNode) {
  return { cx: nodeX(node.col) + NODE_W / 2, cy: nodeY(node.row) + NODE_H / 2 };
}

function edgePath(from: FlowNode, to: FlowNode): string {
  const x1 = nodeX(from.col) + NODE_W;
  const y1 = nodeY(from.row) + NODE_H / 2;
  const x2 = nodeX(to.col);
  const y2 = nodeY(to.row) + NODE_H / 2;
  // smooth horizontal cubic bezier — bigger curve when rows differ
  const dx = Math.max(40, (x2 - x1) * 0.45);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export function FlowMap({ flow, className }: { flow: Flow; className?: string }) {
  const cols = Math.max(...flow.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...flow.nodes.map((n) => n.row)) + 1;
  const w = PAD_X * 2 + cols * NODE_W + (cols - 1) * COL_GAP;
  const h = PAD_Y * 2 + rows * NODE_H + (rows - 1) * ROW_GAP;

  const nodeById = new Map(flow.nodes.map((n) => [n.id, n]));

  return (
    <div
      className={cn(
        "aios-card relative overflow-x-auto overflow-y-hidden",
        className,
      )}
    >
      {/* dotted background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative" style={{ width: w, height: h }}>
        {/* Edges */}
        <svg
          className="pointer-events-none absolute left-0 top-0"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          aria-hidden
        >
          <defs>
            <marker
              id={`arr-${flow.slug}`}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="rgba(240,160,75,0.7)" />
            </marker>
          </defs>
          {flow.edges.map((e: FlowEdge, i: number) => {
            const a = nodeById.get(e.from);
            const b = nodeById.get(e.to);
            if (!a || !b) return null;
            const path = edgePath(a, b);
            const ax = nodeX(a.col) + NODE_W;
            const ay = nodeY(a.row) + NODE_H / 2;
            const bx = nodeX(b.col);
            const by = nodeY(b.row) + NODE_H / 2;
            return (
              <g key={i}>
                {/* base line */}
                <path
                  d={path}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1.5}
                  fill="none"
                />
                {/* animated dashes */}
                <path
                  d={path}
                  stroke="rgba(240,160,75,0.85)"
                  strokeWidth={1.5}
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                  fill="none"
                  markerEnd={`url(#arr-${flow.slug})`}
                  style={{ animation: `flow-dash-${i % 3} 1.6s linear infinite` }}
                />
                {/* endpoint dots */}
                <circle cx={ax} cy={ay} r={2.5} fill="rgba(240,160,75,0.85)" />
                <circle cx={bx} cy={by} r={2.5} fill="rgba(240,160,75,0.85)" />
                {e.label && (
                  <g>
                    <rect
                      x={(ax + bx) / 2 - 24}
                      y={(ay + by) / 2 - 9}
                      width={48}
                      height={16}
                      rx={4}
                      fill="#16161a"
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <text
                      x={(ax + bx) / 2}
                      y={(ay + by) / 2 + 2}
                      textAnchor="middle"
                      fontSize={9}
                      fill="rgba(255,255,255,0.65)"
                      letterSpacing={1.2}
                      style={{ textTransform: "uppercase" }}
                    >
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          <style>{`
            @keyframes flow-dash-0 { to { stroke-dashoffset: -20; } }
            @keyframes flow-dash-1 { to { stroke-dashoffset: -20; } }
            @keyframes flow-dash-2 { to { stroke-dashoffset: -20; } }
          `}</style>
        </svg>

        {/* Nodes */}
        {flow.nodes.map((n) => {
          const meta = INTEGRATIONS[n.integration];
          return (
            <div
              key={n.id}
              className="absolute"
              style={{
                left: nodeX(n.col),
                top: nodeY(n.row),
                width: NODE_W,
                height: NODE_H,
              }}
            >
              <div
                className="aios-card-strong group relative h-full p-3 transition hover:border-[var(--aios-border-strong)]"
                style={{
                  boxShadow: `0 0 0 1px ${meta.color}1f, 0 0 24px ${meta.ring}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <IntegrationBadge integration={n.integration} />
                  {n.detail && (
                    <span className="mono text-[10px] text-[var(--aios-text-faint)]">
                      {n.detail}
                    </span>
                  )}
                </div>
                <div className="display mt-2 line-clamp-1 text-sm font-medium text-[var(--aios-text)]">
                  {n.title}
                </div>
                {n.description && (
                  <div className="mt-1 line-clamp-2 text-[11px] text-[var(--aios-text-dim)]">
                    {n.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
