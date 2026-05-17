import type { CalendarEvent } from "@/types/event";

export const event: CalendarEvent = {
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
};
