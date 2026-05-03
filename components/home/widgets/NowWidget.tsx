"use client";

export function NowWidget({ projectTitle }: { projectTitle: string }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium tracking-tight text-zinc-600 dark:text-zinc-300">
        Now
      </div>
      <div className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        Now Working On:
      </div>
      <div className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {projectTitle}
      </div>
    </div>
  );
}

