import type { Entity } from "@/types/entity";

export const entity: Entity = {
  slug: "vercel",
  title: "Vercel",
  subtitle: "Platform deploy & hosting web",
  description:
    "Platform buat nge-host dan nge-deploy website, terutama yang dibangun pakai framework kayak Next.js. Cukup sambungin ke GitHub, tiap push langsung ke-deploy otomatis lengkap sama preview sebelum jadi versi utama.",
  website: "https://vercel.com/",
  // Placeholder: logo bakal ditambah sendiri, ganti manual di /public/logo/vercel.png
  logo: "/logo/vercel.png",
  preview: "/entities/vercel/preview.png",
};
