import type { FeaturedContent } from "@/types/work";
import { site } from "@/lib/site";

/**
 * Kurasi /work — sorotan karya di atas grid katalog.
 * `heroSlug` + `featuredSlugs` wajib merujuk project published (divalidasi di data/work-featured.ts).
 * Featured hanyalah sorotan: karya yang sama tetap muncul di grid "All Projects".
 */
export const featuredContent: FeaturedContent = {
  header: {
    eyebrow: "Work",
    title: "Karya & Project",
    intro: "Kumpulan project, eksperimen, dan karya digital yang aku bangun.",
  },
  heroSlug: "video_vokasi",
  featuredSlugs: ["notion-auto-status", "itailwind", "grs"],
  cta: {
    label: "Hubungi Masbay",
    href: site.social.whatsapp,
  },
};
