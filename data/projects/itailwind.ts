import type { Project } from "@/types/project";

export const itailwind: Project = {
  title: "iTailwind",
  description: "Plugin Figma",
  longDescription:
    " iTailwind adalah eksperimen membangun portofolio yang clean, cepat, dan fokus ke konten. Tujuannya meniru rasa “minimal Mac/Apple” dengan grid kartu, hover swap image yang halus, dan tipografi tegas.\n\nStack: Next.js App Router, TypeScript, Tailwind CSS, dan animasi ringan untuk membuat interaksi terasa hidup tanpa mengganggu fokus.",
  tags: ["Figma", "Plugin", "Tailwind", "Design System", "2025"],
  slug: "itailwind",
  logo: "/projects/cover_itailwind.png",
  caseStudyHref: "/work/masbay-portfolio",
  externalLink: "https://www.figma.com/community/plugin/1586682727528531603/itailwind",
  externalLinkLabel: "View Plugin",
  image: {
    src: "/projects/cover_itailwind.png",
    alt: "Preview Masbay Portfolio (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/cover_project_itailwind_hover.png",
    alt: "Preview Masbay Portfolio (hover)",
    width: 1200,
    height: 900,
  },
  caseStudy: {
    title: "Memecahkan Masalah Penggunaan Tailwind di Figma",
    description: "Berawal dari kesulitan developer dalam mengkonversi desain Figma ke kode Tailwind CSS. Plugin ini dibuat untuk menjembatani gap tersebut dengan memberikan kemudahan auto-generate utility classes langsung dari layer Figma.\n\nDalam case study ini, kita akan melihat bagaimana proses perancangan plugin dari awal, eksplorasi UI/UX untuk panel Figma, hingga implementasi engine pembuat kode Tailwind yang akurat.",
    gallery: [
      {
        src: "/projects/cover_itailwind.png",
        alt: "Case Study 1",
        width: 1200,
        height: 900,
      },
      {
        src: "/projects/cover_project_itailwind_hover.png",
        alt: "Case Study 2",
        width: 1200,
        height: 900,
      }
    ]
  }
};
