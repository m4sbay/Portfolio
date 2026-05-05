import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectTag } from "@/components/projects/ProjectTag";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  const title = project.title;
  const description = project.description;
  const url = `/work/${project.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: project.image.src,
          width: project.image.width,
          height: project.image.height,
          alt: project.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image.src],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-24 lg:gap-32 pb-24">
      {/* Section 1: Project Overview */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
      {/* Kolom 1: Sticky Info */}
      <div className="sticky top-24 space-y-8">
        <div>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <span aria-hidden>←</span>
            Kembali
          </Link>

          <div className="space-y-4">
            {/* Logo Project (Opsional) */}
            {project.logo && (
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 dark:bg-white/5">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            )}

            {/* Nama Project & Headline */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {project.title}
              </h2>
              <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl lg:leading-tight">
                {project.description}
              </h1>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {project.caseStudy && (
            <ScrollToButton
              targetId="case-study"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Read Case Study
            </ScrollToButton>
          )}
          {!project.caseStudy && project.caseStudyHref && (
            <Link
              href={project.caseStudyHref}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Read Case Study
            </Link>
          )}
          
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-transparent px-4 text-[11px] font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/5"
            >
              {project.externalLinkLabel || "Visit Project"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          )}
        </div>

        {/* Long Description */}
        <div className="prose prose-zinc max-w-none text-sm text-zinc-600 dark:prose-invert dark:text-zinc-400">
          {project.longDescription.split("\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <ul className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </ul>
      </div>

      {/* Kolom 2: Scrollable Images */}
      <div className="space-y-6 lg:space-y-8">
        {project.gallery && project.gallery.length > 0 ? (
          project.gallery.map((img, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority={idx === 0}
              />
            </div>
          ))
        ) : (
          /* Fallback: Tampilkan cover image & hover image jika gallery belum diisi */
          <>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
              <Image
                src={project.hoverImage.src}
                alt={project.hoverImage.alt}
                width={project.hoverImage.width}
                height={project.hoverImage.height}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </>
        )}
      </div>
      </div>

      {/* Section 2: Case Study */}
      {project.caseStudy && (
        <div id="case-study" className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20 pt-8 border-t border-zinc-200 dark:border-white/10">
          {/* Kolom 1: Sticky Case Study Info */}
          <div className="sticky top-24 space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Case Study
                </h2>
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl lg:leading-tight">
                  {project.caseStudy.title}
                </h3>
              </div>
            </div>
            
            <div className="prose prose-zinc max-w-none text-sm text-zinc-600 dark:prose-invert dark:text-zinc-400">
              {project.caseStudy.description.split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Kolom 2: Scrollable Case Study Images */}
          <div className="space-y-6 lg:space-y-8">
            {project.caseStudy.gallery.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

