import type { CalendarEvent } from "@/types/event";
import { event as devmeetPadangMei } from "@/content/events/devmeet-padang-mei";
import { event as kopiKodeMei } from "@/content/events/kopi-kode-mei";
import { event as seminarUiPoliteknik } from "@/content/events/seminar-ui-politeknik";
import { event as workshopFrontendItp } from "@/content/events/workshop-frontend-itp";

export const events: CalendarEvent[] = [
  workshopFrontendItp,
  devmeetPadangMei,
  seminarUiPoliteknik,
  kopiKodeMei,
];

/** Urutan tampilan: tanggal terbaru dulu, lalu urutan waktu pada hari yang sama. */
export function sortedEvents(): CalendarEvent[] {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.timeLabel.localeCompare(b.timeLabel);
  });
}

export function getEventBySlug(slug: string): CalendarEvent | undefined {
  return events.find((e) => e.slug === slug);
}
