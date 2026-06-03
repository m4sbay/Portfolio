"use client";

import { useState } from "react";

interface FaqItemProps {
  q: string;
  a: string;
  glass: string;
  open: boolean;
  onToggle: () => void;
}

export function FaqItem({ q, a, glass, open, onToggle }: FaqItemProps) {
  return (
    <button
      type="button"
      className={`w-full rounded-2xl px-5 py-4 text-left cursor-pointer select-none ${glass}`}
      onClick={onToggle}
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {q}
        </span>
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-300 ease-in-out"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="pt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {a}
          </p>
        </div>
      </div>
    </button>
  );
}

const FAQ_ITEMS = [
  {
    q: "Pembayaran bisa pakai apa saja?",
    a: "QRIS, transfer bank (BCA, Mandiri, BRI, BNI), GoPay, OVO, Dana, dan ShopeePay.",
  },
  {
    q: "Preset dikirim lewat mana?",
    a: "File .xmp/.dng dikirim via chat Tokopedia/Shopee setelah pembayaran. Biasanya 1×24 jam.",
  },
  {
    q: "Compatible Lightroom versi apa?",
    a: "Lightroom Classic, CC desktop, dan Lightroom Mobile (iOS & Android).",
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Bisa. Format .dng sudah disertakan untuk import langsung ke Lightroom Mobile.",
  },
  {
    q: "Berapa foto yang bisa diedit?",
    a: "Tidak ada batasan. Satu kali beli, bisa dipakai seumur hidup di perangkat pribadi.",
  },
  {
    q: "Ada refund kalau tidak cocok?",
    a: "Tidak ada refund untuk file digital. Lihat preview dulu sebelum beli.",
  },
];

interface FaqListProps {
  glass: string;
}

export function FaqList({ glass }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="overflow-y-auto flex flex-col gap-3 pr-1">
      {FAQ_ITEMS.map(({ q, a }, i) => (
        <FaqItem
          key={q}
          q={q}
          a={a}
          glass={glass}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
