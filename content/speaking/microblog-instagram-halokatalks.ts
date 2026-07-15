import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "microblog-instagram-halokatalks",
  title: "Microblog di Instagram: Masih Laku Nggak Sih",
  // Placeholder: kegiatan asli tahun 2022. Tanggal pasti belum ada — dipakai
  // pertengahan tahun agar sorting (terbaru dulu) tetap berjalan. Ganti nanti.
  date: "2022-08-09",
  // Placeholder: jam asli menyusul.
  timeLabel: "20.00 – 20.30 WIB",
  // Placeholder: lokasi asli menyusul (sesi berbasis komunitas Halokatalks).
  location: "Discord & Instagram Live",
  // Copy sementara — akan diganti dengan ringkasan asli.
  excerpt: "Berawal dari kebiasaan rutin membagikan microblog di Instagram, saya mendapat undangan dari HalokaTalks untuk berbagi pengalaman mengenai bagaimana menyusun carousel yang informatif dan tetap nyaman dibaca.",

  body: [
    {
      type: "heading",
      content: "Awal Ceritanya",
    },
    {
      type: "paragraph",
      segments: [
        "Semua ini berawal ketika saya sedang cukup rutin membuat konten microblog di akun Instagram ",
        { type: "mention", entity: "instagram" },
        ". Saat itu saya tidak pernah menyangka kalau konten-konten sederhana yang saya bagikan ternyata diperhatikan orang lain. Hingga suatu siang saya menerima direct message dari Kak Dede Wardani, Community Associate HalokaTalks, yang mengajak saya berkolaborasi sebagai pembicara dalam program #TMITuesday untuk membahas microblog di Instagram.",
      ],
    },
    {
      type: "heading",
      content: "Undangan yang Tidak Terduga",
    },
    {
      type: "paragraph",
      segments: [
        "Jujur saja, kalau sekarang saya membaca kembali balasan DM saya waktu itu, rasanya malu sendiri. Cara membalasnya terasa sangat singkat dan kaku. Mungkin karena saat itu saya belum terbiasa berkomunikasi secara profesional, apalagi menerima undangan sebagai pembicara. Untungnya tim HalokaTalks tetap menyambut saya dengan hangat dan proses persiapannya berjalan dengan lancar.",
      ],
    },
    {
      type: "heading",
      content: "Hari Presentasi",
    },
    {
      type: "paragraph",
      segments: [
        "Hari presentasi pun tiba. Saya mengikuti sesi secara daring melalui Discord dari rumah dengan koneksi internet yang kurang bersahabat. Laptop yang saya gunakan saat itu juga masih jauh dari kata ideal, sehingga saya memutuskan untuk tidak menyalakan kamera selama sesi berlangsung. Meski begitu, syukurlah presentasi tetap berjalan lancar dan diskusi bersama peserta terasa menyenangkan.",
      ],
    },
    {
      type: "heading",
      content: "Refleksi",
    },
    {
      type: "paragraph",
      segments: [
        "Melihat ke belakang, pengalaman ini menjadi salah satu momen yang selalu saya ingat. Bukan karena presentasinya terasa sempurna, tetapi karena untuk pertama kalinya saya dipercaya membagikan sesuatu yang saya pelajari kepada orang lain. Terima kasih kepada seluruh tim HalokaTalks atas kesempatan tersebut. Saya berharap apa yang saya bagikan saat itu benar-benar bisa memberikan manfaat bagi para peserta.",
      ],
    },
  ],
  cover: {
    src: "cover.png",
    alt: "Gambar Haloka Card",
    width: 1200,
    height: 800,
  },
  images: [],
};
