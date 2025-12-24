import NextLessonHeader from "./NextLessonHeader"
import CountdownTimer from "./CountdownTimer"
import ActionButtons from "./ActionButtons"
export default function NextLessonCard({
    lessonTitle,
    tutorName,
    avatarUrl,
    lessonTime
}: {
    lessonTitle: string
    tutorName: string
    avatarUrl: string
    lessonTime: Date
}) {
    return (
        <div className="hidden lg:flex flex-col justify-center items-start py-6 px-8 gap-3 rounded-[16px] bg-[linear-gradient(90.6deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.12)_100%)] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)]">

            <NextLessonHeader 
                lessonTitle={lessonTitle}
                tutorName={tutorName}
                avatarUrl={avatarUrl}
            />

            <div className="flex justify-center items-center gap-6">
                <CountdownTimer 
                    lessonTime={lessonTime}
                />
                <ActionButtons />
            </div>

        </div>
    )
}