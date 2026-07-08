import type { Metadata } from "next";
import { groupPostsByTopic } from "@/data/writing";
import { WritingTopicSection } from "@/components/writing/WritingTopicSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Writing — ${site.title}`,
  description: "Catatan teknis, proses desain, dan pemikiran singkat seputar frontend & produk.",
  openGraph: {
    title: `Writing — ${site.title}`,
    description: "Catatan teknis, proses desain, dan pemikiran singkat seputar frontend & produk.",
    url: "/writing",
  },
};

export default function WritingPage() {
  const groups = groupPostsByTopic();

  return (
    <div className="py-12">
      {groups.length === 0 ? (
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">Belum ada tulisan.</p>
      ) : (
        <div className="space-y-14">
          {groups.map(group => (
            <WritingTopicSection key={group.topic} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
