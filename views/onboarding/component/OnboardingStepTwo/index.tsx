import PhotoGuidelines from "./PhotoGuidelines"
import UploadYourPhoto from "./UploadYourPhoto"
import PhotoExamples from "./PhotoExamples"
export default function OnboardingStepTwo() {
  return (
    <div className="bg-white rounded-[15px] w-full flex flex-col justify-center items-start gap-4 py-4 px-5 lg:py-0 lg:pt-8 lg:pb-12 lg:px-8 lg:gap-8">
      <UploadYourPhoto />

      <div className="w-full flex lg:flex-row flex-col justify-center lg:justify-between items-center gap-6 ">
        <PhotoGuidelines />
        <PhotoExamples />
      </div>
    </div>
  )
}