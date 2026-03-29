import Greeting from "./Greeting"
import NextLessonCard from "./NextLessonCard"
import Banner from "./Banner"

interface HeroProps {
  fullName: string
  todayLessonCounts: number
  lessonTitle: string
  tutorName: string
  avatarUrl: string
  lessonTime: Date
  meetingUrl?: string | null
  canJoin?: boolean
  joinAvailableAt?: Date | null
  secondaryActionHref?: string | null
  actionLabel?: string
  headerText?: string
  showNextLessonCard?: boolean
}

export default function Hero({
  fullName,
  todayLessonCounts,
  lessonTitle,
  tutorName,
  avatarUrl,
  lessonTime,
  meetingUrl,
  canJoin,
  joinAvailableAt,
  secondaryActionHref,
  actionLabel,
  headerText,
  showNextLessonCard = true,
}: HeroProps) {
  return (
    <div className="relative w-full overflow-hidden py-3">
      {/* Banner Background */}
      <div className="absolute w-full h-full inset-0 z-0">
        <Banner />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-[160px] lg:min-h-[252px] lg:px-16 flex flex-col lg:flex-row justify-between items-center lg:items-center px-4 py-6 lg:py-0 gap-4 lg:gap-8">
        {/* Left: Greeting */}
        <div
          className={`flex-1 pt-4 lg:pt-0 flex items-center lg:items-start justify-center lg:justify-start ${showNextLessonCard ? "lg:max-w-[50%]" : "lg:max-w-full"}`}
        >
          <Greeting fullName={fullName} todayLessonCounts={todayLessonCounts} />
        </div>

        {/* Right: Next Lesson Card (Desktop only) */}
        {showNextLessonCard ? (
          <div className="lg:flex-shrink-0">
            <NextLessonCard
              lessonTitle={lessonTitle}
              tutorName={tutorName}
              avatarUrl={avatarUrl}
              lessonTime={lessonTime}
              meetingUrl={meetingUrl}
              canJoin={canJoin}
              joinAvailableAt={joinAvailableAt}
              secondaryActionHref={secondaryActionHref}
              actionLabel={actionLabel}
              headerText={headerText}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
