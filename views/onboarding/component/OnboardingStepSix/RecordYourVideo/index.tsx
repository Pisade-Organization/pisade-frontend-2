import Typography from "@/components/base/Typography"
import StartRecording from "./StartRecording"
import VideoImport from "./VideoImport"
export default function RecordYourVideo() {
  return (
    <div className="w-full flex flex-col pt-4 px-4 pb-5 lg:py-5 lg:px-8 gap-5 lg:gap-4 bg-white">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Record Your Video
      </Typography>

      <div className="hidden lg:block w-screen relative -left-4 lg:-left-8 border-t border-electric-violet-50"/>

      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6">
        <div className="w-full lg:flex-1">
          <StartRecording />
        </div>

        <div className="lg:hidden w-full border-t border-electric-violet-50"/>
        <div className="hidden lg:block border-r border-neutral-50 h-[94px] "/>

        <div className="w-full lg:flex-1">
          <VideoImport />
        </div>
      </div>

    </div>
  )
}