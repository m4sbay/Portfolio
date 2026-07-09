import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "ai-bukan-sekadar-auto-complete",
  title: "AI yang Bukan Sekadar Auto Complete",
  topic: "Development",
  status: "published",
  publishedAt: "2026-05-30",
  // Placeholder: file cover belum ada, ganti manual di /public/writing/ai-coding.png
  image: { src: "/writing/ai-coding.png", alt: "Preview artikel tentang AI coding assistant" },
  content: [
    "Dulu sebagian besar waktu ngodingku habis bukan buat nulis kode, tapi buat nyari-nyari. Buka dokumentasi, ngingetin nama API yang itu-itu aja, atau nulis ulang sesuatu yang sebenarnya udah pernah aku bikin di proyek lain. Capeknya bukan di logikanya, tapi di bolak-baliknya.",
    { type: "heading", text: "Dulu Cuma Ngandelin Auto Complete" },
    "Bantuan yang aku punya waktu itu ya sebatas auto complete. Ngetik beberapa huruf, editor langsung nyodorin sisanya. Lumayan ngebantu, tapi ya cuma segitu. Dia nggak ngerti aku lagi mau ngapain, cuma nebak kata berikutnya dari pola yang udah ada.",
    "Lucunya, bantuan ngoding kayak gini sebenarnya udah ada dari lama banget. Tebak-menebak kata udah jadi fitur editor sejak puluhan tahun lalu. Yang bikin sekarang beda, dia nggak lagi sekadar nebak, tapi udah bisa diajak mikir bareng.",
    { type: "heading", text: "Sekarang Aku Diskusi Dulu" },
    "Alurku sekarang beda. Buat kerjaan yang sifatnya berulang atau yang butuh eksplorasi, aku lebih sering ngobrol dulu sebelum mulai nulis apa-apa. Bukan buat langsung nelen semua hasilnya bulat-bulat, tapi lebih ke jadiin dia temen mikir. Aku lempar masalahnya, dia bantu mecahin, dan aku yang mutusin mana yang dipakai.",
    "Enaknya, aku nggak lagi mulai dari halaman kosong yang bikin mumet. Selalu ada bahan awal buat dibedah, dan itu doang udah bikin momentum kerjanya kejaga.",
    { type: "heading", text: "Buat Urusan Besar" },
    {
      type: "paragraph",
      segments: [
        "Kalau kerjaannya yang gede, kayak ngerancang arsitektur, ngerapihin kode lewat refactor, atau bangun fitur yang lumayan kompleks, aku biasanya manggil ",
        { type: "mention", entity: "claude-code" },
        ". Penjelasannya runtut, jadi enak diajak bolak-balik ngupas satu masalah pelan-pelan. Aku nggak langsung nerima semua yang dia kasih, tapi obrolannya sering bikin aku ngeliat sudut yang tadinya kelewat.",
      ],
    },
    "Buat kerjaan model begini, yang aku butuhin memang bukan jawaban instan, tapi arah yang masuk akal. Dan di situ diskusi yang runtut itu kerasa banget bedanya.",
    { type: "entityCard", entity: "claude-code" },
    { type: "heading", text: "Kalau Butuh Serba Cepat" },
    {
      type: "paragraph",
      segments: [
        "Sementara pas lagi butuh yang serba cepat, atau pengin nyoba pendekatan lain buat dibandingin, aku lebih sering buka ",
        { type: "mention", entity: "codex" },
        ". Buat aku dia pas banget kalau ide di kepala udah jelas dan tinggal butuh versi jadinya buru-buru.",
      ],
    },
    "Ada hal yang lucu soal namanya juga. Codex sebenarnya bukan nama baru di dunia ini. OpenAI udah pernah pakai nama itu beberapa tahun sebelumnya buat model yang jadi otak di balik generasi awal asisten koding, jadi rasanya kayak nama lama yang muncul lagi dengan wujud yang beda.",
    { type: "entityCard", entity: "codex" },
    { type: "heading", text: "Yang Paling Kerasa" },
    "Yang paling kerasa dari semua ini ternyata bukan kodenya jadi lebih cepat kelar. Tapi aku jadi lebih berani nyoba ide baru. Kalau pendekatan pertama ternyata kurang cocok, aku bisa langsung ngulik alternatif tanpa harus buang waktu berjam-jam cuma buat tahu itu buntu.",
    "Walau begitu, aku juga makin sadar hasil dari AI tetap perlu dipahami, bukan asal tempel. Makin jelas konteks yang aku kasih, biasanya makin bagus juga hasilnya. Jadi ujung-ujungnya, AI ini bukan ngegantiin proses mikir, dia cuma bikin proses eksplorasinya jauh lebih ngebut.",
  ],
};
