import Typography from "@/components/base/Typography"
import { Upload as UploadIcon} from "lucide-react"

export default function Upload({
  documentType
}: {
  documentType: "ID_CARD" | "PASSPORT"
}) {
  return (
    <div className="bg-white w-full flex flex-col items-start gap-5 pt-4 pb-5 px-4 lg:py-5 lg:px-8 lg:gap-4">
      <Typography variant={{ base: "title-2", lg: "title-1" }}>
        Upload the image of your {documentType === "ID_CARD" ? "ID card" : "passport"}
      </Typography>

      <div className="w-full flex justify-center items-center">
        <button className="w-[343px] h-[215px] lg:w-[420px] lg:h-[295px] flex flex-col justify-center items-center rounded-2xl p-4 gap-[10px] border border-dashed border-deep-royal-indigo-100">
          <UploadIcon className="w-10 h-10 text-deep-royal-indigo-50" />
          <div className="flex flex-col gap-1"> 
            <Typography variant={{ base: "title-2" }} color="neutral-700">
              {documentType === "ID_CARD" ? "ID card" : "Passport"} upload
            </Typography>

            <Typography variant={{ base: "body-3" }} color="neutral-400">
              File types: JPG, PDF, PNG. Max 5 MB
            </Typography>
          </div>
        </button>
      </div>
      
    </div>
  )
}