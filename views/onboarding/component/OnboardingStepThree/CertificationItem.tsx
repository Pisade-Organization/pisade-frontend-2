"use client"
import { useState } from "react"
import Typography from "@/components/base/Typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CircleCheckBig, Trash } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import CertificationContent from "./CertificationContent"
import BaseButton from "@/components/base/BaseButton"

interface CertificationItemProps {
  index: number
  onRemove?: () => void
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  fileError?: string | null
  existingImageUrl?: string
  isUploading?: boolean
}

export default function CertificationItem({ 
  index, 
  onRemove,
  selectedFile,
  onFileChange,
  fileError,
  existingImageUrl,
  isUploading,
}: CertificationItemProps) {
  const { watch } = useFormContext()
  const certificates = watch("certificates") || []
  const certificate = certificates[index]

  const itemValue = `item-${index}`
  const [open, setOpen] = useState<string>(index === 0 ? itemValue : "")
  const isOpen = open === itemValue

  // Build display text from form data
  const getCertificationDisplayText = () => {
    if (!certificate) return "Certification"
    
    const parts: string[] = []
    if (certificate.certificationName) parts.push(certificate.certificationName)
    if (certificate.issuedBy) parts.push(`by ${certificate.issuedBy}`)
    
    const yearRange = certificate.startYear || certificate.endYear
      ? `(${certificate.startYear || "..."} - ${certificate.endYear || "..."})`
      : ""
    
    const mainText = parts.length > 0 ? parts.join(" ") : "New Certification"
    return `${mainText} ${yearRange}`.trim()
  }

  const displayText = getCertificationDisplayText()

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={open}
      onValueChange={setOpen}
    >
      <AccordionItem
        value={itemValue}
        className={cn(
          "w-full border-none bg-white transition-all duration-300",
          isOpen ? "pt-6 pb-8 px-8" : "py-1 px-8"
        )}
      >
        <AccordionTrigger
          className={cn(
            "bg-white hover:no-underline transition-colors"
          )}
        >
          <div className="flex gap-2 flex-1">
            <div className="flex items-center gap-3">
              <CircleCheckBig className="text-neutral-300 h-4 w-4 md:h-6 md:w-6"/>
              <div className="flex flex-col">
                <Typography variant="title-2" color="neutral-800">
                  Certification {index + 1}
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

        <AccordionContent className="flex flex-col items-center pb-0 gap-5 lg:gap-6">
          <CertificationContent
            index={index}
            selectedFile={selectedFile}
            onFileChange={onFileChange}
            fileError={fileError}
            existingImageUrl={existingImageUrl}
            isUploading={isUploading}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

