import EducationForm from "./EducationForm"
import UploadCertification from "./UploadCertification"

interface DiplomaFormProps {
  index: number
  selectedFile?: File | null
  onFileChange?: (file: File | null, error: string | null) => void
  fileError?: string | null
  existingImageUrl?: string
  isUploading?: boolean
}

export default function DiplomaForm({ 
  index,
  selectedFile,
  onFileChange,
  fileError,
  existingImageUrl,
  isUploading
}: DiplomaFormProps) {
  return (
    <div className="w-full flex flex-col gap-px border border-neutral-50 rounded-[16px]">
      <EducationForm index={index} />
      <UploadCertification 
        index={index}
        selectedFile={selectedFile}
        onFileChange={onFileChange}
        fileError={fileError}
        existingImageUrl={existingImageUrl}
        isUploading={isUploading}
      />
    </div>   
  )
}