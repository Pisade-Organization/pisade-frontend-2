import Typography from "@/components/base/Typography"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScheduleContentHeaderProps {
  selectedDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
}

export default function ScheduleContentHeader({
  selectedDate,
  onPreviousDay,
  onNextDay,
}: ScheduleContentHeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">

        <div className="flex gap-3 items-center">

          <div className="bg-white rounded-[8px] py-2 px-3 flex jusitfy-center items-center">
            <Typography variant="title-3" color="electric-violet-400">Schedule</Typography>
          </div>

          <Typography variant="label-2" color="neutral-900">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>

          <button type="button" onClick={onPreviousDay} aria-label="Previous day">
            <ChevronLeft className="w-5 h-5 text-neutral-900" />
          </button>

          <button type="button" onClick={onNextDay} aria-label="Next day">
            <ChevronRight className="w-5 h-5 text-neutral-900" />
          </button>

        </div>

        <div className="bg-white border-[2px] border-white rounded-md hidden lg:block">
          <button className="rounded-md py-2 px-5 bg-electric-violet-25">
            <Typography variant="title-3" color="electric-violet-400">Day</Typography>
          </button>


          <button className="rounded-md py-2 px-5 bg-white" disabled>
            <Typography variant="title-3" color="neutral-500">Week</Typography>
          </button>


          <button className="rounded-md py-2 px-5 bg-white" disabled>
            <Typography variant="title-3" color="neutral-500">Month</Typography>
          </button>
        </div>
    </div>
  )
}
