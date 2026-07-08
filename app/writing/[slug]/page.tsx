import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, sortedWritingPosts, writingPosts } from "@/data/writing";
import { formatReadingTime, formatWritingDate, getFirstParagraph } from "@/lib/writing";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { WritingSidebar } from "@/components/writing/WritingSidebar";
import { WritingMoreSection } from "@/components/writing/WritingMoreSection";

export function generateStaticParams() {
  return writingPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const description = getFirstParagraph(post.content);

  return {
    title: `${post.title} — Writing`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/writing/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.image.src],
    },
  };
}

export default async function WritingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const morePosts = sortedWritingPosts().filter(p => p.slug !== post.slug);

  return (
    <div className="py-12">
      {/* Area 2 kolom: artikel kiri, sidebar kanan (lg). Di bawah lg menumpuk:
          artikel dulu, sidebar di bawahnya. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <article>
          <DetailBreadcrumb href="/writing" label="Writing" current={post.title} />

          <header className="space-y-4 pt-4">
            <h1 className="text-[38px] font-semibold leading-tight tracking-tight text-pretty text-zinc-950 dark:text-zinc-50">
              {post.title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatWritingDate(post.publishedAt)} · {post.topic} · {formatReadingTime(post.content)}
            </p>
          </header>

          <div className="mt-8">
            <MediaThumb
              image={post.image}
              priority
              rounded="rounded-3xl"
              aspectClassName="aspect-4/3"
              sizes="(max-width: 1024px) 100vw, 740px"
            />
          </div>

          <div className="mt-10 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <WritingSidebar />
      </div>

      {/* Layout 2 kolom berakhir di sini; section berikut full-width tanpa sidebar */}
      <div className="mt-16">
        <WritingMoreSection posts={morePosts} />
      </div>
    </div>
  );
}
