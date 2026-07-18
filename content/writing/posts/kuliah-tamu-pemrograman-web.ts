import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "kuliah-tamu-pemrograman-web",
  title: "Kuliah Tamu Pemrograman Web",
  topic: "Event",
  status: "published",
  publishedAt: "2023-11-30",
  image: {
    src: "cover.png",
    alt: "Cover Kuliah Tamu Pemrograman Web",
  },
  content: [
    "Halo, ketemu lagi di tulisan lainnya.",
    "Kali ini saya ingin berbagi cerita tentang salah satu kegiatan kuliah tamu yang menurut saya cukup menarik, yaitu Kuliah Tamu Pemrograman Web di Program Studi Teknik Informatika Institut Teknologi Padang.",
    "Kuliah tamu seperti ini biasanya diadakan beberapa kali dalam setahun dengan menghadirkan narasumber dari industri. Topik yang dibahas juga selalu berbeda-beda, menyesuaikan mata kuliah yang sedang kami pelajari. Saat itu mata kuliah yang sedang berjalan adalah Pemrograman Web yang diampu oleh Ibu Anisya.",
    {
      type: "paragraph",
      segments: ["Pada kesempatan tersebut kami mendapatkan materi dari Bapak Rizky dan Bapak Alex Wardana, S.Pd., selaku CEO ", { type: "mention", entity: "pt-arg-solusi-teknologi" }, "."],
    },
    "Topik utama yang dibahas adalah **Application Programming Interface (API)**. Sebelumnya saya sudah beberapa kali mendengar istilah API, tetapi melalui sesi ini saya jadi lebih memahami bagaimana API digunakan sebagai penghubung antar aplikasi, bagaimana proses request dan response bekerja, serta alasan mengapa hampir semua aplikasi modern memanfaatkannya.",
    "Yang saya sukai dari kuliah tamu seperti ini adalah kami bisa mendengar langsung pengalaman dari praktisi yang sehari-hari bekerja di industri. Materinya tidak hanya membahas teori, tetapi juga bagaimana teknologi tersebut benar-benar diterapkan dalam pengembangan software.",
    "Bagi saya, pengalaman seperti ini menjadi pelengkap yang menarik dari perkuliahan di kelas. Selain menambah wawasan mengenai pengembangan web modern, saya juga mendapat gambaran mengenai kebutuhan industri dan teknologi yang sebaiknya mulai saya pelajari lebih dalam.",
    "Terima kasih kepada seluruh pihak yang telah menyelenggarakan kegiatan ini serta kepada para narasumber yang telah berbagi ilmu dan pengalaman. Semoga kegiatan seperti ini terus diadakan agar mahasiswa bisa mendapatkan perspektif langsung dari dunia industri.",
    { type: "entityCard", entity: "pt-arg-solusi-teknologi" },
  ],
};
