import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedProjects } from "@/data/projects";
import { getPublishedPosts } from "@/data/writing";
import { getAllSpeaking } from "@/data/speaking";
import { WRITING_TOPICS } from "@/types/writing";

const base = site.url.replace(/\/$/, "");

// Jaga sitemap tidak pecah kalau ada tanggal yang tidak valid di konten.
function safeDate(value?: string): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts, sessions] = await Promise.all([
    getPublishedProjects(),
    getPublishedPosts(),
    getAllSpeaking(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/speaking`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/arsipreset`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const writingRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/writing/${p.slug}`,
    lastModified: safeDate(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // /writing/[slug] juga melayani halaman topik (development, design, dst).
  const topicRoutes: MetadataRoute.Sitemap = WRITING_TOPICS.map((t) => ({
    url: `${base}/writing/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const speakingRoutes: MetadataRoute.Sitemap = sessions.map((s) => ({
    url: `${base}/speaking/${s.slug}`,
    lastModified: safeDate(s.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...workRoutes,
    ...writingRoutes,
    ...topicRoutes,
    ...speakingRoutes,
  ];
}
