import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ArrowUpRightIcon } from "@/design-system/icons";
import { perItemRates, bundlePackages, revisiLuarPaket } from "@/data/rate-card";
import { PerItemRates } from "@/components/services/PerItemRates";
import { BundlePackages } from "@/components/services/BundlePackages";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";
import { TestimonialsFloat } from "@/components/TestimonialsFloat";

export const metadata: Metadata = {
  title: "Services",
  description: "Rate card desain Masbay — harga satuan per konten dan paket bundling untuk event, kampanye sosial media, dan motion graphic.",
  openGraph: {
    title: "Services — Masbay",
    description: "Rate card desain Masbay — harga satuan per konten dan paket bundling untuk event, kampanye sosial media, dan motion graphic.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Masbay",
    description: "Rate card desain Masbay — harga satuan per konten dan paket bundling untuk event, kampanye sosial media, dan motion graphic.",
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ServicesPage() {
  return (
    <div className="space-y-12 py-12">
      <header className="hidden flex-col gap-6 sm:flex sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Rate card
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            Harga desain untuk mulai kerja bareng
          </h1>
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Pilih paket yang paling dekat dengan kebutuhanmu. Scope final tetap bisa disesuaikan setelah brief dibahas.
          </p>
        </div>

        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Konsultasi dulu
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </header>

      <PerItemRates
        rates={perItemRates}
        intro={{
          eyebrow: "Rate card",
          title: "Harga desain untuk mulai kerja bareng",
          description: "Pilih paket yang paling dekat dengan kebutuhanmu. Scope final tetap bisa disesuaikan setelah brief dibahas.",
          ctaHref: site.social.instagram,
          ctaLabel: "Konsultasi dulu",
        }}
      />

      <BundlePackages packages={bundlePackages} />

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Revisi di luar paket:{" "}
        <span className="font-semibold text-zinc-950 dark:text-zinc-50">
          {formatPrice(revisiLuarPaket)} / konten
        </span>
      </p>

      <ServicesFAQ />

      <TestimonialsFloat />
    </div>
  );
}
