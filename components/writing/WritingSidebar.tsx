/**
 * Sidebar halaman detail artikel. Slot untuk promosi/banner/informasi/CTA —
 * ganti isi card di sini tanpa menyentuh struktur halaman.
 */
export function WritingSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-lg border border-zinc-200 p-5 dark:border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Promoted Product
        </p>
        <div className="mt-4 flex h-40 items-center justify-center rounded-md border border-dashed border-zinc-300 text-sm text-zinc-400 dark:border-white/15 dark:text-zinc-500">
          Placeholder
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 p-5 dark:border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          Information
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
    </aside>
  );
}
