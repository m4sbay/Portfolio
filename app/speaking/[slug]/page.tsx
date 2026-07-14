import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSpeaking, getSpeakingBySlug, getMoreSpeaking } from "@/data/speaking";
import { formatSpeakingLongDate } from "@/lib/speaking-date";
import { SpeakingMiniCard } from "@/components/speaking/SpeakingMiniCard";
import { SpeakingGallery } from "@/components/speaking/SpeakingGallery";
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
  const ogImage = session.cover;

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

  const hero = session.cover;
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

        {/* Cover Speaking = 1:1 (1080×1080) di semua breakpoint. Override default MediaThumb
            (aspect-4/3 di mobile) — desktop tetap square seperti sebelumnya. */}
        <MediaThumb
          image={hero}
          priority
          aspectClassName="aspect-square"
          unoptimized={hero?.src.endsWith(".svg")}
        />
      </header>

      <SpeakingGallery images={session.images ?? []} />

      <div className="reading mt-10">
        {session.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {moreSpeaking.length > 0 ? (
        <section className="mt-16 border-t border-zinc-200/80 pt-10 dark:border-white/10">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">More Speaking</h2>

          {/* Mobile 1 kolom; desktop (md, breakpoint fitur Speaking) 2 kolom seimbang.
              items-start: tiap card memakai tinggi rancangannya (min-h card) — grid tidak
              meregangkan card agar meta tetap di posisi bawah. Card ganjil → mengalir natural. */}
          <div className="mt-6 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
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
