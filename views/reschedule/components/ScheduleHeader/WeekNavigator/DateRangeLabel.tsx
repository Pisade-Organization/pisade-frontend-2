import Typography from "@/components/base/Typography"
import type { CalendarView } from "@/views/schedule/components/ScheduleContent/calendar.utils"

interface DateRangeLabelProps {
  startDate: Date;
  endDate: Date;
  view: CalendarView;
}

export default function DateRangeLabel({
  startDate,
  endDate,
  view,
}: DateRangeLabelProps) {
  const label = (() => {
    if (view === "day") {
      return startDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    if (view === "month") {
      return startDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    const startFormatted = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endFormatted = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const year = endDate.toLocaleDateString("en-US", { year: "numeric" });

    return `${startFormatted} - ${endFormatted}, ${year}`;
  })();

  return (
    <Typography
      variant={{ base: "body-4", lg: "label-1" }}
      color="neutral-700"
    >
      {label}
    </Typography>
  )
}
