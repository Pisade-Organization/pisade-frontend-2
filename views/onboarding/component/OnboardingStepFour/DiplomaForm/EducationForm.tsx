"use client"
import { Controller, useFormContext } from "react-hook-form"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import Typography from "@/components/base/Typography"
import { BaseCheckbox } from "@/components/base/Checkbox"
import { Degree } from "@/services/tutor/onboarding/types"

interface EducationFormProps {
  index: number
}

const YEAR_OPTIONS = Array.from({ length: 131 }, (_, i) => {
  const year = 2030 - i
  return { value: String(year), label: String(year) }
})

const END_YEAR_OPTIONS = [
  { value: "Present", label: "Present" },
  ...YEAR_OPTIONS
]

// Generate degree options from enum with user-friendly labels
const DEGREE_LABELS: Record<Degree, string> = {
  [Degree.BACHELOR]: "Bachelor's Degree",
  [Degree.MASTER]: "Master's Degree",
  [Degree.DOCTORATE]: "Doctorate",
  [Degree.ASSOCIATE]: "Associate Degree",
  [Degree.DIPLOMA]: "Diploma",
  [Degree.CERTIFICATE]: "Certificate",
}

const DEGREE_OPTIONS = Object.values(Degree).map((degree) => ({
  value: degree,
  label: DEGREE_LABELS[degree],
}))

export default function EducationForm({ index }: EducationFormProps) {
  const { control, watch, setValue } = useFormContext()
  const currentlyStudying = watch(`educations.${index}.currentlyStudying`)

  return (
    <div className=" pt-4 pb-5 px-5 flex flex-col gap-4 bg-white lg:pt-5 lg:pb-6 lg:px-6 rounded-t-[16px]">
      <Typography variant={{ base: "title-3", lg: "title-1" }} color="neutral-900">
        Education
      </Typography>

      <div className="w-full border-t border-neutral-50"/>

      <div className="flex flex-col gap-5 lg:gap-4">
        <Controller
          name={`educations.${index}.universityName`}
          control={control}
          render={({ field }) => (
            <BaseInput 
              title="University"
              placeholder="Enter here..."
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name={`educations.${index}.degree`}
          control={control}
          render={({ field }) => (
            <BaseSelect 
              title="Degree"
              placeholder="Select degree"
              options={DEGREE_OPTIONS}
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name={`educations.${index}.fieldOfStudy`}
          control={control}
          render={({ field }) => (
            <BaseInput 
              title="Field of study"
              placeholder="Enter here..."
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name={`educations.${index}.specialization`}
          control={control}
          render={({ field }) => (
            <BaseInput 
              title="Specialization"
              placeholder="Enter here..."
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex gap-4 items-center">
          <Controller
            name={`educations.${index}.yearStart`}
            control={control}
            render={({ field }) => (
              <BaseSelect 
                title="Years of study"
                placeholder="Select"
                options={YEAR_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          
          <div className="w-full flex flex-col gap-1">
            {/* THIS DIV IS JUST A FAKE TO MAKE THE SELECT BOX HAVE THE SAME HEIGHT */}
            <div className="p-[10px] bg-white"></div> 
            <Controller
              name={`educations.${index}.yearEnd`}
              control={control}
              render={({ field }) => (
                <BaseSelect 
                  placeholder={currentlyStudying ? "Present" : "Select"}
                  options={END_YEAR_OPTIONS}
                  value={currentlyStudying ? "Present" : (field.value || "")}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <Controller
          name={`educations.${index}.currentlyStudying`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <BaseCheckbox 
                checked={field.value || false}
                onChange={(checked) => {
                  field.onChange(checked)
                  if (checked) {
                    setValue(`educations.${index}.yearEnd`, "")
                  }
                }}
              />
              <Typography variant="body-3" color="neutral-800">
                I am currently studying
              </Typography>
            </div>
          )}
        />
      </div>
    </div>   
  )
}