"use client"

import { signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import {
  Calendar,
  CalendarPlus2,
  CircleHelp,
  Glasses,
  Heart,
  House,
  LogOut,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  UsersRound,
  Wallet,
  WalletMinimal,
  type LucideIcon,
} from "lucide-react"
import { ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useMyProfile, useMyTutorProfile, useMyWalletSummary } from "@/hooks/settings/queries"
import { normalizeTutorRanking } from "@/lib/tutorRanking"
import { resolveUserAvatarUrl } from "@/lib/avatar"
import { Role } from "@/types/role.enum"
import TutorProfileContainer from "./TutorDashboardOverlay/TutorProfileContainer"

type SearchOverlayNavItem = {
  label: string
  icon: LucideIcon
  href: string
}

export default function SearchOverlay() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")[1] || "en"
  const localePrefix = `/${locale}`
  const { data, status } = useSession()
  const { data: profileData } = useMyProfile()
  const { data: tutorProfileData } = useMyTutorProfile()
  const { data: myWalletSummary } = useMyWalletSummary()
  const isTutor = data?.user?.role === Role.TUTOR
  const displayBalance = `฿${(myWalletSummary?.balance ?? 0).toLocaleString("en-US")}`
  const avatarUrl = resolveUserAvatarUrl(profileData?.profile?.avatarUrl, data?.user?.avatarUrl)

  const generalItems: SearchOverlayNavItem[] = status === "authenticated"
    ? isTutor
      ? [
          { label: t("nav.tutor.home"), icon: House, href: `${localePrefix}/tutor/dashboard` },
          { label: t("nav.tutor.students"), icon: UsersRound, href: `${localePrefix}/tutor/students/active` },
          { label: t("nav.tutor.schedule"), icon: CalendarPlus2, href: `${localePrefix}/tutor/schedule` },
          { label: t("nav.tutor.earnings"), icon: Wallet, href: `${localePrefix}/tutor/earnings-and-withdrawals` },
        ]
      : [
          { label: t("nav.student.home"), icon: House, href: `${localePrefix}/student/dashboard` },
          { label: t("nav.student.tutors"), icon: UsersRound, href: `${localePrefix}/student/tutors/current` },
          { label: t("nav.student.class"), icon: Glasses, href: `${localePrefix}/class-management` },
          { label: t("nav.student.schedule"), icon: CalendarPlus2, href: `${localePrefix}/student/schedule` },
        ]
    : [{ label: t("mobile.findTutors"), icon: Search, href: localePrefix }]

  const accountItems: SearchOverlayNavItem[] = status === "authenticated"
    ? isTutor
      ? [
          { label: t("profile.tutor.earnings"), icon: Wallet, href: `${localePrefix}/tutor/earnings-and-withdrawals` },
          { label: t("profile.tutor.myProfile"), icon: Pencil, href: `${localePrefix}/settings/tutor/general` },
          { label: t("profile.tutor.accountSettings"), icon: Settings, href: `${localePrefix}/settings/tutor` },
          { label: t("profile.student.transactions"), icon: WalletMinimal, href: `${localePrefix}/tutor/earnings-and-withdrawals` },
          { label: "Safety & Trust", icon: ShieldCheck, href: `${localePrefix}/settings/tutor/general` },
          { label: "Helps", icon: CircleHelp, href: `${localePrefix}/settings/tutor/general` },
        ]
      : [
          { label: t("profile.student.myWallet"), icon: Wallet, href: `${localePrefix}/student/wallet` },
          { label: t("profile.student.accountSettings"), icon: Settings, href: `${localePrefix}/settings/student` },
          { label: t("profile.student.savedTutor"), icon: Heart, href: `${localePrefix}/student/tutors/favorites` },
          { label: t("profile.student.transactions"), icon: WalletMinimal, href: `${localePrefix}/settings/student/payment-history` },
          { label: "Safety & Trust", icon: ShieldCheck, href: `${localePrefix}/settings/student/general` },
          { label: "Helps", icon: CircleHelp, href: `${localePrefix}/settings/student/general` },
        ]
    : []

  return (
    <div className="py-3 flex flex-col gap-5">
      
      {status === "unauthenticated" && (
        <div className="rounded-xl border border-neutral-50 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Typography variant="title-1" color="neutral-900">
              {t("mobile.personalizedLearning")}
            </Typography>

            <Typography variant="body-3" color="neutral-500">
              {t("mobile.joinUs")}
            </Typography>
          </div>

          <div className="flex gap-2">
            <BaseButton typeStyle="outline" className="w-full" onClick={() => router.push(`/${locale}/tutor/signup`)}>
              {t("mobile.becomeTutor")}
            </BaseButton>

            <BaseButton className="w-full" onClick={() => router.push(`/${locale}/signin`)}>
              {t("mobile.signIn")}
            </BaseButton>
          </div>
        </div>
      )}

      {status === "authenticated" && (
        isTutor ? (
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
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="rounded-full p-1 relative">
                <Image
                  src={avatarUrl || "/images/avatars/default-avatar.svg"}
                  alt={`${data.user.fullName}'s Profile Picture`}
                  width={86}
                  height={86}
                  className="rounded-full"
                />
                <button className="p-2.5 absolute right-0 bottom-0 rounded-full border-[1.5px] border-neutral-50 bg-white flex justify-center items-center">
                  <Pencil className="w-3 h-3 text-neutral-600" />
                </button>
              </div>

              <div className="flex flex-col">
                <Typography variant="title-1" color="neutral-900">{data.user.fullName}</Typography>
                <Typography variant="body-3" color="neutral-500">{data.user.email}</Typography>
                <Typography variant="body-3" color="neutral-300">{profileData?.profile?.timezone ?? "-"}</Typography>
              </div>
            </div>

            <div className="p-3 flex flex-col gap-3 border-[1.5px] border-neutral-50 rounded-xl">
              <div className="flex justify-between items-center">
                <Typography variant="body-3" color="neutral-500">{t("profile.student.totalBalance")}</Typography>
                <Typography variant="title-1" color="deep-royal-indigo-500">{displayBalance}</Typography>
              </div>

              <BaseButton onClick={() => router.push(`${localePrefix}/student/wallet`)}>
                {t("profile.student.topUpWallet")}
              </BaseButton>
            </div>
          </div>
        )
      )}

      {/* GENERAL SECTION */}
      <div className="flex flex-col gap-4">
        <Typography variant="title-2" color="neutral-900">
          {t("common.general")}
        </Typography>

        <div className="flex flex-col gap-3">
          {generalItems.map(({ label, icon: Icon, href }, index, items) => (
            <div key={label} className="flex flex-col gap-3">
              <button
                type="button"
                className="flex justify-between text-left"
                onClick={() => router.push(href)}
              >
                <div className="flex gap-2">
                  <Icon size={20} className="text-neutral-200" />
                  <Typography variant="body-3" color="neutral-900">{label}</Typography>
                </div>
                <ChevronRight size={20} className="text-neutral-200" />
              </button>

              {index < items.length - 1 && <div className="w-full border-t border-neutral-50" />}
            </div>
          ))}

        </div>
      </div>

      {status === "authenticated" && (
        <div className="flex flex-col gap-4">
          <Typography variant="title-2" color="neutral-900">
            {t("common.account")}
          </Typography>

          <div className="flex flex-col gap-3">
            {accountItems.map(({ label, icon: Icon, href }, index, items) => (
              <div key={label} className="flex flex-col gap-3">
                <button
                  type="button"
                  className="flex justify-between text-left"
                  onClick={() => router.push(href)}
                >
                  <div className="flex gap-2">
                    <Icon size={20} className="text-neutral-200" />
                    <Typography variant="body-3" color="neutral-900">{label}</Typography>
                  </div>
                  <ChevronRight size={20} className="text-neutral-200" />
                </button>

                {index < items.length - 1 && <div className="w-full border-t border-neutral-50" />}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="flex justify-center items-center gap-2 py-1"
            onClick={() => {
              void signOut({ callbackUrl: `${localePrefix}/signin` })
            }}
          >
            <LogOut className="w-5 h-5 text-red-normal" />
            <Typography variant="body-3" color="red-normal">{t("mobile.logOut")}</Typography>
          </button>
        </div>
      )}

      {status !== "authenticated" && (
        <div className="flex flex-col gap-4">
          <Typography variant="title-2" color="neutral-900">
            {t("mobile.other.title")}
          </Typography>

          <div className="flex flex-col gap-3">

            {/* TERMS OF USE */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Search size={20} className="text-neutral-200" />
                <Typography variant="body-3" color="neutral-900">{t("mobile.other.termsOfUse")}</Typography>
              </div>
              <ChevronRight size={20} className="text-neutral-200" />
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-neutral-50"/>

            {/* PRIVACY POLICY */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Calendar size={20} className="text-neutral-200" />
                <Typography variant="body-3" color="neutral-900">{t("mobile.other.privacyPolicy")}</Typography>
              </div>
              <ChevronRight size={20} className="text-neutral-200" />
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-neutral-50"/>

          </div>
        </div>
      )}
    </div>
  )
}
