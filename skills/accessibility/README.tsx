/**
 * Accessibility (a11y) — Best Practices & Helpers
 *
 * Kumpulan pattern aksesibilitas yang sering dibutuhkan
 * dalam project web modern.
 *
 * Referensi: WAI-ARIA Authoring Practices, Apple HIG Accessibility
 */

// ─────────────────────────────────────────────
// SCREEN READER UTILITIES
// ─────────────────────────────────────────────

/**
 * Class untuk teks yang hanya bisa dibaca screen reader,
 * tapi tidak terlihat secara visual.
 *
 * Pakai: <span className={srOnly}>Navigasi utama</span>
 */
export const srOnly =
  "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]";

/**
 * Class VisuallyHidden — pakai komponen langsung
 *
 * <VisuallyHidden>Label untuk screen reader</VisuallyHidden>
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className={srOnly}>{children}</span>;
}

// ─────────────────────────────────────────────
// FOCUS MANAGEMENT
// ─────────────────────────────────────────────

/**
 * Focus ring yang visible — ala macOS blue ring
 * Gunakan sebagai tambahan pada elemen interaktif.
 *
 * Pakai: <button className={`... ${focusRing}`}>
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:focus-visible:outline-white";

/**
 * Focus ring untuk elemen di atas background gelap/berwarna
 */
export const focusRingLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// ─────────────────────────────────────────────
// ARIA PATTERNS
// ─────────────────────────────────────────────

/**
 * Props ARIA untuk elemen draggable — pakai di WidgetShell
 */
export function draggableProps(label: string) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-roledescription": "draggable",
    "aria-label": label,
  };
}

/**
 * Props untuk tombol toggle (misal: dark mode)
 */
export function toggleProps(label: string, pressed: boolean) {
  return {
    role: "button" as const,
    "aria-label": label,
    "aria-pressed": pressed,
  };
}

// ─────────────────────────────────────────────
// SKIP LINK — Navigasi cepat keyboard
// Tempatkan di awal <body>
// ─────────────────────────────────────────────

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] " +
        "focus:rounded-lg focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-sm " +
        "focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-zinc-950"
      }
    >
      Skip to content
    </a>
  );
}

// ─────────────────────────────────────────────
// COLOR CONTRAST NOTES
// ─────────────────────────────────────────────
/**
 * Panduan kontras warna — WCAG AA minimum:
 *
 * ✅ zinc-950 on white       → 19.1:1 (AAA)
 * ✅ zinc-600 on white       → 5.9:1  (AA)
 * ✅ zinc-50 on zinc-950     → 16.8:1 (AAA)
 * ✅ zinc-300 on zinc-950    → 8.6:1  (AAA)
 * ⚠️ zinc-400 on white       → 3.5:1  (AA Large only)
 * ❌ zinc-300 on white       → 1.9:1  (Fail)
 *
 * Sumber: https://webaim.org/resources/contrastchecker/
 */
export const contrastNotes = {
  primary: "zinc-950 / zinc-50 — AAA",
  secondary: "zinc-600 / zinc-300 — AA (dark/light mode aware)",
  muted: "zinc-400 — gunakan hanya untuk decorative text",
} as const;
