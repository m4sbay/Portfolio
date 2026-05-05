import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getReadNext, writingPosts } from "@/data/writing";
import { site } from "@/lib/site";
import { WritingPostBody } from "@/components/writing/WritingPostBody";
import { WritingReadNext } from "@/components/writing/WritingReadNext";
import { WritingMetaLine } from "@/components/writing/WritingMetaLine";
import { ChevronRightIcon, FileTextIcon, FolderIcon, TagIcon } from "@/skills/design-system/icons";

export function generateStaticParams() {
  return writingPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/writing/${post.slug}`;
  const og = post.heroImage;

  return {
    title: `${post.title} — Writing`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      ...(og
        ? {
            images: [{ url: og.src, width: og.width, height: og.height, alt: og.alt }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(og ? { images: [og.src] } : {}),
    },
  };
}

export default async function WritingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const nextPost = getReadNext(post.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-6 flex flex-wrap items-center gap-1.5 text-sm">
        <Link href="/writing" className="font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
          Writing
        </Link>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600" aria-hidden />
        <span className="min-w-0 truncate text-zinc-500 dark:text-zinc-400">{post.title}</span>
      </p>

      {/* Susunan sama seperti WritingListCard: grid teks + gambar */}
      <header className="grid gap-6 border-b border-zinc-200/80 pb-7 pt-4 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col md:h-full">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <FolderIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
              {post.category}
            </p>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-pretty text-zinc-950 dark:text-zinc-50 md:text-2xl">
              {post.title}
            </h1>
          </div>

          <div className="mt-auto flex flex-col gap-1.5 pt-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            <WritingMetaLine publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
          </div>
        </div>

        {post.heroImage ? (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 md:aspect-square">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 220px"
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

      <div className="mt-10">
        <WritingPostBody blocks={post.content} />
      </div>

      {post.tags && post.tags.length > 0 ? (
        <footer className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/10">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <TagIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden />
            Tags
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {post.tags.map(t => (
              <span key={t} className="text-sm text-zinc-500 dark:text-zinc-400">
                #{t}
              </span>
            ))}
          </div>
        </footer>
      ) : null}

      {nextPost ? <WritingReadNext post={nextPost} /> : null}

      <p className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
          {site.title}
        </Link>
      </p>
    </article>
  );
}
