function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const WORDS_PER_MINUTE = 200;

/** Estimasi waktu baca dari jumlah kata content, minimal 1 menit. */
export function getReadingTimeMinutes(content: string[]): number {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(content: string[]): string {
  return `${getReadingTimeMinutes(content)} min read`;
}

/** Paragraf pertama content, utuh — dipakai metadata/description. */
export function getFirstParagraph(content: string[]): string {
  return content[0] ?? "";
}

/** Preview di card: paragraf pertama dipotong di batas kata, selalu diakhiri "(...)". */
export function getPreviewText(content: string[], maxChars = 140): string {
  const first = getFirstParagraph(content);
  if (first.length <= maxChars) return `${first} (...)`;
  const cut = first.slice(0, maxChars);
  const atWordBoundary = cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]+$/, "");
  return `${atWordBoundary} (...)`;
}

/** Tanggal singkat id-ID untuk card & meta line, mis. "8 Jul 2026". */
export function formatWritingDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseISODateLocal(iso));
}
