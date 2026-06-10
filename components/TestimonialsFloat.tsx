"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";



// 3 columns — cards within each column consistently spaced,
// but each column starts at a different vertical offset (berantakan antar kolom)
const COLUMNS = [
  { indices: [0, 3, 6, 9], dur: "22s", delay: "-4s"  },
  { indices: [1, 4, 7],    dur: "28s", delay: "-13s" },
  { indices: [2, 5, 8],    dur: "19s", delay: "-6s"  },
];

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
      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[7px] font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 sm:h-8 sm:w-8 sm:text-[10px]">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setErrored(true)}
      className="h-4 w-4 shrink-0 rounded-full object-cover sm:h-8 sm:w-8"
    />
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    // mb-3 instead of gap on the parent so both halves have equal height → seamless loop
    <div className="mb-3 rounded-lg border border-zinc-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900 sm:mb-5 sm:rounded-xl sm:p-3.5">
      <p className="mb-1.5 text-[9px] leading-[14px] text-zinc-600 dark:text-zinc-400 sm:mb-3 sm:text-xs sm:leading-5">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-1 sm:gap-2">
        <Avatar name={t.name} image={t.image} />
        <div>
          <p className="text-[8px] font-semibold text-zinc-900 dark:text-zinc-100 sm:text-[10px]">{t.name}</p>
          <p className="text-[7px] text-zinc-500 sm:text-[9px]">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function FloatColumn({ indices, dur, delay }: (typeof COLUMNS)[number]) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = indices.map((i) => testimonials[i]);
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      // half the scrollHeight = exact height of one set → pixel-perfect seamless loop
      track.style.setProperty("--marquee-y", `-${track.scrollHeight / 2}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <div
        ref={trackRef}
        className="will-change-transform"
        style={{
          animation: `marquee-vertical ${dur} linear infinite`,
          animationDelay: delay,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsFloat() {
  return (
    <section aria-labelledby="testimonials-float-title" className="space-y-6">
      <SectionHeader
        titleId="testimonials-float-title"
        title="Kata Mereka Yang Pernah Kerja Sama"
        description="Dari klien freelance, pembeli template, sampai sesama kreator yang pernah berkolaborasi."
        descriptionClassName="text-sm text-zinc-500 dark:text-zinc-400"
      />

      <div
        className="h-[280px] overflow-hidden sm:h-[460px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        }}
      >
        {/* gap-5 = 20px — sama dengan mb-5 antar card */}
        <div className="flex h-full gap-2 sm:gap-5">
          {COLUMNS.map((col, i) => (
            <FloatColumn key={i} {...col} />
          ))}
        </div>
      </div>

    </section>
  );
}
