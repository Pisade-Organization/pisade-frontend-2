"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMyProfile } from "@/hooks/settings/queries";
import { normalizeTutorRanking } from "@/lib/tutorRanking";

import AccountNavLinksContainer from "./AccountNavLinksContainer";
import GeneralNavLinksContainer from "./GeneralNavLinksContainer";
import TutorProfileContainer from "./TutorProfileContainer";
import type { TutorMenuLink } from "./types";

export default function TutorDashboardOverlay() {
  const pathname = usePathname();
  const { data } = useSession();
  const { data: profileData } = useMyProfile();
  const tutorUser = data?.user as {
    tutorRanking?: string;
    rating?: number;
    studentsCount?: number;
    lessonsCount?: number;
  } | undefined;

  const currentLocale = pathname?.split("/")?.[1] || "";
  const localePrefix = currentLocale ? `/${currentLocale}` : "";

  const generalLinks: TutorMenuLink[] = [
    { id: "home", label: "Home", href: `${localePrefix}/tutor/dashboard` },
    { id: "students", label: "Students", href: `${localePrefix}/tutor/students` },
    { id: "schedule", label: "Schedule", href: `${localePrefix}/tutor/schedule` },
    { id: "earnings", label: "Earnings & Withdrawals", href: `${localePrefix}/tutor/wallet` },
  ];

  const accountLinks: TutorMenuLink[] = [
    { id: "my-wallet", label: "My Wallet", href: `${localePrefix}/tutor/wallet` },
    { id: "my-profile", label: "My Profile", href: `${localePrefix}/settings/tutor/general` },
    { id: "account-settings", label: "Account settings", href: `${localePrefix}/settings/tutor` },
    { id: "safety-trust", label: "Safety & Trust", href: `${localePrefix}/settings/tutor/general` },
    { id: "helps", label: "Helps", href: `${localePrefix}/settings/tutor/general` },
  ];

  return (
    <div className="flex flex-col gap-4 py-3">
      <TutorProfileContainer
        fullName={data?.user?.fullName}
        email={data?.user?.email}
        avatarUrl={data?.user?.avatarUrl}
        timezone={profileData?.profile?.timezone ?? undefined}
        tutorRanking={normalizeTutorRanking(tutorUser?.tutorRanking) ?? undefined}
        rating={tutorUser?.rating}
        studentsCount={tutorUser?.studentsCount}
        lessonsCount={tutorUser?.lessonsCount}
      />

      <GeneralNavLinksContainer links={generalLinks} />

      <AccountNavLinksContainer links={accountLinks} />
    </div>
  );
}
