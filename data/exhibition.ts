import type { Project } from "@/types/project";
import type { ExhibitionChapter } from "@/types/exhibition";
import { exhibitionRoute } from "@/content/work/exhibition";
import { getPublishedProjects } from "@/data/projects";

/** Satu bab siap render: identitas kurasi + project-nya. Numeral tampilan = index + 1. */
export type ChapterViewModel = {
  chapter: ExhibitionChapter;
  project: Project;
  index: number;
};

/**
 * Gabungkan kurasi rute dengan project published — satu-satunya pintu data rute /work.
 * Rute yang tidak sinkron menggagalkan build, jangan diam-diam (pola guard data/projects.ts).
 */
export async function getExhibitionChapters(): Promise<ChapterViewModel[]> {
  const projects = await getPublishedProjects();
  const bySlug = new Map(projects.map(project => [project.slug, project]));

  const seen = new Set<string>();
  for (const chapter of exhibitionRoute.chapters) {
    if (seen.has(chapter.slug)) {
      throw new Error(`content/work/exhibition.ts: slug duplikat "${chapter.slug}" di rute.`);
    }
    seen.add(chapter.slug);
  }

  const chapters = exhibitionRoute.chapters.map((chapter, index) => {
    const project = bySlug.get(chapter.slug);
    if (!project) {
      throw new Error(
        `content/work/exhibition.ts: slug "${chapter.slug}" tidak ditemukan di project published.`,
      );
    }
    return { chapter, project, index };
  });

  // Guardrail #7 Design Spec: setiap karya published wajib dikurasi ke rute — tidak ada "tempel di akhir".
  const missing = projects.filter(project => !seen.has(project.slug));
  if (missing.length > 0) {
    throw new Error(
      `content/work/exhibition.ts: project published tanpa identitas bab: ${missing
        .map(project => project.slug)
        .join(", ")}. Tambahkan ke rute dengan verba & komposisi.`,
    );
  }

  return chapters;
}
