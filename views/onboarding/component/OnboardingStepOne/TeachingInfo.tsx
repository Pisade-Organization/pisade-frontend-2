"use client"
import { Controller, useFormContext } from "react-hook-form"
import BaseSelect from "@/components/base/BaseSelect"
import Typography from "@/components/base/Typography"

export default function TeachingInfo() {
  const { control } = useFormContext()
  return (
    <div className="w-full flex flex-col justify-center items-start gap-[18px] py-4 lg:py-6 px-5 lg:px-8 rounded-b-[20px] bg-white">
       <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
          2. Teaching info
        </Typography>
        <div className="w-full border-t border-t-electric-violet-50 border-0 h-px" />

        <div className="w-full flex flex-col justify-center items-center gap-5"></div>

        <div className="w-full flex flex-col justify-center items-start gap-5">

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

          <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:gap-4">
            <Controller
              name="langauge" // keeping existing key from defaults
              control={control}
              render={({ field }) => (
                <BaseSelect 
                  title="Language"
                  placeholder="Language"
                  options={[
                    { value: "Thai", label: "Thai" },
                    { value: "English", label: "English" },
                    { value: "Chinese", label: "Chinese" },
                    { value: "Spanish", label: "Spanish" }
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="langaugeLevel" // keeping existing key from defaults
              control={control}
              render={({ field }) => (
                <BaseSelect 
                  title="Level"
                  placeholder="Level"
                  options={[
                    { value: "A1", label: "A1" },
                    { value: "A2", label: "A2" },
                    { value: "A3", label: "A3" },
                    { value: "A4", label: "A4" }
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

          </div>

        </div>
    </div>
  )
}