/**
 * Component Patterns — Masbay Portfolio Design System
 * Kiblat: Apple HIG · macOS UI Patterns
 *
 * Ini adalah kumpulan class string (Tailwind) yang menjadi
 * "resep" komponen yang bisa dipakai ulang di seluruh project.
 *
 * Cara pakai:
 *   import { glass, card, label } from "@/design-system/components"
 *   <div className={glass.widget}>...</div>
 */

// ─────────────────────────────────────────────
// GLASSMORPHISM — Frosted glass ala macOS
// ─────────────────────────────────────────────
export const glass = {
  /**
   * Widget shell standar — dipakai di WidgetShell.tsx
   * - Latar transparan putih 10%
   * - Border putih 20% untuk rim light
   * - Backdrop blur 16px (backdrop-blur-md di Tailwind)
   */
  widget:
    "rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md",

  /**
   * Versi lebih tipis — sidebar panel, dropdown
   */
  panel:
    "rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm",

  /**
   * Versi heavy — hero container, modal besar
   * Cocok sebagai latar di atas foto/gradient
   */
  heavy:
    "rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl",

  /**
   * Navbar sticky — tipis, blur ringan
   */
  nav:
    "border-b border-zinc-200/70 bg-transparent backdrop-blur-sm dark:border-white/10",
} as const;

// ─────────────────────────────────────────────
// CARD — Untuk project cards, list items
// ─────────────────────────────────────────────
export const card = {
  /**
   * Card solid — dipakai di halaman /work
   * Background zinc-50 light / zinc-900 dark
   */
  solid:
    "rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900",

  /**
   * Card dengan hover lift effect — project card interaktif
   */
  interactive:
    "rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 " +
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-zinc-300 " +
    "dark:hover:border-white/20",

  /**
   * Inner surface di dalam widget/card
   * Contoh: thumbnail album art, icon tile (StackWidget)
   */
  inner:
    "rounded-lg border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5",

  /**
   * Hero container (bounding box widget area)
   */
  hero:
    "relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/40 dark:border-white/10 dark:bg-white/5",
} as const;

// ─────────────────────────────────────────────
// TYPOGRAPHY CLASSES
// ─────────────────────────────────────────────
export const text = {
  /**
   * Label kecil di atas konten: "Intro", "Stack", "Now"
   */
  label:
    "text-xs font-medium tracking-tight text-zinc-600 dark:text-zinc-300",

  /**
   * Judul widget / card
   */
  title:
    "text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",

  /**
   * Heading section utama halaman
   */
  heading:
    "text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",

  /**
   * Body teks — paragraf
   */
  body:
    "text-sm leading-relaxed text-zinc-600 dark:text-zinc-300",

  /**
   * Caption / metadata — timestamp, tag
   */
  caption:
    "text-xs text-zinc-500 dark:text-zinc-400",

  /**
   * Navbar brand / logo
   */
  brand:
    "text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",

  /**
   * Nav link
   */
  navLink:
    "text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50",
} as const;

// ─────────────────────────────────────────────
// BUTTON — Apple-style CTAs
// ─────────────────────────────────────────────
export const button = {
  /**
   * Primary — solid zinc, high contrast
   */
  primary:
    "inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white " +
    "transition-all duration-150 hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",

  /**
   * Secondary — border only
   */
  secondary:
    "inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-transparent px-4 py-2 text-sm font-medium " +
    "text-zinc-700 transition-all duration-150 hover:bg-zinc-100 active:scale-95 " +
    "dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/10",

  /**
   * Ghost — tanpa border, hover saja
   */
  ghost:
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 " +
    "transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 " +
    "dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-50",

  /**
   * Icon button — bulat, untuk toggle/icon-only
   */
  icon:
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 " +
    "transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-950 active:scale-95 " +
    "dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50",
} as const;

// ─────────────────────────────────────────────
// BADGE / TAG — Label teknologi, kategori
// ─────────────────────────────────────────────
export const badge = {
  /**
   * Default badge — dipakai di StackWidget (IconTile)
   */
  default:
    "inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 " +
    "px-3 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200",

  /**
   * Pill badge — tag kategori project
   */
  pill:
    "inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 " +
    "text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300",

  /**
   * Accent badge — highlight / featured
   */
  accent:
    "inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 " +
    "text-xs font-medium text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-400",
} as const;

// ─────────────────────────────────────────────
// MACWINDOW CONTROLS — Traffic light dots
// Pattern ikonik dari WidgetShell.tsx
// ─────────────────────────────────────────────
export const macControls = {
  /**
   * Container row
   */
  row: "flex items-center gap-1.5",

  /**
   * Dot individual — pakai class ini untuk tiap dot
   * Warna diatur via `bg-[#...]`
   */
  dot: "h-2.5 w-2.5 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10",

  /**
   * Siap pakai — full traffic light row sebagai JSX string template
   * Pakai sebagai reference, render manual di komponen
   *
   * <div className={macControls.row}>
   *   <div className={`${macControls.dot} bg-[#ec6a5e]`} />
   *   <div className={`${macControls.dot} bg-[#f4bf4f]`} />
   *   <div className={`${macControls.dot} bg-[#61c554]`} />
   * </div>
   */
} as const;

// ─────────────────────────────────────────────
// INPUT — Form fields
// ─────────────────────────────────────────────
export const input = {
  /**
   * Text input standar
   */
  base:
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 " +
    "placeholder:text-zinc-400 outline-none transition-all duration-150 " +
    "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 " +
    "dark:border-white/15 dark:bg-white/5 dark:text-zinc-50 dark:placeholder:text-zinc-500 " +
    "dark:focus:border-white/30 dark:focus:ring-white/10",

  /**
   * Textarea
   */
  textarea:
    "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 " +
    "placeholder:text-zinc-400 outline-none transition-all duration-150 resize-y min-h-[100px] " +
    "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 " +
    "dark:border-white/15 dark:bg-white/5 dark:text-zinc-50 dark:placeholder:text-zinc-500 " +
    "dark:focus:border-white/30 dark:focus:ring-white/10",
} as const;

// ─────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────
export const divider = {
  horizontal:
    "h-px w-full bg-zinc-200 dark:bg-white/10",
  vertical:
    "w-px h-full bg-zinc-200 dark:bg-white/10",
} as const;

// ─────────────────────────────────────────────
// HALFTONE BACKGROUND — Hero dot grid pattern
// ─────────────────────────────────────────────
export const halftone = {
  /**
   * Dot grid dengan radial vignette — dari HeroWidgets.tsx
   * Selalu absolute + pointer-events-none + z-0
   */
  dotGrid:
    "pointer-events-none absolute inset-0 z-0 " +
    "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] opacity-25 " +
    "dark:bg-[radial-gradient(#52525b_1px,transparent_1px)] " +
    "[background-size:12px_12px]",

  /**
   * Style object untuk mask vignette — pakai via style prop
   * Contoh: <div className={halftone.dotGrid} style={halftone.vignetteStyle} />
   */
  vignetteStyle: {
    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
  },
} as const;
