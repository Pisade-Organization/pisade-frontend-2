import MediaPanel from "./MediaPanel"
import About from "./About"
import Languages from "./Languages"
import WhatMyStudentsSaid from "./WhatMyStudentsSaid"
import Specialties from "../Specialties"
import BaseButton from "@/components/base/BaseButton"
export default function Overview({
    videoThumbnailUrl,
    videoUrl,
    fullName,
    tutorRanking,
    hoursTaught,
    about,
    selfIntroduction,
    onSeeAvailabilityCalendar,
    languages,
    avgRating,
    studentReviewsCount,
    reviews,
    specialties
}: {
    videoThumbnailUrl: string;
    videoUrl: string;
    fullName: string;
    tutorRanking: "STARTER" | "PRO" | "MASTER";
    hoursTaught: number;
    about: string;
    selfIntroduction?: {
        introduceYourself: string;
        teachingExperience: string;
        motivatePotentialStudents: string;
        catchyHeadline: string;
    };
    onSeeAvailabilityCalendar?: () => void;
    languages: string[];
    avgRating: number;
    studentReviewsCount: number;
    reviews: {
        avatarUrl: string;
        fullName: string;
        review: string;
    }[];
    specialties: string[];
}) {
    return (
        <>
            {/* MOBILE */}
            <div className="lg:hidden w-full flex flex-col justify-center items-center gap-y-5">

                <MediaPanel
                    videoThumbnailUrl={videoThumbnailUrl}
                    videoUrl={videoUrl}
                    fullName={fullName}
                    tutorRanking={tutorRanking}
                    hoursTaught={hoursTaught}
                    />

                <About about={about} selfIntroduction={selfIntroduction} />

                <Languages languages={languages} />

                <div className="w-full">
                    <BaseButton
                        typeStyle="outline"
                        className="w-full"
                        onClick={onSeeAvailabilityCalendar}
                    >
                        See my availability calendar
                    </BaseButton>
                </div>

                <div className="w-[calc(100%+2rem)] -mx-4 border-b border-neutral-50" />

                <WhatMyStudentsSaid
                    avgRating={avgRating}
                    studentReviewsCount={studentReviewsCount}
                    reviews={reviews}
                    />

                <Specialties specialties={specialties} />
                
            </div>

            {/* DESKTOP */}
            <div className="w-full hidden lg:flex flex-col justify-center items-start gap-8">
                {/* TOP */}
                <div className="w-full flex justify-center items-start gap-8">

                    {/* LEFT */}
                    <div className="w-full max-w-[567] flex flex-col justify-center items-start gap-8">
                        <MediaPanel
                            videoThumbnailUrl={videoThumbnailUrl}
                            videoUrl={videoUrl}
                            fullName={fullName}
                            tutorRanking={tutorRanking}
                            hoursTaught={hoursTaught}
                        />

                        <About about={about} selfIntroduction={selfIntroduction} />

                        <Languages languages={languages} />
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-start items-center gap-4">
                        <WhatMyStudentsSaid
                            avgRating={avgRating}
                            studentReviewsCount={studentReviewsCount}
                            reviews={reviews}
                        />
                    </div>

                </div>

                {/* BOTTOM (AVAILABILITY CALENDAR) */}
                <div>

                </div>
            </div>
        </>
    )
}
