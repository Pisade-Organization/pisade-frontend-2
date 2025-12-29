import Typography from "@/components/base/Typography"

interface LessonSubjectI {
  name: string;
}

export default function LessonSubject({
  name
}: LessonSubjectI) {
  return (
    <Typography variant="label-3" color="neutral-800">
      { name }
    </Typography>
  )
} 