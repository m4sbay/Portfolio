export type WritingInlineText =
  | string
  | {
      text: string;
      bold?: boolean;
      href?: string;
    };

export type WritingRichText = string | WritingInlineText[];

export type WritingBlock =
  | { kind: "p"; text: WritingRichText }
  | { kind: "lead"; text: WritingRichText }
  | { kind: "h2"; text: string }
  | { kind: "hr" }
  | { kind: "ul"; items: WritingRichText[] };

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
