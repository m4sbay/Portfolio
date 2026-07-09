import type { Entity } from "@/types/entity";
import { entity as ruangTambah } from "@/content/entities/ruang-tambah";
import { entity as kopkit } from "@/content/entities/kopkit";

/** Registry terpusat. Nambah entity cukup nambah satu file di content/entities. */
export const entities: Entity[] = [ruangTambah, kopkit];

export function getEntity(slug: string): Entity | undefined {
  return entities.find(e => e.slug === slug);
}
