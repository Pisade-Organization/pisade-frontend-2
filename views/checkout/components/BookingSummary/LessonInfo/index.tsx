import Typography from "@/components/base/Typography"
import LessonScheduleCard from "./LessonScheduleCard"

interface LessonInfoI {
  lessonName: string;
  date: Date;
  startTime: string;
  endTime: string;
  timezone: string;
}

function formatLessonDateTime(date: Date, startTime: string, endTime: string): string {
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  };
  
  const dateStr = date.toLocaleDateString(undefined, dateOptions).replace(/,/g, '');
  
  return `${dateStr}, ${startTime} - ${endTime}`;
}

export default function LessonInfo({
  lessonName,
  date,
  startTime,
  endTime,
  timezone
}: LessonInfoI) {
  return (
    <div className="w-full flex flex-col gap-1 lg:gap-2">

      <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-900">
        { lessonName }
      </Typography>

      {/* Mobile view */}
      <div className="flex flex-col gap-1 lg:hidden">
        <Typography variant={{ base: "body-3"}} color="neutral-700">
          { formatLessonDateTime(date, startTime, endTime) }
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-700">
          { timezone }
        </Typography>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block">
        <LessonScheduleCard
          date={date}
          startTime={startTime}
          endTime={endTime}
          timezone={timezone}
        />
      </div>

    </div>
  )
}