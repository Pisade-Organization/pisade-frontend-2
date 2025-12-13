import { SquareArrowRight } from "lucide-react"
import Typography from "@/components/base/Typography"

export default function VideoGuidelines() {
  return (
    <div className="inline-flex justify-start items-center w-full pt-4 px-4 pb-5 lg:py-5 lg:px-8 gap-4 lg:gap-3 rounded-t-[20px] bg-white">
      <SquareArrowRight className="w-4 h-4 text-electric-violet-700" />
      <Typography variant={{ base: "label-4", lg: "label-3" }} color="electric-violet-700" underline>
        Learn more about video guidelines
      </Typography>
    </div>
  )
}