// content/projects/nama-video.ts
import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

export const project: Project = {
  title: "Video Profile Fakultas Vokasi ITP",
  description: "Video profil untuk memperkenalkan Fakultas Vokasi ITP secara ringkas, informatif, dan visual.",
  longDescription:
    "Aku membuat project ini untuk memperkenalkan Fakultas Vokasi ITP kepada calon mahasiswa dan audiens umum lewat video profil yang lebih menarik. Di dalamnya, aku menampilkan identitas fakultas, suasana pembelajaran, fasilitas, dan aktivitas akademik dalam format visual yang mudah dipahami.\n\nSaat proses editing, aku menyusun ritme videonya supaya informasi yang cukup formal tetap terasa enak diikuti. Alurnya bergerak dari pengenalan fakultas, berlanjut ke berbagai aktivitas, lalu ditutup dengan visual yang memperkuat citra profesional Institut Teknologi Padang.",
  category: "Video",
  status: "published",
  order: 2,
  logo: "/tools/youtube.svg",
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
    src: "/projects/video-vokasi/project_vokasi_card.png",
    alt: "Preview nama video (default)",
    width: COVER_MASTER.width,
    height: COVER_MASTER.height,
  },
  hoverImage: {
    src: "/projects/video-vokasi/visual-preview-vokasi-2.svg",
    alt: "Visual preview kedua video profil Fakultas Vokasi ITP",
    width: 1500,
    height: 1200,
  },
};
