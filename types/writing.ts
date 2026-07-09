/** Status artikel. v1: published | draft. Dirancang untuk diperluas: "scheduled" | "archived". */
export type WritingStatus = "published" | "draft";

/**
 * Registry topic terpusat — satu-satunya sumber kebenaran kategori.
 * Tambah kategori baru = tambah satu entri di sini; halaman /writing/[slug]
 * untuk topic tersebut otomatis tersedia.
 */
export const WRITING_TOPICS = [
  { slug: "development", label: "Development" },
  { slug: "design", label: "Design" },
  { slug: "life", label: "Life" },
  { slug: "process", label: "Process" },
] as const;

export type WritingTopic = (typeof WRITING_TOPICS)[number];
export type WritingTopicSlug = WritingTopic["slug"];
export type WritingTopicLabel = WritingTopic["label"];

export interface WritingTopicGroup {
  topic: WritingTopic;
  posts: WritingPost[];
}

/** Segmen inline di dalam paragraf: teks biasa atau RichMention ke entity registry. */
export type WritingInline = string | { type: "mention"; entity: string };

/**
 * Blok konten artikel. String polos tetap valid sebagai paragraf biasa,
 * jadi post lama dengan content: string[] tidak perlu diubah.
 */
export type WritingBlock =
  | string
  | { type: "paragraph"; segments: WritingInline[] }
  | { type: "heading"; text: string }
  | { type: "entityCard"; entity: string };

export interface WritingPost {
  slug: string;
  title: string;
  /** Label topik dari registry WRITING_TOPICS; typo gagal compile. */
  topic: WritingTopicLabel;
  /** Hanya "published" yang dirender di website; draft tetap boleh ada di repo. */
  status: WritingStatus;
  /** ISO tanggal publikasi */
  publishedAt: string;
  image: { src: string; alt: string };
  /** Blok konten; blok paragraf pertama dipakai sebagai preview di card */
  content: WritingBlock[];
}
