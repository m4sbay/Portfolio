import Link from "next/link";
import type { WritingPost } from "@/types/writing";
import { FolderIcon } from "@/design-system/icons";
import { WritingMetaLine } from "@/components/writing/WritingMetaLine";
import { IconLabel } from "@/components/ui/IconLabel";
import { MediaThumb } from "@/components/ui/MediaThumb";

export function WritingListCard({
  post,
  showCategory = true,
}: {
  post: WritingPost;
  showCategory?: boolean;
}) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-4 border-b border-zinc-200/80 py-5 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch"
    >
      <div className="flex min-h-0 min-w-0 flex-col md:h-full">
        <div>
          {showCategory ? (
            <IconLabel icon={FolderIcon}>
              {post.category}
            </IconLabel>
          ) : null}
          <h2
            className={`text-xl font-semibold tracking-tight text-zinc-950/80 transition-colors group-hover:text-zinc-950 dark:text-zinc-50/80 dark:group-hover:text-zinc-50 md:text-2xl ${
              showCategory ? "mt-3" : ""
            }`}
          >
            {post.title}
          </h2>
        </div>

        <div className="mt-auto flex flex-col gap-1 pt-3">
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
          <WritingMetaLine publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
        </div>
      </div>
      <MediaThumb image={post.heroImage} imageClassName="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
    </Link>
  );
}
