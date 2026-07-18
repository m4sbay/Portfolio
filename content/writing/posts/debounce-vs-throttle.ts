import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "debounce-vs-throttle",
  title: "Debounce vs Throttle, Kapan Pakai yang Mana",
  topic: "Development",
  status: "draft",
  publishedAt: "2026-06-25",
  image: { src: "cover.png", alt: "Preview artikel tentang debounce dan throttle" },
  content: [
    "Dua-duanya sama-sama ngerem eksekusi fungsi, tapi kelakuannya beda. Debounce nunggu sampai user berhenti, throttle jalan berkala selama user masih aktif.",
    "Search input cocoknya debounce: nggak ada gunanya fetch tiap ketikan. Scroll listener cocoknya throttle: kamu tetap butuh update berkala selama scroll berlangsung.",
    "Salah pilih di antara keduanya nggak bikin error, cuma bikin UI terasa aneh. Dan itu justru lebih susah di-debug.",
  ],
};
