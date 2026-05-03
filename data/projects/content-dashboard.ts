import type { Project } from "@/types/project";

export const contentDashboard: Project = {
  title: "Content Dashboard",
  description: "Dashboard sederhana untuk tracking konten dan workflow.",
  longDescription:
    "Content Dashboard adalah dashboard ringkas untuk membantu tracking ide, status produksi, dan jadwal publish. Fokusnya ke informasi yang cepat dibaca, filtering sederhana, dan layout yang responsif.\n\nCocok buat workflow content creator: dari tahap ide, draft, editing, sampai publish—semua kebaca jelas dalam satu tampilan.",
  tags: ["Dashboard", "Data", "Productivity"],
  slug: "content-dashboard",
  image: {
    src: "/projects/content-dashboard-1.svg",
    alt: "Preview Content Dashboard (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/content-dashboard-2.svg",
    alt: "Preview Content Dashboard (hover)",
    width: 1200,
    height: 900,
  },
};
