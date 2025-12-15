import Typography from "@/components/base/Typography"

export default function VideoUploadPlaceholder() {
  return (
    <div className="w-full bg-white flex justify-center items-center pt-4 py-5 px-4 gap-3">

      <div className="w-[343px] h-[164.42px] lg:w-[417px] lg:h-[200px] flex flex-col justify-center items-center py-3 px-4 border border-neutral-100 rounded-xl">
        <Typography variant={{ base: "title-3" }} color="neutral-700">
          Add a horizontal video of up to 2 minutes
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-300">
          Your video will appear here
        </Typography>
      </div>
    </div>
  )
}