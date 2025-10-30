"use client"
import { useOnboardingContext } from "../context/OnboardingProvider"

export function useOnboardingNavigation() {
  const {
    step,
    totalSteps,
    setStep,
    next,
    back,
    direction,
    performContinue,
    performBack,
    isBusy,
    isFinalStep,
    continueLabel,
    registerStepActions,
    unregisterStepActions,
  } = useOnboardingContext()

  const canBack = step > 1 && !isBusy
  const canNext = step < totalSteps && !isBusy

  return {
    step,
    totalSteps,
    setStep,
    next,
    back,
    canBack,
    canNext,
    direction,
    performContinue,
    performBack,
    isBusy,
    isFinalStep,
    continueLabel,
    registerStepActions,
    unregisterStepActions,
  }
}


