# Technical Specification — `/work` "Exhibition Route"

| | |
|---|---|
| **Status** | Draft untuk review |
| **Tanggal** | 10 Juli 2026 |
| **Dokumen induk** | [Design Specification](./2026-07-10-work-exhibition-route-design.md) · [UX Flow Specification](./2026-07-10-work-exhibition-route-ux-flow.md) |
| **Cakupan** | Blueprint implementasi halaman `/work` |
| **Prioritas konflik** | Design Spec dan UX Flow Spec **selalu menang** atas dokumen ini |

Dokumen ini menerjemahkan visi dan blueprint pengalaman menjadi rencana implementasi. Bila implementasi menemui kendala teknis, **experience tidak diubah** — kendalanya didokumentasikan dan alternatif yang mempertahankan filosofi diusulkan lewat revisi dokumen ini.

---

## 1. Architecture Overview

### Prinsip arsitektur: struktur dulu, cahaya kemudian

Design Spec menuntut "struktur harus bercerita meski motion mati" (prinsip #7). Arsitektur implementasi menjadikannya bukan sekadar aspirasi tetapi **sifat bawaan konstruksi**:

- **Lapisan struktur (server).** Halaman `/work` tetap Server Component. Seluruh rute — Arrival, Hero, empat Chapter, lorong, Exit, CTA — dirender lengkap di server dalam **keadaan akhir** (final state), semantik penuh, tanpa dependensi JavaScript. Inilah pengalaman reduced-motion dan no-JS sekaligus: bukan fallback yang dirawat terpisah, melainkan fondasi yang selalu ada.
- **Lapisan cahaya (client).** Motion ditambahkan oleh Client Component kecil berbentuk *wrapper* yang hanya memanipulasi `transform` dan `opacity`. Wrapper tidak pernah mengubah layout, urutan DOM, atau semantik. Mencabut seluruh lapisan ini mengembalikan halaman ke lapisan struktur yang utuh.

### Keputusan teknologi motion: framer-motion, bukan GSAP

Kebutuhan motion halaman ini (reveal on-view, parallax halus, pemetaan progres scroll ke transform, stagger, reduced-motion) seluruhnya berada dalam kemampuan `framer-motion` yang **sudah terpasang dan sudah menjadi pola repo** (`LazyMotion` + `domAnimation` + `m`). Menambah GSAP berarti: dependensi baru (melanggar aturan repo "jangan tambah dependensi untuk kebutuhan yang sudah terlayani"), model imperatif yang bergesekan dengan pola hydration React/Next di repo ini, dan dua sistem animasi paralel yang harus dirawat. GSAP baru layak dipertimbangkan ulang bila suatu hari desain membutuhkan pinning/scrubbing kompleks — yang justru **dilarang** oleh guardrail #3. Yang akan menjadi hal baru bagi repo: `useScroll`/`useTransform` (belum pernah dipakai di sini) — dicakup oleh Phase 3 sebagai fondasi yang diuji tersendiri.

### Peta kesesuaian dengan dokumen induk

| Tuntutan dokumen induk | Jawaban arsitektur |
|---|---|
| Scroll 100% milik pengunjung | Tidak ada scroll-jacking/snap/pinning; semua motion adalah *pembacaan* posisi scroll |
| Satu karya bicara pada satu waktu | Settle/wake dipetakan kontinu dari posisi tiap chapter di viewport |
| Struktur bercerita tanpa motion | Server merender keadaan akhir; motion hanya lapisan di atasnya |
| Anggaran teks < ~40 kata | Seluruh teks rute hidup di satu file konten dengan anggaran terdokumentasi |
| Karya baru wajib identitas bab | Validasi build yang gagal keras (pola guard yang sudah ada di `data/projects.ts`) |

## 2. Component Architecture

Folder fitur baru: `components/projects/exhibition/` (mengikuti aturan feature-folder repo; `/work` adalah bagian dari fitur projects).

### Komponen server (struktur — bukan client)

| Komponen | Tanggung jawab |
|---|---|
| `app/work/page.tsx` | Composition root: ambil data, gabungkan dengan konten rute, validasi, susun tahap-tahap. Tetap ramping — hanya glue |
| `ExhibitionArrival` | Arrival + Hero: identitas halaman, indeks empat kata kerja (floor plan) |
| `ExhibitionChapter` | Kerangka satu bab: marker (numeral, verba, kategori/tahun), slot karya, label plate, link pintu ke detail. Menerima identitas bab + project sebagai props; **satu komponen untuk empat bab** — variasi komposisi lewat varian, bukan empat komponen berbeda |
| `ExhibitionCorridor` | Lorong: ruang napas + slot pratinjau verba berikutnya |
| `ExhibitionExit` | Ujung rute: penanda akhir, siluet draft `05 — soon` (bila ada), CTA tunggal |

### Komponen client (cahaya — leaf, `"use client"`)

| Komponen | Tanggung jawab | Reusable? |
|---|---|---|
| `ExhibitionMotionBoundary` | Satu-satunya boundary `LazyMotion features={domAnimation}` untuk halaman; juga sumber konteks reduced-motion | Halaman ini |
| `RevealSequence` / `RevealItem` | Primitif beat reveal: anak-anaknya muncul ber-stagger saat masuk viewport, sekali saja. Dipakai semua tahap | **Ya** — kandidat reuse lintas fitur |
| `ChapterSettle` | Pemetaan kontinu progres bab → redup/menyusut saat keluar, bangun saat masuk ("satu suara") | Halaman ini |
| `ParallaxFigure` | Parallax halus ±5–8% khusus karya utama | **Ya** — primitif umum |
| `RouteThread` | Benang hairline yang menggambar diri mengikuti progres rute; murni dekoratif (`aria-hidden`) | Halaman ini |
| `AccentIterations` | Aksen Ch01: stagger berlapis materi vitrine | Spesifik bab |
| `AccentDuality` | Aksen Ch02: crossfade dua state dalam satu bingkai | Spesifik bab |
| `AccentPipeline` | Aksen Ch03: elemen masuk berurutan timing presisi, lalu diam | Spesifik bab |
| `AccentCinematic` | Aksen Ch04: bingkai membuka melebar + afordans tonton | Spesifik bab |

### Aturan hubungan antar komponen

- Server components **memiliki** DOM, semantik, dan layout. Client components hanya **membungkus** dan menganimasikan `transform`/`opacity` pada apa yang sudah ada.
- Aksen bab adalah komponen terisolasi: masing-masing bisa dihapus tanpa menyentuh bab lain — sejalan dengan "satu aksen per bab" dan memudahkan debugging.
- Komponen bersama yang dipakai: `next/image`, `Link`, ikon dari `design-system/icons.tsx`. `ProjectTag` sengaja **tidak** dipakai — rute tidak menampilkan tags (lapis informasi 4).
- **Pensiun:** `WorkViewSwitcher` tidak lagi dipakai `/work`. File dihapus di fase terakhir setelah pengganti terverifikasi (bukan di awal, supaya rollback murah).

## 3. Data Flow

### Alur

```
content/projects/*.ts            (entri project — Project Architecture v1, tidak berubah)
        │  auto-discovery (fs.readdir + dynamic import, guard gagal-keras)
        ▼
data/projects.ts                 getPublishedProjects() — pintu publik, tetap
        │
        ▼
content/work/exhibition.ts       ★ BARU — konten kurasi rute:
        │                          urutan bab (array slug), identitas bab per slug
        │                          (verba, emosi target, varian komposisi/aksen),
        │                          teks Arrival/Exit/CTA (anggaran kata terdokumentasi)
        ▼
app/work/page.tsx                gabung + VALIDASI (lihat bawah) → view-model per tahap
        │
        ▼
komponen Exhibition*             render struktur → wrapper motion menghidupkan
```

### Keputusan penting: urutan bab milik rute, bukan `order`

`project.order` juga dikonsumsi `SelectedWork` di home — memakainya untuk urutan bab akan mengubah urutan home sebagai efek samping. Maka **urutan bab ditentukan oleh urutan array di `content/work/exhibition.ts`** (GRS → iTailwind → Notion Auto Status → Video Vokasi), dan `project.order` tetap menjadi urutan tampilan permukaan lain. Kurasi rute adalah keputusan rute; ini juga konsisten dengan keputusan desain bahwa narasi milik rute, bukan milik project.

### Validasi (gagal keras saat build, meniru guard slug duplikat yang ada)

1. Setiap slug di array rute harus merujuk project **published** — slug asing/draft menggagalkan build.
2. Setiap project published harus terdaftar di rute **tepat satu kali** — project published tanpa identitas bab menggagalkan build. Ini adalah guardrail #7 Design Spec ("tidak ada tempel di akhir") yang ditegakkan mesin: mempublikasikan karya baru *memaksa* kurator menuliskan identitas babnya.

### Perubahan tipe & data (kecil, backward-compatible)

- `types/project.ts`: tambah field opsional `year` — dibutuhkan label plate (judul, kategori, tahun). Keempat project di-backfill.
- `types/exhibition.ts` (baru): bentuk identitas bab (verba, varian komposisi, varian aksen, emosi target sebagai dokumentasi) dan bentuk konten rute.
- `data/projects.ts`: tambah satu gate minimal untuk teaser Exit — cukup "apakah ada draft" (dan nomor bab berikutnya = jumlah published + 1). Detail draft **tidak** dibocorkan ke UI; siluet hanya butuh keberadaannya.
- Penambahan project di masa depan tetap satu file (Architecture v1); **bergabung ke pameran** adalah langkah kurasi kedua yang disengaja di `exhibition.ts` — dan build yang memaksa langkah itu terjadi.

## 4. Scroll & Motion Architecture

Sistem motion terdiri dari tiga lapis di atas struktur statis:

### L0 — Struktur (server, tanpa motion)
Keadaan akhir semua elemen. Baseline reduced-motion dan no-JS.

### L1 — Beat reveal (diskrit, sekali jalan)
- **Mekanisme:** observasi viewport (`whileInView`/`useInView`, `once: true`) pada level *sequence* per tahap — satu observer per tahap, bukan per elemen.
- **Urutan:** marker → karya → label plate, stagger 100–150 ms lewat varian parent-children — urutan membaca dari UX Flow ditegakkan oleh sequencing, bukan kebetulan.
- **Zona aktivasi:** reveal terpicu saat tahap masuk ~15–25% ke dalam viewport (konstanta terpusat, dituning di Phase 5). `once: true` berarti scroll balik tidak memutar ulang beat — karya yang sudah "berbicara" tidak berpidato dua kali.

### L2 — Pemetaan kontinu (mengikuti scroll, dua arah)
- **Mekanisme:** `useScroll` dengan target section + `useTransform` → motion values yang langsung menggerakkan `transform`/`opacity` **tanpa melewati state React** (tidak ada re-render per frame).
- **Settle/wake** (`ChapterSettle`): progres keluar-masuk bab dipetakan ke redup (→ ~60%) dan menyusut halus. Kontinu dan dua arah — scroll naik pun konsisten. Inilah penegakan teknis "satu karya berbicara".
- **Parallax** (`ParallaxFigure`): offset vertikal ±5–8% hanya pada karya utama bab.
- **Benang** (`RouteThread`): progres kontainer rute dipetakan ke `scaleY` garis (transform murni, bukan animasi `height`).
- **Pemetaan langsung tanpa spring/smoothing** pada versi pertama — deterministik, murah, dan "merespons scroll" secara harfiah. Spring hanya dipertimbangkan di Phase 5 bila pemetaan langsung terasa kaku di perangkat nyata.

### Lifecycle aktivasi bab

```
jauh di bawah viewport ──(masuk zona aktivasi)──▶ BEAT REVEAL (sekali)
                                                      │
                                                      ▼
                                                    AKTIF (penuh, terang)
                                                      │ (mulai keluar viewport)
                                                      ▼
                                                   MENGENDAP (redup/susut, kontinu)
                                                      │ (scroll balik)
                                                      ▼
                                                    BANGUN (kembali terang; beat tidak diulang)
```

Counter `01 / 04` bersifat **statis di marker tiap bab** (server-rendered) — bukan elemen melayang yang butuh JavaScript. `RouteThread` adalah satu-satunya elemen kemajuan yang hidup, dan dia dekoratif.

### Sinkronisasi

Tidak ada penulisan ke scroll (no `scrollTo`, no snap, no body lock). Semua nilai turunan scroll dibaca via API framer-motion yang teruji; tidak ada listener scroll manual.

## 5. Animation Responsibility

Semua animasi di tabel ini: properti `transform`/`opacity` saja; semuanya digugurkan oleh reduced-motion (§7).

| Tahap | Yang dianimasikan | Mulai | Selesai | Trigger | Dependency |
|---|---|---|---|---|---|
| Arrival | Reveal halus identitas halaman (sekali, saat load) | Setelah hydration | < 1 detik | Mount | `ExhibitionMotionBoundary` |
| Hero | Stagger empat verba indeks; benang mulai menggambar | Masuk viewport (umumnya langsung) | Selesai stagger | `RevealSequence` | Boundary |
| Ch01 | Beat marker→karya→label; parallax poster; **aksen:** stagger berlapis vitrine | Zona aktivasi bab | Beat: sekali; parallax/settle: kontinu | L1 + L2 | `RevealSequence`, `ParallaxFigure`, `ChapterSettle`, `AccentIterations` |
| Lorong (×3) | Benang berlanjut; pratinjau verba berikutnya fade paling lambat; serah-terima settle/wake di tepi | Progres scroll lorong | Kontinu | L2 (+ L1 untuk pratinjau) | `RouteThread`, `ChapterSettle` |
| Ch02 | Beat standar; **aksen:** crossfade dua state dualitas | Beat: zona aktivasi; crossfade: setelah beat karya selesai | Crossfade: siklus pelan atau sekali-balik | L1 → aksen | `AccentDuality` (butuh `image` + `hoverImage`) |
| Ch03 | Beat standar; **aksen:** elemen masuk berurutan timing presisi → lalu **diam total** | Zona aktivasi | Setelah urutan selesai, tidak ada motion tersisa | L1 | `AccentPipeline` |
| Ch04 | Beat standar; **aksen:** bingkai membuka melebar (scale/clip transform) | Zona aktivasi | Sekali | L1 | `AccentCinematic`; video tidak pernah autoplay — afordans tonton = link |
| Exit | Benang menuntaskan garis; siluet draft fade paling redup & paling lambat | Progres akhir rute | Kontinu → selesai | L2 | `RouteThread` |
| CTA | **Tidak ada** (keputusan UX Flow: elemen keputusan harus stabil) | — | — | — | — |

Aturan lintas-tabel: hover/focus affordance ("pintu" ke detail) adalah transisi CSS murni (bukan framer) — murah, bekerja tanpa hydration selesai, konsisten dengan pola kartu repo.

## 6. Performance Strategy

- **Gambar:** `next/image` untuk semua media; setiap slot punya rasio aspek ter-reservasi (`aspect-*` + parent `relative`) → CLS nol; `sizes` wajib untuk setiap `fill`; **tanpa `priority`** — tidak ada media di atas fold (Arrival sengaja kosong); sisanya lazy bawaan.
- **Risiko terukur — GIF vitrine Ch01** (`day_satu_*.gif`, 1080×1350): GIF tidak dioptimasi `next/image` dan berpotensi ratusan KB–MB. Strategi: dirender kecil (vitrine memang kecil), lazy, dan di Phase 5 dievaluasi konversi ke video loop pendek atau frame statis. Kalau bobot tidak bisa diterima, vitrine memakai frame statis — *rasa proses* dipertahankan tanpa animasi file.
- **Bundle motion:** satu boundary `LazyMotion domAnimation` (~mode ringan framer) untuk seluruh halaman; komponen client bersifat leaf; tidak mengimpor `motion` penuh.
- **Frame budget:** semua animasi `transform`/`opacity` (compositor-friendly); nilai scroll lewat motion values tanpa re-render; observer per tahap bukan per elemen; `will-change` hanya pada karya yang benar-benar ber-parallax.
- **Hydration:** server merender keadaan akhir; wrapper motion menerapkan keadaan "tersembunyi pra-reveal" **hanya setelah mount** (pola hydration-guard yang sudah dipakai repo di Navbar/GlassSurface/HeroWidgets). Konsekuensi: tidak ada konten tak terlihat bila JS gagal, tidak ada mismatch hydration, tidak ada CLS dari motion.
- **Halaman tetap statis** (SSG — tidak ada data runtime); tidak ada perubahan perilaku caching/route.

## 7. Accessibility Strategy

- **Reduced motion:** dua lapis. (1) `useReducedMotion` dari boundary menggugurkan semua L1/L2 — komponen merender keadaan akhir, benang menjadi garis statis penuh. (2) Utility `motion-reduce:` untuk transisi CSS (hover). Hasilnya persis lensa H UX Flow: pameran yang sama dalam keadaan selesai. Tidak ada toggle buatan — murni preferensi sistem.
- **Struktur pembaca layar:** satu `h1` (identitas halaman); tiap bab adalah `section` dengan heading (verba + judul karya); lorong bukan konten (dekoratif — `aria-hidden` untuk pratinjau verba, karena informasi yang sama ada di marker bab berikutnya); rute terbaca sebagai: judul → empat bagian berurutan → penutup. Urutan naratif = urutan DOM.
- **Keyboard:** urutan fokus = urutan DOM = urutan cerita (wrapper motion tidak menyentuh DOM order). Target fokus per bab adalah link pintu (seluruh area karya) dengan `aria-label` deskriptif — pola yang sudah ada di kartu repo. Focus ring memakai gaya focus-visible repo. Tidak ada interaksi yang hanya bisa dicapai lewat hover.
- **Alt text:** label plate visual dilengkapi alt deskriptif per karya — di halaman yang bicara lewat gambar, alt adalah label plate bagi yang tidak melihat (lensa F UX Flow). Elemen murni dekoratif (benang, siluet) `aria-hidden`.
- **Kontras:** semua teks penanda lolos kontras di kedua tema; "nyaris tak terlihat" diterapkan pada elemen dekoratif, bukan pada teks informasi.

## 8. Mobile Strategy

Prinsip UX Flow: **rute tetap rute** — DOM sama, komposisi beradaptasi.

- **Satu kolom, urutan identik.** Tidak ada varian mobile terpisah; breakpoint mengubah komposisi, bukan struktur.
- **Skala relatif:** wall text memakai ukuran responsif sehingga tetap elemen terbesar viewport-nya; Ch04 tetap termegah relatif terhadap layar.
- **Ritme vertikal:** tinggi lorong dan jarak antar tahap memakai satuan `svh` yang **diperpendek proporsional** di layar kecil (ruang kosong terasa 2× lebih panjang di mobile — lensa G). Tidak ada `h-screen`/lock satu layar; semua tinggi content-driven (aturan repo).
- **Dualitas Ch02:** dua state bertumpuk vertikal di dalam **satu bingkai bersama** (border/surface yang sama) supaya tetap terbaca "satu karya dua wajah", bukan dua kartu; crossfade tetap bekerja pada tumpukan.
- **Vitrine Ch01:** menyusut menjadi strip kecil yang mengintip — tidak dihilangkan.
- **Sentuh:** afordans pintu tidak bergantung hover — label plate selalu terlihat, seluruh karya adalah target ketuk besar, state `:active` memberi umpan balik sentuh.
- **Motion di mobile:** L1/L2 tetap jalan (transform murah); parallax diperkecil di viewport pendek agar offset tidak memakan porsi layar. **Wajib diuji di perangkat nyata** — preseden repo (GlassSurface) menunjukkan emulasi desktop menyesatkan.

## 9. Progressive Enhancement

Berkat arsitektur "struktur dulu" (§1), degradasi bukan cabang kode melainkan urutan lapisan yang gugur:

| Kondisi | Pengalaman |
|---|---|
| JS penuh + motion | Pengalaman lengkap: beat, settle/wake, parallax, benang hidup, aksen |
| JS penuh + reduced-motion | Pameran keadaan-selesai; benang statis; struktur memikul cerita |
| JS gagal dimuat | **Sama dengan baris di atas.** SSR sudah berisi keadaan akhir; link adalah anchor murni; gambar dimuat native; hover affordance CSS tetap hidup |
| Gambar gagal | Rasio ter-reservasi menahan layout; alt text tampil; halaman tidak bergeser |

Aturan yang menjaganya: keadaan tersembunyi pra-animasi hanya boleh diterapkan **setelah** JavaScript berjalan (§6, hydration). Tidak pernah di markup server. Ini satu-satunya aturan yang, bila dilanggar, mematahkan seluruh tabel di atas — dijaga sebagai constraint keras (§10).

## 10. Implementation Constraints

1. **Native scroll tidak boleh diambil alih.** Tidak ada scroll-jacking, `scroll-snap` paksa, pinning, smooth-scroll library, atau body lock.
2. **Tidak ada dependensi baru.** framer-motion yang ada mencukupi; GSAP/Lenis/dkk. ditolak by default.
3. **Wrapper motion hanya menganimasikan `transform`/`opacity`** dan tidak pernah mengubah layout, urutan DOM, atau semantik.
4. **Keadaan tersembunyi pra-animasi tidak pernah dirender server.** SSR = keadaan akhir, selalu.
5. **Server Component by default;** `"use client"` hanya di leaf yang butuh hooks/browser API.
6. **Nol layout shift:** semua media punya rasio ter-reservasi; motion tidak menggeser dokumen.
7. **Project Architecture v1 tidak dilanggar:** project baru = satu file; `data/projects.ts` tetap satu-satunya pintu data project; kurasi rute hidup di konten rute, bukan di komponen.
8. **Validasi rute gagal keras saat build** (slug asing, project published tanpa bab) — jangan pernah diam-diam melewatkan.
9. **Anggaran teks Design Spec (< ~40 kata) terdokumentasi di file konten rute** — pelanggaran harus terlihat saat review konten, bukan terkubur di komponen.
10. **`dark:` dan reduced-motion hadir sejak implementasi pertama** setiap komponen — bukan fase polish.
11. **Satu aksen per bab, terisolasi per komponen.** Menambah aksen kedua ke sebuah bab adalah pelanggaran desain, bukan peningkatan.
12. **Jangan menggeneralisasi dini.** Hanya `RevealSequence`/`RevealItem`/`ParallaxFigure` yang didesain reusable; aksen bab tetap feature-local.
13. **Validasi per fase:** `npx eslint` file yang disentuh, `npx tsc --noEmit`, `npm run build` — plus verifikasi visual dua tema.

## 11. Risk Assessment

| Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|
| Bobot GIF vitrine Ch01 merusak performa | Tinggi | Sedang | Render kecil + lazy; Phase 5: konversi ke video loop/frame statis; anggaran halaman diukur sebelum/sesudah |
| Jank animasi scroll-linked di perangkat low-end | Sedang | Tinggi (mematahkan "premium & tenang") | Transform/opacity murni; motion values tanpa re-render; tanpa spring di v1; uji perangkat nyata di Phase 4–5; bila masih jank: kurangi jangkauan parallax dulu, gugurkan parallax mobile sebagai opsi terakhir (settle/wake dipertahankan — dia pembawa cerita, parallax hanya kedalaman) |
| `useScroll`/`useTransform` hal baru bagi repo (belum ada preseden) | Sedang | Sedang | Diperkenalkan terisolasi di Phase 3 pada dua komponen kecil (`RouteThread`, `ChapterSettle`); dipahami dulu sebelum dipakai aksen |
| Perilaku iOS Safari berbeda dari emulasi | Sedang | Sedang | Preseden repo (GlassSurface): wajib uji perangkat nyata sebelum menyatakan selesai; toolbar dinamis diantisipasi dengan `svh` |
| SSR menyembunyikan konten (initial state bocor ke markup) | Rendah bila constraint #4 dipatuhi | Tinggi | Constraint keras #4 + inspeksi manual "matikan JS" sebagai acceptance test Phase 3 |
| Kualitas aset timpang saat tampil besar (cover PNG 1200px, SVG mockup) | Sedang | Sedang | Audit aset per bab di Phase 2 saat komposisi statis berdiri; ekspor ulang aset yang lembek — masalah konten, bukan alasan mengecilkan komposisi |
| Drift antara rute dan project published | Pasti terjadi suatu saat | Rendah (karena tertangkap) | Validasi build gagal keras (§3) mengubah drift dari bug diam menjadi error eksplisit |
| Kompleksitas motion menyulitkan debugging | Sedang | Sedang | Lapisan L0/L1/L2 bisa dimatikan per lapis; aksen terisolasi per komponen; konstanta timing/threshold terpusat di satu modul |
| Halaman panjang menurunkan skor LCP/INP | Rendah | Rendah | Tidak ada media di atas fold; lazy semua gambar; halaman statis |

## 12. Phase Breakdown

Setiap fase berdiri sendiri, bisa diuji independen, dan meninggalkan halaman dalam keadaan bisa dirilis (atau belum menyentuh halaman sama sekali).

### Phase 1 — Fondasi konten & data (belum menyentuh UI)
- Tambah `year` opsional ke `types/project.ts` + backfill 4 project; buat `types/exhibition.ts`; buat `content/work/exhibition.ts` (urutan bab, identitas bab, teks Arrival/Exit/CTA dengan anggaran kata tercatat); tambah gate teaser draft minimal di `data/projects.ts`; tulis validasi rute gagal-keras.
- **Uji:** `tsc` + `build` hijau; validasi terbukti gagal saat sengaja diberi slug asing/project tanpa bab; halaman `/work` lama masih utuh.

### Phase 2 — Komposisi statis (L0: pameran tanpa cahaya)
- Bangun semua komponen server (`ExhibitionArrival/Chapter/Corridor/Exit`); ganti isi `app/work/page.tsx`; `WorkViewSwitcher` berhenti dipakai (file belum dihapus). Seluruh rute berdiri: komposisi per bab (ekspresif/dualitas/sistem/sinema), lorong, benang statis, dua tema, mobile.
- **Uji:** inilah acceptance test terpenting — **halaman statis ini harus sudah bercerita** (tes "hapus semua motion" dari Design Spec prinsip #7). Review visual dua tema + mobile; struktur heading/fokus diperiksa; audit kualitas aset per bab.

### Phase 3 — Fondasi motion (L1 + kerangka L2)
- `ExhibitionMotionBoundary`, `RevealSequence`/`RevealItem` (beat semua tahap), `RouteThread` hidup, `ChapterSettle` (settle/wake), plumbing reduced-motion, pola hidden-after-mount.
- **Uji:** beat urut marker→karya→label; scroll dua arah konsisten; **matikan JS → halaman = Phase 2**; aktifkan reduced-motion OS → halaman = Phase 2; nol CLS (bandingkan layout sebelum/sesudah hydration).

### Phase 4 — Aksen bab + kedalaman
- `ParallaxFigure` pada karya utama; empat aksen (`AccentIterations/Duality/Pipeline/Cinematic`), satu per satu, masing-masing diuji sendiri sebelum lanjut.
- **Uji:** per bab: aksen memerankan verbanya, tidak bentrok dengan beat/settle, lulus "tes satu kalimat"; reduced-motion menggugurkan aksen dengan benar (dualitas → dua state terlihat bersama).

### Phase 5 — Polish & pengerasan
- Tuning konstanta zona aktivasi/timing; keputusan final GIF vitrine (konversi/statis); audit performa (ukur bobot halaman, profil scroll di perangkat nyata termasuk iOS); audit aksesibilitas penuh; hapus `WorkViewSwitcher`; sapu bersih: `eslint` file tersentuh, `tsc`, `build`.
- **Uji:** checklist guardrails Design Spec dibaca ulang satu per satu terhadap hasil akhir; uji perangkat nyata terdokumentasi; halaman dinyatakan selesai hanya setelah verifikasi segar.

---

## Lampiran — Kendala teknis yang diketahui & alternatif yang menjaga filosofi

| Kendala | Alternatif yang dipilih (filosofi utuh) |
|---|---|
| GIF tidak bisa dioptimasi `next/image` | Vitrine kecil + lazy; bila tetap berat → frame statis; *rasa proses* dari komposisi, bukan dari file beranimasi |
| Crossfade butuh dua gambar dimuat | Kedua state Ch02 dimuat lazy bersama saat bab mendekat; sebelum keduanya siap, state pertama tampil — dualitas tetap terbaca dari komposisi |
| Counter hidup butuh JS | Counter statis di marker tiap bab (server); hanya benang yang hidup, dan dia dekoratif |
| Parallax bisa jank di device lemah | Parallax adalah kedalaman, bukan cerita — boleh dikecilkan/digugurkan; settle/wake (pembawa cerita) diprioritaskan |
