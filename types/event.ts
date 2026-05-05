export type CalendarEventImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CalendarEvent = {
  slug: string;
  title: string;
  /** Tanggal acara (harian), format `YYYY-MM-DD` untuk penempatan di grid */
  date: string;
  timeLabel: string;
  location: string;
  excerpt: string;
  body: string[];
  images?: CalendarEventImage[];
};
