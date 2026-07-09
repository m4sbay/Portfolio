import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "susah-lepas-dari-typescript",
  title: "Kenapa Sekarang Aku Susah Lepas dari TypeScript",
  topic: "Development",
  status: "published",
  publishedAt: "2026-05-12",
  // Placeholder: file cover belum ada, ganti manual di /public/writing/susah-lepas-typescript.png
  image: { src: "/writing/susah-lepas-typescript.png", alt: "Preview artikel tentang pengalaman pakai TypeScript" },
  content: [
    {
      type: "paragraph",
      segments: [
        "Pertama kali nyobain ",
        { type: "mention", entity: "typescript" },
        ", jujur aku malah ngerasa semuanya jadi lebih ribet. Hal-hal yang tadinya langsung jalan di JavaScript tiba-tiba dipenuhi garis merah dan error di mana-mana. Rasanya kayak ada yang kebanyakan protes tiap aku ngetik satu baris kode.",
      ],
    },
    { type: "heading", text: "Awalnya Aku Kira Cuma Bikin Ribet" },
    "Beberapa minggu pertama isinya cuma kesel. Aku ngerasa dipaksa nulis lebih banyak cuma buat ngejelasin hal yang menurutku udah jelas. Sempat kepikiran buat balik aja ke cara lama yang lebih bebas. Waktu itu aku belum ngeliat gunanya, yang kerasa cuma repotnya doang.",
    { type: "heading", text: "Titik Baliknya Pas Project Membesar" },
    "Perasaan itu berubah pelan-pelan pas project yang aku garap mulai gede. Semakin banyak file dan semakin banyak data yang lalu-lalang, semakin sering muncul kesalahan kecil yang bikin pusing. Bedanya, kesalahan yang dulu baru ketahuan pas aplikasinya udah jalan, sekarang udah ditandain bahkan sebelum kodenya kelar aku tulis.",
    "Di titik itu aku baru ngeh, protes yang tadinya nyebelin itu sebenarnya lagi ngejagain aku. Daripada nemu bug pas udah dipakai orang, jauh lebih enak dikasih tahu dari awal waktu semuanya masih gampang dibenerin.",
    { type: "heading", text: "Kayak Punya Teman yang Ngingetin" },
    "Tapi yang paling bikin aku nyaman justru bukan soal error-nya. Melainkan autocomplete-nya, dan cara dia ngerti struktur data yang aku pakai. Tiap aku ngetik, dia langsung nyodorin properti apa aja yang tersedia, jadi aku nggak perlu bolak-balik ngapalin bentuk datanya.",
    "Rasanya kayak ada temen yang duduk di sebelah dan pelan-pelan negur tiap aku salah ngambil properti atau ngirim data yang bentuknya nggak cocok. Nggak ngeganggu, cuma ngingetin di saat yang pas.",
    { type: "heading", text: "Ternyata Dia Cuma JavaScript yang Didandani" },
    "Ada fakta yang menurutku menarik soal ini. TypeScript sebenarnya bukan bahasa yang berdiri sendiri. Semua kode yang aku tulis pada akhirnya tetap diubah jadi JavaScript biasa dulu sebelum bisa dijalanin browser atau Node.js. Jadi dia lebih kayak lapisan bantuan di atas JavaScript, bukan penggantinya.",
    "Fakta kecil lain yang bikin aku senyum, TypeScript itu bikinan Microsoft, dan diracik sama orang yang sama yang dulu juga ngerancang bahasa C#. Pantesan aja rasanya matang dan kepikiran banget dari sisi pengalaman ngodingnya.",
    { type: "entityCard", entity: "typescript" },
    { type: "heading", text: "Sekarang Susah Baliknya" },
    "Efeknya kerasa tiap aku balik ngerjain project JavaScript biasa. Selalu ada yang berasa hilang. Aku jadi lebih hati-hati, lebih sering ragu, soalnya nggak ada lagi yang ngingetin kalau aku salah ngambil data.",
    "Bukan berarti JavaScript-nya jelek, sama sekali nggak. Cuma aku yang udah kelewat nyaman dibantu. Dan begitu udah terbiasa dijagain kayak gitu, balik ke tanpa jaring pengaman itu jadi kerasa agak canggung.",
  ],
};
