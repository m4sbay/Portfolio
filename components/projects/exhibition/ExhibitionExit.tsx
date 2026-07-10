import { ArrowUpRightIcon } from "@/design-system/icons";
import { chapterNumeral } from "@/data/exhibition";

/**
 * Ujung rute: benang berhenti, counter genap, siluet bab berikutnya bila ada draft,
 * lalu satu ajakan berlabel. Pendaratan yang tenang — Exit yang ramai membatalkannya.
 */
export function ExhibitionExit({
  total,
  hasDraft,
  ctaLabel,
  ctaHref,
}: {
  total: number;
  hasDraft: boolean;
  ctaLabel: string;
  ctaHref: string;
}) {
  const finalNumeral = chapterNumeral(total - 1);

  return (
    <section className="flex min-h-[45svh] flex-col items-center justify-center gap-10 py-20 text-center">
      {/* Benang menuntaskan garisnya */}
      <div aria-hidden className="flex flex-col items-center gap-4">
        <span className="h-16 w-px bg-zinc-200 dark:bg-white/10 sm:h-24" />
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <p className="font-mono text-xs tracking-[0.24em] text-zinc-400 dark:text-zinc-600">
          {finalNumeral} / {finalNumeral}
        </p>
      </div>

      {/* Pameran ini hidup: bab berikutnya sedang disiapkan */}
      {hasDraft ? (
        <div
          aria-hidden
          className="rounded-2xl border border-dashed border-zinc-200 px-10 py-8 opacity-60 dark:border-white/10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-600">
            {chapterNumeral(total)} — soon
          </p>
        </div>
      ) : null}

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-50 dark:hover:border-white/20 dark:hover:bg-white/5"
      >
        {ctaLabel}
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </section>
  );
}
