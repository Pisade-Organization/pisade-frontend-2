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

  // Use refs to access latest values without including them in dependencies
  const methodsRef = useRef(methods)
  const saveStepOneRef = useRef(saveStepOne)
  
  // Keep refs in sync
  useEffect(() => {
    methodsRef.current = methods
    saveStepOneRef.current = saveStepOne
  })

  useEffect(() => {
    if (!data) return
    
    const sanitized = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (key === "languages") {
          return [key, value ?? []]
        }
        return [key, value ?? ""]
      })
    )
    
    // Create a stable string representation for comparison
    const newDataStr = JSON.stringify(sanitized)
    
    // Only reset if the data actually changed to prevent infinite loops
    if (originalDataRef.current) {
      const currentDataStr = JSON.stringify(originalDataRef.current)
      
      // If data hasn't changed, don't reset
      if (currentDataStr === newDataStr) {
        return
      }
    }
    
    // Only reset on initial load or when data comes from server (not during user editing)
    // Check if form is currently being interacted with by checking if it's dirty
    const formIsDirty = methodsRef.current.formState.isDirty
    
    // If form has been modified by user, don't reset to prevent interrupting input
    // This is especially important for select inputs which can trigger this effect
    if (formIsDirty && originalDataRef.current) {
      // Update the reference but don't reset the form
      originalDataRef.current = sanitized
      return
    }
    
    // Reset form with new data
    methodsRef.current.reset(sanitized as any, {
      keepDefaultValues: false,
      keepDirty: false,
      keepErrors: false,
      keepIsSubmitted: false,
      keepTouched: false,
    })
    
    // Store the original data for comparison
    originalDataRef.current = sanitized
  }, [data])

  useEffect(() => {
    const validate = async () => {
      return await methodsRef.current.trigger()
    }
    const save = async () => {
      const values = methodsRef.current.getValues()
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

      await saveStepOneRef.current.mutateAsync(payload as any)
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