/**
 * Tipe domain rute /work — galeri karya (proof of work).
 * Featured = sorotan kuratorial (1 hero + beberapa kartu); grid menampung SEMUA project
 * published. Featured adalah subset, bukan pengecualian — ia tetap muncul di grid.
 */

/** Header ringkas halaman /work — identitas singkat, bukan narasi panjang. */
export type WorkHeader = {
  eyebrow: string;
  title: string;
  intro: string;
};

/** Kurasi featured + CTA kontak. Slug dirujuk ke project published saat resolve. */
export type FeaturedContent = {
  header: WorkHeader;
  /** Satu karya terbaik sebagai hero sinematik. */
  heroSlug: string;
  /** 2–3 karya sorotan sebagai kartu seragam. */
  featuredSlugs: string[];
  cta: {
    label: string;
    href: string;
  };
};
