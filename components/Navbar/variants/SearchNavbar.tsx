import { Search } from "lucide-react"

import MobileMenu from "../../MobileMenu/MobileMenu"
import AuthButtons from "../AuthButtons"
import LanguageSwitcher from "../LanguageSwitcher"
import Logo from "../Logo"
import StudentProfileDropdown from "../shared/StudentProfileDropdown"
import TutorProfileDropdown from "../shared/TutorProfileDropdown"
import UserAvatar from "../UserAvatar"
import { Role } from "@/types/role.enum"

interface SearchNavbarProps {
  isAuth: boolean
  role?: Role
  localePrefix: string
  onLogoClick: () => void
  onSigninClick: () => void
  onBecomeTutorClick: () => void
  avatarUrl?: string
  fullName?: string
  email?: string
  timezone?: string
  totalBalance?: number
}

export default function SearchNavbar({
  isAuth,
  role,
  localePrefix,
  onLogoClick,
  onSigninClick,
  onBecomeTutorClick,
  avatarUrl,
  fullName,
  email,
  timezone,
  totalBalance,
}: SearchNavbarProps) {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-transparent absolute top-0 z-50">
      <Logo onClick={onLogoClick} />

      <div className="hidden lg:flex items-center gap-2">
        {isAuth ? (
          role === Role.STUDENT ? (
            <StudentProfileDropdown
              localePrefix={localePrefix}
              avatarUrl={avatarUrl ?? null}
              fullName={fullName ?? "Student"}
              email={email ?? "-"}
              timezone={timezone ?? "-"}
              totalBalance={totalBalance ?? 0}
            />
          ) : role === Role.TUTOR ? (
            <TutorProfileDropdown
              localePrefix={localePrefix}
              avatarUrl={avatarUrl}
              fullName={fullName}
            />
          ) : (
            <UserAvatar avatarUrl={avatarUrl} fullName={fullName} size={44} />
          )
        ) : (
          <>
            <LanguageSwitcher dark />
            <AuthButtons onSigninClick={onSigninClick} onBecomeTutorClick={onBecomeTutorClick} />
          </>
        )}
      </div>

      <div className="lg:hidden flex items-center">
        <button className="w-11 h-11 flex items-center justify-center">
          <Search size={20} color="white" />
        </button>
        <MobileMenu variant="search" />
      </div>
    </nav>
  )
}
