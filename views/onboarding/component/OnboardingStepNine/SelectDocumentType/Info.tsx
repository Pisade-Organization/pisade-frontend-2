import { Lock } from "lucide-react"
import Typography from "@/components/base/Typography"

export default function Info() {
  return (
    <div className="bg-electric-violet-25 py-2 px-4 gap-3 inline-flex rounded-[15px]">
      <Lock size={16} className="text-deep-royal-indigo-500" />
      <Typography variant="body-4" color="deep-royal-indigo-500">
        Your information is encrypted and stored securely
      </Typography>
    </div>
  )
}