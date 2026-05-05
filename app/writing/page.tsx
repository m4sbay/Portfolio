import type { Metadata } from "next";
import { sortedWritingPosts } from "@/data/writing";
import { WritingListCard } from "@/components/writing/WritingListCard";
import { site } from "@/lib/site";
import { BookOpenIcon, FolderIcon, PinIcon } from "@/skills/design-system/icons";

export const metadata: Metadata = {
  title: `Writing — ${site.title}`,
  description: "Catatan teknis, proses desain, dan pemikiran singkat seputar frontend & produk.",
  openGraph: {
    title: `Writing — ${site.title}`,
    description: "Catatan teknis, proses desain, dan pemikiran singkat seputar frontend & produk.",
    url: "/writing",
  },
};

const CATEGORY_ORDER = ["In Thoughts", "In Development", "In Tips", "In Updates", "In Accessibility"];

function groupByCategory(posts: ReturnType<typeof sortedWritingPosts>) {
  const map = new Map<string, typeof posts>();
  for (const p of posts) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  const keys = [...map.keys()].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return keys.map((k) => ({ category: k, posts: map.get(k)! }));
}

export default function WritingPage() {
  const all = sortedWritingPosts();
  const pinned = all.filter((p) => p.pinned);
  const rest = all.filter((p) => !p.pinned);
  const groups = groupByCategory(rest);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 space-y-3">
        <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          <BookOpenIcon
            className="h-9 w-9 shrink-0 text-emerald-600/90 dark:text-emerald-400/90 sm:h-11 sm:w-11"
            aria-hidden
          />
          Writing
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Catatan singkat: masalah, solusi, dan hal yang ingin kutinggalkan jejaknya.
        </p>
      </header>

      {pinned.length > 0 ? (
        <section className="mb-4">
          <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            Pinned
          </h2>
          <div className="divide-y divide-zinc-200/80 dark:divide-white/10">
            {pinned.map((post) => (
              <WritingListCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {groups.map(({ category, posts }) => (
        <section key={category} className="mb-4">
          <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <FolderIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            {category}
          </h2>
          <div className="divide-y divide-zinc-200/80 dark:divide-white/10">
            {posts.map((post) => (
              <WritingListCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
