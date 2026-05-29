import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon } from "@/design-system/icons";
import { site } from "@/lib/site";

const rateCards = [
  {
    name: "Single Design",
    label: "Konten cepat",
    price: "Rp150K",
    description: "Untuk kebutuhan visual satuan yang sudah punya brief jelas.",
    features: ["1 desain final", "1 ukuran output", "2x revisi minor"],
    accent: {
      bg: "bg-rose-100 dark:bg-rose-500/20",
      text: "text-rose-700 dark:text-rose-300",
      badge: "bg-rose-200 text-rose-700 dark:bg-rose-500/30 dark:text-rose-300",
    },
  },
  {
    name: "Social Kit",
    label: "Paling fleksibel",
    price: "Rp650K",
    description: "Paket visual campaign ringan untuk Instagram, event, atau promosi.",
    features: ["5 desain feed/story", "Turunan ukuran dasar", "Arah visual sederhana"],
    accent: {
      bg: "bg-violet-100 dark:bg-violet-500/20",
      text: "text-violet-700 dark:text-violet-300",
      badge: "bg-violet-200 text-violet-700 dark:bg-violet-500/30 dark:text-violet-300",
    },
  },
  {
    name: "UI Design",
    label: "Produk digital",
    price: "Rp1,5JT",
    description: "Desain interface untuk landing page, dashboard, atau fitur produk.",
    features: ["1 halaman utama", "Komponen responsive", "File siap handoff"],
    accent: {
      bg: "bg-blue-100 dark:bg-blue-500/20",
      text: "text-blue-700 dark:text-blue-300",
      badge: "bg-blue-200 text-blue-700 dark:bg-blue-500/30 dark:text-blue-300",
    },
  },
];

export function DesignRateCards() {
  return (
    <section aria-labelledby="rate-card-title" className="mb-14">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Rate card
          </p>
          <h2
            id="rate-card-title"
            className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Harga desain untuk mulai kerja bareng
          </h2>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Pilih paket awal yang paling dekat dengan kebutuhanmu. Scope final tetap
            bisa disesuaikan setelah brief dibahas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:border-white/20"
          >
            Rate card lengkap
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Konsultasi dulu
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {rateCards.map((card) => (
          <article
            key={card.name}
            className="flex flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900"
          >
            {/* Pastel header strip */}
            <div className={`${card.accent.bg} ${card.accent.text} flex items-center justify-between px-5 py-3`}>
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{card.label}</span>
              <span className="font-mono text-sm font-bold">{card.price}</span>
            </div>

            {/* Card body */}
            <div className="flex flex-1 flex-col gap-4 p-5">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {card.name}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {card.description}
                </p>
              </div>

              <ul className="mt-auto space-y-2.5">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-zinc-50">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
