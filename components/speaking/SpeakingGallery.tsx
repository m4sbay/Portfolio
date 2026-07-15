"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import type { SpeakingGalleryImage } from "@/types/speaking";
import { ChevronLeftIcon, ChevronRightIcon } from "@/design-system/icons";

/**
 * Dimensi kanonik gambar dokumentasi: landscape 1920×1080 (16:9). Seluruh aset gallery
 * distandarkan ke ukuran ini, jadi data konten cukup `src` + `alt` — ukuran disuntik di sini.
 */
const GALLERY_WIDTH = 1920;
const GALLERY_HEIGHT = 1080;

/** Onboarding sekali-jalan: jeda sebelum menggeser, lalu jeda sebelum kembali ke slide awal. */
const ONBOARD_NUDGE_DELAY = 1200; // ms — tunggu render selesai sebelum "mengintip" slide 2.
const ONBOARD_RETURN_DELAY = 900; // ms — tahan di slide 2 sebentar sebelum balik ke slide 1.

/**
 * Carousel foto dokumentasi sesi speaking — dirender setelah metadata, sebelum artikel.
 *
 * Satu-satunya komponen yang tahu cara gambar disajikan (presentation layer). Struktur data
 * (`cover`, `images`) tidak berubah; berubah jadi lightbox/format lain cukup di file ini.
 * Presentasi: satu gambar per tampilan (16:9), swipe di mobile (Embla), tombol prev/next yang
 * muncul saat hover/focus di desktop, dot indicator, dan onboarding sekali-jalan. Layout
 * mengikuti Reading DS: lebar mengikuti area membaca, radius & border seragam `.reading figure`.
 *
 * Struktur aset yang direkomendasikan — satu folder per slug, tanpa subfolder `images/`:
 *
 *   public/
 *   └── speaking/
 *       └── <slug>/            mis. design-presentation-canva-itp-2024
 *           ├── cover.png      → SpeakingSession.cover
 *           ├── image-01.webp  ┐
 *           ├── image-02.webp  ├─ SpeakingSession.images (dokumentasi)
 *           └── image-03.webp  ┘
 *
 * Penomoran dua digit (01, 02, …) agar urutan tetap rapi saat jumlah gambar bertambah.
 */
export function SpeakingGallery({ images }: { images: SpeakingGalleryImage[] }) {
  const multiple = images.length > 1;
  const reduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const didOnboard = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sinkronisasi state awal ditunda ke microtask agar tidak setState sinkron di body effect.
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Onboarding sekali-jalan: petunjuk halus bahwa gallery bisa digeser — bukan autoplay.
  // Geser ke slide 2 lalu balik ke slide 1, sekali saja. Dilewati bila reduce-motion / 1 gambar.
  useEffect(() => {
    if (!emblaApi || !multiple || reduceMotion || didOnboard.current) return;
    didOnboard.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        emblaApi.scrollNext();
        timers.push(setTimeout(() => emblaApi.scrollTo(0), ONBOARD_RETURN_DELAY));
      }, ONBOARD_NUDGE_DELAY),
    );

    return () => timers.forEach(clearTimeout);
  }, [emblaApi, multiple, reduceMotion]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (!images?.length) return null;

  // Arrow Left/Right menggeser slide saat fokus berada di dalam carousel.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!multiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    // `group` → tombol nav memakai group-hover / group-focus-within untuk fade in.
    <section
      className="group relative mt-10"
      aria-roledescription="carousel"
      aria-label="Dokumentasi kegiatan"
      onKeyDown={onKeyDown}
    >
      {/* Viewport Embla: satu titik overflow-hidden + border/radius DS (seragam .reading figure). */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/50 dark:border-white/10 dark:bg-white/3"
      >
        {/* Container geser: setiap slide 100% lebar → satu gambar per tampilan. */}
        <div className="flex">
          {images.map((img, i) => (
            <figure
              key={img.src}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Gambar ${i + 1} dari ${images.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={GALLERY_WIDTH}
                height={GALLERY_HEIGHT}
                // Embla mulai di index 0, jadi hanya slide pertama yang terlihat saat load — dan
                // ukurannya penuh lebar baca (16:9) sehingga jadi LCP. Prioritaskan slide ini saja;
                // sisanya tetap lazy (off-screen). `priority` sudah menyetel eager + fetchPriority.
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className="aspect-video h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
                unoptimized={img.src.endsWith(".svg")}
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Kontrol hanya bila >1 gambar — tidak merender kontrol yang tak diperlukan. */}
      {multiple ? (
        <>
          <CarouselButton
            side="left"
            label="Gambar sebelumnya"
            disabled={!canPrev}
            onClick={scrollPrev}
          />
          <CarouselButton
            side="right"
            label="Gambar berikutnya"
            disabled={!canNext}
            onClick={scrollNext}
          />

          <DotIndicator count={images.length} selectedIndex={selectedIndex} onSelect={scrollTo} />
        </>
      ) : null}
    </section>
  );
}

/**
 * Tombol nav bulat overlay. Default tersembunyi (opacity-0 + pointer-events-none), fade in saat
 * gallery di-hover atau salah satu kontrol mendapat fokus keyboard (group-hover/focus-within).
 * Di mobile tak ada hover → tetap tersembunyi, swipe jadi navigasi utama. Di ujung (disabled)
 * dipaksa tetap tersembunyi meski hover.
 */
function CarouselButton({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={[
        "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full",
        "border border-zinc-200/80 bg-white/70 text-zinc-700 backdrop-blur-md",
        "hover:bg-white hover:text-zinc-950",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50",
        "dark:border-white/15 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white dark:focus-visible:ring-offset-zinc-900",
        // Reveal-on-intent: tersembunyi sampai gallery di-hover / kontrol difokus.
        "pointer-events-none opacity-0 transition-opacity duration-300",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        // Ujung carousel → paksa tersembunyi & non-interaktif, override reveal.
        "disabled:pointer-events-none disabled:opacity-0! disabled:group-hover:opacity-0!",
        side === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3",
      ].join(" ")}
    >
      <Icon className="size-5" />
    </button>
  );
}

/**
 * Dot indicator minimal di bawah carousel, terpusat. Dot aktif memanjang + lebih terang;
 * lainnya kecil + redup. Klik untuk lompat ke slide. Muncul hanya saat >1 gambar.
 */
function DotIndicator({
  count,
  selectedIndex,
  onSelect,
}: {
  count: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const active = i === selectedIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Ke gambar ${i + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(i)}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
              active
                ? "w-5 bg-zinc-800 dark:bg-zinc-200"
                : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
