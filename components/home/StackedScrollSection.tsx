import Image from "next/image";
import Link from "next/link";

import type { HeroImage, StackScrollCard } from "@/data/stack-scroll-cards";
import { stackScrollCards } from "@/data/stack-scroll-cards";

const visualWrapClass = "relative h-44 w-full overflow-hidden bg-zinc-100 sm:h-48 dark:bg-zinc-900/40";

const cardShellClass = "flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm transition-[border-color,box-shadow] duration-300 dark:border-white/10 dark:bg-white/5";

/** Hover tipis: geser warna border 1px (tanpa ring tebal). */
const cardHoverBorder = "hover:border-zinc-400/85 dark:hover:border-white/25";

const cardBodyBaseClass = "flex flex-1 flex-col px-6 pb-5";

const cardBodyWithActionClass = "justify-between gap-2";

const cardBodyStaticClass = "gap-3";

const imageHoverClass = "object-cover transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/** Gambar dalam strip kolase tidak di-scale agar pergeseran tetap bersih. */
const collagePanelImageClass = "object-cover";

const eagerHomeImageSrc = "/projects/cover_itailwind.png";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 21s-7-4.35-9.33-8.35C.98 9.63 2.2 6.7 4.83 5.65c1.62-.65 3.38-.26 4.62.86.93.84 1.55 1.93 1.55 1.93s.62-1.09 1.55-1.93c1.24-1.12 3-1.51 4.62-.86 2.63 1.05 3.85 3.98 2.16 7C19 16.65 12 21 12 21Z" />
    </svg>
  );
}

function BentoSingleImage({ image }: { image: HeroImage }) {
  return (
    <div className={visualWrapClass}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px" className={imageHoverClass} loading={image.src === eagerHomeImageSrc ? "eager" : "lazy"} />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0 dark:from-zinc-950/35"
        aria-hidden
      />
    </div>
  );
}

function BentoHoverSlider({ images }: { images: readonly [HeroImage, HeroImage, HeroImage] }) {
  return (
    <div className={`${visualWrapClass} isolate`}>
      <div className="bento-collage-track flex h-full gap-2 p-2">
        {images.map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-full flex-1 overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 400px" className={collagePanelImageClass} draggable={false} loading={img.src === eagerHomeImageSrc ? "eager" : "lazy"} />
            {img.badge ? (
              <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-medium text-zinc-900 shadow-sm backdrop-blur dark:bg-zinc-950/55 dark:text-zinc-50">
                <span className="inline-flex items-center gap-1">
                  <HeartIcon className="h-3 w-3 opacity-70" />
                  {img.badge}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0 dark:from-zinc-950/35"
        aria-hidden
      />
    </div>
  );
}

export function StackedScrollSection({ cards = stackScrollCards }: { cards?: StackScrollCard[] }) {
  return (
    <section aria-label="Nilai dan cara kerja" className="w-full bg-background">
      <div className="space-y-4">
        <header className="space-y-1 text-center sm:text-left">
          <h2 className="text-[36px] font-bold tracking-tight leading-10 text-zinc-950 dark:text-zinc-50">Produk Yang Aku <br className="sm:hidden" /> Bangun Sendiri</h2>
          <p className="text-base text-zinc-600 dark:text-zinc-500">Yuk, liat apa aja yang ada </p>
        </header>
        <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {cards.map(c => {
            const hasSlider = Boolean(c.sliderImages?.length === 3);
            const hasHero = Boolean(c.heroImage);
            const hasVisual = hasSlider || hasHero;

            return (
              <li key={c.title} className={["group", cardShellClass, cardHoverBorder, c.gridClass].filter(Boolean).join(" ")}>
                {hasSlider && c.sliderImages ? <BentoHoverSlider images={c.sliderImages} /> : hasHero && c.heroImage ? <BentoSingleImage image={c.heroImage} /> : null}
                <div className={[cardBodyBaseClass, hasVisual ? "pt-5" : "pt-6", c.link ? cardBodyWithActionClass : cardBodyStaticClass].join(" ")}>
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{c.title}</h3>
                  {c.link ? (
                    <div className="flex items-end justify-between gap-4">
                      <p className="max-w-[60%] text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{c.description}</p>
                      <Link href={c.link} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#001E36] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80 dark:bg-zinc-50 dark:text-zinc-950">
                        Kunjungi
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{c.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
