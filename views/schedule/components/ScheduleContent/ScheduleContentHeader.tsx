import Typography from "@/components/base/Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScheduleContentHeader() {
  return (
    <div className="w-full flex justify-between items-center">

        <div className="flex gap-3 items-center">

          <div className="bg-white rounded-[8px] py-2 px-3 flex jusitfy-center items-center">
            <Typography variant="title-3" color="electric-violet-400">Today</Typography>
          </div>

          <Typography variant="label-2" color="neutral-900">Friday, 7 Feb 2025</Typography>

          <ChevronLeft className="w-5 h-5 text-neutral-200" />

          <ChevronRight className="w-5 h-5 text-neutral-900" />

        </div>

        <div className="bg-white border-[2px] border-white rounded-md">
          <button className="rounded-md py-2 px-5 bg-electric-violet-25">
            <Typography variant="title-3" color="electric-violet-400">Day</Typography>
          </button>


          <button className="rounded-md py-2 px-5 bg-white">
            <Typography variant="title-3" color="neutral-500">Week</Typography>
          </button>


          <button className="rounded-md py-2 px-5 bg-white">
            <Typography variant="title-3" color="neutral-500">Month</Typography>
          </button>
        </div>
    </div>
  )
}