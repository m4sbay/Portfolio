function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Untuk eyebrow kartu / daftar: weekday singkat + tanggal (id-ID). */
export function formatEventListDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseISODateLocal(iso));
}

/** Untuk header detail: weekday panjang + tanggal (id-ID). */
export function formatEventLongDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseISODateLocal(iso));
}

/** Potongan tanggal untuk blok “poster” di linimasa. */
export function getEventDateParts(iso: string): {
  day: number;
  monthShort: string;
  year: number;
  weekdayShort: string;
} {
  const d = parseISODateLocal(iso);
  return {
    day: d.getDate(),
    monthShort: new Intl.DateTimeFormat("id-ID", { month: "short" }).format(d),
    year: d.getFullYear(),
    weekdayShort: new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(d),
  };
}
