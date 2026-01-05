"use client"

import TutorAvatar from "./TutorAvatar"
import TutorActionButtons from "./TutorActionButtons"
import TutorHeader from "./TutorHeader"
import TutorRateStatus from "./TutorRateStatus"
import TutorStats from "./TutorStats"
import { TutorCardProps } from "../../types"
import SpecialtyBadges from "./SpecialtyBadges"
import TutorLanguages from "./TutorLanguages"
import TutorBio from "./TutorBio"
import { useRouter } from "next/navigation"

export default function TutorGridCard({
    id,
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
    tutorRanking,
    videoThumbnailUrl,
}: TutorCardProps) {
    const router = useRouter()

    const onCardClick = () => {
        router.push(`/tutor/${id}`)
    }
  return (
    <div
        onClick={onCardClick}
        className="cursor-pointer border border-deep-royal-indigo-50 hover:border-electric-violet-200
        transition-all duration-200 ease-in-out rounded-[24px]
        flex flex-col justify-between items-center gap-y-5 p-8 h-full"
    >
      {/* 🔼 Top Section */}
        <div className="w-full flex flex-col gap-y-5">
            {/* AVATAR + BUTTONS */}
            <div className="w-full flex justify-between items-start">
                <TutorAvatar
                    avatarUrl={avatarUrl}
                    isActive={isActive}
                    fullName={fullName}
                    tutorRanking={tutorRanking}
                />
                <TutorActionButtons className="hidden xl:flex" tutorId={id} />
            </div>

        {/* Info */}
        <div className="w-full flex flex-col justify-center items-start gap-y-3">
          <div className="w-full flex flex-col justify-center items-start gap-y-2">
            {/* HEADER */}
            <TutorHeader
              fullName={fullName}
              flagUrl={flagUrl}
              subject={subject}
            />

            {/* RATE + STATUS */}
            <div className="w-full flex flex-col 2xl:flex-row justify-center 2xl:justify-start items-start gap-y-1 gap-x-2">
              <TutorRateStatus baseRate={baseRate} isActive={isActive} />
              <TutorStats
                avgRating={avgRating}
                studentsCount={studentsCount}
                lessonsCount={lessonsCount}
              />
            </div>

            <SpecialtyBadges specialties={specialties} />
            <TutorBio bio={bio} />
            <TutorLanguages languages={languages} />
          </div>
        </div>
      </div>

      {/* 🔽 Bottom Section */}
      <div className="xl:hidden w-full flex flex-col justify-center items-start gap-y-3">
        <div className="w-full border border-neutral-50"></div>
        <TutorActionButtons className="w-full !justify-between" tutorId={id} />
      </div>
    </div>
  )
}
