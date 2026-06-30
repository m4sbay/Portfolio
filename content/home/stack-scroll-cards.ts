import type { HeroImage, StackScrollCard } from "@/types/stack-scroll-card";

/** Konten highlight — layout bento: satu strip slider + sisanya gambar tunggal */
export const stackScrollCards: StackScrollCard[] = [
  {
    title: "Arsipreset",
    description:
      "Preset Lightroom untuk fotografer yang ingin konsistensi warna tanpa edit manual. Satu klik, hasil langsung berkarakter.",
    gridClass: "lg:col-span-7",
    heroImage: {
      src: "/arsipreset/Arsipreset_card_home_11.jpg",
      alt: "Preview preset Lightroom ArsiPreset",
    },
    link: "/arsipreset",
  },
  {
    title: "Arsipidio",
    description:
      "Template PowerPoint undangan pernikahan video, tinggal isi data. Cocok untuk WO maupun pasangan yang urus sendiri.",
    gridClass: "lg:col-span-5",
    sliderImages: [
      {
        src: "/arsipreset/arsipidio_1.JPG",
        alt: "Preview template video ArsiPidio 1",
      },
      {
        src: "/arsipreset/arsipidio_2.JPG",
        alt: "Preview template video ArsiPidio 2",
      },
      {
        src: "/arsipreset/arsipidio_3.png",
        alt: "Preview template video ArsiPidio 3",
      },
    ] satisfies readonly [HeroImage, HeroImage, HeroImage],
  },
  {
    title: "Arsipoto",
    description:
      "Kalau kamu punya foto yang kurang rapi, biar @arsipoto bantu benerin.",
    gridClass: "lg:col-span-6",
    visualClassName: "aspect-video",
    heroVideo: {
      src: "/video/card_arsipoto.mp4",
      label: "Preview layanan editing foto Arsipoto",
    },
  },
  {
    title: "Arsipolio",
    description:
      "Template portofolio untuk desainer, kreator, dan profesional yang ingin tampil percaya diri di hadapan klien.",
    gridClass: "lg:col-span-6",
    heroImage: {
      src: "/projects/video-vokasi/project_vokasi.png",
      alt: "Preview template portofolio ArsiPortofolio",
    },
  },
];
