import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectTag } from "./ProjectTag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-zinc-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
    >
      <div className="relative shrink-0 aspect-4/3 overflow-hidden bg-zinc-100 dark:bg-white/5">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
          priority={false}
        />
        <Image
          src={project.hoverImage.src}
          alt={project.hoverImage.alt}
          width={project.hoverImage.width}
          height={project.hoverImage.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
          priority={false}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {project.title}
          </h3>
        </div>
        <p className="mb-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </ul>
      </div>
    </Link>
  );
}

