import Image from "next/image";
import Link from "next/link";
import type { WritingPost } from "@/types/writing";
import { BookOpenIcon, FolderIcon } from "@/skills/design-system/icons";
import { WritingMetaLine } from "@/components/writing/WritingMetaLine";

export function WritingReadNext({ post }: { post: WritingPost }) {
  return (
    <section className="mt-16 border-t border-zinc-200 pt-10 dark:border-white/10">
      <h2 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <BookOpenIcon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
        Read next
      </h2>
      <Link
        href={`/writing/${post.slug}`}
        className="group grid gap-5 rounded-2xl border border-zinc-200/80 p-4 transition-colors hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20 md:grid-cols-[1fr_minmax(0,160px)]"
      >
        <div className="min-w-0 space-y-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <FolderIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            {post.category}
          </p>
          <p className="font-semibold tracking-tight text-zinc-950 group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-400">
            {post.title}
          </p>
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
          <WritingMetaLine publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
        </div>
        {post.heroImage ? (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        ) : null}
      </Link>
    </section>
  );
}
