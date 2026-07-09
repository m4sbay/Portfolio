import fs from "node:fs";
import path from "node:path";
import { WRITING_TOPICS } from "@/types/writing";
import type {
  WritingPost,
  WritingTopic,
  WritingTopicGroup,
  WritingTopicLabel,
  WritingTopicSlug,
} from "@/types/writing";

const POSTS_DIR = path.join(process.cwd(), "content", "writing", "posts");

/**
 * Auto-discovery: semua file di content/writing/posts otomatis dimuat.
 * Tambah artikel = buat satu file post; tidak ada file lain yang perlu diubah.
 * Nama file bebas — `slug` di objek post adalah sumber kebenaran URL.
 */
async function loadAllPosts(): Promise<WritingPost[]> {
  const files = fs.readdirSync(POSTS_DIR).filter(file => /\.tsx?$/.test(file));

  const posts = await Promise.all(
    files.map(async file => {
      const name = file.replace(/\.tsx?$/, "");
      const mod = (await import(`@/content/writing/posts/${name}`)) as { post?: WritingPost };
      if (!mod.post?.slug || !mod.post.status) {
        throw new Error(`content/writing/posts/${file}: wajib meng-export "post" dengan slug & status.`);
      }
      return mod.post;
    }),
  );

  // Guard: slug duplikat atau bentrok dengan slug topic → gagalkan build, jangan diam-diam.
  const seen = new Map<string, string>();
  const topicSlugs = new Set<string>(WRITING_TOPICS.map(t => t.slug));
  for (const post of posts) {
    const existing = seen.get(post.slug);
    if (existing) {
      throw new Error(`Slug duplikat "${post.slug}" (${existing} & ${post.title}).`);
    }
    if (topicSlugs.has(post.slug)) {
      throw new Error(`Slug post "${post.slug}" bentrok dengan slug topic di WRITING_TOPICS.`);
    }
    seen.set(post.slug, post.title);
  }

  return posts;
}

let cache: Promise<WritingPost[]> | null = null;

/** Semua post apa pun statusnya (internal/tooling). Dev tanpa cache agar file baru langsung terbaca. */
export function getAllWritingPosts(): Promise<WritingPost[]> {
  if (process.env.NODE_ENV !== "production") return loadAllPosts();
  return (cache ??= loadAllPosts());
}

function byNewest(a: WritingPost, b: WritingPost): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** Hanya post published, terbaru dulu. Satu-satunya pintu data untuk semua tampilan publik. */
export async function getPublishedPosts(): Promise<WritingPost[]> {
  const posts = await getAllWritingPosts();
  return posts.filter(post => post.status === "published").sort(byNewest);
}

/** Post published by slug; draft/tidak ada → undefined (halaman detail 404). */
export async function getPublishedPostBySlug(slug: string): Promise<WritingPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find(post => post.slug === slug);
}

/** Semua post published pada satu topic, terbaru dulu. */
export async function getPostsByTopic(topicSlug: WritingTopicSlug): Promise<WritingPost[]> {
  const topic = getTopicBySlug(topicSlug);
  if (!topic) return [];
  const posts = await getPublishedPosts();
  return posts.filter(post => post.topic === topic.label);
}

/**
 * Kelompokkan post published per topic. Urutan topic mengikuti post terbaru
 * di masing-masing topic; post di dalam grup terbaru dulu.
 */
export async function groupPostsByTopic(): Promise<WritingTopicGroup[]> {
  const map = new Map<WritingTopicLabel, WritingPost[]>();
  for (const post of await getPublishedPosts()) {
    const list = map.get(post.topic) ?? [];
    list.push(post);
    map.set(post.topic, list);
  }
  return [...map.entries()].map(([label, posts]) => ({
    topic: getTopicByLabel(label),
    posts,
  }));
}

/**
 * Rekomendasi published, terbaru dulu, maksimal `limit`.
 * - excludeSlug: untuk "Lainnya seperti ini" di halaman detail.
 * - excludeTopicSlug: untuk section lintas kategori di halaman topic.
 */
export async function getRecommendations(options: {
  excludeTopicSlug?: WritingTopicSlug;
  excludeSlug?: string;
  limit?: number;
}): Promise<WritingPost[]> {
  const { excludeTopicSlug, excludeSlug, limit = 6 } = options;
  const excludedLabel = excludeTopicSlug ? getTopicBySlug(excludeTopicSlug)?.label : undefined;
  const posts = await getPublishedPosts();
  return posts
    .filter(post => post.slug !== excludeSlug && post.topic !== excludedLabel)
    .slice(0, limit);
}

/** Lookup registry (sync, tanpa fs). */
export function getTopicBySlug(slug: string): WritingTopic | undefined {
  return WRITING_TOPICS.find(topic => topic.slug === slug);
}

export function getTopicByLabel(label: WritingTopicLabel): WritingTopic {
  const topic = WRITING_TOPICS.find(t => t.label === label);
  if (!topic) throw new Error(`Topic "${label}" tidak terdaftar di WRITING_TOPICS.`);
  return topic;
}
