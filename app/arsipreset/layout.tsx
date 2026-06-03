import type { ReactNode } from "react";

/**
 * Break completely out of the root layout's max-w-6xl + padding container.
 * left: 50% + transform: translateX(-50%) + width: 100vw = true full-viewport width.
 * margin-top: -2.5rem cancels the root layout's py-10 top padding.
 */
export default function ArsiPresetLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        transform: "translateX(-50%)",
        /* cancel py-10 (2.5rem) + navbar height (4.5rem) = -7rem */
        marginTop: "-7rem",
      }}
    >
      {children}
    </div>
  );
}
