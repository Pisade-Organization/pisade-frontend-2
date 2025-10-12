"use client"
import { Star } from "lucide-react"

export default function TutorStats({
    avgRating,
    studentsCount,
    lessonsCount,
}: {
    avgRating: number,
    studentsCount: number,
    lessonsCount: number,
}) {
    return (
        <div className="flex justify-center items-center gap-x-5">
            
            <div className="flex justify-center items-center gap-x-1">
                <Star size={20} color="#FFB130" fill="#FFB130"/>

                <div className="text-label-2 text-neutral-900">{avgRating}/5</div>

                <div className="text-body-2 text-neutral-600">Rating</div>
            </div>

            <div className="flex justify-center items-center gap-x-1">

                <div className="text-label-2 text-neutral-900">{studentsCount}</div>

                <div className="text-body-2 text-neutral-600">Students</div>

            </div>

            <div className="flex justify-center items-center gap-x-1">

                <div className="text-label-2 text-neutral-900">{lessonsCount}</div>

                <div className="text-body-2 text-neutral-600">Lessons</div>

            </div>
        </div>
    )
}