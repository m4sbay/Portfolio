/** Format relatif singkat (id-ID), untuk meta kartu / artikel. */
export function formatRelativeId(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const day = 86400000;
  const d = Math.floor(diff / day);
  if (d === 0) return "hari ini";
  if (d === 1) return "kemarin";
  if (d < 7) return `${d} hari lalu`;
  if (d < 30) return `${Math.floor(d / 7)} minggu lalu`;
  if (d < 365) return `${Math.floor(d / 30)} bulan lalu`;
  return `${Math.floor(d / 365)} tahun lalu`;
}
