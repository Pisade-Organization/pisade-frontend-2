import Do from "./Do"
import Dont from "./Dont"
import Typography from "@/components/base/Typography"

export default function VideoRequirements() {
  return (
    <div className="bg-white w-full flex flex-col gap-5 lg:gap-4 pt-4 pb-5 px-4 lg:py-5 lg:px-8">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Video requirements
      </Typography>
      
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <Do />
        <Dont />
      </div>
    </div>
  )
}