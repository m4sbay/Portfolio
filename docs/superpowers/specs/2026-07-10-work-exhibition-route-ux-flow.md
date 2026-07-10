# UX Flow Specification — `/work` "Exhibition Route"

| | |
|---|---|
| **Status** | Draft untuk review |
| **Tanggal** | 10 Juli 2026 |
| **Dokumen induk** | [Design Specification](./2026-07-10-work-exhibition-route-design.md) |
| **Dokumen lanjutan** | Technical Specification (belum ditulis) |
| **Cakupan** | Perjalanan pengguna di halaman `/work`, dari kedatangan sampai keluar |

Dokumen ini menerjemahkan filosofi Design Specification menjadi **blueprint pengalaman pengguna** — apa yang dilihat, dirasakan, dan dilakukan pengunjung di setiap tahap halaman. Tidak ada pembahasan implementasi, framework, atau komponen di sini. Bila dokumen ini bertentangan dengan Design Specification, Design Specification yang menang; dokumen ini memperinci, tidak mengubah.

**Cara membaca:** setiap tahap perjalanan didokumentasikan dengan sepuluh faset yang sama — tujuan UX, apa yang dilihat, fokus perhatian, ritme scroll, kapan berhenti, kapan transisi, peran motion, apa yang tidak boleh bergerak, pengenalan bab berikutnya, dan pengarah ke halaman detail. Setelah itu, delapan lensa lintas-tahap.

---

## Peta Perjalanan

```
ARRIVAL     kedatangan — dua detik pertama
   ↓
HERO        ambang — floor plan pameran (indeks 4 kata kerja)
   ↓
CHAPTER 01  Merancang — Geopark Run Series
   ↓
TRANSITION  lorong 01→02
   ↓
CHAPTER 02  Menjembatani — iTailwind
   ↓
TRANSITION  lorong 02→03
   ↓
CHAPTER 03  Mengotomasi — Notion Auto Status
   ↓
TRANSITION  lorong 03→04
   ↓
CHAPTER 04  Bercerita — Video Vokasi ITP
   ↓
EXIT        ujung rute — benang berhenti, siluet bab berikutnya
   ↓
CTA         satu ajakan berlabel
```

---

## 1. Arrival — dua detik pertama

- **Tujuan UX:** dekompresi. Mereset mode pengunjung dari "memindai feed" menjadi "memasuki ruang". Kesan pertama: *tenang, berbeda, pelan-pelan saja.*
- **Apa yang dilihat:** viewport nyaris kosong — identitas halaman berukuran kecil dan banyak ruang. Tidak ada karya yang terlihat. Tidak ada yang berebut perhatian.
- **Fokus perhatian:** satu titik — identitas halaman. Sisanya sengaja hening.
- **Ritme scroll:** belum ada. Ini beat diam sebelum langkah pertama.
- **Kapan pengguna berhenti:** di sinilah pemberhentian pertama terjadi secara alami — sekejap, karena tidak ada hal lain yang menuntut.
- **Kapan transisi terjadi:** saat pengunjung memutuskan scroll pertamanya; keputusan itu miliknya, halaman hanya mengundang lewat kekosongan yang jelas "berlanjut ke bawah".
- **Bagaimana motion membantu:** satu reveal sangat halus saat halaman terbuka — cukup untuk terasa hidup, tidak cukup untuk terasa pertunjukan. Setelah itu diam.
- **Apa yang tidak boleh bergerak:** latar dan kerangka situs (navbar, tema). Kedatangan harus stabil.
- **Pengenalan bab berikutnya:** belum ada — baru janji, belum peta.
- **Pengarah ke detail:** tidak ada.

## 2. Hero — floor plan pameran

- **Tujuan UX:** memasang **horizon**. Pengunjung tahu rute ini berhingga (empat bab), punya arah, dan punya cerita — sebelum melihat satu karya pun.
- **Apa yang dilihat:** indeks empat kata kerja — *Merancang, Menjembatani, Mengotomasi, Bercerita* — dengan numeral `01`–`04`, seperti floor plan di pintu masuk pameran. Benang penanda mulai terlihat. Counter `01 / 04` mulai hidup.
- **Fokus perhatian:** urutan kata kerja, dibaca berurutan. Ini satu-satunya tempat di halaman di mana keempat verba terlihat bersama — busur cerita dalam satu pandangan.
- **Ritme scroll:** langkah pertama yang pelan; jarak ke Chapter 01 memberi ruang antisipasi, tidak langsung menabrak karya.
- **Kapan pengguna berhenti:** sejenak, untuk membaca empat kata. Empat kata adalah beban baca yang bisa diselesaikan bahkan oleh pengunjung tergesa.
- **Kapan transisi terjadi:** setelah indeks terbaca, kekosongan di bawahnya menarik scroll berlanjut ke Chapter 01.
- **Bagaimana motion membantu:** verba muncul ber-stagger satu kali — urutan kemunculan menegaskan bahwa urutan itu bermakna. Benang mulai "menggambar dirinya" ke bawah, memberi arah tanpa panah.
- **Apa yang tidak boleh bergerak:** verba setelah muncul. Mereka penanda, bukan atraksi; wall text tidak berkedip.
- **Bagaimana bab berikutnya diperkenalkan:** numeral `01 — Merancang` di indeks adalah undangan; ketika pengunjung scroll dan bertemu wall text `01 Merancang` dalam ukuran besar, terjadi koneksi "aku sudah melihat ini di peta" — rasa orientasi.
- **Pengarah ke detail:** belum ada.

## 3. Chapter 01 — Merancang (Geopark Run Series)

- **Tujuan UX:** membuka pameran dengan energi — dunia desain, tempat semuanya bermula. Menetapkan pola beat bab yang akan diulang: marker → karya → label.
- **Apa yang dilihat:** marker bab (numeral `01`, kata kerja *Merancang*, kategori/tahun dalam huruf kecil), lalu poster GRS rasio 4:5 sebagai karya utama, vitrine kecil berisi materi iterasi proses mengintip di sisi, dan label plate (judul, kategori, tahun).
- **Fokus perhatian:** karya utama. Vitrine adalah perhatian kedua — sengaja kecil supaya memancing condong, bukan membelah panggung. Label plate perhatian ketiga.
- **Ritme scroll:** dwell pertama — pengunjung melambat karena karya baru selesai "berbicara" ketika seluruh beat-nya tampil.
- **Kapan pengguna berhenti:** saat karya utama tampil penuh; vitrine iterasi memberi alasan berhenti kedua ("ada proses di balik ini").
- **Kapan transisi terjadi:** setelah label plate terbaca — informasi habis, rasa penasaran belum; scroll berlanjut membawa bab ini mengendap.
- **Bagaimana motion membantu:** beat kemunculan (marker → karya → label) menetapkan urutan membaca; aksen tanda tangan bab ini — stagger berlapis pada materi proses — memerankan kata *merancang*: iterasi, tangan yang bekerja.
- **Apa yang tidak boleh bergerak:** label plate dan marker setelah muncul; latar bab. Hanya karya (parallax halus) dan vitrine (sekali stagger) yang hidup.
- **Bagaimana bab berikutnya diperkenalkan:** belum di sini — tugas itu milik lorong setelahnya. Bab tidak pernah mempromosikan bab lain; itu merusak "satu karya bicara".
- **Pengarah ke detail:** seluruh area karya adalah pintu. Label plate yang irit adalah umpannya — poster indah + informasi minim = celah rasa penasaran. Afordans halus ("lihat karya", panah kecil) muncul saat hover/fokus, bukan tombol permanen yang berteriak.

## 4. Transition — pola umum lorong

Tiga lorong (01→02, 02→03, 03→04) memakai pola yang sama:

- **Tujuan UX:** *pacing* dan pengendapan — mencegah dua karya melebur jadi satu kesan; memberi jeda kognitif seperti dinding kosong di antara dua lukisan.
- **Apa yang dilihat:** ruang hampir kosong. Hanya dua elemen hidup: benang penanda yang terus menggambar dirinya, dan numeral + kata kerja bab berikutnya yang muncul samar — pintu ruangan berikutnya terlihat dari ujung lorong.
- **Fokus perhatian:** tidak ada — dan itu disengaja. Lorong adalah tempat mata beristirahat; perhatian samar tertuju ke pratinjau verba berikutnya.
- **Ritme scroll:** napas — pengunjung secara alami mempercepat scroll melewati ruang kosong; halaman mengizinkannya tanpa hukuman.
- **Kapan pengguna berhenti:** idealnya tidak. Lorong bukan pemberhentian; kalau pengunjung berhenti lama di lorong, lorongnya terlalu panjang atau terlalu ramai.
- **Kapan transisi terjadi:** lorong *adalah* transisinya — bab sebelumnya mengendap di atas, verba berikutnya menyala di bawah.
- **Bagaimana motion membantu:** dua gerakan saja: benang menggambar (kemajuan terasa), dan pratinjau verba muncul paling lambat dari semua elemen halaman — jeda memang harus terasa lambat. Serah-terima bab (yang lama meredup dan menyusut, yang baru bangun) terjadi di tepi lorong.
- **Apa yang tidak boleh bergerak:** segalanya selain dua elemen di atas. Lorong yang ramai bukan lorong.
- **Bagaimana bab berikutnya diperkenalkan:** lewat antisipasi non-verbal — numeral dan kata kerja samar, tanpa kalimat, tanpa gambar. Karya berikutnya tidak boleh bocor ke lorong; kejutan wujudnya milik babnya sendiri.
- **Pengarah ke detail:** tidak ada. Lorong netral.

**Perbedaan antar lorong** hanya pada muatan emosinya:
- **Lorong 01→02:** dari energi tangan menuju rasa penasaran teknis — pratinjau *"02 Menjembatani"* memancing pertanyaan "menjembatani apa?"
- **Lorong 02→03:** dari momen "aha" menuju ketenangan — turun tempo, menyiapkan bab paling presisi.
- **Lorong 03→04:** dari presisi menuju antisipasi klimaks — lorong terakhir boleh terasa sedikit lebih panjang, seperti tarikan napas sebelum ruangan utama.

## 5. Chapter 02 — Menjembatani (iTailwind)

- **Tujuan UX:** momen "aha" — engsel cerita antara dunia desain dan dunia kode, diperankan secara visual tanpa penjelasan.
- **Apa yang dilihat:** marker bab `02 Menjembatani`, lalu satu komposisi dualitas: dua state karya (wajah desain ↔ wajah hasil) tampil sebagai satu kesatuan, dan label plate.
- **Fokus perhatian:** *perbandingan* — mata bergerak antara dua state dan menangkap sendiri hubungannya. Bab ini satu-satunya yang meminta pengunjung membandingkan, dan itulah karakternya.
- **Ritme scroll:** dwell — sedikit lebih reflektif dari bab 01; memahami dualitas butuh sepersekian detik lebih lama daripada mengagumi poster.
- **Kapan pengguna berhenti:** saat kedua state terlihat dan hubungan keduanya "klik".
- **Kapan transisi terjadi:** setelah momen klik itu; label plate menutup, lorong menunggu.
- **Bagaimana motion membantu:** aksen tanda tangan — crossfade antara dua state — membuat jembatan *terjadi di depan mata*, bukan diceritakan. Ini contoh murni motion sebagai narasi.
- **Apa yang tidak boleh bergerak:** kedua state tidak boleh bergerak sendiri-sendiri secara terpisah — dualitasnya harus tetap terasa satu karya dengan dua wajah, bukan dua karya.
- **Bagaimana bab berikutnya diperkenalkan:** oleh lorong 02→03, bukan oleh bab ini.
- **Pengarah ke detail:** momen "aha" adalah umpannya — pengunjung yang menangkap hubungan dua state ingin tahu cara kerjanya, dan jawabannya hanya ada di halaman detail. Afordans sama dengan bab lain: seluruh karya adalah pintu, penanda halus saat hover/fokus.

## 6. Chapter 03 — Mengotomasi (Notion Auto Status)

- **Tujuan UX:** kekaguman hening — memperlihatkan sisi sistem: presisi, keteraturan, mesin yang rapi. Kontras karakter yang tajam dari dua bab sebelumnya justru memperkuat keduanya.
- **Apa yang dilihat:** marker bab `03 Mengotomasi`, karya bergaya diagram/sistem dalam komposisi terkunci rapat ke grid, label bergaya teknikal (mono), label plate.
- **Fokus perhatian:** keteraturan itu sendiri — kerapian grid dan urutan elemen adalah pesannya. Tidak ada elemen tunggal yang menonjok; keseluruhannya yang berbicara.
- **Ritme scroll:** dwell yang tenang dan datar — sengaja tanpa gejolak; bab ini adalah bagian "pianissimo" sebelum crescendo.
- **Kapan pengguna berhenti:** saat urutan elemen selesai masuk — ada kepuasan kecil menonton sistem menata dirinya.
- **Kapan transisi terjadi:** setelah komposisi lengkap dan terbaca; lorong terakhir menunggu.
- **Bagaimana motion membantu:** aksen tanda tangan — elemen masuk berurutan dengan timing presisi, seperti pipeline yang berjalan. Ketepatan timing-nya *adalah* pesan "otomasi".
- **Apa yang tidak boleh bergerak:** setelah tertata, semuanya diam sempurna. Sistem yang terus bergerak terasa gelisah; sistem yang selesai menata diri lalu diam terasa andal.
- **Bagaimana bab berikutnya diperkenalkan:** oleh lorong 03→04.
- **Pengarah ke detail:** rasa "bagaimana sistem ini bekerja?" — bab ini menunjukkan *bahwa* sistemnya rapi, tidak pernah *bagaimana* rapinya. Jawaban di halaman detail.

## 7. Chapter 04 — Bercerita (Video Vokasi ITP)

- **Tujuan UX:** crescendo. Semua craft bermuara ke kemampuan bercerita; halaman "membuka diri" di akhir dan memberi alasan perjalanan ini diselesaikan.
- **Apa yang dilihat:** marker bab `04 Bercerita`, lalu karya terbesar di halaman — bingkai sinematik rasio lebar memakai lebar penuh area konten, dengan afordans "tonton", dan label plate.
- **Fokus perhatian:** satu titik, total — bab ini paling sedikit elemennya justru karena dia klimaks. Layar lebar itu sendiri, dan afordans tonton di atasnya.
- **Ritme scroll:** dwell terpanjang — skala yang tiba-tiba melebar secara alami menghentikan scroll; pengunjung berhenti bukan karena diminta, tapi karena ruangannya membesar.
- **Kapan pengguna berhenti:** saat bingkai lebar terbuka penuh. Ini pemberhentian paling andal di seluruh halaman.
- **Kapan transisi terjadi:** setelah momen sinematik selesai dirasakan; Exit ada tepat di bawahnya — jarak menuju Exit lebih pendek daripada lorong, karena klimaks dan pendaratan harus terasa bersambung.
- **Bagaimana motion membantu:** aksen tanda tangan — membuka melebar seperti layar menyala. Perubahan skala dari bab-bab sebelumnya ke bab ini adalah motion struktural: halaman yang tadinya "berbingkai" kini "terbuka".
- **Apa yang tidak boleh bergerak:** video tidak berputar otomatis. Afordans tonton mengundang; pemutaran adalah keputusan pengunjung — konsisten dengan prinsip "scroll (dan waktu) milik pengunjung".
- **Bagaimana bab berikutnya diperkenalkan:** tidak ada bab berikutnya — dan itu harus terasa. Setelah bab ini, benang mendekati ujungnya; pengunjung merasakan rute hampir selesai.
- **Pengarah ke detail:** afordans tonton adalah pintu paling eksplisit di halaman ini — satu-satunya bab yang ajakannya boleh sedikit lebih terlihat, karena klimaks menanggungnya.

## 8. Exit — ujung rute

- **Tujuan UX:** pendaratan. Perjalanan harus terasa *selesai* — bukan sekadar kehabisan konten — tetapi pintunya terbuka ke depan.
- **Apa yang dilihat:** benang penanda berhenti di titik akhir; counter genap `04 / 04`. Bila ada karya berstatus draft: siluet redup berlabel `05 — soon`. Ruang kembali melapang seperti Arrival — halaman menutup dengan hening yang sama seperti dia membuka.
- **Fokus perhatian:** rasa selesai itu sendiri; lalu, samar, siluet bab berikutnya.
- **Ritme scroll:** melambat secara alami — tidak ada lagi yang ditunggu, tetapi belum ada ajakan; sepersekian detik kelegaan.
- **Kapan pengguna berhenti:** di sini — pemberhentian terakhir, tempat kesan keseluruhan mengendap.
- **Kapan transisi terjadi:** dari pendaratan emosional menuju satu keputusan praktis: CTA tepat di bawah.
- **Bagaimana motion membantu:** hampir tidak ada — benang menuntaskan garisnya; siluet draft muncul paling redup dan paling lambat. Pendaratan yang tenang.
- **Apa yang tidak boleh bergerak:** semuanya kecuali dua hal di atas. Exit yang ramai membatalkan pendaratan.
- **Bagaimana bab berikutnya diperkenalkan:** siluet `05 — soon` adalah "bab berikutnya" dalam skala pameran — alasan untuk kembali, bukan untuk lanjut sekarang.
- **Pengarah ke detail:** tidak langsung — Exit mengarahkan ke CTA, bukan ke detail. Pengunjung yang ingin kembali ke karya tertentu punya scroll dan ingatan; Exit tidak perlu daftar ulang.

## 9. CTA — satu ajakan

- **Tujuan UX:** konversi tanpa berteriak. Setelah pameran, satu pertanyaan wajar: "lalu apa?" — CTA menjawabnya sekali, dengan tenang.
- **Apa yang dilihat:** satu ajakan berlabel (kontak / lihat writing) — tunggal, jelas, tanpa narasi pendamping.
- **Fokus perhatian:** total pada satu elemen — tidak ada pilihan kedua yang mengencerkan.
- **Ritme scroll:** titik nol — akhir halaman.
- **Kapan pengguna berhenti:** ini pemberhentian terminal.
- **Kapan transisi terjadi:** keluar halaman — ke kontak, writing, atau kembali ke karya.
- **Bagaimana motion membantu:** tidak perlu. Kalau seluruh perjalanan bekerja, CTA tidak butuh bantuan.
- **Apa yang tidak boleh bergerak:** CTA itu sendiri — elemen keputusan harus stabil dan dapat diandalkan.
- **Bagaimana bab berikutnya diperkenalkan:** —
- **Pengarah ke detail:** —

---

## Lensa Lintas-Tahap

### A. Viewport Rhythm

Proporsi konseptual (bukan angka teknis) — berapa "ruang layar" yang layak dimiliki tiap tahap relatif terhadap yang lain:

```
ARRIVAL+HERO   ████████        lapang — satu tarikan napas penuh
CHAPTER 01     ████████████    dwell penuh
TRANSITION     ████            pendek — napas, bukan pemberhentian
CHAPTER 02     ████████████    dwell penuh
TRANSITION     ████
CHAPTER 03     ████████████    dwell penuh
TRANSITION     █████           sedikit lebih panjang — napas sebelum klimaks
CHAPTER 04     ██████████████  terluas dan termegah
EXIT           ██████          melapang kembali
CTA            ███             ringkas
```

Prinsipnya: **bab selalu lebih besar dari lorong; klimaks lebih besar dari bab; ambang dan ujung saling mencerminkan.** Tinggi setiap bagian mengikuti kontennya — tidak ada bagian yang dikunci setinggi layar.

### B. Dwell Time (konseptual)

Dwell tidak dipaksa — dia *diundang*. Tiga mekanisme undangan berhenti, dari terkuat ke terhalus:

1. **Skala** — sesuatu yang tiba-tiba besar menghentikan mata (Chapter 04).
2. **Kelengkapan beat** — pengunjung menunggu marker → karya → label selesai; berhenti terasa "belum selesai kalau pergi sekarang" (semua bab).
3. **Detail sekunder** — vitrine dan dualitas memberi alasan berhenti kedua bagi yang sudah tertarik (Chapter 01, 02).

Urutan dwell yang diharapkan dari terpanjang ke terpendek: **Chapter 04 → Chapter 01 → Chapter 02 → Chapter 03 → Exit → Hero → Arrival → lorong-lorong.** Lorong tidak boleh mengundang dwell sama sekali.

### C. Attention Map

| Tahap | Perhatian utama | Perhatian kedua | Sengaja hening |
|---|---|---|---|
| Arrival | Identitas halaman | — | Segalanya |
| Hero | Urutan 4 kata kerja | Benang, counter | Latar |
| Chapter 01 | Poster GRS | Vitrine proses | Marker, latar |
| Lorong | (istirahat) | Pratinjau verba berikutnya | Segalanya |
| Chapter 02 | Dualitas dua state | Momen crossfade | Marker, latar |
| Chapter 03 | Keteraturan komposisi | Urutan masuk elemen | Segalanya setelah tertata |
| Chapter 04 | Bingkai sinematik | Afordans tonton | Segalanya |
| Exit | Rasa selesai | Siluet `05 — soon` | Benang yang berhenti |
| CTA | Satu ajakan | — | Segalanya |

Aturan bacanya: di setiap baris hanya ada **satu** perhatian utama — ini penerjemahan langsung prinsip "satu karya berbicara pada satu waktu" ke level tahap.

### D. Scroll Narrative

Perjalanan yang sama, dibaca sebagai naskah pengalaman:

> Kamu tiba di ruang yang hening — jelas ini bukan feed. Sebuah floor plan kecil menjanjikan empat bab: merancang, menjembatani, mengotomasi, bercerita. Kamu melangkah. Ruangan pertama hangat dan bertangan — sebuah poster besar, sketsa-sketsa proses mengintip di sisinya. Kamu melewatinya, dan di lorong yang sunyi sebuah angka samar berkata: berikutnya, *menjembatani*. Ruangan kedua memintamu membandingkan dua wajah dari satu benda — lalu klik, kamu mengerti. Lorong lagi. Ruangan ketiga dingin dan rapi; kamu menonton sistem menata dirinya, lalu diam sempurna. Lorong terakhir sedikit lebih panjang — tarikan napas. Lalu dinding-dinding melebar: sebuah layar menyala selebar ruangan. Ini ruangan terakhir dan yang termegah. Di ujung, garis yang menemanimu sejak pintu berhenti. Ada siluet redup — pameran berikutnya sedang disiapkan. Satu pintu keluar bertuliskan ajakan. Kamu keluar dengan perasaan yang tidak diberikan feed manapun: kamu baru saja *menempuh* sesuatu.

### E. Progressive Disclosure

Informasi diberikan berlapis; setiap lapis lengkap pada levelnya sendiri:

| Lapis | Yang didapat | Untuk siapa |
|---|---|---|
| 1 — Busur | Empat kata kerja (Hero + wall text bab) | Pengunjung tergesa; scroll cepat pun menangkap cerita |
| 2 — Karya | Wujud visual tiap project | Pengunjung yang berjalan normal |
| 3 — Label | Judul, kategori, tahun | Pengunjung yang condong mendekat |
| 4 — Cerita penuh | Halaman detail | Pengunjung yang membuka pintu |

Aturan: **tidak ada informasi lapis 4 yang bocor ke lapis 1–3.** Deskripsi, proses, dan konteks milik halaman detail — kebocoran ke halaman ini menutup celah rasa penasaran yang menjadi mesin klik. Pratinjau bab di lorong hanya boleh membocorkan lapis 1 (numeral + verba), tidak pernah lapis 2 (wujud karya).

### F. Accessibility Consideration

- **Struktur tanpa mata:** hierarki halaman harus bermakna bagi pembaca layar — judul halaman, lalu empat bab sebagai bagian setara dengan judul masing-masing (kata kerja + nama karya). Pengguna pembaca layar mengalami rute yang sama: ambang → empat bab berurutan → ujung.
- **Urutan fokus = urutan cerita:** navigasi keyboard menyusuri halaman dalam urutan naratif yang sama dengan urutan visual. Tidak ada jebakan fokus, tidak ada elemen interaktif yang hanya bisa dicapai lewat hover.
- **Tidak ada makna yang hanya dibawa motion:** semua informasi tersedia dalam keadaan diam (lihat lensa H). Crossfade dualitas Chapter 02, misalnya, tidak boleh menjadi satu-satunya cara melihat state kedua.
- **Teks alternatif:** karena halaman ini "berbicara lewat gambar", deskripsi alternatif tiap karya justru lebih penting dari biasanya — dia adalah label plate bagi yang tidak melihat.
- **Kontras dan tema:** label plate, marker, dan penanda harus lolos kontras di tema terang dan gelap; penanda yang "nyaris tak terlihat sampai dicari" tetap harus terbaca oleh yang mencarinya.
- **Target sentuh:** seluruh area karya sebagai pintu berarti target yang besar secara alami — dipertahankan; afordans kecil tidak boleh menjadi satu-satunya target.
- **Video:** tidak berputar otomatis; pemutaran selalu keputusan pengguna.

### G. Mobile Experience

Prinsip: **rute tetap rute** — bukan versi ringkas, melainkan galeri yang sama dengan lorong yang lebih sempit.

- **Satu kolom, urutan sama.** Busur, beat bab, lorong, benang, dan Exit dipertahankan penuh.
- **Skala relatif dipertahankan, bukan skala absolut.** Wall text tetap elemen terbesar di viewport-nya; Chapter 04 tetap yang termegah — kemegahan diukur relatif terhadap layar, bukan piksel.
- **Dualitas Chapter 02 tetap satu komposisi.** Dua state boleh bertumpuk atau bergantian, tetapi tidak boleh terpecah menjadi dua kartu yang tampak setara-terpisah.
- **Vitrine mengecil, tidak hilang.** Materi proses Chapter 01 tetap mengintip — rasa "ada proses di baliknya" adalah bagian dari cerita.
- **Interaksi hover punya padanan sentuh.** Afordans "pintu" harus terasa tanpa hover: seluruh karya tetap bisa diketuk, penanda arah tetap terlihat tanpa interaksi.
- **Lorong diperpendek secara proporsional.** Di layar kecil, ruang kosong terasa dua kali lebih panjang; lorong mobile lebih singkat supaya rute tidak terasa tak berujung.
- **Tinggi mengikuti konten.** Tidak ada bagian yang dikunci setinggi layar; browser chrome mobile tidak boleh memotong beat bab.

### H. Reduced Motion Experience

Prinsip: **pengunjung reduced-motion mendapat pameran yang sama, dipajang dalam keadaan selesai.**

- Semua elemen hadir langsung dalam keadaan akhirnya — tidak ada reveal, parallax, serah-terima, atau benang yang menggambar diri.
- **Struktur memikul seluruh cerita:** urutan bab, skala, komposisi per bab, whitespace, wall text, dan penanda statis (numeral, counter, garis penuh) tetap menyampaikan busur ekspresif → dualitas → sistem → sinema. Ini bukan degradasi — ini tes yang harus lulus (Design Spec, prinsip #7): kalau versi diam tidak bercerita, yang salah komposisinya, bukan pengunjungnya.
- **Dualitas Chapter 02** tampil sebagai dua state yang terlihat bersamaan, bukan crossfade.
- **Chapter 03** tampil sudah tertata — dan justru paling tidak kehilangan apa-apa, karena karakternya memang "diam sempurna setelah rapi".
- **Benang penanda** hadir sebagai garis statis penuh dengan counter yang tetap akurat — wayfinding tidak butuh animasi untuk berfungsi.
- Preferensi ini dihormati otomatis dari pengaturan sistem pengunjung, bukan lewat tombol tambahan.

---

## Lampiran — Hubungan dengan dokumen lain

- **Design Specification** menjawab *mengapa* — filosofi, moodboard, prinsip, guardrails. Dokumen ini tunduk padanya.
- **UX Flow Specification** (dokumen ini) menjawab *apa yang dialami pengguna* — tahap demi tahap.
- **Technical Specification** (berikutnya) akan menjawab *bagaimana membangunnya* — arsitektur konten, komponen, dan teknik motion; dia tunduk pada kedua dokumen di atas.
