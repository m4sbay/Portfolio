import type { WritingPost } from "@/types/writing";
import { post as postDesainTidakLagiMenyenangkan } from "@/content/writing/posts/desain-tidak-lagi-menyenangkan";
import { post as postFlexboxBukanUntukSemuaLayout } from "@/content/writing/posts/flexbox-bukan-untuk-semua-layout";
import { post as postGimanaAkuMemanajemenBimbingan } from "@/content/writing/posts/gimana-aku-memanajemen-bimbingan-yang-buat-aku-hemat-waktu";
import { post as postMemperbaikiLatensiOpenrouter } from "@/content/writing/posts/memperbaiki-latensi-openrouter-cloudflare-worker";
import { post as postSinkronSkillsAntaraAgents } from "@/content/writing/posts/sinkron-skills-antara-agents";

export const writingPosts: WritingPost[] = [
  postGimanaAkuMemanajemenBimbingan,
  postMemperbaikiLatensiOpenrouter,
  postFlexboxBukanUntukSemuaLayout,
  postDesainTidakLagiMenyenangkan,
  postSinkronSkillsAntaraAgents,
];

export function getPostBySlug(slug: string) {
  return writingPosts.find((p) => p.slug === slug);
}

/** Urutan tampilan: pinned dulu, lalu terbaru */
export function sortedWritingPosts() {
  return [...writingPosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getReadNext(currentSlug: string): WritingPost | undefined {
  const sorted = sortedWritingPosts().filter((p) => p.slug !== currentSlug);
  return sorted[0];
}
