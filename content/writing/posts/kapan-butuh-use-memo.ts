import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "kapan-butuh-use-memo",
  title: "Kapan Sebenarnya Kamu Butuh useMemo",
  topic: "Development",
  publishedAt: "2026-05-12",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang useMemo" },
  content: [
    "useMemo sering dipasang refleks, padahal kebanyakan komputasi di render itu murah. Memo yang nggak perlu justru nambah kerjaan React buat ngebandingin dependency.",
    "Patokan sederhananya: pakai kalau komputasinya memang berat, atau hasilnya jadi dependency effect dan identitas referensinya harus stabil.",
    "Selain dua kasus itu, biarin aja dihitung ulang. Kode yang lebih pendek biasanya lebih gampang dirawat daripada optimasi yang nggak kebukti.",
  ],
};
