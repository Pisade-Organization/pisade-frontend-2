import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"

export default function VideoImport() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Typography variant="label-3" color="neutral-800">
          Or paste link to your video
        </Typography>
        
        <Typography variant={{ base: "body-3" }} color="neutral-400">
          Learn how to upload vidoes to <span className="underline text-neutral-800">Youtube</span> or <span className="underline text-neutral-800">Vimeo</span>
        </Typography>
      </div>

      <BaseInput 
        placeholder="www.youtube.com/watch?v=I5aZ.."
      />

    </div>
  )
}