import TutorAvatar from "./TutorAvatar"
import TutorName from "./TutorName"
import TutorFlagAndSubject from "./TutorFlagAndSubject"
import TutorRate from "./TutorRate"
import TutorStats from "./TutorStats"
import BookLessonBtn from "./BookLessonBtn"
import LikeBtn from "./LikeBtn"
import SendMessageBtn from "./SendMessageBtn"

export default function TutorProfileCard() {
    return (
        <div className="bg-white w-full lg:w-[334px] flex flex-col justify-center items-start lg:items-center
            rounded-[12px] lg:rounded-[15px] border border-neutral-50 p-4 lg:p-6 
            gap-y-3 lg:gap-5
        ">

            
            {/* MOBILE TOP PART */}
            <div className="lg:hidden flex justify-center items-center gap-x-4">

                <TutorAvatar 
                    avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                    fullName="Alana Somchai Degrey"
                />

                <div className="flex flex-col justify-center items-start gap-y-1">
                    <TutorName fullName="Alana Somchai Degrey" />
                    <TutorFlagAndSubject flagUrl="https://flagcdn.com/w40/th.png" subject="Physics" />
                    <TutorRate baseRate={300} />
                </div>


            </div>


            {/* DESKTOP AVATAR */}
            <TutorAvatar 
                    avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                    fullName="Alana Somchai Degrey"
                    className="hidden lg:flex"
                />

            {/* DESKTOP NAME + SUBJECT + RATE */}
            <div className="flex flex-col justify-center items-start gap-y-3">
                <div className="flex flex-col justify-center items-start gap-y-1">
                    <TutorName fullName="Alana Somchai Degrey" />
                    <TutorFlagAndSubject flagUrl="https://flagcdn.com/w40/th.png" subject="Physics" />
                </div>

                <TutorRate baseRate={300} />
            </div>

            {/* DIVIDER */}
            <div className="w-full border border-neutral-50"></div>


            <TutorStats 
                avgRating={4.5}
                studentsCount={20}
                lessonsCount={200}
            />
            
            {/* DESKTOP DIVIDER */}
            <div className="hidden lg:block w-full border border-neutral-50"></div>

            <div className="w-full flex flex-col justify-center items-start gap-2">
                <BookLessonBtn />

                <div className="w-full flex justify-start items-center gap-2">
                    <LikeBtn />
                    <SendMessageBtn />

                </div>

            </div>

        </div>
    )
}