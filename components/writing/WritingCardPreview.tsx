import Image from "next/image";
import type { WritingPost } from "@/types/writing";
import { formatReadingTime, getPreviewText } from "@/lib/writing";

/**
 * Card 2: satu-satunya elemen ber-border. Tinggi fixed — card yang menentukan
 * ukuran gambar, bukan sebaliknya. Saat hover isinya berganti panel informasi
 * tanpa mengubah ukuran/layout.
 */
export function WritingCardPreview({ post }: { post: WritingPost }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-lg border border-black/5 dark:border-white/10">
      <Image
        src={post.image.src}
        alt={post.image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none dark:bg-zinc-900">
        <span className="rounded-sm border-[0.5px] border-black/10 px-3 py-1 text-xs font-reguler text-zinc-500 dark:border-white/10 dark:text-zinc-50">
          {formatReadingTime(post.content)}
        </span>
        <p className="mt-3 line-clamp-3 text-center text-sm leading-relaxed text-zinc-400 dark:text-zinc-400">
          {getPreviewText(post.content)}
        </p>
      </div>
    </div>
  );
}
