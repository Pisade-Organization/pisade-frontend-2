import Typography from "@/components/base/Typography"

export default function Subtitle({
  subtitle
}: {
  subtitle: string
}) {
  return (
    <Typography variant={{ base: "body-3" }} color="neutral-500">
      { subtitle }
    </Typography>
  )
}