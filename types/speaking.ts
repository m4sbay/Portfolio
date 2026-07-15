import type { WritingInline } from "@/types/writing";

export type SpeakingSessionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Gambar dokumentasi (gallery). Aset distandarkan landscape 1920×1080, jadi width/height
 * tidak diulang di data — SpeakingGallery menyuntik ukuran default. Cukup `src` + `alt`.
 */
export type SpeakingGalleryImage = {
  src: string;
  alt: string;
};

/**
 * Blok konten sesi. String polos tetap valid sebagai paragraf biasa, jadi sesi lama
 * dengan `body: string[]` tidak perlu diubah. Paragraf memakai `segments` (WritingInline)
 * — satu sistem entity dengan Writing: mention `{ type: "mention", entity: "<slug>" }`
 * dirujuk dari registry entity yang sama (data/entities). Tanpa markdown parser/list/image.
 */
export type SpeakingContentBlock =
  | string
  | { type: "heading"; content: string }
  | { type: "paragraph"; segments: WritingInline[] };

/**
 * Resource pelengkap yang khusus milik satu artikel (slide, repo, video, dokumen, dst.) —
 * beda dari entity yang reusable lintas artikel. `type` menentukan ikon; default "other".
 * Menambah jenis baru cukup memperluas union ini + peta ikon di komponen renderer.
 */
export type SpeakingResource = {
  title: string;
  url: string;
  type?: "slides" | "website" | "repository" | "video" | "document" | "other";
};

export type SpeakingSession = {
  slug: string;
  title: string;
  /** Tanggal acara (harian), format `YYYY-MM-DD` untuk penempatan di grid */
  date: string;
  timeLabel: string;
  location: string;
  excerpt: string;
  body: SpeakingContentBlock[];
  /** Gambar utama: Hero, Card, Metadata, dan Open Graph. */
  cover?: SpeakingSessionImage;
  /** Kumpulan foto dokumentasi kegiatan. Penyajian (gallery/carousel/dst) urusan komponen UI. */
  images?: SpeakingGalleryImage[];
  /** Tautan pelengkap khusus artikel ini (slide, repo, video, dst). Kosong → section tak dirender. */
  resources?: SpeakingResource[];
};
