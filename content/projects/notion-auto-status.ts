import type { Project } from "@/types/project";

export const notionAutoStatus: Project = {
  title: "Notion Auto Status",
  description:
    "Skrip Node.js dan GitHub Actions yang menyinkronkan kolom Status di database Notion dari tanggal dan grup kartu.",
  longDescription:
    "Alat otomatis untuk menjaga **board Notion** tetap konsisten tanpa mengklik status secara manual. Untuk kartu bertipe **Event**, status mengikuti rentang waktu: **Waiting List**, **Live**, lalu **Done**. Untuk grup lain, status mendekati deadline dipindahkan ke **In Progress**, lalu otomatis **Done** setelah melewati jeda manual beberapa hari supaya workflow review tidak terpotong.\n\nImplementasinya memakai **Notion API** lewat **@notionhq/client** dengan pola query data source SDK v5. Project ini bisa dijalankan lokal dengan scheduler per jam atau melalui **GitHub Actions** menggunakan secrets dan cron. Stack utamanya adalah **Node.js**, **dotenv**, **node-cron**, dan workflow CI.",
  category: "Tools",
  tags: [
    "Node.js",
    "Notion API",
    "Automation",
    "GitHub Actions",
    "dotenv",
    "node-cron",
    "2026",
  ],
  slug: "notion-auto-status",
  // TODO: Ganti dengan URL repo publik atau demo ketika sudah siap.
  // externalLink: "https://github.com/m4sbay/notion-auto-status",
  externalLinkLabel: "Lihat repository",
  // TODO: Ganti dengan logo khusus Notion Auto Status kalau sudah ada.
  logo: "/projects/notion-logo.png",
  image: {
    // TODO: Ganti dengan cover screenshot/diagram Notion Auto Status.
    src: "/projects/auto-notion.png",
    alt: "Diagram atau screenshot alur update status Notion otomatis",
    width: 1448,
    height: 1086,
  },
  hoverImage: {
    // TODO: Ganti dengan cuplikan log GitHub Actions atau terminal saat job berjalan.
    src: "/projects/auto-notion.png",
    alt: "Cuplikan log GitHub Actions atau terminal saat job Notion Auto Status berjalan",
    width: 1448,
    height: 1086,
  },
  gallery: [
    {
      // TODO: Ganti dengan screenshot struktur database Notion.
      src: "/projects/auto-notion.png",
      alt: "Struktur database Notion: kolom Group, Date, Status, dan Name",
      width: 1448,
      height: 1086,
    },
    {
      // TODO: Ganti dengan screenshot contoh kartu Event.
      src: "/projects/auto-notion.png",
      alt: "Contoh kartu Event dengan status Waiting List, Live, atau Done",
      width: 1448,
      height: 1086,
    },
  ],
  caseStudy: {
    title: "Menjadwalkan status Notion tanpa mengorbankan kontrol manual",
    description:
      "**Masalah**\n\nBoard Notion dipakai untuk men-track banyak kartu dengan jenis kerja berbeda. Kolom **Status** mudah tidak sinkron dengan realitas waktu, misalnya Event yang sudah berlangsung masih bertanda **Waiting List**, atau tugas harian yang sudah mendekati deadline belum berpindah ke **In Progress**. Akhirnya tinjauan harian masih butuh klik manual berulang.\n\n**Tujuan**\n\nMembuat pembaruan **Status** menjadi otomatis dan terjadwal, dengan aturan yang berbeda untuk **Event** yang sensitif jam versus grup lain yang sensitif hari kalender dan jeda manual. Otomatisasi ini dirancang agar tidak mengunci pengguna pada satu pola status untuk semua jenis kartu.\n\n**Proses**\n\nDimulai dari pemetaan properti Notion yang sudah dipakai di database: **Group**, **Date**, **Status**, dan **Name**. Logika dibagi dua fungsi: satu untuk Event berbasis rentang waktu, satu untuk non-Event berbasis selisih hari ke tanggal target. Alur query mengikuti pola SDK Notion versi baru, yaitu retrieve database lalu query lewat data source, dengan pagination sampai habis.\n\nPembaruan ke API hanya dilakukan jika status baru terhitung dan berbeda dari status saat ini. Untuk operasi serverless, dibuat skrip sekali jalan yang dipanggil dari **GitHub Actions** agar setiap eksekusi job bisa selesai tanpa mengandalkan proses daemon.\n\n**Peran AI dalam proses**\n\nDari artefak repositori sendiri tidak ada catatan eksplisit bahwa penulisan kode dibantu AI. Kalau dalam proses nyata project ini memang memakai asisten kode, perannya bisa dijelaskan sebagai partner iterasi untuk mengecek pola API atau menyusun draf dokumentasi, sementara aturan status, jadwal cron, dan keputusan bagian mana yang tetap manual tetap dikurasi langsung.\n\n**Keputusan teknis penting**\n\nEvent memakai datetime dan range tanggal. Bila bagian akhir range tidak menyertakan jam, hari tersebut diperlakukan sampai akhir hari agar transisi **Live** dan **Done** konsisten. Untuk non-Event, window yang tidak diotomatisasi sengaja dipertahankan supaya tidak mengganggu ruang review manual sebelum menutup kartu sebagai Done.\n\n**Hasil akhir**\n\nTersedia jalur lokal dengan scheduler dan jalur **GitHub Actions** per jam menggunakan secrets untuk kredensial. Kartu yang memenuhi aturan akan mengalami perubahan Status otomatis sesuai grup dan tanggal, sehingga pekerjaan repetitif menyelaraskan board dengan waktu bisa berkurang.\n\n**Pengembangan berikutnya**\n\nOptimasi query, mode dry-run, notifikasi saat status berganti, serta monitoring kegagalan job bisa ditambahkan kalau kebutuhan operasional bertambah.",
    gallery: [
      {
        // TODO: Ganti dengan cuplikan workflow YAML Notion Auto Status.
        src: "/projects/auto-notion.png",
        alt: "Cuplikan workflow YAML Notion Auto Status di GitHub",
        width: 1448,
        height: 1086,
      },
      {
        // TODO: Ganti dengan potongan kode getStatusForEvent dan getStatusForGeneral.
        src: "/projects/auto-notion.png",
        alt: "Potongan kode getStatusForEvent dan getStatusForGeneral",
        width: 1448,
        height: 1086,
      },
    ],
  },
};
