"use client";

import { useRef, useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/design-system/icons";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
  /** Gradien CSS untuk sisi Before (foto mentah/flat) */
  beforeGradient?: string;
  /** Gradien CSS untuk sisi After (setelah preset) */
  afterGradient?: string;
}

export function BeforeAfterSlider({
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  initialPosition = 50,
  className = "",
  beforeGradient = "linear-gradient(135deg, #1a1e26 0%, #262e3d 30%, #3a4a60 60%, #6a7d94 100%)",
  afterGradient = "linear-gradient(135deg, #1e1008 0%, #3d2010 25%, #6b3a1e 50%, #a05a30 75%, #c8844a 100%)",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(4, Math.min(clientX - rect.left, rect.width - 4));
    setPosition((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      className={`relative overflow-hidden cursor-col-resize select-none rounded-2xl ${className}`}
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        isDragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updatePosition(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        updatePosition(e.clientX);
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerCancel={() => {
        isDragging.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(4, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(96, p + 2));
      }}
    >
      {/* After layer — warm preset (full background) */}
      <div
        className="absolute inset-0"
        style={{ background: afterGradient }}
        aria-hidden
      >
        <div className="absolute bottom-4 right-4 text-xs tracking-[0.2em] text-white/50 font-(family-name:--font-inter)">
          PRESET ON
        </div>
      </div>

      {/* Before layer — clipped to left side */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <div className="absolute inset-0" style={{ background: beforeGradient }}>
          <div className="absolute bottom-4 left-4 text-xs tracking-[0.2em] text-white/50 font-(family-name:--font-inter)">
            RAW
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px bg-white/70 pointer-events-none"
        style={{ left: `${position}%` }}
        aria-hidden
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-[0_2px_20px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <span className="flex items-center text-[#141414]" aria-hidden>
            <ChevronLeftIcon className="h-[18px] w-[9px]" />
            <ChevronRightIcon className="h-[18px] w-[9px]" />
          </span>
        </div>
      </div>

      {/* Corner labels */}
      <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.18em] bg-black/50 text-white/80 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none font-(family-name:--font-inter)">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-[0.18em] bg-black/50 text-white/80 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none font-(family-name:--font-inter)">
        {afterLabel}
      </span>
    </div>
  );
}
