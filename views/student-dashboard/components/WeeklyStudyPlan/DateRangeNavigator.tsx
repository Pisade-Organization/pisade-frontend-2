import Typography from "@/components/base/Typography"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DateRangeNavigatorI {
  currentDate: Date
}
export default function DateRangeNavigator({
  currentDate
}: DateRangeNavigatorI) {
  // Current date is always on the second day or second column

  // Calculate startDate (1 day before currentDate to make currentDate the second day)
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate() - 1)
  
  // Calculate endDate (5 days after currentDate to have 7 days total)
  const endDate = new Date(currentDate)
  endDate.setDate(endDate.getDate() + 5)

  // Format dates as "Sep 24 - Sep 30, 2025"
  const formatDateRange = (start: Date, end: Date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const startMonth = monthNames[start.getMonth()]
    const startDay = start.getDate()
    const endMonth = monthNames[end.getMonth()]
    const endDay = end.getDate()
    const year = end.getFullYear()
    
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
  }

  return (
    <div className="flex justify-between items-center py-2 px-3 lg:py-3 lg:px-5 border border-neutral-100 rounded-xl">
      <ChevronLeft size={24} className="lg:order-1"/>
      <Typography variant={{ base: "label-2", lg: "label-1" }} color="neutral-700" className="lg:order-3">
        {formatDateRange(startDate, endDate)}
      </Typography>
      <ChevronRight size={24} className="order-2" />
    </div>
  )
}