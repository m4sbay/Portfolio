"use client";

import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import type { Project, ProjectCategory, ProjectCategoryFilter } from "@/types/project";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

/**
 * Grid katalog "All Projects" — filter kategori + grid seluruh project published.
 * Inti sama dengan SelectedWork (home), tanpa heading marketing — di sini header halaman
 * dan judul section sudah ditangani app/work/page.tsx.
 */
export function WorkGallery({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");

  const counts = useMemo(() => {
    const map: Partial<Record<ProjectCategory, number>> = {};
    for (const p of projects) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        <ProjectsFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />

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
                <span className="mb-2 text-3xl">🫙</span>
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
      </div>
    </LazyMotion>
  );
}
