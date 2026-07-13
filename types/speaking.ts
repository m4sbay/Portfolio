export type SpeakingSessionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  images?: SpeakingSessionImage[];
};
