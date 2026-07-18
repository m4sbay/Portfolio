// Identitas dipecah biar satu source of truth: brand untuk UI, displayName untuk metadata.
const brandName = "Masbay"; // personal brand pada UI (navbar, hero, footer) & og:siteName
const displayName = "Maulana Bayu"; // anchor resmi browser title / metadata
const role = "Frontend Developer & UI/UX Designer";

export const site = {
  /** Personal brand untuk elemen visual & og:siteName. */
  brandName,
  /** Nama yang jadi suffix resmi browser title (title.template). */
  displayName,
  /** Peran singkat untuk homepage title & deskripsi. */
  role,
  /** Title default + homepage (title.absolute). Separator resmi: hyphen "-". */
  defaultTitle: `${displayName} - ${role}`,
  description: "Portfolio Maulana Bayu (Masbay) — Frontend Developer, UI/UX Designer, dan Digital Content Creator.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** @deprecated pakai `brandName` (UI) — dipertahankan untuk kompatibilitas. */
  name: brandName,
  /** @deprecated pakai `displayName` (metadata) — dipertahankan untuk kompatibilitas. */
  title: displayName,
  /**
   * Opsional: override judul "Now Working On" di hero.
   * Kalau kosong, akan fallback ke `projects[0]?.title`.
   */
  nowProjectTitle: process.env.NEXT_PUBLIC_NOW_PROJECT_TITLE,
  /** Opsional: kalau di-set, CTA footer memakai mailto */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  social: {
    instagram: "https://www.instagram.com/m4sbay",
    whatsapp: "https://wa.me/6281273474170",
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/m4sbay",
    linkedin: "https://www.linkedin.com/in/mmaulanabayu/",
  },
} as const;
