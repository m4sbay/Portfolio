import type { Metadata } from "next";
import { Fragment } from "react";
import { ExhibitionArrival } from "@/components/projects/exhibition/ExhibitionArrival";
import { ExhibitionChapter } from "@/components/projects/exhibition/ExhibitionChapter";
import { ExhibitionCorridor } from "@/components/projects/exhibition/ExhibitionCorridor";
import { ExhibitionExit } from "@/components/projects/exhibition/ExhibitionExit";
import { exhibitionRoute } from "@/content/work/exhibition";
import { chapterNumeral, getExhibitionChapters } from "@/data/exhibition";
import { hasDraftProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work — ${site.title}`,
  description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
  openGraph: {
    title: `Work — ${site.title}`,
    description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
    url: "/work",
  },
};

/**
 * Exhibition Route — rute pameran empat bab.
 * Spec: docs/superpowers/specs/2026-07-10-work-exhibition-route-*.md
 * Halaman ini murni komposisi; struktur (server) memikul cerita, motion menyusul sebagai lapisan.
 */
export default async function WorkPage() {
  const chapters = await getExhibitionChapters();
  const hasDraft = await hasDraftProjects();
  const total = chapters.length;

  return (
    <div>
      <ExhibitionArrival
        eyebrow={exhibitionRoute.arrival.eyebrow}
        title={exhibitionRoute.arrival.title}
        chapters={exhibitionRoute.chapters}
      />

      {chapters.map((vm, i) => {
        const next = chapters[i + 1];
        return (
          <Fragment key={vm.project.slug}>
            <ExhibitionChapter vm={vm} total={total} />
            {next ? (
              <ExhibitionCorridor
                nextNumeral={chapterNumeral(next.index)}
                nextVerb={next.chapter.verb}
                tall={i === total - 2}
              />
            ) : null}
          </Fragment>
        );
      })}

      <ExhibitionExit
        total={total}
        hasDraft={hasDraft}
        ctaLabel={exhibitionRoute.exit.ctaLabel}
        ctaHref={exhibitionRoute.exit.ctaHref}
      />
    </div>
  );
}
