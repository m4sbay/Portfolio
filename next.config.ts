import type { NextConfig } from "next";

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


