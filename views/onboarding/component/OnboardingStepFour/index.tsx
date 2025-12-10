"use client"
import { useState, useEffect, useRef } from "react"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { Degree, EducationDto } from "@/services/tutor/onboarding/types"
import { useStepFour } from "@/hooks/tutors/onboarding/queries/useStepFour"
import { useSaveStepFour } from "@/hooks/tutors/onboarding/mutations/useUpdateStepFour"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"

import NoHigherEducationCheckbox from "./NoHigherEducationCheckbox"
import DiplomaItem from "./DiplomaItem"
import AddAnotherDiploma from "./AddAnotherDiploma"

// Form state uses strings for year inputs, but will convert to numbers for DTO
interface EducationFormData {
  universityName: string
  degree: Degree | ""
  fieldOfStudy: string
  specialization: string
  yearStart: string
  yearEnd: string
  currentlyStudying: boolean
  fileUrl?: string
}

interface OnboardingStepFourForm {
  educations: EducationFormData[]
}

export default function OnboardingStepFour() {
  const { data: stepFourData, isLoading } = useStepFour()
  const saveStepFour = useSaveStepFour()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // When true, it means "I don't have a higher education degree" (checkbox is checked)
  // So hasDiploma = !noHigherEducationDegree
  const [noHigherEducationDegree, setNoHigherEducationDegree] = useState<boolean>(false)
  
  // Use refs to access latest values without including them in dependencies
  const saveStepFourRef = useRef(saveStepFour)
  const stepFourDataRef = useRef(stepFourData)
  const noHigherEducationDegreeRef = useRef(noHigherEducationDegree)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepFourRef.current = saveStepFour
    stepFourDataRef.current = stepFourData
    noHigherEducationDegreeRef.current = noHigherEducationDegree
  })
  
  const methods = useForm<OnboardingStepFourForm>({
    defaultValues: {
      educations: [
        {
          universityName: "",
          degree: "" as Degree | "",
          fieldOfStudy: "",
          specialization: "",
          yearStart: "",
          yearEnd: "",
          currentlyStudying: false,
          fileUrl: undefined,
        }
      ],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "educations",
  })

  // Load step four data into form when available
  useEffect(() => {
    if (stepFourData) {
      // Set hasDiploma state (inverse of noHigherEducationDegree)
      const hasDiploma = stepFourData.hasDiploma ?? true
      setNoHigherEducationDegree(!hasDiploma)
      
      // Load educations into form (GET response uses "diplomas")
      if (stepFourData.diplomas && stepFourData.diplomas.length > 0) {
        const formEducations = stepFourData.diplomas.map(edu => ({
          universityName: edu.universityName || "",
          degree: edu.degree || ("" as Degree | ""),
          fieldOfStudy: edu.fieldOfStudy || "",
          specialization: edu.specialization || "",
          yearStart: edu.yearStart?.toString() || "",
          yearEnd: edu.yearEnd?.toString() || "",
          currentlyStudying: edu.currentlyStudying || false,
          fileUrl: edu.fileUrl,
        }))
        methods.reset({
          educations: formEducations
        })
      } else {
        // If no educations, ensure at least one empty education exists
        methods.reset({
          educations: [{
            universityName: "",
            degree: "" as Degree | "",
            fieldOfStudy: "",
            specialization: "",
            yearStart: "",
            yearEnd: "",
            currentlyStudying: false,
            fileUrl: undefined,
          }]
        })
      }
    }
  }, [stepFourData, methods])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // If user checked "I don't have a higher education degree", validation passes
      if (noHigherEducationDegreeRef.current) {
        return true
      }
      
      // Otherwise, validate that at least one education is filled
      const values = methods.getValues()
      const hasValidEducation = values.educations?.some(edu => 
        edu.universityName && edu.degree && edu.yearStart
      )
      
      if (!hasValidEducation) {
        return false
      }
      
      return await methods.trigger()
    }

    const save = async () => {
      const values = methods.getValues()
      
      // Convert form data to DTO format
      const educations: EducationDto[] = values.educations
        .filter((edu) => edu.universityName && edu.degree && edu.yearStart)
        .map((edu) => ({
          universityName: edu.universityName,
          degree: edu.degree as Degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          specialization: edu.specialization || "",
          yearStart: parseInt(edu.yearStart, 10),
          yearEnd: edu.yearEnd ? parseInt(edu.yearEnd, 10) : undefined,
          currentlyStudying: edu.currentlyStudying || false,
          fileUrl: edu.fileUrl,
        }))

      const payload = {
        hasDiploma: !noHigherEducationDegreeRef.current,
        educations: educations.length > 0 ? educations : undefined,
      }

      await saveStepFourRef.current.mutateAsync(payload)
    }

    registerStepActions(4, { validate, save })
    return () => {
      unregisterStepActions(4)
    }
  }, [registerStepActions, unregisterStepActions, methods])

  if (isLoading) return <p>Loading...</p>

  return (
    <FormProvider {...methods}>
      <div className="w-full flex flex-col justify-start items-center gap-1">
        <NoHigherEducationCheckbox 
          hasHigherEducationDegree={noHigherEducationDegree} 
          setHasHigherEducationDegree={setNoHigherEducationDegree} 
        />
        {!noHigherEducationDegree && (
          <>
            {fields.map((field, index) => (
              <DiplomaItem 
                key={field.id}
                index={index}
                onRemove={fields.length > 1 ? () => remove(index) : undefined}
              />
            ))}
            <AddAnotherDiploma onAdd={() => append({
              universityName: "",
              degree: "" as Degree | "",
              fieldOfStudy: "",
              specialization: "",
              yearStart: "",
              yearEnd: "",
              currentlyStudying: false,
              fileUrl: undefined,
            })} />
          </>
        )}
      </div>
    </FormProvider>
  )
}