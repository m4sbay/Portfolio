import type { Project } from "@/types/project";
import { COVER_MASTER } from "@/lib/cover";

export const project: Project = {
  title: "Geopark Run Series",
  description: "Desain konten sosial media dan arahan kreatif untuk event lari trail Geopark Run Series Ijen.",
  longDescription:
    "Geopark Run Series adalah event lari trail yang berlangsung di kawasan Geopark Ijen, Banyuwangi, salah satu lanskap paling dramatis di Indonesia. Aku dipercaya untuk menangani desain konten sosial media dan arahan kreatifnya dari awal sampai akhir.\n\nProject ini bukan sekadar bikin poster. Aku perlu membangun sistem visual dari nol, mulai dari palet warna, tipografi, dan grid template sampai cara bercerita secara visual yang tetap konsisten selama lebih dari seminggu proses desain.",
  category: "Design",
  status: "published",
  order: 4,
  tags: ["Figma", "Photoshop", "Affinity Designer"],
  slug: "grs",
  logo: "/tools/photoshop_logo.png",
  image: {
    src: "/projects/grs/grs_card_cover.png",
    alt: "Cover desain Geopark Run Series",
    width: COVER_MASTER.width,
    height: COVER_MASTER.height,
  },
  processSections: [
    {
      title: "Riset & Eksplorasi Identitas",
      description:
        "Hari pertama aku mulai dari nol. Geopark Run Series bukan sekadar lomba lari, tetapi juga pengalaman di tengah lanskap vulkanik Ijen yang raw dan dramatis. Sebagian besar waktuku habis untuk menyerap referensi dari visual trail running internasional, estetika geopark, dan energi event outdoor premium.\n\nDari proses itu mulai muncul beberapa iterasi layout dan mood board. Hasilnya masih kasar, tetapi arahnya sudah mulai terasa. Enam iterasi awal ini kemudian menjadi fondasi untuk keputusan visual pada hari-hari berikutnya.",
      gallery: [
        { src: "/projects/grs/day_satu_1.gif", alt: "Iterasi awal layout hari pertama", width: 1080, height: 1350 },
        { src: "/projects/grs/day_satu_2.gif", alt: "Eksplorasi komposisi visual", width: 1080, height: 1350 },
        { src: "/projects/grs/day_satu_3.PNG", alt: "Mood board awal Geopark Run Series", width: 1080, height: 1350 },
        { src: "/projects/grs/day_satu_4.gif", alt: "Iterasi elemen grafis", width: 1080, height: 1350 },
        { src: "/projects/grs/day_satu_5.gif", alt: "Eksplorasi hierarki visual", width: 1080, height: 1350 },
        { src: "/projects/grs/day_satu_6.gif", alt: "Variasi pendekatan desain pertama", width: 1080, height: 1350 },
      ],
    },
    {
      title: "Menemukan Palet yang Tepat",
      description:
        'Salah satu keputusan visual terbesar dalam project ini adalah warna. Ijen punya karakter yang kuat lewat belerang kuning, kawah biru tosca, bebatuan gelap, dan kabut putih. Aku ingin membuat palet yang tidak generik dan tidak terlalu terasa seperti "alam hijau" yang sering muncul di event outdoor.\n\nHari itu aku mengunci palet utamanya. Dark charcoal menjadi warna dasar, kuning sulfur memberi aksen hangat, dan sedikit sentuhan biru dingin mewakili warna kawah. Kombinasi ini membuat visual GRS terasa berbeda dari event lari kebanyakan.',
      gallery: [{ src: "/projects/grs/day_dua.PNG", alt: "Eksplorasi palet warna Geopark Run Series", width: 1080, height: 1350 }],
    },
    {
      title: "Sistem Grid & Template Sosmed",
      description:
        "Setelah palet terkunci, aku mulai membangun sistem grid untuk konten Instagram. Feed yang konsisten membutuhkan struktur yang jelas sejak awal.\n\nAku membuat tiga varian layout. Format square dipakai untuk visual utama, portrait untuk poster event, dan landscape untuk banner promosi. Keempat desain yang selesai hari itu punya perannya masing-masing, mulai dari announcement sampai race-day countdown. Aku perlu memastikan semuanya tetap terasa seperti satu keluarga meski formatnya berbeda-beda.",
      gallery: [
        { src: "/projects/grs/day_tiga_1.jpg", alt: "Template grid sosmed hari ketiga", width: 1080, height: 1350 },
        { src: "/projects/grs/day_tiga_2.jpg", alt: "Variasi layout portrait event", width: 1080, height: 1350 },
        { src: "/projects/grs/day_tiga_3.jpg", alt: "Template konten announcement", width: 1080, height: 1350 },
        { src: "/projects/grs/day_tiga_4.jpg", alt: "Sistem grid lengkap hari ketiga", width: 1080, height: 1350 },
      ],
    },
    {
      title: "Hierarki Tipografi",
      description:
        'Typography untuk event sports itu cukup tricky. Teksnya harus kuat dan tetap terbaca dari thumbnail kecil, tetapi masih punya karakter.\n\nAku bereksperimen dengan condensed bold untuk headline karena bentuknya memberi rasa cepat dan tegang. Untuk informasi race, aku memasangkannya dengan clean sans-serif. Hari itu aku fokus pada satu template yang typographynya mulai terasa "sport premium". Energinya tetap kuat tanpa harus terlihat seperti sedang berteriak, jadi hasilnya terasa lebih bersih dan percaya diri.',
      gallery: [{ src: "/projects/grs/day_empat.PNG", alt: "Eksplorasi hierarki tipografi event", width: 1080, height: 1350 }],
    },
    {
      title: "Rasa Mulai Terbentuk",
      description:
        'Di titik ini aku mulai melihat sistemnya sebagai satu kesatuan, bukan sekadar kumpulan desain individual. Hari kelima banyak aku habiskan untuk memastikan setiap aset bisa "ngobrol" satu sama lain. Warna, spacing, ukuran teks, dan cara foto diedit perlu terasa sinkron.\n\nSalah satu visual yang selesai hari itu menjadi template yang paling aku suka dari seluruh project. Ada sesuatu yang terasa klik antara foto lanskap Ijen dan komposisi typographynya. Desain dan konteks tempatnya saling menguatkan.',
      gallery: [{ src: "/projects/grs/day_lima.jpeg", alt: "Visual sistem konten hari kelima", width: 1024, height: 1280 }],
    },
    {
      title: "Iterasi Berdasarkan Feedback",
      description:
        "Setelah feedback masuk, aku menemukan hierarchy yang kurang jelas ketika dilihat di mobile. Ada juga satu warna accent yang terasa terlalu terang saat digunakan sebagai background solid.\n\nProses iterasi seperti ini kadang bikin frustrasi, tetapi justru sering membuat desain menjadi lebih kuat. Aku merevisi tiga aset hari itu dan hasilnya terasa jauh lebih baik dari versi pertama. Buatku, revisi menjadi bagian dari menjaga standar desain yang sedang dibangun.",
      gallery: [
        { src: "/projects/grs/day_enam_1.jpg", alt: "Revisi pertama berdasarkan feedback", width: 2160, height: 2700 },
        { src: "/projects/grs/day_enam_2.jpg", alt: "Penyesuaian hierarki mobile", width: 2160, height: 2700 },
        { src: "/projects/grs/day_enam_3.jpg", alt: "Iterasi warna accent setelah feedback", width: 2160, height: 2700 },
      ],
    },
    {
      title: "Finishing Touch",
      description:
        "Sehari sebelum deadline, aku mulai fokus pada detail. Ada spacing yang sedikit meleset, contrast yang masih bisa diperkuat, dan shadow yang terasa terlalu keras. Hal-hal kecil seperti ini mungkin tidak langsung terlihat, tetapi tetap memengaruhi keseluruhan hasil desain.\n\nHari itu aku juga mengekspor semua aset dalam beberapa format. PNG disiapkan untuk kebutuhan cetak, JPG untuk distribusi digital, dan setiap file dibuat dalam ukuran yang sesuai dengan platformnya. Kelihatannya kecil, tetapi bagian ini tetap penting.",
      gallery: [{ src: "/projects/grs/day_tujuh.PNG", alt: "Final polish desain sebelum deliverable", width: 2160, height: 2700 }],
    },
    {
      title: "Deliverables Final",
      description:
        'Project ini akhirnya selesai. Semua aset sudah terkumpul, terorganisir, dan siap dipakai. Totalnya ada belasan template, panduan warna, dan referensi tipografi yang aku serahkan hari itu.\n\nBagian yang paling memuaskan bukan saat menekan tombol "send", melainkan ketika melihat semua kontennya tampil di feed Instagram event. Semuanya terasa menyatu seperti satu brand yang utuh, bukan sekadar kumpulan desain dengan warna yang sama. Dari situ, Geopark Run Series akhirnya punya identitas visual yang lebih kuat.',
      gallery: [
        { src: "/projects/grs/day_delapan_1.jpg", alt: "Deliverable final hari kedelapan", width: 2160, height: 2700 },
        { src: "/projects/grs/day_delapan_2.jpg", alt: "Aset final siap pakai", width: 2160, height: 2700 },
        { src: "/projects/grs/day_delapan_3.jpg", alt: "Rangkuman sistem visual GRS", width: 2160, height: 2700 },
      ],
    },
  ],
};
