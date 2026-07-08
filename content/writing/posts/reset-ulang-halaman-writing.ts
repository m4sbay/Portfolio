import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "reset-ulang-halaman-writing",
  title: "Kenapa Aku Reset Ulang Halaman Writing dari Nol",
  topic: "Process",
  publishedAt: "2026-07-01",
  image: { src: "/writing/post1.png", alt: "Preview artikel reset ulang halaman writing" },
  content: [
    "Halaman writing di portfolio ini sempat aku hapus total. Bukan karena rusak, tapi karena strukturnya keburu ribet sebelum arahnya jelas. Daripada nambal terus, aku pilih mulai lagi dari satu halaman kosong.",
    "Keputusan kayak gini kelihatannya mundur, padahal justru ngirit waktu. Setiap komponen yang aku pertahankan waktu itu punya asumsi desain lama yang udah nggak relevan. Kalau dipaksa dipakai, setiap fitur baru harus kompromi sama asumsi itu.",
    "Sekarang fondasinya sederhana: satu tipe data, satu file data, satu halaman. Nambah tulisan cukup nambah satu file konten, tanpa nyentuh komponen sama sekali.",
    "Pelajarannya buat aku: arsitektur yang enak dikembangin itu bukan yang paling lengkap dari awal, tapi yang paling gampang ditambahin belakangan.",
  ],
};
