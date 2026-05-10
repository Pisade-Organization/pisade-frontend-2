import Typography from "@/components/base/Typography"

export default function TeachingInfoHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Teaching Info
      </Typography>
    </div>
  )
}
