import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

// Ketiga gambar belum tersedia. Dimensi adalah target ekspor, bukan ukuran aktual.
// Periksa format, dimensi, dan alt text setelah aset dipasang; rasio galeri boleh berbeda.
const cover = {
  src: "/projects/download-organizer-for-mac/cover.gif",
  alt: "Cover Download Organizer For Mac untuk merapikan folder Downloads di macOS",
  width: COVER_MASTER.width,
  height: COVER_MASTER.height,
};

export const project: Project = {
  title: "Download Organizer For Mac",
  description: "Rapikan file di Downloads lewat satu perintah, supaya kerja berikutnya lebih mudah.",
  longDescription: `**Berawal dari Downloads yang menumpuk**

Sebagai desainer, aku sering download berbagai file dan aset, apalagi untuk kebutuhan video seperti sound effect. Kadang aku rajin merapikannya satu per satu, tapi saat lagi malas atau nggak sempat, file-file itu terus menumpuk.

Sampai akhirnya aku punya jadwal sendiri: setiap Minggu siang, aku menyempatkan ngopi sambil WFC khusus untuk merapikan folder. Aku percaya kalau foldering kita rapi, pekerjaan berikutnya jadi lebih mudah dan lancar. Saat butuh sesuatu, tinggal ambil dari tempatnya.

**Otomatis merapikan, tetap aku yang memulai**

Dari kebiasaan itu, aku membuat Download Organizer, script Bash khusus macOS untuk mengelompokkan file di folder Downloads berdasarkan ekstensi. Untuk pemakaian sehari-hari, aku memilih menjalankannya sendiri lewat terminal. Masih ada sedikit effort mengetik perintah, tapi nggak sampai lima detik.

Script ini juga punya opsi penjadwalan harian lewat launchd. Aku memilih cara manual karena nggak ingin memberikan izin akses tambahan melalui pengaturan Privacy & Security macOS untuk menjalankannya secara terjadwal. Dengan begitu, aku tetap menentukan kapan folder mulai dirapikan.

**Cara kerjanya**

File baru tetap masuk ke root Downloads. Saat dijalankan, organizer memindahkan file lepas ke kelompok Images, Videos, Documents, Audio, Design, Installers, dan Misc, lalu membaginya lagi berdasarkan ekstensi. Struktur foldernya juga mencakup 00 Baru - Inbox. Subfolder yang sudah ada di root Downloads tidak disentuh.

Secara default, file yang baru dimodifikasi dalam sepuluh menit terakhir dilewati. Jika nama file tujuan sudah ada, script menambahkan nomor seperti file (1).pdf. File yang dirapikan hanya dipindahkan, bukan dihapus.

**Preview sebelum merapikan**

Setelah script diberi izin eksekusi dengan chmod +x organize-downloads.sh, aku bisa melihat rencana pemindahan lewat ./organize-downloads.sh --dry-run, lalu menjalankan ./organize-downloads.sh untuk benar-benar merapikannya. Shortcut d-p dan d-o bisa ditambahkan lewat alias di ~/.zshrc agar lebih praktis.

Folder target dan batas usia file bisa disesuaikan lewat --downloads-dir PATH dan --min-age-minutes N. Opsi dry-run juga bisa dipakai bersama folder percobaan untuk mengecek hasil sebelum menyentuh Downloads.

**Jadwal dan riwayat pemindahan**

Kalau ingin berjalan otomatis setiap hari pukul 06:00, tersedia template plist untuk launchd. Path project perlu diisi sebelum plist dipasang di ~/Library/LaunchAgents/. macOS dapat meminta izin akses melalui System Settings → Privacy & Security; cara manual tetap bisa digunakan jika tidak ingin memberikan izin tersebut.

Aktivitas dicatat di logs/organize-YYYY-MM.log. Secara default, log bulanan yang lebih lama dari tiga bulan dibersihkan setiap kali script berjalan; pengaturan ini bisa diubah lewat --keep-logs-months N atau dinonaktifkan dengan nilai 0. Riwayat lengkap pemindahan tersimpan di logs/rename-map.csv dan tidak ikut dihapus otomatis.`,
  category: "Tools",
  status: "published",
  order: 8,
  year: 2026,
  tags: ["Bash", "macOS", "Automation", "launchd"],
  slug: "download-organizer-for-mac",
  logo: "/tools/terminal.png",
  externalLink: "https://github.com/m4sbay/download-organizer",
  externalLinkLabel: "Lihat Source di GitHub",
  image: cover,
  // gallery: [
  //   cover,
  //   {
  //     src: "/projects/download-organizer-for-mac/gallery-01.jpeg",
  //     alt: "Preview rencana pemindahan file Download Organizer lewat dry-run di Terminal",
  //     width: COVER_MASTER.width,
  //     height: COVER_MASTER.height,
  //   },
  //   {
  //     src: "/projects/download-organizer-for-mac/gallery-02.jpeg",
  //     alt: "Struktur folder Downloads setelah file dikelompokkan berdasarkan jenis dan ekstensi",
  //     width: COVER_MASTER.width,
  //     height: COVER_MASTER.height,
  //   },
  // ],
  visualPreviewClosing: "Kalau kamu juga sering kewalahan merapikan file hasil download, semoga project kecil ini bermanfaat. Folder rapi, kerja berikutnya jadi lebih nyaman!",
};
