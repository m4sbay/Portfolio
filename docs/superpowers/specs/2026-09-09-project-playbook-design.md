# Project Playbook Design

## Tujuan

Dokumen ini adalah acuan operasional untuk menambahkan project baru melalui satu prompt ringkas. Jalankan workflow di bawah langsung; tidak perlu membuat atau menunggu `docs/project-playbook.md`. Workflow harus mengikuti AGENTS.md dan arsitektur Project yang sudah ada, menghindari data fiktif, dan menyisakan tindakan manual author—terutama pemasangan aset—dalam ringkasan yang jelas.

## Pengalaman Author

Prompt reusable meminta data inti berikut:

```text
Tambahkan Project baru.

Ikuti seluruh workflow yang ada pada:

`docs/superpowers/specs/2026-09-09-project-playbook-design.md`

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
- gambar project ditempatkan di `public/projects/<slug>/` dengan format default `.jpeg`;
- logo tool memakai satu aset bersama di `public/tools/`, dirujuk melalui `/tools/<nama-file>`;
- project dimuat melalui auto-discovery `data/projects.ts`, sehingga registry manual tidak diubah.

Nilai `order` ditentukan secara deterministik agar project baru berada di posisi paling akhir berdasarkan data existing, kecuali author meminta posisi lain. Nilai ini dicantumkan di ringkasan akhir agar mudah dikoreksi.

## Urutan Pengerjaan

1. Baca AGENTS.md, periksa perubahan lokal, lalu baca `types/project.ts`, `data/projects.ts`, `lib/cover.ts`, renderer detail, dan contoh konten project terbaru. Pertahankan perubahan author yang tidak terkait.
2. Validasi input, slug, kategori, urutan, pembagian gambar, dan maksud tautan. Terapkan default dokumen ini; tanyakan hanya informasi penting yang belum bisa disimpulkan dari input atau aset.
3. Rapikan cerita dan buat satu file `content/projects/<slug>.ts` yang mengekspor `project: Project`. Siapkan folder gambar `.jpeg` dan referensi logo tool bersama sesuai aturan di bawah, tanpa mengubah registry karena project dimuat otomatis.
4. Periksa konten dan aset, lalu jalankan verifikasi teknis di bawah.
5. Berikan Author Action Summary dengan tindakan manual yang konkret. Jangan mengklaim siap terbit jika aset atau informasi penting masih belum lengkap.

## Content Model

Playbook mendokumentasikan seluruh field `Project` di `types/project.ts` dan membedakannya menjadi:

- wajib: `title`, `description`, `longDescription`, `category`, `status`, `order`, `tags`, `slug`, dan `image`;
- opsional sesuai kebutuhan: `year`, `logo`, `hoverImage`, `gallery`, `processSections`, `caseStudy`, `caseStudyHref`, `externalLink`, `externalLinkLabel`, dan `brandLinks`.

Kategori harus berasal dari `PROJECT_CATEGORIES`. Petakan padanan yang jelas seperti “Desain” ke `Design`; tools seperti Photoshop menjadi tag, bukan kategori baru. Kategori baru hanya ditambahkan bila tidak ada kategori existing yang sesuai dan setelah kebutuhan itu dikonfirmasi kepada author.

`description` diringkas dari cerita sebagai headline kartu/detail. `longDescription` menggunakan cerita author sebagai overview. Rapikan bahasa Indonesia agar natural, mudah dipahami, tidak kaku, dan menggunakan gaya personal “aku”. Pertahankan makna dan fakta author. Bagian proses boleh dipisahkan ke `processSections` jika cerita mendukungnya, tanpa menduplikasi narasi atau membuat section kosong.

### Voice dan Tone

Seluruh narasi project memakai sudut pandang orang pertama dengan kata “aku”. Jangan memakai “saya”, kecuali ketika mempertahankan kutipan atau teks eksternal. Tulis seolah author sedang menceritakan project tersebut langsung kepada pembaca dengan santai, jelas, dan percaya diri.

Tone harus personal, natural, conversational, dan tetap profesional. Hindari gaya dokumentasi teknis, corporate case study, marketing copy, atau kalimat yang terdengar terlalu dipoles. Cerita sebaiknya mengalir dari konteks project, masalah yang dirasakan, hal yang dikerjakan, alasan di balik keputusan, tantangan yang benar-benar dialami, lalu hasil yang memang disebutkan author.

Jika input berasal dari cerita mentah author, pertahankan karakter bahasa, urutan cerita, konteks personal, dan detail kecil yang membuatnya terasa autentik. Rapikan grammar dan alurnya tanpa mengubahnya menjadi copywriting generik. Kalimat informal yang masih jelas dan enak dibaca boleh dipertahankan. Jangan menambahkan motivasi, proses, tantangan, hasil, atau klaim yang tidak ada di sumber.

### Alur Kalimat dan Punctuation

Jangan menjadikan tanda titik dua, `--`, atau em dash sebagai pola utama untuk menyambung ide di tengah paragraf. Gunakan tanda tersebut hanya ketika memang paling tepat secara bahasa. Jika hubungan antaride bisa disampaikan secara natural, gunakan kalimat utuh atau kata penghubung seperti “karena”, “jadi”, “karena itu”, “sementara itu”, “dari situ”, “saat itu”, “kemudian”, atau “akhirnya”. Jangan memaksakan kata penghubung jika kalimat sudah mengalir tanpa itu.

Hindari pola mekanis seperti “Tujuannya adalah…”, “Tantangannya adalah…”, “Solusinya adalah…”, dan “Hasilnya adalah…”. Hindari juga daftar terselubung yang diawali dengan titik dua jika informasi tersebut lebih nyaman dibaca sebagai narasi. List tetap boleh digunakan ketika isinya memang lebih jelas sebagai daftar, tetapi cerita utama project tetap berupa paragraf.

Variasikan panjang dan struktur kalimat. Campurkan kalimat pendek, sedang, dan sesekali kalimat panjang agar ritmenya terasa manusiawi. Jangan memenuhi satu paragraf dengan klausa panjang, tetapi jangan pula memecah semua ide menjadi kalimat-kalimat pendek seperti dokumentasi.

Contoh revisi yang lebih natural:

```text
Kurang natural: Project ini punya satu tantangan utama: waktu pengerjaannya sangat pendek.
Lebih natural: Salah satu tantangan terbesar di project ini adalah waktu pengerjaannya yang cukup pendek.

Kurang natural: Aku memilih warna biru -- warna yang juga identik dengan brand Inatechno.
Lebih natural: Aku memilih warna biru karena warna tersebut juga cukup identik dengan brand Inatechno.
```

Gunakan prinsip “edit only where it improves readability or consistency”. Jika paragraf sudah natural, jangan mengubahnya hanya agar terlihat berbeda.

Tag/stack harus berasal dari input author atau referensi yang eksplisit. Jika diperlukan tetapi belum tersedia, Codex harus bertanya.

## Struktur Visual dan Aset

Setiap project mempunyai cover wajib dengan rasio kanonik 3:2. Gunakan `COVER_MASTER` dari `lib/cover.ts` sebagai ukuran ekspor yang disarankan; jangan menggandakan angka dimensinya. Jika aset sudah ada, ukur file dan gunakan dimensi aktual yang memenuhi guard rasio cover.

`Jumlah gambar` berarti total file gambar unik termasuk satu cover, kecuali author menyebutkan pembagian lain. Contoh: 4 berarti 1 cover + 3 gambar galeri. Cover yang digunakan ulang dalam galeri tidak dihitung dua kali. Jangan menambahkan hover image atau gambar proses di luar total tersebut tanpa kebutuhan dari author.

Aset baru mengikuti folder per slug:

```text
public/projects/<slug>/
├── cover.jpeg
├── hover.jpeg                 # opsional
├── gallery-01.jpeg            # opsional
├── gallery-02.jpeg
├── process-01-01.jpeg         # opsional
├── process-01-02.jpeg
└── case-study-01.jpeg         # opsional
```

Format default gambar project baru adalah `.jpeg`, termasuk cover, hover image, galeri, proses, dan case study. Jika aset belum tersedia, gunakan ekstensi `.jpeg` pada seluruh referensi dan petunjuk ekspor. Jika author sudah memberikan file dengan format lain, ikuti format aktual atau instruksi konversinya; jangan sekadar mengganti ekstensi file karena rename tidak mengonversi format. Aturan `.jpeg` tidak memaksa perubahan format logo tool. Tidak boleh membuat gambar dummy atau `.gitkeep`. Folder kosong boleh disiapkan sebagai lokasi tujuan meskipun tidak terlacak Git.

Playbook menjelaskan empat lapisan visual:

1. `image`: cover wajib untuk kartu, detail, dan metadata.
2. `hoverImage`: preview kedua opsional pada kartu atau detail.
3. `gallery`: rangkaian visual preview utama.
4. `processSections` dan `caseStudy`: narasi mendalam dengan galeri masing-masing, hanya bila cerita mendukungnya.

Semua gambar wajib memiliki alt text bermakna dan dimensi aktual. Jika aset belum tersedia, dimensi tidak boleh ditebak sebagai dimensi aktual; project tetap draft dan kekurangan tersebut dicatat sebagai tindakan author.

Untuk menyiapkan draft sebelum aset tersedia, referensi file boleh memakai ukuran ekspor target dari `COVER_MASTER`, dengan komentar eksplisit bahwa ukuran tersebut adalah target yang belum diverifikasi. Ini bukan klaim dimensi aktual. Catat nama file, fungsi, alt text sementara, dan ukuran target dalam ringkasan agar author dapat menyiapkan aset melalui Finder. Setelah aset tersedia, sesuaikan ekstensi, alt text, dan dimensi dengan file nyata sebelum publikasi; galeri tidak wajib memiliki rasio cover.

## Resource dan Tautan

Resource/referensi digunakan untuk membantu memahami project, bukan otomatis diterbitkan. Tautan project publik dipetakan ke `externalLink` hanya bila author memang ingin menampilkannya. Penyebutan brand/tool yang perlu menjadi tautan dalam narasi dipetakan ke `brandLinks` dan harus cocok dengan teks yang dirender.

## Logo Tool Bersama

Logo yang muncul saat hover pada kartu dibaca dari `project.logo`. Field yang sama juga dipakai pada header halaman detail. Ini berbeda dari `hoverImage` (gambar preview alternatif) dan ikon kecil pada tag teknologi.

Gunakan `public/tools/` sebagai satu sumber aset logo tool untuk project baru. Semua project yang memakai logo tool yang sama harus menunjuk file yang sama, bukan menyimpan salinan di folder masing-masing project.

Alur pemilihan dan penyiapan logo:

1. Tentukan tool utama dari cerita atau instruksi author. Jika hanya satu tool yang jelas, gunakan logo tool tersebut. Jika beberapa tool setara dan pilihan tidak jelas, tanyakan logo yang diinginkan; jangan sekadar mengambil tag pertama. Project dengan identitas/logo produk sendiri boleh tetap memakai logo khususnya.
2. Periksa `public/tools/` dan referensi logo yang sudah ada sebelum menentukan nama file. Pakai nama dan ekstensi aset bersama yang sudah tersedia. Contoh Photoshop yang sudah ada: `logo: "/tools/photoshop_logo.png"`, dengan file `public/tools/photoshop_logo.png`. Jangan membuat duplikat `photoshop.png` atau `photoshop.jpeg`.
3. Jika logo hanya tersedia di folder project lama, salin aset tersebut ke `public/tools/` untuk menjadi sumber bersama bagi project baru; pertahankan file dan referensi lama agar project existing tidak rusak. Gunakan nama file tool yang jelas. Migrasi seluruh project lama adalah pekerjaan terpisah, bukan syarat menambahkan project baru.
4. Jika belum ada aset logo sama sekali, tetap isi `logo` dengan path bersama yang harus dipenuhi author. Default nama untuk aset baru adalah `<tool-slug>.png`, misalnya `/tools/illustrator.png`. Bila author menyebut format SVG, JPEG, atau format lain, gunakan ekstensi yang sesuai. PNG menjadi default logo karena mendukung transparansi; gambar project tetap `.jpeg`.
5. Jangan membuat logo dummy atau mengunduh logo tanpa kebutuhan. Untuk file yang belum ada, tambahkan komentar pada referensi, siapkan folder bersama bila perlu, dan catat path serta nama file persis dalam Author Action Summary. Pertahankan status draft dan `Ready to Publish: NO` sampai logo yang dirujuk tersedia dan telah diperiksa.
6. Jika tool maupun identitas logo tidak diketahui, `logo` boleh tetap tidak diisi. Jangan mengarang tool. Setelah file tersedia, periksa format dan tampilannya; ukuran logo tidak mengikuti rasio cover 3:2.

Logo bersama tidak dihitung dalam `Jumlah gambar`; angka itu hanya menghitung gambar konten project termasuk cover. Prompt reusable tidak membutuhkan field tambahan untuk logo karena pemilihan mengikuti cerita dan aturan ini.

## Validasi dan Error Handling

Sebelum selesai, workflow harus memeriksa:

- seluruh input wajib tersedia;
- slug unik;
- kategori valid;
- status dan urutan benar;
- cover memenuhi guard rasio 3:2; ukuran ekspor target mengikuti `COVER_MASTER`, sedangkan aset yang tersedia memakai dimensi aktual;
- jumlah serta nama gambar cocok dengan input;
- referensi gambar baru menggunakan `.jpeg` kecuali ada aset aktual atau instruksi author yang berbeda;
- logo tool menunjuk sumber bersama `public/tools/`; jika file belum ada, path dan tindakan manual tercatat serta status tetap draft;
- setiap gambar tersedia mempunyai alt text dan dimensi yang benar; referensi aset yang belum tersedia ditandai sebagai target draft dan dicatat dalam ringkasan;
- tautan eksternal valid dan hanya diterbitkan dengan maksud author;
- struktur section tidak kosong atau dibuat-buat;
- project draft tidak muncul pada halaman publik.
- semua narasi memakai “aku”, bukan “saya”, kecuali kutipan atau teks eksternal;
- titik dua, dash, dan em dash tidak dipakai berulang sebagai penghubung ide;
- paragraf tidak mengikuti pola dokumentasi seperti Problem/Solution/Result jika bisa diceritakan secara natural;
- variasi kalimat terasa wajar dan tidak terlalu formal, seragam, atau generik;
- hasil penyuntingan tidak mengubah fakta, urutan cerita penting, atau karakter bahasa author.

Verifikasi teknis menjalankan targeted ESLint untuk file baru, `npx tsc --noEmit`, dan `npm run build`. Kegagalan unrelated dibedakan dengan jelas dari kegagalan akibat project baru.

## Output Akhir

Setiap eksekusi playbook wajib menghasilkan Author Action Summary yang mencantumkan:

- judul, slug, kategori, tahun, status, dan order;
- struktur konten yang dibuat;
- daftar aset beserta path folder, nama file persis untuk di-rename melalui Finder, fungsi, alt text, dan dimensi; bedakan ukuran aktual dari target ekspor yang belum diverifikasi;
- path logo bersama dan status ketersediaannya; jika belum tersedia, tuliskan nama/format file yang perlu ditambahkan manual ke `public/tools/`;
- placeholder atau informasi yang harus dilengkapi manual;
- hasil lint, typecheck, dan build;
- keputusan `Ready to Publish: YES/NO` beserta alasan spesifik.

## Batasan

Penambahan project tidak mengubah UI `/work`, routing, content model, auto-discovery, cover guard, atau komponen gallery. Tidak ada dependency baru, migrasi project lama, gambar generatif, publikasi otomatis, maupun refactor di luar kebutuhan konten project.

## Kriteria Selesai

- Dokumen ini cukup lengkap untuk menjalankan penambahan project dari prompt reusable tanpa instruksi tambahan atau ketergantungan pada playbook lain yang belum tersedia.
- Workflow mengikuti `types/project.ts`, `data/projects.ts`, `lib/cover.ts`, renderer `/work`, dan pola content existing.
- Pertanyaan lanjutan hanya muncul ketika informasi penting tidak tersedia.
- Project baru aman secara default sebagai draft.
- Author menerima daftar tindakan manual yang konkret sebelum project dapat dipublikasikan.
