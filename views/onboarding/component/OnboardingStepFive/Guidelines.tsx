import { SquareArrowRight } from "lucide-react"
import Typography from "@/components/base/Typography"

export default function Guidelines() {
  return (
    <div className="w-full bg-white rounded-t-[20px] py-4 px-5 lg:py-5 lg:px-8 flex justify-start items-center gap-4 lg:gap-3">
      <SquareArrowRight size={16} className="text-electric-violet-700" />
      <Typography variant={{ base: "label-4", lg: "label-3" }} color="electric-violet-700" underline className="cursor-pointer">
        Guidelines to get approved
      </Typography>
    </div>
  )
}