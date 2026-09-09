# Project Playbook Design

## Tujuan

Membuat `docs/project-playbook.md` sebagai single source of truth untuk menambahkan project baru melalui satu prompt ringkas. Workflow harus mengikuti arsitektur Project yang sudah ada, menghindari data fiktif, dan menyisakan tindakan manual author—terutama pemasangan aset—dalam ringkasan yang jelas.

## Pengalaman Author

Prompt reusable meminta data inti berikut:

```text
Tambahkan Project baru.

Ikuti seluruh workflow yang ada pada:

`docs/project-playbook.md`

Berikut datanya:

- Kategori:
- Judul:
- Tahun:
- Cerita / gambaran project:
- Jumlah gambar:
- Resource / referensi (opsional):
```

Playbook memvalidasi input sebelum mengubah repository. Bila data wajib belum lengkap atau sebuah keputusan tidak dapat diturunkan dengan aman, Codex menanyakannya satu per satu. Codex tidak mengarang tanggal, fakta, tautan, stack, hasil project, atau detail proses.

## Pendekatan

Workflow memakai prompt ringkas dengan pertanyaan adaptif. Struktur project ditentukan dari cerita dan jawaban author, sehingga project sederhana tidak dipaksa mempunyai process section atau case study.

Default yang aman boleh diterapkan tanpa pertanyaan:

- `slug` diturunkan dari judul dan harus unik;
- `status` adalah `draft` kecuali author meminta `published`;
- nama file aset mengikuti konvensi playbook;
- file project ditempatkan di `content/projects/<slug>.ts`;
- aset ditempatkan di `public/projects/<slug>/`;
- project dimuat melalui auto-discovery `data/projects.ts`, sehingga registry manual tidak diubah.

Nilai `order` ditentukan secara deterministik agar project baru berada di posisi paling akhir berdasarkan data existing, kecuali author meminta posisi lain. Nilai ini dicantumkan di ringkasan akhir agar mudah dikoreksi.

## Content Model

Playbook mendokumentasikan seluruh field `Project` di `types/project.ts` dan membedakannya menjadi:

- wajib: `title`, `description`, `longDescription`, `category`, `status`, `order`, `tags`, `slug`, dan `image`;
- opsional sesuai kebutuhan: `year`, `logo`, `hoverImage`, `gallery`, `processSections`, `caseStudy`, `caseStudyHref`, `externalLink`, `externalLinkLabel`, dan `brandLinks`.

Kategori harus berasal dari `PROJECT_CATEGORIES`. Kategori baru hanya ditambahkan bila tidak ada kategori existing yang sesuai dan setelah kebutuhan itu dikonfirmasi kepada author.

`description` diringkas dari cerita sebagai headline kartu/detail. `longDescription` menggunakan cerita author sebagai overview. Penyuntingan untuk kejelasan diperbolehkan, tetapi fakta baru tidak boleh ditambahkan.

Tag/stack harus berasal dari input author atau referensi yang eksplisit. Jika diperlukan tetapi belum tersedia, Codex harus bertanya.

## Struktur Visual dan Aset

Setiap project mempunyai cover wajib dengan rasio kanonik 3:2. Dimensi konten memakai `COVER_MASTER` dari `lib/cover.ts`; playbook tidak menggandakan angka dimensinya.

Aset baru mengikuti folder per slug:

```text
public/projects/<slug>/
├── cover.png
├── hover.png                 # opsional
├── gallery-01.png            # opsional
├── gallery-02.png
├── process-01-01.png         # opsional
├── process-01-02.png
└── case-study-01.png         # opsional
```

Ekstensi mengikuti aset nyata bila author sudah menyebutkannya; `.png` menjadi default nama referensi jika aset belum tersedia. Tidak boleh membuat gambar dummy atau `.gitkeep`. Folder kosong boleh disiapkan sebagai lokasi tujuan meskipun tidak terlacak Git.

Playbook menjelaskan empat lapisan visual:

1. `image`: cover wajib untuk kartu, detail, dan metadata.
2. `hoverImage`: preview kedua opsional pada kartu atau detail.
3. `gallery`: rangkaian visual preview utama.
4. `processSections` dan `caseStudy`: narasi mendalam dengan galeri masing-masing, hanya bila cerita mendukungnya.

Semua gambar wajib memiliki alt text bermakna dan dimensi aktual. Jika aset belum tersedia, dimensi tidak boleh ditebak sebagai dimensi aktual; project tetap draft dan kekurangan tersebut dicatat sebagai tindakan author.

## Resource dan Tautan

Resource/referensi digunakan untuk membantu memahami project, bukan otomatis diterbitkan. Tautan project publik dipetakan ke `externalLink` hanya bila author memang ingin menampilkannya. Penyebutan brand/tool yang perlu menjadi tautan dalam narasi dipetakan ke `brandLinks` dan harus cocok dengan teks yang dirender.

`logo` bersifat opsional dan hanya digunakan bila asetnya tersedia atau author memang menginginkannya. Playbook tidak membuat logo fiktif.

## Validasi dan Error Handling

Sebelum selesai, workflow harus memeriksa:

- seluruh input wajib tersedia;
- slug unik;
- kategori valid;
- status dan urutan benar;
- cover 3:2 dan menggunakan `COVER_MASTER`;
- jumlah serta nama gambar cocok dengan input;
- setiap gambar mempunyai alt text dan dimensi yang benar;
- tautan eksternal valid dan hanya diterbitkan dengan maksud author;
- struktur section tidak kosong atau dibuat-buat;
- project draft tidak muncul pada halaman publik.

Verifikasi teknis menjalankan targeted ESLint untuk file baru, `npx tsc --noEmit`, dan `npm run build`. Kegagalan unrelated dibedakan dengan jelas dari kegagalan akibat project baru.

## Output Akhir

Setiap eksekusi playbook wajib menghasilkan Author Action Summary yang mencantumkan:

- judul, slug, kategori, tahun, status, dan order;
- struktur konten yang dibuat;
- daftar aset yang dipakai beserta path, alt text, dan dimensi;
- placeholder atau informasi yang harus dilengkapi manual;
- hasil lint, typecheck, dan build;
- keputusan `Ready to Publish: YES/NO` beserta alasan spesifik.

## Batasan

Implementasi playbook tidak mengubah UI `/work`, routing, content model, auto-discovery, cover guard, atau komponen gallery. Tidak ada dependency baru, migrasi project lama, gambar generatif, publikasi otomatis, maupun refactor di luar kebutuhan dokumentasi workflow.

## Kriteria Selesai

- `docs/project-playbook.md` cukup lengkap untuk menjalankan penambahan project dari prompt reusable tanpa instruksi tambahan.
- Workflow mengikuti `types/project.ts`, `data/projects.ts`, `lib/cover.ts`, renderer `/work`, dan pola content existing.
- Pertanyaan lanjutan hanya muncul ketika informasi penting tidak tersedia.
- Project baru aman secara default sebagai draft.
- Author menerima daftar tindakan manual yang konkret sebelum project dapat dipublikasikan.
