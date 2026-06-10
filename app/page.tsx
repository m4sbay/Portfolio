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
import { ArrowRightIcon } from "@/design-system/icons";

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
    <div className="space-y-20">
      <section className="space-y-6">
        <div className="space-y-2">
          <AnimatedGreeting />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for collaborations
          </div>
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
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
