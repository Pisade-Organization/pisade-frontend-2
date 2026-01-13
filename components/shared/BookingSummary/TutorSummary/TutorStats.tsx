import Typography from "@/components/base/Typography"
import { Star } from "lucide-react"

interface TutorStatsI {
  rating: number;
  studentsCount: number;
  lessonsCount: number;
}

export default function TutorStats({
  rating,
  studentsCount,
  lessonsCount
}: TutorStatsI) {
  return (
    <div className="w-full flex justify-between items-center">
      
      {/* RATING */}
      <div className="flex flex-col items-start gap-[2px]">
        
        <div className="flex justify-start items-center gap-1">
          <Star className="w-5 h-5 text-yellow-normal fill-yellow-normal"/>
          
          <Typography variant={{ base: "title-1" }} color="neutral-900">
            {rating}/5
          </Typography>
        </div>

        <Typography variant={{ base: "body-3" }} color="neutral-600">
          Rating
        </Typography>

      </div>

      <div className="h-12 border-l border-neutral-200 mx-6" />

      {/* STUDENTS COUNT */}
      <div className="flex flex-col items-start gap-[2px]">
        <Typography variant={{ base: "title-1" }} color="neutral-900">
          { studentsCount }
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-600">
          Students
        </Typography>
      </div>

      <div className="h-12 border-l border-neutral-200 mx-6" />

      {/* LESSONS COUNT */}
      <div className="flex flex-col items-start gap-[2px]">
        <Typography variant={{ base: "title-1" }} color="neutral-900">
          { lessonsCount }
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-600">
          Lessons
        </Typography>
      </div>
    </div>
  )
}
