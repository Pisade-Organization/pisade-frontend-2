import Icon from "./Icon"
import Title from "./Title"
export default function OnboardingStepHeader({
  step
}: {
  step: number
}) {
  return (
    <div className="flex justify-start items-center gap-4">
      <Icon step={step}/>
      <Title step={step} />
    </div>
  )
}