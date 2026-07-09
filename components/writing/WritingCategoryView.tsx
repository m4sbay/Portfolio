import type { WritingPost, WritingTopic } from "@/types/writing";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";
import { WritingSection } from "@/components/writing/WritingSection";

/**
 * Halaman topic /writing/[topic]. Presentasional — route yang mengambil data.
 * posts: published pada topic ini; recommendations: published di luar topic ini (max 6).
 */
export function WritingCategoryView({
  topic,
  posts,
  recommendations,
}: {
  topic: WritingTopic;
  posts: WritingPost[];
  recommendations: WritingPost[];
}) {
  return (
    <div className="py-12">
      <DetailBreadcrumb href="/writing" label="Writing" current={topic.label} />

      <header className="space-y-4 pt-4">
        <h1 className="text-[38px] font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
          {topic.label}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {posts.length} tulisan
        </p>
      </header>

      <div className="mt-10">
        {posts.length === 0 ? (
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Belum ada tulisan di topik ini.
          </p>
        ) : (
          <WritingSection posts={posts} />
        )}
      </div>

      {recommendations.length > 0 ? (
        <div className="mt-16">
          <WritingSection title="Lainnya Seperti Ini" posts={recommendations} />
        </div>
      ) : null}
    </div>
  );
}
