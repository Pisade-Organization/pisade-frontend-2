"use client"
import { useState } from "react"
import { DocumentType } from "../../types/document.types"
import WhyDoWeNeed from "./WhyDoWeNeed"
import SelectDocumentType from "./SelectDocumentType"
export default function OnboardingStepNine() {
  const [documentType, setDocumentType] = useState<DocumentType>("ID Card")
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <WhyDoWeNeed />
      <SelectDocumentType 
        documentType={documentType}
        setDocumentType={setDocumentType}
      />
    </div>
  )
}