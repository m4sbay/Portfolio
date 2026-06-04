import { ArrowUpRightIcon, CheckIcon } from "@/design-system/icons";
import { site } from "@/lib/site";
import type { BundlePackage } from "@/types/rate-card";

/** Format harga dalam jutaan — "Rp 1,2 jt" / "Rp 4 jt" */
function formatPrice(price: number): string {
  const juta = price / 1_000_000;
  const formatted =
    juta % 1 === 0
      ? juta.toLocaleString("id-ID", { maximumFractionDigits: 0 })
      : juta.toLocaleString("id-ID", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
  return `Rp ${formatted} jt`;
}

/** Generate WhatsApp link dengan pre-filled pesan per paket */
function waLink(packageName: string): string {
  const text = `Halo Masbay! Saya tertarik dengan paket ${packageName}. Bisa info lebih lanjut?`;
  return `${site.social.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** X icon for excluded features */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
    >
      <path d="M2 2l8 8M10 2l-8 8" />
    </svg>
  );
}

function PricingCard({ pkg }: { pkg: BundlePackage }) {
  const isFeatured = pkg.featured === true;

  return (
    <article
      className={[
        "relative flex flex-col overflow-hidden rounded-2xl p-6",
        isFeatured
          ? "bg-zinc-100 ring-1 ring-teal-500/40 dark:bg-zinc-800/80 dark:ring-teal-500/50"
          : "bg-zinc-50 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-white/5",
      ].join(" ")}
    >
      {/* ── Spotlight glow (featured only) ── */}
      {isFeatured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,212,191,0.2) 0%, transparent 100%)",
          }}
        />
      )}

      {/* ── Tier name ── */}
      <p className="mb-1 text-[13px] font-semibold tracking-wide text-zinc-700 dark:text-zinc-200">
        {pkg.name}
      </p>

      {/* ── Anchor price (strikethrough) ── */}
      {pkg.anchorPrice ? (
        <p className="mb-0.5 text-xs text-zinc-400 line-through dark:text-zinc-500">
          {pkg.anchorPrice}
        </p>
      ) : (
        <div className="mb-0.5 h-4" />
      )}

      {/* ── Main price ── */}
      <div className="mb-0.5 flex items-baseline gap-1.5">
        <span
          className={[
            "text-[32px] font-bold leading-none tracking-tight",
            isFeatured
              ? "text-teal-600 dark:text-teal-300"
              : "text-zinc-900 dark:text-zinc-50",
          ].join(" ")}
        >
          {formatPrice(pkg.price)}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">/ bulan</span>
      </div>

      {/* ── Price per unit ── */}
      {pkg.pricePerUnit ? (
        <p
          className={[
            "mb-6 text-[12px] font-medium",
            isFeatured
              ? "text-teal-600 dark:text-teal-400"
              : "text-zinc-400 dark:text-zinc-500",
          ].join(" ")}
        >
          {pkg.pricePerUnit}
        </p>
      ) : (
        <div className="mb-6" />
      )}

      {/* ── CTA buttons ── */}
      <div className="mb-6 space-y-2">
        {/* Primary — WhatsApp */}
        <a
          href={waLink(pkg.name)}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition duration-200 hover:opacity-90 active:scale-[.98]",
            isFeatured
              ? "bg-teal-500 text-white dark:bg-teal-400 dark:text-zinc-950"
              : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600",
          ].join(" ")}
        >
          {/* WhatsApp icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Chat WhatsApp
        </a>
        {/* Secondary — Portfolio */}
        <a
          href="/work"
          className={[
            "flex w-full items-center justify-center gap-1 rounded-xl px-4 py-2 text-[12px] font-medium transition duration-200",
            isFeatured
              ? "text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
          ].join(" ")}
        >
          Lihat Portofolio
          <ArrowUpRightIcon className="h-3 w-3" />
        </a>
      </div>

      {/* ── Divider ── */}
      <div
        className={[
          "mb-5 h-px",
          isFeatured
            ? "bg-teal-500/20 dark:bg-teal-500/20"
            : "bg-zinc-200 dark:bg-zinc-800",
        ].join(" ")}
      />

      {/* ── Feature list — included ── */}
      <ul className="space-y-3">
        {pkg.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={[
                "mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md",
                isFeatured
                  ? "bg-teal-500/20 text-teal-600 dark:text-teal-400"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
              ].join(" ")}
            >
              <CheckIcon className="h-2 w-2" />
            </span>
            <span className="text-[12px] leading-[1.5] text-zinc-600 dark:text-zinc-300">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Exclusive features (Active only) ── */}
      {pkg.itemsExclusive && pkg.itemsExclusive.length > 0 && (
        <div className="mt-4 space-y-3">
          <ul className="space-y-3">
            {pkg.itemsExclusive.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-teal-500/25 text-teal-600 dark:text-teal-400">
                  <CheckIcon className="h-2 w-2" />
                </span>
                <span className="text-[12px] font-medium leading-[1.5] text-teal-700 dark:text-teal-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Excluded features ── */}
      {pkg.itemsExcluded && pkg.itemsExcluded.length > 0 && (
        <ul className="mt-3 space-y-3">
          {pkg.itemsExcluded.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                <XIcon className="h-2 w-2" />
              </span>
              <span className="text-[12px] leading-[1.5] text-zinc-400 line-through dark:text-zinc-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Spacer — mendorong revisi ke bawah card ── */}
      <div className="flex-1" />

      {/* ── Revision note ── */}
      <p className="mt-6 text-[12px] text-zinc-400 dark:text-zinc-600">{pkg.revisi}</p>
    </article>
  );
}

export function BundlePackages({ packages }: { packages: BundlePackage[] }) {
  return (
    <section aria-labelledby="bundle-title" className="space-y-5">
      {/* Section header */}
      <div className="space-y-0.5">
        <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
          Bundling
        </p>
        <h2
          id="bundle-title"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Paket lengkap
        </h2>
      </div>

      {/* Cards */}
      <div className="grid items-stretch gap-3 md:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard key={pkg.name} pkg={pkg} />
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        Revisi di luar paket:{" "}
        <span className="text-zinc-600 dark:text-zinc-400">Rp 75.000 / konten</span>
      </p>
    </section>
  );
}
