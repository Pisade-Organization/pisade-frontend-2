import BaseButton from "@/components/base/BaseButton"
import { ArrowRight } from "lucide-react"
export default function ActionButtonsFooter({
  step, setStep
}: {
  step: number
  setStep: (step: number) => void
}) {
  const onBackClick = () => {
    if(step === 1) {
      return
    }

    setStep(step - 1)
  }

  const onContinueClick = () => {
    if(step === 8) {
      return
    }

    setStep(step + 1)
  }

  return (
    <div className="w-full flex justify-between items-center">
      <BaseButton disabled={ step === 1 } onClick={onBackClick} variant="secondary" typeStyle="borderless">
        Back
      </BaseButton>

      <BaseButton disabled={ step === 8 } onClick={onContinueClick} variant="secondary" iconRight={<ArrowRight size={20} />}>
        Continue
      </BaseButton>
    </div>
  )
}