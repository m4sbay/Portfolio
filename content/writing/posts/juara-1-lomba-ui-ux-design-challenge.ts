import type { WritingPost } from "@/types/writing";

export const post: WritingPost = {
  slug: "juara-1-lomba-ui-ux-design-challenge",
  title: "Juara 1 Lomba UI/UX Design Challenge",
  topic: "Event",
  status: "published",
  publishedAt: "2023-10-31",
  // Aset di public/writing/juara-1-lomba-ui-ux-design-challenge/ — cukup nama file, di-resolve data layer.
  image: {
    src: "cover.png",
    alt: "Cover Juara 1 Lomba UI/UX Design Challenge",
  },
  // Cover tidak diulang di sini; slideshow otomatis jadi cover → image-01 → … → image-04.
  images: [
    {
      src: "image-01.png",
      alt: "Salah satu layar desain aplikasi bertema pahlawan dan sejarah Indonesia",
    },
    {
      src: "image-02.png",
      alt: "Proses merancang wireframe dan prototype di Figma",
    },
    {
      src: "image-03.png",
      alt: "Sesi penyerahan hadiah juara di Politeknik Negeri Padang",
    },
    {
      src: "image-04.png",
      alt: "Joo, motor CBR K45R yang saya pakai menuju lokasi penyerahan hadiah",
    },
  ],
  content: [
    {
      type: "paragraph",
      segments: [
        "Awalnya saya melihat postingan lomba dari akun Instagram ",
        { type: "mention", entity: "cybertech-pnp" },
        ". Jujur saja, yang pertama membuat saya tertarik bukan karena hadiahnya, tapi karena saya memang lagi senang-senangnya belajar membuat UI Design. Walaupun waktu itu kemampuan saya masih jauh dari kata mahir, saya merasa ini kesempatan yang bagus untuk mencoba sesuatu yang belum pernah saya lakukan sebelumnya.",
      ],
    },
    "Alasan kedua tentu saja karena biaya pendaftarannya cukup ramah untuk kantong anak kos. Dalam hati saya berpikir, “Kalau menang lumayan, kalau kalah setidaknya dapat pengalaman.” Jadi tanpa banyak berpikir lagi saya langsung mendaftar.",
    { type: "heading", text: "Tema dan Tantangannya" },
    "Kompetisi ini mengangkat tema “Pahlawan atau Sejarah Indonesia”, dengan tantangan merancang UI/UX aplikasi mobile menggunakan Figma atau Adobe XD. Seluruh peserta diminta membuat konsep aplikasi secara mandiri, mulai dari menentukan ide, nama aplikasi, identitas visual, user flow, hingga menghasilkan minimal lima layar yang saling terhubung.",
    "Saya mengerjakan semuanya sendiri. Mulai dari mencari ide yang menurut saya menarik, menyusun alur pengguna, membuat wireframe sederhana, menentukan visual yang konsisten, sampai menyusun prototype. Waktu itu saya juga mulai belajar bagaimana sebuah desain bukan hanya terlihat bagus, tetapi juga mudah digunakan.",
    { type: "heading", text: "Melawan Keterbatasan" },
    "Tantangan terbesar justru datang dari keterbatasan waktu dan perangkat. Saat itu saya masih menggunakan laptop ASUS VivoBook yang spesifikasinya bisa dibilang cukup sederhana (Kentang wkwk). Ketika mulai membuka beberapa artboard Figma sekaligus, performanya mulai terasa berat dan ngelag. Ditambah lagi liat peserta lain yang tampak sangat serius membuat saya semakin gugup. Apalagi ini adalah kompetisi UI/UX pertama yang saya ikuti.",
    "Walaupun begitu saya tetap mencoba menikmati prosesnya. Saya fokus menyelesaikan desain sebaik mungkin daripada terlalu memikirkan hasil akhirnya.",
    { type: "heading", text: "Kabar Baik" },
    "Beberapa hari kemudian saya mendapat kabar yang benar-benar saya duga eh, maksudnya tak terduga. Saya dihubungi oleh panitia dan diberi tahu bahwa saya berhasil meraih Juara 1.",
    "Begitu mendapat kabar itu saya langsung berangkat dari kampus menuju lokasi penyerahan hadiah di Politeknik Negeri Padang. Kampus saya berada di bagian bawah kawasan Universitas Andalas, sedangkan PNP berada di area yang lebih tinggi. Waktu pertama kali kuliah saya sempat heran kenapa ada kampus di dalam kawasan kampus lain, tapi ya begitulah ceritanya.",
    "Saya langsung berangkat menggunakan motor kesayangan saya Joo, sebuah CBR K45R. Jalan menanjaknya lumayan membuat Joo ini terasa seperti minta ganti oli, tapi akhirnya saya sampai juga.",
    "Di sana saya mengikuti sesi penyerahan hadiah, foto bersama panitia dan ketua penyelenggara yang kalau tidak salah bernama Bang Firman. Setelah acara selesai, rasa penasaran saya langsung muncul. Saya ingin tahu sebenarnya isi Tabanas sebagai hadiah juara satu itu berapa.",
    "Begitu melihat nominalnya saya langsung tertawa sendiri. Alhamdulillah, setidaknya balik modal biaya pendaftaran. Walaupun setelah itu uangnya juga langsung kepakai lagi buat isi Pertamax karena perjalanan ke sana lumayan jauh. Dan aku tidak luma untuk mengabari Emak, saya bilang lewat whatsapp dan balasan dari Emak lebih tidak terduga, dapat berapa katanya dan aku jawab lumayan",
    { type: "heading", text: "Yang Paling Saya Inget" },
    "Kalau dipikir-pikir sekarang, hadiah itu bukan bagian yang paling berkesan bagi saya. Pengalaman mengikuti kompetisi pertama, belajar di bawah tekanan waktu, melawan rasa minder, dan akhirnya bisa membawa pulang juara justru menjadi pengalaman yang paling berkesan.",
    "Dari lomba ini saya semakin percaya diri untuk terus belajar UI Design, UX Thinking, Wireframing, Visual Design, Prototyping, Design System, dan mengikuti kompetisi-kompetisi berikutnya.",
    { type: "entityCard", entity: "cybertech-pnp" },
  ],
};
