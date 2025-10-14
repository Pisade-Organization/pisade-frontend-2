"use client"

import TutorAvatar from "./TutorAvatar"
import TutorActionButtons from "./TutorActionButtons"
import TutorHeader from "./TutorHeader"
import TutorRateStatus from "./TutorRateStatus"
import TutorStats from "./TutorStats"
import { TutorCardProps } from "../../types"

export default function TutorGridCard({
    fullName,
    avatarUrl,
    flagUrl,
    isActive,
    bio,
    baseRate,
    specialties,
    subject,
    languages,
    avgRating,
    studentsCount,
    lessonsCount,
    videoThumbnailUrl,
  }: TutorCardProps){
    return (
        <div className="cursor-pointer border border-deep-royal-indigo-50 hover:border-electric-violet-200
        transition-all duration-200 ease-in-out rounded-[24px]
        flex flex-col justify-center items-center gap-y-5 p-8">
            
            {/* AVATAR + BUTTONS */}
            <div className="w-full flex justify-between items-start">
                <TutorAvatar avatarUrl={avatarUrl} isActive={isActive} fullName={fullName} />
                <TutorActionButtons />
            </div>

            <div className="w-full flex flex-col justify-center items-start gap-y-3">
                <div className="w-full flex flex-col justify-center items-start gap-y-2">
                    <TutorHeader fullName={fullName} flagUrl={flagUrl} subject={subject} />
                    
                    <div className="w-full flex justify-between items-center">
                        <TutorRateStatus baseRate={baseRate} isActive={isActive} />
                        <TutorStats avgRating={avgRating} studentsCount={studentsCount} lessonsCount={lessonsCount} />
                    </div>
                </div>
            </div>


        </div>
    )
}