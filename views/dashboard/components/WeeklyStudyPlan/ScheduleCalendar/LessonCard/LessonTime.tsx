import Typography from "@/components/base/Typography";

interface LessonTimeI {
  isPast: boolean;
  startTime: string;
  endTime: string;
}
export default function LessonTime({
  isPast,
  startTime,
  endTime,
}: LessonTimeI) {
  return (
    <Typography variant="label-3" color={ isPast ? "neutral-300" : "electric-violet-600"}>
      {startTime} - {endTime}
    </Typography>
  )
}