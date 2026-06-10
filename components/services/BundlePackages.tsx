import Link from "next/link";
import { ArrowUpRightIcon, CheckIcon, WhatsAppIcon, XIcon } from "@/design-system/icons";
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
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          Chat WhatsApp
        </a>
        {/* Secondary — Portfolio */}
        <Link
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
        </Link>
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
