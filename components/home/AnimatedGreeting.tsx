"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const greetings = [
  "Hello 👋🏻",
  "Hi!",
  "Hai",
  "Hola!",
  "Bonjour",
  "Kon'nichiwa",
  "Annyeong-haseyo",
  "Nǐ hǎo",
  "Assalamu'alaikum",
  "Ahlan",
  "Ciao",
  "Guten Tag",
  "Olá",
  "Privyet",
  "Namaste",
  "Sawasdee",
  "Merhaba",
  "Yassou",
  "Xin chào",
  "Kumusta",
  "Hej",
  "Aloha",
  "Kia Ora",
  "Sawubona",
];

export function AnimatedGreeting() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Cursor blink — runs once on mount
  useGSAP(() => {
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, []);

  // Typewriter per word — re-runs when index changes
  useGSAP(() => {
    const word = greetings[index];
    const el = textRef.current;
    if (!el) return;

    const counter = { val: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      val: word.length,
      duration: word.length * 0.08,
      ease: "none",
      onUpdate: () => {
        el.textContent = word.substring(0, Math.round(counter.val));
      },
    })
      .to({}, { duration: 2.5 })
      .to(counter, {
        val: 0,
        duration: word.length * 0.04,
        ease: "none",
        onUpdate: () => {
          el.textContent = word.substring(0, Math.round(counter.val));
        },
        onComplete: () => {
          setIndex((prev) => (prev + 1) % greetings.length);
        },
      });
  }, { dependencies: [index] });

  return (
    <div className="space-y-1">
      <h2 className="flex items-center h-[32px] sm:h-[36px] text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
        <span ref={textRef} />
        <span
          ref={cursorRef}
          className="ml-1 inline-block h-[0.9em] w-[3px] bg-zinc-950 dark:bg-zinc-50"
        />
      </h2>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
        <span className="block">
          23 year old<br className="sm:hidden" /> content creator,
        </span>
        <span className="block">based in Jambi 🇮🇩</span>
      </h1>
    </div>
  );
}
