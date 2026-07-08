import type { WritingPost, WritingTopicGroup } from "@/types/writing";
import { post as postResetUlangHalamanWriting } from "@/content/writing/posts/reset-ulang-halaman-writing";
import { post as postLineClampDetailKecil } from "@/content/writing/posts/line-clamp-detail-kecil";
import { post as postReadingTimeOtomatis } from "@/content/writing/posts/reading-time-otomatis";
import { post as postMentalModelServerComponents } from "@/content/writing/posts/mental-model-server-components";
import { post as postDebounceVsThrottle } from "@/content/writing/posts/debounce-vs-throttle";
import { post as postStrategiLoadingWebFont } from "@/content/writing/posts/strategi-loading-web-font";
import { post as postOperatorSatisfiesTypescript } from "@/content/writing/posts/operator-satisfies-typescript";
import { post as postKapanButuhUseMemo } from "@/content/writing/posts/kapan-butuh-use-memo";
import { post as postWhitespaceBukanRuangKosong } from "@/content/writing/posts/whitespace-bukan-ruang-kosong";
import { post as postKontrasWarnaDarkMode } from "@/content/writing/posts/kontras-warna-dark-mode";

export const writingPosts: WritingPost[] = [
  postResetUlangHalamanWriting,
  postLineClampDetailKecil,
  postReadingTimeOtomatis,
  postMentalModelServerComponents,
  postDebounceVsThrottle,
  postStrategiLoadingWebFont,
  postOperatorSatisfiesTypescript,
  postKapanButuhUseMemo,
  postWhitespaceBukanRuangKosong,
  postKontrasWarnaDarkMode,
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

/**
 * Kelompokkan post per topic, otomatis dari data. Urutan topic mengikuti
 * post terbaru di masing-masing topic; post di dalam grup terbaru dulu.
 */
export function groupPostsByTopic(): WritingTopicGroup[] {
  const map = new Map<string, WritingPost[]>();
  for (const post of sortedWritingPosts()) {
    const list = map.get(post.topic) ?? [];
    list.push(post);
    map.set(post.topic, list);
  }
  return [...map.entries()].map(([topic, posts]) => ({ topic, posts }));
}
