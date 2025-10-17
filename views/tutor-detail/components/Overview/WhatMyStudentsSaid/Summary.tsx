import { Star } from "lucide-react"
export default function Summary({
    avgRating,
    studentReviewsCount
}: {
    avgRating: number
    studentReviewsCount: number
}) {
    return (
        <div className="flex justify-center items-start gap-x-1">

            <Star size={24} color="#FFB130" fill="#FFB130" />

            <div className="flex flex-col justify-center items-start gap-y-px">

                <div className="text-headline-5 text-neutral-900">
                    { avgRating }/5
                </div>

                <div className="text-body-3 text-neutral-600">
                    Based on { studentReviewsCount } student reviews
                </div>
            </div>
            
        </div>
    )
}