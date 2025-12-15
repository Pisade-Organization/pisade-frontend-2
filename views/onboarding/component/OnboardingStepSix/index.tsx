import VideoGuidelines from "./VideoGuidelines"
import VideoRequirements from "./VideoRequirements"
import RecordYourVideo from "./RecordYourVideo"
import AddThumbnail from "./AddThumbnail"
import VideoUploadPlaceholder from "./VideoUploadPlaceholder"

export default function OnboardingStepSix() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <VideoGuidelines />
      <VideoUploadPlaceholder />
      <VideoRequirements />
      <RecordYourVideo />
      <AddThumbnail />
    </div>
  )
}