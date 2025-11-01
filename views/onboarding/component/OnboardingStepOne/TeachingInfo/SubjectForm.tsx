"use client"
import { Controller, useFormContext } from "react-hook-form"
import BaseSelect from "@/components/base/BaseSelect"

export default function SubjectForm() {
  const { control } = useFormContext()

  return (
    <Controller
      name="subject"
      control={control}
      render={({ field }) => (
        <BaseSelect 
          title="Subject you teach"
          placeholder="Choose a subject"
          options={[
            { value: "Math", label: "Math" },
            { value: "Literature", label: "Literature" },
            { value: "Physics", label: "Physics" },
            { value: "Computer Science", label: "Computer Science" }
          ]}
          value={field.value}
          onChange={field.onChange}
          required
        />
      )}
    />
  )
}

