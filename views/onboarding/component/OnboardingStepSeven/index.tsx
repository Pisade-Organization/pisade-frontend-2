import ChooseYourTimezone from "./ChooseYourTimezone"
import SetYourAvailability from "./SetYourAvailability"
export default function OnboardingStepSeven() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <ChooseYourTimezone />
      <SetYourAvailability />
    </div>
  )
}