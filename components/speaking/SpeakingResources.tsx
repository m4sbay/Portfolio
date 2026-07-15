import type { ComponentType, SVGProps } from "react";
import type { SpeakingResource } from "@/types/speaking";
import {
  ArrowUpRightIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  PresentationIcon,
  VideoIcon,
} from "@/design-system/icons";

type ResourceType = NonNullable<SpeakingResource["type"]>;

/** Peta type → ikon. Record memaksa exhaustive: tambah type di union = wajib tambah ikon di sini. */
const RESOURCE_ICONS: Record<ResourceType, ComponentType<SVGProps<SVGSVGElement>>> = {
  slides: PresentationIcon,
  website: GlobeIcon,
  repository: CodeIcon,
  video: VideoIcon,
  document: FileTextIcon,
  other: ExternalLinkIcon,
};

/** Label sekunder yang manusiawi per type. */
const RESOURCE_LABELS: Record<ResourceType, string> = {
  slides: "Slides",
  website: "Website",
  repository: "Repository",
  video: "Video",
  document: "Document",
  other: "Link",
};

/**
 * Section "Resources" khusus artikel Speaking: daftar tautan pelengkap (slide, repo, video, dst).
 * Dirender di paling bawah artikel, hanya bila `resources` ada isinya. Generic — menambah resource
 * cukup lewat data; ikon/label ditentukan otomatis dari `type` (default "other").
 */
export function SpeakingResources({ resources }: { resources: SpeakingResource[] }) {
  if (resources.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200/80 pt-10 dark:border-white/10">
      {/* Typography selaras Reading Design System (.reading h2): text-2xl semibold tracking-tight. */}
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Resources</h2>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {resources.map(resource => {
          const type = resource.type ?? "other";
          const Icon = RESOURCE_ICONS[type];

          return (
            <li key={resource.url}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-zinc-200/90 bg-white p-3.5 transition-[border-color,box-shadow] duration-200 hover:border-zinc-300 hover:shadow-sm hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors group-hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:group-hover:text-zinc-50">
                  <Icon className="size-5" aria-hidden />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-zinc-950 dark:text-zinc-50">
                    {resource.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {RESOURCE_LABELS[type]}
                  </span>
                </span>

                <ArrowUpRightIcon className="size-4 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
