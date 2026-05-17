"use client";

import Image from "next/image";

export function PhotoWidget() {
  return (
    <div className="w-[220px]">
      <div className="rounded-xl bg-white p-3 ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-white/5">
          <Image
            src="/profile_2.png"
            alt="Foto Masbay"
            fill
            className="object-cover object-[50%_15%]"
            sizes="220px"
            priority={false}
            draggable={false}
          />
        </div>
        <div className="pt-3 text-center text-xs text-zinc-600 dark:text-zinc-300">
          Padang, Indonesia
        </div>
      </div>
      <div className="pointer-events-none mt-2 h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-white/10" />
    </div>
  );
}

