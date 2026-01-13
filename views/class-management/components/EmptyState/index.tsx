import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { EmptyBoxIcon } from "@/components/icons"


export default function EmptyState() {
  return (
    <div className="py-12 px-5 lg:px-0 flex flex-col items-center gap-4">
      <EmptyBoxIcon />      
      
      <div className="flex flex-col gap-1">
        <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-700">
          Don't Miss Out on Learning!
        </Typography>

        <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400"> 
          Your calendar shows no classes booked. Pick a time and subject that works for you and get started!
        </Typography>
      </div>
      
      <BaseButton typeStyle={{ base: "outline", lg: "default" }}>
        Find classes
      </BaseButton>
    </div>
  )
}