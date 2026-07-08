import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "mental-model-server-components",
  title: "Mental Model Buat Mahamin Server Components",
  topic: "Development",
  publishedAt: "2026-07-05",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang server components" },
  content: [
    "Cara paling gampang mahamin Server Components: anggap semuanya jalan di server dulu, dan browser cuma dapat hasil jadinya. Interaktivitas baru masuk hitungan pas kamu butuh state atau event handler.",
    "Dari situ, keputusan use client jadi jauh lebih jelas. Bukan soal file mana yang penting, tapi soal bagian mana yang benar-benar butuh hidup di browser.",
    "Semakin kecil client boundary-nya, semakin ringan halamannya. Sisanya biarin server yang kerja.",
  ],
};
