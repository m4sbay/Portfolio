"use client";

import { useEffect, useRef } from "react";

import { App, DEFAULT_FONT, resolveFont } from "./CircularGalleryOGL.js";
import "./CircularGallery.css";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CircularGalleryItem {
  image: string;
  text: string;
}

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

// ─── React Component ───────────────────────────────────────────────────────────

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = DEFAULT_FONT,
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // App diimport dari .js — TypeScript tidak check OGL internal types.
    let app: InstanceType<typeof App> | undefined;
    let isMounted = true;

    resolveFont(font, fontUrl).then((resolvedFont: string) => {
      if (!isMounted || !containerRef.current) return;
      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font: resolvedFont,
        scrollSpeed,
        scrollEase,
      });
    });

    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase]);

  return <div className="circular-gallery" ref={containerRef} />;
}
