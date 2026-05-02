#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(APP_ROOT, "../../../..");

async function readDir(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function readText(file) {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

function parseFrontmatter(text) {
  if (!text) return {};
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      fm[kv[1]] = v;
    }
  }
  return fm;
}

function extractStatusFromBody(text) {
  if (!text) return null;
  const m = text.match(/\*\*Status:\*\*\s*([^\n]+)/);
  return m ? m[1].trim() : null;
}

function extractFirstHeading(text) {
  if (!text) return null;
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/\[\[|\]\]/g, "").trim() : null;
}

function extractOwner(text) {
  if (!text) return null;
  const m = text.match(/\*\*Owner:\*\*\s*\[\[([^\]]+)\]\]/);
  return m ? m[1].trim() : null;
}

async function gatherProjects() {
  const projectsDir = path.join(REPO_ROOT, "projects");
  const entries = await readDir(projectsDir);
  const projects = [];
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const projDir = path.join(projectsDir, slug);
    const overviewPath = path.join(projDir, "overview.md");
    const overview = await readText(overviewPath);
    const fm = parseFrontmatter(overview);
    const taskCount = await countTasks(projDir);
    const progressCount = await countProgress(projDir);
    const lastProgress = await latestProgress(projDir);

    projects.push({
      slug,
      name: fm.project || extractFirstHeading(overview) || slug,
      status: extractStatusFromBody(overview) || "UNKNOWN",
      owner: extractOwner(overview),
      hasOverview: !!overview,
      updated: fm.updated || null,
      created: fm.created || null,
      notion_id: fm.notion_id || null,
      taskCount,
      progressCount,
      lastProgress,
    });
  }
  return projects.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function countTasks(projDir) {
  const tasksDir = path.join(projDir, "tasks");
  const entries = await readDir(tasksDir);
  let count = 0;
  for (const e of entries) {
    if (e.isFile() && e.name.endsWith(".md")) {
      const text = await readText(path.join(tasksDir, e.name));
      if (text) count += (text.match(/^- \[ \]/gm) || []).length;
    }
  }
  return count;
}

async function countProgress(projDir) {
  const progressDir = path.join(projDir, "progress");
  const entries = await readDir(progressDir);
  return entries.filter((e) => e.isFile() && e.name.endsWith(".md")).length;
}

async function latestProgress(projDir) {
  const progressDir = path.join(projDir, "progress");
  const entries = await readDir(progressDir);
  const dates = entries
    .filter((e) => e.isFile() && e.name.match(/^\d{4}-\d{2}-\d{2}\.md$/))
    .map((e) => e.name.replace(".md", ""))
    .sort();
  return dates[dates.length - 1] || null;
}

async function gatherSkills() {
  const skillsDir = path.join(REPO_ROOT, ".claude/skills");
  const entries = await readDir(skillsDir);
  const skills = [];
  for (const ent of entries) {
    if (!ent.isDirectory() || ent.name.startsWith("_")) continue;
    const skillFile = path.join(skillsDir, ent.name, "SKILL.md");
    const text = await readText(skillFile);
    const fm = parseFrontmatter(text);
    skills.push({
      slug: ent.name,
      name: fm.name || ent.name,
      description: fm.description || "",
    });
  }
  return skills.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function gatherAgents() {
  const agentsDir = path.join(REPO_ROOT, ".claude/agents");
  const entries = await readDir(agentsDir);
  const agents = [];
  for (const ent of entries) {
    if (!ent.isFile() || !ent.name.endsWith(".md")) continue;
    const slug = ent.name.replace(".md", "");
    const text = await readText(path.join(agentsDir, ent.name));
    const heading = extractFirstHeading(text) || slug;
    const modelMatch = text?.match(/##\s*Model\s*\n+\s*([^\n]+)/);
    agents.push({
      slug,
      name: heading,
      model: modelMatch ? modelMatch[1].trim() : null,
    });
  }
  return agents.sort((a, b) => a.slug.localeCompare(b.slug));
}

function gatherCommits() {
  try {
    const out = execSync(
      `git -C "${REPO_ROOT}" log --since="7 days ago" --pretty=format:"%h|%ad|%s" --date=iso-strict --max-count=50`,
      { encoding: "utf8" },
    );
    return out
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, date, ...subjectParts] = line.split("|");
        return { hash, date, subject: subjectParts.join("|") };
      });
  } catch {
    return [];
  }
}

async function gatherDailyFocus() {
  const file = path.join(REPO_ROOT, "business-operations/focus/daily.md");
  const text = await readText(file);
  if (!text) return null;
  const fm = parseFrontmatter(text);
  const heading = extractFirstHeading(text);
  const oneThing = text.match(/\*\*ONE THING:\*\*\s*([^\n]+)/);
  const tasks = [];
  const sections = ["Must Do", "Should Do", "Quick Wins"];
  for (const section of sections) {
    const re = new RegExp(`### ${section}\\n([\\s\\S]*?)(?:\\n###|\\n## |$)`);
    const sm = text.match(re);
    if (!sm) continue;
    const lines = sm[1].split("\n").filter((l) => l.match(/^- \[/));
    for (const line of lines) {
      const done = !!line.match(/^- \[x\]/i);
      const label = line.replace(/^- \[[ x]\]\s*/i, "").trim();
      tasks.push({ section, label, done });
    }
  }
  return {
    updated: fm.updated || null,
    heading,
    oneThing: oneThing ? oneThing[1].replace(/\[\[|\]\]/g, "").trim() : null,
    tasks,
  };
}

async function main() {
  const [projects, skills, agents, dailyFocus] = await Promise.all([
    gatherProjects(),
    gatherSkills(),
    gatherAgents(),
    gatherDailyFocus(),
  ]);
  const commits = gatherCommits();

  const snapshot = {
    generatedAt: new Date().toISOString(),
    counts: {
      projects: projects.length,
      skills: skills.length,
      agents: agents.length,
      commits7d: commits.length,
    },
    dailyFocus,
    projects,
    skills,
    agents,
    commits,
  };

  const outPath = path.join(APP_ROOT, "public", "snapshot.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(
    `snapshot written → ${outPath}\n` +
      `  ${projects.length} projects, ${skills.length} skills, ` +
      `${agents.length} agents, ${commits.length} commits (7d)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
