"use client";

import { useEffect, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";

const greetings = [
  "Hello 👋🏻",
  "Hi!",
  "Hai",
  "Hola!",
  "Bonjour",
  "Kon'nichiwa",
  "Annyeong-haseyo",
  "Nǐ hǎo",
  "Assalamu’alaikum",
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
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = greetings[index];
    const typeSpeed = isDeleting ? 40 : 100;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;

    const tickTimer = setTimeout(() => {
      if (!isDeleting && displayedText === currentWord) {
        pauseTimer = setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % greetings.length);
      } else {
        const nextText = isDeleting
          ? currentWord.substring(0, displayedText.length - 1)
          : currentWord.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }
    }, typeSpeed);

    return () => {
      clearTimeout(tickTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [displayedText, isDeleting, index]);

  return (
    <h1 className="flex items-center text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl h-[40px] sm:h-[48px]">
      <LazyMotion features={domAnimation}>
        <span>{displayedText}</span>
        <m.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="ml-1 inline-block h-[0.9em] w-[3px] bg-zinc-950 dark:bg-zinc-50"
        />
      </LazyMotion>
    </h1>
  );
}
