import Typography from "@/components/base/Typography"
import { Info } from "lucide-react"
export default function Caution() {
  return (
    <div className="inline-flex justify-start items-center py-2 px-4 gap-3 rounded-[15px] bg-electric-violet-25">
      <Info className="w-4 h-4 text-deep-royal-indigo-500"/>   
      <Typography variant={{ base: "body-4" }} color="deep-royal-indigo-500">
        Do not include your surname, contact info, pricing or discounts, and irrelevant pictures in your thumbnail.  
      </Typography> 
    </div>
  )
}