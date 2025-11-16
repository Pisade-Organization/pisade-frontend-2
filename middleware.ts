// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";
import { Role } from "./types/role.enum";

const protectedRoutes: Record<string, Role[]> = {
  "/tutor/onboarding": [Role.TUTOR],
};

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

  const locale = pathname.split("/")[1] || routing.defaultLocale;
  const withoutLocale = pathname.replace(/^\/(en|th)/, "");

  for (const route in protectedRoutes) {
    if (
      withoutLocale === route ||
      withoutLocale.startsWith(`${route}/`)
    ) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/signin`;
        return NextResponse.redirect(url);
      }

      const allowed = protectedRoutes[route];
      const userRole = token.role as Role | undefined;

      if (!userRole || !allowed.includes(userRole)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}`;
        return NextResponse.redirect(url);
      }
    }
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
