import { CalendarIcon, ClockIcon } from "@/design-system/icons";
import { formatEventListDate } from "@/lib/event-date";

type Props = {
  date: string;
  timeLabel: string;
  /** Kalau false, hanya jam (untuk kartu daftar — tanggal sudah di eyebrow). */
  showDate?: boolean;
  /** `md` = ikon sedikit lebih besar + `text-sm` (header detail) */
  size?: "sm" | "md";
  className?: string;
};

export function EventMetaLine({ date, timeLabel, showDate = true, size = "sm", className }: Props) {
  const iconClass =
    size === "md" ? "h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" : "h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500";
  const textClass = size === "md" ? "text-sm" : "text-xs";

  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500 dark:text-zinc-500 ${textClass} ${className ?? ""}`}
    >
      {showDate ? (
        <span className="inline-flex items-center gap-1.5">
          <CalendarIcon className={iconClass} />
          {formatEventListDate(date)}
        </span>
      ) : null}
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className={iconClass} />
        {timeLabel}
      </span>
    </p>
  );
}
