import { Role } from "@/types/role.enum";

function getAdminAppUrl() {
  return process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
}

function isTutorApproved(onboardingStatus?: string) {
  return onboardingStatus === "APPROVED";
}

function isTutorReviewing(onboardingStatus?: string) {
  return onboardingStatus === "REVIEWING";
}

export function getPostAuthPath(pathname: string, role?: string, onboardingStatus?: string) {
  const locale = pathname?.split("/")?.[1];
  const safeLocale = locale === "en" || locale === "th" ? locale : "en";

  if (role === Role.ADMIN) {
    return getAdminAppUrl();
  }

  if (role === Role.TUTOR) {
    if (isTutorReviewing(onboardingStatus)) {
      return `/${safeLocale}/tutor/onboarding/success`;
    }

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
