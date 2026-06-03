"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { href: "#packs", label: "Koleksi" },
  { href: "#inside", label: "Sample" },
  { href: "#develop", label: "Detail" },
];

export function ArsiPresetNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-16 xl:px-24 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10"
          : "bg-transparent"
      }`}
      aria-label="ArsiPreset navigation"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between">
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 hover:opacity-70 transition-opacity"
        >
          arsipreset
          <span style={{ color: "#f08040" }}>.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#packs"
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: "#f08040" }}
        >
          Beli Preset
        </a>
      </div>
    </nav>
  );
}
