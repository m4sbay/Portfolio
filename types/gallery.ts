/**
 * Gambar untuk komponen gallery/slideshow reusable (MediaGallery).
 * Aset distandarkan landscape 1920×1080 (16:9), jadi width/height tidak diulang di data —
 * MediaGallery menyuntik ukuran default. Cukup `src` + `alt`. Dipakai lintas fitur
 * (Speaking, Writing) agar satu komponen slideshow melayani semuanya.
 */
export type GalleryImage = {
  src: string;
  alt: string;
};
