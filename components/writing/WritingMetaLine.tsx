import { CalendarIcon, ClockIcon } from "@/skills/design-system/icons";
import { formatRelativeId } from "@/lib/writing-date";

type Props = {
  publishedAt: string;
  readMinutes: number;
  /** `md` = ikon sedikit lebih besar + `text-sm` (header artikel) */
  size?: "sm" | "md";
  className?: string;
};

export function WritingMetaLine({ publishedAt, readMinutes, size = "sm", className }: Props) {
  const iconClass =
    size === "md" ? "h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" : "h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500";
  const textClass = size === "md" ? "text-sm" : "text-xs";

  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500 dark:text-zinc-500 ${textClass} ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon className={iconClass} />
        {formatRelativeId(publishedAt)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className={iconClass} />
        {readMinutes} min read
      </span>
    </p>
  );
}
