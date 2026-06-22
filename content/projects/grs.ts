import type { Project } from "@/types/project";

export const grs: Project = {
  title: "Geopark Run Series",
  description: "Desain konten sosial media dan arahan kreatif untuk event lari trail Geopark Run Series Ijen.",
  longDescription: "Deskripsi panjang.\n\nBisa multi-paragraf.",
  category: "Design", // "All" | "Design" | "Website" | "Tools" | "Video" | "App"
  tags: ["Figma", "Photoshop", "Affinity Designer"],
  slug: "grs", // harus unik, ini jadi URL: /work/grs
  externalLink: "https://...",     // opsional
  externalLinkLabel: "Lihat live", // opsional
  logo: "/tools/photoshop_logo.png", // opsional
  image: {
    src: "/projects/grs/cover-grs.jpg",
    alt: "Alt text cover",
    width: 2160,
    height: 2700,
  },
  hoverImage: {
    src: "/projects/grs/cover-grs.jpg",
    alt: "Alt text hover",
    width: 2160,
    height: 2700,
  },
  // gallery: [...],   // opsional, gambar di halaman detail
  // caseStudy: {...}, // opsional, case study dengan teks + gallery
};
