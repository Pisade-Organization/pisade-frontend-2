import { Search } from "lucide-react"

import MobileMenu from "../../MobileMenu/MobileMenu"
import AuthButtons from "../AuthButtons"
import LanguageSwitcher from "../LanguageSwitcher"
import Logo from "../Logo"
import UserAvatar from "../UserAvatar"

interface SearchNavbarProps {
  isAuth: boolean
  onLogoClick: () => void
  onSigninClick: () => void
  onBecomeTutorClick: () => void
  avatarUrl?: string
  fullName?: string
}

export default function SearchNavbar({
  isAuth,
  onLogoClick,
  onSigninClick,
  onBecomeTutorClick,
  avatarUrl,
  fullName,
}: SearchNavbarProps) {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-transparent absolute top-0 z-50">
      <Logo onClick={onLogoClick} />

      <div className="hidden lg:flex items-center gap-2">
        {isAuth ? (
          <UserAvatar avatarUrl={avatarUrl} fullName={fullName} size={44} />
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
