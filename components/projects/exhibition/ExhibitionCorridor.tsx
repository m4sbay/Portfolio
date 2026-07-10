/**
 * Lorong antar bab: ruang napas bisu. Hanya dua elemen — segmen benang statis
 * dan pratinjau samar bab berikutnya ("pintu ruangan terlihat dari ujung lorong").
 * Dekoratif penuh: informasi yang sama ada di marker bab berikutnya.
 */
export function ExhibitionCorridor({
  nextNumeral,
  nextVerb,
  tall = false,
}: {
  nextNumeral: string;
  nextVerb: string;
  tall?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`flex flex-col items-center justify-center gap-6 py-10 ${
        tall ? "min-h-[36svh] sm:min-h-[44svh]" : "min-h-[28svh] sm:min-h-[34svh]"
      }`}
    >
      <span className="h-16 w-px bg-zinc-200 dark:bg-white/10 sm:h-24" />
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-300 dark:text-zinc-700">
        {nextNumeral} — {nextVerb}
      </p>
    </div>
  );
}
