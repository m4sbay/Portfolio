# Work Exhibition Route — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: gunakan `skills/executing-plans` (inline) atau `skills/subagent-driven-development` untuk mengeksekusi plan ini fase-per-fase. Langkah memakai sintaks checkbox (`- [ ]`) untuk tracking. **Setiap fase berhenti di Design Review Gate — dilarang melanjutkan ke fase berikutnya tanpa persetujuan.**

**Goal:** Membangun ulang halaman `/work` sebagai "Exhibition Route" — rute pameran empat bab dengan storytelling non-verbal — sesuai tiga dokumen spec yang sudah disetujui.

**Arsitektur:** Struktur dulu, cahaya kemudian. Server Components merender seluruh rute dalam keadaan akhir (baseline no-JS/reduced-motion); Client Components leaf menambahkan motion `transform`/`opacity` di atasnya. Kurasi rute hidup di konten rute (`content/work/exhibition.ts`), bukan di komponen.

**Tech stack:** Next.js 16 App Router (Server Components), framer-motion via `LazyMotion` + `domAnimation` + `m` (tanpa dependensi baru), Tailwind CSS 4, TypeScript strict.

**Sumber kebenaran (prioritas menang bila konflik):**
1. [Design Specification](../specs/2026-07-10-work-exhibition-route-design.md)
2. [UX Flow Specification](../specs/2026-07-10-work-exhibition-route-ux-flow.md)
3. [Technical Specification](../specs/2026-07-10-work-exhibition-route-tech-spec.md)
4. Dokumen ini

## Global Constraints (berlaku untuk semua fase — dari Tech Spec §10)

- Native scroll tidak boleh diambil alih: no scroll-jacking, no snap paksa, no pinning, no body lock.
- Tidak ada dependensi baru (no GSAP/Lenis/smooth-scroll).
- Wrapper motion hanya menganimasikan `transform`/`opacity`; tidak pernah mengubah layout, urutan DOM, atau semantik.
- Keadaan tersembunyi pra-animasi tidak pernah dirender server (SSR = keadaan akhir, selalu).
- Server Component by default; `"use client"` hanya di leaf.
- Nol layout shift: semua media punya rasio aspek ter-reservasi.
- Project Architecture v1 tidak dilanggar; `data/` tetap satu-satunya pintu data.
- Validasi rute gagal keras saat build.
- `dark:` dan reduced-motion hadir sejak implementasi pertama setiap komponen.
- Satu aksen motion per bab, terisolasi per komponen.
- Anggaran teks rute < ~40 kata, terdokumentasi di file konten.
- Komentar kode singkat, boleh Indonesia (gaya repo); semicolon + double quotes.

## Prasyarat sebelum Phase 1

- Branch kerja: `feature/work-gallery` (sudah aktif), working tree bersih.
- Ketiga spec sudah approved (status saat plan ini ditulis: ya).
- Perintah verifikasi baku yang dipakai berulang di bawah:
  - `npx eslint <file-yang-disentuh>`
  - `npx tsc --noEmit`
  - `npm run build`
  - `npm run dev` untuk review visual di `http://localhost:3000/work`

## Cara kerja Design Review Gate

Di akhir setiap fase: (1) jalankan seluruh Verification Checklist secara segar, (2) laporkan hasil nyata (perintah + output, bukan klaim), (3) tunjukkan hasil visual bila fase menyentuh UI, (4) baca ulang bagian spec yang relevan dan konfirmasi tidak ada pelanggaran, (5) **berhenti dan minta persetujuan**. Revisi diminta → kerjakan di fase yang sama → gate diulang. Tidak ada pengecualian, termasuk fase yang "terasa sepele".

---

## Phase 1 — Fondasi Konten & Data

### Goal
Semua tipe, konten rute, dan gerbang data yang dibutuhkan rute berdiri dan tervalidasi — tanpa menyentuh UI sama sekali.

### Scope
- Field `year` opsional pada `Project` + backfill 4 project.
- Tipe exhibition baru.
- File konten rute (urutan bab, identitas bab, teks Arrival/Exit/CTA).
- Aggregator data rute dengan validasi gagal-keras.
- Gate teaser draft minimal.

### Files yang disentuh
- Modify: `types/project.ts` — tambah `year?: number` pada `Project` dengan komentar singkat (dipakai label plate rute).
- Create: `types/exhibition.ts` — tipe domain rute.
- Create: `content/work/exhibition.ts` — konten kurasi rute (folder `content/work/` baru).
- Create: `data/exhibition.ts` — aggregator + validasi.
- Modify: `data/projects.ts` — tambah `hasDraftProjects(): Promise<boolean>`.
- Modify: `content/projects/grs.ts`, `content/projects/itailwind.ts`, `content/projects/notion-auto-status.ts`, `content/projects/video_vokasi.tsx` — backfill `year`.

### Files yang tidak boleh disentuh
`app/**`, `components/**`, `app/globals.css`, `lib/**`, spec/plan docs (kecuali dicatat di gate).

### Dependency
Spec approved; working tree bersih. Tidak bergantung fase lain.

### Langkah implementasi (berurutan)

- [ ] **1.1** Tambah `year?: number` ke `Project` di `types/project.ts` (di dekat `tags`/metadata lain, dengan komentar satu baris gaya repo).
- [ ] **1.2** Buat `types/exhibition.ts` dengan bentuk berikut (nama-nama ini dipakai fase 2–4, jangan diubah tanpa memperbarui plan):
  - `ExhibitionCompositionVariant = "expressive" | "duality" | "system" | "cinematic"`.
  - `ExhibitionChapter`: `{ slug: string; verb: string; composition: ExhibitionCompositionVariant; targetEmotion: string }` — `targetEmotion` murni dokumentasi kurasi (dirender tidak pernah).
  - `ExhibitionRouteContent`: `{ arrival: { eyebrow: string; title: string }; chapters: ExhibitionChapter[]; exit: { ctaLabel: string; ctaHref: string } }`.
- [ ] **1.3** Buat `content/work/exhibition.ts` meng-export `exhibitionRoute: ExhibitionRouteContent`:
  - `chapters` berurutan: `grs` (Merancang, expressive), `itailwind` (Menjembatani, duality), `notion-auto-status` (Mengotomasi, system), `video_vokasi` (Bercerita, cinematic).
  - `arrival` dan `exit.ctaLabel` diisi teks final (identitas/penanda saja — bukan kalimat); `exit.ctaHref` ke halaman kontak/tujuan yang dikonfirmasi pemilik saat fase berjalan.
  - Komentar header file mencantumkan **anggaran teks < ~40 kata untuk seluruh rute** dan larangan kalimat penghubung (kutip Design Spec guardrail #4).
- [ ] **1.4** Buat `data/exhibition.ts`:
  - `ChapterViewModel = { chapter: ExhibitionChapter; project: Project; index: number }` (index 0-based; numeral tampilan = index + 1).
  - `getExhibitionChapters(): Promise<ChapterViewModel[]>` — gabungkan `exhibitionRoute.chapters` dengan `getPublishedProjects()`; **throw Error** (pesan menyebut file & slug, meniru gaya guard `data/projects.ts`) bila: slug rute tidak ditemukan di published; ada project published yang tidak terdaftar di rute; slug rute duplikat.
- [ ] **1.5** Tambah `hasDraftProjects(): Promise<boolean>` di `data/projects.ts` (filter `status === "draft"` dari `getAllProjects()`; tidak membocorkan detail draft).
- [ ] **1.6** Backfill `year` di keempat file `content/projects/` — nilai dikonfirmasi ke pemilik saat fase berjalan; bila sebuah nilai belum tersedia, field dibiarkan tidak diisi (opsional; label plate fase 2 merender tanpa tahun).
- [ ] **1.7** Uji validasi secara sengaja: tambahkan sementara slug fiktif ke `chapters`, jalankan `npm run build`, pastikan gagal dengan pesan yang jelas; hapus slug fiktif. Ulangi dengan menghapus sementara satu bab (project published tak terdaftar) — build harus gagal; kembalikan.
- [ ] **1.8** Jalankan verifikasi penuh (checklist di bawah), lalu commit: `feat(work): fondasi konten & data exhibition route (phase 1)`.

### Acceptance Criteria
- `Project` punya `year` opsional; keempat project ter-backfill (atau tercatat eksplisit yang belum ada nilainya).
- `getExhibitionChapters()` mengembalikan 4 bab berurutan GRS → iTailwind → Notion → Video dengan project lengkap.
- Kedua skenario validasi terbukti menggagalkan build dengan pesan yang menyebut penyebabnya.
- `hasDraftProjects()` mengembalikan boolean benar terhadap isi `content/projects/` saat ini.
- Halaman `/work` lama tetap utuh dan berfungsi (fase ini tidak menyentuhnya).

### Definition of Done
Semua langkah tercentang; AC terpenuhi dengan bukti; verifikasi dijalankan segar setelah perubahan terakhir; satu commit rapi berisi hanya file fase ini; gate dilewati.

### Verification Checklist
- [ ] `npx eslint types/exhibition.ts content/work/exhibition.ts data/exhibition.ts data/projects.ts types/project.ts` → 0 error.
- [ ] `npx tsc --noEmit` → 0 error.
- [ ] `npm run build` → sukses.
- [ ] Bukti langkah 1.7 (dua kegagalan yang disengaja) dilaporkan apa adanya.
- [ ] `npm run dev` → `/work` lama masih tampil normal.

### Rollback Strategy
Satu commit terisolasi; rollback = `git revert <commit-phase-1>`. Tidak ada permukaan UI yang berubah, jadi rollback bebas risiko visual.

### Risiko implementasi
- Dynamic import auto-discovery memuat `content/work/` secara tidak sengaja → tidak terjadi: discovery `data/projects.ts` membaca hanya `content/projects/` (path eksplisit) — diverifikasi lewat build.
- Nilai `year` tidak tersedia → field opsional; jangan mengarang nilai.

### Estimasi kompleksitas
**Rendah.** ±6 file kecil, pola yang sudah ada (registry + guard gagal-keras) tinggal ditiru.

### 🔒 Design Review Gate 1
Laporkan: hasil checklist, bukti validasi gagal-keras, isi `content/work/exhibition.ts` (teks rute harus direview pemilik — ini suara kurator). **Berhenti; lanjut ke Phase 2 hanya setelah disetujui.**

---

## Phase 2 — Komposisi Statis (L0: pameran tanpa cahaya)

### Goal
Seluruh rute berdiri sebagai halaman statis Server Components yang **sudah bercerita tanpa satu pun motion** — inilah acceptance test terpenting seluruh proyek (Design Spec prinsip #7).

### Scope
- Empat komponen server tahap rute + komposisi per varian bab.
- `app/work/page.tsx` diganti isinya.
- Benang statis, counter statis per bab, label plate, link pintu, siluet draft, CTA.
- Dua tema + mobile sejak awal.

### Files yang disentuh
- Create: `components/projects/exhibition/ExhibitionArrival.tsx` — Arrival + Hero: identitas halaman (eyebrow + title dari `exhibitionRoute.arrival`), indeks empat verba + numeral (floor plan).
- Create: `components/projects/exhibition/ExhibitionChapter.tsx` — kerangka bab: marker (numeral `0N`, verba, kategori · tahun, counter statis `0N / 04`), slot karya per `composition`, label plate (judul · kategori · tahun), seluruh area karya = `Link` ke `/work/[slug]` dengan `aria-label` deskriptif; heading bab = `h2` (verba + judul). Empat varian komposisi di satu komponen (conditional layout), bukan empat komponen:
  - `expressive`: poster `aspect-[4/5]` offset asimetris + vitrine kecil (1–2 gambar pertama dari `processSections[0].gallery`) mengintip di sisi.
  - `duality`: `image` + `hoverImage` dalam satu bingkai bersama (grid 2 kolom desktop, bertumpuk dalam bingkai yang sama di mobile).
  - `system`: komposisi terkunci grid rapat, label mono, rasio dari `image` (4:3-ish untuk SVG diagram).
  - `cinematic`: bingkai `aspect-video` selebar penuh area konten + afordans "Tonton" (link `externalLink`).
- Create: `components/projects/exhibition/ExhibitionCorridor.tsx` — ruang napas + pratinjau samar `0N — <verba>` bab berikutnya (`aria-hidden`); menerima prop tinggi relatif (lorong terakhir sedikit lebih panjang — UX Flow).
- Create: `components/projects/exhibition/ExhibitionExit.tsx` — penanda akhir benang, siluet `05 — soon` bila `hasDraftProjects()`, CTA tunggal dari `exhibitionRoute.exit`.
- Modify: `app/work/page.tsx` — ambil `getExhibitionChapters()` + `hasDraftProjects()`, susun: Arrival → (Chapter + Corridor)×3 → Chapter 04 → Exit; hapus import/pemakaian `WorkViewSwitcher`; hapus margin khusus `lg:ml-[calc(...)]` lama; perbarui `description` metadata bila perlu.

### Files yang tidak boleh disentuh
`components/projects/WorkViewSwitcher.tsx` (**tidak dihapus** — pensiun di Phase 5), `components/projects/SelectedWork.tsx`, `app/page.tsx`, `app/work/[slug]/**`, `app/layout.tsx`, `app/globals.css` (kecuali benar-benar mustahil tanpa CSS global — bila terjadi, catat alasannya di gate).

### Dependency
Phase 1 approved (memakai `getExhibitionChapters`, `hasDraftProjects`, `exhibitionRoute`).

### Langkah implementasi (berurutan)

- [ ] **2.1** Bangun `ExhibitionArrival` (viewport pertama nyaris kosong; indeks verba; typografi display `tracking-tight`; token zinc + `dark:` lengkap). Review di dev server sebelum lanjut.
- [ ] **2.2** Bangun kerangka `ExhibitionChapter` dengan varian `expressive` (GRS) lengkap: beat DOM berurutan marker → karya → label plate; rasio ter-reservasi; `next/image` dengan `sizes`; hover affordance CSS murni (`group-hover`, `motion-reduce:` aman karena hanya transisi).
- [ ] **2.3** Tambah varian `duality` (iTailwind) — satu bingkai bersama dua state.
- [ ] **2.4** Tambah varian `system` (Notion) — grid rapat, label Geist Mono.
- [ ] **2.5** Tambah varian `cinematic` (Video) — bingkai terlebar, afordans Tonton (link eksternal, `target="_blank"` + `rel` sesuai pola repo).
- [ ] **2.6** Bangun `ExhibitionCorridor` (termasuk garis benang statis sebagai elemen dekoratif hairline yang menerus secara visual) dan `ExhibitionExit` (siluet draft + CTA).
- [ ] **2.7** Ganti isi `app/work/page.tsx` dengan komposisi rute penuh; pastikan tidak ada `"use client"` di satu pun file fase ini.
- [ ] **2.8** Pass responsif: cek 360px, 768px, 1024px+, dan pass tema gelap — perbaiki di tempat.
- [ ] **2.9** Verifikasi penuh + commit: `feat(work): komposisi statis exhibition route (phase 2)`.

### Acceptance Criteria
- Rute lengkap Arrival → 4 bab → 3 lorong → Exit → CTA tampil sesuai urutan UX Flow.
- **Tes cerita statis lulus:** tanpa motion apa pun, busur ekspresif → dualitas → sistem → sinema terasa dari komposisi saja (dinilai di gate oleh pemilik).
- Empat varian komposisi jelas berbeda satu sama lain; Ch04 termegah.
- Struktur semantik benar: satu `h1`, empat `section` ber-`h2`; urutan fokus keyboard = urutan cerita; lorong dekoratif.
- Kedua tema dan mobile utuh; tidak ada teks kalimat penghubung di halaman; anggaran kata terjaga.
- `WorkViewSwitcher` tidak lagi di-import mana pun (`grep -rn "WorkViewSwitcher" app components` hanya menyisakan file komponennya sendiri).

### Definition of Done
Semua langkah tercentang; AC terpenuhi; verifikasi segar; satu commit; gate (dengan review visual) dilewati.

### Verification Checklist
- [ ] `npx eslint app/work/page.tsx components/projects/exhibition/*.tsx` → 0 error.
- [ ] `npx tsc --noEmit` → 0 error.
- [ ] `npm run build` → sukses.
- [ ] `npm run dev` → review `/work`: dua tema, tiga lebar viewport; screenshot/tunjukkan untuk gate.
- [ ] Navigasi keyboard: Tab menyusuri pintu bab berurutan 01→04, focus ring terlihat.
- [ ] `grep -rn "use client" components/projects/exhibition/` → kosong.
- [ ] `grep -rn "WorkViewSwitcher" app/ components/ --include="*.tsx" -l` → hanya `components/projects/WorkViewSwitcher.tsx`.

### Rollback Strategy
`app/work/page.tsx` lama utuh di history dan `WorkViewSwitcher` belum dihapus → rollback = revert commit fase 2; halaman lama kembali 100% tanpa kerja tambahan.

### Risiko implementasi
- **Kualitas aset saat tampil besar** (cover PNG 1200px, SVG) — audit per bab di langkah 2.8; aset lembek dicatat untuk diekspor ulang (keputusan konten di gate, bukan alasan mengecilkan komposisi).
- Komposisi statis "belum terasa bercerita" → ini kegagalan desain yang justru ingin ditangkap fase ini; iterasi komposisi terjadi di sini, bukan ditambal motion di fase 3.
- GIF vitrine berat → di fase ini dirender kecil + lazy bawaan; keputusan final di Phase 5.

### Estimasi kompleksitas
**Sedang–tinggi.** Fase terbesar: 4 file komponen baru + 1 halaman, dan seluruh keputusan komposisi visual dieksekusi di sini.

### 🔒 Design Review Gate 2
Tunjukkan halaman statis di kedua tema + mobile. Pertanyaan gate utama ke pemilik: **"Apakah halaman ini sudah bercerita tanpa motion?"** Bila belum, iterasi komposisi di fase ini. **Berhenti; lanjut hanya setelah disetujui.**

---

## Phase 3 — Fondasi Motion (L1 beat + kerangka L2)

### Goal
Sistem motion dasar hidup: beat reveal ber-stagger, settle/wake dua arah, benang yang menggambar diri — dengan jaminan no-JS dan reduced-motion identik dengan Phase 2.

### Scope
- Boundary LazyMotion + konteks reduced-motion.
- Primitif `RevealSequence`/`RevealItem`.
- `ChapterSettle` (pemetaan kontinu — perkenalan `useScroll`/`useTransform` ke repo).
- `RouteThread` hidup.
- Konstanta timing/threshold terpusat.

### Files yang disentuh
- Create: `components/projects/exhibition/motion-constants.ts` — satu modul untuk zona aktivasi (viewport margin ~15–25%), durasi, stagger 100–150 ms, jangkauan settle (redup ke ~60%, susut halus), jangkauan parallax ±5–8% (dipakai fase 4).
- Create: `components/projects/exhibition/ExhibitionMotionBoundary.tsx` (`"use client"`) — `LazyMotion features={domAnimation}` + penyedia flag `useReducedMotion` untuk anak-anaknya; menerapkan pola hidden-after-mount (keadaan tersembunyi pra-reveal hanya setelah hydration; SSR = keadaan akhir).
- Create: `components/projects/exhibition/RevealSequence.tsx` (`"use client"`) — export `RevealSequence` (parent, satu observer per tahap, `once: true`) dan `RevealItem` (child ber-stagger); reduced-motion → merender anak apa adanya.
- Create: `components/projects/exhibition/ChapterSettle.tsx` (`"use client"`) — `useScroll` target section + `useTransform` → opacity/scale kontinu dua arah; motion values langsung, tanpa state React.
- Create: `components/projects/exhibition/RouteThread.tsx` (`"use client"`) — hairline `scaleY` dari progres kontainer rute; `aria-hidden`; reduced-motion → garis statis penuh (visual Phase 2).
- Modify: `app/work/page.tsx` — bungkus rute dengan `ExhibitionMotionBoundary`; pasang `RouteThread`.
- Modify: `ExhibitionArrival.tsx`, `ExhibitionChapter.tsx`, `ExhibitionCorridor.tsx`, `ExhibitionExit.tsx` — bungkus beat dengan `RevealSequence`/`RevealItem` dan bab dengan `ChapterSettle` **tanpa mengubah DOM/semantik** (wrapper murni).

### Files yang tidak boleh disentuh
Semua di luar `app/work/page.tsx` + folder `exhibition/`. Khususnya: `app/globals.css`, komponen non-exhibition, `data/**`, `content/**`.

### Dependency
Phase 2 approved (struktur yang dibungkus harus final dulu — membungkus struktur yang masih berubah = kerja dua kali).

### Langkah implementasi (berurutan)

- [ ] **3.1** Buat `motion-constants.ts` (semua angka timing/threshold di satu tempat — aturan mitigasi debugging Tech Spec §11).
- [ ] **3.2** Buat `ExhibitionMotionBoundary` dengan pola hidden-after-mount; verifikasi di dev: view-source/disable-JS → konten terlihat penuh.
- [ ] **3.3** Buat `RevealSequence`/`RevealItem`; terapkan dulu **hanya di Chapter 01**; verifikasi urutan beat marker → karya → label dan `once: true` (scroll balik tidak mengulang).
- [ ] **3.4** Terapkan `RevealSequence` ke Arrival, bab 02–04, lorong (pratinjau verba = item paling lambat — pakai konstanta durasi lorong), Exit.
- [ ] **3.5** Buat `ChapterSettle`; terapkan ke keempat bab; verifikasi dua arah (scroll turun & naik) dan "satu suara": saat bab N mengendap, bab N+1 bangun.
- [ ] **3.6** Buat `RouteThread` + pasang di page; verifikasi reduced-motion → garis statis penuh.
- [ ] **3.7** Tes tiga kondisi wajib: (a) JS dimatikan → identik Phase 2; (b) `prefers-reduced-motion` OS aktif → identik Phase 2; (c) bandingkan layout sebelum/sesudah hydration → nol pergeseran.
- [ ] **3.8** Verifikasi penuh + commit: `feat(work): fondasi motion exhibition route (phase 3)`.

### Acceptance Criteria
- Beat reveal urut dan sekali jalan di semua tahap; stagger sesuai konstanta.
- Settle/wake kontinu, dua arah, konsisten — penegakan "satu karya berbicara".
- Benang menggambar diri mengikuti progres; dekoratif (`aria-hidden`).
- **Tiga kondisi 3.7 lulus semua** — ini AC terpenting fase ini.
- Tidak ada properti selain `transform`/`opacity` yang dianimasikan (audit kode).
- Tidak ada re-render per frame (settle/thread memakai motion values, bukan state).

### Definition of Done
Semua langkah tercentang; AC terpenuhi dengan bukti; verifikasi segar; satu commit; gate dilewati.

### Verification Checklist
- [ ] `npx eslint components/projects/exhibition/*.tsx components/projects/exhibition/*.ts app/work/page.tsx` → 0 error.
- [ ] `npx tsc --noEmit` → 0 error; `npm run build` → sukses.
- [ ] Dev server: rekam/tunjukkan beat + settle/wake dua arah.
- [ ] DevTools → disable JavaScript → reload `/work` → seluruh konten terlihat (= Phase 2).
- [ ] Emulasi `prefers-reduced-motion: reduce` → tidak ada motion, halaman utuh.
- [ ] Cek CLS: elemen tidak bergeser saat hydration (bandingkan visual sebelum/sesudah).
- [ ] `grep -n "animate" components/projects/exhibition/*.tsx` — audit manual: hanya transform/opacity.

### Rollback Strategy
Wrapper bersifat aditif: revert commit fase 3 mengembalikan halaman statis Phase 2 yang sudah approved. Bila hanya satu primitif bermasalah (mis. `ChapterSettle`), primitif itu bisa dilepas sendiri karena wrapper tidak saling bergantung.

### Risiko implementasi
- `useScroll`/`useTransform` pertama kali di repo — dijinakkan dengan dua komponen kecil terisolasi (3.5, 3.6) sebelum dipakai lebih luas; bila perilakunya bermasalah dengan struktur halaman, kendala dicatat dan alternatif diusulkan di gate (bukan mengubah experience).
- Kebocoran initial-state ke SSR → tertangkap langkah 3.7a; constraint keras #4.
- Observer threshold terasa salah secara rasa → angka di `motion-constants.ts`, tuning final di Phase 5, jangan tuning berkepanjangan di sini.

### Estimasi kompleksitas
**Sedang–tinggi.** File kecil-kecil tapi wilayah teknik baru bagi repo; kualitas fase ini menentukan mudah/susahnya Phase 4.

### 🔒 Design Review Gate 3
Tunjukkan motion dasar berjalan + bukti tiga kondisi 3.7. Pertanyaan gate: apakah ritme dasar (beat, serah-terima, benang) sudah terasa "tenang dan premium", belum perlu aksen? **Berhenti; lanjut hanya setelah disetujui.**

---

## Phase 4 — Aksen Bab + Kedalaman

### Goal
Empat aksen tanda tangan (satu per bab) dan parallax karya utama hidup — motion menjadi karakterisasi, bukan dekorasi.

### Scope
- `ParallaxFigure` untuk karya utama bab.
- Empat komponen aksen, dikerjakan dan diuji **satu per satu**.

### Files yang disentuh
- Create: `components/projects/exhibition/ParallaxFigure.tsx` (`"use client"`) — offset vertikal ±5–8% (konstanta) via `useScroll`/`useTransform`; reduced-motion → statis.
- Create: `components/projects/exhibition/AccentIterations.tsx` — Ch01: stagger berlapis vitrine (rasa iterasi).
- Create: `components/projects/exhibition/AccentDuality.tsx` — Ch02: crossfade dua state dalam satu bingkai; kedua gambar dimuat lazy bersamaan; sebelum siap → state pertama tampil; reduced-motion → dua state terlihat bersamaan (komposisi Phase 2).
- Create: `components/projects/exhibition/AccentPipeline.tsx` — Ch03: elemen masuk berurutan timing presisi, lalu diam total.
- Create: `components/projects/exhibition/AccentCinematic.tsx` — Ch04: bingkai membuka melebar (scale/clip via transform) sekali jalan; video tidak pernah autoplay.
- Modify: `ExhibitionChapter.tsx` — slot aksen per `composition` (aksen membungkus slot karya yang sudah ada; DOM tetap).

### Files yang tidak boleh disentuh
Semua di luar folder `exhibition/`. `motion-constants.ts` boleh ditambah konstanta aksen (modify).

### Dependency
Phase 3 approved (aksen menumpang `RevealSequence`/`ChapterSettle`/boundary; `ParallaxFigure` memakai pola `useScroll` yang sudah terbukti di 3.5–3.6).

### Langkah implementasi (berurutan)

- [ ] **4.1** Buat + pasang `ParallaxFigure` pada karya utama keempat bab; verifikasi: hanya karya utama yang ber-kedalaman; reduced-motion statis.
- [ ] **4.2** `AccentIterations` (Ch01) → uji terisolasi: aksen memerankan "merancang", tidak bentrok beat/settle → baru lanjut.
- [ ] **4.3** `AccentDuality` (Ch02) → uji: crossfade terbaca "satu karya dua wajah"; reduced-motion menampilkan dua state; mobile (bertumpuk satu bingkai) tetap benar.
- [ ] **4.4** `AccentPipeline` (Ch03) → uji: setelah urutan selesai, bab diam sempurna (karakter bab ini).
- [ ] **4.5** `AccentCinematic` (Ch04) → uji: membuka melebar sekali; afordans Tonton tetap link murni; tidak ada autoplay.
- [ ] **4.6** Pass integrasi: scroll penuh atas-bawah-atas; pastikan tidak ada bab dengan dua aksen dan tidak ada aksen yang bocor ke lorong.
- [ ] **4.7** Verifikasi penuh + commit: `feat(work): aksen bab & parallax exhibition route (phase 4)`.

### Acceptance Criteria
- Tiap aksen lulus "tes satu kalimat" Design Spec (dinilai di gate per bab: aksen ini mengarahkan/memperjelas/meritmekan/menyambungkan apa?).
- Satu aksen per bab, terisolasi per komponen; menghapus satu file aksen tidak menyentuh bab lain.
- Parallax hanya di karya utama; jangkauan sesuai konstanta.
- Reduced-motion menggugurkan semua aksen dengan benar (dualitas → dua state bersamaan).
- Tidak ada regresi Phase 3 (beat, settle/wake, benang tetap benar).

### Definition of Done
Semua langkah tercentang; AC terpenuhi; verifikasi segar; satu commit; gate dilewati.

### Verification Checklist
- [ ] `npx eslint components/projects/exhibition/*.tsx` → 0 error; `npx tsc --noEmit` → 0 error; `npm run build` → sukses.
- [ ] Dev server: demonstrasi per bab (4 aksen + parallax), dua arah scroll.
- [ ] Reduced-motion: keempat aksen gugur; Ch02 menampilkan dua state.
- [ ] Disable JS: halaman = Phase 2 (aksen aditif, tidak merusak baseline).
- [ ] Mobile viewport: aksen tidak merusak komposisi bertumpuk.

### Rollback Strategy
Aksen aditif dan terisolasi: revert commit fase 4 → kembali ke Phase 3; atau lepas satu aksen bermasalah tanpa menyentuh lainnya (cukup lepas pemasangannya di `ExhibitionChapter`).

### Risiko implementasi
- Aksen bentrok dengan beat/settle (dua sistem menganimasikan elemen sama) → aturan: aksen hanya menganimasikan elemen **di dalam** slot karya, beat menganimasikan slot-nya — batas kepemilikan ditulis sebagai komentar di `ExhibitionChapter`.
- Jank parallax di perangkat lemah → urutan mitigasi Tech Spec §11: kecilkan jangkauan dulu, gugurkan parallax mobile sebagai opsi terakhir (settle/wake dipertahankan).
- Aksen terasa gimmick di mata pemilik → itulah fungsi gate per fase; aksen direvisi/disederhanakan di fase ini.

### Estimasi kompleksitas
**Sedang.** Pola teknik sudah terbukti di Phase 3; kesulitannya rasa, bukan teknik.

### 🔒 Design Review Gate 4
Demonstrasi per bab. Pertanyaan gate per aksen: lulus tes satu kalimat? subtle atau gimmick? **Berhenti; lanjut hanya setelah disetujui.**

---

## Phase 5 — Polish & Pengerasan

### Goal
Halaman dinyatakan selesai: tuning rasa, keputusan aset final, audit performa + aksesibilitas + perangkat nyata, dan bersih-bersih.

### Scope
- Tuning konstanta timing/threshold berdasarkan rasa di perangkat nyata.
- Keputusan final GIF vitrine Ch01.
- Audit performa, aksesibilitas, dan guardrails.
- Hapus `WorkViewSwitcher`.

### Files yang disentuh
- Modify: `components/projects/exhibition/motion-constants.ts` — tuning final.
- Modify (bila keputusan aset berubah): `content/projects/grs.ts` + aset di `public/projects/grs/` (konversi GIF → frame statis/video loop; file GIF lama tidak dihapus dari repo tanpa persetujuan).
- Delete: `components/projects/WorkViewSwitcher.tsx`.
- Modify (bila audit menemukan): file exhibition terkait, perbaikan kecil.

### Files yang tidak boleh disentuh
Semua permukaan non-`/work`. Tidak ada fitur baru di fase ini — polish bukan pintu belakang scope.

### Dependency
Phase 4 approved.

### Langkah implementasi (berurutan)

- [ ] **5.1** Ukur bobot halaman `/work` (Network tab, cache kosong): total, dan porsi GIF vitrine. Laporkan angka nyata.
- [ ] **5.2** Putuskan bersama pemilik nasib GIF (tetap / frame statis / video loop) berdasarkan angka 5.1; eksekusi keputusannya.
- [ ] **5.3** Uji perangkat nyata (minimal satu iPhone/Safari iOS dan satu Android/Chrome): kehalusan scroll, settle/wake, parallax, `svh`, sentuh. Catat temuan; perbaiki yang bisa; kendala yang tidak bisa → dokumentasikan + usulkan alternatif (jangan ubah experience diam-diam).
- [ ] **5.4** Tuning `motion-constants.ts` berdasarkan rasa perangkat nyata (zona aktivasi, durasi, stagger).
- [ ] **5.5** Audit aksesibilitas penuh: struktur heading, tab order, `aria-label` pintu, alt text semua karya, kontras dua tema, reduced-motion end-to-end.
- [ ] **5.6** Baca ulang **12 guardrails Design Spec** satu per satu terhadap halaman jadi; laporkan kepatuhan butir demi butir.
- [ ] **5.7** Hapus `components/projects/WorkViewSwitcher.tsx`; `grep -rn "WorkViewSwitcher"` di seluruh repo → nol hasil.
- [ ] **5.8** Sapu bersih akhir: `npx eslint` seluruh file tersentuh proyek ini, `npx tsc --noEmit`, `npm run build`; smoke test rute lain (`/`, `/work/[slug]`, `/writing`) memastikan tidak ada efek samping.
- [ ] **5.9** Commit: `feat(work): polish & pengerasan exhibition route (phase 5)`.

### Acceptance Criteria
- Angka bobot halaman dilaporkan; keputusan GIF dieksekusi dan disetujui pemilik.
- Temuan perangkat nyata terdokumentasi; tidak ada jank yang mematahkan rasa "tenang".
- Audit aksesibilitas lulus semua butir 5.5.
- Laporan kepatuhan 12 guardrails: seluruhnya patuh (atau pelanggaran dicatat + diperbaiki sebelum gate).
- `WorkViewSwitcher` hilang dari repo; tidak ada rute lain yang terpengaruh.

### Definition of Done
Semua langkah tercentang; AC terpenuhi; verifikasi segar; commit rapi; **gate final = pernyataan selesai proyek**.

### Verification Checklist
- [ ] `npx tsc --noEmit` → 0 error; `npm run build` → sukses.
- [ ] `npx eslint components/projects/exhibition/ app/work/page.tsx data/exhibition.ts` → 0 error.
- [ ] `grep -rn "WorkViewSwitcher" --include="*.ts*" .` (di luar `node_modules`) → nol hasil.
- [ ] Bukti uji perangkat nyata (catatan/rekaman) dilampirkan ke gate.
- [ ] Laporan guardrails 12 butir dilampirkan ke gate.
- [ ] Smoke test `/`, `/work/<slug salah satu>`, `/writing` normal.

### Rollback Strategy
Perubahan fase ini kecil dan tersebar: revert commit fase 5 mengembalikan Phase 4 (fungsional penuh). Penghapusan `WorkViewSwitcher` aman di-revert karena file utuh di history.

### Risiko implementasi
- Temuan perangkat nyata besar (mis. jank sistemik iOS) → eskalasi ke pemilik dengan opsi mitigasi Tech Spec; jangan menambal dengan mengubah experience.
- Scope creep "sekalian polish X" → ditolak; fase ini hanya untuk daftar di atas.

### Estimasi kompleksitas
**Sedang.** Sedikit kode, banyak verifikasi — dan verifikasi adalah pekerjaannya.

### 🔒 Design Review Gate 5 (Final)
Laporan lengkap: bobot halaman, hasil perangkat nyata, audit a11y, kepatuhan 12 guardrails, konfirmasi halaman = visi tiga spec. Setelah disetujui: proyek dinyatakan selesai; langkah lanjutan (merge/PR/keep) diputuskan pemilik — bukan bagian plan ini.

---

## Self-review plan (sudah dijalankan saat penulisan)

- **Cakupan spec:** Tech Spec §1–§12 terpetakan → §3 data (Phase 1), §2+§8 komposisi/mobile (Phase 2), §4+§7+§9 motion/a11y/enhancement (Phase 3, diaudit ulang Phase 5), §5 aksen (Phase 4), §6+§10+§11 performa/constraint/risiko (tersebar + Phase 5). Guardrails Design Spec diaudit eksplisit di 5.6. Lensa UX Flow (mobile, reduced-motion, attention) menjadi AC di fase terkait.
- **Placeholder:** dua titik yang butuh input pemilik ditulis sebagai keputusan runtime fase dengan perilaku default yang jelas (nilai `year` → opsional, tanpa mengarang; `ctaHref` → konfirmasi di Phase 1 gate), bukan TBD.
- **Konsistensi nama:** `exhibitionRoute`, `getExhibitionChapters`, `ChapterViewModel`, `hasDraftProjects`, `ExhibitionCompositionVariant`, nama komponen `Exhibition*`/`Accent*`/`RevealSequence`/`RevealItem`/`ChapterSettle`/`ParallaxFigure`/`RouteThread`, `motion-constants.ts` — dipakai konsisten lintas fase.
