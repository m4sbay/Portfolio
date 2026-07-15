import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "crafting-website-figma-tailwind-inatechno-2024",
  title: "Crafting Website from Figma Design with Tailwind CSS",
  date: "2024-08-24",
  timeLabel: "08.30 WIB – Selesai",
  location: "Warung King, Kota Padang",
  excerpt:
    "Giliran saya jadi pemateri workshop di Inatechno akhirnya tiba, dan saya nekat membawa Tailwind CSS ke ruangan yang mayoritas masih setia dengan Bootstrap. Sesi ditutup dengan praktik menyulap satu desain Figma jadi landing page portfolio.",

  body: [
    {
      type: "heading",
      content: "Semua Kebagian Giliran",
    },
    {
      type: "paragraph",
      segments: [
        "Waktu magang di Inatechno Training Center, ada satu aturan yang berlaku buat semua peserta: minimal sekali, kamu harus berdiri di depan sebagai pemateri workshop. Jadwalnya digilir setiap minggu, jadi tidak ada yang bisa kabur dari giliran. Selain jadi pemateri, kami juga bergantian mengisi berbagai divisi, mulai dari tim produksi, media sosial, sampai marketing, supaya semua orang tahu rasanya bekerja di posisi yang berbeda-beda.",
      ],
    },
    {
      type: "heading",
      content: "Kenapa Tailwind, Bukan yang Lain",
    },
    {
      type: "paragraph",
      segments: [
        "Pas giliran saya tiba, saya memilih membawakan materi ",
        { type: "mention", entity: "tailwindcss" },
        ". Alasannya sebenarnya sederhana. Waktu itu saya sendiri sedang serius belajar framework ini, dan rasanya sayang kalau ilmu yang baru saja nyangkut di kepala tidak langsung dibagikan. Selain itu, kebanyakan teman-teman masih lebih akrab dengan Bootstrap, jadi saya ingin memperkenalkan alternatif yang menurut saya lebih fleksibel untuk membangun antarmuka website.",
      ],
    },
    {
      type: "heading",
      content: "Dua Sesi, Satu Landing Page",
    },
    {
      type: "paragraph",
      segments: [
        "Materinya saya bagi jadi dua bagian. Sesi pertama berisi pengenalan Tailwind CSS: konsep utility-first dan bagaimana alur kerjanya sehari-hari. Setelah itu langsung lanjut ke praktik, di mana peserta membuat sebuah landing page portfolio sederhana berdasarkan desain dari Figma menggunakan Tailwind. Di tengah sesi tentu ada beberapa kendala teknis, tapi jujur saja itu sudah seperti bumbu wajib di setiap workshop. Untungnya semuanya masih bisa diatasi tanpa mengganggu jalannya acara sampai selesai.",
      ],
    },
    {
      type: "heading",
      content: "Yang Saya Harapkan",
    },
    {
      type: "paragraph",
      segments: [
        "Lebih dari sekadar mengenal Tailwind CSS, saya berharap teman-teman jadi sedikit lebih berani. Berani mencoba framework baru, dan berani menerapkannya di proyek mereka sendiri tanpa harus menunggu merasa cukup jago dulu. Kalau setelah workshop itu ada satu dua orang yang penasaran lalu iseng ngoprek Tailwind di rumah, buat saya itu sudah lebih dari cukup.",
      ],
    },
  ],
  cover: {
    src: "cover.png",
    alt: "Sesi workshop Tailwind CSS bersama peserta magang Inatechno di Warung King, Kota Padang",
    width: 1200,
    height: 800,
  },
  images: [
    {
      src: "image-01.png",
      alt: "Saya membawakan sesi pengenalan Tailwind CSS di depan peserta workshop",
    },
    {
      src: "image-02.png",
      alt: "Peserta menyimak penjelasan konsep utility-first dan alur kerja Tailwind CSS",
    },
    {
      src: "image-03.png",
      alt: "Sesi praktik peserta membangun landing page portfolio dari desain Figma",
    },
     {
      src: "image-04.png",
      alt: "Peserta menyimak penjelasan konsep utility-first dan alur kerja Tailwind CSS",
    },
    {
      src: "image-05.png",
      alt: "Sesi praktik peserta membangun landing page portfolio dari desain Figma",
    },
  ],
  resources: [
    {
      title: "Video Dokumentasi",
      url: "https://www.instagram.com/p/C_azrBgyKYn/",
      type: "video",
    },
  ],
};
