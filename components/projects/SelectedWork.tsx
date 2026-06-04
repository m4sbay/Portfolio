"use client";

import { useState, useMemo } from "react";
import type { Project, ProjectCategory } from "@/types/project";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const counts = useMemo(() => {
    const map: Partial<Record<ProjectCategory, number>> = {};
    for (const p of projects) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <LazyMotion features={domAnimation}>
      <section id="work" className="scroll-mt-24 space-y-8">
        {/* Header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Selected <span className="block sm:inline"> Project,</span>{" "}
              <span className="block sm:inline">Work</span>
            </h2>
            <p className="w-fit text-right text-base text-zinc-600 dark:text-zinc-500">
              <span className="block sm:inline">Beberapa project yang lagi</span>{" "}
              <span className="block sm:inline">aku bangun dan eksplor.</span>
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <ProjectsFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />

        {/* Grid */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait" initial={false}>
            {filtered.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-20 text-zinc-400 dark:text-zinc-600"
              >
                <span className="text-3xl mb-2">🫙</span>
                <p className="text-sm">Belum ada project di kategori ini.</p>
              </m.div>
            ) : (
              <m.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ProjectsGrid projects={filtered} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </LazyMotion>
  );
}
