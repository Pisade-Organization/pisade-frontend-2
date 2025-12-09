"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Search } from "lucide-react"

import BaseButton from "../base/BaseButton"
import MobileMenu from "../MobileMenu/MobileMenu"
import { PisadeLogo } from "../icons"
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
  const { data, status } = useSession()

  const onLogoClick = () => router.push("/")
  const onSigninClick = () => router.push("/signin")

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
              <UserAvatar avatarUrl={data?.user?.avatarUrl} fullName={data?.user?.fullName} />
            </>
          ) : (
            <>
              <LanguageSwitcher dark />
              <AuthButtons onSigninClick={onSigninClick} />
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
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-x-20">
        <Logo dark onClick={onLogoClick} />

        {variant === "student_dashboard" && (
          <div className="flex gap-7">
            <div>Class</div>
            <div>Schedule</div>
          </div>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <LanguageSwitcher />
        {variant === "tutor_detail" && (
          <>
            <BaseButton variant="secondary" typeStyle="borderless">Sign Up</BaseButton>
            <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
          </>
        )}
        {variant === "student_dashboard" && (
          <>
            <DashboardActions />
            <PisadeLogo width={44} height={44} className="w-11 h-11 rounded-full" alt="Profile picture" />
          </>
        )}
      </div>

      <div className="lg:hidden flex items-center">
        <MobileMenu variant={variant} />
      </div>
    </nav>
  )
}
