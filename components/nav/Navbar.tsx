import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-transparent backdrop-blur-sm dark:border-white/10">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          M4SBAY
        </Link>

        <nav className="flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          <Link className="hover:text-zinc-950 tracking-tight dark:hover:text-zinc-50" href="/writing">
            WRITE
          </Link>
          <Link className="hover:text-zinc-950 tracking-tight dark:hover:text-zinc-50" href="/event">
            EVENT
          </Link>
          <Link className="hover:text-zinc-950 tracking-tight dark:hover:text-zinc-50" href="/about">
            ABOUT
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
