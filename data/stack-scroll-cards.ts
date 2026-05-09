export type HeroImage = {
  src: string;
  alt: string;
  badge?: string;
};

export type StackScrollCard = {
  title: string;
  description: string;
  /** Tailwind grid utilities untuk breakpoint lg (grid 12 kolom). */
  gridClass?: string;
  /** Satu gambar hero di bagian atas kartu. */
  heroImage?: HeroImage;
  /**
   * Tepat 3 gambar — strip horizontal beranimasi saat hover pada kartu ini.
   * Hanya satu kartu di array yang sebaiknya memakai field ini.
   */
  sliderImages?: readonly [HeroImage, HeroImage, HeroImage];
};

/** Konten highlight — layout bento: satu strip slider + sisanya gambar tunggal */
export const stackScrollCards: StackScrollCard[] = [
  {
    title: "Detail yang terasa",
    description:
      "Aku peduli pada spacing, hierarki tipografi, dan micro-interaksi halus supaya UI terasa matang, bukan sekadar “jalan”.",
    gridClass: "lg:col-span-7",
    heroImage: {
      src: "/profil.png",
      alt: "Foto profil dan referensi kualitas visual",
    },
  },
  {
    title: "Performa & aksesibilitas",
    description:
      "Semantik HTML, kontras warna, dan bundle yang ramping jadi bagian default, bukan tambahan di akhir.",
    gridClass: "lg:col-span-5",
    sliderImages: [
      {
        src: "/projects/cover_project_itailwind_hover.png",
        alt: "Antarmuka proyek dengan state hover",
        badge: "2.8K",
      },
      {
        src: "/projects/cover_itailwind.png",
        alt: "Halaman landing ITailwind",
        badge: "1.3K",
      },
      {
        src: "/projects/project_vokasi.png",
        alt: "Cuplikan visual proyek video",
        badge: "604",
      },
    ] satisfies readonly [HeroImage, HeroImage, HeroImage],
  },
  {
    title: "Kolaborasi terbuka",
    description:
      "Dari eksplorasi desain sampai implementasi di codebase — komunikasi jelas dan iterasi cepat supaya arah produk tetap selaras.",
    gridClass: "lg:col-span-6",
    heroImage: {
      src: "/projects/cover_itailwind.png",
      alt: "Iterasi desain dan kolaborasi produk",
    },
  },
  {
    title: "Konten & motion",
    description:
      "Kadang solusinya bukan kode semata: video, motion graphics, dan storytelling visual membantu produk lebih mudah dipahami.",
    gridClass: "lg:col-span-6",
    heroImage: {
      src: "/projects/project_vokasi.png",
      alt: "Cuplikan motion dan video",
    },
  },
];
