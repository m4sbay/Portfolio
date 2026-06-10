import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, getEventBySlug } from "@/data/events";
import { formatEventLongDate } from "@/lib/event-date";
import { site } from "@/lib/site";
import { EventMetaLine } from "@/components/event/EventMetaLine";
import { CalendarIcon, MapPinIcon } from "@/design-system/icons";
import { IconLabel } from "@/components/ui/IconLabel";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";

export function generateStaticParams() {
  return events.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = getEventBySlug(slug);
  if (!ev) return {};

  const url = `/event/${ev.slug}`;
  const ogImage = ev.images?.[0];

  return {
    title: `${ev.title} — Event`,
    description: ev.excerpt,
    openGraph: {
      title: ev.title,
      description: ev.excerpt,
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
      title: ev.title,
      description: ev.excerpt,
      ...(ogImage ? { images: [ogImage.src] } : {}),
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = getEventBySlug(slug);
  if (!ev) notFound();

  const hero = ev.images?.[0];
  const restImages = ev.images && ev.images.length > 1 ? ev.images.slice(1) : [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <DetailBreadcrumb href="/event" label="Event" current={ev.title} />

      <header className="grid gap-6 border-b border-zinc-200/80 pb-7 pt-4 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col md:h-full">
          <div>
            <IconLabel icon={CalendarIcon}>
              {formatEventLongDate(ev.date)}
            </IconLabel>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-pretty text-zinc-950 dark:text-zinc-50 md:text-2xl">{ev.title}</h1>
          </div>

          <div className="mt-auto flex flex-col gap-1.5 pt-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{ev.excerpt}</p>
            <p className="flex flex-wrap items-start gap-x-2 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-500" aria-hidden />
              <span>{ev.location}</span>
            </p>
            <EventMetaLine date={ev.date} timeLabel={ev.timeLabel} showDate={false} size="md" />
          </div>
        </div>

        <MediaThumb image={hero} priority unoptimized={hero?.src.endsWith(".svg")} />
      </header>

      <div className="mt-10 prose prose-zinc max-w-none space-y-4 text-base leading-relaxed text-zinc-700 dark:prose-invert dark:text-zinc-300">
        {ev.body.map((p, i) => (
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
