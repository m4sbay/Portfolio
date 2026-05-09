import type { Project } from "@/types/project";

export const autoNotion: Project = {
  title: "Auto Notion",
  description: "Otomatisasi status dan jadwal di Notion lewat Notion API, dijalankan harian dengan Node.js.",
  longDescription:
    "Auto Notion adalah panduan berbasis skrip: dari membuat Notion Integration, menghubungkan database halaman, memanggil Notion API dengan @notionhq/client, menjadwalkan tugas harian pakai node-cron, lalu membangun skrip Node.js hingga berjalan stabil setiap hari — tanpa mengorbankan keamanan token dan akses halaman.",
  tags: ["Notion", "Node.js", "Automation", "Cron", "2026"],
  category: "Tools",
  slug: "auto-notion",
  externalLink: "https://github.com/m4sbay/autoNotion",
  externalLinkLabel: "Source di GitHub",
  logo: "/projects/notion-logo.png",
  image: {
    src: "/projects/auto-notion.png",
    alt: "Cuplikan alur otomatisasi status Notion dengan Node.js",
    width: 1448,
    height: 1086,
  },
  hoverImage: {
    src: "/projects/auto-notion.png",
    alt: "Auto Notion — integrasi API dan jadwal harian",
    width: 1448,
    height: 1086,
  },
  caseStudy: {
    title: "Dari integration sampai cron harian",
    description:
      "Ringkasan alur praktis: membuat integration di Notion, membagikan database ke integration, menyimpan secret di environment, lalu membangun skrip Node.js yang mengupdate properti/status lewat API. node-cron memicu job pada interval tetap sehingga pekerjaan repetitif tidak lagi manual.\n\nStack yang dipakai: Node.js, @notionhq/client untuk klien resmi API, node-cron untuk penjadwalan, dan prinsip aman untuk kredensial.",
    gallery: [
      {
        src: "/projects/auto-notion.png",
        alt: "Visual proyek Auto Notion",
        width: 1448,
        height: 1086,
      },
    ],
  },
};
