"use client"

import { useTranslations } from "next-intl"
import Logo from "../Logo"
import { getTutorDashboardNavItems } from "../config"
import DashboardMobileActions from "../shared/DashboardMobileActions"
import DashboardNavLinks from "../shared/DashboardNavLinks"
import DashboardRightActionsContent from "../shared/DashboardRightActions"

interface TutorDashboardNavbarProps {
  pathname?: string | null
  localePrefix: string
  onLogoClick: () => void
  onNavigate: (path: string) => void
  onSigninClick: () => void
  onMessagesClick: () => void
  avatarUrl?: string
  fullName?: string
}

export default function TutorDashboardNavbar({
  pathname,
  localePrefix,
  onLogoClick,
  onNavigate,
  onSigninClick,
  onMessagesClick,
  avatarUrl,
  fullName,
}: TutorDashboardNavbarProps) {
  const t = useTranslations("nav")
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-white border-b border-gray-200">
      <div className="flex items-center gap-x-20">
        <Logo dark onClick={onLogoClick} />
        <DashboardNavLinks
          items={getTutorDashboardNavItems(localePrefix, t)}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      </div>

      <DashboardRightActionsContent
        variant="tutor_dashboard"
        localePrefix={localePrefix}
        onSigninClick={onSigninClick}
        onMessagesClick={onMessagesClick}
        avatarUrl={avatarUrl}
        fullName={fullName}
      />

      <DashboardMobileActions variant="tutor_dashboard" onMessagesClick={onMessagesClick} />
    </nav>
  )
}
