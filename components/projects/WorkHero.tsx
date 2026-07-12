import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ArrowUpRightIcon } from "@/design-system/icons";
import { COVER_ASPECT } from "@/lib/cover";
import { DoorAffordance } from "./DoorAffordance";

const frameClass =
  "group relative block overflow-hidden rounded-3xl bg-zinc-950 outline-none ring-1 ring-zinc-200/70 transition-shadow duration-300 hover:shadow-xl hover:shadow-zinc-950/10 focus-visible:ring-2 focus-visible:ring-zinc-950 dark:ring-white/10 dark:hover:shadow-black/25 dark:focus-visible:ring-zinc-50";

/**
 * Hero /work — satu karya terbaik dalam bingkai sinematik terlebar di halaman.
 * Momen wow tunggal di awal; sisa halaman lalu jadi katalog yang efisien.
 * Link membungkus HANYA frame gambar — plate & link eksternal di luarnya (hindari anchor bersarang).
 */
export function WorkHero({ project }: { project: Project }) {
  const href = `/work/${project.slug}`;
  const plateMeta = [project.category, project.year].filter(Boolean).join(" · ");

  return (
    <section aria-labelledby="work-hero-title">
      <Link href={href} aria-label={`Buka detail ${project.title}`} className={frameClass}>
        <div className={`relative ${COVER_ASPECT} bg-zinc-100 dark:bg-zinc-900`}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
            sizes="(min-width: 1152px) 1120px, 100vw"
          />
        </div>
        <DoorAffordance />
      </Link>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mt-7">
        <div className="min-w-0">
          <h2
            id="work-hero-title"
            className="truncate text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-xl"
          >
            {project.title}
          </h2>
          <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">{plateMeta}</p>
        </div>
        {project.externalLink ? (
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
          >
            {project.externalLinkLabel ?? "Lihat live"}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
