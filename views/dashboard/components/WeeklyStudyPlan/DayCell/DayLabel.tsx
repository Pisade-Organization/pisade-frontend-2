import Typography from "@/components/base/Typography"

interface DayLabelI {
  label: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  isPast: boolean;
}

export default function DayLabel({
  label, isPast
}: DayLabelI) {
  return (
    <Typography variant={{ base: "label-3", lg: "label-1" }}
      color={
        isPast ? "neutral-400" : "neutral-900"
      }
    >
      {label}
    </Typography>
  )
}