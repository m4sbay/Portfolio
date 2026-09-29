/** Deteksi hanya pathname, bukan ekstensi di query/hash URL. */
export function getMediaType(src: string): "image" | "video" {
  return /\.mp4$/i.test(src.split(/[?#]/, 1)[0]) ? "video" : "image";
}

export function getMediaPreview(media: { src: string; poster?: string }): string | undefined {
  if (getMediaType(media.src) === "image") return media.src;
  return media.poster && getMediaType(media.poster) === "image" ? media.poster : undefined;
}
