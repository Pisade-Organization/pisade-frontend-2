import Typography from "@/components/base/Typography"

interface LessonTitleI {
  title: string;
}

export default function LessonTitle({ title }: LessonTitleI) {
  return (
    <Typography variant={{ base: "title-3", lg: "headline-5" }} color="neutral-900">
      { title }
    </Typography>
  )
}