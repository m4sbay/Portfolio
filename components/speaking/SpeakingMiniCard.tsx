import Link from "next/link";
import type { SpeakingSession } from "@/types/speaking";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { formatSpeakingYear } from "@/lib/speaking-date";

/**
 * Card ringkas untuk konteks non-list (section "More Speaking" di halaman detail,
 * dan nantinya Home/About). Hanya info esensial: cover, judul, tahun · lokasi.
 * Sengaja dipisah dari kartu timeline (SpeakingTimeline) — bukan turunannya.
 */
export function SpeakingMiniCard({ session }: { session: SpeakingSession }) {
  const cover = session.images?.[0];

  return (
    <Link
      href={`/speaking/${session.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200/90 bg-white p-3 transition-[border-color,box-shadow] duration-200 hover:border-zinc-300 hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
    >
      <MediaThumb
        image={cover}
        rounded="rounded-lg"
        aspectClassName="aspect-[3/2]"
        sizes="(max-width: 640px) 100vw, 240px"
        unoptimized={cover?.src.endsWith(".svg")}
        fallbackClassName="block aspect-[3/2]"
      />

      <div className="min-w-0">
        {/* Role akan tampil di sini bila field-nya sudah tersedia. */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
          {session.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
          {formatSpeakingYear(session.date)} · {session.location}
        </p>
      </div>
    </Link>
  );
}
