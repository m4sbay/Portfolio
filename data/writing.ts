import type { WritingPost } from "@/types/writing";
import { post as postResetUlangHalamanWriting } from "@/content/writing/posts/reset-ulang-halaman-writing";
import { post as postLineClampDetailKecil } from "@/content/writing/posts/line-clamp-detail-kecil";
import { post as postReadingTimeOtomatis } from "@/content/writing/posts/reading-time-otomatis";

export const writingPosts: WritingPost[] = [
  postResetUlangHalamanWriting,
  postLineClampDetailKecil,
  postReadingTimeOtomatis,
];

export function getPostBySlug(slug: string) {
  return writingPosts.find(p => p.slug === slug);
}

/** Urutan tampilan: terbaru dulu */
export function sortedWritingPosts(): WritingPost[] {
  return [...writingPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
