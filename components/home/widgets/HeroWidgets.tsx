"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Project } from "@/types/project";
import { WidgetShell } from "@/components/home/widgets/WidgetShell";
import { IntroWidget } from "@/components/home/widgets/IntroWidget";
import { StackWidget } from "@/components/home/widgets/StackWidget";
import { NowWidget } from "@/components/home/widgets/LastProjectWidget";
import { PhotoWidget } from "@/components/home/widgets/PhotoWidget";
import { MacFolderWidget } from "@/components/home/widgets/MacFolderWidget";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

type HeroWidgetItem = {
  id: string;
  pos: { x: number; y: number };
  content: ReactNode;
  shellClassName?: string;
  requireDoubleClickToDrag?: boolean;
};

export function HeroWidgets({ projects }: { projects: Project[] }) {
  const isMobile = useIsMobile();
  const nowProject = useMemo(
    () => projects[0]?.title ?? "Project baru",
    [projects],
  );
  const boundsRef = useRef<HTMLDivElement | null>(null);

  // State "locked" (siap drag) khusus untuk folder icon
  const [folderLocked, setFolderLocked] = useState(false);

  // Klik di luar folder -> unlock
  useEffect(() => {
    if (!folderLocked) return;
    const handler = (e: PointerEvent) => {
      const el = boundsRef.current?.querySelector('[data-widget-id="folder"]');
      if (el && !el.contains(e.target as Node)) {
        setFolderLocked(false);
      }
    };
    window.addEventListener("pointerdown", handler, { capture: true });
    return () => window.removeEventListener("pointerdown", handler, { capture: true });
  }, [folderLocked]);

  const items: HeroWidgetItem[] = useMemo(() => {
    const base: HeroWidgetItem[] = [
      {
        id: "intro",
        pos: { x: 24, y: 26 },
        content: <IntroWidget />,
      },
      {
        id: "stack",
        pos: { x: 360, y: 40 },
        content: <StackWidget />,
      },
      {
        id: "now",
        pos: { x: 120, y: 220 },
        content: <NowWidget projectTitle={nowProject} />,
      },
      {
        id: "photo",
        pos: { x: 520, y: 180 },
        content: <PhotoWidget />,
      },
      {
        id: "folder",
        pos: { x: 44, y: 288 },
        content: <MacFolderWidget />,
        shellClassName:
          "widget-drag-smooth select-none rounded-none border-0 bg-transparent p-0 shadow-none backdrop-blur-0",
        requireDoubleClickToDrag: true,
      },
    ];
    return base;
  }, [nowProject]);

  const container =
    "relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/40 p-4 dark:border-white/10 dark:bg-white/5 sm:min-h-[420px]";

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  useEffect(() => {
    queueMicrotask(() => {
      setPositions((prev) => {
        const next = { ...prev };
        for (const it of items) {
          if (!(it.id in next)) {
            next[it.id] = { x: it.pos.x, y: it.pos.y };
          }
        }
        for (const k of Object.keys(next)) {
          if (!items.some((it) => it.id === k)) {
            delete next[k];
          }
        }
        return next;
      });
    });
  }, [items]);

  const [activeId, setActiveId] = useState<string | null>(null);

  if (isMobile) {
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          layout={false}
          className="grid grid-cols-1 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((it) => (
            <m.div
              key={it.id}
              layout={false}
              className="will-change-transform transform-gpu"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: "easeOut" },
                },
              }}
            >
              <WidgetShell
                id={it.id}
                position={{ x: 0, y: 0 }}
                isActive={false}
                disabled
                className={it.shellClassName}
              >
                {it.content}
              </WidgetShell>
            </m.div>
          ))}
        </m.div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={boundsRef}
        layout={false}
        className={container}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {/* Subtle Halftone Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] opacity-25 dark:bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:12px_12px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {items.map((it) => (
          <m.div
            key={it.id}
            layout={false}
            className="will-change-transform transform-gpu"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <WidgetShell
              id={it.id}
              position={positions[it.id] ?? it.pos}
              isActive={activeId === it.id}
              disabled={false}
              boundsRef={boundsRef}
              onActivate={() => setActiveId(it.id)}
              onDeactivate={() => setActiveId(null)}
              onPositionChange={(next) =>
                setPositions((prev) => ({ ...prev, [it.id]: next }))
              }
              className={it.shellClassName}
              requireDoubleClickToDrag={it.requireDoubleClickToDrag ?? false}
              isDragLocked={it.id === "folder" ? folderLocked : undefined}
              onToggleLock={
                it.id === "folder"
                  ? () => setFolderLocked((v) => !v)
                  : undefined
              }
            >
              {it.content}
            </WidgetShell>
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}