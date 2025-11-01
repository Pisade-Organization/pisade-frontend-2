"use client"
import { useEffect } from "react"
import { useStepOne } from "@/hooks/tutors/onboarding/queries/useStepOne"
import { useSaveStepOne } from "@/hooks/tutors/onboarding/mutations/useUpdateStepOne"
import { FormProvider, useForm } from "react-hook-form"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"

import PersonalInfoForm from "./PersonalInfoForm"
import TeachingInfo from "./TeachingInfo"

export default function OnboardingStepOne() {
  const { data, isLoading, isFetching, isError, error } = useStepOne()
  const saveStepOne = useSaveStepOne()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      countryOfBirth: "",
      nationality: "",
      phoneNumber: "",
      subject: "",
      languages: [] as { language: string; level: string }[],
    }
  })

  useEffect(() => {
    if (data) {
      const sanitized = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (key === "languages") {
            return [key, value ?? []]
          }
          return [key, value ?? ""]
        })
      )
      methods.reset(sanitized as any)
    }
  }, [data, methods])

  useEffect(() => {
    const validate = async () => {
      return await methods.trigger()
    }
    const save = async () => {
      const values = methods.getValues()
      const payload = Object.fromEntries(
        Object.entries(values).map(([key, value]) => {
          if (key === "languages") {
            // Filter out empty language entries
            const languages = Array.isArray(value) 
              ? value.filter(lang => lang.language && lang.level)
              : []
            return [key, languages.length > 0 ? languages : undefined]
          }
          return [key, value === "" ? null : value]
        })
      )
      await saveStepOne.mutateAsync(payload as any)
    }
    registerStepActions(1, { validate, save })
    return () => {
      unregisterStepActions(1)
    }
  }, [registerStepActions, unregisterStepActions])

  if (isLoading) return <p>Loading...</p>

  return (
    <FormProvider {...methods}>
      <div className="w-full flex flex-col justify-start items-center gap-1">
        <PersonalInfoForm />
        <TeachingInfo />
      </div>
    </FormProvider>
  )
}