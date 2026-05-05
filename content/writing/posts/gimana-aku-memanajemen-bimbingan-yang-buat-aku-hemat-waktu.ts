import type { WritingPost } from "@/types/writing";

export const post = {
  slug: "gimana-aku-memanajemen-bimbingan-yang-buat-aku-hemat-waktu",
  title: "Gimana aku memanajemen bimbingan yang buat aku hemat waktu",
  category: "Skripsi",
  excerpt:
    "Ringkasannya: siapkan agenda sebelum bertemu dosen, kumpulkan pertanyaan spesifik, dan hindari revisi besar karena “baru kepikiran” setelah sesi bubar.",
  publishedAt: "2026-05-06T03:00:00.000Z",
  readMinutes: 4,
  tags: ["skripsi", "kuliah", "produktivitas"],
  content: [
    {
      kind: "lead",
      text: "Bimbingan itu mahal secara waktu kalau tiap ketemu masih ngobrol dari nol. Aku coba bikin ritual kecil supaya satu sesi punya arah jelas dan lanjutannya gampang dilacak.",
    },
    {
      kind: "p",
      text: "Sebelum janjian, aku tulis tiga hal: apa yang sudah jadi, apa yang mau dikonfirmasi, dan satu keputusan yang perlu arahan dosen. Kalau tidak ada keputusan, minimal ada daftar revisi kecil yang bisa ditandai selesai.",
    },
    { kind: "h2", text: "Setelah sesi" },
    {
      kind: "p",
      text: "Langsung rangkum di catatan singkat: keputusan apa yang diambil, tugas siapa sampai kapan, dan apa yang akan dibawa ke pertemuan berikutnya. Itu yang bikin hemat waktu — bukan karena ketemu lebih jarang, tapi karena tiap ketemu tidak mengulang konteks.",
    },
  ],
} satisfies WritingPost;
