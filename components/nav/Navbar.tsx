"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { LiquidGlass } from "@/components/liquid-glass/LiquidGlass";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** Jarak scroll (px): 0 = lebar besar, sampai ini = kolom penuh */
const NAVBAR_SCROLL_EXPAND_PX = 140;
const NAVBAR_IDLE_HIDE_MS = 10_000;

const navLinks = [
  { href: "/writing", label: "WRITING" },
  { href: "/event", label: "EVENT" },
  { href: "/work", label: "WORK" },
  { href: "/services", label: "SERVICES" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (menuButtonRef.current?.contains(target)) return;
      if (menuPanelRef.current?.contains(target)) return;

      setMenuOpen(false);
    };

    const closeOnScroll = () => setMenuOpen(false);

    document.addEventListener("pointerdown", closeOnOutsidePress);
    window.addEventListener("scroll", closeOnScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!mounted || menuOpen) {
      setNavHidden(false);
      return;
    }

    lastActivityRef.current = Date.now();

    const markActivity = () => {
      lastActivityRef.current = Date.now();
      setNavHidden(false);
    };

    const markPointerActivity = (event: PointerEvent) => {
      const previous = lastPointerRef.current;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };

      if (!previous) {
        markActivity();
        return;
      }

      const distance = Math.hypot(
        event.clientX - previous.x,
        event.clientY - previous.y
      );

      if (distance > 6) {
        markActivity();
      }
    };

    const idleCheck = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current >= NAVBAR_IDLE_HIDE_MS) {
        setNavHidden(true);
      }
    }, 500);

    window.addEventListener("pointermove", markPointerActivity, { passive: true });
    window.addEventListener("pointerdown", markActivity, { passive: true });
    window.addEventListener("wheel", markActivity, { passive: true });
    window.addEventListener("touchstart", markActivity, { passive: true });
    window.addEventListener("keydown", markActivity);

    return () => {
      window.clearInterval(idleCheck);
      window.removeEventListener("pointermove", markPointerActivity);
      window.removeEventListener("pointerdown", markActivity);
      window.removeEventListener("wheel", markActivity);
      window.removeEventListener("touchstart", markActivity);
      window.removeEventListener("keydown", markActivity);
    };
  }, [mounted, menuOpen]);

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
        <Link
          href="/"
          className={`text-sm tracking-tight text-[#171717] dark:text-zinc-50 ${
            isHome ? "font-semibold opacity-100" : "font-medium opacity-70 hover:opacity-100"
          }`}
        >
          HOME
        </Link>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-3xl -translate-x-1/2 px-4 sm:px-6 lg:px-8 md:flex md:items-center">
          <nav className="pointer-events-auto flex items-center gap-10 text-sm">
            {navLinks.map(({ href, label }) => {
              const active = isActiveLink(href);

              return (
                <Link
                  key={href}
                  className={`tracking-tight text-[#171717] dark:text-zinc-50 ${
                    active ? "font-semibold opacity-100" : "font-medium opacity-70 hover:opacity-100"
                  }`}
                  href={href}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            className="flex items-center justify-center rounded-lg p-1.5 text-[#171717] opacity-70 hover:opacity-100 dark:text-zinc-50 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="relative block h-5 w-5">
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)",
                }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              {/* Close (X) icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)",
                }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </LiquidGlass>
  );

  return (
    <div
      className={`pointer-events-none sticky top-0 z-50 w-full pt-4 transition-transform duration-700 ${
        reduceMotion
          ? ""
          : "[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
      } ${navHidden ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"}`}
    >
      <div ref={measureRef} className="mx-auto flex w-full max-w-6xl justify-center px-4 sm:px-6 lg:px-8">
        {scrollWide ? (
          <div ref={widthRef} className="pointer-events-auto min-w-0 max-w-full shrink-0">
            {glass}
          </div>
        ) : (
          <div className="pointer-events-auto min-w-0 w-full">{glass}</div>
        )}
      </div>

      {menuOpen && (
        <div
          ref={menuPanelRef}
          className="pointer-events-auto fixed right-4 top-[84px] z-[49] flex w-max max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-2xl bg-white/90 p-2.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-zinc-900/90 dark:ring-white/10 md:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`whitespace-nowrap rounded-lg px-5 py-3 text-sm tracking-tight hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-white/5 dark:hover:text-zinc-50 ${
                isActiveLink(href)
                  ? "font-semibold text-zinc-950 dark:text-zinc-50"
                  : "font-medium text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
