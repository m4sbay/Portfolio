import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/types/project";
import { COVER_RATIO, COVER_RATIO_TOLERANCE } from "@/lib/cover";

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

  // Guard cover rasio kanonik (design system, lib/cover.ts): migration-friendly.
  // Dev → warning jelas tapi app tetap jalan; production/build → fail-loud agar standar terjaga.
  const offenders = projects
    .map(project => {
      const { width, height } = project.image;
      const ratio = width / height;
      return { project, width, height, ratio };
    })
    .filter(({ ratio }) => Math.abs(ratio - COVER_RATIO) > COVER_RATIO_TOLERANCE);

  if (offenders.length > 0) {
    const detail = offenders
      .map(({ project, width, height, ratio }) => `  • "${project.slug}": ${ratio.toFixed(3)} (${width}×${height})`)
      .join("\n");
    const message =
      `Cover tidak sesuai design system 3:2 (${COVER_RATIO.toFixed(3)} ±${COVER_RATIO_TOLERANCE}):\n${detail}\n` +
      `Export ulang cover ke 3:2 (mis. 2400×1600) & samakan width/height di content/projects.`;

    // Production/build → gagalkan; dev → warning agar migrasi aset bisa bertahap tanpa blokir.
    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    }
    console.warn(`\n⚠️  [cover-guard] ${message}\n`);
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
