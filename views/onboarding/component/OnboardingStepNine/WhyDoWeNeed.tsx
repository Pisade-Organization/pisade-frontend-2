import Typography from "@/components/base/Typography"
export default function WhyDoWeNeed() {
  return (
    <div className="w-full bg-white flex flex-col rounded-t-[20px] pt-4 pb-5 lg:py-5 px-4 lg:px-8 gap-1 lg:gap-3">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Why do we need this?
      </Typography>

      <div className="flex flex-col gap-1 ml-5">
        <li>
          <Typography variant="body-3" color="neutral-500">
            Ensure all tutors are verified for student safety
          </Typography>
        </li>

        <li>
          <Typography variant="body-3" color="neutral-500">
            Build trust within our learning community
          </Typography>
        </li>

        <li>
          <Typography variant="body-3" color="neutral-500">
            Comply with education platform regulations
          </Typography>
        </li>

      </div>
    </div>
  )
}