import EducationForm from "./EducationForm"
import UploadCertification from "./UploadCertification"

interface DiplomaFormProps {
  index: number
}

export default function DiplomaForm({ index }: DiplomaFormProps) {
  return (
    <div className="w-full flex flex-col gap-px border border-neutral-50 rounded-[16px]">
      <EducationForm index={index} />
      <UploadCertification index={index} />
    </div>   
  )
}