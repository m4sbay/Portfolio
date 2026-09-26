import { createElement, Fragment, type ReactNode } from "react";
import type { ProjectBrandLink } from "@/types/project";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderBrandLinks(text: string, brandLinks: ProjectBrandLink[] | undefined, keyPrefix: string) {
  if (!brandLinks?.length) return text;

  const pattern = new RegExp(
    `(${brandLinks.map(({ label }) => escapeRegExp(label)).join("|")})`,
    "g"
  );

  return text.split(pattern).map((part, index) => {
    const brand = brandLinks.find(({ label }) => label === part);

    if (!brand) return part;

    return createElement("a", {
      key: `${keyPrefix}-${brand.label}-${index}`,
      href: brand.href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-950 dark:text-zinc-50 dark:decoration-zinc-500 dark:hover:text-white dark:hover:decoration-zinc-50",
    }, part);
  });
}

export function renderProjectInline(text: string, brandLinks?: ProjectBrandLink[]): ReactNode {
  return text.split(/(`[^`\n]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return createElement("code", { key: `code-${index}` }, part.slice(1, -1));
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return createElement(Fragment, { key: `emphasis-${index}` }, renderProjectInline(part.slice(2, -2), brandLinks));
    }

    return renderBrandLinks(part, brandLinks, `text-${index}`);
  });
}

