import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, getEventBySlug } from "@/data/events";
import { formatEventLongDate } from "@/lib/event-date";
import { site } from "@/lib/site";
import { EventMetaLine } from "@/components/event/EventMetaLine";
import { CalendarIcon, ChevronRightIcon, FileTextIcon, MapPinIcon } from "@/design-system/icons";

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
      <p className="mb-6 flex flex-wrap items-center gap-1.5 text-sm">
        <Link href="/event" className="font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
          Event
        </Link>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600" aria-hidden />
        <span className="min-w-0 truncate text-zinc-500 dark:text-zinc-400">{ev.title}</span>
      </p>

      <header className="grid gap-6 border-b border-zinc-200/80 pb-7 pt-4 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col md:h-full">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              {formatEventLongDate(ev.date)}
            </p>
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

        {hero ? (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 md:aspect-square">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 220px"
              unoptimized={hero.src.endsWith(".svg")}
            />
          </div>
        ) : (
          <div className="relative hidden aspect-square w-full rounded-2xl bg-linear-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 md:block">
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <FileTextIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
            </span>
          </div>
        )}
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
