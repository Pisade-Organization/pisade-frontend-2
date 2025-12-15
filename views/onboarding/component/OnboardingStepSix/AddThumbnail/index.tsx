import Typography from "@/components/base/Typography"
import ThumbnailGuidelines from "./ThumbnailGuidelines"
import ThumbnailUpload from "./ThumbnailUpload"
import Caution from "./Caution"
export default function AddThumbnail() {
  return (
    <div className="bg-white w-full flex flex-col gap-5 rounded-b-[20px] pt-4 pb-5 px-5 ">
      <Typography variant={{ base: "title-2", lg: "title-1"}} color="neutral-800">
        Add a thumbnail (optional)
      </Typography>
      
      <div className="hidden lg:block w-screen relative -left-4 lg:-left-8 border-t border-electric-violet-50"/>
      
      <ThumbnailGuidelines />
      <ThumbnailUpload />
      <Caution />
    </div>
  )
}