import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { HeroWidgetsClient } from "@/components/home/widgets/HeroWidgetsClient";
import { TechMarquee } from "@/components/home/TechMarquee";

export const metadata: Metadata = {
  title: site.title,
  description:
    "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
  openGraph: {
    title: site.title,
    description:
      "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description:
      "Frontend Developer, UI/UX Designer, dan Digital Content Creator. Portfolio dan selected work Masbay.",
  },
};

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for collaborations
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Drag widgets (desktop)
          </div>
        </div>

        <HeroWidgetsClient projects={projects} />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Selected work
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Beberapa project terbaru yang lagi aku bangun dan eksplor.
            </p>
          </div>
        </div>

        <ProjectsGrid projects={projects} />
      </section>

      <TechMarquee />
    </div>
  );
}
