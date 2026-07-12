import type { Project } from "@/types/project";
import { featuredContent } from "@/content/work/featured";
import { getPublishedProjects } from "@/data/projects";

/** Hasil resolve kurasi: hero + kartu featured, semua sudah dijamin published. */
export type FeaturedWork = {
  header: typeof featuredContent.header;
  hero: Project;
  featured: Project[];
  cta: typeof featuredContent.cta;
};

/**
 * Resolve kurasi featured jadi project published — satu-satunya pintu data sorotan /work.
 * Fail-loud (pola guard data/projects.ts): slug yang tak ditemukan/tak published, duplikat,
 * atau hero yang juga ada di featured menggagalkan build — jangan diam-diam.
 * CATATAN: TIDAK ada guardrail "semua published wajib dikurasi" — grid menampung semua,
 * featured hanyalah subset.
 */
export async function getFeaturedWork(): Promise<FeaturedWork> {
  const projects = await getPublishedProjects();
  const bySlug = new Map(projects.map(project => [project.slug, project]));

  const resolve = (slug: string, role: string): Project => {
    const project = bySlug.get(slug);
    if (!project) {
      throw new Error(
        `content/work/featured.ts: ${role} slug "${slug}" tidak ditemukan di project published.`,
      );
    }
    return project;
  };

  const hero = resolve(featuredContent.heroSlug, "hero");

  const seen = new Set<string>([hero.slug]);
  const featured = featuredContent.featuredSlugs.map(slug => {
    if (seen.has(slug)) {
      throw new Error(
        `content/work/featured.ts: slug "${slug}" duplikat (atau sama dengan hero) di kurasi featured.`,
      );
    }
    seen.add(slug);
    return resolve(slug, "featured");
  });

  return {
    header: featuredContent.header,
    hero,
    featured,
    cta: featuredContent.cta,
  };
}
