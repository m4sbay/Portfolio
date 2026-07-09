import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "kontras-warna-dark-mode",
  title: "Kontras Warna di Dark Mode Sering Kebalik",
  topic: "Design",
  status: "published",
  publishedAt: "2026-06-02",
  image: { src: "/writing/post1.png", alt: "Preview artikel tentang kontras warna dark mode" },
  content: [
    "Bikin dark mode bukan sekadar dibalik dari terang ke gelap. Teks putih murni di background hitam pekat justru bikin silau dan cepat capek dibaca.",
    "Yang lebih nyaman biasanya abu terang di atas permukaan gelap yang nggak benar-benar hitam, dengan border tipis dari putih ber-opacity rendah.",
    "Makanya tiap komponen di sini selalu ditulis bareng varian dark:-nya sejak awal, bukan ditempel belakangan.",
  ],
};
