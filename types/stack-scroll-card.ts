export type HeroImage = {
  src: string;
  alt: string;
  badge?: string;
};

export type HeroVideo = {
  src: string;
  label: string;
};

export type StackScrollCard = {
  title: string;
  description: string;
  /** Tailwind grid utilities untuk breakpoint lg (grid 12 kolom). */
  gridClass?: string;
  /** Override ukuran visual kartu, misalnya aspect-video untuk media 16:9. */
  visualClassName?: string;
  /** Satu gambar hero di bagian atas kartu. */
  heroImage?: HeroImage;
  /** Satu video hero di bagian atas kartu. */
  heroVideo?: HeroVideo;
  /**
   * Tepat 3 gambar — strip horizontal beranimasi saat hover pada kartu ini.
   * Hanya satu kartu di array yang sebaiknya memakai field ini.
   */
  sliderImages?: readonly [HeroImage, HeroImage, HeroImage];
  /** URL tujuan tombol "Kunjungi" — jika diisi, tombol akan muncul di kartu. */
  link?: string;
};
