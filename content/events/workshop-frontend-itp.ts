import type { CalendarEvent } from "@/types/event";

export const event: CalendarEvent = {
  slug: "workshop-frontend-itp",
  title: "Workshop Frontend — ITP Padang",
  date: "2026-05-10",
  timeLabel: "09.00 – 12.00 WIB",
  location: "Auditorium Vokasi ITP, Padang",
  excerpt:
    "Berbagi praktik React dan Next.js untuk mahasiswa vokasi, fokus ke struktur proyek dan aksesibilitas dasar.",
  body: [
    "Sesi dimulai dengan gambaran singkat bagaimana industri memakai React di produk nyata, lalu lanjut hands-on membuat halaman sederhana dengan komponen terpisah.",
    "Di bagian akhir kami membahas pola layout responsif dan kenapa semantic HTML tetap relevan di era framework.",
    "Materi disiapkan agar peserta yang baru pertama kali menyentuh JSX tetap bisa mengikuti dengan worksheet langkah demi langkah.",
  ],
  images: [
    {
      src: "/projects/project_vokasi.png",
      alt: "Ilustrasi suasana workshop",
      width: 1200,
      height: 900,
    },
  ],
};
