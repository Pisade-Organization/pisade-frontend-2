import Logo from "../Logo"
import { getStudentDashboardNavItems } from "../config"
import DashboardMobileActions from "../shared/DashboardMobileActions"
import DashboardNavLinks from "../shared/DashboardNavLinks"
import DashboardRightActionsContent from "../shared/DashboardRightActions"

interface StudentDashboardNavbarProps {
  pathname?: string | null
  localePrefix: string
  onLogoClick: () => void
  onNavigate: (path: string) => void
  onSigninClick: () => void
  onMessagesClick: () => void
  avatarUrl?: string
  fullName?: string
  email?: string
  timezone?: string
  totalBalance?: number
}

export default function StudentDashboardNavbar({
  pathname,
  localePrefix,
  onLogoClick,
  onNavigate,
  onSigninClick,
  onMessagesClick,
  avatarUrl,
  fullName,
  email,
  timezone,
  totalBalance,
}: StudentDashboardNavbarProps) {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-white border-b-0 lg:border-b border-gray-200">
      <div className="flex items-center gap-x-20">
        <Logo dark onClick={onLogoClick} />
        <DashboardNavLinks
          items={getStudentDashboardNavItems(localePrefix)}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      </div>

      <DashboardRightActionsContent
        variant="student_dashboard"
        localePrefix={localePrefix}
        onSigninClick={onSigninClick}
        onMessagesClick={onMessagesClick}
        avatarUrl={avatarUrl}
        fullName={fullName}
        email={email}
        timezone={timezone}
        totalBalance={totalBalance}
      />

      <DashboardMobileActions variant="student_dashboard" onMessagesClick={onMessagesClick} />
    </nav>
  )
}
