import type { Metadata } from "next";
import { LiquidGlass } from "@/components/liquid-glass/LiquidGlass";

export const metadata: Metadata = {
  title: "Liquid glass demo",
  description:
    "Demonstrasi lensing Liquid Glass dengan konten di belakang panel di atas gradient.",
  robots: { index: false, follow: false },
};

export default function LiquidGlassDemoPage() {
  return (
    <div className="relative -mx-4 min-h-[85svh] overflow-hidden sm:-mx-6 lg:-mx-8">
      {/* Lapisan scene: gradient + konten visual di BEHIND gelas */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#a78bfa,#60a5fa,#34d399,#fbbf24)] px-8 py-10 sm:px-12 md:px-16">
        <p className="max-w-xl text-xs font-semibold uppercase tracking-[0.2em] text-white/95">
          Behind the glass
        </p>
        <h2 className="mt-6 max-w-md text-balance text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-white drop-shadow-md">
          Teks ini sengaja di belakang area lensing — distorsi di tepi kartu baru kelihatan.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85">
          Kombinasi beberapa hue dan blok bentuk membantu efek pembengkokan seperti kaca lengkung
          pada latar yang kaya tekstur.
        </p>
        <div
          aria-hidden
          className="absolute bottom-[18%] left-[8%] h-36 w-36 rounded-4xl bg-white/25 ring-4 ring-white/20 ring-inset backdrop-blur-[2px]"
        />
        <div
          aria-hidden
          className="absolute top-[22%] right-[12%] h-24 w-24 rounded-full border-4 border-white/40 bg-white/15"
        />
        <div
          aria-hidden
          className="absolute bottom-[10%] right-[22%] h-48 w-20 rotate-12 rounded-xl bg-teal-300/35"
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[40%] w-[120%] max-w-none -translate-x-1/2 opacity-35"
          viewBox="0 0 1200 200"
          fill="none"
        >
          <path
            d="M0 100 Q 300 20 600 100 T 1200 100"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Kartu gelas di atas scene */}
      <div className="relative z-10 flex min-h-[85svh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <LiquidGlass className="w-full max-w-md px-8 py-10 shadow-lg">
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Liquid Glass</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
            Di Chromium, lensing utama dari{" "}
            <code className="text-xs opacity-90">
              backdrop-filter:&nbsp;url(#liquid-glass-filter)
            </code>{" "}
            + blur ringan frost; fallback Safari/Firefox memakai class{" "}
            <code className="text-xs opacity-90">.liquid-glass</code> di{" "}
            <code className="text-xs opacity-90">globals.css</code>.
          </p>
        </LiquidGlass>
      </div>
    </div>
  );
}
