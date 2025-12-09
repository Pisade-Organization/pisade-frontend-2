"use client"
import { useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useStepFive } from "@/hooks/tutors/onboarding/queries/useStepFive"
import { useSaveStepFive } from "@/hooks/tutors/onboarding/mutations/useUpdateStepFive"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import Guidelines from "./Guidelines"
import OnboardingStepFiveForm from "./Form"

interface OnboardingStepFiveForm {
  introduceYourself: string
  teachingExperience: string
  motivatePotentialStudents: string
  catchyHeadline: string
}

export default function OnboardingStepFive() {
  const { data: stepFiveData, isLoading } = useStepFive()
  const saveStepFive = useSaveStepFive()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepFiveRef = useRef(saveStepFive)
  const stepFiveDataRef = useRef(stepFiveData)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepFiveRef.current = saveStepFive
    stepFiveDataRef.current = stepFiveData
  })

  const methods = useForm<OnboardingStepFiveForm>({
    defaultValues: {
      introduceYourself: "",
      teachingExperience: "",
      motivatePotentialStudents: "",
      catchyHeadline: "",
    }
  })

  // Load step five data into form when available
  useEffect(() => {
    if (stepFiveData) {
      methods.reset({
        introduceYourself: stepFiveData.introduceYourself || "",
        teachingExperience: stepFiveData.teachingExperience || "",
        motivatePotentialStudents: stepFiveData.motivatePotentialStudents || "",
        catchyHeadline: stepFiveData.catchyHeadline || "",
      }, {
        keepDefaultValues: false,
        keepDirty: false,
        keepErrors: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false
      })
    }
  }, [stepFiveData, methods])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      return await methods.trigger()
    }

    const save = async () => {
      const values = methods.getValues()
      
      const payload = {
        introduceYourself: values.introduceYourself || undefined,
        teachingExperience: values.teachingExperience || undefined,
        motivatePotentialStudents: values.motivatePotentialStudents || undefined,
        catchyHeadline: values.catchyHeadline || undefined,
      }

      await saveStepFiveRef.current.mutateAsync(payload)
    }

    registerStepActions(5, { validate, save })
    return () => {
      unregisterStepActions(5)
    }
  }, [registerStepActions, unregisterStepActions, methods])

  if (isLoading) return <p>Loading...</p>

  return (
    <FormProvider {...methods}>
      <div className="w-full flex flex-col justify-start items-center gap-1">
        <Guidelines />
        <OnboardingStepFiveForm />
      </div>
    </FormProvider>
  )
}