"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/footer/SiteFooter";

/** Footer fixed (z-0) sebelum <main>, hanya di `/`. */
export function LandingFooterBeforeMain() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <SiteFooter />;
}

/** Runway scroll setelah <main>, hanya di `/`. */
export function LandingFooterScrollSpace() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <div aria-hidden className="w-full" style={{ height: "var(--footer-height)" }} />;
}
