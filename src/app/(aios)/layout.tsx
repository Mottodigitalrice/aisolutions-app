import "@/components/aios/aios-theme.css";
import type { Metadata } from "next";
import { AiosNav } from "@/components/aios/aios-nav";
import { UserButton } from "@clerk/nextjs";

const clerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
  title: "AIOS Console — MOTTO",
  description: "Operator surface for the MOTTO AI Operating System.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const dynamic = "force-dynamic";

export default function AiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="aios-shell">
      <header className="sticky top-0 z-30 border-b border-[var(--aios-border)] bg-[var(--aios-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--aios-bg)]/65">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="display text-sm font-semibold tracking-tight">
              MOTTO
            </span>
            <span className="text-[var(--aios-text-faint)]">▸</span>
            <span className="display text-sm tracking-tight text-[var(--aios-text)]">
              AIOS
            </span>
            <span className="ml-3 hidden md:inline mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)]">
              Operator Console
            </span>
          </div>
          <div className="hidden md:block">
            <AiosNav />
          </div>
          <div className="flex items-center gap-2">
            {clerkConfigured ? (
              <UserButton
                appearance={{
                  elements: { avatarBox: "h-7 w-7" },
                }}
              />
            ) : (
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--aios-text-faint)]">
                dev · no auth
              </span>
            )}
          </div>
        </div>
        <div className="border-t border-[var(--aios-border)] px-5 py-2 md:hidden">
          <AiosNav />
        </div>
      </header>
      <main className="mx-auto max-w-[1280px] px-5 py-6">{children}</main>
      <footer className="mx-auto max-w-[1280px] border-t border-[var(--aios-border)] px-5 py-6 text-[11px] text-[var(--aios-text-faint)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            MOTTO AIOS · operator console · not indexed
          </span>
          <span className="mono">v1 · build-time snapshot</span>
        </div>
      </footer>
    </div>
  );
}
