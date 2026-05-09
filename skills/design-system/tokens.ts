/**
 * Design System Tokens — Masbay Portfolio
 * Kiblat: Apple HIG (Human Interface Guidelines)
 *
 * Gunakan file ini sebagai sumber kebenaran tunggal (single source of truth)
 * untuk semua nilai visual yang dipakai di seluruh project.
 *
 * Cara pakai:
 *   import { colors, radii, shadow } from "@/skills/design-system/tokens"
 */

// ─────────────────────────────────────────────
// COLOR PALETTE
// Turunan dari palet Zinc (netral Apple-like) + aksen minimal
// ─────────────────────────────────────────────
export const colors = {
  // Neutrals — backbone utama, mirip macOS system colors
  zinc: {
    50:  "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },

  // Semantic light/dark backgrounds
  background: {
    light: "#ffffff",
    dark:  "#0a0a0a",
  },

  // Glassmorphism surfaces
  glass: {
    /** Latar widget di atas hero: putih 10% */
    surface:      "rgba(255,255,255,0.10)",
    /** Border tipis ala frosted glass */
    border:       "rgba(255,255,255,0.20)",
    /** Hover surface sedikit lebih terang */
    surfaceHover: "rgba(255,255,255,0.16)",
  },

  // macOS Traffic Light — jangan ubah nilai ini, ikonik
  trafficLight: {
    red:    "#ec6a5e",
    yellow: "#f4bf4f",
    green:  "#61c554",
  },

  // Accent — emerald untuk highlight/indikator
  accent: {
    emerald: "#34d399",
    emeraldMuted: "rgba(52,211,153,0.80)",
  },
} as const;

// ─────────────────────────────────────────────
// TYPOGRAPHY
// Stack: Geist Sans (body) · Geist Mono (code)
// ─────────────────────────────────────────────
export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    mono: "var(--font-geist-mono), 'SF Mono', monospace",
  },

  fontSize: {
    "2xs": "0.625rem",  // 10px — timestamp, label kecil
    xs:   "0.75rem",   // 12px — badge, caption
    sm:   "0.875rem",  // 14px — body secondary
    base: "1rem",      // 16px — body
    lg:   "1.125rem",  // 18px
    xl:   "1.25rem",   // 20px
    "2xl":"1.5rem",    // 24px — card title
    "3xl":"1.875rem",  // 30px — section heading
    "4xl":"2.25rem",   // 36px — hero
  },

  fontWeight: {
    normal:    "400",
    medium:    "500",
    semibold:  "600",
    bold:      "700",
  },

  lineHeight: {
    tight:  "1.25",
    snug:   "1.375",
    normal: "1.5",
    relaxed:"1.625",
    loose:  "2",
  },

  letterSpacing: {
    tight:  "-0.025em",  // tracking-tight — heading & nama
    normal: "0em",
    wide:   "0.025em",
    wider:  "0.05em",
    widest: "0.1em",     // label uppercase kecil
  },
} as const;

// ─────────────────────────────────────────────
// SPACING
// Skala 4px base — konsisten dengan Tailwind default
// ─────────────────────────────────────────────
export const spacing = {
  0:    "0px",
  0.5:  "2px",
  1:    "4px",
  1.5:  "6px",
  2:    "8px",
  2.5:  "10px",
  3:    "12px",
  3.5:  "14px",
  4:    "16px",
  5:    "20px",
  6:    "24px",
  7:    "28px",
  8:    "32px",
  9:    "36px",
  10:   "40px",
  12:   "48px",
  14:   "56px",
  16:   "64px",
  20:   "80px",
  24:   "96px",
} as const;

// ─────────────────────────────────────────────
// BORDER RADIUS
// Apple style: bulat tapi bukan pill — tegas namun lembut
// ─────────────────────────────────────────────
export const radii = {
  none:   "0px",
  sm:     "6px",
  md:     "8px",     // tombol kecil, badge
  lg:     "12px",    // card anak / thumbnail
  xl:     "16px",    // card utama (WidgetShell)
  "2xl":  "20px",    // container hero
  "3xl":  "24px",    // floating panel besar
  full:   "9999px",  // pill / traffic light dot
} as const;

// ─────────────────────────────────────────────
// SHADOWS
// Layered shadow — depth alami ala macOS
// ─────────────────────────────────────────────
export const shadow = {
  /** Tidak ada bayangan */
  none:   "none",
  /** Tombol / badge kecil */
  sm:     "0 1px 2px rgba(0,0,0,0.08)",
  /** Card standar */
  md:     "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
  /** Widget aktif / dragged */
  lg:     "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
  /** Modal / overlay */
  xl:     "0 20px 60px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.10)",
  /** Traffic light inset highlight */
  inset:  "inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1)",
} as const;

// ─────────────────────────────────────────────
// BLUR
// Backdrop blur levels — kunci glassmorphism
// ─────────────────────────────────────────────
export const blur = {
  sm:  "blur(4px)",
  md:  "blur(8px)",     // Navbar
  lg:  "blur(16px)",    // Widget shell (backdrop-blur-md di Tailwind)
  xl:  "blur(24px)",
  "2xl":"blur(40px)",
} as const;

// ─────────────────────────────────────────────
// Z-INDEX
// Hierarki layer — jangan hardcode angka di komponen
// ─────────────────────────────────────────────
export const zIndex = {
  below:    -1,
  base:      0,
  widget:   10,   // widget idle
  widgetActive: 30, // widget sedang di-drag
  sticky:   40,   // navbar
  dropdown: 50,
  modal:    60,
  toast:    70,
  tooltip:  80,
} as const;

// ─────────────────────────────────────────────
// ANIMATION / TRANSITION
// Timing terinspirasi Apple spring physics
// ─────────────────────────────────────────────
export const animation = {
  duration: {
    instant:  "0ms",
    fast:     "150ms",  // hover feedback
    normal:   "300ms",  // transisi komponen
    slow:     "500ms",  // fade in seksi baru
    slower:   "700ms",
  },

  easing: {
    /** Standard ease — cocok untuk kebanyakan transisi */
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    /** Decelerate — masuk layar */
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    /** Accelerate — keluar layar */
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    /** Spring ringan — interaktif drag/drop */
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  /** Framer Motion variants yang sering dipakai */
  variants: {
    /** Fade + slide naik — stagger children */
    fadeUp: {
      hidden: { opacity: 0, y: 14 },
      show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    },
    /** Fade sederhana */
    fade: {
      hidden: { opacity: 0 },
      show:   { opacity: 1, transition: { duration: 0.4 } },
    },
    /** Container stagger */
    stagger: {
      hidden: {},
      show:   { transition: { staggerChildren: 0.08 } },
    },
  },
} as const;

// ─────────────────────────────────────────────
// BREAKPOINTS
// Mobile-first, sama persis dengan Tailwind default
// ─────────────────────────────────────────────
export const breakpoints = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

// ─────────────────────────────────────────────
// LAYOUT
// Nilai layout global — max-width, padding, dll.
// ─────────────────────────────────────────────
export const layout = {
  maxWidth: "72rem",        // max-w-6xl = 1152px
  navHeight: "56px",        // h-14
  pagePaddingX: {
    mobile: "1rem",         // px-4
    tablet: "1.5rem",       // sm:px-6
    desktop: "2rem",        // lg:px-8
  },
  pagePaddingY: "2.5rem",   // py-10
} as const;
