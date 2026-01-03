import Typography from "@/components/base/Typography"
import { RefreshCcw } from "lucide-react"

export default function GuaranteeNotice() {
  return (
    <div className="rounded-sm bg-green-light py-2 px-3 gap-3 flex justify-start items-center">
      <RefreshCcw className="w-6 h-6 text-green-normal"/>
      <div className="w-full flex flex-col">
        <Typography variant={{ base: "title-3" }} color="green-normal">
          Free tutor replacement
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-400">
          If this tutor isn’t a match, try 2 more for free
        </Typography>
      </div>
    </div>
  )
}