"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type SVGProps } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import type { CalendarEvent } from "@/types/event";
import { toISODateLocal } from "@/lib/event-date";

const WEEKDAY_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] as const;

function startMondayOffset(firstOfMonth: Date): number {
  const dow = firstOfMonth.getDay();
  return (dow + 6) % 7;
}

function buildMonthGrid(view: Date): Date[] {
  const y = view.getFullYear();
  const m = view.getMonth();
  const first = new Date(y, m, 1);
  const pad = startMondayOffset(first);
  const start = new Date(y, m, 1 - pad);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function eventsByDate(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const list = map.get(e.date) ?? [];
    list.push(e);
    map.set(e.date, list);
  }
  return map;
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isToday(d: Date) {
  const t = new Date();
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function initialMonthFromEvents(list: CalendarEvent[]) {
  if (list.length === 0) return new Date();
  const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date));
  const [y, m] = sorted[0].date.split("-").map(Number);
  return new Date(y, m - 1, 1);
}

export function EventCalendar({ events }: { events: CalendarEvent[] }) {
  const router = useRouter();
  const [view, setView] = useState(() => initialMonthFromEvents(events));
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  const byDate = useMemo(() => eventsByDate(events), [events]);
  const grid = useMemo(() => buildMonthGrid(view), [view]);

  const monthTitle = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(view);

  const selectedEvents = selectedIso ? (byDate.get(selectedIso) ?? []) : [];

  function shiftMonth(delta: number) {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
    setSelectedIso(null);
  }

  function onPickDay(d: Date) {
    const iso = toISODateLocal(d);
    const list = byDate.get(iso);
    if (!list?.length) {
      setSelectedIso(null);
      return;
    }
    if (list.length === 1) {
      router.push(`/event/${list[0].slug}`);
      return;
    }
    setSelectedIso(iso);
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[1.35rem] border border-zinc-200/90 bg-white/85 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:ring-white/[0.04]">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 px-4 py-3.5 sm:px-5 dark:border-white/10">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="min-w-0 text-center text-base font-semibold capitalize tracking-tight text-zinc-950 sm:text-lg dark:text-zinc-50">
            {monthTitle}
          </p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`${view.getFullYear()}-${view.getMonth()}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="p-3 sm:p-4"
            >
              <div className="grid grid-cols-7 gap-0.5 text-center text-[11px] font-medium uppercase tracking-wide text-zinc-500 sm:gap-1 sm:text-xs dark:text-zinc-400">
                {WEEKDAY_LABELS.map((d) => (
                  <div key={d} className="py-2">
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-0.5 sm:gap-1">
                {grid.map((d) => {
                  const iso = toISODateLocal(d);
                  const inMonth = isSameMonth(d, view);
                  const today = isToday(d);
                  const dayEvents = byDate.get(iso) ?? [];
                  const has = dayEvents.length > 0;

                  return (
                    <button
                      key={iso + d.getTime()}
                      type="button"
                      disabled={!has}
                      onClick={() => onPickDay(d)}
                      className={[
                        "relative flex min-h-[2.5rem] flex-col items-center justify-start rounded-xl py-1.5 text-sm transition-colors sm:min-h-[3rem] sm:py-2",
                        inMonth
                          ? "text-zinc-900 dark:text-zinc-100"
                          : "text-zinc-400/80 dark:text-zinc-600",
                        has
                          ? "cursor-pointer hover:bg-zinc-100/90 dark:hover:bg-white/10"
                          : "cursor-default opacity-90",
                        today ? "ring-1 ring-red-500/55 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950" : "",
                      ].join(" ")}
                    >
                      <span className={today ? "font-semibold text-red-600 dark:text-red-400" : "font-medium"}>
                        {d.getDate()}
                      </span>
                      {has ? (
                        <span className="mt-0.5 flex h-4 items-center justify-center gap-0.5" aria-hidden>
                          {dayEvents.slice(0, 3).map((ev) => (
                            <span
                              key={ev.slug}
                              className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400"
                              title={ev.title}
                            />
                          ))}
                          {dayEvents.length > 3 ? (
                            <span className="text-[9px] font-semibold text-sky-600 dark:text-sky-300">
                              +{dayEvents.length - 3}
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="mt-0.5 h-4" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>
            </m.div>
          </AnimatePresence>
        </LazyMotion>
      </div>

      <AnimatePresence>
        {selectedIso && selectedEvents.length > 1 ? (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Beberapa acara pada tanggal yang sama
            </p>
            <ul className="mt-3 space-y-2">
              {selectedEvents.map((ev) => (
                <li key={ev.slug}>
                  <Link
                    href={`/event/${ev.slug}`}
                    className="flex flex-col rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 text-left transition-colors hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-zinc-950/40 dark:hover:border-white/20 dark:hover:bg-zinc-950/80"
                  >
                    <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{ev.title}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{ev.timeLabel} · {ev.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-3 text-xs font-medium text-zinc-500 underline-offset-2 hover:text-zinc-800 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
              onClick={() => setSelectedIso(null)}
            >
              Tutup daftar
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
