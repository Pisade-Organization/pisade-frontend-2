import Typography from "@/components/base/Typography"

interface DateRangeLabelProps {
  startDate: Date;
  endDate: Date;
}

export default function DateRangeLabel({
  startDate,
  endDate,
}: DateRangeLabelProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric" });
  };

  const startFormatted = formatDate(startDate);
  const endFormatted = formatDate(endDate);
  const year = formatYear(endDate);

  const label = `${startFormatted} - ${endFormatted}, ${year}`;

  return (
    <Typography variant={{ base: "label-3", lg: "label-1" }} color="neutral-700">
      { label }
    </Typography>
  )
}