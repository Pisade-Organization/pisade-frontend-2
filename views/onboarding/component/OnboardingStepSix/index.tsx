import VideoGuidelines from "./VideoGuidelines"
import VideoRequirements from "./VideoRequirements"
import RecordYourVideo from "./RecordYourVideo"

export default function OnboardingStepSix() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <VideoGuidelines />
      <VideoRequirements />
      <RecordYourVideo />
    </div>
  )
}