import Typography from "@/components/base/Typography"
import { ImagePlus } from "lucide-react"
export default function ThumbnailUpload() {
  return (
    <div className="flex flex-col gap-3">
      
      {/* DIVIDER */}
      <div className="w-full border-t border-deep-royal-indigo-50"/>
      
      {/* UPLOAD */}
      <button className="w-[239px] h-[130px] p-4 border border-dashed border-deep-royal-indigo-100 rounded-2xl">
        <ImagePlus className="w-10 h-10 text-deep-royal-indigo-50"/>
      </button>

      {/* RULES */}
      <div className="flex flex-col justify-center items-center gap-1">

        <Typography variant={{ base: "title-3" }} color="neutral-700">
          Add a thumbnail
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-400">
          File Types: JPEG or PNG formats only, size of 20MB max
        </Typography>

      </div>

      {/* DIVIDER */}
      <div className="w-full border-t border-deep-royal-indigo-50"/>
    </div>
  )
}