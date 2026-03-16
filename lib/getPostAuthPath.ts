import { Role } from "@/types/role.enum";

export function getPostAuthPath(pathname: string, role?: string) {
  const locale = pathname?.split("/")?.[1];
  const safeLocale = locale === "en" || locale === "th" ? locale : "en";

  if (role === Role.TUTOR) {
    return `/${safeLocale}/tutor/dashboard`;
  }

  if (role === Role.STUDENT) {
    return `/${safeLocale}/student/dashboard`;
  }

  return `/${safeLocale}`;
}
