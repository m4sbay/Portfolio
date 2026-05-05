import type { CalendarEvent } from "@/types/event";

/**
 * Kegiatan yang ditampilkan di /event — ganti path gambar / teks sesuai kebutuhan.
 * Gambar di bawah memakai aset yang sudah ada di `public/`; tambahkan file di `public/events/` bila perlu.
 */
export const events: CalendarEvent[] = [
  {
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
  },
  {
    slug: "devmeet-padang-mei",
    title: "DevMeet Padang — Open mic & lightning talk",
    date: "2026-05-15",
    timeLabel: "19.00 – 21.30 WIB",
    location: "Co-working Space Kota Padang",
    excerpt:
      "Pertemuan komunitas developer lokal: cerita proyek, tips tooling, dan ruang diskusi santai.",
    body: [
      "Acara bulanan ini mengumpulkan teman-teman dari berbagai stack — mobile, web, hingga data — dalam format lightning talk lima menit per pembicara.",
      "Setelah sesi resmi, ruang terbuka untuk networking dan pencarian partner kolaborasi kecil-kecilan.",
    ],
    images: [
      {
        src: "/profil.png",
        alt: "Dokumentasi non formal komunitas",
        width: 800,
        height: 800,
      },
      {
        src: "/projects/cover_itailwind.png",
        alt: "Backdrop acara komunitas",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "seminar-ui-politeknik",
    title: "Seminar UI Craft — Politeknik",
    date: "2026-05-20",
    timeLabel: "13.00 – 15.30 WIB",
    location: "Lab Desain Politeknik Negeri Padang",
    excerpt:
      "Membahas hierarki visual, spacing, dan motion ringan untuk produk digital edukasi.",
    body: [
      "Presentasi membuka dengan studi kasus redesign dashboard pembelajaran: dari wireframe hingga hi-fi yang konsisten dengan design token.",
      "Sesi Q&A banyak membahas trade-off antara estetika dan kecepatan implementasi di tim kecil.",
    ],
    images: [
      {
        src: "/projects/ui-kit-1.svg",
        alt: "Contoh board desain",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    slug: "kopi-kode-mei",
    title: "Kopi Kode — Sesi pair programming santai",
    date: "2026-05-20",
    timeLabel: "16.00 – 18.00 WIB",
    location: "Kafe Tengah Kota, Padang",
    excerpt:
      "Sesi kedua di hari yang sama: ngobrol sambil coding bareng topik bebas.",
    body: [
      "Format santai: satu mesin diproyeksikan, rotasi driver setiap 25 menit, observer memberi masukan refaktor.",
      "Topik yang muncul natural: error boundary, pola fetch di Next.js, dan tips review PR yang konstruktif.",
    ],
  },
];

/** Urutan tampilan: tanggal terbaru dulu, lalu urutan waktu pada hari yang sama. */
export function sortedEvents(): CalendarEvent[] {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.timeLabel.localeCompare(b.timeLabel);
  });
}

export function getEventBySlug(slug: string): CalendarEvent | undefined {
  return events.find(e => e.slug === slug);
}
