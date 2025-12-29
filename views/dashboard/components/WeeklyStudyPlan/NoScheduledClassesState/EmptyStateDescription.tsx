import Typography from "@/components/base/Typography";

export default function EmptyStateDescription() {
  return (
    <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400" className="max-w-[394px]">
      Your calendar shows no classes booked. Pick a time and subject that works for you and get started!
    </Typography>
  )
}