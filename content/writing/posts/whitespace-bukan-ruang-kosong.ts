import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "whitespace-bukan-ruang-kosong",
  title: "Whitespace Itu Bukan Ruang yang Kebuang",
  topic: "Design",
  publishedAt: "2026-06-28",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang whitespace" },
  content: [
    "Godaan terbesar waktu nyusun layout: ngisi semua ruang yang ada. Padahal ruang kosong itu yang bikin mata tahu harus lihat ke mana duluan.",
    "Spacing yang konsisten juga nyampein hierarki tanpa perlu garis atau border tambahan. Elemen yang berdekatan kebaca sebagai satu kelompok, yang berjauhan kebaca terpisah.",
    "Kalau sebuah desain terasa sesak, biasanya masalahnya bukan kurang dekorasi — tapi kurang napas.",
  ],
};
