"use client"
import { Controller, useFormContext } from "react-hook-form"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import BaseTextArea from "@/components/base/BaseTextArea"
import Typography from "@/components/base/Typography"
import Divider from "./Divider"

interface CertificationDetailFormProps {
  index: number
}

const YEAR_OPTIONS = Array.from({ length: 131 }, (_, i) => {
  const year = 2030 - i
  return { value: String(year), label: String(year) }
})

export default function CertificationDetailForm({ 
  index,
}: CertificationDetailFormProps) {
  const { control } = useFormContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full bg-white border border-neutral-50 rounded-t-[20px] pt-4 pb-5 px-4 lg:pt-5 lg:px-6 lg:pb-6 flex flex-col gap-4 lg:gap-5"
    >
      
      <Typography variant={{ base: "title-3", lg: "title-1"}} color="neutral-800">
        Certification Details
      </Typography>
      
      <Divider />
      
      <Controller
        name={`certificates.${index}.certificationName`}
        control={control}
        render={({ field }) => (
          <BaseInput 
            title="Certification title"
            placeholder="Type your answer..."
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name={`certificates.${index}.description`}
        control={control}
        render={({ field }) => (
          <BaseTextArea 
            title="Description"
            placeholder="Type your answer..."
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name={`certificates.${index}.issuedBy`}
        control={control}
        render={({ field }) => (
          <BaseInput 
            title="Issued by"
            placeholder="Type your answer..."
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />

      <div className="w-full flex gap-4">
        <Controller
          name={`certificates.${index}.startYear`}
          control={control}
          render={({ field }) => (
            <BaseSelect 
              title="Start year"
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
            name={`certificates.${index}.endYear`}
            control={control}
            render={({ field }) => (
              <BaseSelect 
                placeholder="Select"
                options={YEAR_OPTIONS}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </form>
  )
}