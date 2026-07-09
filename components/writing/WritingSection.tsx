import Link from "next/link";
import type { WritingPost } from "@/types/writing";
import { WritingCard } from "@/components/writing/WritingCard";
import { WritingGridAnimator } from "@/components/writing/WritingGridAnimator";

/** Card melewati kapasitas 2 baris breakpoint-nya disembunyikan via CSS. */
function cardVisibilityClass(index: number): string {
  if (index < 2) return "";
  if (index < 4) return "hidden sm:block";
  return "hidden lg:block";
}

/** Link aksi hanya tampil ketika ada card yang tersembunyi di breakpoint tersebut. */
function moreVisibilityClass(total: number): string {
  return [
    total > 2 ? "inline-flex" : "hidden",
    total > 4 ? "sm:inline-flex" : "sm:hidden",
    total > 6 ? "lg:inline-flex" : "lg:hidden",
  ].join(" ");
}

interface WritingSectionProps {
  /** Heading section; kosongkan bila halaman sudah punya heading sendiri (halaman topic). */
  title?: string;
  posts: WritingPost[];
  /** Batas card yang dirender; undefined = semua (halaman topic tanpa pagination). */
  maxVisible?: number;
  /** Sembunyikan card per breakpoint (pola index: <2 selalu, <4 sm, sisanya lg). */
  responsiveVisibility?: boolean;
  /** Link aksi opsional di bawah grid, mis. "Baca Selengkapnya" ke halaman topic. */
  action?: { href: string; label: string };
}

/**
 * Section grid writing reusable — dipakai Writing home (per topic), halaman
 * topic, dan "Lainnya seperti ini". Satu-satunya tempat layout heading+grid.
 */
export function WritingSection({
  title,
  posts,
  maxVisible,
  responsiveVisibility = false,
  action,
}: WritingSectionProps) {
  if (posts.length === 0) return null;

  const visiblePosts = maxVisible ? posts.slice(0, maxVisible) : posts;

  return (
    <section className="space-y-5">
      {title ? (
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h2>
      ) : null}

      <WritingGridAnimator>
        {visiblePosts.map((post, index) =>
          responsiveVisibility ? (
            <div key={post.slug} className={cardVisibilityClass(index)}>
              <WritingCard post={post} />
            </div>
          ) : (
            <WritingCard key={post.slug} post={post} />
          ),
        )}
      </WritingGridAnimator>

      {action && responsiveVisibility && posts.length > 2 ? (
        <Link
          href={action.href}
          className={`${moreVisibilityClass(posts.length)} text-sm text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50`}
        >
          {action.label}
        </Link>
      ) : null}
    </section>
  );
}
