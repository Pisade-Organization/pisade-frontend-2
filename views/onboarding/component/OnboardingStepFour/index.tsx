"use client"
import { useState } from "react"
import { FormProvider, useForm, useFieldArray } from "react-hook-form"
import { Degree, EducationDto, OnboardingStepFourPayload } from "@/services/tutor/onboarding/types"

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
  // When true, it means "I don't have a higher education degree" (checkbox is checked)
  // So hasHigherEducationDegree = !noHigherEducationDegree
  const [noHigherEducationDegree, setNoHigherEducationDegree] = useState<boolean>(false)
  
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