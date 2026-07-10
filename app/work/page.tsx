import type { Metadata } from "next";
import { WorkViewSwitcher } from "@/components/projects/WorkViewSwitcher";
import { getPublishedProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work — ${site.title}`,
  description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
  openGraph: {
    title: `Work — ${site.title}`,
    description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
    url: "/work",
  },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="py-12 lg:ml-[calc((100%_-_48rem)/2_+_2rem)]">
      <header className="mb-10 max-w-3xl space-y-3 sm:mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
          Portfolio
        </p>
        <h1 className="text-[38px] font-semibold uppercase leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          All works
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Kumpulan project, eksperimen, dan karya digital yang bisa dilihat dalam mode grid atau list.
        </p>
      </header>

      <WorkViewSwitcher projects={projects} />
    </div>
  );
}
