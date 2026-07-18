import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "amd-tech-gen",
  title: "AMD Tech Gen",
  topic: "Event",
  status: "published",
  publishedAt: "2023-12-13",
  // Aset di public/writing/amd-tech-gen/ — cukup nama file, di-resolve data layer.
  image: {
    src: "cover.png",
    alt: "Cover AMD Tech Gen",
  },
  // Cover tidak diulang di sini; slideshow otomatis jadi cover → image-01.
  images: [
    {
      src: "image-01.png",
      alt: "Sesi diskusi AMD Tech Gen bersama para pembicara",
    },
  ],
  content: [
    "Halo, ketemu lagi di tulisan lainnya.",
    {
      type: "paragraph",
      segments: [
        "Menjelang akhir masa aktif saya di himpunan, saya cukup sering mengikuti berbagai seminar, sharing session, dan acara teknologi. Salah satu yang paling saya ingat adalah ",
        { type: "mention", entity: "amd" },
        " Tech Gen.",
      ],
    },
    { type: "heading", text: "Sesi Diskusi" },
    {
      type: "paragraph",
      segments: [
        "Pada acara ini saya berkesempatan mengikuti sesi diskusi bersama Donnie Brahmandhika dan Ahmad. Topik yang dibahas sangat relevan dengan perkembangan teknologi saat itu, mulai dari Artificial Intelligence (AI), performa laptop yang ditenagai ",
        { type: "mention", entity: "amd-ryzen-ai" },
        "™, hingga workflow content creation dari proses mencari ide, produksi, sampai eksekusi.",
      ],
    },
    "Yang membuat sesi ini menarik adalah pembahasannya tidak hanya berupa presentasi, tetapi juga disertai demonstrasi langsung mengenai bagaimana AI mulai dimanfaatkan dalam aktivitas sehari-hari. Saya jadi mendapat gambaran bagaimana teknologi AI dapat membantu meningkatkan produktivitas, mempercepat pekerjaan, sekaligus mendukung proses kreatif, terutama bagi mahasiswa maupun content creator.",
    { type: "heading", text: "Perspektif Baru" },
    "Bagi saya, acara seperti ini selalu memberikan perspektif baru. Selain mengetahui perkembangan teknologi terbaru, saya juga bisa melihat bagaimana sebuah teknologi diperkenalkan langsung oleh orang-orang yang berkecimpung di industrinya.",
    "Walaupun saat itu AI mulai ramai diperbincangkan, saya merasa sesi ini membantu saya memahami bahwa AI bukan sekadar tren, tetapi sebuah alat yang akan semakin sering digunakan dalam proses belajar, bekerja, dan berkarya.",
    "Saya senang bisa menjadi salah satu peserta AMD Tech Gen dan mendapatkan pengalaman belajar langsung dari para pembicara. Semoga ke depannya semakin banyak kegiatan seperti ini yang bisa mempertemukan mahasiswa dengan perkembangan teknologi terbaru.",
    { type: "entityCard", entity: "amd" },
    { type: "entityCard", entity: "amd-ryzen-ai" },
  ],
};
