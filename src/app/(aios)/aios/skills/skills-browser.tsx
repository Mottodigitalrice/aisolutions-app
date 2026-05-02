"use client";

import { useMemo, useState } from "react";
import type { SnapshotSkill } from "@/lib/aios-types";

export function SkillsBrowser({ skills }: { skills: SnapshotSkill[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter(
      (s) =>
        s.slug.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  }, [skills, query]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills…"
          className="w-full max-w-sm rounded-md border border-[var(--aios-border)] bg-[var(--aios-surface)] px-3 py-1.5 text-sm text-[var(--aios-text)] placeholder:text-[var(--aios-text-faint)] focus:border-[var(--aios-border-strong)] focus:outline-none"
        />
        <span className="mono shrink-0 text-[11px] text-[var(--aios-text-faint)]">
          {filtered.length} / {skills.length}
        </span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {filtered.map((s) => (
          <div key={s.slug} className="aios-card px-4 py-3">
            <div className="display text-sm font-medium">{s.name}</div>
            <div className="mt-1 line-clamp-2 text-xs text-[var(--aios-text-dim)]">
              {s.description || "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
