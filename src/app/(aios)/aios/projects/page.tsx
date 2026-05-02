import { getSnapshot, bucketStatus } from "@/lib/aios-snapshot";
import { ProjectCard } from "@/components/aios/project-card";
import { Section } from "@/components/aios/section";
import { ProjectsFilter } from "./projects-filter";

export const metadata = { title: "Projects · AIOS" };

export default async function ProjectsPage() {
  const snap = await getSnapshot();

  const counts = {
    all: snap.projects.length,
    active: snap.projects.filter((p) => bucketStatus(p.status) === "active")
      .length,
    deployed: snap.projects.filter((p) => bucketStatus(p.status) === "deployed")
      .length,
    paused: snap.projects.filter((p) => bucketStatus(p.status) === "paused")
      .length,
    other: snap.projects.filter(
      (p) =>
        !["active", "deployed", "paused"].includes(bucketStatus(p.status)),
    ).length,
  };

  return (
    <div className="space-y-6">
      <Section
        eyebrow="Projects Ledger"
        title={`${snap.projects.length} projects`}
        meta={
          <span className="mono text-[11px]">
            active {counts.active} · deployed {counts.deployed} · paused{" "}
            {counts.paused}
          </span>
        }
      >
        <ProjectsFilter projects={snap.projects} />
      </Section>
    </div>
  );
}
