"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMyProfile, useMyTutorProfile } from "@/hooks/settings/queries";
import { resolveUserAvatarUrl } from "@/lib/avatar";
import { normalizeTutorRanking } from "@/lib/tutorRanking";

import AccountNavLinksContainer from "./AccountNavLinksContainer";
import GeneralNavLinksContainer from "./GeneralNavLinksContainer";
import TutorProfileContainer from "./TutorProfileContainer";
import type { TutorMenuLink } from "./types";

export default function TutorDashboardOverlay() {
  const t = useTranslations();
  const pathname = usePathname();
  const { data } = useSession();
  const { data: profileData } = useMyProfile();
  const { data: tutorProfileData } = useMyTutorProfile();
  const avatarUrl = resolveUserAvatarUrl(profileData?.profile?.avatarUrl, data?.user?.avatarUrl);

  const currentLocale = pathname?.split("/")?.[1] || "";
  const localePrefix = currentLocale ? `/${currentLocale}` : "";

  const generalLinks: TutorMenuLink[] = [
    { id: "home", label: t("nav.tutor.home"), href: `${localePrefix}/tutor/dashboard` },
    { id: "students", label: t("nav.tutor.students"), href: `${localePrefix}/tutor/students/active` },
    { id: "schedule", label: t("nav.tutor.schedule"), href: `${localePrefix}/tutor/schedule` },
    { id: "earnings", label: t("nav.tutor.earnings"), href: `${localePrefix}/tutor/earnings-and-withdrawals` },
  ];

  const accountLinks: TutorMenuLink[] = [
    { id: "my-wallet", label: t("profile.tutor.earnings"), href: `${localePrefix}/tutor/earnings-and-withdrawals` },
    { id: "my-profile", label: t("profile.tutor.myProfile"), href: `${localePrefix}/settings/tutor/general` },
    { id: "account-settings", label: t("profile.tutor.accountSettings"), href: `${localePrefix}/settings/tutor` },
    { id: "safety-trust", label: "Safety & Trust", href: `${localePrefix}/settings/tutor/general` },
    { id: "helps", label: "Helps", href: `${localePrefix}/settings/tutor/general` },
  ];

  return (
    <div className="flex flex-col gap-4 py-3">
      <TutorProfileContainer
        fullName={data?.user?.fullName}
        email={data?.user?.email}
        avatarUrl={avatarUrl}
        timezone={profileData?.profile?.timezone ?? undefined}
        tutorRanking={normalizeTutorRanking(tutorProfileData?.tutorRanking) ?? undefined}
        rating={tutorProfileData?.avgRating}
        studentsCount={tutorProfileData?.studentsCount}
        lessonsCount={tutorProfileData?.lessonsCount}
      />

      <GeneralNavLinksContainer links={generalLinks} title={t("common.general")} />

      <AccountNavLinksContainer links={accountLinks} title={t("common.account")} />
    </div>
  );
}
