import { ChevronRightIcon } from "@/design-system/icons";

/**
 * Afordans "pintu" — muncul saat hover/fokus di atas area karya yang bisa diklik.
 * Halus, bukan tombol yang berteriak. Dipakai WorkHero & FeaturedCard.
 * Parent wajib `group` + `relative`.
 */
export function DoorAffordance({ label = "Lihat karya" }: { label?: string }) {
  return (
    <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white/90 dark:text-zinc-950">
      {label}
      <ChevronRightIcon className="h-3 w-3" />
    </span>
  );
}
