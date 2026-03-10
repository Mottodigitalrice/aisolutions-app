"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Home, Inbox, Users, Settings } from "lucide-react";

const routes = [
  {
    label: "ダッシュボード",
    icon: Home,
    href: ROUTES.dashboard,
  },
  {
    label: "リクエスト",
    icon: Inbox,
    href: ROUTES.items, // Will be updated to requests route later
  },
  {
    label: "リード",
    icon: Users,
    href: ROUTES.settings, // Placeholder — will be expanded
  },
  {
    label: "設定",
    icon: Settings,
    href: ROUTES.settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href={ROUTES.dashboard}
          className="flex items-center gap-1.5 font-semibold"
        >
          <span className="text-primary font-black text-lg">AI</span>
          <span className="text-foreground font-bold text-lg">Solutions</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === route.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
