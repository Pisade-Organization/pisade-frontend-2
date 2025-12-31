import Typography from "@/components/base/Typography"
import { Dot } from "lucide-react"

export function ActiveBadge() {
  return (
    <div className="rounded-lg border border-neutral-50 bg-white py-1 px-[10px] inline-flex gap-[10px]">
      <Dot size={6} className="text-green-normal" />
      <Typography variant="body-4" color="neutral-700">
        Active
      </Typography>
    </div>
  )
}