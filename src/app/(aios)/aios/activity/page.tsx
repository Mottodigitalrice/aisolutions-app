import { Section } from "@/components/aios/section";
import { ActivityFeed } from "@/components/aios/activity-feed";
import { getSnapshot } from "@/lib/aios-snapshot";

export const metadata = { title: "Activity · AIOS" };

export default async function ActivityPage() {
  const snap = await getSnapshot();
  return (
    <div className="space-y-6">
      <Section
        eyebrow="Activity Feed"
        title={`${snap.commits.length} commits · last 7 days`}
        meta={
          <span className="mono text-[11px]">
            v2 will merge n8n executions + Notion page changes
          </span>
        }
      >
        <ActivityFeed commits={snap.commits} limit={50} />
      </Section>
    </div>
  );
}
