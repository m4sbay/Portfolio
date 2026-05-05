export const site = {
  name: "Masbay",
  title: "Masbay — Portfolio",
  description: "Portfolio M. Maulana Bayu (Masbay).",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Set `NEXT_PUBLIC_SPOTIFY_WIDGET=false` di `.env.local` untuk menyembunyikan
   * widget Spotify di hero dan menghentikan fetch ke `/api/spotify`.
   */
  showSpotifyWidget: process.env.NEXT_PUBLIC_SPOTIFY_WIDGET !== "false",
  /** Opsional: kalau di-set, CTA footer memakai mailto */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  social: {
    instagram: "https://www.instagram.com/m4sbay",
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/m4sbay",
    linkedin: "https://www.linkedin.com/in/mmaulanabayu/",
  },
} as const;
