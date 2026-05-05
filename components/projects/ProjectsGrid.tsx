"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => (
            <m.div
              key={project.slug}
              layout
              className="flex h-full flex-col will-change-transform transform-gpu"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: idx * 0.04,
              }}
            >
              <ProjectCard project={project} />
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}

