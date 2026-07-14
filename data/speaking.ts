import fs from "node:fs";
import path from "node:path";
import type { SpeakingSession } from "@/types/speaking";

const SPEAKING_DIR = path.join(process.cwd(), "content", "speaking");

/**
 * Bangun path publik aset dari nama file relatif: `<file>` → `/speaking/<slug>/<file>`.
 * Semua aset satu sesi tinggal di satu folder = slug (lihat docs/speaking-assets.md),
 * jadi slug jadi base path dan konten cukup menyimpan nama file.
 * Path yang sudah absolut (`/…`) atau URL (`http…`) dibiarkan apa adanya (backward-compat).
 */
function resolveAssetSrc(slug: string, src: string): string {
  if (/^(https?:)?\//.test(src)) return src;
  return `/speaking/${slug}/${src}`;
}

/** Normalisasi src cover + images ke path lengkap; sisanya session dibiarkan utuh. */
function withResolvedAssets(session: SpeakingSession): SpeakingSession {
  return {
    ...session,
    cover: session.cover
      ? { ...session.cover, src: resolveAssetSrc(session.slug, session.cover.src) }
      : session.cover,
    images: session.images?.map(img => ({
      ...img,
      src: resolveAssetSrc(session.slug, img.src),
    })),
  };
}

/**
 * Auto-discovery: semua file di content/speaking otomatis dimuat.
 * Tambah speaking = buat satu file sesi; tidak ada file lain yang perlu diubah.
 * Nama file bebas — `slug` di objek session adalah sumber kebenaran URL.
 */
async function loadAllSpeaking(): Promise<SpeakingSession[]> {
  const files = fs.readdirSync(SPEAKING_DIR).filter(file => /\.tsx?$/.test(file));

  const sessions = await Promise.all(
    files.map(async file => {
      const name = file.replace(/\.tsx?$/, "");
      const mod = (await import(`@/content/speaking/${name}`)) as { session?: SpeakingSession };
      if (!mod.session?.slug) {
        throw new Error(`content/speaking/${file}: wajib meng-export "session" dengan slug.`);
      }
      return withResolvedAssets(mod.session);
    }),
  );

  // Guard: slug duplikat → gagalkan build, jangan diam-diam.
  const seen = new Map<string, string>();
  for (const session of sessions) {
    const existing = seen.get(session.slug);
    if (existing) {
      throw new Error(`Slug duplikat "${session.slug}" (${existing} & ${session.title}).`);
    }
    seen.set(session.slug, session.title);
  }

  return sessions;
}

let cache: Promise<SpeakingSession[]> | null = null;

/** Semua sesi speaking (internal/tooling). Dev tanpa cache agar file baru langsung terbaca. */
export function getAllSpeaking(): Promise<SpeakingSession[]> {
  if (process.env.NODE_ENV !== "production") return loadAllSpeaking();
  return (cache ??= loadAllSpeaking());
}

/** Urutan tampilan: tanggal terbaru dulu, lalu urutan waktu pada hari yang sama. */
export async function sortedSpeaking(): Promise<SpeakingSession[]> {
  const sessions = await getAllSpeaking();
  return [...sessions].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.timeLabel.localeCompare(b.timeLabel);
  });
}

export async function getSpeakingBySlug(slug: string): Promise<SpeakingSession | undefined> {
  const sessions = await getAllSpeaking();
  return sessions.find(s => s.slug === slug);
}

/** Sesi lain untuk section "More Speaking": exclude yang dibuka, terbaru dulu, maks `limit`. */
export async function getMoreSpeaking(excludeSlug: string, limit = 3): Promise<SpeakingSession[]> {
  const sessions = await sortedSpeaking();
  return sessions.filter(s => s.slug !== excludeSlug).slice(0, limit);
}
