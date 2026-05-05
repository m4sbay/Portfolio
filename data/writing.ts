import type { WritingPost } from "@/types/writing";

export const writingPosts: WritingPost[] = [
  {
    slug: "memperbaiki-latensi-openrouter-cloudflare-worker",
    title: "Memperbaiki latensi OpenRouter dengan Cloudflare Worker (region pinning)",
    category: "In Development",
    excerpt:
      "Catatan teknis singkat: ketika Smart Placement Worker jatuh ke region yang tidak kompatibel dengan provider AI, request jadi tidak stabil — dan bagaimana mem-pin region membantu tim.",
    publishedAt: "2026-04-10T08:00:00.000Z",
    readMinutes: 4,
    pinned: true,
    tags: ["ai", "cloudflare", "openrouter", "infra"],
    heroImage: {
      src: "/projects/cover_itailwind.png",
      alt: "Ilustrasi alur request dan worker",
      width: 1200,
      height: 800,
    },
    content: [
      {
        kind: "lead",
        text: "Tulisan ini ringkasan masalah yang pernah kualami: placeholder AI kadang gagal, ternyata bukan karena rate limit semata, melainkan routing region Worker yang tidak selaras dengan kebijakan model.",
      },
      {
        kind: "p",
        text: "Setelah melihat log, pola kegagalan muncul saat Worker diposisikan di region yang tidak didukung penuh oleh jalur ke penyedia tertentu. Model lain tetap jalan — jadi awalnya membingungkan.",
      },
      { kind: "hr" },
      { kind: "h2", text: "Masalah routing" },
      {
        kind: "p",
        text: "Smart Placement membantu latensi global, tapi untuk API yang sensitif terhadap region, perilaku otomatis bisa mengubah jalur tanpa kamu sadari. Di tim kecil, gejala ini terlihat seperti “kadang jalan, kadang tidak”.",
      },
      { kind: "h2", text: "Perbaikan" },
      {
        kind: "p",
        text: "Solusi praktisnya: membatasi atau mem-pin region deployment Worker agar jalur ke OpenRouter dan model upstream konsisten. Setelah itu, rasio error turun drastis.",
      },
      {
        kind: "ul",
        items: [
          "Worker tetap sebagai lapisan API",
          "OpenRouter sebagai router model",
          "Hanya strategi placement yang diubah",
        ],
      },
      { kind: "hr" },
      { kind: "h2", text: "Kesimpulan" },
      {
        kind: "p",
        text: "Infrastruktur yang “pintar” belum tentu cocok untuk semua beban kerja. Untuk produk yang bergantung pada AI upstream, prediktabilitas sering mengalahkan optimasi otomatis sepenuhnya.",
      },
    ],
  },
  {
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
  },
  {
    slug: "desain-tidak-lagi-menyenangkan",
    title: "Desain tidak lagi menyenangkan… atau sebenarnya masih?",
    category: "In Thoughts",
    excerpt:
      "Tentang kecepatan tooling, AI, dan mencari kembali sensasi “craft” tanpa menolak bantuan mesin.",
    publishedAt: "2026-03-05T14:00:00.000Z",
    readMinutes: 3,
    content: [
      {
        kind: "p",
        text: "Kita bisa membangun layar dalam hitungan menit. Copy bisa diusulkan otomatis. Tantangan barunya adalah menjaga rasa bermakna dan konteks manusia di tengah ritme yang begitu cepat.",
      },
    ],
    tags: ["design", "proses"],
  },
  {
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
  },
];

export function getPostBySlug(slug: string) {
  return writingPosts.find((p) => p.slug === slug);
}

/** Urutan tampilan: pinned dulu, lalu terbaru */
export function sortedWritingPosts() {
  return [...writingPosts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getReadNext(currentSlug: string): WritingPost | undefined {
  const sorted = sortedWritingPosts().filter((p) => p.slug !== currentSlug);
  return sorted[0];
}
