import Typography from "@/components/base/Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateCalendar() {
  return (
    <div className="border border-neutral-50 flex flex-col gap-[2px] p-4 bg-white">
      <div className="py-1 flex justify-between items-center">
        <Typography variant="title-2" color="neutral-900">
          February 2025
        </Typography>

        <div className="flex gap-3">
          <ChevronLeft className="w-5 h-5 text-neutral-200 cursor-pointer" />
          <ChevronRight className="w-5 h-5 text-neutral-900 cursor-pointer" />
        </div>
      </div>

      {/* Date calendar */}
      <div className="grid grid-cols-7">

      </div>
    </div>
  )
}