# Portfolio Website – Project Brief

## Tujuan

Membangun website portofolio pribadi dengan tampilan dan feel mirip macfolio.com — clean, minimal, modern, dengan estetika Mac/Apple lover.

## Tech Stack (ikuti stack Macfolio)

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: Base UI (dari MUI, headless)
- **Animation**: Framer Motion
- **Auth** (opsional): Clerk (jika butuh halaman admin/login)
- **Deploy**: Vercel

## Referensi Desain

- Referensi utama: https://macfolio.com
- Gaya: clean, card-based layout, tipografi tegas, dark/light mode support
- Grid: masonry atau uniform card grid
- Hover effect: subtle image transition (primary → hover image swap)
- Warna: netral dominan (white/gray/black), minimal aksen warna

## Struktur Halaman

1. `/` – Homepage: hero section + grid kartu portofolio
2. `/work/[slug]` – Detail project
3. `/about` – Tentang aku
4. (opsional) `/admin` – CMS sederhana untuk tambah project

## Konten Kartu Portofolio

Setiap kartu berisi:

- Thumbnail image (dengan hover image swap seperti Macfolio)
- Nama project
- Deskripsi singkat
- Tags (kategori, tools, platform)

## Identitas

- Nama: M. Maulana Bayu (Masbay)
- Bidang: Frontend Developer, UI/UX Designer, Digital Content Creator
- Stack favorit: TypeScript, Tailwind CSS, Preact/React
- Instagram: @m4sbay

## Catatan Tambahan

- Gunakan `next/image` untuk semua gambar (optimasi otomatis)
- Support dark mode via Tailwind (`dark:` classes)
- Mobile-first responsive
- Animasi masuk kartu menggunakan Framer Motion (fade + slide up)
- Metadata lengkap untuk SEO (Open Graph, title, description per halaman)
