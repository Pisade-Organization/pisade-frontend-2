import BaseButton from "../base/BaseButton"

export default function AuthButtons({ onSigninClick }: { onSigninClick: () => void }) {
  return (
    <>
      <BaseButton variant="secondary" typeStyle="outline" className="text-white border-white/50 hover:bg-transparent">
        Become a tutor
      </BaseButton>
      <BaseButton onClick={onSigninClick}>Sign In</BaseButton>
    </>
  )
}


