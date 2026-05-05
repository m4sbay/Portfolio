import Image from "next/image";
import Link from "next/link";
import type { WritingPost } from "@/types/writing";
import { FileTextIcon, FolderIcon } from "@/skills/design-system/icons";
import { WritingMetaLine } from "@/components/writing/WritingMetaLine";

export function WritingListCard({ post }: { post: WritingPost }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-6 py-8 md:grid-cols-[1fr_minmax(0,220px)] md:items-start"
    >
      <div className="min-w-0 space-y-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <FolderIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
          {post.category}
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-400 md:text-2xl">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
        <WritingMetaLine publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
      </div>
      {post.heroImage ? (
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 md:aspect-square">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 220px"
          />
        </div>
      ) : (
        <div className="relative hidden aspect-square w-full rounded-2xl bg-linear-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 md:block">
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <FileTextIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
          </span>
        </div>
      )}
    </Link>
  );
}
