import Link from "next/link";

const PORTAL = [
  { name: "Notion", url: "https://www.notion.so" },
  { name: "n8n VPS", url: "https://n8n.mottodigital.jp" },
  { name: "n8n Cloud", url: "https://mottodigitalpro.app.n8n.cloud" },
  { name: "Vercel", url: "https://vercel.com/dashboard" },
  { name: "Supabase", url: "https://supabase.com/dashboard" },
  { name: "R2", url: "https://dash.cloudflare.com/" },
  { name: "Hostinger", url: "https://hpanel.hostinger.com" },
  { name: "Freee", url: "https://accounts.secure.freee.co.jp/" },
  { name: "GWS Admin", url: "https://admin.google.com" },
  { name: "TidyCal", url: "https://tidycal.com/admin" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Cloudflare", url: "https://dash.cloudflare.com" },
];

export function PortalGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {PORTAL.map((p) => (
        <Link
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="aios-card-flat flex items-center justify-between gap-2 px-3 py-2.5 text-sm transition hover:border-[var(--aios-border-strong)] hover:bg-white/5"
        >
          <span>{p.name}</span>
          <span aria-hidden className="text-[var(--aios-text-faint)]">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
