function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Untuk eyebrow kartu / daftar: weekday singkat + tanggal (id-ID). */
export function formatSpeakingListDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseISODateLocal(iso));
}

/** Untuk header detail: weekday panjang + tanggal (id-ID). */
export function formatSpeakingLongDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseISODateLocal(iso));
}
