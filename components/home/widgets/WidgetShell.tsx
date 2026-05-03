"use client";

import { useMemo, useRef } from "react";

type Position = { x: number; y: number };

export function WidgetShell({
  id,
  position,
  isActive,
  disabled,
  boundsRef,
  onActivate,
  onDeactivate,
  onPositionChange,
  className: classNameOverride,
  children,
}: {
  id: string;
  position: Position;
  isActive: boolean;
  disabled: boolean;
  boundsRef?: React.RefObject<HTMLElement | null>;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onPositionChange?: (pos: Position) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startPos: Position;
  } | null>(null);

  const baseCard =
    "select-none rounded-2xl border border-zinc-200/50 dark:border-white/20 bg-white/10 p-4 backdrop-blur-md";

  const activeCard = isActive
    ? " ring-1 ring-black/5 dark:ring-white/10"
    : "";

  const className = useMemo(() => {
    const base = classNameOverride ?? baseCard;
    return `${base}${activeCard}`;
  }, [baseCard, activeCard, classNameOverride]);

  const clampToBounds = (next: Position): Position => {
    const boundsEl = boundsRef?.current;
    const el = ref.current;
    if (!boundsEl || !el) return next;

    const bounds = boundsEl.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const maxX = Math.max(0, bounds.width - rect.width);
    const maxY = Math.max(0, bounds.height - rect.height);

    return {
      x: Math.min(Math.max(0, next.x), maxX),
      y: Math.min(Math.max(0, next.y), maxY),
    };
  };

  return (
    <div
      ref={ref}
      data-widget-id={id}
      className="flex flex-col will-change-transform transform-gpu"
      style={{
        position: disabled ? "static" : "absolute",
        left: disabled ? undefined : 0,
        top: disabled ? undefined : 0,
        transform: disabled
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: isActive ? 30 : 10,
        touchAction: disabled ? "auto" : "none",
      }}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-roledescription={disabled ? undefined : "draggable"}
      aria-disabled={disabled || undefined}
      onPointerDown={(e) => {
        if (disabled) return;
        if (e.button !== 0) return;
        const el = ref.current;
        if (!el) return;

        onActivate?.();
        draggingRef.current = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          startPos: position,
        };

        el.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const drag = draggingRef.current;
        if (!drag) return;
        if (drag.pointerId !== e.pointerId) return;

        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        const next = clampToBounds({ x: drag.startPos.x + dx, y: drag.startPos.y + dy });
        onPositionChange?.(next);
      }}
      onPointerUp={(e) => {
        const drag = draggingRef.current;
        if (!drag) return;
        if (drag.pointerId !== e.pointerId) return;
        draggingRef.current = null;
        onDeactivate?.();
      }}
      onPointerCancel={(e) => {
        const drag = draggingRef.current;
        if (!drag) return;
        if (drag.pointerId !== e.pointerId) return;
        draggingRef.current = null;
        onDeactivate?.();
      }}
    >
      <div className={`${className} grow origin-center transition-transform duration-300 ease-in-out hover:scale-[1.02]`}>
        {/* Mac Window Controls */}
        {!classNameOverride && (
          <div className="mb-4 flex items-center gap-1.5">
            <div className="group flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#ec6a5e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10">
              <svg
                className="h-[6px] w-[6px] opacity-0 transition-opacity group-hover:opacity-100 text-black/70"
                viewBox="0 0 8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" />
              </svg>
            </div>
            <div className="group flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#f4bf4f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10">
              <svg
                className="h-[6px] w-[6px] opacity-0 transition-opacity group-hover:opacity-100 text-black/70"
                viewBox="0 0 8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1 4h6" />
              </svg>
            </div>
            <div className="group flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#61c554] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10">
              <svg
                className="h-[6px] w-[6px] opacity-0 transition-opacity group-hover:opacity-100 text-black/70"
                viewBox="0 0 8 8"
                fill="currentColor"
              >
                <path d="M1.5 1.5h3l-3 3zM6.5 6.5h-3l3-3z" />
              </svg>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

