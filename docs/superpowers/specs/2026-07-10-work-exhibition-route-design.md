# Design Specification — `/work` "Exhibition Route"

| | |
|---|---|
| **Status** | Draft untuk review |
| **Tanggal** | 10 Juli 2026 |
| **Cakupan** | Halaman `/work` saja (indeks project) |
| **Di luar cakupan** | `/work/[slug]`, `SelectedWork` di home, spesifikasi teknis, desain visual detail |
| **Dokumen lanjutan** | Technical Specification (belum ditulis) |

Dokumen ini adalah **single source of truth** untuk pengalaman halaman `/work`. Dia menjelaskan *mengapa* halaman ini didesain seperti ini, bukan *bagaimana* membangunnya. Seseorang yang baru bergabung ke project ini harus bisa memahami filosofi desainnya dari dokumen ini sebelum melihat satu baris kode pun. Tidak ada pembahasan framework, library, atau kode di sini — itu milik Technical Specification.

---

## 1. Vision

`/work` adalah **sayap galeri** dari situs ini.

Pengunjung yang membukanya sedang tidak mencari informasi — dia sedang menilai karya dan, lewat karya itu, menilai pembuatnya. Maka halaman ini tidak boleh terasa seperti indeks, katalog, atau feed. Dia harus terasa seperti **berjalan di sebuah pameran yang dikurasi**: pelan, lapang, percaya diri, dan punya arah.

Yang ingin dirasakan pengunjung, dalam satu kalimat: *"tempat ini berbeda — pelan-pelan saja."* Ukuran keberhasilannya sederhana: pengunjung memperlambat scroll-nya, merasakan kualitas dari cara karya dipajang (bukan hanya dari karyanya), dan cukup penasaran untuk membuka minimal satu halaman detail.

Halaman ini berbeda dari Writing karena tugasnya berbeda. Writing melayani pembaca: padat, bisa dipindai, banyak pilihan, tipografi ukuran baca. Work melayani pengalaman: sedikit unit, skala besar, ruang lapang, dan urutan yang ditentukan kurator — bukan pengunjung.

## 2. Core Philosophy

> **Writing = dibaca. Work = dialami.**

Dua halaman ini memakai design system yang sama tetapi **tata bahasa komposisi yang terbalik**:

| | Writing | Work |
|---|---|---|
| Unit | Banyak, kecil | Sedikit, besar |
| Kepadatan | Rapat, bisa dipindai | Renggang, dijalani |
| Dominasi | Teks | Gambar |
| Tipografi | Ukuran baca | Ukuran display |
| Scroll | Memindai | Berjalan |
| Urutan | Dikelompokkan per topik | Dikurasi sebagai cerita |
| Peran teks | Konten utama | Penanda dan identitas |

Konsekuensi paling radikal dari filosofi ini: **Work adalah halaman yang nyaris tidak punya kalimat.** Writing adalah halaman kalimat; Work bercerita lewat komposisi, ritme, whitespace, tipografi, dan motion. Cerita lengkap tiap karya milik halaman detail — halaman ini hanya memperlihatkan, tidak menceritakan. Jarak antara "aku suka ini" dan "aku belum tahu ceritanya" itulah yang membuat orang mengklik.

## 3. Experience Principles

Prinsip-prinsip ini adalah aturan desain. Setiap keputusan di halaman ini harus bisa dipertanggungjawabkan terhadap daftar ini:

1. **Satu karya berbicara pada satu waktu.** Di titik scroll manapun, hanya satu karya yang menjadi pusat perhatian. Karya tidak pernah berebut panggung.
2. **Scroll sepenuhnya milik pengunjung.** Motion merespons scroll, tidak pernah mengambil alih, membajak, atau memaksa snap.
3. **Gambar adalah kalimatnya; teks hanya penanda.** Teks di halaman ini terbatas pada identitas (kata kerja bab), label (judul, kategori, tahun), dan penunjuk arah. Tidak ada kalimat penghubung, tidak ada paragraf.
4. **Whitespace adalah dinding galeri.** Ruang kosong bukan sisa layout — dia yang memberi karya otoritas dan memberi pengunjung napas. Dia didesain, bukan disisakan.
5. **Urutan adalah kurasi.** Posisi setiap karya dalam rute bermakna. Karya baru tidak "ditempel di akhir" — dia mendapat tempat dalam cerita, atau cerita dikurasi ulang.
6. **Motion melayani pemahaman.** Setiap animasi harus bisa menjawab: apa yang dia arahkan, perjelas, ritmekan, atau sambungkan? Tidak bisa menjawab = gimmick = dihapus.
7. **Struktur harus bercerita meski motion mati.** Dengan preferensi reduced-motion, halaman tetap harus terasa seperti bab-bab sebuah perjalanan. Motion memperkuat cerita; dia bukan cerita itu sendiri.
8. **Ketidakseragaman yang disengaja.** Ritme dan komposisi yang bervariasi adalah rasa "dikurasi". Keseragaman template adalah rasa "feed" — musuh utama halaman ini.
9. **Setiap elemen punya tujuan.** Kalau ragu sebuah elemen perlu ada, hapus.
10. **Satu design system, dua ruangan.** Work tidak boleh terasa seperti situs lain. Token yang sama (zinc, border tipis, radius, glass, Geist) — hanya skala dan kepadatannya yang dibalik.

## 4. Moodboard

Lima referensi konseptual. Masing-masing dipinjam prinsipnya, bukan bentuknya.

### White Cube Gallery
- **Diambil:** dinding sebagai kurator — satu karya per dinding, ruang kosong memberi karya otoritas. Teks hanya dua ukuran: *wall text* besar di pintu ruangan (satu-dua kata) dan *label plate* kecil di samping karya (judul, medium, tahun). Tidak pernah ada paragraf di dinding.
- **Tidak diambil:** kesterilan total. Situs ini punya kehangatan — border tipis, radius, glass — dan itu dipertahankan.

### Apple Product Storytelling
- **Diambil:** satu pesan per viewport; motion selalu melayani pemahaman; kepercayaan diri skala — satu objek besar di ruang lapang lebih meyakinkan daripada empat objek sedang.
- **Tidak diambil:** teatrikalitas pinned/scrubbed dan nada "menjual". Scroll tetap milik pengunjung.

### Editorial / Art Book
- **Diambil:** ritme antar-spread — komposisi berubah halaman ke halaman (besar/kecil, kiri/kanan, padat/kosong) tapi tetap satu buku karena grid dasarnya sama; *folio* (penomoran kecil yang memberitahu posisi); *figure inset* (gambar proses kecil menempel di samping karya utama — "vitrine").
- **Tidak diambil:** body text. Ini buku gambar, bukan buku baca.

### Swiss Typography / International Style
- **Diambil:** angka sebagai elemen grafis — numeral bab `01`–`04` berdiri sebagai bentuk visual, bukan sekadar metadata; hierarki dibangun hanya lewat ukuran dan berat; grid disiplin yang justru mengizinkan variasi komposisi tanpa terlihat kacau.
- **Tidak diambil:** kedinginan dogmatis. Geist + zinc sudah setengah Swiss; tidak perlu dipaksakan lebih jauh.

### Wayfinding / Signage
- **Diambil:** sistem penanda yang bicara tanpa kalimat — garis, angka, satu kata, konsistensi posisi. Benang penanda dan counter bab adalah signage: "kamu di rute, sudah sejauh ini, ujungnya ada."
- **Tidak diambil:** warna keras khas signage. Penanda di sini nyaris tak terlihat sampai dicari.

### Sintesis: menghuni, bukan meniru
Kelima referensi dilebur ke dalam design system yang sudah ada. **Zinc, border tipis, rounded, dan Geist adalah "gedungnya"**; white cube memberi cara menggantung karya; editorial memberi ritme membalik halaman; Swiss memberi disiplin penanda; Apple memberi disiplin fokus; signage memberi arah. Hasil akhirnya tidak terlihat seperti salah satu referensi — dia terlihat seperti situs ini, yang punya sayap galeri.

## 5. Exhibition Route

Struktur perjalanan halaman dari atas ke bawah, dengan tujuan UX tiap bagian:

```
ARRIVAL      lambat  — dekompresi, janji perjalanan, horizon "4 bab"
CHAPTER 01   dwell   — numeral → kata kerja → karya → label plate
TRANSITION   napas   — lorong bisu; benang menggambar; bab berikutnya mengintip
CHAPTER 02   dwell   — komposisi berbeda dari bab 01
TRANSITION   napas
CHAPTER 03   dwell
TRANSITION   napas
CHAPTER 04   dwell   — bab penutup, termegah
EXIT         lambat  — perjalanan mendarat, pintu tetap terbuka
```

### Arrival
Viewport pertama nyaris kosong: identitas halaman dan indeks empat kata kerja — seperti *floor plan* di pintu masuk pameran. Tujuan UX: **dekompresi** — mereset mode pengunjung dari "memindai feed" menjadi "memasuki ruang", dan memasang **horizon** — pengunjung tahu rute ini berhingga dan punya arah, yang membedakannya dari feed tanpa ujung.

### Chapter (pola umum)
Setiap bab memakai urutan kemunculan yang sama — *marker* dulu (numeral + kata kerja + kategori/tahun), lalu *karya*, lalu *label plate* — tetapi ekspresi visual yang berbeda (lihat §8). Tujuan UX: beat yang konsisten membuat halaman terasa satu sistem; ekspresi yang berbeda membuat tiap karya terasa dikurasi secara personal. Urutan kemunculan meniru perilaku alami di galeri: melihat karyanya dulu, baru menunduk membaca labelnya.

### Transition (lorong)
Ruang hampir kosong di antara dua bab. Hanya dua hal terjadi: benang penanda terus menggambar dirinya, dan numeral + kata kerja bab berikutnya muncul samar lebih dulu — seperti melihat pintu ruangan berikutnya dari ujung lorong. Tujuan UX: **pacing** (mencegah dua karya melebur jadi satu kesan), **antisipasi** tanpa kalimat, dan jeda kognitif yang membuat karya sebelumnya sempat mengendap.

### Exit
Benang berhenti di penanda akhir. Bila ada karya berstatus draft, dia hadir sebagai siluet redup berlabel `05 — soon`: pameran ini hidup, bukan arsip beku. Satu ajakan berlabel (kontak / writing) tanpa narasi. Tujuan UX: perjalanan **mendarat** — ada rasa selesai — tetapi pintunya terbuka ke depan; konversi hadir tanpa berteriak.

## 6. Storytelling System

Cerita halaman ini adalah busur craft: **Merancang → Menjembatani → Mengotomasi → Bercerita.** Busur itu disampaikan oleh empat pembawa narasi non-verbal — bukan oleh paragraf:

### Pembawa 1 — Empat kata kerja sebagai wall text
Seluruh narasi verbal dikompresi menjadi empat kata: *Merancang. Menjembatani. Mengotomasi. Bercerita.* Satu kata per bab, ukuran display, seperti wall text di pintu ruangan galeri. Ini teks sebagai identitas — tetapi dibaca berurutan dari atas ke bawah, empat kata itu adalah ceritanya. Pengunjung yang scroll cepat pun menangkap busurnya.

### Pembawa 2 — Evolusi komposisi sebagai alur
Pembawa terkuat: komposisi tiap bab **mewujudkan kata kerjanya**, sehingga berjalan dari atas ke bawah terasa seperti melewati empat dunia: **ekspresif → dualitas → sistem → sinema** (detail per bab di §8). Perubahan komposisi itu sendiri adalah alur cerita.

### Pembawa 3 — Karakterisasi motion
Grammar motion satu untuk seluruh halaman, tetapi tiap bab mendapat **satu aksen tanda tangan** yang memerankan kata kerjanya (detail di §8). Aksen adalah karakter suara tiap bab — bukan dekorasi tambahan.

### Pembawa 4 — Ritme dan wayfinding
Pergantian *dwell* (bab, padat) dan *napas* (lorong, kosong) menciptakan tempo yang terasa dikurasi. Benang hairline yang menggambar diri mengikuti kemajuan pengunjung plus counter `01 / 04` memberi rasa "sedang menempuh rute" tanpa satu kalimat pun.

### Anggaran teks
Teks di seluruh halaman dibatasi keras: **di bawah ~40 kata** — empat kata kerja, label plate per karya (judul + kategori + tahun), penanda arah, dan satu label ajakan di Exit. Tidak ada kalimat penghubung. Tidak ada paragraf.

### Tes narasi
**Hapus semua teks dari halaman ini — dia masih harus bercerita.** Kalau busur "ekspresif → dualitas → sistem → sinema" tidak terasa tanpa teks, storytelling-nya gagal dan harus diperbaiki di komposisi, bukan dengan menambah kata.

## 7. Motion Philosophy

Motion di halaman ini adalah **tata cahaya galeri**: pengunjung seharusnya tidak menyadarinya, tetapi tanpa dia semua terasa datar.

Motion hanya boleh melakukan empat hal:

1. **Mengarahkan perhatian** — memastikan karya yang sedang giliran bicara adalah satu-satunya yang bicara.
2. **Memperjelas hierarki** — urutan kemunculan (marker → karya → label) adalah urutan membaca.
3. **Memberi ritme** — kecepatan reveal membedakan dwell dan napas; lorong bergerak paling lambat karena jeda memang harus terasa lambat.
4. **Memperkuat transisi** — bab yang keluar viewport "mengendap" (meredup dan menyusut sehalus napas), bab berikutnya "bangun". Pengunjung merasa *melewati* karya, bukan menggulung daftar.

Aturan sikap:

- **Tes satu kalimat:** setiap animasi harus bisa menjawab "apa yang kamu arahkan, perjelas, ritmekan, atau sambungkan?" Tidak bisa menjawab = dihapus.
- **Motion adalah respons, bukan kendali.** Dia bereaksi terhadap scroll pengunjung. Tidak ada scroll-jacking, tidak ada snap paksa, tidak ada section yang mengunci layar.
- **Kedalaman dijatah.** Efek kedalaman (parallax halus) hanya milik karya utama tiap bab — kalau semua punya kedalaman, tidak ada yang punya.
- **Satu aksen per bab.** Setiap bab hanya boleh satu motion tanda tangan. Lebih dari itu, aksen berhenti menjadi karakter dan mulai menjadi kebisingan.
- **Kesetaraan reduced-motion.** Pengunjung yang mematikan motion mendapat halaman yang tetap utuh bercerita — lihat prinsip #7.

## 8. Chapter Identity

Busur dibaca: **ekspresif → dualitas → sistem → sinema.**

### Chapter 01 — Geopark Run Series
| | |
|---|---|
| **Kata kerja** | **Merancang** |
| **Peran dalam busur** | Pembuka: dunia desain, tempat semuanya bermula |
| **Karakter visual** | Paling ekspresif dan "bertangan" — poster 4:5, energi sketsa; materi proses (iterasi) hadir sebagai vitrine kecil di sisi karya utama |
| **Karakter layout** | Asimetris, offset — komposisi paling bebas di antara semua bab |
| **Karakter motion** | Stagger berlapis pada materi proses — rasa iterasi, tangan yang bekerja |
| **Emosi target** | Energi, kehangatan kerja tangan |

### Chapter 02 — iTailwind
| | |
|---|---|
| **Kata kerja** | **Menjembatani** |
| **Peran dalam busur** | Engsel cerita: jembatan antara dunia desain dan dunia kode |
| **Karakter visual** | Dualitas literal — dua state (desain ↔ hasil) tampil sebagai satu komposisi |
| **Karakter layout** | Dua panel berimbang / satu karya dengan dua wajah |
| **Karakter motion** | Crossfade antara dua state — jembatan diperankan, bukan diceritakan |
| **Emosi target** | Momen "aha" |

### Chapter 03 — Notion Auto Status
| | |
|---|---|
| **Kata kerja** | **Mengotomasi** |
| **Peran dalam busur** | Pendalaman: dari membangun alat menjadi membangun sistem |
| **Karakter visual** | Paling sistematis — diagram, label mono, elemen modular; bab paling "Swiss" |
| **Karakter layout** | Terkunci rapat ke grid; presisi di atas ekspresi |
| **Karakter motion** | Elemen masuk berurutan dengan timing presisi, seperti pipeline yang berjalan |
| **Emosi target** | Ketenangan presisi, rasa mesin yang rapi |

### Chapter 04 — Video Profile Fakultas Vokasi ITP
| | |
|---|---|
| **Kata kerja** | **Bercerita** |
| **Peran dalam busur** | Klimaks: semua craft bermuara ke kemampuan bercerita |
| **Karakter visual** | Sinematik — rasio lebar, karya terbesar di halaman |
| **Karakter layout** | Memakai lebar penuh area konten; halaman "membuka diri" di akhir |
| **Karakter motion** | Membuka melebar seperti layar menyala; afordans "tonton" |
| **Emosi target** | Takjub; crescendo |

Aturan untuk masa depan: **setiap karya baru harus menerima identitas bab yang lengkap** (kata kerja, peran dalam busur, karakter visual/layout/motion, emosi target) sebelum masuk ke rute. Kalau busur empat kata tidak lagi memuat cerita yang jujur, busurnya dikurasi ulang — bukan dipaksakan.

## 9. Emotional Timeline

```
Arrival      →  Tenang         "tempat ini berbeda"
Chapter 01   →  Penasaran      energi tangan menarik masuk
Transition   →  Napas          karya pertama mengendap
Chapter 02   →  Penemuan       "aha" — desain dan kode ternyata satu dunia
Transition   →  Napas
Chapter 03   →  Kekaguman hening   presisi yang menenangkan
Transition   →  Napas
Chapter 04   →  Crescendo      halaman membuka diri
Exit         →  Lega + terbuka "perjalanan ini belum selesai"
```

Mengapa ritme ini: pergantian **tegang–lega** adalah cara galeri mengelola kelelahan pengunjung — dwell tanpa napas melelahkan, napas tanpa dwell membosankan. Klimaks sengaja diletakkan **di akhir** supaya perjalanan punya arah dan alasan untuk diselesaikan; halaman yang meletakkan momen terbaiknya di atas memberi pengunjung alasan untuk berhenti di tengah. Dan penutupnya **terbuka, bukan rapat** — siluet "bab berikutnya" membuat pameran terasa hidup dan memberi alasan untuk kembali.

## 10. Design Guardrails

Aturan yang tidak boleh dilanggar oleh pengembangan halaman ini di masa depan:

1. **Jangan pernah menjadikan halaman ini feed atau katalog.** Tidak ada grid karya seragam, tidak ada infinite scroll, tidak ada "load more".
2. **Jangan menampilkan lebih dari satu karya aktif sekaligus.** Vitrine/materi proses adalah pendukung dalam bab — bukan karya kedua yang bersaing.
3. **Jangan gunakan motion yang mengambil alih scroll.** Tidak ada scroll-jacking, scroll-snap paksa, atau section pinned yang mengunci layar.
4. **Jangan menambahkan kalimat penghubung atau paragraf.** Anggaran teks keras: di bawah ~40 kata untuk seluruh halaman. Kalau sebuah cerita butuh kalimat, tempatnya di halaman detail.
5. **Jangan biarkan halaman ini terasa seperti Writing.** Tanda bahaya: komposisi mulai seragam, kepadatan naik, teks bertambah. Salah satunya muncul = berhenti dan kembali ke dokumen ini.
6. **Jangan menambah UI kontrol ke rute.** Tidak ada filter, sort, toggle tampilan, atau search. Kurasi adalah pekerjaan kurator, bukan pengunjung.
7. **Jangan memajang karya tanpa peran dalam busur.** Karya baru mendapat identitas bab lengkap (§8) atau busurnya dikurasi ulang. Tidak ada "tempel di akhir".
8. **Jangan gunakan motion yang tidak lulus tes satu kalimat**, dan jangan lebih dari satu aksen tanda tangan per bab.
9. **Jangan hilangkan kesetaraan reduced-motion dan dark mode.** Keduanya bukan fitur tambahan; halaman harus utuh di keduanya sejak versi pertama.
10. **Jangan korbankan mobile.** Rute harus tetap terasa rute di layar kecil — tinggi konten mengikuti isi, tidak ada penguncian satu-layar-penuh.
11. **Jangan menambah warna ke panggung.** Karya boleh berwarna sebebas-bebasnya; panggungnya tetap zinc-neutral. Kalau panggung mulai ikut berwarna, karya kehilangan otoritas.
12. **Jangan mengubah urutan bab tanpa mengubah cerita.** Urutan adalah kalimat; mengacak urutan sama dengan mengacak kata dalam kalimat.

---

## Lampiran — Keputusan yang melandasi dokumen ini

| Keputusan | Pilihan |
|---|---|
| Cakupan redesign | `/work` saja |
| Toggle grid/list | Dihapus — satu pengalaman terkurasi |
| Intensitas motion | Reveal + parallax halus; scroll 100% native |
| Kepadatan info per karya | Label plate ala galeri (judul, kategori, tahun) |
| Konsep experience | Exhibition Route (evolusi dari "Gallery Walk") |
| Benang merah | Busur craft: Merancang → Menjembatani → Mengotomasi → Bercerita |
| Urutan bab | GRS → iTailwind → Notion Auto Status → Video Vokasi ITP |
| Narasi verbal | Ditiadakan — storytelling non-verbal; teks hanya identitas dan penanda |
