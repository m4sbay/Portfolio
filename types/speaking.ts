export type SpeakingSessionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Gambar dokumentasi (gallery). Aset distandarkan landscape 1920×1080, jadi width/height
 * tidak diulang di data — SpeakingGallery menyuntik ukuran default. Cukup `src` + `alt`.
 */
export type SpeakingGalleryImage = {
  src: string;
  alt: string;
};

export type SpeakingSession = {
  slug: string;
  title: string;
  /** Tanggal acara (harian), format `YYYY-MM-DD` untuk penempatan di grid */
  date: string;
  timeLabel: string;
  location: string;
  excerpt: string;
  body: string[];
  /** Gambar utama: Hero, Card, Metadata, dan Open Graph. */
  cover?: SpeakingSessionImage;
  /** Kumpulan foto dokumentasi kegiatan. Penyajian (gallery/carousel/dst) urusan komponen UI. */
  images?: SpeakingGalleryImage[];
};
