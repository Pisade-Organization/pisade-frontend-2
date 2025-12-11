import DiplomaBadge from "../DiplomaBadge"

interface UploadCertificationProps {
  index: number
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  fileError?: string | null
  existingImageUrl?: string
  isUploading?: boolean
}

export default function UploadCertification({ 
  index,
  selectedFile,
  onFileChange,
  fileError,
  existingImageUrl,
  isUploading
}: UploadCertificationProps) {
  return (
    <DiplomaBadge
      selectedFile={selectedFile}
      onFileChange={onFileChange}
      fileError={fileError}
      existingImageUrl={existingImageUrl}
      isUploading={isUploading}
    />
  )
}