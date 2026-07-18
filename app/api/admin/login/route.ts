import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

// Perbandingan waktu-konstan agar selisih waktu respons tidak membocorkan
// panjang/isi password. Hash dulu ke digest 32-byte tetap supaya
// timingSafeEqual tidak melempar saat panjang input berbeda.
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: Request) {
  const { password } = await request.json() as { password: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminPassword || !adminToken) {
    return NextResponse.json({ error: "Server tidak dikonfigurasi dengan benar." }, { status: 500 });
  }

  if (typeof password !== "string" || !safeEqual(password, adminPassword)) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("masbay_admin", adminToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
