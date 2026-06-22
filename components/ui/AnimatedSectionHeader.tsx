"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSectionHeader({
  title,
  description,
  titleId,
  descriptionClassName = "mas-section-copy",
}: {
  title: string;
  description?: string;
  titleId?: string;
  descriptionClassName?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".word", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  const words = title.split(" ");

  return (
    <header ref={containerRef} className="space-y-1 text-center sm:text-left">
      <h2 id={titleId} className="mas-section-heading">
        {words.map((word, i) => (
          <span key={i} className="word inline-block">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
      {description ? (
        <p className={descriptionClassName}>{description}</p>
      ) : null}
    </header>
  );
}
