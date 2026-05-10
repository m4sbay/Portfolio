"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LiquidGlass } from "@/components/liquid-glass/LiquidGlass";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** Jarak scroll (px): 0 = lebar besar, sampai ini = kolom penuh */
const NAVBAR_SCROLL_EXPAND_PX = 140;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const measureRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLDivElement>(null);

  const scrollWide = mounted && isHome && !reduceMotion;

  useLayoutEffect(() => {
    if (!scrollWide || !measureRef.current || !widthRef.current) return;

    const outer = measureRef.current;
    const inner = widthRef.current;

    inner.style.transition = reduceMotion ? "none" : "width 320ms cubic-bezier(0.32, 0.72, 0, 1)";

    const resolve = () => {
      const wide = outer.clientWidth;
      const vw80 = Math.round(window.innerWidth * 0.8);
      let narrow = Math.min(wide, vw80);
      if (narrow > wide - 8) {
        narrow = Math.max(240, Math.min(Math.round(wide * 0.82), wide - 16));
      }
      return { wide, narrow };
    };

    const apply = () => {
      const { wide, narrow } = resolve();
      const y = Math.min(Math.max(window.scrollY, 0), NAVBAR_SCROLL_EXPAND_PX);
      const t = NAVBAR_SCROLL_EXPAND_PX <= 0 ? 1 : y / NAVBAR_SCROLL_EXPAND_PX;
      const px = Math.round(narrow + t * (wide - narrow));
      inner.style.width = `${px}px`;
    };

    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(outer);
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      inner.style.transition = "";
      inner.style.width = "";
    };
  }, [scrollWide, reduceMotion]);

  const glass = (
    <LiquidGlass as="header" scale={20} edgeBlur={10} frostBlur={1.5} tintOpacity={0.14} darkTintOpacity={0.14} borderRadius={24} className="w-full min-w-0 px-4">
      <div className="relative flex h-14 w-full min-w-0 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          HOME
        </Link>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-3xl -translate-x-1/2 px-4 sm:px-6 lg:px-8 md:flex md:items-center">
          <nav className="pointer-events-auto flex items-center gap-10 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <Link className="inline-block tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/writing">
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

        <div className="flex shrink-0 items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          <nav className="flex items-center gap-8 md:hidden">
            <Link className="inline-block tracking-tight hover:text-zinc-950 dark:hover:text-zinc-50" href="/writing">
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
    </LiquidGlass>
  );

  return (
    <div className="pointer-events-none sticky top-0 z-50 w-full pt-4">
      <div ref={measureRef} className="mx-auto flex w-full max-w-6xl justify-center px-4 sm:px-6 lg:px-8">
        {scrollWide ? (
          <div ref={widthRef} className="pointer-events-auto min-w-0 max-w-full shrink-0">
            {glass}
          </div>
        ) : (
          <div className="pointer-events-auto min-w-0 w-full">{glass}</div>
        )}
      </div>
    </div>
  );
}
