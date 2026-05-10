import TeachingInfoHeader from "./TeachingInfoHeader"
import TeachingInfoView from "./TeachingInfoView"

interface TeachingInfoSectionI {
  subject: string;
  languages: string;
}

export default function TeachingInfoSection({
  subject,
  languages,
}: TeachingInfoSectionI) {
  return (
    <div className="bg-white w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8 rounded-t-2xl">
      <TeachingInfoHeader />
      <TeachingInfoView
        subject={subject}
        languages={languages}
      />
    </div>
  )
}
