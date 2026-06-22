"use client";

import Image from "next/image";
import { useState } from "react";

const allPhotos = [
  { src: "/profile/profile_2.png", alt: "Foto Masbay" },
  { src: "/profile/profile_3.png", alt: "Foto Masbay 3" },
  { src: "/profile/profile_4.png", alt: "Foto Masbay 4" },
  { src: "/profile/profile_5.png", alt: "Foto Masbay 5" },
  { src: "/profile/profile_6.png", alt: "Foto Masbay 6" },
];

export function PhotoWidget() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainPhoto = allPhotos[activeIndex];
  const thumbPhotos = allPhotos.filter((_, i) => i !== activeIndex);

  return (
    <div className="flex gap-3 rounded-xl bg-white p-3 ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
      {/* Kiri: foto utama + lokasi — flex-1 agar memenuhi ruang tersedia */}
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="relative w-full sm:w-[130px] overflow-hidden rounded-lg bg-zinc-100 dark:bg-white/5" style={{ aspectRatio: "1 / 1" }}>
          <Image
            key={mainPhoto.src}
            src={mainPhoto.src}
            alt={mainPhoto.alt}
            fill
            className="object-cover object-[50%_15%] transition-opacity duration-300"
            sizes="(max-width: 639px) calc(100vw - 120px), 130px"
            priority={false}
            draggable={false}
          />
        </div>
      </div>

      {/* Kanan: kolom foto kecil (selain aktif) */}
      <div className="flex flex-col gap-1.5 self-stretch">
        {thumbPhotos.map((photo) => {
          const originalIndex = allPhotos.findIndex((p) => p.src === photo.src);
          return (
            <button
              key={photo.src}
              onClick={() => setActiveIndex(originalIndex)}
              onPointerDown={(e) => e.stopPropagation()}
              className="relative flex-1 w-[52px] overflow-hidden rounded-md bg-zinc-100 ring-1 ring-black/5 transition-all duration-200 hover:ring-2 hover:ring-zinc-400 dark:bg-white/5 dark:ring-white/10 dark:hover:ring-white/40 cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-top"
                sizes="52px"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
