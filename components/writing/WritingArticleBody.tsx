import type { WritingBlock, WritingInline } from "@/types/writing";
import { RichMention } from "@/components/writing/RichMention";
import { EntityCard } from "@/components/writing/EntityCard";

const paragraphClass = "text-[18px] font-normal tracking-normal leading-8 text-zinc-500 dark:text-zinc-300";

function InlineSegments({ segments }: { segments: WritingInline[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === "string" ? seg : <RichMention key={i} entity={seg.entity} />,
      )}
    </>
  );
}

/** Renderer blok artikel writing: paragraf, heading, mention inline, entity card. */
export function WritingArticleBody({ content }: { content: WritingBlock[] }) {
  return (
    <div className="mt-10 space-y-5">
      {content.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className={paragraphClass}>
              {block}
            </p>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={i} className={paragraphClass}>
              <InlineSegments segments={block.segments} />
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="pt-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              {block.text}
            </h2>
          );
        }

        return (
          <div key={i} className="py-2">
            <EntityCard entity={block.entity} />
          </div>
        );
      })}
    </div>
  );
}
