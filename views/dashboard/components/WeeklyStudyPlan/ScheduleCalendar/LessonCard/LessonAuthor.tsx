import Typography from "@/components/base/Typography";

interface LessonAuthorI {
  isPast: boolean;
  fullName: string;
  className?: string;
}

export default function LessonAuthor({
  isPast,
  fullName,
  className
}: LessonAuthorI) {
  return (
    <Typography variant="label-3" color={ isPast ? "neutral-300" : "neutral-800"} className={className}>
      { fullName }
    </Typography>
  )
}