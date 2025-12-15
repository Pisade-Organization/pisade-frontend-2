import Typography from "@/components/base/Typography"
import { ImagePlus } from "lucide-react"
export default function ThumbnailUpload() {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-3 lg:gap-6 lg:p-4 lg:rounded-3xl lg:border lg:border-deep-royal-indigo-50">
      
      {/* DIVIDER */}
      <div className="lg:hidden w-full border-t border-deep-royal-indigo-50"/>
      
      {/* UPLOAD */}
      <button className="w-[239px] h-[130px] p-4 flex justify-center items-center border border-dashed border-deep-royal-indigo-100 rounded-2xl">
        <ImagePlus className="w-10 h-10 text-deep-royal-indigo-50"/>
      </button>

      {/* RULES */}
      <div className="flex flex-col justify-center items-center lg:items-start gap-1">

        <Typography variant={{ base: "title-3" }} color="neutral-700">
          Add a thumbnail
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-400">
          File Types: JPEG or PNG formats only, size of 20MB max
        </Typography>

      </div>

      {/* DIVIDER */}
      <div className="lg:hidden w-full border-t border-deep-royal-indigo-50"/>
    </div>
  )
}