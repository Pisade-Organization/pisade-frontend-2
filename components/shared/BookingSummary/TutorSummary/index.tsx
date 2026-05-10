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
    <div className="w-full flex flex-col gap-3 lg:gap-4">
      {/* Row 1: Avatar + Name/Subject - same row on both mobile and desktop */}
      <div className="w-full flex items-start gap-4">
        <TutorAvatar avatarUrl={avatarUrl} />
        <TutorMeta 
          fullName={tutorName}
          countryUrl={countryUrl}
          subject={subject}
        />
      </div>

      {/* Row 2: Stats - separate row */}
      <TutorStats 
        rating={rating}
        studentsCount={studentsCount}
        lessonsCount={lessonsCount}
      />
    </div>
  )
}
