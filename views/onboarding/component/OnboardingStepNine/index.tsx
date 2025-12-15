"use client"
import { useState } from "react"
import { DocumentType } from "../../types/document.types"
import WhyDoWeNeed from "./WhyDoWeNeed"
import SelectDocumentType from "./SelectDocumentType"
import Upload from "./Upload"
import Tips from "./Tips"

const DEFAULT_DOCUMENT_TYPE: DocumentType = "ID Card" as DocumentType;

export default function OnboardingStepNine() {
  const [documentType, setDocumentType] = useState<DocumentType>(DEFAULT_DOCUMENT_TYPE)
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <WhyDoWeNeed />
      <SelectDocumentType 
        documentType={documentType}
        setDocumentType={setDocumentType}
      />
      <Upload documentType={documentType}/>
      <Tips />
    </div>
  )
}