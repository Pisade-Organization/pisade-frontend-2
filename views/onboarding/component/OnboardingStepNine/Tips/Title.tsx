import Typography from "@/components/base/Typography"

export default function Title() {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Tips for a good photo
      </Typography>

      <Typography variant={{ base: "body-3" }} color="neutral-400">
        Follow these guidelines to ensure your document is accepted.
      </Typography>
    </div>
  )
}