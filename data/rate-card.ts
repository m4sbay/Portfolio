import type { PerItemRate, BundlePackage } from "@/types/rate-card";

export const perItemRates: PerItemRate[] = [
  {
    name: "Single post / infografis",
    description: "Desain satu frame, layout clean profesional (Figma)",
    priceMin: 150_000,
    priceMax: 200_000,
  },
  {
    name: "Carousel / multi-slide (3–5 slide)",
    description: "Per set, termasuk cover & outro",
    priceMin: 350_000,
    priceMax: 500_000,
  },
  {
    name: "Carousel panjang (6–10 slide)",
    description: "Infografis program, jalur event, dsb.",
    priceMin: 600_000,
    priceMax: 850_000,
  },
  {
    name: "Sponsorship post",
    description: "Logo treatment, layout khusus sponsor",
    priceMin: 200_000,
    priceMax: 300_000,
  },
  {
    name: "Video motion / reels ringan",
    description: "Animasi sederhana, teks motion, transisi",
    priceMin: 400_000,
    priceMax: 600_000,
  },
  {
    name: "Motion map jalur lari",
    description: "Visualisasi rute animasi, berat",
    priceMin: 700_000,
    priceMax: 1_200_000,
  },
];

export const bundlePackages: BundlePackage[] = [
  {
    name: "Starter",
    price: 1_000_000,
    phase: "Kebutuhan konten ringan, frekuensi rendah",
    items: [
      "4–6 konten / bulan",
      "Single post & story sederhana",
      "Template reusable",
      "Cocok untuk pre-event atau komunitas kecil",
    ],
    revisi: "Revisi 1x per konten",
    savings: "Mulai Rp 1.000.000 / bulan",
  },
  {
    name: "Basic",
    price: 2_500_000,
    phase: "Konten rutin, intensitas ringan–menengah",
    items: [
      "10–12 konten / bulan",
      "Mix single post & carousel",
      "Sponsor post",
      "Basic story / template support",
      "Basic reels editing ringan",
    ],
    revisi: "Revisi 1x per konten",
    savings: "Mulai Rp 2.500.000 / bulan",
  },
  {
    name: "Active",
    price: 4_000_000,
    phase: "Fase event aktif & campaign lebih intens",
    items: [
      "12–28 konten / bulan",
      "Carousel & infografis intensif",
      "Frame / add-ons Instagram story",
      "Sponsor content",
      "Priority turnaround",
      "Visual campaign consistency",
    ],
    revisi: "Revisi 1x per konten",
    savings: "Mulai Rp 4.000.000 / bulan",
    featured: true,
  },
];

export const revisiLuarPaket = 75_000;
