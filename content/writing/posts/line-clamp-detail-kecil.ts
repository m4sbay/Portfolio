import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "line-clamp-detail-kecil",
  title: "Line Clamp: Detail Kecil yang Bikin Card Rapi",
  topic: "Development",
  publishedAt: "2026-06-18",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang line clamp" },
  content: [
    "Judul artikel itu panjangnya nggak pernah bisa ditebak. Ada yang lima kata, ada yang dua baris penuh. Tanpa line clamp, satu judul panjang aja udah cukup buat bikin tinggi card di grid jadi belang.",
    "Solusinya sederhana banget di Tailwind: line-clamp-2 buat judul, line-clamp-3 buat preview. Browser yang motong teksnya, lengkap sama ellipsis, tanpa perlu ngitung karakter manual di JavaScript.",
    "Yang sering kelupaan justru pasangannya: elemen di sekitar teks juga harus siap. Kasih leading yang konsisten, jaga min-width biar teks nggak nabrak ikon, dan tentukan aspect ratio gambar biar layout nggak lompat pas gambar dimuat.",
    "Detail kecil kayak gini yang bedain grid yang kelihatan dirancang sama grid yang cuma kebetulan rapi di satu ukuran layar.",
  ],
};
