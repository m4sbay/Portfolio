import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "reading-time-otomatis",
  title: "Reading Time Nggak Perlu Ditulis Manual",
  topic: "Development",
  publishedAt: "2026-05-30",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang reading time otomatis" },
  content: [
    "Estimasi waktu baca itu informasi kecil yang sering di-hardcode. Padahal begitu artikelnya diedit, angkanya langsung bohong dan nggak ada yang inget buat update.",
    "Cara paling aman: hitung dari kontennya langsung. Ambil semua paragraf, hitung jumlah kata, bagi dengan kecepatan baca rata-rata sekitar 200 kata per menit, lalu bulatkan ke atas.",
    "Karena hitungannya jalan di server saat build, nggak ada biaya apa pun di browser. Setiap artikel baru otomatis dapat angkanya sendiri, dan angka itu selalu jujur sama isi tulisannya.",
    "Prinsip yang sama berlaku buat metadata lain: kalau sebuah nilai bisa diturunkan dari data yang udah ada, jangan simpan dua kali. Satu sumber, satu kebenaran.",
  ],
};
