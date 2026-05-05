import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-transparent backdrop-blur-sm dark:border-white/10">
      <div className="relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          MAULANA BAYU
        </Link>

        {/* Desktop: align nav text with Writing container (max-w-3xl) */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-3xl -translate-x-1/2 px-4 sm:px-6 lg:px-8 md:flex md:items-center">
          <nav className="pointer-events-auto flex items-center gap-10 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/writing">
              WRITING
            </Link>
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/event">
              EVENT
            </Link>
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/about">
              ABOUT
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          {/* Mobile: keep links next to toggle */}
          <nav className="flex items-center gap-8 md:hidden">
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/writing">
              WRITING
            </Link>
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/event">
              EVENT
            </Link>
            <Link className="tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/about">
              ABOUT
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
