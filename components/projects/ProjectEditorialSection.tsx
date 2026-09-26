import type { ReactNode } from "react";

/** Float desktop membiarkan baris teks melebar setelah galeri berakhir. */
export function ProjectEditorialSection({
  children,
  media,
  id,
  className = "",
}: {
  children: ReactNode;
  media?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`project-editorial-section ${className}`}>
      {media && <div className="project-editorial-media">{media}</div>}
      <div className="project-editorial-copy">{children}</div>
    </div>
  );
}
