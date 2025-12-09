"use client"
import CertificationDetailForm from "./CertificationDetailForm"
import CertificationBadge from "./CertificationBadge"

interface CertificationContentProps {
  index: number
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  fileError?: string | null
  existingImageUrl?: string
  isUploading?: boolean
}

export default function CertificationContent({
  index,
  selectedFile,
  onFileChange,
  fileError,
  existingImageUrl,
  isUploading,
}: CertificationContentProps) {
  return (
    <div className="w-full flex flex-col">
      <CertificationDetailForm index={index} />
      <CertificationBadge
        selectedFile={selectedFile}
        onFileChange={onFileChange}
        fileError={fileError}
        existingImageUrl={existingImageUrl}
        isUploading={isUploading}
      />
    </div>
  )
}
