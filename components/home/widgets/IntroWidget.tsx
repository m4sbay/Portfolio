import Image from "next/image";

export function IntroWidget() {
  return (
    <div className="flex flex-row gap-4">
      <Image
        src="/profile/profil.png"
        alt="Masbay Profile"
        width={80}
        height={80}
        className="shrink-0 rounded-md object-cover"
        draggable={false}
      />
      <div className="space-y-2">
        <div className="text-xs font-medium tracking-tight text-zinc-600 dark:text-zinc-300">
          Intro
        </div>
        <div className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Maulana Bayu
        </div>
        <p className="max-w-[32ch] text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Frontend Dev • UI/UX • Digital Content. Minimal, fast, dan Apple-like.
        </p>
      </div>
    </div>
  );
}
