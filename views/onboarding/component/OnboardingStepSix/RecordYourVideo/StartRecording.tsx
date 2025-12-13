import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Video } from "lucide-react"

export default function StartRecording() {
  return (
    <div className="flex flex-col gap-3">
      <Typography variant="body-3" color="neutral-400">
        Record your video directly, or upload a link from YouTube or Vimeo to get started.
      </Typography>

      <BaseButton
        variant="secondary"
        iconLeft={<Video className="w-5 h-5"/>}>
        Start recording
      </BaseButton>
    </div>
  )
}