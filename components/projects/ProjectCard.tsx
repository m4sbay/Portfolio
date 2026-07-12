"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/types/project";
import { getDisplayTags } from "@/lib/project-tags";
import { COVER_ASPECT } from "@/lib/cover";
import { ProjectTag } from "./ProjectTag";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || !card.matches(":hover")) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  const initial = project.title.charAt(0).toUpperCase();

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="
        group flex h-full flex-col
        rounded-2xl overflow-hidden isolate
        border border-zinc-200 bg-white shadow-sm
        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:shadow-xl
        dark:border-white/10 dark:bg-white/5
        will-change-transform
      "
      style={{
        WebkitMaskImage: "radial-gradient(white, black)",
        maskImage: "radial-gradient(white, black)",
      }}
    >
      {/* IMAGE */}
      <div className={`relative ${COVER_ASPECT} overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900`}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="
            object-cover
            transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:scale-105
          "
        />

        {/* GLASS BASE (SAFE, NO LEAK) */}
        <div
          className="
            absolute inset-0 rounded-2xl
            opacity-0 group-hover:opacity-100
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

            bg-white/10
            backdrop-blur-md
            backdrop-saturate-150

            dark:bg-black/20
          "
        />

        {/* GRADIENT GLASS LIGHT */}
        <div
          className="
            absolute inset-0 rounded-2xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-700

            bg-gradient-to-br
            from-white/30 via-white/10 to-transparent
          "
        />

        {/* SPECULAR HIGHLIGHT */}
        <div
          className="
            pointer-events-none absolute inset-0 rounded-2xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        </div>

        {/* OVERLAY CONTENT */}
        <div
          className="
            absolute inset-0 rounded-2xl
            flex flex-col items-center justify-center gap-3

            opacity-0 scale-95 translate-y-4
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:opacity-100
            group-hover:scale-100
            group-hover:translate-y-0
          "
        >
          <div className="flex flex-col items-center gap-2">
            {project.logo ? (
              <div
                className="
                  flex items-center justify-center
                  rounded-[12px] bg-white p-2
                  shadow-sm ring-1 ring-zinc-200/90
                  dark:bg-white dark:ring-zinc-300/80
                "
              >
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={72}
                  height={72}
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold text-white backdrop-blur-sm ring-1 ring-white/30">
                {initial}
              </div>
            )}

            <span className="text-xs font-medium text-white/70 tracking-wide">
              View project
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 min-h-[180px]">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {project.title}
        </h3>

        <p className="mt-1 mb-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300 line-clamp-3">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {getDisplayTags(project.tags).map((tag) => (
            <ProjectTag key={tag} tag={tag} className="grow justify-center" />
          ))}
        </ul>
      </div>
    </Link>
  );
}