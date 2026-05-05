import type { WritingPost } from "@/types/writing";

export const post = {
  slug: "sinkron-skills-antara-agents",
  title: "Cara menyinkronkan skills di berbagai AI coding agents",
  category: "In Tips",
  excerpt:
    "Polaku mengarsipkan skill kecil (prompt, checklist, snippet) agar konsisten dipakai di beberapa environment tanpa menyalin manual terus-menerus.",
  publishedAt: "2026-02-18T09:00:00.000Z",
  readMinutes: 2,
  content: [
    {
      kind: "p",
      text: "Mulai dari satu folder sumber kebenaran (repo privat atau gist), lalu symlink atau skrip ringan untuk menyalin ke lokasi yang dibaca masing-masing agent. Dokumentasikan konvensi penamaan supaya mudah ditemukan.",
    },
  ],
  tags: ["ai", "workflow", "tools"],
} satisfies WritingPost;
