import type { Project } from "@/types/project";

export const uiKitExperiments: Project = {
  title: "UI Kit Experiments",
  description: "Kumpulan eksplorasi komponen, layout, dan micro-interactions.",
  longDescription:
    "UI Kit Experiments berisi rangkaian eksplorasi komponen—mulai dari button, card, sampai pattern layout—dengan perhatian ke aksesibilitas dan detail micro-interactions.\n\nProject ini jadi playground untuk ngetes ritme spacing, kontras, states, dan motion yang subtle agar UI terasa premium namun tetap ringan.",
  tags: ["Design System", "Motion", "Accessibility"],
  category: "Design",
  slug: "ui-kit-experiments",
  image: {
    src: "/projects/ui-kit-1.svg",
    alt: "Preview UI Kit (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/ui-kit-2.svg",
    alt: "Preview UI Kit (hover)",
    width: 1200,
    height: 900,
  },
};
