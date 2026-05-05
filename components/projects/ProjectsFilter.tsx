"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import type { ProjectCategory } from "@/types/project";

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "All" },
  { label: "Design", value: "Design" },
  { label: "Website", value: "Website" },
  { label: "Tools", value: "Tools" },
  { label: "Video", value: "Video" },
  { label: "App", value: "App" },
];

interface ProjectsFilterProps {
  active: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
  counts: Partial<Record<ProjectCategory, number>>;
}

export function ProjectsFilter({ active, onChange, counts }: ProjectsFilterProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.value;
          const count = cat.value === "All"
            ? Object.values(counts).reduce((a, b) => a + (b ?? 0), 0)
            : counts[cat.value] ?? 0;

          // Hide categories with no projects (except "All")
          if (cat.value !== "All" && count === 0) return null;

          return (
            <m.button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.value)}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={[
                "relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                isActive
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-zinc-100",
              ].join(" ")}
            >
              {isActive && (
                <m.span
                  layoutId="filter-pill-bg"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={[
                  "relative z-10 tabular-nums",
                  isActive
                    ? "text-white/60 dark:text-zinc-900/60"
                    : "text-zinc-400 dark:text-zinc-500",
                ].join(" ")}
              >
                {count}
              </span>
            </m.button>
          );
        })}
      </div>
    </LazyMotion>
  );
}
