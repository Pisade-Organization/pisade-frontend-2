import Typography from "@/components/base/Typography"
export default function Title() {
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Set your availability
      </Typography>

      <Typography variant="body-3" color="neutral-400">
        Availability shows your potential working hours. Students can book lessons at these times.
      </Typography>
    </div>
  )
}