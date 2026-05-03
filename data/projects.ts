import type { Project } from "@/types/project";

import { itailwind } from "./projects/itailwind";
import { uiKitExperiments } from "./projects/ui-kit-experiments";
import { contentDashboard } from "./projects/content-dashboard";
import { masbayPortfolio } from "./projects/masbay-portfolio";

export const projects: Project[] = [
  itailwind,
  uiKitExperiments,
  contentDashboard,
  masbayPortfolio,
];
