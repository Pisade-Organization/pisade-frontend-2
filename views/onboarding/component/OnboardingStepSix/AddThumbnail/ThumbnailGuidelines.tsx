import { SquareArrowRight } from "lucide-react"
import Typography from "@/components/base/Typography"

export default function ThumbnailGuidelines() {
  return (
    <div className="flex flex-col gap-3">

      {/* GUIDELINE BUTTON */}
      <div className="inline-flex justify-start items-center gap-2">
        <SquareArrowRight className="w-4 h-4 text-electric-violet-700" />
        <Typography variant={{ base: "label-4" , lg: "label-3"}} color="electric-violet-700" underline>
          Learn more about thumbnail guidelines
        </Typography>
      </div>

      {/* DESCRIPTION */}
      <Typography variant={{ base: "body-3" }} color="neutral-400">
        Don't worry if you don't have a thumbnail ready, we'll use the preview above.
      </Typography>
    </div>
  )
}