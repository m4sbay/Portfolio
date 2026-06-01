"use client";

import { ArrowUpRightIcon } from "@/design-system/icons";
import type { PerItemRate } from "@/types/rate-card";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

function formatRange(min: number, max: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
  return `${fmt(min)} – ${fmt(max)}`;
}

const pastelAccents = [
  {
    bar: "bg-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    title: "text-rose-700 dark:text-rose-300",
    desc: "text-rose-500 dark:text-rose-400",
    badge: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
  },
  {
    bar: "bg-pink-400",
    bg: "bg-pink-50 dark:bg-pink-500/10",
    title: "text-pink-700 dark:text-pink-300",
    desc: "text-pink-500 dark:text-pink-400",
    badge: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
  },
  {
    bar: "bg-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    title: "text-violet-700 dark:text-violet-300",
    desc: "text-violet-500 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  },
  {
    bar: "bg-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    title: "text-blue-700 dark:text-blue-300",
    desc: "text-blue-500 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  },
  {
    bar: "bg-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    title: "text-emerald-700 dark:text-emerald-300",
    desc: "text-emerald-500 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  {
    bar: "bg-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    title: "text-amber-700 dark:text-amber-300",
    desc: "text-amber-500 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
  },
];

function RateCard({ accent, rate }: { accent: (typeof pastelAccents)[number]; rate: PerItemRate }) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
          Per konten
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
          Desain
        </p>
      </div>

      <div className="mb-3 border-t border-dashed border-zinc-200 dark:border-white/10" />

      <div className={`flex gap-3 rounded-xl p-3 ${accent.bg}`}>
        <div className={`w-1 shrink-0 self-stretch rounded-full ${accent.bar}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold leading-snug ${accent.title}`}>
              {rate.name}
            </p>
            <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${accent.badge}`}>
              {formatRange(rate.priceMin, rate.priceMax)}
            </span>
          </div>
          <p className={`mt-0.5 text-xs leading-5 ${accent.desc}`}>
            {rate.description}
          </p>
        </div>
      </div>
    </>
  );
}

type PerItemRatesIntro = {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
};

export function PerItemRates({ intro, rates }: { intro: PerItemRatesIntro; rates: PerItemRate[] }) {
  const mobileStackRef = useRef<HTMLDivElement | null>(null);
  const mobileStageRef = useRef<HTMLDivElement | null>(null);
  const mobileHeaderRef = useRef<HTMLDivElement | null>(null);
  const mobileCardsWrapRef = useRef<HTMLUListElement | null>(null);
  const mobileCardsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const stack = mobileStackRef.current;
    const stage = mobileStageRef.current;
    const header = mobileHeaderRef.current;
    const cardsWrap = mobileCardsWrapRef.current;
    const cards = mobileCardsRef.current.filter(Boolean) as HTMLLIElement[];
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    if (!stack || !stage || !header || !cardsWrap || cards.length === 0) {
      return;
    }

    let animationFrame = 0;
    let stackTop = 0;
    let cardStride = 0;
    let stackScrollDistance = 0;

    const updateCards = () => {
      animationFrame = 0;

      if (!mediaQuery.matches) {
        return;
      }

      const rect = stack.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top + stackTop, 0), stackScrollDistance);

      cards.forEach((card, i) => {
        const y = Math.max(0, i * cardStride - progress);

        card.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateCards);
      }
    };

    const measure = () => {
      if (!mediaQuery.matches) {
        stack.style.removeProperty("height");
        stage.style.removeProperty("height");
        stage.style.removeProperty("top");
        header.style.removeProperty("transform");
        cardsWrap.style.removeProperty("height");
        cards.forEach((card) => {
          card.style.removeProperty("height");
          card.style.removeProperty("transform");
        });
        return;
      }

      const headerHeight = header.offsetHeight;
      cards.forEach((card) => {
        card.style.removeProperty("height");
      });
      const cardHeight = Math.max(...cards.map((card) => card.offsetHeight));
      const cardGap = 12;
      cardStride = cardHeight + cardGap;
      stackScrollDistance = cardStride * Math.max(cards.length - 1, 0);
      const stageHeight = headerHeight + 16 + cardHeight;
      stackTop = 100;

      stage.style.height = `${stageHeight}px`;
      stage.style.top = `${stackTop}px`;
      cardsWrap.style.height = `${cardHeight}px`;
      stack.style.height = `${stageHeight + stackScrollDistance}px`;
      cards.forEach((card) => {
        card.style.height = `${cardHeight}px`;
      });

      requestUpdate();
    };

    measure();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    mediaQuery.addEventListener("change", measure);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      mediaQuery.removeEventListener("change", measure);
    };
  }, [rates.length]);

  return (
    <section aria-label="Harga satuan" className="space-y-4">
      <div className="hidden space-y-1 sm:block">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
          Per Konten
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Harga satuan
        </h2>
      </div>

      <ul className="hidden gap-3 sm:grid sm:grid-cols-2">
        {rates.map((rate, i) => {
          const accent = pastelAccents[i % pastelAccents.length];

          return (
            <li
              key={rate.name}
              className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4 dark:border-white/15 dark:bg-zinc-900"
            >
              <RateCard accent={accent} rate={rate} />
            </li>
          );
        })}
      </ul>

      <div ref={mobileStackRef} className="relative sm:hidden">
        <div ref={mobileStageRef} className="sticky overflow-visible">
          <div ref={mobileHeaderRef} className="relative z-10 space-y-1">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                {intro.eyebrow}
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {intro.title}
              </h1>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {intro.description}
              </p>
              <a
                href={intro.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {intro.ctaLabel}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-1 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Per Konten
              </p>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Harga satuan
              </h2>
            </div>
          </div>
          <ul ref={mobileCardsWrapRef} className="relative mt-4">
            {rates.map((rate, i) => {
              const accent = pastelAccents[i % pastelAccents.length];
              const cardStyle = {
                zIndex: i + 1,
              } as CSSProperties;

              return (
                <li
                  key={rate.name}
                  ref={(node) => {
                    mobileCardsRef.current[i] = node;
                  }}
                  style={cardStyle}
                  className="absolute inset-x-0 rounded-2xl border border-dashed border-zinc-300 bg-white p-4 shadow-sm will-change-transform dark:border-white/15 dark:bg-zinc-900"
                >
                  <RateCard accent={accent} rate={rate} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
