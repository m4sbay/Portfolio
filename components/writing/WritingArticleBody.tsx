import type { WritingBlock, WritingInline } from "@/types/writing";
import { RichMention } from "@/components/writing/RichMention";
import { EntityCard } from "@/components/writing/EntityCard";

function InlineSegments({ segments }: { segments: WritingInline[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === "string" ? seg : <RichMention key={i} entity={seg.entity} />,
      )}
    </>
  );
}

/**
 * Renderer blok artikel writing di atas Reading Design System (`.reading`).
 * Tipografi (body, heading, rhythm, link) SELURUHNYA berasal dari `.reading`;
 * komponen ini hanya mengeluarkan tag semantik + ekstensi non-tipografi
 * (mention, entity card) yang dikecualikan lewat `.not-reading`.
 */
export function WritingArticleBody({ content }: { content: WritingBlock[] }) {
  return (
    <div className="reading mt-10">
      {content.map((block, i) => {
        if (typeof block === "string") {
          return <p key={i}>{block}</p>;
        }

        if (block.type === "paragraph") {
          return (
            <p key={i}>
              <InlineSegments segments={block.segments} />
            </p>
          );
        }

        if (block.type === "heading") {
          return <h2 key={i}>{block.text}</h2>;
        }

        // EntityCard punya styling sendiri → keluar dari .reading; wrapper py-2 = layout.
        return (
          <div key={i} className="not-reading py-2">
            <EntityCard entity={block.entity} />
          </div>
        );
      })}
    </div>
  );
}
