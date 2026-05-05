import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SVGProps } from "react";
import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) return {};

  const url = `/event/${ev.slug}`;
  const ogImage = ev.images?.[0];

  return {
    title: ev.title,
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

function formatLongDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dt);
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="1.75" {...props}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 21.5c0 0-6.5-5.2-6.5-11.5a6.5 6.5 0 1 1 13 0C18.5 16.3 12 21.5 12 21.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-10 pb-12">
      <Link
        href="/event"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <span aria-hidden>←</span> Kembali ke Event
      </Link>

      <header className="space-y-4">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {ev.title}
        </h1>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-500" />
            {ev.timeLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-500" />
            {ev.location}
          </span>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{formatLongDate(ev.date)}</p>
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{ev.excerpt}</p>
      </header>

      {ev.images && ev.images.length > 0 ? (
        <div className="space-y-4">
          {ev.images.map((img) => (
            <figure
              key={img.src}
              className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/50 dark:border-white/10 dark:bg-white/[0.03]"
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

      <div className="prose prose-zinc max-w-none space-y-4 text-base leading-relaxed text-zinc-700 dark:prose-invert dark:text-zinc-300">
        {ev.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
