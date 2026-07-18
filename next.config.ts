import type { NextConfig } from "next";

// HSTS hanya relevan di production (HTTPS); di localhost http diabaikan browser.
const isProduction = process.env.NODE_ENV === "production";

// Security headers untuk semua route. Sengaja hanya header yang tidak
// mematahkan fitur yang dipakai: next/font (self-host), next-themes (inline
// script tema), framer-motion (inline style), dan next/image dari CDN yang
// sudah diizinkan.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    // CSP minimal: keempat directive ini tidak menyentuh script/style/img/font,
    // jadi tidak butuh nonce dan tidak memecah inline script tema maupun
    // Google Fonts/picsum yang dipakai /arsipreset. CSP penuh ditunda (lihat laporan).
    key: "Content-Security-Policy",
    value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Sesi SMK 6 sempat memakai slug "smkn5-november" (salah nama sekolah).
      // Jaga tautan lama agar tidak 404 → arahkan permanen ke slug yang benar.
      {
        source: "/speaking/design-presentation-canva-smkn5-november-2023",
        destination: "/speaking/design-presentation-canva-smkn6-november-2023",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


