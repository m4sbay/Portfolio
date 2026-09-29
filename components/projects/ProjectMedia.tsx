import Image from "next/image";
import type { ProjectImage } from "@/types/project";
import { getMediaType, getMediaPreview } from "@/lib/project-media";
import { ProjectVideo } from "@/components/projects/ProjectVideo";

export type ProjectMediaProps = {
  media: ProjectImage;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Gambar lama tetap memakai next/image; browser lifecycle hanya ada pada video. */
export function ProjectMedia({ media, fill, sizes, priority, className }: ProjectMediaProps) {
  if (getMediaType(media.src) === "video") {
    return <ProjectVideo key={media.src} media={media} fill={fill} sizes={sizes} priority={priority} className={className} />;
  }
  return (
    <Image
      src={getMediaPreview(media)!}
      alt={media.alt}
      width={fill ? undefined : media.width}
      height={fill ? undefined : media.height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
