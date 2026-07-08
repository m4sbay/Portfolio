import type { WritingPost } from "@/types/writing";
import { WritingCard } from "@/components/writing/WritingCard";
import { WritingGridAnimator } from "@/components/writing/WritingGridAnimator";

/** Section full-width di bawah artikel; tanpa sidebar. Maksimal 2 baris grid. */
export function WritingMoreSection({ posts }: { posts: WritingPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Lainnya seperti ini
      </h2>

      <WritingGridAnimator>
        {posts.slice(0, 6).map(post => (
          <WritingCard key={post.slug} post={post} />
        ))}
      </WritingGridAnimator>
    </section>
  );
}
