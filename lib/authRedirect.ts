import { routing } from "@/i18n/routing";

const authOnlyRoutes: string[] = [
  "/settings",
  "/messages",
];

const roleProtectedRoutes: string[] = [
  "/tutor/dashboard",
  "/tutor/schedule",
  "/tutor/earnings-and-withdrawals",
  "/tutor/students",
  "/tutor/class-management",
  "/tutor/onboarding",
  "/settings/tutor",
  "/student/dashboard",
  "/student/schedule",
  "/student/tutors",
  "/student/wallet",
  "/class-management",
  "/settings/student",
  "/bookings",
  "/checkout",
];

function matchesRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function getLocaleFromPathname(pathname?: string | null): string {
  const locale = pathname?.split("/")[1];

  return routing.locales.includes(locale as (typeof routing.locales)[number])
    ? locale!
    : routing.defaultLocale;
}

export function stripLocaleFromPathname(pathname?: string | null): string {
  if (!pathname) {
    return "";
  }

  return pathname.replace(/^\/(en|th)(?=\/|$)/, "") || "";
}

export function getLocalizedSignInPath(pathname?: string | null): string {
  return `/${getLocaleFromPathname(pathname)}/signin`;
}

export function isAuthPage(pathname?: string | null): boolean {
  const withoutLocale = stripLocaleFromPathname(pathname);

  return [
    "/signin",
    "/signout",
    "/auth",
  ].some((route) => matchesRoute(withoutLocale, route));
}

export function requiresAuthenticatedSession(pathname?: string | null): boolean {
  const withoutLocale = stripLocaleFromPathname(pathname);

  return [...authOnlyRoutes, ...roleProtectedRoutes].some((route) =>
    matchesRoute(withoutLocale, route),
  );
}
