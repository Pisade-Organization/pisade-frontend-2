"use client"
import { TutorCardProps } from "../../types"
import TutorAvatar from "./TutorAvatar"
import TutorHeader from "./TutorHeader"
import TutorActionButtons from "./TutorActionButtons"
import TutorRateStatus from "./TutorRateStatus"
import TutorStats from "./TutorStats"
import SpecialtyBadges from "./SpecialtyBadges"
import TutorBio from "./TutorBio"
import TutorLanguages from "./TutorLanguages"

export default function TutorListCard({
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
  }: TutorCardProps) { 
    return (
        <div className="
        w-full bg-white border border-neutral-50 lg:border-none p-4 lg:p-0
        flex flex-col lg:flex-row lg:gap-x-5 gap-y-4 lg:gap-y-0 
        px-
        ">
            
            {/* DESKTOP */}
            <TutorAvatar
                fullName={fullName}
                avatarUrl={avatarUrl}
                isActive={isActive}
            />

            {/* RIGHT OF AVATAR */}
            <div className="hidden lg:flex w-full flex-col justify-start items-center gap-y-3">

                {/* TOP 1/4 */}
                <div className="w-full flex flex-col justify-start items-center gap-y-2">
                    <div className="w-full flex justify-between items-start">
                        <TutorHeader fullName={fullName} flagUrl={flagUrl} subject={subject}/>
                        <TutorActionButtons />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <TutorRateStatus baseRate={baseRate} isActive={isActive}/>

                        <TutorStats avgRating={avgRating} studentsCount={studentsCount} lessonsCount={lessonsCount}/>
                    </div>
                </div>

                {/* TOP 2/4 */}
                <div className="w-full">
                    <SpecialtyBadges specialties={specialties} />
                </div>

                {/* TOP 3/4 */}
                <div className="w-full">
                    <TutorBio bio={bio} />
                </div>

                {/* TOP 4/4 */}
                <div className="w-full">
                    <TutorLanguages languages={languages} />
                </div>

            </div>
            

            {/* MOBILE */}


        </div>
    )
  }