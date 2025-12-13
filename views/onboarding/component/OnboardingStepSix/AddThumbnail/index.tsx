import Typography from "@/components/base/Typography"
import ThumbnailGuidelines from "./ThumbnailGuidelines"
import ThumbnailUpload from "./ThumbnailUpload"
import Caution from "./Caution"
export default function AddThumbnail() {
  return (
    <div className="flex flex-col gap-5 rounded-b-[20px] pt-4 pb-5 px-5 ">
      <Typography variant={{ base: "title-2" }} color="neutral-800">
        Add a thumbnail (optional)
      </Typography>

      <ThumbnailGuidelines />
      <ThumbnailUpload />
      <Caution />
    </div>
  )
}