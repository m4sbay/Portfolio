import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProjects, getPublishedProjectBySlug } from "@/data/projects";
import { ProjectTag } from "@/components/projects/ProjectTag";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { StickyGallery } from "@/components/projects/StickyGallery";
import { ArrowUpLeftIcon, ArrowUpRightIcon } from "@/design-system/icons";
import type { Metadata } from "next";
import type { ProjectBrandLink } from "@/types/project";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderBrandLinks(text: string, brandLinks: ProjectBrandLink[] | undefined, keyPrefix: string) {
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

function renderEmphasis(text: string, brandLinks: ProjectBrandLink[] | undefined) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return renderBrandLinks(part.slice(2, -2), brandLinks, `strong-${index}`);
    }

    return renderBrandLinks(part, brandLinks, `text-${index}`);
  });
}

function renderTextSections(text: string, brandLinks: ProjectBrandLink[] | undefined) {
  return text.split(/\n{2,}/).map((para, idx) => {
    const sectionHeading = para.match(/^\*\*([^*]+)\*\*$/);

    if (sectionHeading) {
      // Micro-label = bahasa UI/editorial, BUKAN heading Reading. `.not-reading`
      // menahan aturan tipografi h4 `.reading`; styling micro-label dipertahankan.
      return (
        <h4
          key={idx}
          className="not-reading pt-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-950 dark:text-zinc-50"
        >
          {sectionHeading[1]}
        </h4>
      );
    }

    // Body: tag semantik polos — tipografi (18/32, text-pretty, rhythm) dari `.reading`.
    return <p key={idx}>{renderEmphasis(para, brandLinks)}</p>;
  });
}

/** Slug di luar generateStaticParams (termasuk draft) → 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

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

/**
 * Grid section detail /work — sengaja DUA layout berbeda; angka fr bukan magic
 * number tapi keputusan identitas vs keterbacaan:
 *
 * - overviewSectionGrid (0.9fr/1.45fr, kolom teks ~386px): Overview = kesan
 *   pertama. Mempertahankan karakter case-study VISUAL-FIRST dengan galeri
 *   dominan (~622px). Teksnya ringkasan pendek → tidak butuh reading measure lebar.
 *
 * - narrativeSectionGrid (1.2fr/1fr, kolom teks ~544px ≈ 56ch): Process Design &
 *   Case Study = area BACA PANJANG. Kolom teks dilebarkan mendekati reading
 *   measure demi kenyamanan baca, dengan sengaja MENGORBANKAN sedikit lebar
 *   galeri (~458px). Trade-off tak terhindarkan: di dalam max-w-6xl, ~56ch
 *   side-by-side hanya mungkin dengan menyusutkan galeri. Cap `.reading` (68ch)
 *   tetap jadi plafon. Keduanya hanya berlaku lg+; di bawah lg tetap stack.
 */
const overviewSectionGrid =
  "grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.45fr)] lg:gap-20";
const narrativeSectionGrid =
  "grid grid-cols-1 items-start gap-12 border-t border-zinc-200 pt-10 dark:border-white/10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20";

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-20 pb-24 lg:gap-28">
      {/* Section 1: Project Overview */}
      <div className={overviewSectionGrid}>
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
            <div className="reading">
              {renderTextSections(project.longDescription, project.brandLinks)}
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
                : project.hoverImage
                  ? [project.image, project.hoverImage]
                  : [project.image]
            }
          />
        </section>
      </div>

      {/* Section 2: Process Sections (per-day design journey) */}
      {project.processSections && project.processSections.length > 0 && project.processSections.map((section, i) => (
        <div
          key={i}
          className={narrativeSectionGrid}
        >
          <div className="lg:sticky lg:top-24 space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Proses Desain</p>
              <h3 className="text-[38px] font-medium leading-[1.08] tracking-tight text-pretty text-zinc-900 dark:text-zinc-50">
                {section.title}
              </h3>
            </div>
            <div className="reading">
              {renderTextSections(section.description, project.brandLinks)}
            </div>
          </div>
          <StickyGallery images={section.gallery} />
        </div>
      ))}

      {/* Section 3: Case Study */}
      {project.caseStudy && (
        <div id="case-study" className={narrativeSectionGrid}>
          {/* Kolom 1: Sticky Case Study Info */}
          <div className="lg:sticky lg:top-24 space-y-7">
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Case Study</p>
                <h3 className="text-[38px] font-medium leading-[1.08] tracking-tight text-pretty text-zinc-900 dark:text-zinc-50">{project.caseStudy.title}</h3>
              </div>
            </div>

            <div className="reading">
              {renderTextSections(project.caseStudy.description, project.brandLinks)}
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
