import type { Project } from "@/types/project";

import { autoNotion } from "./projects/auto-notion";
import { itailwind } from "./projects/itailwind";
import { videoVokasi } from "./projects/video_vokasi";

export const projects: Project[] = [
  autoNotion,
  videoVokasi,
  itailwind,
];
