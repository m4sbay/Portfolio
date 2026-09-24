import Image from "next/image";
import Link from "next/link";
import { COVER_ASPECT } from "@/lib/cover";
import type { Project } from "@/types/project";

export function ProjectRecommendations({
  projects,
}: {
  projects: readonly (Pick<Project, "slug" | "title"> & Partial<Pick<Project, "image">>)[];
}) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="project-recommendations-heading" className="space-y-6 border-t border-zinc-200 pt-10 dark:border-white/10">
      <h2 id="project-recommendations-heading" className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
        Project lainnya
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4">
        {projects.map(project => (
          <li key={project.slug} className="min-w-0">
            <Link
              href={`/work/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 motion-reduce:transition-none dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:border-white/20 dark:hover:bg-white/10 dark:focus-visible:bg-white/10 dark:focus-visible:outline-white"
            >
              <div className={`relative ${COVER_ASPECT} overflow-hidden border-b border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900`}>
                {project.image?.src?.trim() ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt || `Cover project ${project.title}`}
                    fill
                    sizes="(min-width: 1152px) 534px, (min-width: 1024px) calc((100vw - 80px) / 2), (min-width: 640px) calc((100vw - 64px) / 2), calc((100vw - 44px) / 2)"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-3xl font-medium text-zinc-400 dark:text-zinc-600 sm:text-5xl">
                    {project.title.trim().charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="min-w-0 flex-1 p-3 text-sm font-medium leading-6 wrap-anywhere sm:p-5 sm:text-base">
                {project.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
