import type { Entity } from "@/types/entity";
import { entity as ruangTambah } from "@/content/entities/ruang-tambah";
import { entity as kopkit } from "@/content/entities/kopkit";
import { entity as tailwindcss } from "@/content/entities/tailwindcss";
import { entity as vercel } from "@/content/entities/vercel";
import { entity as claudeCode } from "@/content/entities/claude-code";
import { entity as codex } from "@/content/entities/codex";
import { entity as javascript } from "@/content/entities/javascript";
import { entity as typescript } from "@/content/entities/typescript";

/** Registry terpusat. Nambah entity cukup nambah satu file di content/entities. */
export const entities: Entity[] = [
  ruangTambah,
  kopkit,
  tailwindcss,
  vercel,
  claudeCode,
  codex,
  javascript,
  typescript,
];

export function getEntity(slug: string): Entity | undefined {
  return entities.find(e => e.slug === slug);
}
