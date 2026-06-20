/**
 * Aturan tampilan tag di project card:
 * - Maksimal 4 tag, supaya selalu muat dalam 2 baris pada lebar card.
 * - Tag berupa tahun (mis. "2025", "2026") tidak ditampilkan, karena bukan
 *   teknologi/stack dan informasi waktu sudah ada di konteks project lain.
 *
 * Filter ini hanya berlaku di layer tampilan (card grid). Halaman detail
 * project tetap memakai `project.tags` asli supaya info lengkap tidak hilang.
 *
 * Lihat juga: components/projects/ProjectCard.tsx
 */
const YEAR_TAG_PATTERN = /^(19|20)\d{2}$/;

/**
 * Ambil tag yang ditampilkan di project card:
 * 1. Buang elemen yang berupa tahun.
 * 2. Ambil maksimal 4 tag pertama dari sisanya.
 */
export function getDisplayTags(tags: string[]): string[] {
  return tags.filter((tag) => !YEAR_TAG_PATTERN.test(tag)).slice(0, 4);
}
