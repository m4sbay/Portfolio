import type { Project } from "@/types/project";

export const project: Project = {
  title: "Gridcheck",
  description:
    "Template Figma untuk melihat dan menata tampilan grid Instagram sebelum konten dipublikasikan.",
  longDescription:
    "Gridcheck adalah project pertama yang aku kerjakan setelah lulus. Project ini mulai aku buat pada 1 Juni 2026, berangkat dari keresahan pribadi sejak Instagram mengubah tampilan grid profilnya. Format yang sebelumnya identik dengan rasio 1:1 kini tampil lebih potret, sehingga aku merasa perlu punya satu tempat untuk melihat gambaran feed sebelum konten benar-benar dipublikasikan.\n\nTernyata cukup banyak orang merasakan kebingungan yang sama. Pada awal Januari 2025, aku sempat membahas perubahan tersebut lewat carousel Instagram, dan respons yang muncul menunjukkan bahwa menyesuaikan desain dengan tampilan grid baru memang menjadi tantangan bagi banyak pengguna.\n\nDari kebutuhan itu, aku membuat Gridcheck sebagai template Figma yang fleksibel. Teks dan hampir seluruh bagian antarmukanya bisa disesuaikan. Bagian terpentingnya adalah preview grid yang dapat digeser, sehingga posisi foto atau desain masih bisa dirapikan sampai komposisinya terasa pas sebelum diposting.\n\nBagi sebagian orang, langkah ini mungkin terasa sedikit lebih panjang. Namun, untuk orang yang ingin menjaga tampilan akun Instagram tetap rapi, Gridcheck bisa membantu mengurangi kebiasaan posting, mengecek hasilnya, lalu menghapus dan mengulang dari awal. Kalau ingin mencobanya, template Gridcheck bisa langsung dibuka melalui tautan di bawah. Semoga bermanfaat — Masbay.",
  category: "Design",
  status: "published",
  order: 5,
  year: 2026,
  tags: ["Figma", "Template", "Instagram"],
  slug: "gridcheck",
  showMobileOverviewCover: true,
  logo: "/tools/figma-logo.svg",
  externalLink:
    "https://www.figma.com/design/Jabv4nZ3Ktdcs7v2xmAT5i/Gridcheck?node-id=0-1&t=ob0sNnuACiLTxPv7-1",
  externalLinkLabel: "Buka Template",
  brandLinks: [
    {
      label: "carousel Instagram",
      href: "https://www.instagram.com/p/DFFdbVkzd--/?img_index=1",
    },
  ],
  image: {
    src: "/projects/gridcheck/cover.jpeg",
    alt: "Cover project Gridcheck untuk preview grid Instagram",
    width: 1600,
    height: 1066,
  },
  gallery: [
    {
      src: "/projects/gridcheck/cover.jpeg",
      alt: "Cover project Gridcheck untuk preview grid Instagram",
      width: 1600,
      height: 1066,
    },
    {
      src: "/projects/gridcheck/template-preview.jpeg",
      alt: "Contoh penggunaan template Gridcheck di Figma",
      width: 1600,
      height: 1066,
    },
  ],
};
