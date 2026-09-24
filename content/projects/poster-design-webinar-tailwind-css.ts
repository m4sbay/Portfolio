import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

// Aset belum tersedia. Dimensi berikut adalah target ekspor, bukan ukuran aktual.
// Periksa kembali ekstensi, dimensi, dan alt text setelah empat gambar dipasang.
const cover = {
  src: "/projects/poster-design-webinar-tailwind-css/cover.jpeg",
  alt: "Cover project desain poster webinar Tailwind CSS untuk Inatechno",
  width: COVER_MASTER.width,
  height: COVER_MASTER.height,
};

export const project: Project = {
  title: "Poster Design Inatechno #1",
  description: "Desain poster webinar Tailwind CSS untuk Inatechno.",
  longDescription:
    "**Tentang Project**\n\nAku mengerjakan desain poster webinar untuk Inatechno, salah satu software house di Kota Padang. Ada yang unik dari project ini: selain mendesain posternya, aku juga menjadi pemateri dalam webinar tersebut.\n\nWaktu pengerjaannya cukup singkat, jadi aku harus menyiapkan desain sekaligus materi yang akan dibawakan. Meski cukup padat, prosesnya tetap terasa menyenangkan karena topik yang dibahas adalah salah satu hal yang aku sukai.\n\n**Konsep & Proses Desain**\n\nWebinar ini membahas Tailwind CSS yang identik dengan warna biru. Identitas visual Inatechno juga menggunakan warna biru, jadi aku menjadikannya warna utama dalam keseluruhan desain poster.\n\nAku mendesain poster ini menggunakan Adobe Photoshop, dengan menyesuaikan tampilannya dengan tema webinar dan identitas Inatechno. Hasil akhir desain sekaligus publikasi webinarnya bisa dilihat melalui tombol “Lihat di Instagram”.",
  category: "Design",
  status: "published",
  order: 6,
  year: 2024,
  tags: ["Photoshop"],
  logo: "/tools/photoshop_logo.png",
  slug: "poster-design-webinar-tailwind-css",
  externalLink: "https://www.instagram.com/p/C-43h37yafW/",
  externalLinkLabel: "Lihat di Instagram",
  visualPreviewClosing:
    "Terima kasih sudah meluangkan waktu untuk melihat project ini. Semoga desain dan cerita di baliknya bisa memberi inspirasi serta bermanfaat buat kamu. Sampai ketemu di project berikutnya!",
  image: cover,
  gallery: [
    cover,
    {
      src: "/projects/poster-design-webinar-tailwind-css/gallery-01.jpeg",
      alt: "Galeri desain poster webinar Tailwind CSS untuk Inatechno — gambar 1",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
    {
      src: "/projects/poster-design-webinar-tailwind-css/gallery-02.jpeg",
      alt: "Galeri desain poster webinar Tailwind CSS untuk Inatechno — gambar 2",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
    {
      src: "/projects/poster-design-webinar-tailwind-css/gallery-03.jpeg",
      alt: "Galeri desain poster webinar Tailwind CSS untuk Inatechno — gambar 3",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
  ],
};
