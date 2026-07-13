"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { SpeakingSession } from "@/types/speaking";
import { ClockIcon, FileTextIcon, MapPinIcon } from "@/design-system/icons";
import { formatSpeakingListDate } from "@/lib/speaking-date";

// Garis timeline = elemen sekunder: 1px, warna netral lembut agar card tetap fokus.
const railLineClass = "w-px shrink-0 bg-zinc-200 dark:bg-zinc-800";
// Jarak antar-card, mengikuti ritme daftar (setara pb-5/pb-6 sebelumnya). Token
// spacing biasa — bukan calc, tidak bergantung tinggi card — dipakai sebagai
// tinggi segmen garis penghubung antar node.
const railGapClass = "h-5 md:h-6";
// Lebar kolom rail; dijaga konsisten antara baris card dan segmen penghubung.
const railColClass = "w-5 shrink-0 md:w-6";

export function SpeakingTimeline({ sessions }: { sessions: SpeakingSession[] }) {
  const reduceMotion = useReducedMotion();
  const lastIndex = sessions.length - 1;

  return (
    <LazyMotion features={domAnimation}>
      <ol className="m-0 list-none p-0">
        {sessions.map((session, index) => (
          <TimelineItem
            key={session.slug}
            session={session}
            index={index}
            isFirst={index === 0}
            isLast={index === lastIndex}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </ol>
    </LazyMotion>
  );
}

function TimelineItem({
  session,
  index,
  isFirst,
  isLast,
  reduceMotion,
}: {
  session: SpeakingSession;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const hero = session.images?.[0];
  const dotClass = isFirst
    ? // Sesi terbaru: dot terisi lembut sebagai penanda paling baru (subtle, tanpa animasi).
      "size-3 rounded-full border border-zinc-400 bg-zinc-400 dark:border-zinc-500 dark:bg-zinc-500"
    : "size-3 rounded-full border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950";

  return (
    <m.li
      className="relative flex flex-col"
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={reduceMotion ? undefined : { once: true, margin: "-8% 0px -6% 0px", amount: 0.12 }}
      transition={
        reduceMotion ? undefined : { duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {/* Baris card: rail stretch ke tinggi CARD saja. Dua flex-1 mengapit dot →
          dot selalu di vertical center card, auto-adaptif untuk tinggi card apa pun
          (tanpa calc / magic number). */}
      <div className="flex gap-2 md:gap-3">
        <div className={`flex flex-col items-center ${railColClass}`} aria-hidden>
          {/* Segmen atas: kosong di item pertama (garis mulai DI dot pertama). */}
          <span className={`flex-1 ${isFirst ? "" : railLineClass}`} />
          <span className={dotClass} />
          {/* Segmen bawah: kosong di item terakhir (garis berhenti DI dot terakhir). */}
          <span className={`flex-1 ${isLast ? "" : railLineClass}`} />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/speaking/${session.slug}`}
            className="group relative flex w-full min-w-0 flex-col gap-0 overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-50/90 p-0 transition-[border-color,background-color,box-shadow] duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 md:flex-row md:items-center md:gap-3.5 md:p-3.5"
          >
            {/* Mobile: image hero penuh di atas (aspect 3:2 = rasio cover kanonik).
                md+: thumbnail persegi 80px di kiri (layout desktop, tak berubah). */}
            {hero ? (
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-t-xl bg-zinc-200 dark:bg-zinc-800 md:aspect-auto md:size-20 md:rounded-lg md:ring-1 md:ring-zinc-200/80 md:dark:ring-zinc-700">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 80px"
                  unoptimized={hero.src.endsWith(".svg")}
                />
              </div>
            ) : (
              <div className="flex aspect-[3/2] w-full shrink-0 items-center justify-center rounded-t-xl bg-zinc-100 dark:bg-zinc-800 md:aspect-auto md:size-20 md:rounded-lg md:ring-1 md:ring-zinc-200/80 md:dark:ring-zinc-700">
                <FileTextIcon className="size-7 text-zinc-400 dark:text-zinc-500" aria-hidden />
              </div>
            )}

            {/* Mobile: padding sendiri (card p-0), hanya tanggal + judul. md+: divider + pl-3 (layout desktop). */}
            <div className="min-w-0 flex-1 p-3 md:border-l md:border-zinc-200/90 md:p-0 md:pl-3 md:dark:border-zinc-700/90">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {formatSpeakingListDate(session.date)}
              </p>
              <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-snug tracking-tight text-zinc-950 dark:text-zinc-50">
                {session.title}
              </h2>
              <p className="mt-1 hidden line-clamp-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:block">{session.excerpt}</p>
              <div className="mt-1.5 hidden flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-zinc-600 dark:text-zinc-400 md:flex">
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
        </div>
      </div>

      {/* Segmen penghubung antar node: menjembatani jarak dari card ini ke card berikutnya.
          Sejajar kolom rail; tidak dirender setelah item terakhir. */}
      {!isLast ? (
        <div className="flex gap-2 md:gap-3" aria-hidden>
          <div className={`flex justify-center ${railColClass}`}>
            <span className={`${railGapClass} ${railLineClass}`} />
          </div>
        </div>
      ) : null}
    </m.li>
  );
}
