"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { SpeakingSession } from "@/types/speaking";
import { ClockIcon, FileTextIcon, MapPinIcon } from "@/design-system/icons";
import { formatSpeakingListDate } from "@/lib/speaking-date";

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
  const hero = session.images?.[0];

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
        // Mobile (<md): kartu vertikal tinggi tetap — image hero di atas, konten di bawah.
        // md+: layout horizontal — media jadi panel kiri yang hug (self-stretch) mengikuti tinggi card.
        // Card tanpa padding: padding hidup di area konten, agar media flush ke tepi card.
        className="group relative flex h-64 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/90 transition-[border-color,background-color,box-shadow] duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 md:h-auto md:flex-row"
      >
        {/* Mobile: image hero full-width, ~45% tinggi card.
            md+: panel kiri 200px rasio persegi (aspect-square) yang MENENTUKAN tinggi minimum card.
            self-start = panel tidak ikut memanjang saat konten lebih tinggi → image tetap 1:1, tak pernah letterbox.
            Radius mengikuti card via overflow-hidden rounded-xl (satu kesatuan visual). */}
        {hero ? (
          <div className="relative w-full shrink-0 basis-[45%] overflow-hidden bg-zinc-200 dark:bg-zinc-800 md:aspect-square md:w-[200px] md:basis-auto md:self-start">
            {/* Layer belakang: gambar sama memenuhi panel, diperbesar + blur + opacity rendah
                untuk menyamarkan area kosong di sisi cover portrait (tetap terasa premium). */}
            <Image
              src={hero.src}
              alt=""
              aria-hidden
              fill
              // Card pertama selalu di atas fold → priority (preload + fetchpriority high).
              // Card lain: lazy default. Kedua layer berbagi src, tapi warning LCP menyasar
              // elemen <img> yang jadi LCP, jadi priority dipasang di kedua layer card pertama.
              priority={index === 0}
              className="scale-110 object-cover opacity-40 blur-xl dark:opacity-30"
              sizes="(max-width: 767px) 100vw, 200px"
              unoptimized={hero.src.endsWith(".svg")}
            />
            {/* Layer depan: gambar tampil utuh tanpa crop. */}
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority={index === 0}
              className="object-contain"
              sizes="(max-width: 767px) 100vw, 200px"
              unoptimized={hero.src.endsWith(".svg")}
            />
          </div>
        ) : (
          <div className="flex w-full shrink-0 basis-[45%] items-center justify-center bg-zinc-100 dark:bg-zinc-800 md:aspect-square md:w-[200px] md:basis-auto md:self-start">
            <FileTextIcon className="size-7 text-zinc-400 dark:text-zinc-500" aria-hidden />
          </div>
        )}

        {/* Mobile: hanya tanggal + judul, konten di-center vertikal. md+: divider + excerpt + metadata.
            Padding konten: py/pr 3.5, pl-4 setelah divider (ritme horizontal sedikit lebih lega). */}
        <div className="flex min-w-0 flex-1 flex-col justify-center p-3 md:justify-start md:border-l md:border-zinc-200/90 md:py-3.5 md:pl-4 md:pr-3.5 md:dark:border-zinc-700/90">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {formatSpeakingListDate(session.date)}
          </p>
          {/* Desktop rhythm: date→title 6px (md:mt-1.5), title→excerpt 10px, excerpt→meta 12px.
              Mobile hanya date+title (excerpt/meta hidden) → md:mt-1.5 jaga mobile tetap mt-1. */}
          <h2 className="mt-1 line-clamp-3 text-base font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50 md:mt-1.5 md:line-clamp-2">
            {session.title}
          </h2>
          <p className="mt-2.5 hidden line-clamp-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:block">
            {session.excerpt}
          </p>
          <div className="mt-3 hidden flex-col items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 md:flex">
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
