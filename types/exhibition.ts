/**
 * Tipe domain rute pameran /work ("Exhibition Route").
 * Acuan: docs/superpowers/specs/2026-07-10-work-exhibition-route-*.md
 */

/** Varian komposisi bab — busur cerita: ekspresif → dualitas → sistem → sinema. */
export type ExhibitionCompositionVariant = "expressive" | "duality" | "system" | "cinematic";

/** Identitas satu bab rute. `targetEmotion` adalah dokumentasi kurasi — tidak pernah dirender. */
export type ExhibitionChapter = {
  slug: string;
  verb: string;
  composition: ExhibitionCompositionVariant;
  targetEmotion: string;
};

/** Konten kurasi rute: urutan array `chapters` = urutan bab (terpisah dari project.order). */
export type ExhibitionRouteContent = {
  arrival: {
    eyebrow: string;
    title: string;
  };
  chapters: ExhibitionChapter[];
  exit: {
    ctaLabel: string;
    ctaHref: string;
  };
};
