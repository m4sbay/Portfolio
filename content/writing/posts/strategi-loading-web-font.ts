import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "strategi-loading-web-font",
  title: "Strategi Loading Web Font Tanpa Layout Shift",
  topic: "Development",
  status: "published",
  publishedAt: "2026-06-10",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang loading web font" },
  content: [
    "Font custom itu salah satu penyebab layout shift yang paling sering diabaikan. Teks muncul pakai font fallback, terus lompat pas font aslinya selesai dimuat.",
    "Di Next.js, next/font udah beresin sebagian besar masalah ini: font di-self-host, di-preload, dan fallback-nya disetel otomatis biar metrik hurufnya mendekati font asli.",
    "Sisanya tinggal disiplin: batasi jumlah weight yang dipakai, dan jangan muat font khusus buat satu label kecil doang.",
  ],
};
