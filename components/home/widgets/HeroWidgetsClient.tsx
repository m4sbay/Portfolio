"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/types/project";
import { HeroWidgets } from "@/components/home/widgets/HeroWidgets";
import { HeroWidgetsStatic } from "@/components/home/widgets/HeroWidgetsStatic";

export function HeroWidgetsClient({ projects }: { projects: Project[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  // Penting: render static dulu agar SSR == first client render (hindari hydration mismatch).
  if (!mounted) return <HeroWidgetsStatic projects={projects} />;

  return <HeroWidgets projects={projects} />;
}

