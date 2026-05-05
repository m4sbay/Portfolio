import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SpotifyNowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function getAccessToken() {
  const clientId = requiredEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requiredEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = requiredEnv("SPOTIFY_REFRESH_TOKEN");

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify token error: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

export async function GET() {
  try {
    const token = await getAccessToken();
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (res.status === 204) {
      return NextResponse.json<SpotifyNowPlaying>({ isPlaying: false });
    }

    if (!res.ok) {
      return NextResponse.json<SpotifyNowPlaying>(
        { isPlaying: false },
        { status: res.status },
      );
    }

    type SpotifyArtist = { name?: string };
    type SpotifyPlayerJson = {
      is_playing?: boolean;
      progress_ms?: number;
      item?: {
        name?: string;
        artists?: SpotifyArtist[];
        album?: { images?: { url?: string }[] };
        external_urls?: { spotify?: string };
        duration_ms?: number;
      } | null;
    };

    const data = (await res.json()) as SpotifyPlayerJson;

    const isPlaying = Boolean(data?.is_playing);
    const item = data?.item;
    if (!isPlaying || !item) {
      return NextResponse.json<SpotifyNowPlaying>({ isPlaying: false });
    }

    const title = String(item?.name ?? "");
    const artist = Array.isArray(item?.artists)
      ? item.artists.map((a) => a?.name).filter(Boolean).join(", ")
      : "";
    const albumArt = item?.album?.images?.[0]?.url as string | undefined;
    const songUrl = item?.external_urls?.spotify as string | undefined;
    const progress = Number(data?.progress_ms ?? 0);
    const duration = Number(item?.duration_ms ?? 0);

    return NextResponse.json<SpotifyNowPlaying>({
      isPlaying: true,
      title,
      artist,
      albumArt,
      songUrl,
      progress,
      duration,
    });
  } catch {
    return NextResponse.json<SpotifyNowPlaying>({ isPlaying: false });
  }
}

