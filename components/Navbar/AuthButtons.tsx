import BaseButton from "../base/BaseButton"

interface AuthButtonsProps {
  onSigninClick: () => void
  onBecomeTutorClick: () => void
}

export default function AuthButtons({ onSigninClick, onBecomeTutorClick }: AuthButtonsProps) {
  return (
    <>
      <BaseButton
        variant="secondary"
        typeStyle="outline"
        className="text-white border-white/50 hover:bg-transparent"
        onClick={onBecomeTutorClick}
      >
        Become a tutor
      </BaseButton>
      <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
    </>
  )
}

