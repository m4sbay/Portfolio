import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { COVER_ASPECT } from "@/lib/cover";
import { DoorAffordance } from "./DoorAffordance";

/**
 * Kartu sorotan /work — seragam, lebih menonjol dari kartu grid, di bawah hero.
 * Seluruh kartu adalah pintu ke halaman detail. Bahasa visual sama dgn hero (frame + plate).
 */
export function FeaturedCard({ project }: { project: Project }) {
  const plateMeta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`Buka detail ${project.title}`}
      className="group block outline-none"
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/70 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-zinc-950/10 group-focus-visible:ring-2 group-focus-visible:ring-zinc-950 dark:bg-zinc-900 dark:ring-white/10 dark:group-hover:shadow-black/25 dark:group-focus-visible:ring-zinc-50 sm:rounded-3xl">
        <div className={`relative ${COVER_ASPECT}`}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <DoorAffordance />
      </div>

      <div className="mt-3 min-w-0">
        <h3 className="truncate text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">{plateMeta}</p>
      </div>
    </Link>
  );
}
