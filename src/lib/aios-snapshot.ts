import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { RepoSnapshot } from "./aios-types";

export * from "./aios-types";

let cached: RepoSnapshot | null = null;

export async function getSnapshot(): Promise<RepoSnapshot> {
  if (cached) return cached;
  const file = path.join(process.cwd(), "public", "snapshot.json");
  try {
    const text = await fs.readFile(file, "utf8");
    cached = JSON.parse(text) as RepoSnapshot;
    return cached;
  } catch {
    cached = {
      generatedAt: new Date(0).toISOString(),
      counts: { projects: 0, skills: 0, agents: 0, commits7d: 0 },
      dailyFocus: null,
      projects: [],
      skills: [],
      agents: [],
      commits: [],
    };
    return cached;
  }
}
