import Link from "next/link";
import type { WritingPost } from "@/types/writing";
import { formatWritingDate } from "@/lib/writing";
import { WritingCardPreview } from "@/components/writing/WritingCardPreview";
import { ArrowUpRightIcon } from "@/design-system/icons";

/**
 * Card 1: container tak terlihat — tanpa border/background/shadow, hanya
 * wrapper layout + area hover & klik untuk seluruh card.
 */
export function WritingCard({ post }: { post: WritingPost }) {
  return (
    <Link href={`/writing/${post.slug}`} className="group flex h-full flex-col gap-3">
      <header>
        {/* Satu baris, dipotong ellipsis selebar card agar semua header seragam */}
        <h2 className="truncate text-sm font-reguler leading-snug text-zinc-950 dark:text-zinc-50">
          {post.title}
        </h2>
        <p className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
          {formatWritingDate(post.publishedAt)}
        </p>
      </header>

      <WritingCardPreview post={post} />

      {/* Card 3: di bawah Card 2, selalu menempati ruang agar hover tidak menggeser layout */}
      <footer className="flex items-center justify-between opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {post.topic}
        </span>
        <ArrowUpRightIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-50" aria-hidden />
      </footer>
    </Link>
  );
}
