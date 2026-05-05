import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About",
  description: "Tentang Masbay: Frontend Developer, UI/UX Designer, dan Digital Content Creator dari Padang.",
  openGraph: {
    title: "About — Masbay",
    description: "Tentang Masbay: Frontend Developer, UI/UX Designer, dan Digital Content Creator dari Padang.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Masbay",
    description: "Tentang Masbay: Frontend Developer, UI/UX Designer, dan Digital Content Creator dari Padang.",
  },
};

const skills = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Adobe Premiere Pro", "After Effects", "Git"];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="grid grid-cols-1 gap-8 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="relative h-40 w-40 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <Image src="/profil.png" alt="Foto profil Masbay" fill className="object-cover" sizes="160px" priority />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">Tentang Masbay</h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Aku M. Maulana Bayu (Masbay) — frontend developer, UI/UX designer, dan digital content creator dari Padang. Aku suka bikin interface yang clean, minimal, dan terasa “premium”, dengan fokus ke detail, aksesibilitas, dan performa.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="https://instagram.com/m4sbay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 shadow-sm hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-zinc-50"
            >
              Instagram @m4sbay
            </Link>
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 shadow-sm hover:border-zinc-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-zinc-50"
            >
              GitHub
            </Link>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Skills / Tools</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map(s => (
            <li key={s} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
