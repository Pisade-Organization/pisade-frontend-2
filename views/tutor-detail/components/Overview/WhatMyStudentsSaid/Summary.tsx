import Typography from "@/components/base/Typography"
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

                <Typography variant="headline-5" color="neutral-900">
                    { avgRating }/5
                </Typography>
                <Typography variant="body-3" color="neutral-600">
                    Based on { studentReviewsCount } student reviews
                </Typography>


                


            </div>
            
        </div>
    )
}