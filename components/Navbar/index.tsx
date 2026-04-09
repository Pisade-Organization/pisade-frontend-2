"use client"

import { useEffect, useState } from "react"
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
  const [stableSession, setStableSession] = useState(data)
  const [stableStatus, setStableStatus] = useState(status)
  const { data: myProfile } = useMyProfile()
  const { data: myWalletSummary } = useMyWalletSummary()

  useEffect(() => {
    if (status !== "loading") {
      setStableSession(data)
      setStableStatus(status)
    }
  }, [data, status])

  const sessionData = status === "loading" ? stableSession : data
  const sessionStatus = status === "loading" ? stableStatus : status
  const userRole = sessionData?.user?.role as Role | undefined

  const onLogoClick = () => router.push(localePrefix || "/")
  const onSigninClick = () => router.push(`${localePrefix}/signin`)
  const onBecomeTutorClick = () => router.push(`${localePrefix}/tutor/signup`)

  const isAuth = sessionStatus === "authenticated"
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
        avatarUrl={sessionData?.user?.avatarUrl}
        fullName={sessionData?.user?.fullName}
        email={sessionData?.user?.email}
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
        avatarUrl={sessionData?.user?.avatarUrl}
        fullName={sessionData?.user?.fullName}
        email={sessionData?.user?.email}
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
        avatarUrl={sessionData?.user?.avatarUrl}
        fullName={sessionData?.user?.fullName}
      />
    )
  }

  return (
    <TutorDetailNavbar
      onLogoClick={onLogoClick}
      onSigninClick={onSigninClick}
      isAuth={isAuth}
    />
  )
}
