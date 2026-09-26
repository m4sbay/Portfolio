import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

export const project: Project = {
  title: "iTailwind",
  description: "Plugin Figma untuk membantu desainer menerapkan utility Tailwind CSS dengan lebih konsisten.",
  longDescription:
    "Aku membuat iTailwind untuk membantu desainer menjaga konsistensi saat bekerja dengan utility Tailwind CSS di Figma. Melalui plugin ini, pengaturan pada layer Figma bisa diterjemahkan menjadi utility class yang lebih mudah dipakai saat desain mulai masuk ke tahap development.\n\nAku juga berusaha menjaga antarmukanya tetap sederhana supaya proses tersebut terasa praktis dan tidak mengganggu alur kerja desain.",
  tags: ["Figma", "Plugin", "Tailwind", "Design System"],
  category: "Tools",
  status: "published",
  order: 3,
  slug: "itailwind",
  logo: "/tools/itailwind.png",
  caseStudyHref: "/work/masbay-portfolio",
  externalLink: "https://www.figma.com/community/plugin/1586682727528531603/itailwind",
  externalLinkLabel: "View Plugin",
  image: {
    src: "/projects/itailwind/itailwind_card.png",
    alt: "Preview Masbay Portfolio (default)",
    width: COVER_MASTER.width,
    height: COVER_MASTER.height,
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
    description: "Project ini berawal dari kesulitan saat menerjemahkan desain Figma ke kode Tailwind CSS. Aku melihat ada jarak antara nilai yang dipakai di layer Figma dan utility class yang akhirnya ditulis oleh developer.\n\nDari situ, aku merancang iTailwind agar utility class bisa dibuat langsung dari layer Figma. Prosesnya mencakup perancangan plugin dari awal, eksplorasi UI/UX untuk panel Figma, dan implementasi engine yang menghasilkan kode Tailwind dengan akurat.",
    gallery: []
  }
};
