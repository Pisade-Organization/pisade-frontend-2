import Typography from "@/components/base/Typography"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DateNavigatorProps {
  currentDate: Date
  onPreviousWeek: () => void
  onNextWeek: () => void
}

function formatDateRange(currentDate: Date) {
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate() - 1)

  const endDate = new Date(currentDate)
  endDate.setDate(endDate.getDate() + 5)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const startMonth = monthNames[startDate.getMonth()]
  const startDay = startDate.getDate()
  const endMonth = monthNames[endDate.getMonth()]
  const endDay = endDate.getDate()
  const year = endDate.getFullYear()

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

export default function DateNavigator({ currentDate, onPreviousWeek, onNextWeek }: DateNavigatorProps) {
  return (
    <div className="w-full flex justify-between items-center rounded-xl border border-neutral-100 py-3 px-4">
      <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-700">
        {formatDateRange(currentDate)}
      </Typography>

      <div className="inline-flex gap-2">
        <button type="button" onClick={onPreviousWeek} aria-label="Previous week">
          <ChevronLeft className="w-6 h-6 text-neutral-300" />
        </button>

        <button type="button" onClick={onNextWeek} aria-label="Next week">
          <ChevronRight className="w-6 h-6 text-neutral-300" />
        </button>
      </div>
    </div>
  )
}
