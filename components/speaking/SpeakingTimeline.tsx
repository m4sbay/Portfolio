"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { SpeakingSession } from "@/types/speaking";
import { ClockIcon, FileTextIcon, MapPinIcon } from "@/design-system/icons";
import { formatSpeakingListDate, formatSpeakingCardDate } from "@/lib/speaking-date";

export function SpeakingTimeline({ sessions }: { sessions: SpeakingSession[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <ol className="m-0 flex list-none flex-col gap-5 p-0 md:gap-6">
        {sessions.map((session, index) => (
          <SpeakingListItem
            key={session.slug}
            session={session}
            index={index}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </ol>
    </LazyMotion>
  );
}

function SpeakingListItem({
  session,
  index,
  reduceMotion,
}: {
  session: SpeakingSession;
  index: number;
  reduceMotion: boolean;
}) {
  const hero = session.cover;

  return (
    <m.li
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={reduceMotion ? undefined : { once: true, margin: "-8% 0px -6% 0px", amount: 0.12 }}
      transition={
        reduceMotion ? undefined : { duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      <Link
        href={`/speaking/${session.slug}`}
        // Mobile (<md): hero-card — image full-bleed rasio 1:1 (aspect-square, ikut cover 1080×1080),
        // tinggi otomatis dari lebar container tanpa fixed height. Info overlay di bawah.
        // md+: aspect di-reset (md:aspect-auto) → layout horizontal identik: tinggi auto dari panel 200px.
        className="group relative block aspect-square w-full min-w-0 overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/90 transition-[border-color,background-color,box-shadow] duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 md:flex md:aspect-auto md:h-auto md:flex-row"
      >
        {/* ── MOBILE hero (<md): image full-bleed + gradient bawah + overlay tanggal/judul ── */}
        <div className="absolute inset-0 md:hidden">
          {hero ? (
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              // Card pertama di atas fold → priority (LCP). Sisanya lazy default.
              priority={index === 0}
              className="object-cover"
              sizes="(min-width: 768px) 1px, 100vw"
              unoptimized={hero.src.endsWith(".svg")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <FileTextIcon className="size-8 text-zinc-400 dark:text-zinc-500" aria-hidden />
            </div>
          )}
          {/* Gradient transparent → hitam 75% hanya di bawah: naikkan keterbacaan tanpa menutup foto. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
            aria-hidden
          />
          {/* Overlay teks: hanya tanggal + judul. Putih di atas gradient gelap (kontras AA). */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-xs font-medium text-white/75">{formatSpeakingCardDate(session.date)}</p>
            <h2 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-white">
              {session.title}
            </h2>
          </div>
        </div>

        {/* ── DESKTOP (md+): panel media kiri — tak berubah, hanya disembunyikan di mobile ── */}
        {hero ? (
          <div className="relative hidden aspect-square w-[200px] shrink-0 self-start overflow-hidden bg-zinc-200 dark:bg-zinc-800 md:block">
            {/* Layer belakang: gambar sama, diperbesar + blur + opacity rendah untuk menyamarkan
                area kosong di sisi cover portrait (tetap terasa premium). */}
            <Image
              src={hero.src}
              alt=""
              aria-hidden
              fill
              priority={index === 0}
              className="scale-110 object-cover opacity-40 blur-xl dark:opacity-30"
              sizes="200px"
              unoptimized={hero.src.endsWith(".svg")}
            />
            {/* Layer depan: gambar tampil utuh tanpa crop. */}
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority={index === 0}
              className="object-contain"
              sizes="200px"
              unoptimized={hero.src.endsWith(".svg")}
            />
          </div>
        ) : (
          <div className="hidden aspect-square w-[200px] shrink-0 items-center justify-center self-start bg-zinc-100 dark:bg-zinc-800 md:flex">
            <FileTextIcon className="size-7 text-zinc-400 dark:text-zinc-500" aria-hidden />
          </div>
        )}

        {/* ── DESKTOP (md+): konten kanan — divider + excerpt + metadata, tak berubah ── */}
        <div className="hidden min-w-0 flex-1 flex-col justify-start border-l border-zinc-200/90 py-3.5 pl-4 pr-3.5 dark:border-zinc-700/90 md:flex">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {formatSpeakingListDate(session.date)}
          </p>
          <h2 className="mt-1.5 line-clamp-2 text-base font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
            {session.title}
          </h2>
          <p className="mt-2.5 line-clamp-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {session.excerpt}
          </p>
          {/* mt-auto: dorong metadata ke bawah area konten (kolom stretch setinggi card).
              Whitespace fleksibel muncul antara excerpt dan metadata; pt-3 jaga jarak minimum. */}
          <div className="mt-auto flex flex-col items-start gap-2 pt-3 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1">
              <MapPinIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              <span className="truncate">{session.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <ClockIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              {session.timeLabel}
            </span>
          </div>
        </div>
      </Link>
    </m.li>
  );
}
