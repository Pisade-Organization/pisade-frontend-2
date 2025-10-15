import { Star } from "lucide-react"

export default function TutorStats({
    avgRating,
    studentsCount,
    lessonsCount,
}: {
    avgRating: number
    studentsCount: number
    lessonsCount: number
}) {
    return (
        <div className="w-full flex justify-between items-center">

            <div className="flex flex-col justify-center items-start">
                <div className="flex justify-center items-center gap-x-1">
                    <div className="text-neutral-900 text-headline-5">{avgRating}/5</div>
                    <Star color={"#FFB130"} fill={"#FFB130"} size={20}/>
                </div>

                <div className="text-neutral-600 text-body-3 lg:text-body-2">
                    Rating
                </div>
            </div>

            <div className="flex flex-col justify-center items-start">
                <div className="text-neutral-900 text-headline-5">
                    { studentsCount }
                </div>

                <div className="text-neutral-600 text-body-3 lg:text-body-2">
                    Students
                </div>

            </div>

            <div className="flex flex-col justify-center items-start">
                <div className="text-neutral-900 text-headline-5">
                    { lessonsCount }
                </div>

                <div className="text-neutral-600 text-body-3 lg:text-body-2">
                    Lessons
                </div>
            </div>
        </div>
    )
}