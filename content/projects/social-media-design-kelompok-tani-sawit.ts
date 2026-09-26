import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

// Keempat gambar belum tersedia. Dimensi berikut adalah target ekspor, bukan ukuran aktual.
// Periksa kembali ekstensi, dimensi, dan alt text setelah semua aset dipasang.
const cover = {
  src: "/projects/social-media-design-kelompok-tani-sawit/cover.jpeg",
  alt: "Cover project social media design untuk komunitas kelompok tani sawit di Jambi",
  width: COVER_MASTER.width,
  height: COVER_MASTER.height,
};

export const project: Project = {
  title: "Social Media Design Kelompok Tani Sawit",
  description: "Desain feed, carousel, dan story Instagram untuk mendokumentasikan pelatihan kelompok tani sawit di Jambi.",
  longDescription: `**Berawal dari pelatihan di Jambi**

Project ini datang dari sebuah komunitas pengusaha sawit di Jambi. Salah satu anggotanya menghubungiku karena mereka akan mengikuti pelatihan sumber daya manusia yang diselenggarakan oleh PT Daya Guna Lestari (DGL) di Hotel Aston Jambi selama satu minggu penuh.

Mereka ingin seluruh kegiatannya terdokumentasi dengan baik dan akun media sosialnya dikelola dengan lebih rapi. Aku akhirnya diajak sekaligus didaftarkan sebagai peserta pelatihan. Lumayan juga bisa menginap gratis di hotel bintang empat dan mendapat uang saku setiap hari, wkwk. Karena itu, aku cukup excited ketika mulai mengerjakan project ini.

**Membangun tampilan Instagram**

Mereka ingin akun Instagramnya terlihat rapi dan tetap punya unsur yang dekat dengan dunia sawit. Aku memilih warna hijau yang terinspirasi dari daun sawit, lalu menambahkan beberapa ornamen seperti pelepah dan buah sawit supaya identitas visualnya terasa lebih kuat.

Selain mendesain feed dan carousel, aku juga membuat template story agar dokumentasi yang dibagikan terasa lebih konsisten dan nyaman dilihat. Mereka ingin punya video yang memorable, jadi kebutuhan visualnya bukan hanya untuk post statis, tetapi juga untuk mendukung dokumentasi selama acara berlangsung.

Tantangan utamanya adalah menjaga feed tetap rapi meskipun kontennya berasal dari banyak kegiatan selama satu minggu. Untungnya, bagian ini memang salah satu hal yang paling aku suka kerjakan, wkwk. Hasil akhirnya bisa dilihat lewat visual di project ini atau langsung melalui akun Instagram mereka.`,
  category: "Design",
  status: "published",
  order: 9,
  year: 2026,
  tags: ["Social Media", "Instagram Feed", "Carousel", "Photoshop", "Multiple Post"],
  slug: "social-media-design-kelompok-tani-sawit",
  logo: "/tools/photoshop_logo.png",
  externalLink: "https://www.instagram.com/rukuntani.serasah/",
  externalLinkLabel: "Lihat di Instagram",
  image: cover,
  gallery: [
    cover,
    {
      src: "/projects/social-media-design-kelompok-tani-sawit/gallery-01.jpeg",
      alt: "Desain feed Instagram bernuansa hijau untuk dokumentasi pelatihan kelompok tani sawit",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
    {
      src: "/projects/social-media-design-kelompok-tani-sawit/gallery-02.jpeg",
      alt: "Desain carousel Instagram dengan ornamen daun dan buah sawit",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
    {
      src: "/projects/social-media-design-kelompok-tani-sawit/gallery-03.jpeg",
      alt: "Template Instagram Story untuk dokumentasi kegiatan pelatihan di Hotel Aston Jambi",
      width: COVER_MASTER.width,
      height: COVER_MASTER.height,
    },
  ],
};
