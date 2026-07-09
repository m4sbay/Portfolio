"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  LIQUID_GLASS_DEFAULT_EDGE_BLUR,
  LIQUID_GLASS_DEFAULT_SCALE,
  useLiquidGlassFilter,
} from "@/components/liquid-glass/LiquidGlassFilter";

const PROBE = "url(#__liquid_glass_probe__)";

/**
 * Filter SVG tidak diduplikasi di sini — wajib mount LiquidGlassFilterProvider di root.
 * WebKit (Safari/iOS) lolos CSS.supports untuk url() tapi tidak merendernya di
 * backdrop-filter, jadi jalur url() dibatasi ke engine Chromium saja.
 */
function useSupportsBackdropUrl() {
  const [supports, setSupports] = useState(false);
  useLayoutEffect(() => {
    if (typeof CSS === "undefined" || typeof window === "undefined") {
      return;
    }
    const ua = navigator.userAgent;
    const isIOS =
      /iP(hone|ad|od)/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !isIOS;

    const ok =
      isChromium &&
      (CSS.supports("backdrop-filter", PROBE) ||
        CSS.supports("backdrop-filter", "blur(2px)"));
    queueMicrotask(() => setSupports(ok));
  }, []);
  return supports;
}

export type LiquidGlassProps = {
  scale?: number;
  edgeBlur?: number;
  frostBlur?: number;
  tintOpacity?: number;
  /** Opasitas permukaan putih di mode gelap (backdrop url path). Default 0.08 */
  darkTintOpacity?: number;
  /** Pixel jika angka; string untuk nilai CSS (mis. `1.5rem`). Default 24px. */
  borderRadius?: number | string;
  className?: string;
  as?: "div" | "header" | "section" | "article";
  children: React.ReactNode;
};

export function LiquidGlass({
  scale = LIQUID_GLASS_DEFAULT_SCALE,
  edgeBlur = LIQUID_GLASS_DEFAULT_EDGE_BLUR,
  frostBlur = 6,
  tintOpacity = 0.1,
  darkTintOpacity = 0.08,
  borderRadius = 24,
  className = "",
  as: Tag = "div",
  children,
}: LiquidGlassProps) {
  const supportsUrl = useSupportsBackdropUrl();
  const { filterId, register, unregister } = useLiquidGlassFilter();
  const { resolvedTheme } = useTheme();

  useLayoutEffect(() => {
    register({ scale, edgeBlur });
    return () => unregister();
  }, [scale, edgeBlur, register, unregister]);

  const isDark = resolvedTheme === "dark";

  const radiusCss =
    typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  const chromiumStyle: CSSProperties | undefined = supportsUrl
    ? {
        borderRadius: radiusCss,
        backdropFilter: `url(#${filterId}) blur(${frostBlur}px) saturate(1.2)`,
        WebkitBackdropFilter: `url(#${filterId}) blur(${frostBlur}px) saturate(1.2)`,
        backgroundColor: isDark
          ? `rgba(255, 255, 255, ${darkTintOpacity})`
          : `rgba(255, 255, 255, ${tintOpacity})`,
      }
    : { borderRadius: radiusCss };

  return (
    <Tag
      className={[
        "liquid-glass relative overflow-hidden",
        "border border-[rgba(255,255,255,0.28)] dark:border-white/14",
        "[box-shadow:0_8px_32px_rgba(0,0,0,0.12)]",
        "dark:[box-shadow:0_8px_32px_rgba(0,0,0,0.38)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={chromiumStyle}
    >
      <div className="relative z-1">{children}</div>
    </Tag>
  );
}
