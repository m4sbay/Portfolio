import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "design-presentation-canva-smkn6-november-2023",
  title: "Design Presentation With Canva",
  date: "2023-11-24",
  // Placeholder: jam asli menyusul.
  timeLabel: "13.00 – 15.30 WIB",
  location: "SMKN 6 Kota Padang",
  // Copy sementara — sesi lanjutan, sengaja dibedakan dari batch sebelumnya.
  excerpt: "Sesi lanjutan bareng SMKN 5 Kota Padang: memperdalam pembuatan presentasi di Canva dengan fokus pada storytelling slide dan penggunaan elemen visual yang tepat guna.",
  body: [
    "Melanjutkan batch sebelumnya, pertemuan ini menekankan alur cerita: bagaimana menyusun urutan slide agar audiens mengikuti argumen dari pembuka hingga simpulan.",
    "Peserta berlatih memilih chart, ikon, dan foto yang mendukung pesan — bukan sekadar mengisi ruang. (Isi ini sementara dan akan diperbarui.)",
  ],
  cover: {
    src: "cover.png",
    alt: "Cover The Art Of Canva SMK 6 Kota Padang",
    width: 1200,
    height: 800,
  },
  images: [
    {
      src: "image-01.png",
      alt: "Bayu menyampaikan materi kepada peserta",
    },
    {
      src: "image-02.png",
      alt: "Peserta mengikuti sesi workshop",
    },
    {
      src: "image-03.png",
      alt: "Contoh microblog yang sedang dibahas",
    },
    {
      src: "image-04.png",
      alt: "Sesi tanya jawab",
    },
  ],
};
