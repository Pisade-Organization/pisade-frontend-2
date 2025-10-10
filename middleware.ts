// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the middleware from your routing config
const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ If path does not start with a supported locale, redirect to default (/en)
  if (!pathname.startsWith("/en") && !pathname.startsWith("/th")) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // 🌐 Let next-intl handle locale routing (e.g. /en, /th)
  return handleI18nRouting(request);
}

// ✅ Match all routes except Next.js internals and static assets
export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
