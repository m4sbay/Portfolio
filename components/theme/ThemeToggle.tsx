"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

/** Matahari — pusat + sinar, stroke seragam dengan MoonIcon */
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="3.75" />
      <path d="M12 2.25v2M12 19.75v2M4.25 12h2M17.75 12h2M6.34 6.34l1.41 1.41M16.24 16.24l1.42 1.42M17.66 6.34l-1.41 1.41M7.76 16.24l-1.42 1.42" />
    </svg>
  );
}

/**
 * Bulan sabit (satu path, beda dari varian “bulan + highlight”) —
 * stroke sama dengan SunIcon supaya serasi di dalam lingkaran tombol.
 */
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-zinc-200/80 bg-white/20 text-zinc-500 shadow-sm backdrop-blur-md outline-none transition-[color,background-color,transform,box-shadow,border-color] duration-200 hover:-translate-y-px hover:border-zinc-300/90 hover:bg-white/30 hover:text-zinc-700 hover:shadow active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500/50 dark:focus-visible:ring-offset-zinc-950"
      aria-label={isDark ? "Ubah ke mode terang" : "Ubah ke mode gelap"}
    >
      <LazyMotion features={domAnimation}>
        {isDark ? (
          <m.span
            key="sun"
            className="inline-flex origin-center will-change-transform"
            initial={
              reduceMotion
                ? false
                : { rotate: -360, scale: 0.88, opacity: 0.75 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    rotate: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.45, ease: [0.34, 1.2, 0.64, 1] },
                    opacity: { duration: 0.35, ease: "easeOut" },
                  }
            }
          >
            <SunIcon className="h-[18px] w-[18px]" />
          </m.span>
        ) : (
          <m.span
            key="moon"
            className="inline-flex origin-center will-change-transform"
            initial={reduceMotion ? false : { rotate: 56, opacity: 0.7 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.42, ease: [0.33, 1, 0.68, 1] }
            }
          >
            <MoonIcon className="h-[18px] w-[18px]" />
          </m.span>
        )}
      </LazyMotion>
    </button>
  );
}
