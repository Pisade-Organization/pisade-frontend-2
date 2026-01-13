import Typography from "@/components/base/Typography";

interface LessonDescriptionI {
  description: string;
}

export default function LessonDescription({ description }: LessonDescriptionI) {
  return (
    <Typography variant="body-3" color="neutral-400">
      { description }
    </Typography>
  )
}