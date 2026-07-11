# Reading Design System — Roadmap Implementasi Bertahap

Status: **Roadmap untuk disetujui** · Tanggal: 2026-07-11
Acuan spec: `docs/superpowers/specs/2026-07-11-reading-design-system-spec.md` (disepakati)

## Prinsip eksekusi
- Setiap fase punya **satu tujuan jelas** dan **acceptance criteria** eksplisit.
- Setiap fase **diverifikasi mandiri** (build + visual sebelum/sesudah).
- Setiap fase = **perubahan kecil, mudah direview** (idealnya 1–2 file).
- Setiap fase **dapat di-revert sendiri** tanpa memengaruhi fase lain.
- **Tidak ada migrasi besar dalam satu langkah**; token dan layout dipisah.
- **Content first**: setiap fase dinilai dari "apakah konten lebih mudah dibaca?".
- **Additive dulu, ganti belakangan**: fondasi ditambahkan tanpa mengubah tampilan; halaman bermigrasi satu per satu. Style lama & `.reading` boleh berdampingan selama transisi.

Format acceptance criteria tiap fase: **✅ Boleh berubah · ⛔ Tidak boleh berubah · 🔍 Verifikasi · ✔️ Definisi selesai (DoD) · ↩️ Revert**.

## Peta fase (ringkas)

| Fase | Tujuan | Perubahan visual? | File inti | Ukuran review |
|---|---|---|---|---|
| **1** | Fondasi CSS: primitives + `.reading` (belum dipakai halaman) | Tidak | `app/globals.css` | Kecil (1 file) |
| **2** | Migrasi Writing ke `.reading` (baseline) | Identik/lebih baik | `WritingArticleBody.tsx` (+ page) | Kecil |
| **3a** | Project: prosa pakai token `.reading` (tanpa ubah layout) | Ya (kualitas teks naik) | `app/work/[slug]/page.tsx` | Sedang |
| **3b** | Project: perbaiki **measure** prosa (~386px → ~68ch) | Ya (layout prosa) | `app/work/[slug]/page.tsx` | Sedang |
| **4** | About + prosa lain adopsi `.reading` | Ya | `app/about/page.tsx` (+komponen) | Kecil–sedang |
| **5** | Selaraskan Display weight + utilities Display | Halus | globals.css + halaman terkait | Kecil |
| **6** | (On-demand) tambah list/quote/code/table/caption ke content model | Saat konten butuh | types + renderer | Per kebutuhan |

Urutan wajib: **1 → 2 → 3a → 3b**. Fase 4, 5, 6 menyusul dan boleh ditunda; 6 dipicu kebutuhan konten, bukan dijadwalkan.

---

## Fase 1 — Fondasi CSS (tanpa perubahan tampilan)
**Tujuan:** menaruh sistem `.reading` + primitives di `app/globals.css`. Belum ada halaman yang memakainya, jadi situs tidak berubah.

**Acceptance criteria**
- ✅ **Boleh berubah:** hanya `app/globals.css` — tambahan **additive**: primitives (CSS custom properties: ukuran, line-height, warna-peran `text-strong/body/muted/faint`, `--measure-reading: 68ch`, langkah rhythm) dan kelas scoped `.reading` di `@layer` yang menata elemen turunan semantik (`p, h2/h3/h4, ul/ol/li, blockquote, pre/code, table, figure/figcaption, a, strong/em`) sesuai §4 spec. (Utility Display/UI opsional — boleh ditunda ke Fase 5.)
- ⛔ **Tidak boleh berubah:** tampilan halaman produksi mana pun; aturan CSS existing (arsipreset bg, liquid-glass, equalizer, marquee, bento, bundle glow, dll.) tidak diedit/dihapus; tidak ada file lain yang disentuh; tidak ada renderer/halaman yang mulai memakai `.reading` di fase ini.
- 🔍 **Verifikasi:** `npx tsc --noEmit`, `npx eslint`, `npm run build` hijau; diff **CSS-only & additive**; `git grep "\\breading\\b" app components` menunjukkan **0 konsumen** kelas `.reading`; spot-check visual dev (home, `/writing/[slug]`, `/work/[slug]`) tidak berubah. Opsional: route scratch `/demo/reading` untuk eyeball tiap elemen — **wajib dihapus sebelum fase ditutup**.
- ✔️ **DoD:** build hijau, nol perubahan visual produksi, `.reading` + primitives tersedia dan siap dikonsumsi.
- ↩️ **Revert:** hapus blok CSS yang ditambahkan; tidak ada dependensi fase lain.

---

## Fase 2 — Migrasi Writing ke `.reading` (baseline)
**Tujuan:** `WritingArticleBody` memakai `.reading`; hasil **identik atau lebih baik**. Writing adalah acuan — fase ini membuktikan sistem mereproduksi baseline matang.

**Acceptance criteria**
- ✅ **Boleh berubah:** `components/writing/WritingArticleBody.tsx` (bungkus `<div class="reading">`, keluarkan tag semantik tanpa class per-elemen, hapus `paragraphClass`); `app/writing/[slug]/page.tsx` **hanya** untuk menyelaraskan measure kolom artikel ke `--measure-reading` bila perlu.
- ⛔ **Tidak boleh berubah:** isi/urutan konten artikel; perilaku `RichMention` & `EntityCard`; ukuran/hierarki/measure/rhythm Writing **tidak boleh regres** (harus sama atau lebih baik); halaman Project/About/globals (selain hasil Fase 1).
- 🔍 **Verifikasi:** bandingkan satu artikel Writing sebelum/sesudah di dev (light & dark, mobile→desktop): body 18/32, h2 24, measure ~740px, rhythm, warna **sama/lebih baik**; mention & entity card tetap berfungsi; `tsc`/`eslint`/`build` hijau.
- ✔️ **DoD:** Writing render lewat `.reading`, visual ≥ baseline, tak lagi punya string tipografi sendiri (`paragraphClass` hilang).
- ↩️ **Revert:** kembalikan `WritingArticleBody` ke `paragraphClass`; independen dari fase lain (Fase 1 boleh tetap ada).

---

## Fase 3a — Project: prosa adopsi token `.reading` (tanpa ubah layout)
**Tujuan:** blok prosa Project (`longDescription`, deskripsi `processSections`, body `caseStudy`) memakai token Reading — **layout belum disentuh**. Kualitas teks naik ke standar Writing.

**Acceptance criteria**
- ✅ **Boleh berubah:** `app/work/[slug]/page.tsx` — `renderTextSections` mengeluarkan tag semantik di dalam `.reading`; hapus string body inline (≈ baris 191 & 243).
- ⛔ **Tidak boleh berubah:** struktur kolom/layout (prosa **masih** di kolom sticky ~386px — measure diperbaiki di 3b, bukan di sini); `StickyGallery`; judul display; micro-label section; perilaku auto brand-link & `**heading**`→micro-label (harus tetap berfungsi).
- 🔍 **Verifikasi:** prosa Project kini 18/32 dengan heading & rhythm benar; brand-link masih meng-link; layout **tidak berubah** (kolom sama); `tsc`/`eslint`/`build` hijau.
- ✔️ **DoD:** tipografi prosa Project setara Writing; layout identik dengan sebelum fase; diff terisolasi di satu file.
- ↩️ **Revert:** kembalikan class di `renderTextSections`; independen (tidak bergantung 3b).

---

## Fase 3b — Project: perbaiki reading measure
**Tujuan:** memberi prosa Project measure layak (~68ch), menutup gap kenyamanan baca terbesar (sekarang ~386px).

**Acceptance criteria**
- ✅ **Boleh berubah:** `app/work/[slug]/page.tsx` — struktur kolom/penempatan blok prosa. Pilih pendekatan saat mulai (bagian dari review fase): **A** lebarkan kolom teks, atau **B** pindahkan prosa ke pita full-measure tersendiri.
- ⛔ **Tidak boleh berubah:** token tipografi (sudah final di 3a — tidak disentuh lagi); perilaku `StickyGallery`; sticky meta kolom kiri; judul display & micro-label.
- 🔍 **Verifikasi:** ukur measure prosa jatuh di 60–72ch; baca terasa lega; galeri & sticky tetap berfungsi di desktop & mobile; `tsc`/`eslint`/`build` hijau.
- ✔️ **DoD:** prosa Project terbaca nyaman pada measure target tanpa merusak shell case-study.
- ↩️ **Revert:** kembalikan grid/placement ke versi 3a; token tetap utuh (perubahan layout terpisah dari token).

---

## Fase 4 — About & prosa lain
**Tujuan:** About (dan long-form lain bila ada) mengadopsi `.reading` mode "sebagian".

**Acceptance criteria**
- ✅ **Boleh berubah:** `app/about/page.tsx` (+ komponen prosa terkait) — blok prosa dibungkus `.reading` + measure layak.
- ⛔ **Tidak boleh berubah:** identitas/layout khas About di luar blok prosa; halaman lain.
- 🔍 **Verifikasi:** visual sebelum/sesudah About (light/dark, responsif); `tsc`/`eslint`/`build` hijau.
- ✔️ **DoD:** prosa About konsisten dengan Reading DS; shell About tetap.
- ↩️ **Revert:** lepas pembungkus `.reading` di About; independen.

## Fase 5 — Konsolidasi Display
**Tujuan:** selaraskan judul Project `font-medium`→`font-semibold`; definisikan utility Display (`text-title`, `text-hero`, `text-section`) sebagai satu sumber.

**Acceptance criteria**
- ✅ **Boleh berubah:** utility Display di `globals.css`; class weight judul di halaman yang masih `font-medium`.
- ⛔ **Tidak boleh berubah:** ukuran/skala Display (hanya weight & sumber utility); Reading & UI.
- 🔍 **Verifikasi:** judul konsisten `semibold` lintas halaman; tidak ada regresi ukuran; `build` hijau.
- ✔️ **DoD:** Display satu bahasa (semibold + utility bersama).
- ↩️ **Revert:** kembalikan weight/utility; independen.

## Fase 6 — Ekstensi content model (on-demand)
**Tujuan:** tambah blok `list`/`blockquote`/`code`/`table`/`caption` ke `WritingBlock` (`types/writing.ts`) & renderer Project **hanya saat** ada konten yang membutuhkannya (YAGNI). Style sudah siap di `.reading` sejak Fase 1.

**Acceptance criteria**
- ✅ **Boleh berubah:** `types/writing.ts` (union blok baru) + renderer terkait, per elemen yang benar-benar dipakai konten.
- ⛔ **Tidak boleh berubah:** menambah elemen yang belum ada kontennya (dilarang spekulatif); style `.reading` (sudah final).
- 🔍 **Verifikasi:** konten contoh dari elemen baru tampil sesuai spec; `tsc`/`build` hijau.
- ✔️ **DoD:** elemen yang dibutuhkan konten dapat dirender via Reading DS.
- ↩️ **Revert:** lepas blok baru dari union & renderer; per elemen, independen.

---

## Verifikasi lintas fase (checklist tetap)
Setiap fase harus lulus sebelum lanjut:
1. `npx tsc --noEmit` bersih.
2. `npx eslint` file tersentuh bersih.
3. `npm run build` hijau.
4. Cek visual dev pada halaman terdampak: light & dark, mobile→desktop, reduced-motion bila relevan.
5. Diff kecil & terisolasi (idealnya 1–2 file); **tidak mencampur perubahan token dengan perubahan layout dalam satu fase**.
6. Fase dapat di-revert sendiri tanpa menyentuh fase lain.

## Catatan
- Roadmap ini **belum menyentuh kode**. Setelah disetujui & di-commit, mulai dari **Fase 1**.
- Duplikasi lama (`paragraphClass` di WritingArticleBody, string body di work detail) dibersihkan saat halaman terkait bermigrasi (Fase 2 & 3a), bukan sekaligus di awal.
