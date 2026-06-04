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

// Order: Starter, Active (featured/center), Basic
export const bundlePackages: BundlePackage[] = [
  {
    name: "MaluBay",
    subtitle: "untuk brand baru",
    price: 1_200_000,
    phase: "Kebutuhan konten ringan, frekuensi rendah",
    description:
      "Cocok untuk komunitas kecil atau brand yang baru mulai aktif di media sosial.",
    items: [
      "4–6 konten / bulan",
      "Single post",
      "Infografis",
      "Carousel (Max 3 slide)",
      "Frame story",
      "Template reusable",
    ],
    itemsExcluded: [
      "Multi-post",
      "Reels",
      "Master file (.psd/.ai)",
      "Strategy call",
    ],
    revisi: "Revisi 7x / konten",
    savings: "Mulai Rp 1.200.000",
  },
  {
    name: "SeriusBay",
    subtitle: "untuk brand aktif",
    price: 4_000_000,
    phase: "Fase event aktif & campaign lebih intens",
    description:
      "Fase event aktif & campaign intensif. Semua yang kamu butuhkan dalam satu paket.",
    slotBadge: "Slot terbatas",
    items: [
      "12–28 konten / bulan",
      "Single post",
      "Carousel (3–12 slides)",
      "Reels thumbnail",
      "Multiple post",
      "Frame story",
      "IG story add-ons",
    ],
    itemsExclusive: [
      "File (Figma, .PSD, .AI)",
      "Visual consistency",
      "Priority turnaround",
      "1x strategy consultation call",
    ],
    revisi: "Revisi 15x / konten",
    savings: "Mulai Rp 4.000.000",
    featured: true,
  },
  {
    name: "GasBay",
    subtitle: "untuk brand rutin",
    price: 2_500_000,
    phase: "Konten rutin, intensitas ringan–menengah",
    description:
      "Konten rutin, intensitas ringan–menengah. Cocok untuk fase pre-event atau maintenance.",
    items: [
      "10–12 konten / bulan",
      "Single post",
      "Infografis",
      "Carousel (3-6 slide)",
      "Reels thumbnail",
      "Desain story",
      "Frame add-ons",
      "Basic reels editing",
    ],
    itemsExcluded: [
      "Master file (.psd/.ai)",
      "Strategy consultation call",
      "Priority turnaround",
    ],
    revisi: "Revisi 10x / konten",
    savings: "Mulai Rp 2.500.000",
  },
];

export const revisiLuarPaket = 75_000;
