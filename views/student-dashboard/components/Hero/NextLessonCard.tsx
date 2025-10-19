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
        <div className="flex flex-col justify-center items-start py-6 px-8 gap-3 rounded-[16px] bg-transparent">

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