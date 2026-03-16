// middleware.ts
import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";
import { Role } from "./types/role.enum";

const authOnlyRoutes: string[] = [
  "/settings",
  "/messages",
];

const roleProtectedRoutes: Record<string, Role[]> = {
  "/tutor/dashboard": [Role.TUTOR],
  "/tutor/schedule": [Role.TUTOR],
  "/tutor/wallet": [Role.TUTOR],
  "/tutor/students": [Role.TUTOR],
  "/tutor/class-management": [Role.TUTOR],
  "/tutor/onboarding": [Role.TUTOR],
  "/settings/tutor": [Role.TUTOR],

  "/student/dashboard": [Role.STUDENT],
  "/student/schedule": [Role.STUDENT],
  "/student/tutors": [Role.STUDENT],
  "/student/wallet": [Role.STUDENT],
  "/class-management": [Role.STUDENT],
  "/settings/student": [Role.STUDENT],
  "/bookings": [Role.STUDENT],
  "/checkout": [Role.STUDENT],
};

function matchesRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function getRoleHome(locale: string, role?: Role): string {
  if (role === Role.STUDENT) {
    return `/${locale}/student/dashboard`;
  }

  if (role === Role.TUTOR) {
    return `/${locale}/tutor/dashboard`;
  }

  return `/${locale}`;
}

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

  const matchedRoleRoute = Object.keys(roleProtectedRoutes).find((route) =>
    matchesRoute(withoutLocale, route),
  );

  if (matchedRoleRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/signin`;
      return NextResponse.redirect(url);
    }

    const allowed = roleProtectedRoutes[matchedRoleRoute];
    const userRole = token.role as Role | undefined;

    if (!userRole || !allowed.includes(userRole)) {
      const url = request.nextUrl.clone();
      url.pathname = getRoleHome(locale, userRole);
      return NextResponse.redirect(url);
    }
  }

  const isAuthOnlyRoute = authOnlyRoutes.some((route) =>
    matchesRoute(withoutLocale, route),
  );

  if (isAuthOnlyRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/signin`;
      return NextResponse.redirect(url);
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
