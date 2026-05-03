"use client";

const labelToSlug: Record<string, string> = {
  "TypeScript": "typescript",
  "Tailwind": "tailwindcss",
  "Figma": "figma",
  "Premiere": "adobepremierepro",
};

function IconTile({ label }: { label: string }) {
  const slug = labelToSlug[label];

  return (
    <div className="tech-logo-container group flex h-10 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-medium text-zinc-700 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 hover:border-zinc-300 hover:text-zinc-900 dark:hover:border-white/20 dark:hover:text-zinc-50">
      {slug && (
        <img
          src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`}
          alt={`${label} logo`}
          className="tech-logo-img h-4 w-4 object-contain"
          draggable={false}
          loading="lazy"
        />
      )}
      <span>{label}</span>
    </div>
  );
}

export function StackWidget() {
  return (
    <div className="space-y-3">
      <div className="text-xs font-medium tracking-tight text-zinc-600 dark:text-zinc-300">
        Stack
      </div>
      <div className="grid grid-cols-2 gap-2">
        <IconTile label="TypeScript" />
        <IconTile label="Tailwind" />
        <IconTile label="Figma" />
        <IconTile label="Premiere" />
      </div>
    </div>
  );
}

