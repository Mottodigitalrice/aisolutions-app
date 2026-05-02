"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/aios/project-card";
import { bucketStatus, type SnapshotProject } from "@/lib/aios-types";
import { cn } from "@/lib/utils";

const FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "deployed", label: "Deployed" },
  { id: "paused", label: "Paused" },
  { id: "planning", label: "Planning" },
  { id: "other", label: "Other" },
];

export function ProjectsFilter({
  projects,
}: {
  projects: SnapshotProject[];
}) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== "all" && bucketStatus(p.status) !== filter) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.slug.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [projects, filter, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition",
                filter === f.id
                  ? "border-[var(--aios-border-strong)] bg-white/5 text-[var(--aios-text)]"
                  : "border-transparent text-[var(--aios-text-dim)] hover:border-[var(--aios-border)]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="ml-auto w-full rounded-md border border-[var(--aios-border)] bg-[var(--aios-surface)] px-3 py-1.5 text-sm text-[var(--aios-text)] placeholder:text-[var(--aios-text-faint)] focus:border-[var(--aios-border-strong)] focus:outline-none md:w-72"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="aios-card p-6 text-sm text-[var(--aios-text-dim)]">
          No projects match this filter.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}

      <div className="text-xs text-[var(--aios-text-faint)]">
        {filtered.length} of {projects.length} shown
      </div>
    </div>
  );
}
