"use client";

import { useState } from "react";

const ADJUSTMENTS = [
  { key: "exposure",   label: "Exposure",   min: -5,   max: 5,   step: 0.1, default: 0.4  },
  { key: "contrast",   label: "Contrast",   min: -100, max: 100, step: 1,   default: 18   },
  { key: "highlights", label: "Highlights", min: -100, max: 100, step: 1,   default: -35  },
  { key: "shadows",    label: "Shadows",    min: -100, max: 100, step: 1,   default: 28   },
  { key: "whites",     label: "Whites",     min: -100, max: 100, step: 1,   default: 12   },
  { key: "blacks",     label: "Blacks",     min: -100, max: 100, step: 1,   default: -20  },
  { key: "vibrance",   label: "Vibrance",   min: -100, max: 100, step: 1,   default: 22   },
  { key: "saturation", label: "Saturation", min: -100, max: 100, step: 1,   default: 6    },
] as const;

type AdjKey = (typeof ADJUSTMENTS)[number]["key"];

const ACCENT = "#6AADCE";

function toPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function formatValue(value: number, key: AdjKey) {
  if (key === "exposure") return value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
  return value > 0 ? `+${Math.round(value)}` : `${Math.round(value)}`;
}

export function LightroomPanel({ glassClass = "" }: { glassClass?: string }) {
  const initial = Object.fromEntries(
    ADJUSTMENTS.map((a) => [a.key, a.default])
  ) as Record<AdjKey, number>;

  const [values, setValues] = useState(initial);
  const set = (key: AdjKey, v: number) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  return (
    <div className={`overflow-hidden rounded-3xl ${glassClass}`}>
      {/* Panel header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/50 dark:border-white/10 bg-white/30 dark:bg-white/[0.03]">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Develop — AR2023
        </span>
        <span
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
          style={{ background: ACCENT }}
        >
          ACTIVE
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Left: Sliders */}
        <div className="px-5 py-5 space-y-4 border-b md:border-b-0 md:border-r border-white/50 dark:border-white/10">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            Basic Panel
          </p>
          {ADJUSTMENTS.map((adj) => {
            const pct = toPercent(values[adj.key], adj.min, adj.max);
            const midPct = toPercent(0, adj.min, adj.max);
            const isActive = values[adj.key] !== 0;
            return (
              <div key={adj.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`lr-${adj.key}`}
                    className="text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {adj.label}
                  </label>
                  <span
                    className="text-xs tabular-nums font-medium min-w-14 text-right"
                    style={{ color: isActive ? ACCENT : undefined }}
                  >
                    {formatValue(values[adj.key], adj.key)}
                  </span>
                </div>

                {/* Track */}
                <div className="relative h-[3px] rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className="absolute top-0 h-full rounded-full opacity-70"
                    style={{
                      background: ACCENT,
                      left: `${Math.min(pct, midPct)}%`,
                      width: `${Math.abs(pct - midPct)}%`,
                    }}
                  />
                  <input
                    id={`lr-${adj.key}`}
                    type="range"
                    min={adj.min}
                    max={adj.max}
                    step={adj.step}
                    value={values[adj.key]}
                    onChange={(e) => set(adj.key, parseFloat(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                    aria-label={adj.label}
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow border border-zinc-200 dark:border-white/20 pointer-events-none"
                    style={{ left: `calc(${pct}% - 6px)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Tone Curve */}
        <div className="px-5 py-5">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
            Tone Curve
          </p>
          <ToneCurveSVG />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {(["Shadows", "Darks", "Lights", "Highlights"] as const).map((label, i) => {
              const toneValues = [-8, +5, +4, -12] as const;
              return (
                <div key={label} className="text-center">
                  <p className="text-[10px] mb-1 text-zinc-400 dark:text-zinc-500">{label}</p>
                  <p
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: toneValues[i] >= 0 ? ACCENT : "#4aa8a0" }}
                  >
                    {toneValues[i] > 0 ? `+${toneValues[i]}` : toneValues[i]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="px-5 py-3 border-t border-white/50 dark:border-white/10 flex items-center gap-4 flex-wrap">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
          Color Mix
        </span>
        {(["Warm", "Teal", "Orange", "Yellow"] as const).map((c, i) => {
          const clrs = ["#c4845a", "#4a9a8a", "#e07840", "#c4a848"];
          return (
            <div key={c} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: clrs[i] }} />
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{c}</span>
            </div>
          );
        })}
        <span className="ml-auto text-[10px] text-zinc-300 dark:text-zinc-600">
          AR2023 · Darkroom Warm
        </span>
      </div>
    </div>
  );
}

function ToneCurveSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full aspect-square rounded-2xl bg-black/[0.04] dark:bg-white/[0.04]"
      aria-label="Tone curve visualization for AR2023 preset"
    >
      {/* Grid lines */}
      {[50, 100, 150].map((v) => (
        <g key={v}>
          <line x1={v} y1={0} x2={v} y2={200} stroke="currentColor" strokeWidth="0.5" className="text-zinc-200 dark:text-zinc-800" />
          <line x1={0} y1={v} x2={200} y2={v} stroke="currentColor" strokeWidth="0.5" className="text-zinc-200 dark:text-zinc-800" />
        </g>
      ))}
      {/* Diagonal baseline */}
      <line x1={0} y1={200} x2={200} y2={0} stroke="currentColor" strokeWidth="0.8" className="text-zinc-300 dark:text-zinc-700" />
      {/* S-curve */}
      <path
        d="M 0,200 C 40,195 70,175 100,100 C 130,28 162,12 200,0"
        fill="none"
        stroke="#6AADCE"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Control point dots */}
      {[[20, 196], [100, 100], [178, 8]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill="#6AADCE" />
      ))}
      {/* Teal channel */}
      <path
        d="M 0,200 C 40,192 80,165 110,88 C 140,20 168,8 200,0"
        fill="none"
        stroke="#4aa8a0"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
