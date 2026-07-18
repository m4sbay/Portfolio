import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "jarang-nulis-titik-koma",
  title: "Kenapa Banyak Programmer Sudah Jarang Menulis Tanda Titik Koma?",
  topic: "Development",
  status: "published",
  publishedAt: "2026-05-22",
  // Placeholder: file cover belum ada, ganti manual di /publiccover.png
  image: { src: "cover.png", alt: "Preview artikel tentang titik koma di JavaScript" },
  content: [
    "Waktu pertama kali belajar ngoding, ada satu aturan yang ditanamkan ke aku sejak awal banget. Tiap baris kode harus ditutup pakai titik koma. Aturannya galak, dan kalau sampai lupa satu aja rasanya kayak udah pasti bakal error. Jadi ya aku nurut, tiap baris aku kasih titik koma tanpa pernah nanya kenapa.",
    { type: "heading", text: "Dulu Titik Koma Itu Wajib" },
    "Selama bertahun-tahun aku nganggep titik koma itu harga mati. Kayak titik di akhir kalimat, nggak ada alasan buat ditinggalin. Tiap kali ngetik, jari langsung refleks mencet titik koma sebelum pindah baris. Nggak kepikiran sama sekali kalau ternyata dia bisa dibuang.",
    { type: "heading", text: "Terus Aku Lihat Kode Tanpa Titik Koma" },
    {
      type: "paragraph",
      segments: [
        "Beberapa tahun kemudian aku mulai sering nemu project ",
        { type: "mention", entity: "javascript" },
        " modern yang hampir nggak pernah pakai titik koma sama sekali. Awalnya aku pikir ini cuma soal selera nulis, sampai aku iseng nyari tahu kenapa kodenya tetap jalan mulus tanpa titik koma di mana-mana.",
      ],
    },
    "Ternyata jawabannya ada di mekanisme namanya Automatic Semicolon Insertion, atau biasa disingkat ASI. Singkatnya, di kondisi tertentu JavaScript bakal nambahin titik koma sendiri di belakang layar. Jadi kode yang kelihatannya nggak lengkap itu sebenarnya tetap dibaca lengkap sama mesinnya. Pantesan aja banyak orang santai ninggalin titik koma.",
    { type: "heading", text: "Bukan Berarti Bisa Dibuang Total" },
    "Tapi jangan senang dulu. Aku sempat ngira setelah tahu soal ASI berarti titik koma bisa dibuang total, ternyata nggak sesederhana itu. Ada beberapa kasus di mana ninggalin titik koma malah bikin kode ngelakuin hal yang nggak kamu maksud, dan anehnya sering tanpa error yang jelas.",
    "Contoh paling terkenal itu kata kunci return. Kalau kamu nulis return terus nilainya kamu pindah ke baris bawahnya, ASI bakal buru-buru naruh titik koma tepat setelah return. Hasilnya fungsimu balik nilai kosong, padahal maksudmu jelas bukan gitu. Bug kayak gini bikin pusing karena kelihatannya bener tapi jalannya nggak.",
    "Ada juga kebiasaan lama yang menarik. Sebagian orang sengaja naruh titik koma di awal baris, tepat sebelum kurung buka. Alasannya biar baris itu nggak nyambung nggak sengaja sama baris di atasnya. Jadi titik koma yang katanya udah nggak penting itu ternyata masih dipakai diam-diam sebagai jaring pengaman.",
    { type: "entityCard", entity: "javascript" },
    { type: "heading", text: "Jadi Sekarang Cuma Soal Selera" },
    "Buat aku, ini salah satu hal yang bikin JavaScript lucu sekaligus menarik. Sesuatu yang dulu diajarin sebagai kewajiban mutlak, sekarang lebih banyak jadi kesepakatan tim. Mau pakai atau nggak, sama-sama sah, asal satu tim sepakat dan konsisten.",
    "Lagian sekarang kebanyakan orang juga nggak ngetik titik koma satu-satu secara manual. Ada formatter kayak Prettier yang otomatis ngerapihin semuanya pas file disimpan. Jadi perdebatan pakai titik koma atau nggak sering selesai sebelum dimulai, soalnya toh alatnya yang bakal nyamain gaya semua orang.",
    "Dari sesuatu yang dulu bikin aku takut lupa, titik koma sekarang jadi hal yang jarang aku pikirin lagi. Bukan karena dia nggak penting, tapi karena aku akhirnya ngerti kapan dia beneran ngaruh dan kapan nggak.",
  ],
};
