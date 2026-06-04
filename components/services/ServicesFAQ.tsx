"use client";

import { ChevronRightIcon } from "@/design-system/icons";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Kontennya termasuk tulisannya juga?",
    a: "Tergantung kesepakatan. Kalau kamu sediakan brief atau teks, aku desain. Kalau butuh copywriting juga, bisa dibahas di awal.",
  },
  {
    q: "Satu revisi itu hitungannya gimana?",
    a: "Satu kali kirim feedback = satu revisi. Jadi kalau ada 3 hal yang mau diubah, kirim sekaligus, bukan satu-satu.",
  },
  {
    q: "Kalau bulan ini kontennya tidak terpakai semua, hangus?",
    a: "Ya, kuota per bulan tidak bisa dipindah ke bulan berikutnya. Makanya penting dari awal kita tentukan jadwal konten yang realistis.",
  },
  {
    q: "Priority turnaround itu artinya berapa hari?",
    a: "Paket SeriusBay dapat pengerjaan 1x24 jam per konten. Paket lain estimasi 2x24 jam, tergantung antrian.",
  },
  {
    q: "Strategy consultation call-nya gimana formatnya?",
    a: "Via Google Meet atau Zoom, durasi 30 menit. Bisa dipakai untuk bahas arah konten, evaluasi bulanan, atau planning campaign.",
  },
  {
    q: "Mau upgrade paket di tengah bulan, bisa?",
    a: "Bisa. Selisih harganya dihitung proporsional dari sisa hari di bulan itu.",
  },
  {
    q: "File finalnya dalam format apa?",
    a: "Semua paket dapat file siap posting (JPG/PNG/MP4). Master file Figma, PSD, atau AI hanya tersedia di paket SeriusBay.",
  },
  {
    q: "Brief kontennya dari siapa?",
    a: "Dari kamu. Aku butuh info minimal: tema bulan ini, momen penting, dan produk/program yang mau ditonjolkan. Tanpa brief, pengerjaan tidak bisa mulai.",
  },
];

export function ServicesFAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-title" className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          FAQ
        </p>
        <h2
          id="faq-title"
          className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Pertanyaan umum
        </h2>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10"
        onMouseLeave={() => setActive(null)}
      >
        {FAQ_ITEMS.map((item, i) => {
          const isActive = i === active;

          return (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              className={[
                "border-b border-zinc-200 transition-colors duration-300 last:border-b-0 dark:border-white/10",
                isActive ? "bg-zinc-950 dark:bg-zinc-50" : "bg-white dark:bg-zinc-900",
              ].join(" ")}
            >
              {/* Question row */}
              <button
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
                aria-expanded={isActive}
              >
                <span
                  className={[
                    "shrink-0 font-mono text-[10px] font-semibold tabular-nums transition-colors duration-300",
                    isActive
                      ? "text-zinc-500 dark:text-zinc-500"
                      : "text-zinc-300 dark:text-zinc-700",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p
                  className={[
                    "flex-1 text-sm font-medium leading-snug tracking-tight transition-colors duration-300",
                    isActive
                      ? "text-zinc-50 dark:text-zinc-950"
                      : "text-zinc-700 dark:text-zinc-300",
                  ].join(" ")}
                >
                  {item.q}
                </p>

                <ChevronRightIcon
                  className={[
                    "h-3.5 w-3.5 shrink-0 transition-all duration-300",
                    isActive
                      ? "rotate-90 text-zinc-500 dark:text-zinc-500"
                      : "text-zinc-300 dark:text-zinc-700",
                  ].join(" ")}
                />
              </button>

              {/* Answer — grid-rows trick for smooth height transition */}
              <div
                className={[
                  "grid transition-all duration-500 ease-in-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pt-0 text-sm leading-7 tracking-wide text-zinc-400 dark:text-zinc-500">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
