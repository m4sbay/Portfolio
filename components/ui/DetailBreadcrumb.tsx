import Link from "next/link";
import { ChevronRightIcon } from "@/design-system/icons";

export function DetailBreadcrumb({
  href,
  label,
  current,
}: {
  href: string;
  label: string;
  current: string;
}) {
  return (
    <p className="mb-6 flex flex-wrap items-center gap-1.5 text-sm">
      <Link href={href} className="font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">
        {label}
      </Link>
      <ChevronRightIcon className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600" aria-hidden />
      <span className="min-w-0 truncate text-zinc-500 dark:text-zinc-400">{current}</span>
    </p>
  );
}
