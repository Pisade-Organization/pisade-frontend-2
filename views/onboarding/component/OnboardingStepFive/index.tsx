import Guidelines from "./Guidelines"
import OnboardingStepFiveForm from "./Form"
export default function OnboardingStepFive() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <Guidelines />
      <OnboardingStepFiveForm />
    </div>
  )
}