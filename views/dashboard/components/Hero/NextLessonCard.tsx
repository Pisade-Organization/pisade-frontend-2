import NextLessonHeader from "./NextLessonHeader"
import CountdownTimer from "./CountdownTimer"
import ActionButtons from "./ActionButtons"
export default function NextLessonCard({
    lessonTitle,
    tutorName,
    avatarUrl,
    lessonTime,
    meetingUrl,
    canJoin,
    joinAvailableAt,
    secondaryActionHref,
    actionLabel,
    headerText
}: {
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
}) {
    return (
        <div className="hidden lg:flex flex-col justify-center items-start py-6 px-8 gap-3 rounded-[16px] bg-[linear-gradient(90.6deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.12)_100%)] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)]">

            <NextLessonHeader 
                lessonTitle={lessonTitle}
                tutorName={tutorName}
                avatarUrl={avatarUrl}
                headerText={headerText}
            />

            <div className="flex justify-center items-center gap-6">
                <CountdownTimer 
                    lessonTime={lessonTime}
                />
                <ActionButtons
                    meetingUrl={meetingUrl}
                    canJoin={canJoin}
                    joinAvailableAt={joinAvailableAt}
                    secondaryActionHref={secondaryActionHref}
                    actionLabel={actionLabel}
                />
            </div>

        </div>
    )
}
