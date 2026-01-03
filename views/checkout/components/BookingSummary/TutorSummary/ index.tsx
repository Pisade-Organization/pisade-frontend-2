import type { TutorSummaryI } from "./types"
import TutorAvatar from "./TutorAvatar"
import TutorMeta from "./TutorMeta"
import TutorStats from "./TutorStats"


export default function TutorSummary({
  tutorName,
  countryUrl,
  avatarUrl,
  subject,
  rating,
  studentsCount,
  lessonsCount
}: TutorSummaryI) {
  return (
    <div className="w-full flex lg:flex-col items-center gap-4 lg:gap-5">
      <TutorAvatar avatarUrl={avatarUrl} />

      <div className="w-full flex flex-col gap-1 lg:gap-5">
        <TutorMeta 
          fullName={tutorName}
          countryUrl={countryUrl}
          subject={subject}
        />
        <TutorStats 
          rating={rating}
          studentsCount={studentsCount}
          lessonsCount={lessonsCount}
        />
      </div>
      
    </div>
  )
}