"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/project";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
} from "@/design-system/icons";

type WorkView = "grid" | "list";

export function WorkViewSwitcher({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<WorkView>("grid");

  return (
    <section aria-label="Daftar project" className="space-y-6 sm:space-y-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
          {projects.length} selected projects
        </p>

        <div
          className="inline-flex w-fit items-center rounded-2xl border border-zinc-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/70"
          role="group"
          aria-label="Pilih tampilan project"
        >
          <ViewButton
            active={view === "grid"}
            label="Grid view"
            onClick={() => setView("grid")}
            iconSrc="/icon/grid-01.svg"
          />
          <ViewButton
            active={view === "list"}
            label="List view"
            onClick={() => setView("list")}
            iconSrc="/icon/column-horizontal-01.svg"
          />
        </div>
      </div>

      {view === "grid" ? <GridView projects={projects} /> : <ListView projects={projects} />}
    </section>
  );
}

function ViewButton({
  active,
  label,
  onClick,
  iconSrc,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  iconSrc: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-[background-color,color,box-shadow,transform] duration-300 ease-out sm:h-10 sm:w-10 ${
        active
          ? "bg-zinc-950 text-white shadow-md shadow-zinc-950/10 dark:bg-zinc-50 dark:text-zinc-950 dark:shadow-black/20"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-50"
      }`}
    >
      <span
        className="h-4 w-4 bg-current transition-transform duration-300 ease-out"
        style={{
          WebkitMask: `url(${iconSrc}) center / contain no-repeat`,
          mask: `url(${iconSrc}) center / contain no-repeat`,
        }}
        aria-hidden
      />
    </button>
  );
}

function GridView({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {projects.map((project) => (
        <article key={project.slug} className="group">
          <Link
            href={`/work/${project.slug}`}
            aria-label={`Buka detail ${project.title}`}
            className="block overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-zinc-200/70 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/10 hover:ring-zinc-300/80 dark:bg-zinc-900 dark:ring-white/10 dark:hover:shadow-black/25 sm:rounded-3xl"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

function ListView({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {projects.map((project) => (
        <article key={project.slug} className="group">
          <Link
            href={`/work/${project.slug}`}
            className="grid h-44 grid-cols-[160px_minmax(0,1fr)] items-stretch overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/72 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900/72 dark:hover:border-white/20 dark:hover:shadow-black/25 sm:h-48 sm:grid-cols-[200px_minmax(0,1fr)] lg:h-52"
          >
            <div className="relative self-stretch bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(min-width: 640px) 200px, 160px"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4">
              <div className="min-w-0">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mb-2">
                  <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:bg-white/10 dark:text-zinc-400 sm:text-[11px]">
                    {project.category}
                  </span>
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="hidden text-xs font-medium text-zinc-400 sm:inline">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="line-clamp-1 text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl lg:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-5 text-zinc-600 dark:text-zinc-400 sm:mt-2 sm:text-base sm:leading-6">
                  {project.description}
                </p>
              </div>

              <div className="mt-3 flex min-w-0 items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50 sm:gap-3">
                <span>View case</span>
                <ChevronRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                {project.externalLink ? (
                  <span className="ml-auto hidden items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:flex">
                    Live
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
