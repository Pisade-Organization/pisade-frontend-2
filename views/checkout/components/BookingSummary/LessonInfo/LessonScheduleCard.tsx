import Typography from "@/components/base/Typography"

interface LessonScheduleCardProps {
  date: Date;
  startTime: string;
  endTime: string;
  timezone: string;
}

function formatTimeTo12Hour(timeString: string): string {
  // Parse time string (e.g., "22:00" or "6:00")
  const [hours, minutes] = timeString.split(':').map(Number);
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // If minutes are 00, don't show them (e.g., "6PM" instead of "6:00PM")
  return minutes === 0 ? `${hour12}${ampm}` : `${hour12}:${minutes.toString().padStart(2, '0')}${ampm}`;
}

function formatScheduleDateTime(date: Date, startTime: string, endTime: string): string {
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const weekday = date.toLocaleDateString(undefined, weekdayOptions);
  
  const formattedStartTime = formatTimeTo12Hour(startTime);
  const formattedEndTime = formatTimeTo12Hour(endTime);
  
  return `${weekday}, ${formattedStartTime} - ${formattedEndTime}`;
}

export default function LessonScheduleCard({
  date,
  startTime,
  endTime,
  timezone
}: LessonScheduleCardProps) {
  const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
  const month = date.toLocaleDateString(undefined, monthOptions);
  const day = date.getDate();

  return (
    <div className="w-full rounded-xl p-1 flex justify-start items-center gap-4 bg-white border border-neutral-50">
      
      <div className="rounded-lg p-4 flex flex-col gap-2 bg-electric-violet-50">

        <Typography variant="label-3" color="deep-royal-indigo-200">
          {month}
        </Typography>

        <Typography variant="headline-5" color="deep-royal-indigo-500">
          {day}
        </Typography>

      </div>

      <div className="w-full flex flex-col items-start">

        <Typography variant="label-2" color="neutral-500">
          {formatScheduleDateTime(date, startTime, endTime)}
        </Typography>

        <Typography variant="body-2" color="neutral-500">
          {timezone}
        </Typography>

      </div>
    </div>
  )
}