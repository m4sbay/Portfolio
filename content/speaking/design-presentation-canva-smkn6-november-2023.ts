import type { SpeakingSession } from "@/types/speaking";

export const session: SpeakingSession = {
  slug: "design-presentation-canva-smkn6-november-2023",
  title: "The Art of Canva - Design Presentation With Canva",
  date: "2023-11-24",
  // Placeholder: jam asli menyusul.
  timeLabel: "13.00 – 15.30 WIB",
  location: "SMKN 6 Kota Padang",
  // Copy sementara — sesi lanjutan, sengaja dibedakan dari batch sebelumnya.
  excerpt:
    "Batch kedua The Art of Canva membawa kami ke SMKN 6 Kota Padang. Dari sesi ini kami belajar banyak hal, mulai dari memperbaiki cara menyampaikan materi hingga menyesuaikan contoh desain dengan latar belakang peserta yang berasal dari jurusan Tata Boga.",

  body: [
    {
      type: "heading",
      content: "Belajar dari Batch Pertama",
    },
    {
      type: "paragraph",
      segments: [
        "Setelah menyelesaikan batch pertama di SMKN 5 Kota Padang, kami mulai memahami bagian mana yang perlu diperbaiki. Cara menyampaikan materi, alur presentasi, hingga pembagian waktu kami evaluasi bersama agar sesi berikutnya bisa terasa lebih nyaman diikuti. Batch kedua menjadi kesempatan bagi kami untuk menerapkan semua evaluasi tersebut.",
      ],
    },
    {
      type: "heading",
      content: "Ternyata Pesertanya Jurusan Tata Boga",
    },
    {
      type: "paragraph",
      segments: [
        "Menariknya, baru pada hari pelaksanaan kami mengetahui bahwa peserta berasal dari jurusan Tata Boga. Hal ini membuat beberapa contoh yang kami bawakan menjadi terasa sangat relevan. Selain membahas desain presentasi menggunakan Canva, kami juga berdiskusi bagaimana menyajikan foto makanan ke dalam desain yang menarik tanpa mengabaikan prinsip-prinsip dasar desain. Harapannya, mereka tidak hanya memahami bagaimana menyusun plating di atas piring, tetapi juga bagaimana 'mem-plating' hasil masakan mereka di media sosial agar lebih menarik dan komunikatif.",
      ],
    },
    {
      type: "heading",
      content: "Di Balik Layar Program",
    },
    {
      type: "paragraph",
      segments: [
        "Di balik pelaksanaan TAC, kami juga menghadapi tantangan yang tidak terlihat oleh peserta. Saat itu pendanaan program tidak turun sesuai rencana karena adanya kendala keuangan di himpunan. Agar kegiatan tetap berjalan, divisi kami berinisiatif menjual stiker dan menggunakan seluruh hasil penjualannya untuk menyediakan hadiah sederhana bagi peserta yang aktif bertanya maupun berani maju ke depan.",
      ],
    },
    {
      type: "heading",
      content: "Lebih dari Sekadar Hadiah",
    },
    {
      type: "paragraph",
      segments: [
        "Meski hadiah yang kami berikan jauh dari kata mewah, melihat antusias dan senyum para peserta sudah menjadi kebahagiaan tersendiri bagi kami. Semoga ilmu yang kami bagikan pada sesi ini bisa terus bermanfaat, baik saat mereka mengerjakan tugas di sekolah maupun ketika nantinya memasuki dunia perkuliahan atau dunia kerja.",
      ],
    },
  ],
  cover: {
    src: "cover.png",
    alt: "Cover The Art Of Canva SMK 6 Kota Padang",
    width: 1200,
    height: 800,
  },
  images: [
    {
      src: "image-01.png",
      alt: "Bayu menyampaikan materi kepada peserta",
    },
    {
      src: "image-02.png",
      alt: "Peserta mengikuti sesi workshop",
    },
    {
      src: "image-03.png",
      alt: "Contoh microblog yang sedang dibahas",
    },
    {
      src: "image-04.png",
      alt: "Sesi tanya jawab",
    },
  ],
};
