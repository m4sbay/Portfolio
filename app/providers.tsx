"use client";

import { ThemeProvider } from "next-themes";
import {
  LIQUID_GLASS_DEFAULT_EDGE_BLUR,
  LIQUID_GLASS_DEFAULT_SCALE,
  LIQUID_GLASS_FILTER_ID,
  LiquidGlassFilterProvider,
} from "@/components/liquid-glass/LiquidGlassFilter";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LiquidGlassFilterProvider
        filterId={LIQUID_GLASS_FILTER_ID}
        scale={LIQUID_GLASS_DEFAULT_SCALE}
        edgeBlur={LIQUID_GLASS_DEFAULT_EDGE_BLUR}
      >
        {children}
      </LiquidGlassFilterProvider>
    </ThemeProvider>
  );
}

