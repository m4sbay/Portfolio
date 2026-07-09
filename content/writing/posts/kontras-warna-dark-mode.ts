import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "kontras-warna-dark-mode",
  title: "Kontras Warna di Dark Mode Sering Kebalik",
  topic: "Design",
  status: "published",
  publishedAt: "2026-06-02",
  image: { src: "/writing/kontras_warna_dark.png", alt: "Preview artikel tentang kontras warna dark mode" },
  content: [
    "Dulu aku juga sempat mikir bikin dark mode itu gampang. Tinggal dibalik aja, background putih jadi hitam, teks hitam jadi putih. Ternyata pas dipakai beberapa menit, matanya malah cepat capek. Dari situ aku baru sadar kalau dark mode yang nyaman ternyata nggak sesederhana mengganti warna.",

    "Salah satu hal yang baru aku tahu, banyak aplikasi besar juga jarang memakai hitam dan putih yang benar-benar murni. Permukaannya biasanya dibuat sedikit abu-abu gelap, sementara teksnya juga bukan putih penuh. Perbedaannya memang tipis, tapi mata terasa jauh lebih nyaman kalau dipakai membaca dalam waktu lama.",

    "Sejak itu setiap kali bikin komponen baru, aku langsung membuat versi dark mode-nya di awal. Jadi bukan menunggu semuanya selesai dulu baru diubah ke tema gelap. Selain lebih rapi, hasil akhirnya juga terasa lebih konsisten karena kedua tema berkembang bareng dari awal.",
  ],
};
