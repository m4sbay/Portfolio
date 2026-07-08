import type { WritingTopicGroup } from "@/types/writing";
import { WritingCard } from "@/components/writing/WritingCard";
import { WritingGridAnimator } from "@/components/writing/WritingGridAnimator";

/** Kapasitas tampilan awal = 2 baris penuh grid (1 kolom mobile, 2 sm, 3 lg). */
const MAX_VISIBLE = 6;

/** Card melewati kapasitas 2 baris breakpoint-nya disembunyikan via CSS. */
function cardVisibilityClass(index: number): string {
  if (index < 2) return "";
  if (index < 4) return "hidden sm:block";
  return "hidden lg:block";
}

/** Tombol hanya tampil ketika ada card yang tersembunyi di breakpoint tersebut. */
function moreVisibilityClass(total: number): string {
  return [
    total > 2 ? "inline-flex" : "hidden",
    total > 4 ? "sm:inline-flex" : "sm:hidden",
    total > 6 ? "lg:inline-flex" : "lg:hidden",
  ].join(" ");
}

export function WritingTopicSection({ group }: { group: WritingTopicGroup }) {
  const { topic, posts } = group;

  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {topic}
      </h2>

      <WritingGridAnimator>
        {posts.slice(0, MAX_VISIBLE).map((post, index) => (
          <div key={post.slug} className={cardVisibilityClass(index)}>
            <WritingCard post={post} />
          </div>
        ))}
      </WritingGridAnimator>

      {posts.length > 2 ? (
        <button
          type="button"
          className={`${moreVisibilityClass(posts.length)} text-sm text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50`}
        >
          Lihat selengkapnya
        </button>
      ) : null}
    </section>
  );
}
