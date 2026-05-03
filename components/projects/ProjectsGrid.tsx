"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <m.div
            key={project.slug}
            layout={false}
            className="flex h-full flex-col will-change-transform transform-gpu"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
          >
            <ProjectCard project={project} />
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}

