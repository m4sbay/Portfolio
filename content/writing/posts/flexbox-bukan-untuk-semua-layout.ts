import type { WritingPost } from "@/types/writing";

export const post = {
  slug: "flexbox-bukan-untuk-semua-layout",
  title: "Flexbox bukan jawaban untuk semua masalah layout",
  category: "In Development",
  excerpt:
    "Refleksi singkat kapan grid lebih masuk akal, kapan flex tetap juara, dan cara memilih tanpa dogma.",
  publishedAt: "2026-03-22T10:00:00.000Z",
  readMinutes: 5,
  heroImage: {
    src: "/projects/cover_project_itailwind_hover.png",
    alt: "Ilustrasi layout dan grid",
    width: 1200,
    height: 800,
  },
  content: [
    {
      kind: "lead",
      text: "Semenjak Flexbox matang di browser, layout jadi jauh lebih cepat dirakit — tapi kebiasaan “flex semua” kadang membuat struktur yang sulit dibaca dan dirawat.",
    },
    {
      kind: "p",
      text: "Grid memberikan kedua sumbu kontrol secara eksplisit; Flexbox unggul untuk distribusi satu dimensi dan alignment kelompok komponen. Campuran keduanya adalah norma sehat.",
    },
  ],
  tags: ["css", "layout", "frontend"],
} satisfies WritingPost;
