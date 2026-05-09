"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export const LIQUID_GLASS_FILTER_ID = "liquid-glass-filter";
export const LIQUID_GLASS_DEFAULT_SCALE = 20;
export const LIQUID_GLASS_DEFAULT_EDGE_BLUR = 10;

type FilterConfig = {
  scale: number;
  edgeBlur: number;
};

type LiquidGlassFilterContextValue = {
  filterId: string;
  register: (config: FilterConfig) => void;
  unregister: () => void;
};

const LiquidGlassFilterContext =
  createContext<LiquidGlassFilterContextValue | null>(null);

/**
 * Beberapa instance: stack register/unmount; satu filter SVG satu id untuk semua backdrop url(#id).
 */
export function useLiquidGlassFilter() {
  const ctx = useContext(LiquidGlassFilterContext);
  if (!ctx) {
    throw new Error(
      "useLiquidGlassFilter must be used within LiquidGlassFilterProvider"
    );
  }
  return ctx;
}

export function LiquidGlassFilterProvider({
  children,
  filterId = LIQUID_GLASS_FILTER_ID,
  scale: initialScale = LIQUID_GLASS_DEFAULT_SCALE,
  edgeBlur: initialEdgeBlur = LIQUID_GLASS_DEFAULT_EDGE_BLUR,
}: {
  children: React.ReactNode;
  filterId?: string;
  scale?: number;
  edgeBlur?: number;
}) {
  const stackRef = useRef<FilterConfig[]>([]);
  const defaultsRef = useRef({
    scale: initialScale,
    edgeBlur: initialEdgeBlur,
  });
  defaultsRef.current = {
    scale: initialScale,
    edgeBlur: initialEdgeBlur,
  };

  const [active, setActive] = useState<FilterConfig>({
    scale: initialScale,
    edgeBlur: initialEdgeBlur,
  });

  const register = useCallback((config: FilterConfig) => {
    stackRef.current.push(config);
    setActive(config);
  }, []);

  const unregister = useCallback(() => {
    stackRef.current.pop();
    const top = stackRef.current[stackRef.current.length - 1];
    setActive(top ?? defaultsRef.current);
  }, []);

  const value = useMemo(
    () => ({
      filterId,
      register,
      unregister,
    }),
    [filterId, register, unregister]
  );

  return (
    <LiquidGlassFilterContext.Provider value={value}>
      {/* Satu definisi filter di root; sibling sebelum konten lain di bawah provider. */}
      <svg
        width={0}
        height={0}
        className="pointer-events-none absolute top-0 left-0 overflow-hidden opacity-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feFlood floodColor="#808080" floodOpacity={1} result="gray" />
            <feComposite
              in="gray"
              in2="SourceGraphic"
              operator="in"
              result="shape-mask"
            />
            <feGaussianBlur
              in="shape-mask"
              stdDeviation={active.edgeBlur}
              result="soft-mask"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="soft-mask"
              scale={active.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </LiquidGlassFilterContext.Provider>
  );
}
