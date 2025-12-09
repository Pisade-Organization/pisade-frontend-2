"use client"
import { useEffect, useRef } from "react"
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
  const originalDataRef = useRef<any>(null)

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
      // Store the original data for comparison
      originalDataRef.current = sanitized
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

      // Compare with original data to avoid unnecessary saves
      if (originalDataRef.current) {
        const original = originalDataRef.current
        const originalPayload = Object.fromEntries(
          Object.entries(original).map(([key, value]) => {
            if (key === "languages") {
              const languages = Array.isArray(value) 
                ? value.filter((lang: any) => lang.language && lang.level)
                : []
              return [key, languages.length > 0 ? languages : undefined]
            }
            return [key, value === "" ? null : value]
          })
        )

        // Normalize both payloads for comparison (sort languages arrays)
        const normalizeForComparison = (obj: any) => {
          const normalized = { ...obj }
          if (normalized.languages && Array.isArray(normalized.languages)) {
            normalized.languages = [...normalized.languages].sort((a, b) => {
              const aKey = `${a.language}-${a.level}`
              const bKey = `${b.language}-${b.level}`
              return aKey.localeCompare(bKey)
            })
          }
          return normalized
        }

        const normalizedPayload = normalizeForComparison(payload)
        const normalizedOriginal = normalizeForComparison(originalPayload)

        // Deep comparison of payloads
        const hasChanges = JSON.stringify(normalizedPayload) !== JSON.stringify(normalizedOriginal)
        
        if (!hasChanges) {
          // No changes, skip save
          return
        }
      }

      await saveStepOne.mutateAsync(payload as any)
    }
    registerStepActions(1, { validate, save })
    return () => {
      unregisterStepActions(1)
    }
  }, [registerStepActions, unregisterStepActions, methods, saveStepOne])

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