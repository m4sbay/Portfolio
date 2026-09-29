import type { Project, ProjectCategory, ProjectOutput } from "@/types/project";

const categoryOutputs = {
  Design: "Design",
  Website: "Website",
  Tools: "Tool",
  Video: "Video",
  App: "Application",
} as const satisfies Record<ProjectCategory, ProjectOutput>;

export function getProjectOutput(project: Pick<Project, "category" | "output">): ProjectOutput {
  return project.output ?? categoryOutputs[project.category];
}
