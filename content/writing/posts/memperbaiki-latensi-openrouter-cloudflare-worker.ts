import type { WritingPost } from "@/types/writing";

export const post = {
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
    src: "/projects/itailwind/cover_itailwind.png",
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
} satisfies WritingPost;
