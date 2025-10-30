import Typography from "@/components/base/Typography";
import { DocumentType } from "@/views/onboarding/types/document.types";
export default function DocumentButton({
  title,
  documentType,
  setDocumentType
}: {
  title: DocumentType
  documentType: DocumentType;
  setDocumentType: (documentType: DocumentType) => void;
}) {
  return (
    <button 
    onClick={() => setDocumentType(title)}
    className="
    w-full
    rounded-[12px] border border-neutral-50
    flex items-center py-3 px-4 gap-3
    ">

      <div className="rounded-full h-5 w-5 flex justify-center items-center border border-neutral-100 transition-all">
        { documentType === title && (
          <div className="rounded-full w-3 h-3 bg-electric-violet-500 transition-all" />
        )}
      </div>
      
      <div className="flex items-start flex-col gap-[2px]">
        <Typography variant="label-3" color="neutral-900">
          { title }
        </Typography>

        <Typography variant="body-3" color="neutral-500">
          { title === "ID Card" && "National Identification Card"}
          { title === "Passport" && "International Passport"}
        </Typography>
      </div>
    </button>
  )
}