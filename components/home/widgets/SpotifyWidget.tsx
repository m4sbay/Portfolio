"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type SpotifyNowPlaying =
  | { isPlaying: false }
  | {
      isPlaying: true;
      title: string;
      artist: string;
      albumArt?: string;
      songUrl?: string;
      progress: number;
      duration: number;
    };

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" {...props}>
      <path
        d="M9 18.5a2.5 2.5 0 1 1-2-2.45V6.8c0-.42.29-.78.7-.88l11-2.8c.55-.14 1.1.28 1.1.85V14.5a2.5 2.5 0 1 1-2-2.45V6.25L9 8.48v7.57c0 .91-.49 1.74-1.28 2.15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Equalizer({ active }: { active: boolean }) {
  return (
    <div
      className={[
        "flex items-end gap-1",
        active ? "opacity-100" : "opacity-40",
      ].join(" ")}
      aria-hidden
    >
      <span className={["eq-bar", active ? "eq-on" : "eq-off"].join(" ")} />
      <span className={["eq-bar eq-delay-1", active ? "eq-on" : "eq-off"].join(" ")} />
      <span className={["eq-bar eq-delay-2", active ? "eq-on" : "eq-off"].join(" ")} />
    </div>
  );
}

type ProgressAnchor = { snapshot: number; at: number };

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyNowPlaying>({ isPlaying: false });
  const [tick, setTick] = useState(0);
  const [anchor, setAnchor] = useState<ProgressAnchor | null>(null);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify", { cache: "no-store" });
      const json = (await res.json()) as SpotifyNowPlaying;
      setData(json);
      if (json.isPlaying) {
        setAnchor({ snapshot: json.progress, at: Date.now() });
      } else {
        setAnchor(null);
      }
      setTick(Date.now());
    } catch {
      setData({ isPlaying: false });
      setAnchor(null);
      setTick(Date.now());
    }
  }, []);

  useEffect(() => {
    const run = () => void fetchNowPlaying();
    queueMicrotask(run);
    const id = window.setInterval(run, 30_000);
    return () => window.clearInterval(id);
  }, [fetchNowPlaying]);

  // Progress realtime: tick ~15fps, murah tapi smooth.
  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now()), 66);
    return () => window.clearInterval(id);
  }, []);

  const progressMs = useMemo(() => {
    if (!data.isPlaying || !anchor) return 0;
    return clamp(anchor.snapshot + tick - anchor.at, 0, data.duration);
  }, [data, tick, anchor]);

  const pct = useMemo(() => {
    if (!data.isPlaying || data.duration <= 0) return 0;
    return clamp(progressMs / data.duration, 0, 1);
  }, [data, progressMs]);

  if (!data.isPlaying) {
    return (
      <div className="w-[220px]">
        <div className="relative rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#61c554] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
            </div>
            <div className="text-emerald-400">
              <SpotifyIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-white/10 text-white/70 dark:text-white/70">
              <MusicIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Not playing
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Spotify
              </div>
            </div>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[20%] bg-white/30" />
          </div>
        </div>
      </div>
    );
  }

  const body = (
    <div className="w-[220px]">
      <div className="relative rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#61c554] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 dark:ring-white/10" />
          </div>
          <div className="text-emerald-400">
            <SpotifyIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative h-[60px] w-[60px] overflow-hidden rounded-lg bg-white/10">
            {data.albumArt ? (
              <Image
                src={data.albumArt}
                alt={`${data.title} album art`}
                fill
                className="object-cover"
                sizes="60px"
                unoptimized
                draggable={false}
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {data.title}
                </div>
                <div className="truncate text-xs text-zinc-600 dark:text-zinc-300">
                  {data.artist}
                </div>
              </div>
              <Equalizer active />
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-600 dark:text-zinc-300">
              <span>{formatTime(progressMs)}</span>
              <span>{formatTime(data.duration)}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-emerald-400/80 will-change-transform transform-gpu"
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return data.songUrl ? (
    <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    body
  );
}

