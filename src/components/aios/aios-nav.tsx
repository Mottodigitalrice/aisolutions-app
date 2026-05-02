"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/aios", label: "Overview" },
  { href: "/aios/projects", label: "Projects" },
  { href: "/aios/automations", label: "Automations" },
  { href: "/aios/urls", label: "URLs" },
  { href: "/aios/vps", label: "VPS" },
  { href: "/aios/activity", label: "Activity" },
  { href: "/aios/skills", label: "Skills" },
];

export function AiosNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {NAV.map((item) => {
        const active =
          item.href === "/aios"
            ? pathname === "/aios"
            : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition",
              active
                ? "border-[var(--aios-border-strong)] bg-white/5 text-[var(--aios-text)]"
                : "border-transparent text-[var(--aios-text-dim)] hover:border-[var(--aios-border)] hover:text-[var(--aios-text)]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
