import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: `Work — ${site.title}`,
  description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
  openGraph: {
    title: `Work — ${site.title}`,
    description: "Kumpulan project, eksperimen, dan karya digital Masbay.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="py-12 lg:ml-[calc((100%_-_48rem)/2_+_2rem)]">
      <header className="mb-12 space-y-3">
        <h1 className="text-[38px] font-semibold uppercase leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
          All works
        </h1>

        <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400" aria-hidden>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-zinc-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path d="M5 7h14M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 11h14M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
            </svg>
          </span>
        </div>
      </header>

      <section aria-label="Daftar project">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="group">
              <div className="relative overflow-hidden rounded-[28px] bg-zinc-100 shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:bg-zinc-900">
                <Link
                  href={`/work/${project.slug}`}
                  className="block"
                  aria-label={`Buka detail ${project.title}`}
                >
                  <Image
                    // Gambar berasal dari `content/projects/*`.
                    // Ganti `project.image.src` di file project terkait saat asset final sudah siap.
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />

                  <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/46 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 translate-y-8 bg-linear-to-t from-black/62 via-black/24 to-transparent opacity-0 blur-2xl transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 translate-y-8 opacity-0 backdrop-blur-[18px] transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to top, black 0%, black 38%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to top, black 0%, black 38%, transparent 100%)",
                    }}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/40 via-black/12 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <span
                    className={`pointer-events-none absolute inset-x-5 translate-y-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
                      project.externalLink ? "bottom-24" : "bottom-5"
                    }`}
                  >
                    <span className="block text-3xl font-semibold leading-tight text-white">
                      {project.title}
                    </span>
                    <span className="mt-2 block text-sm font-medium leading-6 text-white/72">
                      {project.category} · {project.tags.slice(0, 2).join(" · ")}
                    </span>
                  </span>
                </Link>

                {project.externalLink ? (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-5 bottom-5 flex translate-y-5 items-center justify-between rounded-2xl bg-black/32 px-5 py-4 text-base font-medium text-white opacity-0 shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:bg-black/42 focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <span>Live project</span>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                      <path d="M8 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
