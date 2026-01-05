import TutorAvatar from "./TutorAvatar"
import TutorName from "./TutorName"
import TutorFlagAndSubject from "./TutorFlagAndSubject"
import TutorRate from "./TutorRate"
import TutorStats from "./TutorStats"
import BookLessonBtn from "./BookLessonBtn"
import LikeBtn from "./LikeBtn"
import SendMessageBtn from "./SendMessageBtn"

interface TutorProfileCardProps {
    tutorData: {
        id: string;
        avatarUrl: string;
        fullName: string;
        flagUrl: string;
        subject: string;
        baseRate: number;
        avgRating: number;
        studentsCount: number;
        lessonsCount: number;
    };
}

export default function TutorProfileCard({ tutorData }: TutorProfileCardProps) {
    return (
        <div className="bg-white w-full lg:w-[334px] flex flex-col justify-center items-start lg:items-center
            rounded-[12px] lg:rounded-[15px] border border-neutral-50 p-4 lg:p-6 
            gap-y-3 lg:gap-5
        ">

            
            {/* MOBILE TOP PART */}
            <div className="lg:hidden flex justify-center items-center gap-x-4">

                <TutorAvatar 
                    avatarUrl={tutorData.avatarUrl}
                    fullName={tutorData.fullName}
                />

                <div className="flex flex-col justify-center items-start gap-y-1">
                    <TutorName fullName={tutorData.fullName} />
                    <TutorFlagAndSubject flagUrl={tutorData.flagUrl} subject={tutorData.subject} />
                    <TutorRate baseRate={tutorData.baseRate} />
                </div>


            </div>


            {/* DESKTOP AVATAR */}
            <TutorAvatar 
                    avatarUrl={tutorData.avatarUrl}
                    fullName={tutorData.fullName}
                    className="hidden lg:flex"
                />

            {/* DESKTOP NAME + SUBJECT + RATE */}
            <div className="flex flex-col justify-center items-start gap-y-3">
                <div className="flex flex-col justify-center items-start gap-y-1">
                    <TutorName fullName={tutorData.fullName} />
                    <TutorFlagAndSubject flagUrl={tutorData.flagUrl} subject={tutorData.subject} />
                </div>

                <TutorRate baseRate={tutorData.baseRate} />
            </div>

            {/* DIVIDER */}
            <div className="w-full border border-neutral-50"></div>


            <TutorStats 
                avgRating={tutorData.avgRating}
                studentsCount={tutorData.studentsCount}
                lessonsCount={tutorData.lessonsCount}
            />
            
            {/* DESKTOP DIVIDER */}
            <div className="hidden lg:block w-full border border-neutral-50"></div>

            <div className="w-full flex flex-col justify-center items-start gap-2">
                <BookLessonBtn tutorId={tutorData.id} />

                <div className="w-full flex justify-start items-center gap-2">
                    <LikeBtn />
                    <SendMessageBtn />

                </div>

            </div>

        </div>
    )
}