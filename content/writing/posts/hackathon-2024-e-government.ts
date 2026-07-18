import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "hackathon-2024-e-government",
  title: "Hackathon 2024: E-Government — Enhancing Public Access and Efficiency",
  topic: "Event",
  status: "published",
  publishedAt: "2023-12-15",
  // Aset di public/writing/hackathon-2024-e-government/ — cukup nama file, di-resolve data layer.
  image: {
    src: "cover.png",
    alt: "Cover Hackathon 2024 E-Government bersama Tim Ular",
  },
  // Cover tidak diulang di sini; slideshow otomatis jadi cover → image-01 → … → image-04.
  images: [
    {
      src: "image-01.png",
      alt: "Tim Ular mengerjakan platform PIKS selama hackathon",
    },
    {
      src: "image-02.png",
      alt: "Tim Ular",
    },
    {
      src: "image-03.png",
      alt: "Shella mempresentasikan PIKS di hadapan dewan juri",
    },
    {
      src: "image-04.png",
      alt: "Foto bersama Seluruh Peserta dan Panitia di Hackathon 2024",
    },
     {
      src: "image-05.png",
      alt: "Kepulangan Tim Ular di Hackathon 2024",
    },
  ],
  content: [
    {
      type: "paragraph",
      segments: [
        "Akhir 2023 saya mengikuti Hackathon 2024 yang diselenggarakan oleh ",
        { type: "mention", entity: "cybertech-pnp" },
        ", sebuah acara tahunan yang rutin diadakan komunitas tersebut. Ini kali kedua saya ikut hackathon yang mereka gelar, jadi ada rasa familiar sekaligus penasaran untuk melihat sejauh mana saya bisa berkembang dibanding kesempatan sebelumnya.",
      ],
    },
    { type: "heading", text: "Tim Ular" },
    "Kami turun sebagai satu tim beranggotakan lima orang dengan nama Tim Ular. Saya kebagian peran sebagai UI/UX Designer, Yusuf dan Vero mengerjakan sisi backend, Anjib menangani frontend, sementara Shella berperan sebagai system analyst sekaligus presenter yang nantinya membawa solusi kami ke hadapan juri.",
    "Pembagian peran seperti ini membuat setiap orang punya tanggung jawab yang jelas sejak awal. Di kompetisi dengan waktu sesempit ini, kejelasan itu penting supaya kami tidak saling menunggu dan bisa langsung jalan di jalur masing-masing.",
    { type: "heading", text: "Membangun PIKS" },
    "Tema yang diangkat mengarah ke e-government, tentang bagaimana teknologi bisa mendekatkan layanan publik ke masyarakat. Dari situ kami mengembangkan PIKS, sebuah platform pengaduan dan informasi keluhan masyarakat yang ditujukan untuk Pemerintah Kota Padang.",
    "Ide utamanya sederhana: mempermudah masyarakat menyampaikan keluhan sekaligus membuka akses yang lebih baik terhadap layanan publik. Alih-alih keluhan tersebar dan sulit ditindaklanjuti, PIKS mencoba menyatukannya dalam satu alur yang rapi, dari warga menyampaikan, sampai pihak terkait bisa menanggapi.",
    { type: "heading", text: "Berpacu dengan Waktu" },
    "Selama hackathon kami menuntaskan proses perancangan, desain, hingga pengembangan prototype dalam batas waktu yang sudah ditentukan. Ritmenya padat, dan hampir tidak ada bagian yang benar-benar selesai sebelum kami sudah harus lanjut ke bagian berikutnya.",
    "Setelah prototype siap, giliran Shella maju mempresentasikan solusi kami di hadapan dewan juri. Momen ini selalu jadi bagian yang menegangkan, karena seluruh kerja berjam-jam harus bisa tersampaikan hanya dalam beberapa menit di depan panggung.",
    { type: "heading", text: "Yang Kami Bawa Pulang" },
    "Kami memang belum berhasil menjadi pemenang. Tapi dari sisi branding dan konsep, kami merasa solusi yang kami bangun punya identitas yang cukup kuat, dan itu jadi sesuatu yang kami banggakan sendiri.",
    "Pengalaman ini memberi banyak pelajaran soal kolaborasi tim, cara mengembangkan produk dalam waktu terbatas, dan bagaimana menyusun solusi digital yang benar-benar berorientasi pada pelayanan publik. Hasil akhirnya mungkin belum sesuai harapan, tapi prosesnya tetap jadi salah satu pengalaman belajar yang sangat berharga buat kami.",
    { type: "entityCard", entity: "cybertech-pnp" },
  ],
};
