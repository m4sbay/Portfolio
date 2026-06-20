import type { Project } from "@/types/project";

export const notionAutoStatus: Project = {
  title: "Notion Auto Status",
  description:
    "Automation tool untuk memperbarui status task dan event di Notion berdasarkan tanggal, group, dan jadwal otomatis.",
  longDescription:
    "Notion Auto Status menjaga database Notion tetap rapi dengan memperbarui status task dan event secara otomatis berdasarkan Group dan Date.\n\nAutomation ini bisa berjalan lokal dengan Node.js scheduler atau terjadwal per jam melalui GitHub Actions. Workflow juga menyiapkan email digest dan reminder agenda via Gmail.",
  category: "Tools",
  tags: ["Node.js", "Notion API", "Automation", "GitHub Actions"],
  slug: "notion-auto-status",
  // TODO: Ganti dengan URL repo publik atau demo ketika sudah siap.
  // externalLink: "https://github.com/m4sbay/notion-auto-status",
  externalLinkLabel: "Lihat repository",
  // TODO: Ganti dengan logo khusus Notion Auto Status kalau sudah ada.
  logo: "/projects/notion-logo.png",
  image: {
    src: "/projects/notion-status.svg",
    alt: "Visual cover Notion Auto Status",
    width: 1500,
    height: 1200,
  },
  hoverImage: {
    src: "/projects/notion-status.svg",
    alt: "Visual cover Notion Auto Status",
    width: 1500,
    height: 1200,
  },
  gallery: [
    {
      // TODO: Ganti dengan screenshot contoh kartu Event.
      src: "/projects/auto-notion.png",
      alt: "Contoh kartu Event dengan status Waiting List, Live, atau Done",
      width: 1448,
      height: 1086,
    },
    {
      src: "/projects/notion-status.svg",
      alt: "Visual cover Notion Auto Status",
      width: 1500,
      height: 1200,
    },
  ],
  caseStudy: {
    title: "Automation untuk workflow Notion yang repetitif",
    description:
      "**Problem**\n\nUpdate status task dan event di Notion masih manual. Saat item bertambah, status mudah tertinggal dan database jadi kurang akurat.\n\n**Solution**\n\nSaya membuat script Node.js yang membaca database Notion, mengecek Group dan Date, lalu memperbarui status otomatis berdasarkan aturan waktu. Script bisa berjalan lokal dengan node-cron atau terjadwal melalui GitHub Actions.\n\n**Key Features**\n\nAuto-update status berdasarkan tanggal. Logic khusus untuk Event. Logic berbeda untuk task umum. Email digest saat status berubah. Reminder agenda via Gmail.\n\n**How It Works**\n\nNotion Database -> Scheduler atau GitHub Actions -> Check Group dan Date -> Update Status -> Send Email Digest atau Reminder.\n\n**Tech Stack**\n\nNode.js, Notion API, GitHub Actions, node-cron, Nodemailer, dotenv, dan Gmail.\n\n**Result**\n\nUpdate manual berkurang, status task lebih rapi, event aktif terdeteksi otomatis, dan reminder dikirim sebelum agenda berlangsung.",
    gallery: [
      {
        src: "/projects/notion-case-study1.svg",
        alt: "Case study visual Notion Auto Status bagian pertama",
        width: 1500,
        height: 1200,
      },
      {
        src: "/projects/notion-case-study2.svg",
        alt: "Case study visual Notion Auto Status bagian kedua",
        width: 1500,
        height: 1200,
      },
    ],
  },
};
