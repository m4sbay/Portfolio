/**
 * Registry kategori terpusat — satu-satunya sumber kebenaran (pola WRITING_TOPICS).
 * Tambah kategori baru = tambah satu entri di sini; filter di UI otomatis mengikuti.
 */
export const PROJECT_CATEGORIES = ["Design", "Website", "Tools", "Video", "App"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** "All" adalah konsep filter UI, bukan kategori domain project. */
export type ProjectCategoryFilter = "All" | ProjectCategory;

/** Status project. v1: published | draft. Dirancang untuk diperluas: "archived". */
export type ProjectStatus = "published" | "draft";

/** Bentuk gambar bersama untuk cover, hover, galeri, dan section. */
export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Section naratif + galeri — dipakai caseStudy & processSections. */
export type ProjectSection = {
  title: string;
  description: string;
  gallery: ProjectImage[];
};

/** Brand/tool yang disebut di deskripsi dan dirender sebagai link eksternal. */
export type ProjectBrandLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  /** Hanya "published" yang dirender di website; draft tetap boleh ada di repo. */
  status: ProjectStatus;
  /** Urutan kurasi tampilan; angka kecil tampil lebih dulu. */
  order: number;
  tags: string[];
  slug: string;
  href?: string;
  logo?: string;
  caseStudyHref?: string;
  externalLink?: string;
  externalLinkLabel?: string;
  brandLinks?: ProjectBrandLink[];
  image: ProjectImage;
  hoverImage?: ProjectImage;
  gallery?: ProjectImage[];
  caseStudy?: ProjectSection;
  processSections?: ProjectSection[];
};
