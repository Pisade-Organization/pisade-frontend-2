"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Bell, MessageCircle, Search } from "lucide-react"

import BaseButton from "../base/BaseButton"
import MobileMenu from "../MobileMenu/MobileMenu"
import Logo from "./Logo"
import AuthButtons from "./AuthButtons"
import DashboardActions from "./DashboardActions"
import LanguageSwitcher from "./LanguageSwitcher"
import UserAvatar from "./UserAvatar"

type NavbarProps = {
  variant?: "search" | "tutor_detail" | "student_dashboard" | "tutor_dashboard"
}

// ------------------ Main Navbar ------------------ //
export default function Navbar({ variant = "search" }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  // preserve current locale when programmatically navigating
  const currentLocale = pathname?.split('/')?.[1] || ''
  const localePrefix = currentLocale ? `/${currentLocale}` : ''
  const { data, status } = useSession()

  const onLogoClick = () => router.push("/")
  const onSigninClick = () => router.push("/signin")
  const onBecomeTutorClick = () => router.push("/tutor/signup")

  // Prevent hydration flicker - rely on hydration gate
  if (status === "loading") return null

  const isAuth = status === "authenticated"
  // ------------------ Variants ------------------ //
  if (variant === "search") {
    return (
      <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-transparent absolute top-0 z-50">
        <Logo onClick={onLogoClick} />
        <div className="hidden lg:flex items-center gap-2">
          {isAuth ? (
            <>
              <UserAvatar avatarUrl={data?.user?.avatarUrl} fullName={data?.user?.fullName} size={44} />
            </>
          ) : (
            <>
              <LanguageSwitcher dark />
              <AuthButtons
                onSigninClick={onSigninClick}
                onBecomeTutorClick={onBecomeTutorClick}
              />
            </>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button className="w-11 h-11 flex items-center justify-center">
            <Search size={20} color="white" />
          </button>
          <MobileMenu variant={variant} />
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-white ${
        variant === "student_dashboard" ? "border-b-0 lg:border-b border-gray-200" : "border-b border-gray-200"
      }`}
    >
      <div className="flex items-center gap-x-20">
        <Logo dark onClick={onLogoClick} />

        {variant === "student_dashboard" && (
          <div className="hidden lg:flex gap-7">
              <button
                className={pathname?.endsWith("/student/dashboard") ? "text-electric-violet-600" : "text-neutral-900"}
                onClick={() => router.push(`${localePrefix}/student/dashboard`)}
              >
                Home
              </button>
              <button
                className={pathname?.includes("/student/tutors") ? "text-electric-violet-600" : "text-neutral-900"}
                onClick={() => router.push(`${localePrefix}/student/tutors`)}
              >
                Tutors
              </button>
              <button
                className={pathname?.includes("/class-management") ? "text-electric-violet-600" : "text-neutral-900"}
                onClick={() => router.push(`${localePrefix}/class-management`)}
              >
                Class
              </button>
              <button
                className={pathname?.includes("/student/schedule") ? "text-electric-violet-600" : "text-neutral-900"}
                onClick={() => router.push(`${localePrefix}/student/schedule`)}
              >
                Schedule
              </button>
          </div>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <LanguageSwitcher studentStyle={variant === "student_dashboard"} />
        {variant === "tutor_detail" && (
          <>
            <BaseButton variant="secondary" typeStyle="borderless">Sign Up</BaseButton>
            <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
          </>
        )}
        {variant === "student_dashboard" && (
          <>
            <DashboardActions />
            <UserAvatar avatarUrl={data?.user?.avatarUrl} fullName={data?.user?.fullName} size={44} />
          </>
        )}
      </div>

      {variant === "student_dashboard" ? (
        <div className="lg:hidden flex items-center gap-2">
          <button className="w-11 h-11 flex items-center justify-center" aria-label="Messages">
            <MessageCircle size={20} className="text-neutral-700" />
          </button>
          <button className="w-11 h-11 flex items-center justify-center" aria-label="Notifications">
            <Bell size={20} className="text-neutral-700" />
          </button>
          <MobileMenu variant={variant} />
        </div>
      ) : (
        <div className="lg:hidden flex items-center">
          <MobileMenu variant={variant} />
        </div>
      )}
    </nav>
  )
}
