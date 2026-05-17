import type { CalendarEvent } from "@/types/event";

export const event: CalendarEvent = {
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
};
