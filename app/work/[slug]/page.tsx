import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectTag } from "@/components/projects/ProjectTag";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { StickyGallery } from "@/components/projects/StickyGallery";
import { ArrowUpLeftIcon, ArrowUpRightIcon } from "@/design-system/icons";
import type { Metadata } from "next";

const brandLinksByProject: Record<
  string,
  {
    label: string;
    href: string;
  }[]
> = {
  "notion-auto-status": [
    { label: "@notionhq/client", href: "https://www.npmjs.com/package/@notionhq/client" },
    { label: "GitHub Actions", href: "https://github.com/features/actions" },
    { label: "Notion API", href: "https://developers.notion.com/" },
    { label: "Nodemailer", href: "https://nodemailer.com/" },
    { label: "node-cron", href: "https://www.npmjs.com/package/node-cron" },
    { label: "Node.js", href: "https://nodejs.org/" },
    { label: "dotenv", href: "https://www.npmjs.com/package/dotenv" },
    { label: "Gmail", href: "https://www.google.com/gmail/about/" },
    { label: "Notion", href: "https://www.notion.com/" },
  ],
  video_vokasi: [
    { label: "Fakultas Vokasi ITP", href: "https://itp.ac.id/fakultas-vokasi" },
    { label: "Institut Teknologi Padang", href: "https://itp.ac.id/" },
    { label: "ITP", href: "https://itp.ac.id/" },
  ],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderBrandLinks(text: string, projectSlug: string, keyPrefix: string) {
  const brandLinks = brandLinksByProject[projectSlug];

  if (!brandLinks?.length) return text;

  const pattern = new RegExp(
    `(${brandLinks.map(({ label }) => escapeRegExp(label)).join("|")})`,
    "g"
  );

  return text.split(pattern).map((part, index) => {
    const brand = brandLinks.find(({ label }) => label === part);

    if (!brand) return part;

    return (
      <a
        key={`${keyPrefix}-${brand.label}-${index}`}
        href={brand.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-950 dark:text-zinc-50 dark:decoration-zinc-500 dark:hover:text-white dark:hover:decoration-zinc-50"
      >
        {part}
      </a>
    );
  });
}

function renderEmphasis(text: string, projectSlug: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return renderBrandLinks(part.slice(2, -2), projectSlug, `strong-${index}`);
    }

    return renderBrandLinks(part, projectSlug, `text-${index}`);
  });
}

function renderTextSections(text: string, projectSlug: string) {
  return text.split(/\n{2,}/).map((para, idx) => {
    const sectionHeading = para.match(/^\*\*([^*]+)\*\*$/);

    if (sectionHeading) {
      return (
        <h4
          key={idx}
          className="pt-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-50"
        >
          {sectionHeading[1]}
        </h4>
      );
    }

    return (
      <p key={idx} className="text-pretty">
        {renderEmphasis(para, projectSlug)}
      </p>
    );
  });
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

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

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-20 pb-24 lg:gap-28">
      {/* Section 1: Project Overview */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.45fr)] lg:gap-20">
        {/* Kolom 1: Sticky Info */}
        <div className="lg:sticky lg:top-24 space-y-7">
          <div>
            <Link href="/" className="group mb-7 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
              <ArrowUpLeftIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
              Kembali
            </Link>

            <div className="space-y-5">
              {/* Logo Project (Opsional) */}
              {project.logo && (
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 dark:bg-white/5">
                  <Image src={project.logo} alt={`${project.title} logo`} width={32} height={32} className="object-contain" />
                </div>
              )}

              {/* Nama Project & Headline */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{project.title}</p>
                <h1 className="text-[38px] font-medium leading-[1.08] tracking-tight text-pretty text-zinc-900 dark:text-zinc-50">{project.description}</h1>
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
                <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>

          {/* Long Description */}
          <section className="space-y-4 border-t border-zinc-200/80 pt-6 dark:border-white/10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Overview
            </h2>
            <div className="space-y-5 text-base leading-7 tracking-normal text-zinc-600 dark:text-zinc-400">
              {renderTextSections(project.longDescription, project.slug)}
            </div>
          </section>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Stack
            </h2>
            <ul className="flex flex-wrap gap-2 pt-1">
              {project.tags.map(tag => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </ul>
          </div>
        </div>

        {/* Kolom 2: Scrollable Images */}
        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-[38px] font-medium leading-[1.08] tracking-tight text-zinc-900 dark:text-zinc-50">
              Visual preview
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Beberapa tampilan utama untuk memberi konteks cara project ini bekerja.
            </p>
          </div>
          <StickyGallery
            images={
              project.gallery && project.gallery.length > 0
                ? project.gallery
                : [project.image, project.hoverImage]
            }
          />
        </section>
      </div>

      {/* Section 2: Case Study */}
      {project.caseStudy && (
        <div id="case-study" className="grid grid-cols-1 items-start gap-12 border-t border-zinc-200 pt-10 dark:border-white/10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.45fr)] lg:gap-20">
          {/* Kolom 1: Sticky Case Study Info */}
          <div className="lg:sticky lg:top-24 space-y-7">
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Case Study</p>
                <h3 className="text-[38px] font-medium leading-[1.08] tracking-tight text-pretty text-zinc-900 dark:text-zinc-50">{project.caseStudy.title}</h3>
              </div>
            </div>

            <div className="space-y-5 text-base leading-7 tracking-normal text-zinc-600 dark:text-zinc-400">
              {renderTextSections(project.caseStudy.description, project.slug)}
            </div>
          </div>

          {project.caseStudy.gallery.length > 0 && (
            <StickyGallery images={project.caseStudy.gallery} />
          )}
        </div>
      )}
    </div>
  );
}
