"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useMyProfile, useMyWalletSummary } from "@/hooks/settings/queries"
import { Role } from "@/types/role.enum"

import type { NavbarVariant } from "./types"
import SearchNavbar from "./variants/SearchNavbar"
import StudentDashboardNavbar from "./variants/StudentDashboardNavbar"
import TutorDashboardNavbar from "./variants/TutorDashboardNavbar"
import TutorDetailNavbar from "./variants/TutorDetailNavbar"

type NavbarProps = {
  variant?: NavbarVariant
}

// ------------------ Main Navbar ------------------ //
export default function Navbar({ variant = "search" }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  // preserve current locale when programmatically navigating
  const currentLocale = pathname?.split('/')?.[1] || ''
  const localePrefix = currentLocale ? `/${currentLocale}` : ''
  const { data, status } = useSession()
  const { data: myProfile } = useMyProfile()
  const { data: myWalletSummary } = useMyWalletSummary()
  const userRole = data?.user?.role as Role | undefined

  const onLogoClick = () => router.push("/")
  const onSigninClick = () => router.push("/signin")
  const onBecomeTutorClick = () => router.push("/tutor/signup")

  // Prevent hydration flicker - rely on hydration gate
  if (status === "loading") return null

  const isAuth = status === "authenticated"
  const onMessagesClick = () => router.push(`${localePrefix}/messages`)
  const onNavigate = (path: string) => router.push(path)

  if (variant === "search") {
    return (
      <SearchNavbar
        isAuth={isAuth}
        role={userRole}
        localePrefix={localePrefix}
        onLogoClick={onLogoClick}
        onSigninClick={onSigninClick}
        onBecomeTutorClick={onBecomeTutorClick}
        avatarUrl={data?.user?.avatarUrl}
        fullName={data?.user?.fullName}
        email={data?.user?.email}
        timezone={myProfile?.profile?.timezone ?? undefined}
        totalBalance={myWalletSummary?.balance ?? 0}
      />
    )
  }

  if (variant === "student_dashboard") {
    return (
      <StudentDashboardNavbar
        pathname={pathname}
        localePrefix={localePrefix}
        onLogoClick={onLogoClick}
        onNavigate={onNavigate}
        onSigninClick={onSigninClick}
        onMessagesClick={onMessagesClick}
        avatarUrl={data?.user?.avatarUrl}
        fullName={data?.user?.fullName}
        email={data?.user?.email}
        timezone={myProfile?.profile?.timezone ?? undefined}
        totalBalance={myWalletSummary?.balance ?? 0}
      />
    )
  }

  if (variant === "tutor_dashboard") {
    return (
      <TutorDashboardNavbar
        pathname={pathname}
        localePrefix={localePrefix}
        onLogoClick={onLogoClick}
        onNavigate={onNavigate}
        onSigninClick={onSigninClick}
        onMessagesClick={onMessagesClick}
        avatarUrl={data?.user?.avatarUrl}
        fullName={data?.user?.fullName}
      />
    )
  }

  return <TutorDetailNavbar onLogoClick={onLogoClick} onSigninClick={onSigninClick} />
}
