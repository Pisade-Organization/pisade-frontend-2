import Typography from "@/components/base/Typography"

export default function ReasonLabel({ label }: { label: string }) {
  return (
    <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-900">
      { label }
    </Typography>
  )
}