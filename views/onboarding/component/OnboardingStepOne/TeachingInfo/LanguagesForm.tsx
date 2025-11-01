"use client"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import BaseSelect from "@/components/base/BaseSelect"
import BaseButton from "@/components/base/BaseButton"
import { Trash } from "lucide-react"
import { Plus } from "lucide-react"

const ALL_LANGUAGES = [
  { value: "Thai", label: "Thai" },
  { value: "English", label: "English" },
  { value: "Chinese", label: "Chinese" },
  { value: "Spanish", label: "Spanish" }
]

export default function LanguagesForm() {
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  })

  const languages = watch("languages") || []

  // Get available languages for a specific index (exclude already selected ones)
  const getAvailableLanguages = (currentIndex: number) => {
    const currentLanguage = languages[currentIndex]?.language
    const selectedLanguages = languages
      .map((lang: { language: string; level: string }, idx: number) => 
        idx !== currentIndex ? lang.language : null
      )
      .filter(Boolean)

    return ALL_LANGUAGES.filter(
      (lang) => !selectedLanguages.includes(lang.value) || lang.value === currentLanguage
    )
  }

  return (
    <div className="w-full flex flex-col justify-center items-start gap-4">

      {fields.map((field, index) => (
        <div key={field.id} className="w-full flex flex-col lg:flex-row justify-center items-center lg:gap-4">
          <Controller
            name={`languages.${index}.language`}
            control={control}
            rules={{
              validate: (value) => {
                if (!value) return true // Allow empty, will be handled by other validation
                // Check if this language is used in any other entry
                const duplicateIndex = languages.findIndex(
                  (lang: { language: string; level: string }, idx: number) => 
                    lang.language === value && idx !== index
                )
                if (duplicateIndex !== -1) {
                  return "This language has already been selected"
                }
                return true
              }
            }}
            render={({ field, fieldState }) => (
              <BaseSelect 
                title={index === 0 ? "Language" : ""}
                placeholder="Language"
                options={getAvailableLanguages(index)}
                value={field.value}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`languages.${index}.level`}
            control={control}
            render={({ field }) => (
              <BaseSelect 
                title={index === 0 ? "Level" : ""}
                placeholder="Level"
                options={[
                  { value: "BEGINNER", label: "Beginner" },
                  { value: "INTERMEDIATE", label: "Intermediate" },
                  { value: "NATIVE", label: "Native" }
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {fields.length > 1 && (
            <BaseButton
              type="button"
              variant="secondary"
              typeStyle="borderless"
              onClick={() => remove(index)}
              className="mt-2"
            >
              <Trash size={20} className="text-red-normal"/>
            </BaseButton>
          )}
        </div>
      ))}


      <BaseButton
          type="button"
          variant="secondary"
          typeStyle="borderless"
          onClick={() => append({ language: "", level: "" })}
          iconLeft={<Plus size={20} className="text-neutral-700"/>}
        >
          Add Language
        </BaseButton>
    </div>
  )
}

