"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMediaPreview } from "@/lib/project-media";
import type { ProjectMediaProps } from "@/components/projects/ProjectMedia";

export function ProjectVideo({ media, fill, sizes, priority, className }: ProjectMediaProps) {
  const frameRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const poster = getMediaPreview(media);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    let failed = false;
    let generation = 0;

    const sync = () => {
      const current = ++generation;
      if (!visible || preference.matches || document.hidden || failed) {
        video.pause();
        setPlaying(false);
        return;
      }
      // Jangan request video sebelum benar-benar terlihat (termasuk layout tersembunyi).
      if (!video.getAttribute("src")) video.src = media.src;
      video.muted = true;
      video.play().then(() => {
        if (!disposed && current === generation) setPlaying(true);
      }).catch(() => {
        if (!disposed && current === generation) setPlaying(false);
      });
    };
    const onError = () => { failed = true; sync(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0;
      sync();
    });
    observer.observe(frame);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    video.addEventListener("error", onError);
    return () => {
      disposed = true;
      generation++;
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [media.src]);

  return (
    <span
      ref={frameRef}
      role="img"
      aria-label={media.alt}
      className={`${fill ? "absolute inset-0 h-full w-full" : "relative block w-full"} pointer-events-none overflow-hidden ${className ?? ""}`}
      style={fill ? undefined : { aspectRatio: `${media.width} / ${media.height}` }}
    >
      {poster ? (
        <Image src={poster} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      ) : <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900" />}
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        width={media.width}
        height={media.height}
        className={`absolute inset-0 h-full w-full object-cover ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
