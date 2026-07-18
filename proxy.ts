import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gerbang area admin. Matcher hanya mengenai sub-route /m4s/<segmen>, jadi
// halaman login /m4s sendiri tetap publik (kalau tidak, akan loop redirect).
// Endpoint /api/invoice/generate memvalidasi token yang sama secara terpisah.
export function proxy(request: NextRequest) {
  const token = request.cookies.get("masbay_admin")?.value;

  if (!token || token !== process.env.ADMIN_TOKEN) {
    const loginUrl = new URL("/m4s", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // `:path+` = satu segmen atau lebih → cocok untuk /m4s/invoice, bukan /m4s.
  matcher: "/m4s/:path+",
};
