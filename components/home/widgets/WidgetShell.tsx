"use client";

import { useMemo, useRef } from "react";

type Position = { x: number; y: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

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
  requireDoubleClickToDrag = false,
  isDragLocked = false,
  onToggleLock,
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
  /**
   * Kalau true, drag hanya aktif setelah double-click (behavior Mac wallpaper icon).
   * Gunakan bersama isDragLocked dan onToggleLock.
   */
  requireDoubleClickToDrag?: boolean;
  /** Apakah widget ini sedang dalam mode "terkunci/siap drag". */
  isDragLocked?: boolean;
  /** Dipanggil saat double-click untuk toggle lock state di parent. */
  onToggleLock?: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startPos: Position;
    hasMoved: boolean;
  } | null>(null);

  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<Position>(position);
  const smoothPosRef = useRef<Position>(position);

  // Untuk deteksi double-click manual (lebih reliable dari onDoubleClick di mobile)
  const lastTapRef = useRef<number>(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseCard =
    "select-none rounded-2xl border border-zinc-200/50 dark:border-white/20 bg-white/10 p-4 backdrop-blur-md";

  const activeCard = isActive
    ? " ring-1 ring-black/5 dark:ring-white/10"
    : "";

  const className = useMemo(() => {
    const base = classNameOverride ?? baseCard;
    return `${base}${activeCard}`;
  }, [baseCard, activeCard, classNameOverride]);

  const smoothDragEnabled = Boolean(
    classNameOverride?.includes("widget-drag-smooth"),
  );

  // Apakah drag boleh berjalan sekarang?
  const canDrag = requireDoubleClickToDrag ? isDragLocked : true;

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

  const cancelRaf = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tickSmooth = () => {
    const drag = draggingRef.current;
    if (!drag) return;

    const t = 0.22;
    const cur = smoothPosRef.current;
    const target = targetRef.current;
    const next = {
      x: lerp(cur.x, target.x, t),
      y: lerp(cur.y, target.y, t),
    };
    smoothPosRef.current = next;
    onPositionChange?.(next);

    rafRef.current = requestAnimationFrame(tickSmooth);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;

    // -- Deteksi double-click --
    if (requireDoubleClickToDrag) {
      const now = Date.now();
      const delta = now - lastTapRef.current;
      lastTapRef.current = now;

      if (delta < 350) {
        // Double-click: toggle lock
        if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
        onToggleLock?.();
        return;
      }

      // Kalau belum locked, single click hanya aktivasi (bawa ke atas), tidak drag
      if (!isDragLocked) {
        onActivate?.();
        return;
      }
    }

    // -- Mulai drag --
    onActivate?.();
    cancelRaf();
    targetRef.current = position;
    smoothPosRef.current = position;
    draggingRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startPos: position,
      hasMoved: false,
    };

    el.setPointerCapture(e.pointerId);
    if (smoothDragEnabled) {
      rafRef.current = requestAnimationFrame(tickSmooth);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = draggingRef.current;
    if (!drag) return;
    if (drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    // Tandai sudah bergerak jika threshold 3px terlampaui
    if (!drag.hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      drag.hasMoved = true;
    }

    if (!drag.hasMoved) return;

    const next = clampToBounds({
      x: drag.startPos.x + dx,
      y: drag.startPos.y + dy,
    });

    if (smoothDragEnabled) {
      targetRef.current = next;
      return;
    }
    onPositionChange?.(next);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = draggingRef.current;
    if (!drag) return;
    if (drag.pointerId !== e.pointerId) return;
    draggingRef.current = null;
    cancelRaf();
    const el = ref.current;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    onDeactivate?.();
  };

  // Outline visual saat folder sedang dalam mode siap-drag
  const lockRing =
    requireDoubleClickToDrag && isDragLocked
      ? " outline outline-2 outline-offset-2 outline-blue-400/60"
      : "";

  return (
    <div
      ref={ref}
      data-widget-id={id}
      className={`${className} will-change-transform transform-gpu${lockRing}`}
      style={{
        position: disabled ? "static" : "absolute",
        left: disabled ? undefined : 0,
        top: disabled ? undefined : 0,
        transform: disabled
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: isActive ? 30 : 10,
        touchAction: disabled ? "auto" : "none",
        cursor:
          disabled
            ? "default"
            : requireDoubleClickToDrag
              ? isDragLocked
                ? "grab"
                : "default"
              : "grab",
      }}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-roledescription={disabled ? undefined : "draggable"}
      aria-disabled={disabled || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Mac Window Controls */}
      {!classNameOverride && (
        <div className="mb-4 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#61c554] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
        </div>
      )}
      {children}
    </div>
  );
}