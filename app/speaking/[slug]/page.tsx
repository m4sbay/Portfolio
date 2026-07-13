import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSpeaking, getSpeakingBySlug } from "@/data/speaking";
import { formatSpeakingLongDate } from "@/lib/speaking-date";
import { site } from "@/lib/site";
import { SpeakingMetaLine } from "@/components/speaking/SpeakingMetaLine";
import { CalendarIcon, MapPinIcon } from "@/design-system/icons";
import { IconLabel } from "@/components/ui/IconLabel";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";

/** Slug di luar generateStaticParams → 404 tanpa fs runtime. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const sessions = await getAllSpeaking();
  return sessions.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = await getSpeakingBySlug(slug);
  if (!session) return {};

  const url = `/speaking/${session.slug}`;
  const ogImage = session.images?.[0];

  return {
    title: `${session.title} — Speaking`,
    description: session.excerpt,
    openGraph: {
      title: session.title,
      description: session.excerpt,
      type: "article",
      url,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage.src,
                width: ogImage.width,
                height: ogImage.height,
                alt: ogImage.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: session.title,
      description: session.excerpt,
      ...(ogImage ? { images: [ogImage.src] } : {}),
    },
  };
}

export default async function SpeakingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getSpeakingBySlug(slug);
  if (!session) notFound();

  const hero = session.images?.[0];
  const restImages = session.images && session.images.length > 1 ? session.images.slice(1) : [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <DetailBreadcrumb href="/speaking" label="Speaking" current={session.title} />

      <header className="grid gap-6 border-b border-zinc-200/80 pb-7 pt-4 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col md:h-full">
          <div>
            <IconLabel icon={CalendarIcon}>
              {formatSpeakingLongDate(session.date)}
            </IconLabel>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-pretty text-zinc-950 dark:text-zinc-50 md:text-2xl">{session.title}</h1>
          </div>

          <div className="mt-auto flex flex-col gap-1.5 pt-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{session.excerpt}</p>
            <p className="flex flex-wrap items-start gap-x-2 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-500" aria-hidden />
              <span>{session.location}</span>
            </p>
            <SpeakingMetaLine date={session.date} timeLabel={session.timeLabel} showDate={false} size="md" />
          </div>
        </div>

        <MediaThumb image={hero} priority unoptimized={hero?.src.endsWith(".svg")} />
      </header>

      <div className="mt-10 prose prose-zinc max-w-none space-y-4 text-base leading-relaxed text-zinc-700 dark:prose-invert dark:text-zinc-300">
        {session.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {restImages.length > 0 ? (
        <div className="mt-10 space-y-4">
          {restImages.map(img => (
            <figure
              key={img.src}
              className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/50 dark:border-white/10 dark:bg-white/3"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
                unoptimized={img.src.endsWith(".svg")}
              />
            </figure>
          ))}
        </div>
      ) : null}

      <p className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          {site.title}
        </Link>
      </p>
    </article>
  );
}
