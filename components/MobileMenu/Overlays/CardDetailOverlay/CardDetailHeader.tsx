import Typography from "@/components/base/Typography"
import { X } from "lucide-react"

export default function CardDetailHeader() {
  return (
    <div className="w-full flex justify-between items-center px-4">
        <Typography variant="title-2" color="neutral-900">
          Card details
        </Typography>

        <X size={20} className="text-neutral-700" />
      </div>
  )
}