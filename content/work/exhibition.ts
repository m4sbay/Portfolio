import type { ExhibitionRouteContent } from "@/types/exhibition";
import { site } from "@/lib/site";

/**
 * Kurasi rute pameran /work — urutan array = urutan bab (BUKAN project.order,
 * yang tetap dipakai permukaan lain seperti SelectedWork di home).
 *
 * ANGGARAN TEKS: seluruh teks rute (arrival + verba + label CTA) < ~40 kata.
 * Dilarang kalimat penghubung/paragraf — teks hanya identitas & penanda
 * (Design Spec guardrail #4). Cerita disampaikan komposisi, bukan kata.
 */
export const exhibitionRoute: ExhibitionRouteContent = {
  arrival: {
    eyebrow: "Pameran",
    title: "Work",
  },
  chapters: [
    { slug: "grs", verb: "Merancang", composition: "expressive", targetEmotion: "energi tangan" },
    { slug: "itailwind", verb: "Menjembatani", composition: "duality", targetEmotion: "momen aha" },
    { slug: "notion-auto-status", verb: "Mengotomasi", composition: "system", targetEmotion: "ketenangan presisi" },
    { slug: "video_vokasi", verb: "Bercerita", composition: "cinematic", targetEmotion: "crescendo" },
  ],
  exit: {
    ctaLabel: "Hubungi Masbay",
    ctaHref: site.social.whatsapp,
  },
};
