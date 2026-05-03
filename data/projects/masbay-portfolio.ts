import type { Project } from "@/types/project";

export const masbayPortfolio: Project = {
  title: "Masbay Portfolio",
  description: "Website portofolio minimal dengan feel ala Macfolio.",
  longDescription:
    "Masbay Portfolio adalah eksperimen membangun portofolio yang clean, cepat, dan fokus ke konten. Tujuannya meniru rasa “minimal Mac/Apple” dengan grid kartu, hover swap image yang halus, dan tipografi tegas.\n\nStack: Next.js App Router, TypeScript, Tailwind CSS, dan animasi ringan untuk membuat interaksi terasa hidup tanpa mengganggu fokus.",
  tags: ["Next.js", "TypeScript", "Tailwind"],
  slug: "masbay-portfolio",
  image: {
    src: "/projects/masbay-portfolio-1.svg",
    alt: "Preview Masbay Portfolio (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/masbay-portfolio-2.svg",
    alt: "Preview Masbay Portfolio (hover)",
    width: 1200,
    height: 900,
  },
};
