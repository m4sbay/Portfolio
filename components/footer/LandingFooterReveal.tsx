"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/footer/SiteFooter";

const FOOTER_PATHS = ["/", "/services"];

/** Footer fixed (z-0) sebelum <main>, di halaman yang terdaftar. */
export function LandingFooterBeforeMain() {
  const pathname = usePathname();
  if (!FOOTER_PATHS.includes(pathname)) return null;
  return <SiteFooter />;
}

/** Runway scroll setelah <main>, di halaman yang terdaftar. */
export function LandingFooterScrollSpace() {
  const pathname = usePathname();
  if (!FOOTER_PATHS.includes(pathname)) return null;
  return <div aria-hidden className="w-full" style={{ height: "var(--footer-height)" }} />;
}
