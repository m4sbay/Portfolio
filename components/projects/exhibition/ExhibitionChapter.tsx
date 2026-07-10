import Image from "next/image";
import Link from "next/link";
import type { ChapterViewModel } from "@/data/exhibition";
import { chapterNumeral } from "@/data/exhibition";
import { ArrowUpRightIcon, ChevronRightIcon } from "@/design-system/icons";

/**
 * Satu bab rute: beat DOM berurutan marker → karya → label plate (urutan membaca UX Flow).
 * Empat varian komposisi mewujudkan busur: ekspresif → dualitas → sistem → sinema.
 * Seluruh area karya adalah pintu ke halaman detail.
 */
export function ExhibitionChapter({ vm, total }: { vm: ChapterViewModel; total: number }) {
  const { chapter, project, index } = vm;
  const numeral = chapterNumeral(index);
  const plateMeta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <section id={project.slug} className="py-16 sm:py-24">
      {/* Beat 1 — marker: numeral sebagai bentuk grafis (Swiss), verba sebagai wall text */}
      <header className="mb-8 sm:mb-12">
        <div className="flex items-end justify-between">
          <span
            aria-hidden
            className="block select-none font-mono text-6xl font-light leading-none text-zinc-200 dark:text-zinc-800 sm:text-7xl"
          >
            {numeral}
          </span>
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            {numeral} / {chapterNumeral(total - 1)}
          </span>
        </div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
          {chapter.verb}
          <span className="sr-only"> — {project.title}</span>
        </h2>
      </header>

      {/* Beat 2 — karya */}
      <ChapterFigure vm={vm} />

      {/* Beat 3 — label plate ala galeri: judul · kategori · tahun */}
      <footer className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mt-7">
        <div className="min-w-0">
          <p className="truncate text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-lg">
            {project.title}
          </p>
          <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">{plateMeta}</p>
        </div>
        {chapter.composition === "cinematic" && project.externalLink ? (
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
          >
            Tonton
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </footer>
    </section>
  );
}

const doorClass =
  "group block overflow-hidden rounded-3xl outline-none ring-1 ring-zinc-200/70 transition-shadow duration-300 hover:shadow-xl hover:shadow-zinc-950/10 focus-visible:ring-2 focus-visible:ring-zinc-950 dark:ring-white/10 dark:hover:shadow-black/25 dark:focus-visible:ring-zinc-50";

function ChapterFigure({ vm }: { vm: ChapterViewModel }) {
  const { chapter, project } = vm;
  const href = `/work/${project.slug}`;
  const doorLabel = `Buka detail ${project.title}`;

  switch (chapter.composition) {
    // 01 Merancang — ekspresif: poster asimetris + vitrine proses mengintip di sisi
    case "expressive": {
      const vitrine = project.processSections?.[0]?.gallery.slice(0, 2) ?? [];
      return (
        <div className="grid gap-5 sm:grid-cols-12 sm:gap-6">
          <Link
            href={href}
            aria-label={doorLabel}
            className={`relative bg-zinc-100 dark:bg-zinc-900 sm:col-span-8 ${doorClass}`}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
            <DoorAffordance />
          </Link>
          {vitrine.length > 0 ? (
            <div className="flex gap-4 sm:col-span-4 sm:flex-col sm:justify-center sm:pl-2 lg:pl-6">
              {vitrine.map((item, i) => (
                <div
                  key={item.src}
                  className={`relative w-28 overflow-hidden rounded-xl ring-1 ring-zinc-200/70 dark:ring-white/10 sm:w-full sm:max-w-[180px] ${
                    i === 1 ? "translate-y-3 sm:translate-y-0 sm:ml-10" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 180px, 112px"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    // 02 Menjembatani — dualitas: dua state dalam satu bingkai bersama
    case "duality": {
      const second = project.hoverImage ?? project.image;
      return (
        <Link
          href={href}
          aria-label={doorLabel}
          className={`relative border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-white/5 ${doorClass}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative aspect-[4/3] border-b border-zinc-200/80 dark:border-white/10 sm:border-b-0 sm:border-r">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src={second.src}
                alt={second.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          </div>
          <DoorAffordance />
        </Link>
      );
    }

    // 03 Mengotomasi — sistem: terkunci grid, lebih sempit & terpusat, presisi di atas ekspresi
    case "system":
      return (
        <Link
          href={href}
          aria-label={doorLabel}
          className={`relative mx-auto max-w-4xl bg-zinc-50 dark:bg-zinc-900 sm:rounded-2xl ${doorClass}`}
        >
          <div className="relative aspect-[5/4]">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>
          <DoorAffordance />
        </Link>
      );

    // 04 Bercerita — sinema: bingkai terlebar di halaman, klimaks
    case "cinematic":
      return (
        <Link
          href={href}
          aria-label={doorLabel}
          className={`relative bg-zinc-950 ${doorClass}`}
        >
          <div className="relative aspect-video">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
              sizes="(min-width: 1152px) 1120px, 100vw"
            />
          </div>
          <DoorAffordance />
        </Link>
      );
  }
}

/** Afordans pintu — muncul saat hover/fokus; halus, bukan tombol yang berteriak. */
function DoorAffordance() {
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white/90 dark:text-zinc-950">
      Lihat karya
      <ChevronRightIcon className="h-3 w-3" />
    </span>
  );
}
