"use client";

import type { StackScrollCard } from "@/data/stack-scroll-cards";
import { stackScrollCards } from "@/data/stack-scroll-cards";

export function StackedScrollSection({
  cards = stackScrollCards,
}: {
  cards?: StackScrollCard[];
}) {
  return (
    <section
      aria-label="Nilai dan cara kerja"
      className="w-full bg-[var(--background)] py-16"
    >
      <div className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Cara aku mendekati kerja
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-500">
            Scroll untuk melihat selengkapnya.
          </p>
        </header>
        <ul className="flex w-full flex-col gap-4">
          {cards.map((c) => (
            <li
              key={c.title}
              className="flex w-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {c.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
