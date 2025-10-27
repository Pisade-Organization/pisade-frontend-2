import { Info } from "lucide-react"
import Typography from "@/components/base/Typography"

export default function Guide() {
  return (
    <div className="flex justify-start items-start gap-2 py-2 px-4 bg-electric-violet-25 rounded-[15px]">
      <Info size={20} className="text-deep-royal-indigo-500 mt-0.5"/>
      
      <div className="flex flex-col justify-center items-start gap-[2px]">
        <Typography variant={{ base: "label-4", lg: "title-3" }}color="deep-royal-indigo-500">
          Add popular hours to get more students
        </Typography>

        <Typography variant={{ base: "body-4", lg: "body-3" }} color="deep-royal-indigo-500">
          Most students book lessons between 6:00 and 9:00 (popular hours). Add time slots during these hours to triple your chances of getting booked.
        </Typography>
      </div>
    </div>
  )
}