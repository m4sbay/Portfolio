"use client";

import { ChevronRightIcon } from "@/design-system/icons";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Apakah revisi sudah termasuk dalam harga?",
    a: "Ya, setiap paket sudah mencakup revisi sesuai jumlah yang tertera. Revisi di luar batas tersebut dikenakan biaya tambahan Rp50.000 per konten. Untuk harga satuan, jumlah revisi disepakati saat diskusi brief pertama.",
  },
  {
    q: "Berapa lama estimasi pengerjaan per konten?",
    a: "Feed statis biasanya selesai dalam 1–2 hari kerja. Motion graphic atau reels membutuhkan 3–5 hari kerja. Estimasi final dikonfirmasi setelah brief diterima dan scope disetujui bersama.",
  },
  {
    q: "Format file apa saja yang dikirimkan setelah desain selesai?",
    a: "File dikirim dalam format sesuai kebutuhan platform — PNG/JPG untuk feed statis, MP4 untuk video/reels, PDF untuk materi cetak. Source file (AI/PSD/Figma) bisa disertakan dengan biaya tambahan yang disepakati di awal.",
  },
  {
    q: "Apakah harga bisa disesuaikan untuk kerja sama jangka panjang?",
    a: "Bisa. Untuk kolaborasi rutin atau retainer bulanan, ada penyesuaian harga yang lebih fleksibel. Ceritakan kebutuhan dan frekuensi kontenmu — kita susun paket yang lebih cocok dan efisien bersama.",
  },
  {
    q: "Bagaimana cara mulai dan apa yang perlu disiapkan?",
    a: "Kirim pesan via Instagram atau WhatsApp. Siapkan gambaran umum — jenis konten, deadline, referensi visual, dan informasi brand dasar. Dari situ kita diskusikan scope, timeline, dan harga sebelum pengerjaan dimulai.",
  },
];

export function ServicesFAQ() {
  const [active, setActive] = useState<number | null>(null);

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
