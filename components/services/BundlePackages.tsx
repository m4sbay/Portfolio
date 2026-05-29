import { ArrowUpRightIcon, CheckIcon } from "@/design-system/icons";
import { site } from "@/lib/site";
import type { BundlePackage } from "@/types/rate-card";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

const accents = [
  {
    bg: "bg-violet-100 dark:bg-violet-500/20",
    text: "text-violet-700 dark:text-violet-300",
    badge: "bg-violet-200 text-violet-700 dark:bg-violet-500/30 dark:text-violet-300",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-200 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-300",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-500/20",
    text: "text-amber-700 dark:text-amber-300",
    badge: "bg-amber-200 text-amber-700 dark:bg-amber-500/30 dark:text-amber-300",
  },
];

export function BundlePackages({ packages }: { packages: BundlePackage[] }) {
  return (
    <section aria-labelledby="bundle-title" className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Bundling
        </p>
        <h2 id="bundle-title" className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Paket lengkap
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {packages.map((pkg, i) => {
          const accent = accents[i % accents.length];
          return (
            <article
              key={pkg.name}
              className="flex flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900"
            >
              {/* Colored header strip */}
              <div className={`${accent.bg} ${accent.text} flex items-center justify-between px-5 py-3`}>
                <span className="text-xs font-bold uppercase tracking-[0.16em]">
                  {pkg.name.replace("Paket ", "")}
                </span>
                <span className="font-mono text-sm font-bold">{formatPrice(pkg.price)}</span>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-0.5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{pkg.phase}</p>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {pkg.name}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-zinc-50">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3 pt-2">
                  <div className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <p>{pkg.revisi}</p>
                    {pkg.extras?.map((extra) => (
                      <p key={extra}>{extra}</p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${accent.badge}`}>
                      {pkg.savings}
                    </span>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-zinc-950 px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      Konsultasi
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
