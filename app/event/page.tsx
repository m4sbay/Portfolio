import Link from "next/link";
import type { Metadata } from "next";
import { EventCalendar } from "@/components/event/EventCalendar";
import { toISODateLocal } from "@/lib/event-date";
import { events } from "@/data/events";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Event",
  description: "Kalender kegiatan dan acara yang diikuti Masbay.",
  openGraph: {
    title: `Event — ${site.name}`,
    description: "Kalender kegiatan dan acara yang diikuti Masbay.",
    url: "/event",
  },
  twitter: {
    card: "summary_large_image",
    title: `Event — ${site.name}`,
    description: "Kalender kegiatan dan acara yang diikuti Masbay.",
  },
};

function formatListDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dt);
}

export default function EventPage() {
  const todayIso = toISODateLocal(new Date());
  const upcoming = [...events]
    .filter((e) => e.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date) || a.timeLabel.localeCompare(b.timeLabel));

  const list = upcoming.length > 0 ? upcoming : [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-12 pb-8">
      <header className="space-y-3">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Kegiatan
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Event
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
          Ringkasan acara yang aku ikuti — pilih tanggal di kalender untuk membuka detail, atau jelajahi daftar mendatang di bawah.
        </p>
      </header>

      <EventCalendar events={events} />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Mendatang & terbaru
        </h2>
        <ul className="flex flex-col gap-3">
          {list.map((ev) => (
            <li key={ev.slug}>
              <Link
                href={`/event/${ev.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-zinc-200/90 bg-white/80 px-4 py-3.5 transition-colors hover:border-zinc-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
              >
                <div className="min-w-0 space-y-1">
                  <p className="font-medium text-zinc-950 group-hover:text-zinc-800 dark:text-zinc-50 dark:group-hover:text-zinc-100">
                    {ev.title}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{ev.excerpt}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-zinc-500 dark:text-zinc-400">
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">{formatListDate(ev.date)}</p>
                  <p>{ev.timeLabel}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
