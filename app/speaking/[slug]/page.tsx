import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSpeaking, getSpeakingBySlug, getMoreSpeaking } from "@/data/speaking";
import { formatSpeakingLongDate } from "@/lib/speaking-date";
import { SpeakingMiniCard } from "@/components/speaking/SpeakingMiniCard";
import { ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon } from "@/design-system/icons";
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
  const moreSpeaking = await getMoreSpeaking(session.slug);

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

          <div className="mt-auto flex flex-col pt-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{session.excerpt}</p>
            {/* Metadata sekunder: pola IconLabel yang sama dengan eyebrow tanggal (ikon+label seragam). */}
            <div className="mt-3 flex flex-col gap-1.5">
              <IconLabel icon={MapPinIcon} uppercase={false}>{session.location}</IconLabel>
              <IconLabel icon={ClockIcon} uppercase={false}>{session.timeLabel}</IconLabel>
            </div>
          </div>
        </div>

        <MediaThumb image={hero} priority unoptimized={hero?.src.endsWith(".svg")} />
      </header>

      <div className="reading mt-10">
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

      {moreSpeaking.length > 0 ? (
        <section className="mt-16 border-t border-zinc-200/80 pt-10 dark:border-white/10">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">More Speaking</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {moreSpeaking.map(s => (
              <SpeakingMiniCard key={s.slug} session={s} />
            ))}
          </div>

          <Link
            href="/speaking"
            className="group mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View all speaking
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </section>
      ) : null}
    </article>
  );
}
