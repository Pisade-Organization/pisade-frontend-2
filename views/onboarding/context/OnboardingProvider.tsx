"use client"
import { createContext, useCallback, useContext, useMemo, useState, useEffect, ReactNode } from "react"

type Direction = "increasing" | "decreasing"

type OnboardingContextValue = {
  step: number
  direction: Direction
  totalSteps: number
  setStep: (step: number) => void
  next: () => void
  back: () => void
  // step action orchestration
  registerStepActions: (step: number, actions: StepActions) => void
  unregisterStepActions: (step: number) => void
  performContinue: () => Promise<void>
  performBack: () => void
  isBusy: boolean
  isFinalStep: boolean
  continueLabel: string
  canContinue: boolean
  setCanContinue: (canContinue: boolean) => void
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined)

export type StepActions = {
  validate?: () => Promise<boolean> | boolean
  save?: () => Promise<void> | void
  submit?: () => Promise<void> | void
}

export function OnboardingProvider({ children, initialStep = 1, totalSteps = 9 }: { children: ReactNode, initialStep?: number, totalSteps?: number }) {
  const [step, setStepState] = useState<number>(initialStep)
  const [direction, setDirection] = useState<Direction>("increasing")
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [actionsRegistry, setActionsRegistry] = useState<Map<number, StepActions>>(new Map())
  const [canContinue, setCanContinue] = useState<boolean>(true)
  const [hasInitialized, setHasInitialized] = useState<boolean>(false)

  // Update step when initialStep changes (e.g., when API data loads)
  useEffect(() => {
    if (!hasInitialized && initialStep) {
      setStepState(initialStep)
      setHasInitialized(true)
    }
  }, [initialStep, hasInitialized])

  const setStep = useCallback((newStep: number) => {
    setDirection(newStep > step ? "increasing" : "decreasing")
    const clamped = Math.max(1, Math.min(newStep, totalSteps))
    setStepState(clamped)
    // Reset canContinue when step changes (each step will set its own value)
    setCanContinue(true)
  }, [step, totalSteps])

  const next = useCallback(() => {
    setStep(step + 1)
  }, [setStep, step])

  const back = useCallback(() => {
    setStep(step - 1)
  }, [setStep, step])

  const registerStepActions = useCallback((s: number, actions: StepActions) => {
    setActionsRegistry(prev => {
      const nextMap = new Map(prev)
      nextMap.set(s, actions)
      return nextMap
    })
  }, [])

  const unregisterStepActions = useCallback((s: number) => {
    setActionsRegistry(prev => {
      const nextMap = new Map(prev)
      nextMap.delete(s)
      return nextMap
    })
  }, [])

  const isFinalStep = step === totalSteps
  const continueLabel = isFinalStep ? "Submit" : "Continue"

  const performContinue = useCallback(async () => {
    const actions = actionsRegistry.get(step)
    setIsBusy(true)
    try {
      if (actions?.validate) {
        const valid = await actions.validate()
        if (!valid) return
      }
      if (isFinalStep) {
        if (actions?.submit) {
          await actions.submit()
        }
      } else {
        if (actions?.save) {
          await actions.save()
        }
        next()
      }
    } finally {
      setIsBusy(false)
    }
  }, [actionsRegistry, step, isFinalStep, next])

  const performBack = useCallback(() => {
    if (isBusy) return
    back()
  }, [back, isBusy])

  const value = useMemo(() => ({
    step,
    direction,
    totalSteps,
    setStep,
    next,
    back,
    registerStepActions,
    unregisterStepActions,
    performContinue,
    performBack,
    isBusy,
    isFinalStep,
    continueLabel,
    canContinue,
    setCanContinue,
  }), [
    step,
    direction,
    totalSteps,
    setStep,
    next,
    back,
    registerStepActions,
    unregisterStepActions,
    performContinue,
    performBack,
    isBusy,
    isFinalStep,
    continueLabel,
    canContinue,
  ])

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingContext(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error("useOnboardingContext must be used within OnboardingProvider")
  }
  return ctx
}


