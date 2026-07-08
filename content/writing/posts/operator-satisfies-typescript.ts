import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "operator-satisfies-typescript",
  title: "Operator satisfies di TypeScript Itu Underrated",
  topic: "Development",
  publishedAt: "2026-05-22",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang operator satisfies" },
  content: [
    "Anotasi tipe biasa bikin TypeScript melebar ke tipe umumnya, sementara as const kadang terlalu kaku. satisfies ada di tengah-tengah: objeknya dicek ke sebuah tipe, tapi inferensi detailnya tetap dipertahankan.",
    "Paling terasa di file konfigurasi dan data konten: kamu dapat validasi struktur tanpa kehilangan autocomplete untuk nilai literalnya.",
    "Sekali kepake dan ngerasain bedanya, susah balik lagi.",
  ],
};
