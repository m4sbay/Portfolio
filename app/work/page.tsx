import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@/design-system/icons";
import { WorkHero } from "@/components/projects/WorkHero";
import { FeaturedCard } from "@/components/projects/FeaturedCard";
import { WorkGallery } from "@/components/projects/WorkGallery";
import { getFeaturedWork } from "@/data/work-featured";
import { getPublishedProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work — ${site.title}`,
  description: "Galeri karya, project, dan eksperimen digital Masbay.",
  openGraph: {
    title: `Work — ${site.title}`,
    description: "Galeri karya, project, dan eksperimen digital Masbay.",
    url: "/work",
  },
};

/**
 * /work — galeri karya (proof of work): header ringkas → hero sinematik →
 * kartu featured → grid semua project (filter kategori) → CTA kontak.
 * Featured hanyalah sorotan; grid menampung SEMUA project published.
 * Halaman ini murni komposisi/data glue.
 */
export default async function WorkPage() {
  const { header, hero, featured, cta } = await getFeaturedWork();
  const projects = await getPublishedProjects();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Header ringkas — identitas singkat, cepat masuk ke karya */}
      <header className="pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          {header.eyebrow}
        </p>
        <h1 className="mt-3 text-[40px] font-semibold leading-none tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
          {header.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">{header.intro}</p>
      </header>

      {/* Hero — satu momen sinematik */}
      <WorkHero project={hero} />

      {/* Featured — kartu sorotan seragam */}
      {featured.length > 0 ? (
        <section aria-labelledby="work-featured-heading" className="space-y-6">
          <h2
            id="work-featured-heading"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
          >
            Featured
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(project => (
              <FeaturedCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      {/* All Projects — katalog seluruh karya published */}
      <section aria-labelledby="work-all-heading" className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="work-all-heading"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
          >
            All Projects
          </h2>
          <p className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-600">
            {projects.length}
          </p>
        </div>
        <WorkGallery projects={projects} />
      </section>

      {/* Contact CTA — satu ajakan tenang */}
      <section className="flex flex-col items-center gap-6 py-10 text-center">
        <p className="max-w-md text-base text-zinc-600 dark:text-zinc-400">
          Punya project yang ingin dikerjakan bareng?
        </p>
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-50 dark:hover:border-white/20 dark:hover:bg-white/5"
        >
          {cta.label}
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
