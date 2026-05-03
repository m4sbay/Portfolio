import React from "react";

const tagToSlug: Record<string, string> = {
  "Figma": "figma",
  "Tailwind": "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  "Next.js": "nextdotjs",
  "TypeScript": "typescript",
  "React": "react",
  "Supabase": "supabase",
  "Vercel": "vercel",
  "GitHub": "github",
  "Node.js": "nodedotjs",
  "Premiere Pro": "adobepremierepro",
  "After Effects": "adobeaftereffects",
  "Spotify": "spotify",
  "VS Code": "visualstudiocode",
  "Notion": "notion",
};

export function ProjectTag({ tag }: { tag: string }) {
  const slug = tagToSlug[tag];

  return (
    <li className="tech-logo-container group flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-default">
      {slug && (
        <img
          src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`}
          alt={`${tag} icon`}
          className="tech-logo-img h-3 w-3 object-contain"
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="font-medium">{tag}</span>
    </li>
  );
}
