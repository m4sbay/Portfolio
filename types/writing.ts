export type WritingBlock =
  | { kind: "p"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "hr" }
  | { kind: "ul"; items: string[] };

export type WritingPost = {
  slug: string;
  title: string;
  /** Label kategori seperti "In Development", "In Thoughts" */
  category: string;
  excerpt: string;
  content: WritingBlock[];
  /** ISO tanggal publikasi */
  publishedAt: string;
  readMinutes: number;
  pinned?: boolean;
  tags?: string[];
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};
