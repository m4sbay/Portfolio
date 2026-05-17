"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { CalendarEvent } from "@/types/event";
import { ClockIcon, FileTextIcon, MapPinIcon } from "@/design-system/icons";
import { formatEventListDate } from "@/lib/event-date";

export function EventTimeline({ events }: { events: CalendarEvent[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        <div
          className="pointer-events-none absolute bottom-8 left-3 top-4 hidden w-px bg-linear-to-b from-zinc-300 via-zinc-200 to-zinc-100/90 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900/90 md:block"
          aria-hidden
        />
        <ol className="relative m-0 list-none space-y-0 p-0">
          {events.map((event, index) => (
            <TimelineItem key={event.slug} event={event} index={index} reduceMotion={Boolean(reduceMotion)} />
          ))}
        </ol>
      </div>
    </LazyMotion>
  );
}

function TimelineItem({
  event,
  index,
  reduceMotion,
}: {
  event: CalendarEvent;
  index: number;
  reduceMotion: boolean;
}) {
  const hero = event.images?.[0];

  return (
    <m.li
      className="relative flex gap-2 pb-5 last:pb-0 md:gap-3 md:pb-6"
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={reduceMotion ? undefined : { once: true, margin: "-8% 0px -6% 0px", amount: 0.12 }}
      transition={
        reduceMotion ? undefined : { duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      <div className="relative flex w-5 shrink-0 flex-col items-center pt-3 md:w-6 md:pt-3.5" aria-hidden>
        <span className="relative z-10 size-3 rounded-full border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-950" />
        <span className="mt-2 h-[calc(100%+1.25rem)] w-px shrink-0 bg-zinc-200 dark:bg-zinc-800 md:hidden" />
      </div>

      <Link
        href={`/event/${event.slug}`}
        className="group relative flex min-w-0 flex-1 gap-3 rounded-xl border border-zinc-200/90 bg-zinc-50/90 p-3 transition-[border-color,background-color,box-shadow] duration-200 hover:border-zinc-300 hover:bg-white hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 md:gap-3.5 md:p-3.5"
      >
        {hero ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-zinc-200 ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:ring-zinc-700 md:size-20">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              className="object-cover"
              sizes="80px"
              unoptimized={hero.src.endsWith(".svg")}
            />
          </div>
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-zinc-100 ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:ring-zinc-700 md:size-20">
            <FileTextIcon className="size-7 text-zinc-400 dark:text-zinc-500" aria-hidden />
          </div>
        )}

        <div className="min-w-0 flex-1 border-l border-zinc-200/90 pl-3 dark:border-zinc-700/90">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {formatEventListDate(event.date)}
          </p>
          <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
            {event.title}
          </h2>
          <p className="mt-1 line-clamp-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.excerpt}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1">
              <MapPinIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              <span className="truncate">{event.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <ClockIcon className="size-3 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              {event.timeLabel}
            </span>
          </div>
        </div>
      </Link>
    </m.li>
  );
}
