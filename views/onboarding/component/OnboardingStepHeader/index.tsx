import Icon from "./Icon"
import Title from "./Title"
export default function OnboardingStepHeader({
  step
}: {
  step: number
}) {
  return (
    <div className="flex justify-between items-start gap-3 p-5">
      <Icon step={step}/>
      <Title step={step} />
    </div>
  )
}