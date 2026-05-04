import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const TAG_33_REDIRECT =
  "https://www.maariv.co.il/Tags/%D7%91%D7%A0%D7%99%D7%9E%D7%99%D7%9F-%D7%A0%D7%AA%D7%A0%D7%99%D7%94%D7%95";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = /^\/tags\/(\d+)$/.exec(pathname);
  if (match?.[1] === "33") {
    return NextResponse.redirect(TAG_33_REDIRECT, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/tags/:path*"],
};
