import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { FileTextIcon } from "@/design-system/icons";

type ThumbImage = {
  src: string;
  alt: string;
};

export function MediaThumb({
  image,
  sizes = "(max-width: 768px) 100vw, 220px",
  priority = false,
  rounded = "rounded-2xl",
  aspectClassName = "aspect-4/3 md:aspect-square",
  className = "",
  imageClassName = "object-cover",
  fallbackClassName = "hidden aspect-square md:block",
  fallbackIcon: FallbackIcon = FileTextIcon,
  unoptimized,
}: {
  image?: ThumbImage | null;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  aspectClassName?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  fallbackIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  unoptimized?: boolean;
}) {
  if (image) {
    return (
      <div className={["relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900", rounded, aspectClassName, className].filter(Boolean).join(" ")}>
        <Image src={image.src} alt={image.alt} fill priority={priority} className={imageClassName} sizes={sizes} unoptimized={unoptimized} />
      </div>
    );
  }

  return (
    <div className={["relative w-full bg-linear-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900", rounded, fallbackClassName, className].filter(Boolean).join(" ")}>
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <FallbackIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
      </span>
    </div>
  );
}
