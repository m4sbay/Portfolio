/**
 * Design system cover image — sumber kebenaran tunggal rasio cover project.
 *
 * Semua cover distandarkan ke SATU rasio kanonik sehingga tampil utuh (fit) di setiap
 * permukaan (hero, featured, grid) tanpa crop beda-rasio. Card menyetel `aspect-ratio`-nya
 * ke rasio ini; `object-cover` di dalam box yang rasionya sama menampilkan seluruh gambar
 * sekaligus mengisi tepi bersih (tanpa letterbox). Lihat lib/site.ts untuk pola konstanta.
 */

/** Rasio kanonik cover: 3:2 (lanskap). Dipakai guard build-time & spec konten. */
export const COVER_RATIO = 3 / 2;

/** Toleransi rasio untuk guard — mengakomodasi pembulatan piksel ekspor. */
export const COVER_RATIO_TOLERANCE = 0.01;

/** Kelas Tailwind aspect-ratio yang dibaca semua komponen cover. */
export const COVER_ASPECT = "aspect-[3/2]";

/** Ukuran master yang disarankan untuk ekspor cover (dokumentasi). */
export const COVER_MASTER = { width: 2400, height: 1600 } as const;
