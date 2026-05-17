import type { WritingBlock, WritingRichText } from "@/types/writing";

function renderRichText(text: WritingRichText) {
  if (typeof text === "string") return text;

  return text.map((part, index) => {
    if (typeof part === "string") return part;

    const content = part.bold ? (
      <strong className="font-semibold text-zinc-950 dark:text-zinc-50">
        {part.text}
      </strong>
    ) : (
      part.text
    );

    if (part.href) {
      const isExternal = /^https?:\/\//.test(part.href);

      return (
        <a
          key={`${part.text}-${index}`}
          href={part.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-medium text-zinc-950 underline decoration-zinc-400 underline-offset-4 transition-colors hover:decoration-zinc-950 dark:text-zinc-50 dark:decoration-zinc-500 dark:hover:decoration-zinc-50"
        >
          {content}
        </a>
      );
    }

    return <span key={`${part.text}-${index}`}>{content}</span>;
  });
}

export function WritingPostBody({ blocks }: { blocks: WritingBlock[] }) {
  return (
    <div className="writing-article space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
      {blocks.map((b, i) => {
        const key = `${b.kind}-${i}`;
        if (b.kind === "lead") {
          return (
            <p key={key} className="text-base italic text-zinc-600 dark:text-zinc-400">
              {renderRichText(b.text)}
            </p>
          );
        }
        if (b.kind === "p") {
          return (
            <p key={key} className="text-pretty">
              {renderRichText(b.text)}
            </p>
          );
        }
        if (b.kind === "h2") {
          return (
            <h2 key={key} className="pt-3 text-[38px] font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
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
                <li key={j}>{renderRichText(item)}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}
