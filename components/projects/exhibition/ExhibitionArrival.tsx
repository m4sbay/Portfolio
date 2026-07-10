import type { ExhibitionChapter } from "@/types/exhibition";
import { chapterNumeral } from "@/data/exhibition";

/**
 * Arrival + Hero: dekompresi lalu floor plan pameran.
 * Viewport pertama nyaris kosong — kekosongan adalah desain, bukan sisa (UX Flow §1–2).
 */
export function ExhibitionArrival({
  eyebrow,
  title,
  chapters,
}: {
  eyebrow: string;
  title: string;
  chapters: ExhibitionChapter[];
}) {
  return (
    <section className="flex min-h-[70svh] flex-col justify-center py-16 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-[44px] font-semibold leading-none tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
        {title}
      </h1>

      {/* Floor plan — indeks empat verba; busur cerita dalam satu pandangan */}
      <ol className="mt-14 space-y-3 sm:mt-20 sm:space-y-4">
        {chapters.map((chapter, index) => (
          <li key={chapter.slug} className="flex items-baseline gap-4 sm:gap-6">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              {chapterNumeral(index)}
            </span>
            <span className="text-sm font-medium tracking-tight text-zinc-600 dark:text-zinc-400 sm:text-base">
              {chapter.verb}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
