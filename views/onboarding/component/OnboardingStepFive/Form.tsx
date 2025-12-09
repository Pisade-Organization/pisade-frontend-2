"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Info } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import Typography from "@/components/base/Typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface OnboardingStepFiveForm {
  introduceYourself: string
  teachingExperience: string
  motivatePotentialStudents: string
  catchyHeadline: string
}

export default function OnboardingStepFiveForm() {
  const { control } = useFormContext<OnboardingStepFiveForm>()
  const [open, setOpen] = useState<string | undefined>("item-1")
  const topics = [
    {
      title: "1. Introduce yourself",
      description: "Show potential students who you are, your teaching experience, interests and hobbies",
      placeholder: "Hello, my name is... and I'm from...",
      info: "Don't include your last name or present your information in a CV format",
      fieldName: "introduceYourself" as keyof OnboardingStepFiveForm
    },
    {
      title: "2. Teaching experience",
      description: "Provide a detailed description of your relevant teaching experience. Include certifications, teaching methodology, education, and subject expertise.",
      placeholder: "I have 5 years of teaching experience...",
      info: "Don't include your last name or present your information in a CV format",
      fieldName: "teachingExperience" as keyof OnboardingStepFiveForm
    },
    {
      title: "3. Motivate potencial students",
      description: "Start your first lesson and discover how enjoyable learning English can be. Build confidence, fluency, and real communication skills.",
      placeholder: "Book a trial lesson with me...",
      info: "Don't include your last name or present your information in a CV format",
      fieldName: "motivatePotentialStudents" as keyof OnboardingStepFiveForm
    },
    {
      title: "4. Write a catchy headline",
      description: "Make your headline attention-grabbing, mention your specific teaching languageand encourage students to read your full description.",
      placeholder: "Book a trial lesson with me...",
      info: "Don't include your last name or present your information in a CV format",
      fieldName: "catchyHeadline" as keyof OnboardingStepFiveForm
    }
  ]
  return (
    <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="w-full">
      {topics.map((topic, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx + 1}`}
          className={cn(
            "w-full border-none bg-white",
            open === `item-${idx + 1}` && "flex flex-col items-start pt-6 pb-8 px-8 gap-5",
            open !== `item-${idx + 1}` && "py-1 px-8"
          )}
        >
          <AccordionTrigger
            className={cn(
              "[&>svg]:hidden hover:no-underline",
              open === `item-${idx + 1}` && "flex flex-col justify-center items-start gap-1"
            )}
          >
            <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
              {topic.title}
            </Typography>
            {open === `item-${idx + 1}` && (
              <Typography variant="body-3" color="neutral-400">
                {topic.description}
              </Typography>
            )}
          </AccordionTrigger>

          <AccordionContent className="w-full flex flex-col justify-center items-center gap-2">
            <Controller
              name={topic.fieldName}
              control={control}
              render={({ field }) => (
                <textarea
                  className="w-full rounded-[12px] h-[150px] py-3 px-4 border border-neutral-100 outline-none"
                  placeholder={topic.placeholder}
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="rounded-[15px] w-full flex justify-start items-center py-2 px-4 gap-2 bg-electric-violet-25">
              <Info size={16} className="text-deep-royal-indigo-500"/>
              <Typography variant={{ base: "body-4", lg: "body-3" }} color="deep-royal-indigo-500">
                {topic.info}
              </Typography>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

  )
}