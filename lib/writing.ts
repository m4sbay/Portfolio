import type { WritingBlock } from "@/types/writing";
import { getEntity } from "@/data/entities";

function parseISODateLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const WORDS_PER_MINUTE = 200;

/** Teks polos sebuah blok; mention diganti judul entity-nya supaya kalimat tetap utuh. */
function getBlockText(block: WritingBlock): string {
  if (typeof block === "string") return block;
  if (block.type === "heading") return block.text;
  if (block.type === "paragraph") {
    return block.segments
      .map(seg => (typeof seg === "string" ? seg : (getEntity(seg.entity)?.title ?? "")))
      .join("");
  }
  return "";
}

/** Estimasi waktu baca dari jumlah kata content, minimal 1 menit. */
export function getReadingTimeMinutes(content: WritingBlock[]): number {
  const words = content
    .map(getBlockText)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(content: WritingBlock[]): string {
  return `${getReadingTimeMinutes(content)} min read`;
}

/** Paragraf pertama content, utuh — dipakai metadata/description. */
export function getFirstParagraph(content: WritingBlock[]): string {
  const firstParagraph = content.find(
    block => typeof block === "string" || (typeof block !== "string" && block.type === "paragraph"),
  );
  return firstParagraph ? getBlockText(firstParagraph) : "";
}

/** Preview di card: paragraf pertama dipotong di batas kata, selalu diakhiri "(...)". */
export function getPreviewText(content: WritingBlock[], maxChars = 140): string {
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
