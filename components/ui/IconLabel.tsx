import type { ComponentType, ReactNode, SVGProps } from "react";

const sizeClasses = {
  sm: {
    label: "gap-1.5 text-xs",
    icon: "h-3.5 w-3.5",
  },
  smWide: {
    label: "gap-2 text-xs",
    icon: "h-3.5 w-3.5",
  },
  md: {
    label: "gap-2 text-sm",
    icon: "h-4 w-4",
  },
} as const;

export function IconLabel({
  icon: Icon,
  children,
  className = "",
  size = "sm",
  uppercase = true,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
  className?: string;
  size?: keyof typeof sizeClasses;
  uppercase?: boolean;
}) {
  const classes = sizeClasses[size];

  return (
    <p
      className={[
        "flex items-center font-semibold text-zinc-500 dark:text-zinc-400",
        uppercase ? "uppercase tracking-wider" : "",
        classes.label,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className={`${classes.icon} shrink-0 text-zinc-400 dark:text-zinc-500`} aria-hidden />
      {children}
    </p>
  );
}
