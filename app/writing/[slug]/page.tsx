import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WRITING_TOPICS } from "@/types/writing";
import type { WritingPost, WritingTopic } from "@/types/writing";
import {
  getPostsByTopic,
  getPublishedPostBySlug,
  getPublishedPosts,
  getRecommendations,
  getTopicBySlug,
} from "@/data/writing";
import { formatReadingTime, formatWritingDate, getFirstParagraph } from "@/lib/writing";
import { DetailBreadcrumb } from "@/components/ui/DetailBreadcrumb";
import { MediaThumb } from "@/components/ui/MediaThumb";
import { WritingSidebar } from "@/components/writing/WritingSidebar";
import { WritingSection } from "@/components/writing/WritingSection";
import { WritingArticleBody } from "@/components/writing/WritingArticleBody";
import { WritingCategoryView } from "@/components/writing/WritingCategoryView";

/** Slug di luar generateStaticParams (termasuk draft) → 404 tanpa fs runtime. */
export const dynamicParams = false;

/** Route ini melayani dua hal: detail artikel DAN halaman topic (/writing/life). */
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return [
    ...posts.map(p => ({ slug: p.slug })),
    ...WRITING_TOPICS.map(t => ({ slug: t.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);
  if (post) {
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

  const topic = getTopicBySlug(slug);
  if (topic) {
    const description = `Semua tulisan pada topik ${topic.label}.`;
    return {
      title: `${topic.label} — Writing`,
      description,
      openGraph: {
        title: `${topic.label} — Writing`,
        description,
        url: `/writing/${topic.slug}`,
      },
    };
  }

  return {};
}

function ArticleView({ post, morePosts }: { post: WritingPost; morePosts: WritingPost[] }) {
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

          <WritingArticleBody content={post.content} />
        </article>

        <WritingSidebar />
      </div>

      {/* Layout 2 kolom berakhir di sini; section berikut full-width tanpa sidebar */}
      <div className="mt-16">
        <WritingSection title="Lainnya seperti ini" posts={morePosts} />
      </div>
    </div>
  );
}

async function CategoryPage({ topic }: { topic: WritingTopic }) {
  const [posts, recommendations] = await Promise.all([
    getPostsByTopic(topic.slug),
    getRecommendations({ excludeTopicSlug: topic.slug }),
  ]);
  return <WritingCategoryView topic={topic} posts={posts} recommendations={recommendations} />;
}

export default async function WritingSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);
  if (post) {
    const morePosts = await getRecommendations({ excludeSlug: post.slug });
    return <ArticleView post={post} morePosts={morePosts} />;
  }

  const topic = getTopicBySlug(slug);
  if (topic) return <CategoryPage topic={topic} />;

  notFound();
}
