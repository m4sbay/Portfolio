import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getReadNext, writingPosts } from "@/data/writing";
import { site } from "@/lib/site";
import { WritingPostBody } from "@/components/writing/WritingPostBody";
import { WritingReadNext } from "@/components/writing/WritingReadNext";
import { WritingMetaLine } from "@/components/writing/WritingMetaLine";
import { FolderIcon, TagIcon } from "@/design-system/icons";
import { IconLabel } from "@/components/ui/IconLabel";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";

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
    <article className="py-12">
      <DetailBreadcrumb href="/writing" label="Writing" current={post.title} />

      {/* Susunan sama seperti WritingListCard: grid teks + gambar */}
      <header className="grid gap-6 border-b border-zinc-200/80 pb-7 pt-4 dark:border-white/10 md:grid-cols-[1fr_minmax(0,220px)] md:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col md:h-full">
          <div>
            <IconLabel icon={FolderIcon}>
              {post.category}
            </IconLabel>
            <h1 className="mt-4 text-[38px] font-semibold leading-tight tracking-tight text-pretty text-zinc-950 dark:text-zinc-50">{post.title}</h1>
          </div>

          <div className="mt-auto flex flex-col gap-1.5 pt-5">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            <WritingMetaLine publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
          </div>
        </div>

        <MediaThumb image={post.heroImage} priority />
      </header>

      <div className="mt-10">
        <WritingPostBody blocks={post.content} />
      </div>

      {post.tags && post.tags.length > 0 ? (
        <footer className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/10">
          <IconLabel icon={TagIcon} className="mb-3" size="smWide">
            Tags
          </IconLabel>
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
