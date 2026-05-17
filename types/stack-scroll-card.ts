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
