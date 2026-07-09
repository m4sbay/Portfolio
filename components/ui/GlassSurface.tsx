"use client";

import {
  useId,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Channel = "R" | "G" | "B";
type BlendMode = CSSProperties["mixBlendMode"];

type GlassSurfaceProps = {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: Channel;
  yChannel?: Channel;
  mixBlendMode?: BlendMode;
  className?: string;
  style?: CSSProperties;
};

const PROBE_FILTER = "url(#__glass_surface_probe__)";

function toCssSize(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function useSupportsSvgBackdropFilter() {
  const [supports, setSupports] = useState(false);

  useLayoutEffect(() => {
    if (typeof CSS === "undefined" || typeof window === "undefined") return;

    // WebKit (Safari/iOS) lolos CSS.supports untuk url() tapi tidak pernah
    // merender filter SVG di backdrop-filter, jadi jalur SVG dibatasi ke Chromium.
    const ua = navigator.userAgent;
    const isIOS =
      /iP(hone|ad|od)/.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !isIOS;

    const isSupported =
      isChromium &&
      (CSS.supports("backdrop-filter", PROBE_FILTER) ||
        CSS.supports("backdrop-filter", "blur(2px)"));

    queueMicrotask(() => setSupports(isSupported));
  }, []);

  return supports;
}

export function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "normal",
  className = "",
  style,
}: GlassSurfaceProps) {
  const reactId = useId();
  const filterId = `glass-surface-${reactId.replace(/:/g, "")}`;
  const supportsSvgFilter = useSupportsSvgBackdropFilter();
  const radius = `${borderRadius}px`;
  const rootStyle: CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(height),
    borderRadius: radius,
    ...style,
  };

  const surfaceStyle: CSSProperties = supportsSvgFilter
    ? {
        backgroundColor: `color-mix(in srgb, white ${backgroundOpacity * 100}%, transparent)`,
        backdropFilter: `url(#${filterId}) blur(${blur}px) saturate(${saturation})`,
        WebkitBackdropFilter: `url(#${filterId}) blur(${blur}px) saturate(${saturation})`,
      }
    : {
        // Meniru UIBlurEffect iOS: blur tebal + saturasi tinggi di atas tint tipis.
        backgroundColor: `rgba(255, 255, 255, ${Math.max(backgroundOpacity, 0.18)})`,
        backdropFilter: `blur(${Math.max(blur, 16)}px) saturate(${Math.max(saturation, 1.7)}) brightness(1.08)`,
        WebkitBackdropFilter: `blur(${Math.max(blur, 16)}px) saturate(${Math.max(saturation, 1.7)}) brightness(1.08)`,
        isolation: "isolate",
      };

  return (
    <div
      className={[
        "glass-surface",
        supportsSvgFilter ? "glass-surface--svg" : "glass-surface--fallback",
        "relative flex items-center justify-center overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ ...rootStyle, ...surfaceStyle }}
    >
      <svg
        className="pointer-events-none fixed h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={borderWidth * 100}
              result="displacementMap"
            />
            <feColorMatrix
              in="displacementMap"
              type="matrix"
              values={`1 0 0 0 ${brightness / 100} 0 1 0 0 ${brightness / 100} 0 0 1 0 ${brightness / 100} 0 0 0 ${opacity} 0`}
              result="brightMap"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="brightMap"
              scale={distortionScale}
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              result="displaced"
            />
            <feColorMatrix
              in="displaced"
              type="matrix"
              values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="red"
            />
            <feColorMatrix
              in="displaced"
              type="matrix"
              values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="green"
            />
            <feColorMatrix
              in="displaced"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
              result="blue"
            />
            <feOffset in="red" dx={redOffset / 10} result="redOffset" />
            <feOffset in="green" dx={greenOffset / 10} result="greenOffset" />
            <feOffset in="blue" dx={blueOffset / 10} result="blueOffset" />
            <feBlend in="redOffset" in2="greenOffset" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueOffset" mode="screen" result="rgb" />
            <feGaussianBlur in="rgb" stdDeviation={displace} />
          </filter>
        </defs>
      </svg>
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={{ borderRadius: "inherit", mixBlendMode }}
      >
        {children}
      </div>
    </div>
  );
}
