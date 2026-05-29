import type { PerItemRate } from "@/types/rate-card";

function formatRange(min: number, max: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  return `${fmt(min)} – ${fmt(max)}`;
}

const pastelAccents = [
  {
    bar: "bg-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    title: "text-rose-700 dark:text-rose-300",
    desc: "text-rose-500 dark:text-rose-400",
    badge: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
  },
  {
    bar: "bg-pink-400",
    bg: "bg-pink-50 dark:bg-pink-500/10",
    title: "text-pink-700 dark:text-pink-300",
    desc: "text-pink-500 dark:text-pink-400",
    badge: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
  },
  {
    bar: "bg-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    title: "text-violet-700 dark:text-violet-300",
    desc: "text-violet-500 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  },
  {
    bar: "bg-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    title: "text-blue-700 dark:text-blue-300",
    desc: "text-blue-500 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  },
  {
    bar: "bg-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    title: "text-emerald-700 dark:text-emerald-300",
    desc: "text-emerald-500 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  {
    bar: "bg-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    title: "text-amber-700 dark:text-amber-300",
    desc: "text-amber-500 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  },
];

export function PerItemRates({ rates }: { rates: PerItemRate[] }) {
  return (
    <section aria-labelledby="per-item-title" className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Per Konten
        </p>
        <h2 id="per-item-title" className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Harga satuan
        </h2>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {rates.map((rate, i) => {
          const accent = pastelAccents[i % pastelAccents.length];
          return (
            <li
              key={rate.name}
              className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 dark:border-white/15 dark:bg-zinc-900"
            >
              {/* Card header */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                  Per konten
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                  Desain
                </p>
              </div>

              {/* Dashed divider */}
              <div className="mb-3 border-t border-dashed border-zinc-200 dark:border-white/10" />

              {/* Content block with left bar */}
              <div className={`flex gap-3 rounded-xl p-3 ${accent.bg}`}>
                <div className={`w-1 shrink-0 self-stretch rounded-full ${accent.bar}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${accent.title}`}>
                      {rate.name}
                    </p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${accent.badge}`}>
                      {formatRange(rate.priceMin, rate.priceMax)}
                    </span>
                  </div>
                  <p className={`mt-0.5 text-xs leading-5 ${accent.desc}`}>
                    {rate.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
