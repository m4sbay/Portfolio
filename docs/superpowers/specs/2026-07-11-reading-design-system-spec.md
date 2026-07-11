# Reading Design System — Spesifikasi Tipografi Website

Status: **Disepakati — siap jadi acuan implementasi bertahap** · Tanggal: 2026-07-11 · Scope: seluruh website (Writing, Project, About, dan halaman lain)

## 1. Tujuan & prinsip

Satu bahasa tipografi untuk seluruh situs, sehingga setiap halaman punya identitas sendiri **tetapi ritme baca, hierarki, dan spacing-nya konsisten**. Halaman Writing dijadikan **acuan fondasi long-form** (measure lebar, body 18px, heading baca sungguhan), bukan acuan untuk seluruh elemen — karena list/blockquote/code/caption/table belum ada di mana pun dan didefinisikan baru di sini.

Prinsip:
- **Content first (prinsip utama).** Reading DS selalu memprioritaskan keterbacaan isi. Setiap keputusan tipografi harus menjawab *"Apakah ini membuat konten lebih mudah dibaca?"* — bukan *"Apakah ini terlihat lebih menarik?"*. Bila estetika dan keterbacaan berbenturan, keterbacaan menang.
- **Tiga keluarga tipe yang terpisah tegas** (Reading / Display / UI). Sebuah elemen hanya milik satu keluarga.
- **Reading punya measure**; Display & UI tidak.
- **Restrained & zinc-neutral** sesuai AGENTS.md — tidak menambah palet/gradasi ramai.
- **YAGNI**: elemen (mis. table) didefinisikan di spec, tapi baru di-*wire* saat konten membutuhkannya.
- Satu sumber kebenaran; tidak ada string tipografi terduplikasi antar renderer.

## 2. Tiga keluarga tipe (model mental)

| Keluarga | Untuk apa | Punya measure? | Ikut vertical rhythm? | Contoh sekarang |
|---|---|---|---|---|
| **Reading DS** | Konten panjang yang dibaca berurutan (prosa, list, quote, code, table, figure) | **Ya** (~68ch) | **Ya** | Body Writing; `longDescription`/`processSections`/`caseStudy` Project |
| **Display** | Judul & heading besar sebagai objek visual | Tidak | Tidak | h1 38px, hero 44–60px, `mas-section-heading` 36px, judul section Project |
| **UI** | Label fungsional: eyebrow, badge, metadata, nav, tombol | Tidak | Tidak | micro-label uppercase, `ProjectTag`, tanggal, tombol |

Aturan pemilihan: *"Apakah ini teks yang dibaca berurutan (≥2 paragraf) atau elemen yang menyertainya?"* → Reading. *"Apakah ini judul/objek visual besar?"* → Display. *"Apakah ini penanda/kontrol fungsional?"* → UI.

## 3. Fondasi bersama

- **Font:** `--font-sans` (Geist Sans) untuk Reading & Display; `--font-mono` (Geist Mono) untuk code, metadata teknis, dan angka/timestamp. (Sudah ada di `@theme` globals.css.)
- **Warna teks (peran, bukan hardcode):**
  - `text-strong` = `zinc-950 / dark:zinc-50` — judul, heading, penekanan kuat
  - `text-body` = `zinc-500 / dark:zinc-300` — body long-form (mengikuti Writing; lihat Keputusan #1)
  - `text-muted` = `zinc-500 / dark:zinc-400` — caption, metadata, secondary
  - `text-faint` = `zinc-400 / dark:zinc-600` — marker list, garis, hint
- **Skala tipe (angka tunggal untuk seluruh situs):**

| Token | px / rem | Line-height | Keluarga utama |
|---|---|---|---|
| `text-hero` | 44 → `sm:60` | 1.05 | Display |
| `text-title` | 38 / 2.375rem | 1.1 | Display |
| `text-section` | 36 / 2.25rem | 1.15 | Display |
| `text-section-sm` | 30 / 1.875rem | 1.2 | Display |
| `read-h2` | 24 / 1.5rem | 32px (1.33) | Reading |
| `read-lead` / `read-h3` | 20 / 1.25rem | 34px / 28px | Reading |
| `read-body` | **18 / 1.125rem** | **32px (1.78)** | Reading |
| `text-base` | 16 / 1rem | 1.6 | UI / small body |
| `text-sm` | 14 / 0.875rem | 1.5 | UI / caption / code |
| `text-xs` | 12 / 0.75rem | 1.4 | UI micro |

## 4. Reading Design System (inti)

Semua yang di bawah berlaku pada blok konten long-form. Target arsitektur: satu wrapper scoped (`.reading`) yang menata elemen turunannya (lihat §8), sehingga renderer cukup membungkus konten tanpa mengulang class per elemen.

### 4.1 Reading measure
- **Target 66 karakter/baris**, rentang nyaman **60–72ch**.
- Implementasi: `max-width: 68ch` (≈ 720–740px pada Geist 18px) pada kontainer prosa. Cocok dengan measure Writing sekarang (~740px).
- Berlaku pada **teks & elemen inline-flow** (p, list, blockquote, table, caption). **Figure/gambar boleh melebar** melewati measure hingga lebar kolom kontennya ("content-wide"), teks tetap 68ch.

### 4.2 Body & lead
- **Body:** `read-body` 18px / LH 32px / weight 400 / `text-body` (`zinc-500 / dark:zinc-300`) / tracking normal.
- **Lead (opsional, paragraf pembuka):** `read-lead` 20px / LH 34px / weight 400 / `zinc-600 dark:zinc-300`. Maksimum 1 lead per artikel.

### 4.3 Heading hierarchy (di dalam Reading)
Reading dimulai dari **H2** — H1 adalah judul halaman (Display), bukan bagian body.

| Level | Ukuran | Weight | Warna | Space-before | Space-after |
|---|---|---|---|---|---|
| `read-h2` | 24px | 600 | `text-strong` | 40px (2em) | 12px |
| `read-h3` | 20px | 600 | `text-strong` | 32px | 8px |
| `read-h4` (opsional/jarang) | 18px | 600 | `text-strong` | 24px | 8px |

Aturan grouping: **space-before heading selalu > space-after** agar heading menempel pada konten di bawahnya. Maksimal kedalaman untuk reading = H4; lebih dalam dari itu, konten harus dipecah.

### 4.4 Vertical rhythm & spacing antar elemen
Basis rhythm = **20px** (gap paragraf, `space-y-5` di Writing sekarang).

| Transisi | Jarak |
|---|---|
| paragraf → paragraf | 20px |
| paragraf → list / blockquote / figure / code / table | 20px |
| elemen → paragraf berikutnya | 20px |
| paragraf → H2 | 40px (before) / H2 → konten 12px (after) |
| paragraf → H3 | 32px / 8px |
| antar item list | 8px |
| gambar → caption | 8px |

### 4.5 Link & emphasis (inline, dalam Reading)
- **Link:** gaya halus (Keputusan #2) — warna mengikuti body, `underline` `decoration-1` `decoration-zinc-400` `underline-offset-[3px]`, weight 500; hover → `text-strong` + `decoration-current`. Link long-form membantu navigasi tanpa jadi titik perhatian; gaya tegas dicadangkan untuk CTA & elemen UI.
- **Bold (`**`):** `font-semibold`, warna naik ke `text-strong`.
- **Italic:** `font-italic`, warna body.
- **Inline code:** `--font-mono` 0.9em, `bg-zinc-100 dark:bg-white/10`, `px-1.5 py-0.5 rounded-md`, warna body.
- **Brand-link Project & mention/entityCard Writing** = ekstensi khusus halaman di atas layer link ini; tetap dipertahankan (lihat §7).

### 4.6 List (ul / ol)
- Measure & LH sama dengan body; `padding-left: 1.5em`.
- Marker `text-faint`; `ul` = disc/dash halus, `ol` = decimal.
- Gap antar item 8px; nested list rapat (gap 4px, indent tambahan 1.25em).
- Paragraf di dalam item mengikuti body.

### 4.7 Blockquote
- `border-left: 2px` `zinc-300 dark:white/15`, `padding-left: 1em`.
- Teks `text-muted`, ukuran body (18px), boleh italic; **bukan** pull-quote raksasa (itu Display).
- Margin block 24px. Attribution (opsional): `text-sm text-muted` di baris terpisah dengan prefiks "—".

### 4.8 Code block (pre)
- `--font-mono` 14px / LH 1.6.
- Permukaan **gelap** (Keputusan #3): `bg-zinc-950 dark:bg-black/40`, teks `zinc-100`, `rounded-xl`, `padding 16px`. Konsisten di light & dark. (Inline code tetap lebih ringan — §4.5 — bukan permukaan gelap.)
- **`overflow-x: auto` di kontainer sendiri** (aturan responsif repo — body halaman tak boleh scroll horizontal). Boleh selebar kolom konten (melewati 68ch).
- Syntax highlighting = di luar scope spec ini.

### 4.9 Table
- Lebar penuh kolom konten, **dibungkus `overflow-x-auto`** (aturan repo).
- Teks 16px; header row `font-semibold text-strong`; body `text-body`.
- Garis antar baris `border-b border-zinc-200 dark:border-white/10`; tanpa zebra (restrained). Padding sel `py-2 px-3`, header align kiri.

### 4.10 Caption (figure)
- `text-sm` (14px) `text-muted`, align kiri, `margin-top 8px`.
- Untuk caption teknis/kredit boleh `--font-mono`. Satu baris pendek; bukan paragraf.

### 4.11 Image treatment (dalam alur baca)
- **Berbeda dari sistem cover** (`lib/cover.ts`, rasio 3:2 untuk card/hero). Gambar dalam alur baca **menghormati rasio aslinya** (`width/height` intrinsik + `h-auto`), seperti `StickyGallery` sekarang.
- Bingkai: `rounded-2xl`, `border-zinc-200 dark:border-white/10` atau ring, `bg` netral.
- `figure` = gambar (+ caption opsional). Boleh "content-wide" melewati measure teks; default tetap dalam kolom konten.

## 5. Display typography
- **Hero** (`text-hero`): 44 → `sm:60px`, `font-semibold`, `leading-[1.05]`, `tracking-tight`, `text-pretty`, `text-strong`.
- **Page title** (`text-title`): 38px, `font-semibold`, `leading-tight`, `tracking-tight`, `text-pretty`.
- **Section heading** (`text-section` / `mas-section-heading`): 36px, `font-semibold`, `leading-[1.15]`, `tracking-tight`.
- **Section kecil** (`text-section-sm`): 30px.
- Weight kanonik **semibold** untuk seluruh Display (Keputusan #4); judul Project yang kini `font-medium` diselaraskan ke `semibold`. Perbedaan karakter antar halaman dibangun lewat **layout, spacing, dan ritme — bukan weight heading**.
- Display **tidak** dibatasi measure; boleh selebar layout. Tidak ikut vertical rhythm Reading.

## 6. UI typography
- **Eyebrow / micro-label:** `text-xs` 12px, `font-semibold`, `uppercase`, `tracking-[0.14em–0.2em]`, `text-muted`.
- **Metadata / timestamp:** `text-sm` 14px (atau 12px), boleh `--font-mono`, `text-muted`.
- **Badge / tag / pill:** `text-xs`, `font-medium/semibold`.
- **Nav:** `text-sm` `font-medium`.
- **Button:** 11–14px, `font-semibold`/`font-bold`, opsional `uppercase tracking-wider`.
- UI mengabaikan measure & rhythm; murni fungsional.

## 7. Aturan adopsi: penuh / sebagian / tidak

| Mode | Kapan | Yang diambil |
|---|---|---|
| **Penuh** | Halaman yang tujuan utamanya membaca prosa berurutan | Reading measure (1 kolom ~68ch) + seluruh token Reading + Display (judul) + UI |
| **Sebagian** | Halaman campuran: prosa + struktur lain | Token Reading untuk **blok prosa** (body, heading, rhythm, list, dst.) **dan measure yang layak untuk blok itu** — tetapi shell/layout tetap khas halaman |
| **Tidak** | Halaman tanpa prosa berurutan | Hanya Display + UI |

Pemetaan halaman saat ini:
- **Writing detail** → **Penuh**. (Sudah paling dekat; jadi acuan.)
- **Project detail** → **Sebagian**: `longDescription`/`processSections`/`caseStudy` memakai token Reading **dan diberi measure layak** (bukan lagi kolom sticky ~386px); shell 2-kolom sticky + `StickyGallery` + judul display + micro-label section tetap khas Project.
- **About** → **Sebagian**: bio/prosa pakai token Reading dalam layout About-nya.
- **Home / Services / listing / `/work` galeri** → **Tidak**: Display + UI saja.

Aturan operasional: *blok berisi ≥2 paragraf berurutan yang dimaksudkan untuk dibaca* WAJIB memakai token Reading + measure. Shell di sekelilingnya bebas.

## 8. Arsitektur (proposal — implementasi menyusul)

Tujuan: satu sumber, nol duplikasi, styling elemen otomatis.

- **Primitives** sebagai CSS custom properties di `@theme`/`:root` (globals.css): ukuran, LH, warna-peran, measure (`--measure-reading: 68ch`), langkah rhythm.
- **Reading sebagai kelas scoped `.reading`** (pola mirip `.prose`) di `@layer` globals.css yang menata `& p`, `& h2/h3/h4`, `& ul/ol/li`, `& blockquote`, `& pre/code`, `& table`, `& figure/figcaption`, `& a`, `& strong/em`. Renderer cukup membungkus: `<div class="reading"> … </div>`.
  - `WritingArticleBody` dan blok prosa Project sama-sama mengeluarkan **tag semantik tanpa class per-elemen**, mewarisi `.reading`.
  - Ekstensi khusus (mention/entityCard Writing, brand-link/`**heading**` Project) tetap di renderer masing-masing, di atas layer `.reading`.
- **Display & UI** sebagai `@utility`/class ringkas (mis. `text-title`, `mas-section-heading` yang sudah ada, `eyebrow`) — dipakai lintas halaman.
- Menghapus `paragraphClass` (WritingArticleBody.tsx:5) & string body inline di `app/work/[slug]/page.tsx:191,243` → digantikan `.reading`.

Keputusan #5: **kelas scoped `.reading` dipilih** — tipografi dikelola sebagai sistem CSS, bukan token TypeScript. Modul TS token (`design-system/typography.ts`) ditolak karena tetap mengharuskan tiap renderer menempel class. Renderer bersama tunggal (opsi C analisis) ditunda sampai dua content model menyatu.

## 9. Rencana penerapan bertahap (garis besar)
1. Definisikan primitives + `.reading` + utilities Display/UI di globals.css (belum mengubah halaman).
2. Migrasi **Writing** ke `.reading` (harus identik/lebih baik — jadi baseline visual).
3. Terapkan ke **Project**: bungkus blok prosa dengan `.reading` + perbaiki **measure** (widen / pita full-measure).
4. Terapkan ke **About** & prosa lain.
5. Tambah list/blockquote/code/table/caption ke content model **hanya saat** konten pertama membutuhkannya.

## 10. Keputusan (disepakati 2026-07-11)
1. **Warna body:** pertahankan seperti Writing → `text-body = zinc-500 / dark:zinc-300`. Konsistensi visual diutamakan selama accessibility terpenuhi. *(Catatan: `zinc-500` pada putih ada di ambang AA ~4.5:1 untuk teks 18px — dapat diterima, tapi jangan dibuat lebih terang dari ini; dark mode `zinc-300` nyaman.)*
2. **Link Reading:** gaya **halus** (warna + underline, weight 500). Gaya tegas hanya untuk CTA & UI.
3. **Code block:** permukaan **gelap** (light & dark). Inline code tetap ringan.
4. **Display weight:** **semibold** untuk seluruh Display; karakter halaman lewat layout/spacing/ritme, bukan weight.
5. **Arsitektur:** kelas **scoped `.reading`** (sistem CSS), bukan token TS.

---
Spec ini **disepakati** dan siap jadi acuan. Langkah berikutnya: susun rencana implementasi bertahap sesuai §9 (mulai dari definisi primitives + `.reading` di globals.css, lalu migrasi Writing sebagai baseline).
