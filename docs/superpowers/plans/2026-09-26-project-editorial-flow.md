# Project Editorial Flow Implementation Plan

**Goal:** Deskripsi mengalir di sebelah galeri desktop dan memenuhi container setelah galeri berakhir.

**Architecture:** Reusable Server Component `ProjectEditorialSection` menerima children, media opsional, id, dan className. CSS float kanan pada breakpoint lg mempertahankan proporsi 0.9:1.45 dan gap 5rem; flow-root membatasi float ke section. Di bawah lg gunakan single-column, copy sebelum media. Tidak ada pengukuran tinggi atau JavaScript tambahan.

**Constraints:** Pertahankan typography, ukuran galeri, konten, container, dan StickyGallery. Lepaskan sticky teks serta batas 68ch hanya pada copy desktop section ini. Tidak mengubah routing atau data project.

- [x] Analisis `app/work/[slug]/page.tsx`, `components/projects/StickyGallery.tsx`, dan `.reading` dalam `app/globals.css`.
- [x] Tambah `components/projects/ProjectEditorialSection.tsx` dan CSS terisolasi.
- [x] Gunakan wrapper pada overview, processSections, dan caseStudy; media kosong tidak membuat kolom kosong.
- [x] Verifikasi browser: desktop 1440 dan 1024, tablet 768, mobile 390; periksa project panjang, pendek, 1–2 gambar, banyak gambar, serta tinjauan kode untuk section tanpa galeri.
- [x] Jalankan targeted ESLint, `npx tsc --noEmit`, dan `npm run build`; catat keterbatasan lingkungan.

**Acceptance:** Baris teks di samping galeri berada di kiri tanpa overlap, baris setelah galeri melebar, tidak ada horizontal overflow, section berikutnya berada setelah galeri maupun copy, dan mobile tetap copy lalu galeri.

## Hasil verifikasi

- Targeted ESLint, TypeScript, dan git diff --check lolos.
- Download Organizer: browser pada 1440, 1024, 768, 390 px tidak overflow. Pada desktop 1440 px, baris sebelum galeri berakhir lebarnya sekitar 386 px; setelah galeri berakhir melebar hingga sekitar 1088 px. Tablet/mobile memakai copy sebelum media.
- Geopark Run Series: overview satu gambar dan process section hingga enam gambar tetap terbungkus dalam section masing-masing.
- Banner Graduation: overview dua gambar dan process tiga gambar tidak overlap.
- Notion Auto Status: overview satu gambar dan case study dua gambar tetap mengalir.
- Build dijalankan, tetapi gagal mengambil Bricolage Grotesque, DM Sans, Geist, dan Geist Mono dari Google Fonts akibat koneksi. Tidak ada perubahan konfigurasi font.
- Dua aset galeri Download Organizer masih belum tersedia, sehingga verifikasi menggunakan ruang gambar dari dimensi konten. Tidak mengubah aset atau data author.
- Pemeriksaan screenshot tambahan terakhir terhenti karena server localhost tidak lagi menerima koneksi; pengukuran browser di atas sudah selesai sebelumnya.
