import Typography from "@/components/base/Typography"
import { ImagePlus } from "lucide-react"
export default function UploadYourPhoto() {
  return (
    <div className="flex flex-col lg:flex-row justify-start items-center py-2 lg:py-0 gap-5 lg:gap-8">
      <button className="w-32 h-32 rounded-full border border-deep-royal-indigo-100 p-4 border-dashed flex justify-center items-center">
        <ImagePlus size={40} className="text-deep-royal-indigo-50" />
      </button>

      <div className="flex flex-col justify-center items-start gap-[2px]">
        <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-700">Upload your Photo</Typography>
        <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-400">File types: JPG, HEIC, PNG. Max 5 MB</Typography>
      </div>
    </div>
  )
}