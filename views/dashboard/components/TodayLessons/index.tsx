import MyScheduleBtn from "./MyScheduleBtn"
import CardList from "./CardList"
import Typography from "@/components/base/Typography"
import { useTodayLessons } from "@/hooks/dashboard/queries"

function formatTime(dateIso: string) {
  const date = new Date(dateIso)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
}

export default function TodayLessons() {
    const { data: lessons = [] } = useTodayLessons()

    const cards = lessons.map((lesson) => {
        const start = new Date(lesson.scheduledAt)
        const end = new Date(start)
        end.setMinutes(end.getMinutes() + lesson.duration)

        return {
            avatarUrl: lesson.tutor.user.profile?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
            fromTime: formatTime(start.toISOString()),
            toTime: formatTime(end.toISOString()),
            subject: "Lesson",
            tutorName: lesson.tutor.user.profile?.fullName ?? "Tutor",
        }
    })

    return (
        <div className="w-full flex flex-col justify-center items-start
        gap-4 px-4 py-5 lg:gap-7 lg:px-20 lg:py-12 bg-electric-violet-25
        ">
            
            <div className="flex justify-between items-center w-full">
                <Typography variant={{ base: "title-1", lg: "headline-4" }} color="neutral-900">
                    Today's Lessons
                </Typography>

                <MyScheduleBtn />
            </div>

            <div className="w-full">
                {cards.length > 0 && (
                    <CardList 
                        cards={cards}
                    />
                )}
            </div>
            
        </div>
    )
}
