"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { StackScrollCard } from "@/data/stack-scroll-cards";
import { stackScrollCards } from "@/data/stack-scroll-cards";

const ENTRY_RATIO = 0.72;

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/**
 * Kartu 0 langsung di posisi tumpuk (tanpa fase scroll kosong di awal).
 * Kartu i≥1 naik satu per satu: tiap scroll ~1/(n-1) progres menambah satu layer.
 * Semua berakhir di titik yang sama (toY = 0).
 */
function cardY(
  p: number,
  i: number,
  n: number,
  vhPx: number,
): number {
  const fromY = vhPx * ENTRY_RATIO;
  const toY = 0;

  if (i === 0) {
    return toY;
  }

  if (n <= 1) {
    return toY;
  }

  const phases = n - 1;
  const start = (i - 1) / phases;
  const end = i / phases;

  if (p <= start) return fromY;
  if (p >= end) return toY;
  const t = (p - start) / (end - start);
  return fromY + (toY - fromY) * smoothstep(t);
}

function StaticStackList({ cards }: { cards: StackScrollCard[] }) {
  return (
    <section
      aria-label="Nilai dan cara kerja"
      className="space-y-6 py-4 "
    >
      <header className="mt-3 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Cara aku mendekati kerja
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Ringkas — tanpa animasi scroll agar nyaman di perangkatmu.
        </p>
      </header>
      <ul className="flex w-full flex-col gap-4">
        {cards.map((c) => (
          <li
            key={c.title}
            className="flex h-[60dvh] max-h-[60dvh] w-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="shrink-0 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {c.title}
            </h3>
            <p className="mt-2 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {c.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StackedCard({
  card,
  scrollYProgress,
  index,
  total,
  vhPx,
}: {
  card: StackScrollCard;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  vhPx: number;
}) {
  const y = useTransform(scrollYProgress, (p) => cardY(p, index, total, vhPx));

  return (
    <div className="pointer-events-none absolute inset-0 flex w-full items-center justify-center">
      <m.div
        style={{
          y,
          zIndex: 10 + index,
        }}
        className="pointer-events-none w-full max-w-full will-change-transform"
      >
        <div className="pointer-events-auto flex h-[60dvh] max-h-[60dvh] w-full flex-col rounded-2xl border border-zinc-200 bg-white/95 p-5 backdrop-blur-sm sm:p-6 dark:border-white/10 dark:bg-zinc-950/90">
          <h3 className="shrink-0 text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {card.title}
          </h3>
          <p className="mt-2 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {card.description}
          </p>
        </div>
      </m.div>
    </div>
  );
}

function StackedScrollAnimated({ cards }: { cards: StackScrollCard[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [vhPx, setVhPx] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 639px)");
    const read = () => {
      setIsMobile(mqMobile.matches);
      setVhPx(window.innerHeight);
    };
    read();
    mqMobile.addEventListener("change", read);
    window.addEventListener("resize", read);
    return () => {
      mqMobile.removeEventListener("change", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const n = cards.length;
  const vhPerCard = isMobile ? 65 : 100;
  /** Satu viewport scroll per kartu tambahan (kartu pertama tidak “makan” scroll). */
  const scrollPhases = Math.max(1, n - 1);
  const sectionHeight = useMemo(
    () => `${scrollPhases * vhPerCard}vh`,
    [scrollPhases, vhPerCard],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="Nilai dan cara kerja — scroll untuk melihat kartu bertumpuk"
        className="relative w-full"
      >
        <div
          ref={sectionRef}
          className="relative w-full"
          style={{ height: sectionHeight }}
        >
          <div className="sticky top-0 isolate z-0 flex h-dvh max-h-dvh flex-col bg-[var(--background)] pt-16">
            <div className="mt-6 shrink-0 space-y-1 px-0 sm:pb-4">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Cara aku mendekati kerja
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Kartu pertama langsung di bawah. Scroll untuk menumpuk kartu berikutnya.
              </p>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
              {cards.map((card, index) => (
                <StackedCard
                  key={card.title}
                  card={card}
                  scrollYProgress={scrollYProgress}
                  index={index}
                  total={n}
                  vhPx={vhPx}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export function StackedScrollSection({
  cards = stackScrollCards,
}: {
  cards?: StackScrollCard[];
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) {
    return <StaticStackList cards={cards} />;
  }

  return <StackedScrollAnimated cards={cards} />;
}
