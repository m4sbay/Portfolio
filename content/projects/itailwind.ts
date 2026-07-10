import type { Project } from "@/types/project";

export const project: Project = {
  title: "iTailwind",
  description: "Plugin Figma",
  longDescription:
    "iTailwind adalah plugin Figma yang memudahkan para desainer untuk membuat desain yang konsisten dan mudah dikonversi ke kode Tailwind CSS. Plugin ini dirancang dengan antarmuka yang intuitif dan mudah digunakan.",
  tags: ["Figma", "Plugin", "Tailwind", "Design System"],
  category: "Tools",
  status: "published",
  order: 3,
  slug: "itailwind",
  logo: "/projects/itailwind/itailwind_icon.PNG",
  caseStudyHref: "/work/masbay-portfolio",
  externalLink: "https://www.figma.com/community/plugin/1586682727528531603/itailwind",
  externalLinkLabel: "View Plugin",
  image: {
    src: "/projects/itailwind/cover_itailwind.png",
    alt: "Preview Masbay Portfolio (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/itailwind/cover_project_itailwind_hover.png",
    alt: "Preview Masbay Portfolio (hover)",
    width: 1200,
    height: 900,
  },
  gallery: [
    {
      src: "/projects/itailwind/cover_itailwind.png",
      alt: "Preview plugin iTailwind",
      width: 1200,
      height: 900,
    },
    {
      src: "/projects/itailwind/cover_project_itailwind_hover.png",
      alt: "Preview hover plugin iTailwind",
      width: 1200,
      height: 900,
    },
    {
      src: "/projects/itailwind/plugin-figma-3.svg",
      alt: "Preview plugin Figma iTailwind 3",
      width: 1500,
      height: 1200,
    },
    {
      src: "/projects/itailwind/plugin-figma-4.svg",
      alt: "Preview plugin Figma iTailwind 4",
      width: 1500,
      height: 1200,
    },
  ],
  caseStudy: {
    title: "Memecahkan Masalah Penggunaan Tailwind di Figma",
    description: "Berawal dari kesulitan developer dalam mengkonversi desain Figma ke kode Tailwind CSS. Plugin ini dibuat untuk menjembatani gap tersebut dengan memberikan kemudahan auto-generate utility classes langsung dari layer Figma.\n\nDalam case study ini, kita akan melihat bagaimana proses perancangan plugin dari awal, eksplorasi UI/UX untuk panel Figma, hingga implementasi engine pembuat kode Tailwind yang akurat.",
    gallery: []
  }
};
