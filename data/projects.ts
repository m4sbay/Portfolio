import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Auto-discovery: semua file di content/projects otomatis dimuat.
 * Tambah project = buat satu file project; tidak ada file lain yang perlu diubah.
 * Nama file bebas — `slug` di objek project adalah sumber kebenaran URL.
 */
async function loadAllProjects(): Promise<Project[]> {
  const files = fs.readdirSync(PROJECTS_DIR).filter(file => /\.tsx?$/.test(file));

  const projects = await Promise.all(
    files.map(async file => {
      const name = file.replace(/\.tsx?$/, "");
      const mod = (await import(`@/content/projects/${name}`)) as { project?: Project };
      if (!mod.project?.slug || !mod.project.status) {
        throw new Error(`content/projects/${file}: wajib meng-export "project" dengan slug & status.`);
      }
      return mod.project;
    }),
  );

  // Guard: slug duplikat → gagalkan build, jangan diam-diam.
  const seen = new Map<string, string>();
  for (const project of projects) {
    const existing = seen.get(project.slug);
    if (existing) {
      throw new Error(`Slug duplikat "${project.slug}" (${existing} & ${project.title}).`);
    }
    seen.set(project.slug, project.title);
  }

  return projects;
}

let cache: Promise<Project[]> | null = null;

/** Semua project apa pun statusnya (internal/tooling). Dev tanpa cache agar file baru langsung terbaca. */
export function getAllProjects(): Promise<Project[]> {
  if (process.env.NODE_ENV !== "production") return loadAllProjects();
  return (cache ??= loadAllProjects());
}

function byOrder(a: Project, b: Project): number {
  return a.order - b.order || a.title.localeCompare(b.title);
}

/** Hanya project published, urutan kurasi (order kecil dulu). Satu-satunya pintu data untuk tampilan publik. */
export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(project => project.status === "published").sort(byOrder);
}

/** Ada draft di studio? Dipakai teaser "bab berikutnya" di /work; detail draft tidak dibocorkan. */
export async function hasDraftProjects(): Promise<boolean> {
  const projects = await getAllProjects();
  return projects.some(project => project.status === "draft");
}

/** Project published by slug; draft/tidak ada → undefined (halaman detail 404). */
export async function getPublishedProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getPublishedProjects();
  return projects.find(project => project.slug === slug);
}
