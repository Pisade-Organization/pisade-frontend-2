import { Check } from "lucide-react"
import Typography from "@/components/base/Typography"
export default function PhotoGuidelines() {
  const guidelines = [
    "Look straight ahead",
    "Show your head and shoulders",
    "Keep your body centered and straight",
    "Face and eyes must be clearly visible",
    "Only you should be in the photo",
    "Use a high-res color photo (no filters)",
    "No logos or contact details"
  ]
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      {guidelines.map((guideline) => (
        <div className="inline-flex gap-2">
          <Check size={18} className="text-green-normal"/>
          <Typography variant="body-3" color="neutral-500">{ guideline }</Typography>
        </div>
      ))}
      
    </div>
  )
}