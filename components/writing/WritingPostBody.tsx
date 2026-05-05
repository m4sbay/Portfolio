import type { WritingBlock } from "@/types/writing";

export function WritingPostBody({ blocks }: { blocks: WritingBlock[] }) {
  return (
    <div className="writing-article space-y-6 text-[17px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {blocks.map((b, i) => {
        const key = `${b.kind}-${i}`;
        if (b.kind === "lead") {
          return (
            <p key={key} className="text-lg italic text-zinc-600 dark:text-zinc-400">
              {b.text}
            </p>
          );
        }
        if (b.kind === "p") {
          return (
            <p key={key} className="text-pretty">
              {b.text}
            </p>
          );
        }
        if (b.kind === "h2") {
          return (
            <h2 key={key} className="pt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {b.text}
            </h2>
          );
        }
        if (b.kind === "hr") {
          return <hr key={key} className="border-zinc-200 dark:border-white/10" />;
        }
        if (b.kind === "ul") {
          return (
            <ul key={key} className="list-disc space-y-2 pl-6 text-pretty">
              {b.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}
