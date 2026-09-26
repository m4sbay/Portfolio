import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

// Kelima aset belum tersedia. Dimensi adalah target ekspor, bukan ukuran aktual.
// Verifikasi ekstensi, dimensi, dan alt text setelah aset dipasang; galeri boleh beda rasio.
const cover = {
  src: "/projects/banner-design-graduation-itp-79/coverr.gif",
  alt: "Cover project Banner Design Graduation ITP 79 untuk stand Teknik Informatika",
  width: COVER_MASTER.width,
  height: COVER_MASTER.height,
};

export const project: Project = {
  title: "Banner Design Graduation ITP 79",
  description: "Banner wisuda bergaya esports untuk memeriahkan stand Teknik Informatika.",
  longDescription:
    "**Konsep & Proses Desain**\n\nAku paling suka kalau dapat project dari himpunan, karena bisa sekaligus ikut memeriahkan wisuda kakak tingkat. Pada 2023, aku diminta menangani desain banner untuk backdrop stand prodi Teknik Informatika yang berisi foto-foto wisudawan.\n\nAwalnya aku sempat bingung mau mengambil konsep seperti apa. Kakak tingkat ingin sesuatu yang segar, dan karena banyak dari mereka suka main Mobile Legends, aku berinisiatif membuat desain bergaya esports. Desainnya langsung aku garap menggunakan Photoshop di kantin tercinta, ditemani beberapa teman. Aku sendiri nggak terlalu familiar dengan hero-hero di Mobile Legends, jadi kehadiran mereka ikut membantu selama prosesnya. Kakak tingkat juga sepertinya suka dengan hasilnya.",
  category: "Design",
  status: "published",
  order: 7,
  year: 2023,
  tags: ["Photoshop"],
  logo: "/tools/photoshop_logo.png",
  slug: "banner-design-graduation-itp-79",
  externalLink: "https://www.instagram.com/p/C0f1IFMp8JG/",
  externalLinkLabel: "Tonton Dokumentasi",
  image: cover,
  gallery: [
    cover,
    {
      src: "/projects/banner-design-graduation-itp-79/gallery-01.jpeg",
      alt: "Galeri banner wisuda ITP 79 untuk stand Teknik Informatika — gambar 1",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
  ],
  processSections: [
    {
      title: "Pencetakan & Cerita Hari Wisuda",
      description: "Setelah desain selesai dan siap dicetak, aku langsung pergi ke percetakan yang cukup ternama di Kota Padang supaya sore harinya banner sudah bisa dipasang di stand Informatika. Karena ukurannya besar, aku mengajak seorang teman untuk membawanya kembali ke kampus. Sesampainya di sana, teman-teman panitia wisuda langsung memasangnya.\n\nAku juga ingat, pada 2023 mulai tercetus ide bendera per angkatan. Malam itu kami berkumpul per angkatan untuk membuat logo dan bendera masing-masing, yang kemudian dibawa saat arak-arakan di jalan raya. Dokumentasinya bisa ditonton lewat tautan Instagram di project ini.\n\nMelihat karya sendiri terpajang rasanya seperti keinginan yang jadi kenyataan, wkwk. Semoga stand Informatika ke depannya bisa lebih baik lagi. Sekian cerita dari aku, semoga bermanfaat!",
      gallery: [
        {
          src: "/projects/banner-design-graduation-itp-79/gallery-02.jpeg",
          alt: "Galeri banner wisuda ITP 79 untuk stand Teknik Informatika — gambar 2",
          width: COVER_MASTER.width,
          height: COVER_MASTER.height,
        },
        {
          src: "/projects/banner-design-graduation-itp-79/gallery-03.jpeg",
          alt: "Galeri banner wisuda ITP 79 untuk stand Teknik Informatika — gambar 3",
          width: COVER_MASTER.width,
          height: COVER_MASTER.height,
        },
        {
          src: "/projects/banner-design-graduation-itp-79/gallery-04.jpeg",
          alt: "Galeri banner wisuda ITP 79 untuk stand Teknik Informatika — gambar 4",
          width: COVER_MASTER.width,
          height: COVER_MASTER.height,
        },
      ],
    },
  ],
};
