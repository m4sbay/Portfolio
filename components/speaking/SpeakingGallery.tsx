import { MediaGallery } from "@/components/ui/MediaGallery";
import type { SpeakingGalleryImage } from "@/types/speaking";

/**
 * Gallery dokumentasi sesi Speaking. Presentasi ditangani `MediaGallery` (reusable, dipakai
 * bersama Writing) — wrapper ini hanya menyuntik label aksesibilitas khas Speaking. Jangan
 * duplikasi logika carousel di sini; ubah perilaku slideshow di `components/ui/MediaGallery`.
 */
export function SpeakingGallery({ images }: { images: SpeakingGalleryImage[] }) {
  return <MediaGallery images={images} ariaLabel="Dokumentasi kegiatan" />;
}
