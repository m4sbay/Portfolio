import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "design-presentation-canva-smkn5-oktober-2023",
  title: "The Art of Canva - Design Presentation With Canva",
  date: "2023-10-05",
  // Placeholder: jam asli menyusul.
  timeLabel: "09.00 – 11.30 WIB",
  location: "SMKN 5 Kota Padang",
  // Copy sementara — akan diganti dengan ringkasan asli.
  excerpt:
    "The Art of Canva (TAC) adalah program kerja Divisi Kominfo HMTI ITP yang mengenalkan dasar-dasar desain presentasi menggunakan Canva. Batch pertama ini menjadi langkah awal kami membantu siswa memahami prinsip desain agar mampu membuat slide yang lebih rapi, nyaman dilihat, dan komunikatif.",

  body: [
    {
      type: "heading",
      content: "Latar Belakang",
    },
    {
      type: "paragraph",
      segments: [
        "The Art of Canva (TAC) merupakan salah satu dari lima program kerja Divisi Kominfo HMTI ITP periode 2023–2024 yang saya ketuai bersama empat anggota lainnya: Rozi, Sulis, Erlan, dan Febro. Program ini lahir dari pengalaman kami sebagai mahasiswa yang menyadari bahwa kemampuan membuat presentasi adalah keterampilan yang akan sering dibutuhkan selama perkuliahan, namun masih banyak siswa yang mengandalkan template tanpa memahami prinsip desain di baliknya.",
      ],
    },
    {
      type: "heading",
      content: "Materi",
    },
    {
      type: "paragraph",
      segments: [
        "Pada batch pertama yang diselenggarakan di SMKN 5 Kota Padang, kami memperkenalkan konsep dasar desain presentasi, mulai dari pentingnya desain grafis dalam kehidupan sehari-hari, tujuan desain, dasar-dasar seperti warna dan tipografi, alasan memilih Canva, hingga berbagai tips praktis seperti mencari elemen dengan lebih efektif, memanfaatkan fitur tersembunyi, memahami potensi Canva untuk berbagai kebutuhan, serta cara menggunakan template dengan tepat tanpa membuat hasil presentasi terasa generik.",
      ],
    },
    {
      type: "heading",
      content: "Program & Materi Lengkap",
    },
    {
      type: "paragraph",
      segments: [
        "TAC dirancang sebagai program bulanan berdurasi sekitar tiga jam dengan target utama siswa SMA dan SMK di Kota Padang. Dalam prosesnya kami mendatangi berbagai sekolah untuk memperkenalkan program ini—meskipun tidak semua pengajuan kerja sama diterima. Seluruh materi yang digunakan pada sesi ini dapat dilihat melalui slide yang resourcenya ada di bagian paling bawah.",
      ],
    },
  ],

  cover: {
    src: "cover.png",
    alt: "Cover The Art Of Canva SMK 5 Kota Padang",
    width: 1200,
    height: 800,
  },
  images: [
    {
      src: "image-01.png",
      alt: "Foto bersama anggota kominfo HMTI ITP di gerabang SMKN5 kota Padang",
    },
    {
      src: "image-02.png",
      alt: "Persiapan workshop canva",
    },
    {
      src: "image-03.png",
      alt: "Persiapan workshop canva",
    },
    {
      src: "image-04.png",
      alt: "Penyampaian materi workshop dan Sesi tanya jawab",
    },
    {
      src: "image-05.png",
      alt: "Penyampaian materi workshop dan Sesi tanya jawab",
    },
    {
      src: "image-06.png",
      alt: "Penyampaian materi workshop dan Sesi tanya jawab",
    },
    {
      src: "image-07.png",
      alt: "Poster The Art of canva SMKN5 Kota Padang",
    },
  ],
  resources: [
    {
      title: "The Art of Canva Slides",
      url: "https://canva.link/gtki00wmxbk2w2k",
      type: "slides",
    },
  ],
};
