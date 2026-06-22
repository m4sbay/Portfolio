import type { CalendarEvent } from "@/types/event";

export const event: CalendarEvent = {
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
      src: "/profile/profil.png",
      alt: "Dokumentasi non formal komunitas",
      width: 800,
      height: 800,
    },
    {
      src: "/projects/itailwind/cover_itailwind.png",
      alt: "Backdrop acara komunitas",
      width: 1200,
      height: 800,
    },
  ],
};
