import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json() as { password: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminPassword || !adminToken) {
    return NextResponse.json({ error: "Server tidak dikonfigurasi dengan benar." }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("masbay_admin", adminToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    sameSite: "strict",
  });
  return res;
}
