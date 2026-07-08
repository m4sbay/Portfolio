export interface WritingPost {
  slug: string;
  title: string;
  /** Label topik, mis. "Design", "Development" */
  topic: string;
  /** ISO tanggal publikasi */
  publishedAt: string;
  image: { src: string; alt: string };
  /** Paragraf konten; index 0 dipakai sebagai preview di card */
  content: string[];
}
