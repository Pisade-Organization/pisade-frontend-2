import BaseButton from "../../base/BaseButton"
import DashboardActions from "../DashboardActions"
import LanguageSwitcher from "../LanguageSwitcher"
import StudentProfileDropdown from "./StudentProfileDropdown"
import TutorProfileDropdown from "./TutorProfileDropdown"
import type { NavbarVariant } from "../types"

interface DashboardRightActionsProps {
  variant: NavbarVariant
  localePrefix: string
  onSigninClick: () => void
  onMessagesClick: () => void
  avatarUrl?: string
  fullName?: string
  email?: string
  timezone?: string
  totalBalance?: number
}

export default function DashboardRightActionsContent({
  variant,
  localePrefix,
  onSigninClick,
  onMessagesClick,
  avatarUrl,
  fullName,
  email,
  timezone,
  totalBalance,
}: DashboardRightActionsProps) {
  const isDashboardVariant = variant === "student_dashboard" || variant === "tutor_dashboard"

  return (
    <div className="hidden lg:flex items-center gap-3">
      <LanguageSwitcher studentStyle={isDashboardVariant} />

      {variant === "tutor_detail" && (
        <>
          <BaseButton variant="secondary" typeStyle="borderless">
            Sign Up
          </BaseButton>
          <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
        </>
      )}

      {isDashboardVariant && (
        <>
          <DashboardActions
            variant={variant === "student_dashboard" ? "student_dashboard" : "tutor_dashboard"}
            onMessagesClick={onMessagesClick}
          />
          {variant === "student_dashboard" ? (
            <StudentProfileDropdown
              localePrefix={localePrefix}
              avatarUrl={avatarUrl ?? null}
              fullName={fullName ?? "Student"}
              email={email ?? "-"}
              timezone={timezone ?? "-"}
              totalBalance={totalBalance ?? 0}
            />
          ) : (
            <TutorProfileDropdown
              localePrefix={localePrefix}
              avatarUrl={avatarUrl}
              fullName={fullName}
            />
          )}
        </>
      )}
    </div>
  )
}
