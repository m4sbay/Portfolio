import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Login page itself is always accessible
  if (pathname === "/admin/login") return NextResponse.next();

  const cookie = request.cookies.get("masbay_admin");
  const expected = process.env.ADMIN_TOKEN;

  if (!expected || !cookie || cookie.value !== expected) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
