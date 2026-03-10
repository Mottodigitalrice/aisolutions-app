"use client";

import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">AI Solutions 管理画面</h2>
      </div>
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
