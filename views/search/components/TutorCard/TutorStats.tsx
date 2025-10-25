"use client"
import { Star } from "lucide-react"
import Typography from "@/components/base/Typography"

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
            
            <div className="flex flex-row-reverse lg:flex-row justify-center items-center gap-x-1">
                <Star size={20} color="#FFB130" fill="#FFB130"/>
                <Typography variant="label-2" color="neutral-900">{ avgRating }/5</Typography>
                <Typography variant="body-2" color="neutral-600" className="hidden lg:block">Rating</Typography>
            </div>

            <div className="flex justify-center items-center gap-x-1">
                <Typography variant="label-2" color="neutral-900">{ studentsCount }</Typography>
                <Typography variant="body-2" color="neutral-600">Students</Typography>
            </div>

            <div className="flex justify-center items-center gap-x-1">
                <Typography variant="label-2" color="neutral-900">{ lessonsCount }</Typography>
                <Typography variant="body-2" color="neutral-600">Lessons</Typography>
            </div>
        </div>
    )
}