"use client"
import Typography from "@/components/base/Typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CircleCheckBig, Trash } from "lucide-react"
import { useFormContext } from "react-hook-form"
import DiplomaForm from "./DiplomaForm"
import BaseButton from "@/components/base/BaseButton"

interface DiplomaItemProps {
  index: number
  onRemove?: () => void
}

export default function DiplomaItem({ index, onRemove }: DiplomaItemProps) {
  const { watch } = useFormContext()
  const educations = watch("educations") || []
  const education = educations[index]

  // Build display text from form data
  const getDiplomaDisplayText = () => {
    if (!education) return "Education"
    
    const parts: string[] = []
    if (education.degree) parts.push(education.degree)
    if (education.fieldOfStudy) parts.push(`in ${education.fieldOfStudy}`)
    if (education.specialization) parts.push(`(${education.specialization})`)
    if (education.universityName) parts.push(`- ${education.universityName}`)
    
    const endYear = education.currentlyStudying ? "Present" : (education.yearEnd || "")
    const yearRange = education.yearStart || endYear
      ? `(${education.yearStart || "..."} - ${endYear || "..."})`
      : ""
    
    const mainText = parts.length > 0 ? parts.join(" ") : "New Education"
    return `${mainText} ${yearRange}`.trim()
  }

  const displayText = getDiplomaDisplayText()

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={index === 0 ? `item-${index}` : undefined}
    >
      <AccordionItem value={`item-${index}`} className="pt-6 pb-8 px-8 bg-white">
        <AccordionTrigger className="bg-white pt-4 px-4 hover:no-underline">
          <div className="flex gap-2 flex-1">
            <div className="flex items-center gap-3">
              <CircleCheckBig size={16} className="text-electric-violet-700"/>
              <div className="flex flex-col">
                <Typography variant="title-2" color="neutral-800">
                  Diploma {index + 1}
                </Typography>
                <Typography variant="label-3" color="neutral-500">
                  {displayText}
                </Typography>
              </div>
            </div>
          </div>

          {onRemove && (
            <div className="w-10 h-10 flex justify-center items-center">
              <BaseButton
                type="button"
                variant="secondary"
                typeStyle="borderless"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
                className="hover:bg-neutral-50 rounded-full"
              >
                <Trash size={20} className="text-red-normal" />
              </BaseButton>
            </div>
          )}
        </AccordionTrigger>

        <AccordionContent>
          <DiplomaForm index={index} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}