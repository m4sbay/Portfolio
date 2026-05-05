import type { Metadata } from "next";
import { WRITING_CATEGORY_ORDER } from "@/content/writing/categories";
import { sortedWritingPosts } from "@/data/writing";
import { WritingListCard } from "@/components/writing/WritingListCard";
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

function groupByCategory(posts: ReturnType<typeof sortedWritingPosts>) {
  const map = new Map<string, typeof posts>();
  for (const p of posts) {
    const list = map.get(p.category) ?? [];
    list.push(p);
    map.set(p.category, list);
  }
  const categoryOrder: string[] = [...WRITING_CATEGORY_ORDER];
  const keys = [...map.keys()].sort((a, b) => {
    const ia = categoryOrder.indexOf(a);
    const ib = categoryOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return keys.map(k => ({ category: k, posts: map.get(k)! }));
}

export default function WritingPage() {
  const all = sortedWritingPosts();
  const groups = groupByCategory(all);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 space-y-3">
        <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Writing</h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Hal-hal yang aku pelajari, temuin, atau emang <span className="font-medium text-zinc-600 dark:text-zinc-200">pengen aku tulis</span> aja
        </p>
      </header>

      {groups.map(({ category, posts }, groupIndex) => (
        <div key={category} className={groupIndex > 0 ? "mt-10" : undefined}>
          {posts.map(post => (
            <WritingListCard key={post.slug} post={post} showCategory />
          ))}
        </div>
      ))}
    </div>
  );
}
