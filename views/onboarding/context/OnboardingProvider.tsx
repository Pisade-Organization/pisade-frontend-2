"use client"
import { createContext, useCallback, useContext, useMemo, useState, useEffect, useRef, ReactNode } from "react"

type Direction = "increasing" | "decreasing"

type OnboardingContextValue = {
  step: number
  direction: Direction
  totalSteps: number
  maxAccessibleStep: number
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

export function OnboardingProvider({
  children,
  initialStep = 1,
  totalSteps = 9,
  initialMaxAccessibleStep,
}: {
  children: ReactNode
  initialStep?: number
  totalSteps?: number
  initialMaxAccessibleStep?: number
}) {
  const clampStep = useCallback((value: number, maxStep = totalSteps) => {
    return Math.max(1, Math.min(value, maxStep, totalSteps))
  }, [totalSteps])

  const resolvedInitialMaxAccessibleStep = clampStep(initialMaxAccessibleStep ?? initialStep)
  const [step, setStepState] = useState<number>(clampStep(initialStep, resolvedInitialMaxAccessibleStep))
  const [direction, setDirection] = useState<Direction>("increasing")
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [canContinue, setCanContinue] = useState<boolean>(true)
  const [hasInitialized, setHasInitialized] = useState<boolean>(false)
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(resolvedInitialMaxAccessibleStep)
  const actionsRegistryRef = useRef<Map<number, StepActions>>(new Map())

  // Update step when initialStep changes (e.g., when API data loads)
  useEffect(() => {
    if (!hasInitialized && initialStep) {
      const clampedMaxAccessibleStep = clampStep(initialMaxAccessibleStep ?? initialStep)
      setMaxAccessibleStep(clampedMaxAccessibleStep)
      setStepState(clampStep(initialStep, clampedMaxAccessibleStep))
      setHasInitialized(true)
    }
  }, [initialMaxAccessibleStep, initialStep, hasInitialized, clampStep])

  const setStep = useCallback((newStep: number) => {
    setStepState((currentStep) => {
      setDirection(newStep > currentStep ? "increasing" : "decreasing")
      const clamped = clampStep(newStep, maxAccessibleStep)
      // Reset canContinue when step changes (each step will set its own value)
      setCanContinue(true)
      return clamped
    })
  }, [clampStep, maxAccessibleStep])

  const next = useCallback(() => {
    setStepState((currentStep) => {
      const newStep = currentStep + 1
      setDirection("increasing")
      const clamped = clampStep(newStep)
      setMaxAccessibleStep((currentMaxAccessibleStep) => Math.max(currentMaxAccessibleStep, clamped))
      setCanContinue(true)
      return clamped
    })
  }, [clampStep])

  const back = useCallback(() => {
    setStepState((currentStep) => {
      const newStep = currentStep - 1
      setDirection("decreasing")
      const clamped = clampStep(newStep)
      setCanContinue(true)
      return clamped
    })
  }, [clampStep])

  const registerStepActions = useCallback((s: number, actions: StepActions) => {
    actionsRegistryRef.current.set(s, actions)
  }, [])

  const unregisterStepActions = useCallback((s: number) => {
    actionsRegistryRef.current.delete(s)
  }, [])

  const isFinalStep = step === totalSteps
  const continueLabel = isFinalStep ? "Submit" : "Continue"

  const performContinue = useCallback(async () => {
    const actions = actionsRegistryRef.current.get(step)
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
  }, [step, isFinalStep, next])

  const performBack = useCallback(() => {
    if (isBusy) return
    back()
  }, [back, isBusy])

  const value = useMemo(() => ({
    step,
    direction,
    totalSteps,
    maxAccessibleStep,
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
    maxAccessibleStep,
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
