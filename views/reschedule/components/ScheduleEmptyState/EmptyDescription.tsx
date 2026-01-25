import Typography from "@/components/base/Typography";

export default function EmptyDescription() {
  return (
    <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400">
      There are currently no official class or <br/>
      course dates set for this timeframe.
    </Typography>
  )
}