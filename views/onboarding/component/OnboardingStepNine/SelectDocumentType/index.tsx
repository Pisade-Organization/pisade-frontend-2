import Typography from "@/components/base/Typography"
import DocumentButton from "./DocumentButton"
import { DocumentType } from "@/views/onboarding/types/document.types"
import Info from "./Info";
export default function SelectDocumentType({
  documentType,
  setDocumentType
}: {
  documentType: DocumentType,
  setDocumentType: (documentType: DocumentType) => void;
}) {
  return (
    <div className="w-full bg-white pt-4 pb-5 lg:py-5 px-4 lg:px-8 gap-5 lg:gap-4 flex flex-col">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Select document type
      </Typography>

      <div className="w-full flex flex-col lg:flex-row gap-4">
        <DocumentButton 
          title="ID Card"
          documentType={documentType}
          setDocumentType={() => setDocumentType("ID Card")}
        />

        <DocumentButton 
          title="Passport"
          documentType={documentType}
          setDocumentType={() => setDocumentType("Passport")}
        />
      </div>

      <Info />

    </div>
  )
}