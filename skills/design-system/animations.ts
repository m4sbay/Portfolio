/**
 * Animation Presets — Masbay Portfolio Design System
 * Kiblat: Apple spring physics + Framer Motion
 *
 * Cara pakai:
 *   import { fadeUp, stagger, scaleIn } from "@/skills/design-system/animations"
 *
 *   <LazyMotion features={domAnimation}>
 *     <m.div variants={stagger} initial="hidden" animate="show">
 *       <m.div variants={fadeUp}>...</m.div>
 *     </m.div>
 *   </LazyMotion>
 */

import type { Variants, Transition } from "framer-motion";

// ─────────────────────────────────────────────
// BASE TRANSITIONS
// ─────────────────────────────────────────────

/** Transisi halus standar */
export const easeOut: Transition = {
  duration: 0.45,
  ease: "easeOut",
};

/** Transisi cepat untuk feedback interaktif */
export const easeQuick: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

/** Spring physics ringan — cocok untuk drag release */
export const springLight: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 35,
};

/** Spring medium — bounce sedikit */
export const springMedium: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

// ─────────────────────────────────────────────
// PAGE / SECTION ENTRANCE VARIANTS
// ─────────────────────────────────────────────

/**
 * Stagger container — wrap children yang masuk bergantian.
 * Gunakan sebagai parent m.div.
 */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Stagger lebih lambat — untuk grid banyak item */
export const staggerSlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/**
 * Fade + slide naik — paling umum dipakai.
 * Cocok untuk card, widget, section.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Fade saja — tanpa translasi */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/** Slide dari kiri */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/** Slide dari kanan */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ─────────────────────────────────────────────
// INTERACTIVE VARIANTS
// ─────────────────────────────────────────────

/**
 * Scale in — tombol, badge, tooltip muncul
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Hover lift — untuk card interaktif.
 * Gunakan whileHover prop langsung.
 *
 * <m.div whileHover={hoverLift} whileTap={tapShrink}>
 */
export const hoverLift = {
  y: -4,
  transition: easeQuick,
};

/**
 * Tap press — feedback klik
 */
export const tapShrink = {
  scale: 0.97,
  transition: easeQuick,
};

// ─────────────────────────────────────────────
// OVERLAY / MODAL VARIANTS
// ─────────────────────────────────────────────

/** Backdrop overlay — fade in/out */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Modal panel — scale dari center */
export const modal: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/** Dropdown — slide turun dari atas */
export const dropdown: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

// ─────────────────────────────────────────────
// PAGE TRANSITION
// Dipakai di layout utama — transisi antar halaman
// ─────────────────────────────────────────────

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};
