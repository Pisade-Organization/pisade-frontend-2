import MobileMenu from "../../MobileMenu/MobileMenu"
import Logo from "../Logo"
import DashboardRightActionsContent from "../shared/DashboardRightActions"

interface TutorDetailNavbarProps {
  onLogoClick: () => void
  onSigninClick: () => void
}

export default function TutorDetailNavbar({ onLogoClick, onSigninClick }: TutorDetailNavbarProps) {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 bg-white border-b border-gray-200">
      <div className="flex items-center gap-x-20">
        <Logo dark onClick={onLogoClick} />
      </div>

      <DashboardRightActionsContent
        variant="tutor_detail"
        localePrefix=""
        onSigninClick={onSigninClick}
        onMessagesClick={() => {}}
      />

      <div className="lg:hidden flex items-center">
        <MobileMenu variant="tutor_detail" />
      </div>
    </nav>
  )
}
