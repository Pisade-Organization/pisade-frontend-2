import { ImagePlus } from "lucide-react"
import Typography from "@/components/base/Typography"

interface UploadCertificationProps {
  index: number
}

export default function UploadCertification({ index }: UploadCertificationProps) {
  return (
    <div className="rounded-b-[20px] flex flex-col gap-4 p-4 lg:pt-5 lg:pb-6 lg:px-6 lg:gap-5 bg-white">
      <Typography variant={{ base: "title-3", lg: "title-1" }} color="neutral-900">
        Get a "Diploma verified" badge
      </Typography>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center">
        <button className="rounded-[12px] w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] flex justify-center items-center py-4 border border-dashed border-deep-royal-indigo-100">
          <ImagePlus size={40} className="text-deep-royal-indigo-50"/>
        </button>


        <div className="flex flex-col gap-1">
          <Typography variant={{ base: "title-3" }} color="neutral-700">
            Upload your certificate to boost your credibility! 
          </Typography>

          <Typography variant={{ base: "body-3" }} color="neutral-400">
            File types: JPG, HEIC, PNG. Max 5 MB
          </Typography>
        </div>
      </div>

    </div>
  )
}