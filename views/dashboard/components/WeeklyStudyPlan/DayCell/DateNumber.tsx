import Typography from "@/components/base/Typography"

interface DateNumberI {
  date: number;
  isPast: boolean;
  isCurrent: boolean;
}

export default function DateNumber({
  date, isPast, isCurrent
}: DateNumberI) {
  return (
    <Typography 
      variant={{ base: "label-3", lg: "label-1"}}
      color={
        isPast ? "neutral-400"
        : isCurrent ? "electric-violet-600"
        : "neutral-900"
      }
      className={
        isCurrent ? "rounded-full bg-electric-violet-50 w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center" :
        ""
      }
    >
      { date }
    </Typography>
  )
}