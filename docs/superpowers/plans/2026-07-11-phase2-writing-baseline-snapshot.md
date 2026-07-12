# Fase 2 — Baseline Snapshot: Writing (sebelum migrasi ke `.reading`)

Tujuan: patokan objektif agar setelah Fase 2 kita bisa memastikan hasilnya **identik atau lebih baik**, bukan sekadar "terasa sama". Bukan dokumen panjang — hanya baseline.

## 1. Komponen yang dimigrasikan
- **`components/writing/WritingArticleBody.tsx`** — target utama (renderer blok artikel).
- **`app/writing/[slug]/page.tsx`** — hanya untuk **menyelaraskan measure** kolom artikel ke `--reading-measure` bila perlu (jangan regres).

## 2. Class/styling yang akan digantikan `.reading`
Nilai saat ini (yang jadi baseline) → penggantinya di `.reading`:

| Elemen | Class sekarang (baseline) | Jadi |
|---|---|---|
| Body paragraf (`WritingArticleBody.tsx:5`) | `text-[18px] font-normal tracking-normal leading-8 text-zinc-500 dark:text-zinc-300` | `.reading` body base (18px / LH 32px / 400 / zinc-500·dark:zinc-300) + `text-pretty` |
| Rhythm antar blok (`:20` container) | `space-y-5` (20px) | `.reading > * + *` (20px) |
| Heading (`:42`) | `pt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50` | `.reading :where(h2)` (24px / semibold / tracking-tight / warna sama) |

**Dipertahankan (ekstensi, BUKAN bagian `.reading`):** `RichMention`, `EntityCard` (+ wrapper `py-2` di `:50`); container `mt-10` (jarak dari cover ke body — urusan layout wrapper). Judul `h1` & meta di page = Display/UI, di luar scope Fase 2.

## 3. Acuan verifikasi visual
**Artikel acuan:** `/writing/work-from-ruang` (memuat paragraph + heading + mention + entityCard). Bandingkan sebelum vs sesudah pada light & dark, mobile→desktop.

**Harus IDENTIK (regres = gagal):**
- Body: **18px**, line-height **32px**, weight **400**, warna **zinc-500 / dark:zinc-300**.
- Jarak antar paragraf: **20px**.
- Heading: **24px**, semibold, tracking-tight, **zinc-950 / dark:zinc-50**.
- Measure kolom artikel: **~740px** (66–72ch) — tidak menyempit/melebar.
- `RichMention` (chip mention) & `EntityCard` tampil sama persis.

**Perbedaan yang DISENGAJA (bukan regresi — diharapkan "lebih baik"):**
- **Jarak sebelum heading**: baseline `pt-4` = **16px** → `.reading` = **40px** (`--reading-flow` ×2). Ini penerapan aturan spec "space-before heading > space-after" untuk grouping. Wajib muncul, jangan dikira bug.
- Paragraf mendapat `text-pretty` (wrapping lebih rapi) — sebelumnya tidak ada.

**Cara cek cepat:** DevTools → inspeksi `<p>` (computed font-size 18/line-height 32/color), `<h2>` (24/margin-top 40), lebar `<article>` kolom. Semua nilai "harus identik" cocok + dua perbedaan disengaja muncul → Fase 2 lulus.

## 4. Definisi lulus Fase 2
Semua poin "harus identik" terpenuhi, dua perbedaan disengaja muncul sesuai deskripsi, `paragraphClass` & string h2 hilang dari `WritingArticleBody`, dan `tsc`/`eslint`/`build` hijau.
