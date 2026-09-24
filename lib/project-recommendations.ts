import { createHash } from "node:crypto";
import type { Project } from "@/types/project";

/** Urutan stabil per slug; input berasal dari pool project published. */
export function getRecommendedProjects(
  currentProject: Pick<Project, "slug">,
  allProjects: readonly Project[],
  limit = 4,
): Project[] {
  const count = Number.isNaN(limit) ? 0 : Math.max(0, Math.min(4, Math.floor(limit)));
  if (count === 0) return [];

  const candidates = new Map<string, Project>();
  for (const project of allProjects) {
    if (project.slug !== currentProject.slug && !candidates.has(project.slug)) {
      candidates.set(project.slug, project);
    }
  }

  return [...candidates.values()]
    .map(project => ({
      project,
      score: createHash("sha256")
        .update(JSON.stringify([currentProject.slug, project.slug]))
        .digest("hex"),
    }))
    .sort((a, b) => {
      // Tie-break slug memakai perbandingan literal agar tidak bergantung locale.
      if (a.score !== b.score) return a.score < b.score ? -1 : 1;
      return a.project.slug < b.project.slug ? -1 : a.project.slug > b.project.slug ? 1 : 0;
    })
    .slice(0, count)
    .map(({ project }) => project);
}
