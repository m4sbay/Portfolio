import type { Metadata } from "next";
import { sortedEvents } from "@/data/events";
import { EventTimeline } from "@/components/event/EventTimeline";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Event — ${site.title}`,
  description: "Kegiatan, workshop, dan komunitas yang aku ikuti.",
  openGraph: {
    title: `Event — ${site.title}`,
    description: "Kegiatan, workshop, dan komunitas yang aku ikuti.",
    url: "/event",
  },
};

export default function EventPage() {
  const list = sortedEvents();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-7 space-y-2 sm:mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">Event</h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Daftar kegiatan — <span className="text-zinc-700 dark:text-zinc-300">kapan</span>,{" "}
          <span className="text-zinc-700 dark:text-zinc-300">di mana</span>, singkatnya apa.
        </p>
      </header>

      <nav aria-label="Linimasa kegiatan">
        <EventTimeline events={list} />
      </nav>
    </div>
  );
}
