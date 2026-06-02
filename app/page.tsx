import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";
import { HeroWidgetsClient } from "@/components/home/widgets/HeroWidgetsClient";
import { TechMarquee } from "@/components/home/TechMarquee";
import { StackedScrollSection } from "@/components/home/StackedScrollSection";
import { AnimatedGreeting } from "@/components/home/AnimatedGreeting";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";

export const metadata: Metadata = {
  title: site.title,
  description: "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
  openGraph: {
    title: site.title,
    description: "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
  },
};

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="space-y-2">
          <AnimatedGreeting />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for collaborations
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Drag widgets (desktop)</div>
        </div>

        <HeroWidgetsClient projects={projects} />
      </section>

      <SelectedWork projects={projects} />

      <TechMarquee />

      <StackedScrollSection />

      <TestimonialsMarquee />

      <div className="flex grow items-center justify-center py-20">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-zinc-50 dark:text-zinc-950"
        >
          Mulai kerja sama
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
