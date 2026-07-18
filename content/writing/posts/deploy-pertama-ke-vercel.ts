import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "deploy-pertama-ke-vercel",
  title: "Deploy Pertama ke Vercel",
  topic: "Development",
  status: "published",
  publishedAt: "2026-06-10",
  // Placeholder: file cover belum ada, ganti manual di /publiccover.png
  image: { src: "cover.png", alt: "Preview artikel tentang deploy pertama ke Vercel" },
  content: [
    "Dulu tiap selesai ngoprek website, ada satu momen yang selalu bikin deg-degan. Momen deploy. Aku nggak pernah bener-bener yakin apakah yang jalan mulus di laptop bakal jalan juga pas udah online. Kadang aman, kadang malah blank, dan aku baru sadar ada yang salah setelah semuanya udah terlanjur kepasang.",
    { type: "heading", text: "Waktu Deploy Masih Bikin Deg-degan" },
    "Prosesnya waktu itu penuh langkah manual. Build dulu, upload, ngurusin server, ngecek ini-itu satu per satu. Tiap langkah punya celah buat salah, dan karena banyakan dikerjain manual, rasa khawatirnya jadi wajar. Bukan takut yang berlebihan, cuma emang nggak ada yang ngasih kepastian sampai website beneran kebuka di browser orang lain.",
    "Efeknya, aku jadi males ngubah hal besar. Perubahan kecil aja kadang aku tunda-tunda karena mikirin repotnya nge-deploy. Padahal harusnya bagian itu yang paling gampang.",
    { type: "heading", text: "Titik Baliknya" },
    {
      type: "paragraph",
      segments: [
        "Semuanya berubah pas aku mulai pakai ",
        { type: "mention", entity: "vercel" },
        ". Alurnya sesederhana push ke GitHub, terus tinggal ditinggal. Beberapa saat kemudian website-ku udah ke-update sendiri, tanpa aku perlu ngurusin server atau ngapalin urutan perintah. Pertama kali lihat itu jalan, rasanya kayak curang.",
      ],
    },
    "Yang bikin makin nyambung, ternyata Vercel itu perusahaan yang sama yang bikin Next.js, framework yang aku pakai buat website ini. Pantesan rasanya nyatu banget. Ada fakta kecil yang lucu juga, dulu perusahaan ini namanya Zeit sebelum ganti jadi Vercel di tahun 2020. Nggak penting-penting amat sih, tapi lumayan buat bahan obrolan.",
    { type: "heading", text: "Bagian yang Paling Aku Suka" },
    "Dari semua fiturnya, yang paling nempel di aku itu preview deployment. Jadi sebelum sebuah perubahan resmi jadi versi utama, aku bisa lihat dulu hasilnya lewat link tersendiri. Tiap perubahan dikasih tempat buat ngintip sebelum benar-benar dirilis.",
    "Fitur ini beberapa kali nyelametin aku dari bug kecil yang nggak kelihatan waktu ngoding di lokal. Sesuatu yang aman-aman aja di laptop kadang baru ketahuan salahnya begitu dibuka di lingkungan yang beneran. Karena aku bisa ngecek dulu, bug kayak gitu ketangkep sebelum sampai ke pengunjung.",
    { type: "entityCard", entity: "vercel" },
    { type: "heading", text: "Jadi Lebih Berani" },
    "Efek yang nggak aku sangka, aku jadi lebih berani ngutak-atik. Dulu perubahan besar itu bikin ngeri karena kalau rusak, benerinnya ribet. Sekarang, gara-gara deploy sama rollback-nya gampang, aku nggak sehati-hati itu lagi. Kalau ada yang salah, tinggal balik ke versi sebelumnya dan kelar.",
    "Belakangan aku juga baru sadar banyak website modern yang ternyata nempatin diri di Vercel juga. Jadi rasa nyaman yang aku alami ini kayaknya bukan cuma perasaanku sendiri. Buat sesuatu yang kelihatannya sepele kayak deploy, dampaknya ke cara aku kerja ternyata lumayan gede.",
  ],
};
