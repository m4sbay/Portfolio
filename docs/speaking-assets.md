# Aset Gambar Speaking

**Single source of truth** untuk mengelola aset gambar halaman Speaking (`/speaking` dan `/speaking/[slug]`). Baca ini sebelum menambah sesi Speaking baru agar workflow selalu konsisten.

Terkait:

- Tipe data: `types/speaking.ts` (`SpeakingSession`, `SpeakingSessionImage`, `SpeakingGalleryImage`)
- Konten: `content/speaking/<file>.ts` → di-auto-discover oleh `data/speaking.ts`
- Render galeri: `components/speaking/SpeakingGallery.tsx`

---

## 1. Struktur folder

Setiap sesi Speaking punya **satu folder aset** di `public/speaking/`, dinamai **persis sama dengan `slug`** sesi tersebut.

```
public/
└── speaking/
    └── <slug>/                 ← nama folder = slug sesi
        ├── cover.png
        ├── image-01.webp
        ├── image-02.webp
        ├── image-03.webp
        ├── image-04.webp
        └── image-05.webp
```

Aturan:

- **Satu folder per sesi**, nama folder = `slug` (mis. `microblog-instagram-halokatalks`).
- **Semua aset sesi berada di folder yang sama** — cover dan dokumentasi sejajar.
- **Jangan** membuat subfolder `images/` (atau subfolder lain). Struktur sengaja datar.

---

## 2. Penamaan file

| File            | Peran               |
| --------------- | ------------------- |
| `cover.png`     | Gambar utama sesi    |
| `image-01.webp` | Dokumentasi ke-1     |
| `image-02.webp` | Dokumentasi ke-2     |
| `image-03.webp` | Dokumentasi ke-3     |
| …               | dst.                 |

- Dokumentasi memakai pola `image-NN.webp`.
- Gunakan **penomoran dua digit** (`01`, `02`, … `10`, `11`) agar urutan file tetap rapi dan stabil saat jumlah gambar bertambah.
- Urutan angka menentukan urutan tampil di galeri — mulai dari `01`.

---

## 3. Fungsi masing-masing aset

### `cover` — gambar utama

Dipakai di banyak permukaan, jadi wajib ada bila sesi ingin punya gambar:

- **Hero** halaman detail (`/speaking/[slug]`)
- **Speaking Card** (`SpeakingMiniCard`, section "More Speaking")
- **Timeline** (`SpeakingTimeline`, halaman `/speaking`)
- **Open Graph** & **Social Preview** (metadata `generateMetadata`)

### `images` — dokumentasi kegiatan

- Kumpulan foto dokumentasi acara.
- Ditampilkan **sebelum artikel** (urutan halaman: Hero → Metadata → Galeri → Artikel).
- **Urut sesuai alur cerita** — dari pembuka hingga penutup acara.
- Opsional: sesi tanpa dokumentasi cukup `images: []`, galeri otomatis tidak dirender.

---

## 4. Standar gambar

### Cover

- Mengikuti ukuran cover yang sudah dipakai project (rasio & dimensi konsisten dengan cover Speaking lainnya).
- Metadata `width`/`height` **wajib diisi** di data karena dibaca untuk Open Graph.

### Gallery (`images`)

- **Landscape**, **1920 × 1080** (16:9).
- Format **WebP**.
- **Kualitas tinggi**, tetapi **optimalkan ukuran file** sebelum dimasukkan ke project (kompres secukupnya).
- `width`/`height` **tidak perlu** ditulis di data — `SpeakingGallery` menyuntik default `1920 × 1080` secara otomatis. Cukup `src` + `alt`.

> Ubah standar dimensi galeri di satu tempat: konstanta `GALLERY_WIDTH` / `GALLERY_HEIGHT` di `components/speaking/SpeakingGallery.tsx`.

---

## 5. Cara menambahkan Speaking baru

Checklist:

1. Buat folder `public/speaking/<slug>/` (nama = slug sesi).
2. Tambahkan `cover.png`.
3. Tambahkan `image-01.webp`, `image-02.webp`, dst. (bila ada dokumentasi).
4. Buat file `content/speaking/<nama>.ts` yang meng-`export const session`.
5. Isi field `cover` (dengan `width` & `height`).
6. Isi field `images` (cukup `src` + `alt`; kosongkan `[]` bila belum ada).
7. Tulis konten artikel di `body`.
8. Jalankan `npm run build` untuk memastikan tidak ada error.

> Tidak perlu menyentuh `data/speaking.ts` — sesi otomatis ter-discover dari folder `content/speaking/`.

---

## 6. Contoh lengkap

```ts
// content/speaking/microblog-instagram-halokatalks.ts
import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "microblog-instagram-halokatalks",
  title: "Microblog di Instagram: Masih Laku Nggak Sih",
  date: "2022-09-08",
  timeLabel: "20.00 – 20.30 WIB",
  location: "Daring — Instagram Live",
  excerpt: "Sesi berbagi bareng Halokatalks Community soal relevansi microblog di Instagram.",
  body: [
    "Paragraf pembuka…",
    "Paragraf berikutnya…",
  ],

  // Gambar utama — width & height wajib (dipakai Open Graph).
  cover: {
    src: "cover.png",
    alt: "Bayu membuka sesi microblog bareng Halokatalks",
    width: 1920,
    height: 1080,
  },

  // Dokumentasi — cukup src + alt, ukuran disuntik komponen (1920×1080).
  images: [
    { src: "image-01.webp", alt: "Bayu menyampaikan materi kepada peserta" },
    { src: "image-02.webp", alt: "Peserta mengikuti sesi workshop" },
  ],
};
```

> **`src` cukup nama file.** `data/speaking.ts` membangun path lengkap otomatis:
> `<file>` → `/speaking/<slug>/<file>`. Slug jadi base path, jadi tidak ditulis berulang.
> (Path absolut `/…` atau URL `http…` tetap dibiarkan apa adanya bila memang perlu.)
>
> **Catatan slug**: nama folder aset harus sama persis dengan `slug` di data — pada contoh ini `microblog-instagram-halokatalks`, bukan disingkat.
