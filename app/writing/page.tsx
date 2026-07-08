import type { Metadata } from "next";
import { sortedWritingPosts } from "@/data/writing";
import { WritingCard } from "@/components/writing/WritingCard";
import { WritingGridAnimator } from "@/components/writing/WritingGridAnimator";
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
  const posts = sortedWritingPosts();

  return (
    <div className="py-12">
      <header className="mb-12 space-y-3">
        <h1 className="text-[38px] font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">Writing</h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Hal-hal yang aku pelajari, temuin, atau emang pengen aku tulis aja.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">Belum ada tulisan.</p>
      ) : (
        <WritingGridAnimator>
          {posts.map(post => (
            <WritingCard key={post.slug} post={post} />
          ))}
        </WritingGridAnimator>
      )}
    </div>
  );
}
