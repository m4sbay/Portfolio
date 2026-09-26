import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

export const project: Project = {
  title: "Notion Auto Status",
  description:
    "Automation tool untuk memperbarui status task dan event di Notion berdasarkan tanggal, group, dan jadwal otomatis.",
  longDescription:
    "Aku membuat Notion Auto Status supaya database Notion tetap rapi tanpa harus memperbarui status task dan event satu per satu. Script ini membaca Group dan Date, lalu menyesuaikan statusnya secara otomatis berdasarkan waktu.\n\nAutomation-nya bisa dijalankan secara lokal dengan Node.js scheduler atau dijadwalkan setiap jam melalui GitHub Actions. Aku juga menambahkan email digest dan pengingat agenda melalui Gmail supaya perubahan penting tetap mudah dipantau.",
  category: "Tools",
  status: "published",
  order: 1,
  tags: ["Node.js", "Notion API", "Automation", "GitHub Actions"],
  slug: "notion-auto-status",
  // TODO: Ganti dengan URL repo publik atau demo ketika sudah siap.
  // externalLink: "https://github.com/m4sbay/notion-auto-status",
  externalLinkLabel: "Lihat repository",
  logo: "/tools/notion-logo.png",
  brandLinks: [
    { label: "@notionhq/client", href: "https://www.npmjs.com/package/@notionhq/client" },
    { label: "GitHub Actions", href: "https://github.com/features/actions" },
    { label: "Notion API", href: "https://developers.notion.com/" },
    { label: "Nodemailer", href: "https://nodemailer.com/" },
    { label: "node-cron", href: "https://www.npmjs.com/package/node-cron" },
    { label: "Node.js", href: "https://nodejs.org/" },
    { label: "dotenv", href: "https://www.npmjs.com/package/dotenv" },
    { label: "Gmail", href: "https://www.google.com/gmail/about/" },
    { label: "Notion", href: "https://www.notion.com/" },
  ],
  image: {
    src: "/projects/notion-auto-status/nas_cover.png",
    alt: "Visual cover Notion Auto Status",
    width: COVER_MASTER.width,
    height: COVER_MASTER.height,
  },
  hoverImage: {
    src: "/projects/notion-auto-status/nas_cover.png",
    alt: "Visual cover Notion Auto Status",
    width: 1500,
    height: 1200,
  },
  gallery: [
    {
      // TODO: Ganti dengan screenshot contoh kartu Event.
      src: "/projects/notion-auto-status/auto-notion.png",
      alt: "Contoh kartu Event dengan status Waiting List, Live, atau Done",
      width: 1448,
      height: 1086,
    },
  ],
  caseStudy: {
    title: "Automation untuk workflow Notion yang repetitif",
    description:
      "Awalnya, status task dan event di Notion masih harus diperbarui secara manual. Ketika jumlah item mulai bertambah, beberapa status mudah tertinggal dan isi database jadi kurang akurat.\n\nDari situ, aku membuat script Node.js yang membaca database Notion, mengecek Group dan Date, lalu memperbarui status sesuai aturan waktu yang sudah ditentukan. Event dan task umum punya logika masing-masing karena cara keduanya bergerak tidak selalu sama.\n\nScript ini bisa berjalan secara lokal dengan node-cron atau dijadwalkan melalui GitHub Actions. Ketika ada perubahan status, sistem dapat mengirim email digest. Pengingat agenda juga dikirim melalui Gmail sebelum event berlangsung.\n\nUntuk membangunnya, aku menggunakan Node.js, Notion API, GitHub Actions, node-cron, Nodemailer, dotenv, dan Gmail. Setelah automation ini berjalan, pembaruan manual jadi berkurang, status task lebih rapi, dan event yang sedang aktif lebih mudah terdeteksi.",
    gallery: [
      {
        src: "/projects/notion-auto-status/notion-case-study1.svg",
        alt: "Case study visual Notion Auto Status bagian pertama",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/notion-auto-status/notion-case-study2.svg",
        alt: "Case study visual Notion Auto Status bagian kedua",
        width: 1500,
        height: 1200,
      },
    ],
  },
};
