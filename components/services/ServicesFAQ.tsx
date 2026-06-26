"use client";

import { ChevronRightIcon } from "@/design-system/icons";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Satu revisi itu hitungannya gimana?",
    a: "Hitungannya per pengiriman feedback, bukan per poin. Jadi kalau ada tiga hal yang mau diubah, gabungkan dulu dalam satu pesan dan tetap dihitung satu revisi.",
  },
  {
    q: "Kalau kuota bulan ini tidak terpakai semua, hangus?",
    a: "Kuotanya memang tidak bisa dibawa ke bulan berikutnya. Di awal kita tentukan jadwal konten yang sesuai keinginan kamu, biar tidak ada yang terbuang.",
  },
  {
    q: "Brief kontennya dari siapa?",
    a: "Brief dari kamu, dan itu yang jadi titik awal segalanya. Aku butuh minimal tiga hal, tema bulan ini (kalau ada), momen penting, dan produk atau program yang mau ditonjolkan. Bisa diskusi dengan Aku.",
  },
  {
    q: "File finalnya dalam format apa?",
    a: "Semua paket sudah termasuk file siap posting dalam format JPG, PNG, atau MP4. Kalau kamu butuh master file-nya seperti Figma, PSD, atau AI itu tersedia di paket SeriusBay.",
  },
  {
    q: "Apa yang dimaksud masa berlaku 30 hari?",
    a: "Waktunya mulai dihitung dari brief pertama yang kamu kirim, bukan dari tanggal pembelian. Semua deliverable harus selesai dalam 30 hari itu. Kalau belum ada brief masuk, waktu belum mulai berjalan.",
  },
  {
    q: "Apa yang terjadi kalau project belum selesai dalam 30 hari?",
    a: "Tergantung penyebabnya. Kalau keterlambatan dari aku, pengerjaan tetap lanjut tanpa biaya tambahan. Kalau dari sisi kamu, brief atau revisi belum masuk, sisa deliverable bisa dikenakan tarif per item.",
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
