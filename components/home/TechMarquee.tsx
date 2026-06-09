"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// Logo list — Simple Icons via jsDelivr CDN
// ─────────────────────────────────────────────
const techs = [
  { name: "Next.js",       slug: "nextdotjs" },
  { name: "TypeScript",    slug: "typescript" },
  { name: "React",         slug: "react" },
  { name: "Tailwind CSS",  slug: "tailwindcss" },
  { name: "Figma",         slug: "figma" },
  { name: "Framer Motion", slug: "framer" },
  { name: "Vercel",        slug: "vercel" },
  { name: "GitHub",        slug: "github" },
  { name: "Supabase",      slug: "supabase" },
  { name: "Node.js",       slug: "nodedotjs" },
  { name: "Premiere Pro",  slug: "adobepremierepro" },
  { name: "After Effects", slug: "adobeaftereffects" },
  { name: "VS Code",       slug: "visualstudiocode" },
  { name: "Notion",        slug: "notion" },
];

// Duplikat untuk efek marquee seamless tanpa jeda
const doubled = [...techs, ...techs];

// Kecepatan dalam px per frame (~60fps)
const SPEED_NORMAL = 0.5;
const SPEED_HOVER  = 0.12;

// Konfigurasi Mac Dock Magnification
const MAX_DISTANCE = 160; // radius efek gelombang dalam pixel
const MAX_SCALE = 1.75;   // besaran zoom maksimal (1.75x)

export function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const outerRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs  = useRef<(HTMLDivElement | null)[]>([]);
  
  const xRef         = useRef(0);
  const isHoveredRef = useRef(false);
  const mouseXRef    = useRef<number | null>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Lebar satu set (setengah track karena di-double)
    let halfWidth = track.scrollWidth / 2;

    function onResize() {
      halfWidth = track!.scrollWidth / 2;
    }
    window.addEventListener("resize", onResize);

    function tick() {
      // 1. Scroll Logic
      const speed = isHoveredRef.current ? SPEED_HOVER : SPEED_NORMAL;
      xRef.current -= speed;

      if (xRef.current <= -halfWidth) {
        xRef.current += halfWidth;
      }
      track!.style.transform = `translateX(${xRef.current}px)`;

      // 2. Mac Dock Magnification Logic (Menjaga Gap Konsisten)
      const mx = mouseXRef.current;
      const N = contentRefs.current.length;
      
      const scales = new Float32Array(N);
      const expansions = new Float32Array(N);
      let totalExp = 0;

      // Pass 1: Hitung scale dan expansion (besaran pelebaran) tiap logo
      for (let i = 0; i < N; i++) {
        const outerEl = outerRefs.current[i];
        if (!outerEl || mx === null) {
          scales[i] = 1;
          expansions[i] = 0;
          continue;
        }

        // Hitung jarak elemen dari posisi X mouse berdasarkan base posisinya
        const rect = outerEl.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mx - itemCenterX);

        if (distance < MAX_DISTANCE) {
          const progress = 1 - distance / MAX_DISTANCE;
          const easeProgress = Math.sin((progress * Math.PI) / 2);
          scales[i] = 1 + (MAX_SCALE - 1) * easeProgress;
        } else {
          scales[i] = 1;
        }
        
        // 32 adalah base width dari icon
        expansions[i] = 32 * (scales[i] - 1);
        totalExp += expansions[i];
      }

      // Pass 2: Hitung akumulasi dorongan (offset) agar gap tetap sama
      let leftSum = 0;
      for (let i = 0; i < N; i++) {
        const contentEl = contentRefs.current[i];
        if (!contentEl) continue;

        if (mx === null) {
          contentEl.style.transform = "translateX(0px) scale(1)";
          contentEl.style.zIndex = "1";
          continue;
        }

        // Jumlah ekspansi di kanan elemen ini
        const rightSum = totalExp - leftSum - expansions[i];
        
        // Elemen ditarik ke kanan oleh elemen di kirinya (leftSum)
        // Elemen ditarik ke kiri oleh elemen di kanannya (rightSum)
        const offset = leftSum / 2 - rightSum / 2;

        const scale = scales[i];
        contentEl.style.transform = `translateX(${offset}px) scale(${scale})`;
        
        if (scale > 1) {
          contentEl.style.zIndex = Math.round(10 + (scale - 1) * 10).toString();
        } else {
          contentEl.style.zIndex = "1";
        }

        // Tambahkan ekspansi elemen ini untuk elemen berikutnya
        leftSum += expansions[i];
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    isHoveredRef.current = true;
    mouseXRef.current = e.clientX;
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    mouseXRef.current = null;
  };

  return (
    <section
      aria-label="Tech stack dan tools yang dipakai"
      className="space-y-4"
    >
      {/* Section header */}
      <div className="space-y-1 text-center sm:text-left">
        <h2 className="text-[36px] font-bold tracking-tight leading-10 text-zinc-950 dark:text-zinc-50">
          Tools &amp; Stack
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-500">
          Teknologi yang aku pakai sehari-hari.
        </p>
      </div>

      {/* Marquee container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-50 w-20 bg-linear-to-r from-background to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-50 w-20 bg-linear-to-l from-background to-transparent"
          aria-hidden
        />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-end gap-6 pb-4 pt-12 will-change-transform"
          style={{ width: "max-content" }}
        >
          {doubled.map((tech, i) => (
            <LogoItem
              key={`${tech.slug}-${i}`}
              tech={tech}
              outerRef={(el) => {
                outerRefs.current[i] = el;
              }}
              contentRef={(el) => {
                contentRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Individual logo item
// ─────────────────────────────────────────────
function LogoItem({
  tech,
  outerRef,
  contentRef,
}: {
  tech: (typeof techs)[number];
  outerRef: (el: HTMLDivElement | null) => void;
  contentRef: (el: HTMLDivElement | null) => void;
}) {
  const src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.slug}.svg`;

  return (
    // Outer container: menyesuaikan lebar gambar
    <div
      ref={outerRef}
      className="tech-logo-container relative flex shrink-0 items-end justify-center py-2"
      title={tech.name}
    >
      {/* Inner content */}
      <div
        ref={contentRef}
        className="tech-logo-content flex origin-bottom will-change-transform"
        style={{ transition: "transform 0.1s linear" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={tech.name}
          width={32}
          height={32}
          className="tech-logo-img h-8 w-8 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
