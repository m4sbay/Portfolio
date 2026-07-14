import Link from "next/link";
import type { SpeakingSession } from "@/types/speaking";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { ClockIcon, MapPinIcon } from "@/design-system/icons";
import { formatSpeakingCardDate } from "@/lib/speaking-date";

/**
 * Card "related content" untuk section "More Speaking" di halaman detail.
 * Layout horizontal (cover kiri + info kanan), sengaja beda bahasa visual dari kartu browsing
 * di /speaking (SpeakingTimeline) agar hirarkinya jelas: rekomendasi lanjutan, bukan daftar utama.
 *
 * Tinggi card mengikuti tinggi konten (bukan alignment) — bertambah karena metadata, bukan paksaan.
 * Info: tanggal → judul → lokasi → waktu. Belum ada field `role` di SpeakingSession, jadi baris ke-4
 * memakai metadata relevan yang memang ada (`timeLabel`); tidak ada data dummy.
 * Cover tetap Standar Cover Speaking (1:1, object-cover).
 */
export function SpeakingMiniCard({ session }: { session: SpeakingSession }) {
  const cover = session.cover;

  return (
    <Link
      href={`/speaking/${session.slug}`}
      className="group flex items-start gap-3 rounded-xl border border-zinc-200/90 bg-white p-2.5 transition-[border-color,box-shadow] duration-200 hover:border-zinc-300 hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
    >
      {/* Cover kiri ~112px, aspect-square (Standar Cover Speaking). Sedikit dinaikkan agar seimbang
          dengan tinggi konten yang kini lebih tinggi (4 baris info). */}
      <div className="w-28 shrink-0">
        <MediaThumb
          image={cover}
          rounded="rounded-lg"
          aspectClassName="aspect-square"
          sizes="112px"
          unoptimized={cover?.src.endsWith(".svg")}
          fallbackClassName="block aspect-square"
        />
      </div>

      {/* Info kanan: tinggi tetap (min-h-32) agar semua card seragam — dirancang memuat
          tanggal (1) + judul (maks 3) + lokasi (1) + waktu (1). flex-col + mt-auto memaku
          lokasi/waktu ke bawah; ruang kosong fleksibel di antara judul dan metadata mengecil
          saat judul mencapai 3 baris. */}
      <div className="flex min-h-28 min-w-0 flex-1 flex-col">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatSpeakingCardDate(session.date)}</p>
        <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
          {session.title}
        </h3>

        <div className="mt-auto flex flex-col gap-1 pt-2 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPinIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            <span className="truncate">{session.location}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            {session.timeLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
