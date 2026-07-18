import { site } from "@/lib/site";
import { FooterTimestamp } from "@/components/footer/FooterTimestamp";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/design-system/icons";

const footerIconBtn =
  "inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/25 bg-white/10 text-white transition-colors hover:border-white/40 hover:bg-white/15 dark:border-zinc-300 dark:bg-zinc-100 dark:text-zinc-700 dark:hover:border-zinc-400 dark:hover:bg-white dark:hover:text-zinc-950 sm:h-11 sm:w-11";

export function SiteFooter() {
  return (
    <footer
      className="site-footer-reveal rounded-t-[16px] border-t border-white/15 bg-black pb-8 pt-10 text-zinc-100 dark:border-zinc-200 dark:bg-white dark:text-zinc-900 sm:rounded-t-4xl sm:pb-12 sm:pt-16"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 sm:gap-12 lg:grid-cols-[minmax(0,140px)_1fr] lg:gap-16">
          <div className="hidden lg:block" aria-hidden />

          <div className="space-y-6 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <h2 id="footer-heading" className="max-w-2xl text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl dark:text-zinc-950">
                Let's create something extraordinary together.
              </h2>
              <p className="max-w-xl text-pretty text-sm leading-6 text-zinc-300 dark:text-zinc-600 sm:text-base sm:leading-relaxed">
                Let’s make an impact
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="space-y-3">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 sm:text-[11px] sm:tracking-[0.2em]">Sosial</p>
                <ul className="flex flex-wrap items-center gap-3">
                  <li>
                    <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={footerIconBtn} aria-label="Instagram">
                      <InstagramIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </a>
                  </li>
                  <li>
                    <a href={site.social.github} target="_blank" rel="noopener noreferrer" className={footerIconBtn} aria-label="GitHub">
                      <GitHubIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </a>
                  </li>
                  <li>
                    <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={footerIconBtn} aria-label="LinkedIn">
                      <LinkedInIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/15 pt-6 dark:border-zinc-200 sm:pt-10">
              <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-600 sm:text-xs">
                {site.name} · <FooterTimestamp />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
