import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "line-clamp-detail-kecil",
  title: "Line Clamp: Detail Kecil yang Bikin Card Rapi",
  topic: "Development",
  status: "published",
  publishedAt: "2026-06-18",
  image: { src: "/writing/tailwind_clamp.png", alt: "Preview artikel tentang line clamp" },
  content: [
    "Waktu nyusun ulang halaman Writing, bagian yang paling bikin pusing justru bukan logikanya, tapi kartunya. Judul tiap tulisan panjangnya beda-beda, ada yang cuma lima kata, ada yang nyaris dua baris penuh. Satu judul kepanjangan aja langsung bikin tinggi kartu di grid jadi belang, dan grid yang tadinya rapi mendadak kelihatan berantakan.",
    {
      type: "paragraph",
      segments: [
        "Untungnya aku lagi pakai ",
        { type: "mention", entity: "tailwindcss" },
        ", jadi solusinya nggak jauh-jauh. Ada utility line-clamp yang tinggal ditempel. line-clamp-2 buat judul, line-clamp-3 buat cuplikan isinya. Browser yang ngurusin motong teksnya, ellipsis muncul sendiri, dan aku nggak perlu ngitung karakter satu-satu di JavaScript.",
      ],
    },
    "Yang awalnya aku kira selesai di situ ternyata belum. Teks yang dipotong itu butuh temen. Tinggi barisnya harus konsisten biar potongannya kelihatan sengaja, jaraknya dijaga biar judul nggak nabrak ikon di sampingnya, dan gambarnya dikasih rasio tetap biar layout nggak lompat pas gambar baru kemuat. Hal-hal kecil itu yang sebenarnya bikin kartunya kelihatan tenang.",
    "Ada satu hal lucu soal line-clamp. Dulu ini bukan bawaan Tailwind, statusnya cuma plugin terpisah yang harus dipasang sendiri, dan baru jadi utility resmi mulai versi 3.3. Di baliknya pun teknologinya sebenarnya warisan lama dari WebKit yang entah kenapa akhirnya dipakai semua browser sampai sekarang. Fitur sekecil ini ternyata punya sejarah yang lumayan panjang.",
    { type: "entityCard", entity: "tailwindcss" },
    { type: "heading", text: "Rapi yang Disengaja" },
    "Begitu semuanya kepasang, kartunya langsung beda. Judul sepanjang apa pun berhenti di baris yang sama, cuplikannya rapi berhenti di tiga baris, dan grid-nya tetap seimbang dari layar hp sampai desktop. Nggak ada yang bakal sadar ada line-clamp di sana, dan menurutku justru itu tandanya berhasil.",
    "Buat aku, detail kayak gini yang misahin grid yang kelihatan dirancang sama grid yang cuma kebetulan rapi di satu ukuran layar. Nggak butuh usaha besar, cuma butuh diperhatiin.",
  ],
};
