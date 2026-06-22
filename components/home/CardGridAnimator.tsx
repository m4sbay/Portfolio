"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

export function CardGridAnimator({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const cards = listRef.current?.querySelectorAll("li");
      if (!cards?.length) return;

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { dependencies: [] }
  );

  return (
    <ul
      ref={listRef}
      className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12"
    >
      {children}
    </ul>
  );
}
