# Writing Playbook

> **Single Source of Truth** untuk seluruh workflow pembuatan artikel Writing.
> Dokumen ini mengatur input author, content model, pemrosesan entity, gallery, aset, resolver,
> validasi, dan output akhir. Ikuti dokumen ini lebih dulu daripada template portfolio generik.

Dokumen terkait:

- Content model: `types/writing.ts`, `types/gallery.ts`, `types/entity.ts`
- Konten artikel: `content/writing/posts/<file>.ts` → auto-discovery oleh `data/writing.ts`
- Registry entity: `content/entities/<slug>.ts` → `data/entities.ts`
- Helper konten: `lib/writing.ts` (`getWritingGallery`, `formatReadingTime`, `getFirstParagraph`, …)
- Render gallery: `components/ui/MediaGallery.tsx` (dipakai bersama Speaking)
- Render hero tunggal: `components/ui/MediaThumb.tsx`
- Render blok artikel & entity: `components/writing/WritingArticleBody.tsx`, `RichMention.tsx`, `EntityCard.tsx`
- Halaman: `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`
- Panduan gaya: `docs/ui-writing.md`

---

# 1. Tujuan

Dengan mengikuti playbook ini, artikel baru bisa dibuat hanya dari data singkat tanpa instruksi tambahan.

Prompt reusable yang dipakai author:

```text
Tambahkan Writing baru.

Ikuti seluruh aturan pada:

docs/writing-playbook.md

Berikut datanya:

- Kategori:
- Judul:
- Tanggal:
- Cerita:
- Jumlah gambar:
- Entity:
- Resource:      (opsional)
- Status:        (opsional, default draft)
```

Prinsip inti: **konsistensi sistem lebih penting daripada kreativitas implementasi.**

---

# 2. Informasi yang Wajib Disediakan

Setiap artikel minimal memiliki:

- **Kategori** (topik)
- **Judul**
- **Tanggal**
- **Cerita / isi utama**

Field opsional:

- **Jumlah gambar** (default: `0` → hanya cover)
- **Entity** (default: tidak ada)
- **Resource / referensi** (disalurkan lewat entity; lihat bagian Entity)
- **Status** (`draft` atau `published`; default `draft`)

Jika informasi wajib belum ada, **jangan mengarang**. Minta data yang kurang terlebih dahulu.
Jangan pernah mengarang tanggal, nama orang, atau fakta yang tidak diberikan author.

---

# 3. Format Input yang Didukung

## Format standar

```text
- Kategori: Event
- Judul: Hackathon 2024: E-Government
- Tanggal: 14–15 Desember 2023
- Cerita: (isi panjang)
- Jumlah gambar: 4
- Entity: Cybertech PNP
```

## Format singkat

```text
Kategori: Event
Judul: Hackathon 2024: E-Government
Tanggal: 14 Des 2023
Cerita: (isi)
Gambar: 4
Entity: Cybertech PNP
```

Keduanya diproses dengan hasil yang sama.

**Tanggal → `publishedAt`** memakai format ISO `YYYY-MM-DD`. Jika author memberi rentang tanggal
(mis. `14–15 Desember 2023`), pilih satu tanggal representatif (umumnya hari puncak/penutup acara)
dan sebutkan pilihan itu di ringkasan akhir agar author bisa mengoreksi.

---

# 4. Kategori (Topic Registry)

Kategori Writing **bukan** teks bebas. Sumber kebenarannya adalah registry bertipe di
`types/writing.ts`:

```ts
export const WRITING_TOPICS = [
  { slug: "development", label: "Development" },
  { slug: "design", label: "Design" },
  { slug: "life", label: "Life" },
  { slug: "process", label: "Process" },
  { slug: "event", label: "Event" },
] as const;
```

Field `topic` pada artikel diketik ke `WritingTopicLabel`, jadi **label yang salah ketik gagal
compile**. Gunakan salah satu label yang sudah ada bila cocok.

### Menambah topik baru

Hanya jika benar-benar relevan dan tidak ada label existing yang pas:

1. Tambahkan satu entri `{ slug, label }` ke `WRITING_TOPICS`.
2. Halaman topic `/writing/<slug>` otomatis tersedia (di-generate dari registry via `generateStaticParams`).
3. Tidak ada daftar kategori manual yang perlu dijaga — grouping dan lookup topik (`groupPostsByTopic`, `getTopicBySlug`, `getPostsByTopic`) semuanya membaca `WRITING_TOPICS`.

Guard di `data/writing.ts` menolak slug artikel yang bentrok dengan slug topic, jadi jaga agar
slug artikel dan slug topic tidak sama.

---

# 5. Status Artikel

Default:

```ts
status: "draft";
```

Hanya artikel `published` yang dirender publik (`getPublishedPosts`). Artikel `draft` tetap boleh
ada di repo, otomatis 404 di halaman detail (karena `dynamicParams = false` + tidak masuk
`generateStaticParams`).

Ubah ke `published` hanya bila author memintanya secara eksplisit:

```text
Status: published
```

**Jangan mem-publish otomatis tanpa izin author.**

---

# 6. Struktur Folder Aset

Semua aset gambar disimpan **satu folder per slug**, konvensi yang seragam dengan Speaking.
Tidak ada lagi gambar artikel yang diletakkan langsung di root `public/writing/`.

## Aset artikel

```
public/
└── writing/
    └── <slug>/                ← nama folder = slug artikel (persis sama)
        ├── cover.png
        ├── image-01.png
        ├── image-02.png
        ├── image-03.png
        └── …
```

Aturan:

- **Satu folder per artikel**, nama folder = `slug`.
- Semua aset artikel sejajar dalam folder yang sama. **Tanpa** subfolder (`images/`, dll).
- Root `public/writing/` **hanya berisi folder artikel** — tidak boleh ada file gambar lepas.

## Aset entity (standar go-forward)

```
public/
└── entities/
    └── <slug>/                ← nama folder = slug entity
        ├── logo.png
        └── preview.png
```

- `logo.png` — ikon kecil untuk Rich Mention inline.
- `preview.png` — gambar preview untuk Entity Card.

> **Backward compatibility entity:** field `logo`/`preview` menerima path absolut apa pun.
> Entity lama yang masih menunjuk ke lokasi lain (mis. `logo: "/logo/nama.png"`) tetap valid dan
> tidak wajib dimigrasi. Konvensi `public/entities/<slug>/` di atas berlaku untuk **entity baru**.

---

# 7. Penamaan File

Konvensi tetap, dua digit untuk urutan:

| File            | Peran                                   |
| --------------- | --------------------------------------- |
| `cover.png`     | Gambar utama artikel                    |
| `image-01.png`  | Gambar gallery ke-1                     |
| `image-02.png`  | Gambar gallery ke-2                     |
| …               | dst. (`image-03`, … `image-10`, `image-11`) |

- Gunakan **penomoran dua digit** (`01`, `02`, …) agar urutan file stabil saat jumlah bertambah.
- Urutan angka menentukan urutan tampil di slideshow, mulai dari `01`.
- Gunakan format `.png` sebagai default kecuali author menyebut format lain. Standar gambar
  gallery mengikuti Speaking: landscape 16:9 (`MediaGallery` menyuntik dimensi 1920×1080).

Untuk entity: `logo.png` dan `preview.png` (nama tetap).

---

# 8. Resolver Aset (Cara Path Dibangun)

Author **cukup menulis nama file**; path lengkap dibangun otomatis oleh data layer
(`data/writing.ts`). Ini sistem yang sama dengan Speaking.

```ts
// data/writing.ts
function resolveAssetSrc(slug: string, src: string): string {
  if (/^(https?:)?\//.test(src)) return src;   // absolut ("/…") atau URL ("http…") → apa adanya
  return `/writing/${slug}/${src}`;             // nama file → /writing/<slug>/<file>
}
```

Diterapkan ke `image.src` dan setiap `images[].src` saat post dimuat (`withResolvedAssets`).

Konsekuensi:

- `src: "cover.png"` → `/writing/<slug>/cover.png`
- `src: "image-01.png"` → `/writing/<slug>/image-01.png`
- **Backward compatibility:** `src: "/writing/apa-pun.png"` (path absolut) atau URL `http…`
  **dibiarkan apa adanya**. Artikel lama yang menyimpan path penuh tetap berfungsi tanpa diubah.

**Resolver ini stabil — jangan diubah.** Cukup tulis nama file di konten.

> Resolver hanya berlaku untuk **post**, bukan entity. Field `logo`/`preview` entity memakai path
> absolut langsung (mis. `/entities/<slug>/preview.png`).

---

# 9. Gallery Workflow

## Komponen

Halaman detail memakai satu komponen slideshow reusable, **`components/ui/MediaGallery.tsx`**,
yang identik dengan yang dipakai Speaking (Speaking memakainya lewat wrapper tipis
`SpeakingGallery`). Jangan membuat komponen slideshow baru dan jangan menduplikasi logikanya.

`MediaGallery` menyediakan: satu gambar per tampilan (16:9), swipe (Embla) di mobile, tombol
prev/next reveal-on-hover di desktop, dot indicator, navigasi keyboard Arrow Left/Right,
onboarding nudge sekali-jalan, dan `useReducedMotion`.

## Jumlah gambar = 0 (hanya cover)

Cukup `image`, tanpa `images`:

```ts
image: {
  src: "cover.png",
  alt: "Cover artikel …",
},
```

Halaman detail menampilkan cover sebagai hero tunggal (`MediaThumb`, `aspect-4/3 rounded-3xl`) —
persis perilaku lama.

## Jumlah gambar > 0 (slideshow)

Isi `images` dengan **gambar tambahan saja** (tanpa cover):

```ts
image: {
  src: "cover.png",
  alt: "Cover artikel …",
},
images: [
  { src: "image-01.png", alt: "Deskripsi gambar 1" },
  { src: "image-02.png", alt: "Deskripsi gambar 2" },
  { src: "image-03.png", alt: "Deskripsi gambar 3" },
],
```

**Jangan memasukkan `cover.png` ke dalam `images`.** Slideshow disusun otomatis oleh
`getWritingGallery` di `lib/writing.ts`:

```
cover → image-01 → image-02 → image-03
```

Aturan penyusunan (`getWritingGallery`):

- `images` kosong/undefined → mengembalikan `[]` → hero cover tunggal (`MediaThumb`).
- `images` terisi → slideshow `[cover, ...images]`; cover selalu jadi slide pertama dan sumber
  kebenaran (juga tetap dipakai untuk card `/writing` dan Open Graph).
- **Anti-duplikasi (backward compat):** bila elemen pertama `images` kebetulan identik dengan
  cover (`src` sama setelah resolve), duplikat itu dibuang otomatis agar cover tidak tampil dua kali.

## Halaman daftar `/writing`

Tidak berubah. Selalu memakai `cover` (`image`) sebagai thumbnail. Gallery tidak dipakai di daftar.

---

# 10. Asset Workflow (Menyiapkan Folder)

Saat membuat artikel baru, **siapkan struktur folder aset lebih dulu** agar author tinggal
mengganti file dengan aset asli.

Langkah:

1. Buat folder `public/writing/<slug>/`.
2. Tulis referensi konten memakai nama file (`cover.png`, `image-01.png`, …).
3. Author menaruh gambar asli ke folder tersebut dengan nama yang sesuai.

Aturan penting:

- **Jangan menggunakan `.gitkeep`.** Speaking tidak memakainya; Writing juga tidak.
- **Jangan membuat gambar palsu / dummy** hanya untuk mengisi folder.
- Folder kosong tidak dilacak git sampai berisi aset asli — itu perilaku yang diharapkan. Folder
  berfungsi sebagai tempat mendarat aset; ia masuk ke repo begitu file asli ditambahkan.
- Aset yang belum ada akan 404 saat runtime sampai file asli dimasukkan. Ini **tidak** menggagalkan
  `npm run build` (`next/image` dengan `src` string tidak divalidasi keberadaannya saat build).
- Selalu daftarkan file yang belum ada di **Author Action Summary** sebagai item yang harus diganti.

Untuk entity baru, siapkan `public/entities/<slug>/` dengan aturan placeholder yang sama.

---

# 11. Entity Workflow

Entity adalah entitas eksternal yang bisa dirujuk artikel (aplikasi, organisasi, tempat, tool).
Bentuknya (`types/entity.ts`):

```ts
export interface Entity {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  website: string;   // dibuka di tab baru oleh RichMention & EntityCard
  logo: string;      // ikon kecil (Rich Mention)
  preview: string;   // gambar preview (Entity Card)
}
```

## Input entity

Boleh koma atau bullet:

```text
Entity: Next.js, React, Tailwind CSS
```

```text
Entity:
- Next.js
- React
```

## Aturan pemrosesan

Untuk setiap entity:

### Jika entity sudah ada di registry

- Gunakan entity yang sudah terdaftar (`content/entities/<slug>.ts`).
- Gunakan Rich Mention pada penyebutan pertama.
- **Jangan** membuat entity baru.

### Jika entity belum ada

1. Buat `content/entities/<slug>.ts` yang meng-`export const entity`.
2. Registrasikan di `data/entities.ts` (import + tambahkan ke array `entities`).
3. Siapkan folder aset `public/entities/<slug>/` untuk `logo.png` dan `preview.png`.
4. Isi `logo`/`preview` dengan path go-forward:
   ```ts
   logo: "/entities/<slug>/logo.png",
   preview: "/entities/<slug>/preview.png",
   ```
5. Jika aset belum tersedia, tulis path-nya + komentar placeholder yang jelas, **tanpa** membuat
   gambar palsu dan **tanpa** `.gitkeep`. Dokumentasikan di Author Action Summary.

## Resource / referensi

Content model Writing **tidak** punya field `resources` terpisah. Tautan referensi milik sebuah
entity (mis. Instagram komunitas) disalurkan lewat `entity.website` — Rich Mention dan Entity Card
sudah menjadikannya link yang bisa diklik. Jadikan link resource sebagai `website` entity terkait.

## Rich Mention (penyebutan pertama)

Gunakan Rich Mention **hanya pada penyebutan pertama** sebuah entity, lewat segmen inline di dalam
blok `paragraph`:

```ts
{
  type: "paragraph",
  segments: [
    "Saya memakai ",
    { type: "mention", entity: "nextjs" },
    " untuk migrasi App Router.",
  ],
}
```

Penyebutan berikutnya cukup teks biasa. Jangan membungkus setiap penyebutan dengan mention.

## Entity Card (bagian bawah)

Jika artikel memiliki entity, tampilkan Entity Card di **bagian paling bawah** artikel, setelah
seluruh pembahasan selesai, memakai blok `entityCard`. Urutkan sesuai urutan entity pada input author:

```ts
{ type: "entityCard", entity: "nextjs" },
{ type: "entityCard", entity: "react" },
```

Jangan menaruh Entity Card di tengah artikel.

---

# 12. Content Model & Contoh

Bentuk artikel (`types/writing.ts`):

```ts
export interface WritingPost {
  slug: string;
  title: string;
  topic: WritingTopicLabel;        // salah satu label WRITING_TOPICS
  status: WritingStatus;           // "published" | "draft"
  publishedAt: string;             // ISO "YYYY-MM-DD"
  image: { src: string; alt: string };   // cover: card /writing, Open Graph, hero saat images kosong
  images?: GalleryImage[];         // gambar tambahan (tanpa cover); memicu slideshow
  content: WritingBlock[];
}
```

Blok konten (`WritingBlock`):

```ts
type WritingBlock =
  | string                                         // paragraf biasa
  | { type: "paragraph"; segments: WritingInline[] }  // paragraf dengan Rich Mention
  | { type: "heading"; text: string }
  | { type: "entityCard"; entity: string };

type WritingInline = string | { type: "mention"; entity: string };
```

`GalleryImage` (`types/gallery.ts`): `{ src: string; alt: string }` — dipakai bersama Speaking.

## Contoh: artikel dengan gallery

```ts
// content/writing/posts/hackathon-2024-e-government.ts
import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "hackathon-2024-e-government",
  title: "Hackathon 2024: E-Government — Enhancing Public Access and Efficiency",
  topic: "Event",
  status: "draft",
  publishedAt: "2023-12-15",
  image: { src: "cover.png", alt: "Cover Hackathon 2024 E-Government bersama Tim Ular" },
  images: [
    { src: "image-01.png", alt: "Tim Ular mengerjakan platform PIKS selama hackathon" },
    { src: "image-02.png", alt: "Proses perancangan dan desain prototype PIKS" },
    { src: "image-03.png", alt: "Shella mempresentasikan PIKS di hadapan dewan juri" },
    { src: "image-04.png", alt: "Foto bersama Tim Ular di Hackathon 2024" },
  ],
  content: [
    {
      type: "paragraph",
      segments: [
        "Akhir 2023 saya mengikuti Hackathon 2024 yang diselenggarakan oleh ",
        { type: "mention", entity: "cybertech-pnp" },
        ", acara tahunan komunitas tersebut.",
      ],
    },
    { type: "heading", text: "Tim Ular" },
    "Kami turun sebagai tim beranggotakan lima orang…",
    { type: "entityCard", entity: "cybertech-pnp" },
  ],
};
```

Aset: `public/writing/hackathon-2024-e-government/` berisi `cover.png`, `image-01.png` … `image-04.png`.

## Contoh: artikel hanya cover

```ts
image: { src: "cover.png", alt: "Cover artikel …" },
// tanpa field images
```

Aset: `public/writing/<slug>/cover.png` saja.

## Contoh: entity baru

```ts
// content/entities/nextjs.ts
import type { Entity } from "@/types/entity";

export const entity: Entity = {
  slug: "nextjs",
  title: "Next.js",
  subtitle: "React framework untuk web",
  description: "…",
  website: "https://nextjs.org/",
  // Placeholder: ganti manual di /public/entities/nextjs/logo.png
  logo: "/entities/nextjs/logo.png",
  // Placeholder: ganti manual di /public/entities/nextjs/preview.png
  preview: "/entities/nextjs/preview.png",
};
```

Lalu daftarkan di `data/entities.ts`.

---

# 13. Struktur Artikel

Gunakan struktur yang paling sesuai dengan isi cerita. Struktur umum:

```
Pembuka
Latar Belakang
Proses / Eksperimen / Implementasi
Tantangan
Hasil atau Insight
Penutup
```

Tidak semua heading wajib. Hindari heading tanpa isi bermakna. Heading memakai blok
`{ type: "heading", text: "…" }`; paragraf biasa cukup string, paragraf dengan mention memakai
blok `paragraph` + `segments`.

---

# 14. Gaya Penulisan

Ikuti `docs/ui-writing.md` (bahasa desain halaman) dan tone rumah yang sudah ada di artikel existing.

Prinsip:

- Jelas dan spesifik, berbasis pengalaman nyata.
- Bahasa natural, first-person, kasual tapi rapi.
- Hindari clickbait, filler, dan promosi diri berlebihan.
- Fokus pada insight, bukan menonjolkan diri.
- Typography adalah hero; komponen mendukung keterbacaan, bukan bersaing dengannya.

---

# 15. Validasi Sebelum Selesai

Pastikan:

- [ ] `slug` benar dan unik (tidak bentrok dengan artikel lain maupun slug topic).
- [ ] `topic` memakai label yang terdaftar di `WRITING_TOPICS`.
- [ ] `status` sesuai (default `draft`; `published` hanya atas izin author).
- [ ] `publishedAt` format ISO valid.
- [ ] `image.src` dan setiap `images[].src` memakai nama file (bukan path penuh) untuk artikel baru.
- [ ] `images` **tidak** menyertakan cover.
- [ ] Jumlah gambar sesuai input author.
- [ ] Folder `public/writing/<slug>/` sudah disiapkan (tanpa `.gitkeep`, tanpa gambar palsu).
- [ ] Semua gambar punya `alt` yang bermakna.
- [ ] Entity sudah direuse atau dibuat + diregistrasikan di `data/entities.ts`.
- [ ] Entity baru punya folder `public/entities/<slug>/` + path `logo.png`/`preview.png`.
- [ ] Rich Mention hanya pada penyebutan pertama; Entity Card ada di bagian bawah, urut sesuai input.
- [ ] `npx tsc --noEmit`, `npx eslint`, dan `npm run build` lolos.

---

# 16. Author Action Summary (Output Wajib)

Setelah implementasi selesai, keluarkan ringkasan berikut.

## Artikel

- Judul: `<judul>`
- Slug: `<slug>`
- Status: `draft` / `published`
- Kategori: `<topic>` (sebutkan bila topik baru ditambahkan ke registry)
- Tanggal: `<publishedAt>` (sebutkan bila tanggal rentang dipetakan ke satu tanggal)

## Gallery

- Total slide: `X` (`cover` + `N` gambar tambahan; disusun otomatis `cover → image-01 → …`)
- Cover: `cover.png`
- Gambar tambahan: `image-01.png`, `image-02.png`, …

## Entity

### Reused
- `<entity>` …

### New
- `<entity baru>` … (file konten + registrasi + folder aset)

## Placeholder yang Harus Diganti Manual

- `public/writing/<slug>/cover.png`
- `public/writing/<slug>/image-01.png` …
- `public/entities/<entity>/logo.png`
- `public/entities/<entity>/preview.png`

*(Tidak ada gambar palsu yang dibuat; path direferensikan dengan folder yang sudah disiapkan.)*

## Checklist Author

- [ ] Tambahkan cover artikel
- [ ] Tambahkan seluruh gambar slideshow (`image-01` … `image-NN`)
- [ ] Tambahkan logo entity baru
- [ ] Tambahkan preview entity baru
- [ ] Verifikasi alt text setiap gambar
- [ ] Verifikasi link resource / `website` entity (jika ada)
- [ ] Konfirmasi tanggal bila dipetakan dari rentang
- [ ] Ubah status menjadi `published` jika artikel siap

## Ready to Publish?

- **YES** — artikel lengkap dan tidak ada placeholder penting yang tersisa.
- **NO** — masih ada aset/informasi yang perlu dilengkapi. Sertakan alasan spesifik.

---

# 17. Backward Compatibility

Perubahan arsitektur menjaga kompatibilitas artikel lama:

- **Resolver passthrough:** `src` yang sudah berupa path absolut (`/writing/…`) atau URL (`http…`)
  dibiarkan apa adanya. Artikel lama yang menyimpan path penuh tetap berfungsi.
- **Cover-only tetap sama:** artikel tanpa `images` menampilkan hero cover tunggal (`MediaThumb`)
  persis seperti sebelumnya.
- **Anti-duplikasi cover:** artikel yang terlanjur menaruh cover sebagai elemen pertama `images`
  otomatis dibersihkan oleh `getWritingGallery` (tidak tampil dua kali).
- **Entity lama:** `logo`/`preview` yang menunjuk lokasi lama (mis. `/logo/…`) tetap valid;
  migrasi ke `public/entities/<slug>/` tidak wajib untuk entity yang sudah ada.

Migrasi artikel/entity lama ke konvensi baru bersifat opsional dan bisa dilakukan bertahap.

---

# 18. Non Goals

Jangan:

- Mengubah Writing UI, typography, Reading Design System, atau routing.
- Membuat komponen slideshow baru — gunakan `MediaGallery` yang sama dengan Speaking.
- Menduplikasi komponen reusable.
- Mengubah resolver (`resolveAssetSrc` / `withResolvedAssets`).
- Membuat gambar palsu atau logo/cover fiktif.
- Menggunakan `.gitkeep`.
- Meletakkan gambar artikel langsung di root `public/writing/`.
- Mengarang tanggal atau data yang tidak diberikan author.
- Mem-publish artikel tanpa izin author.

---

# 19. Ringkasan Workflow

```
Input Author
  ↓
Validasi data wajib (jangan mengarang)
  ↓
Tentukan slug, topic (registry), status
  ↓
Siapkan folder aset public/writing/<slug>/  (tanpa .gitkeep, tanpa gambar palsu)
  ↓
Tulis konten: image (cover.png) + images? (image-01.png, …)  — cukup nama file
  ↓
Cek entity registry → reuse atau buat entity baru (+ folder public/entities/<slug>/)
  ↓
Rich Mention pada penyebutan pertama; Entity Card di bawah (urut sesuai input)
  ↓
Validasi: tsc, eslint, build
  ↓
Keluarkan Author Action Summary
```
