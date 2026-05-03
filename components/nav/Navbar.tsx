import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-transparent backdrop-blur-sm dark:border-white/10">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          Masbay
        </Link>

        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link className="hover:text-zinc-950 dark:hover:text-zinc-50" href="/">
            Work
          </Link>
          <Link
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
            href="/about"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

