export const site = {
  name: "Masbay",
  title: "Maulana Bayu",
  description: "Portfolio M. Maulana Bayu (Masbay).",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
