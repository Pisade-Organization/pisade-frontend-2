import Typography from "@/components/base/Typography"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DateNavigator() {
  return (
    <div className="w-full flex justify-between items-center rounded-xl border border-neutral-100 py-3 px-4">
      <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-700">
        Sep 24 - Sep 30, 2025
      </Typography>

      <div className="inline-flex gap-2">
        <ChevronLeft className="w-6 h-6 text-neutral-300" />

        <ChevronRight className="w-6 h-6 text-neutral-300" />
      </div>
    </div>
  )
}