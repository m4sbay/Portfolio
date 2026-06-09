"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);


function Avatar({ name, image }: { name: string; image: string }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (errored) {
    return (
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[8px] font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 sm:h-10 sm:w-10 sm:text-xs">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setErrored(true)}
      className="h-5 w-5 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
    />
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="w-44 shrink-0 rounded-lg border border-zinc-200 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:w-72 sm:rounded-2xl sm:p-5">
      <p className="mb-2 text-[10px] leading-4 text-zinc-600 dark:text-zinc-400 sm:mb-4 sm:text-sm sm:leading-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <Avatar name={testimonial.name} image={testimonial.image} />
        <div>
          <p className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100 sm:text-sm">
            {testimonial.name}
          </p>
          <p className="text-[8px] text-zinc-500 dark:text-zinc-500 sm:text-xs">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: (typeof testimonials)[number][];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="group overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={[
          "flex gap-2 sm:gap-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
        ].join(" ")}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section aria-labelledby="testimonials-title" className="space-y-4">
      <header className="space-y-1 text-center sm:text-left">
        <h2
          id="testimonials-title"
          className="text-[36px] font-bold tracking-tight leading-10 text-zinc-950 dark:text-zinc-50"
        >
          Kata Mereka Yang Pernah Kerja Sama
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-500">
          Dari klien freelance, pembeli template, sampai sesama kreator yang pernah berkolaborasi.
        </p>
      </header>

      <div className="space-y-2 sm:space-y-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

    </section>
  );
}
