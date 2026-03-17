import { Role } from "@/types/role.enum";

function isTutorApproved(onboardingStatus?: string) {
  return onboardingStatus === "APPROVED";
}

export function getPostAuthPath(pathname: string, role?: string, onboardingStatus?: string) {
  const locale = pathname?.split("/")?.[1];
  const safeLocale = locale === "en" || locale === "th" ? locale : "en";

  if (role === Role.TUTOR) {
    if (!isTutorApproved(onboardingStatus)) {
      return `/${safeLocale}/tutor/onboarding`;
    }

    return `/${safeLocale}/tutor/dashboard`;
  }

  if (role === Role.STUDENT) {
    return `/${safeLocale}/student/dashboard`;
  }

  return `/${safeLocale}`;
}
