import type { SpeakingContentBlock } from "@/types/speaking";
import type { WritingInline } from "@/types/writing";
import { RichMention } from "@/components/writing/RichMention";

/** Segmen inline paragraf: teks biasa atau mention ke registry entity (sama dgn Writing). */
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
 * Renderer blok konten Speaking di atas Reading Design System (`.reading`).
 * Tipografi body/heading/link sepenuhnya dari `.reading`. Entity inline memakai sistem
 * yang sama dengan Writing: mention dirender oleh RichMention dari registry data/entities.
 * String polos = paragraf biasa (backward-compat sesi lama).
 */
export function SpeakingArticleBody({ body }: { body: SpeakingContentBlock[] }) {
  return (
    <div className="reading mt-10">
      {body.map((block, i) => {
        if (typeof block === "string") {
          return <p key={i}>{block}</p>;
        }

        if (block.type === "heading") {
          return <h2 key={i}>{block.content}</h2>;
        }

        return (
          <p key={i}>
            <InlineSegments segments={block.segments} />
          </p>
        );
      })}
    </div>
  );
}
