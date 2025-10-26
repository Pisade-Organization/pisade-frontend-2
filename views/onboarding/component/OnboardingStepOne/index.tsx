import PersonalInfoForm from "./PersonalInfoForm"
import TeachingInfo from "./TeachingInfo"
export default function OnboardingStepOne() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <PersonalInfoForm />
      <TeachingInfo />
    </div>
  )
}