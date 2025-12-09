import BaseButton from "@/components/base/BaseButton"
import { ArrowRight } from "lucide-react"
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation"

export default function ActionButtonsFooter() {
  const { canBack, performBack, performContinue, isBusy, continueLabel, canContinue } = useOnboardingNavigation()

  return (
    <div className="w-full flex justify-between items-center">
      <BaseButton disabled={!canBack || isBusy} onClick={performBack} variant="secondary" typeStyle="borderless">
        Back
      </BaseButton>

      <BaseButton disabled={isBusy || !canContinue} onClick={performContinue} variant="secondary" iconRight={<ArrowRight size={20} />}>
        {continueLabel}
      </BaseButton>
    </div>
  )
}