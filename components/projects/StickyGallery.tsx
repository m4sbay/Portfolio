import Image from "next/image";
import type { ProjectImage } from "@/types/project";

export function StickyGallery({ images }: { images: ProjectImage[] }) {
  const shouldStackOnMobile = images.length > 1;

  return (
    <>
      <div className={shouldStackOnMobile ? "isolate space-y-5 lg:hidden" : "space-y-5 lg:hidden"}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={shouldStackOnMobile ? "sticky top-20" : undefined}
            style={shouldStackOnMobile ? { zIndex: idx + 1 } : undefined}
          >
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="h-auto w-full object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: normal vertical layout */}
      <div className="hidden lg:block lg:space-y-8">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </>
  );
}
