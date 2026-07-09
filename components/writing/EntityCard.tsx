import Image from "next/image";
import { getEntity } from "@/data/entities";

/**
 * Panel informasi sebuah entity, ditampilkan setelah pembahasan entity selesai,
 * tepat sebelum heading berikutnya. Data sepenuhnya dari registry.
 */
export function EntityCard({ entity }: { entity: string }) {
  const data = getEntity(entity);
  if (!data) return null;

  return (
    <div className="not-prose flex flex-col gap-5 rounded-md border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:p-5">
      {/* Kiri: preview dengan sudut membulat sendiri, mengisi tinggi kartu */}
      <div className="relative aspect-16/9 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:aspect-auto sm:w-52">
        <Image
          src={data.preview}
          alt={`Preview ${data.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 208px"
        />
      </div>

      {/* Kanan: grup heading (logo + judul + subtitle), tombol di kanan atas, deskripsi */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={data.logo}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-sm object-cover ring-1 ring-black/5 dark:ring-white/10"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {data.title}
              </p>
              <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{data.subtitle}</p>
            </div>
          </div>
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md border border-zinc-200 bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:border-white/10 dark:bg-white dark:text-zinc-700 dark:hover:bg-zinc-100"
          >
            Visit Website
          </a>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-300">
          {data.description}
        </p>
      </div>
    </div>
  );
}
