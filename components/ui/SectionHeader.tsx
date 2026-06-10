import type { ReactNode } from "react";

export function SectionHeader({
  title,
  description,
  titleId,
  descriptionClassName = "mas-section-copy",
}: {
  title: ReactNode;
  description?: ReactNode;
  titleId?: string;
  descriptionClassName?: string;
}) {
  return (
    <header className="space-y-1 text-center sm:text-left">
      <h2 id={titleId} className="mas-section-heading">
        {title}
      </h2>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
    </header>
  );
}
