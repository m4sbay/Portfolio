// content/projects/nama-video.ts
import type { Project } from "@/types/project";

export const project: Project = {
  title: "Video Profile Fakultas Vokasi ITP",
  description: "Video profil untuk memperkenalkan Fakultas Vokasi ITP secara ringkas, informatif, dan visual.",
  longDescription:
    "Project ini dibuat untuk memperkenalkan Fakultas Vokasi ITP kepada calon mahasiswa dan audiens umum melalui video profil yang lebih engaging. Fokus utamanya adalah menampilkan identitas fakultas, suasana pembelajaran, fasilitas, dan aktivitas akademik dalam format visual yang mudah dipahami.\n\nDalam proses editing, saya menyusun ritme video agar informasi formal tetap terasa menarik. Alur visual dibuat dari pengenalan fakultas, highlight aktivitas, hingga penutup yang memperkuat citra profesional Institut Teknologi Padang.",
  category: "Video",
  status: "published",
  order: 2,
  logo: "/projects/video-vokasi/icon_yt.svg",
  tags: ["Video Editing", "Motion", "Capcut"],
  slug: "video_vokasi",
  externalLink: "https://www.instagram.com/p/DUDJRCfkjFo/",
  externalLinkLabel: "Lihat video",
  brandLinks: [
    { label: "Fakultas Vokasi ITP", href: "https://itp.ac.id/fakultas-vokasi" },
    { label: "Institut Teknologi Padang", href: "https://itp.ac.id/" },
    { label: "ITP", href: "https://itp.ac.id/" },
  ],
  image: {
    src: "/projects/video-vokasi/project_vokasi.png",
    alt: "Preview nama video (default)",
    width: 1200,
    height: 900,
  },
  hoverImage: {
    src: "/projects/video-vokasi/visual-preview-vokasi-2.svg",
    alt: "Visual preview kedua video profil Fakultas Vokasi ITP",
    width: 1500,
    height: 1200,
  },
};
