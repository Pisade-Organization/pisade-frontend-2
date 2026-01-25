import Typography from "@/components/base/Typography"

export default function Title({
  title
}: {
  title: string
}) {
  return (
    <Typography variant={{ base: "title-2", lg: "headline-5" }} color="neutral-900">
      { title }
    </Typography>
  )
}