import type { HeroImage, StackScrollCard } from "@/types/stack-scroll-card";

/** Konten highlight — layout bento: satu strip slider + sisanya gambar tunggal */
export const stackScrollCards: StackScrollCard[] = [
  {
    title: "Arsipreset",
    description:
      "Preset Lightroom untuk fotografer yang ingin konsistensi warna tanpa edit manual. Satu klik, hasil langsung berkarakter.",
    gridClass: "lg:col-span-7",
    heroImage: {
      src: "/Arsipreset_card_home_11.jpg",
      alt: "Preview preset Lightroom ArsiPreset",
    },
    link: "/arsipreset",
  },
  {
    title: "ArsiPernikahan",
    description:
      "Template PowerPoint undangan pernikahan — elegan, siap pakai, tinggal isi data. Cocok untuk WO maupun pasangan yang urus sendiri.",
    gridClass: "lg:col-span-5",
    sliderImages: [
      {
        src: "/projects/cover_project_itailwind_hover.png",
        alt: "Preview template undangan pernikahan 1",
      },
      {
        src: "/projects/cover_itailwind.png",
        alt: "Preview template undangan pernikahan 2",
      },
      {
        src: "/projects/project_vokasi.png",
        alt: "Preview template undangan pernikahan 3",
      },
    ] satisfies readonly [HeroImage, HeroImage, HeroImage],
  },
  {
    title: "ArsiFoto",
    description:
      "Jasa editing foto profesional untuk produk, portrait, dan dokumentasi. Hasil bersih, warna konsisten, dan tepat waktu.",
    gridClass: "lg:col-span-6",
    heroImage: {
      src: "/projects/cover_itailwind.png",
      alt: "Contoh hasil editing foto ArsiFoto",
    },
  },
  {
    title: "ArsiPortofolio",
    description:
      "Template portofolio untuk desainer, kreator, dan profesional yang ingin tampil percaya diri di hadapan klien.",
    gridClass: "lg:col-span-6",
    heroImage: {
      src: "/projects/project_vokasi.png",
      alt: "Preview template portofolio ArsiPortofolio",
    },
  },
];
