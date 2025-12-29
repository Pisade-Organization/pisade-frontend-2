import clsx from "clsx"
import Avatar from "./Avatar"
import LessonAuthor from "./LessonAuthor"
import LessonSubject from "./LessonSubject"
import LessonTime from "./LessonTime"

export interface LessonCardI {
  isPast: boolean;
  isUpcoming: boolean;
  fullName: string;
  subjectName: string;
  startTime: string;
  endTime: string;
  avatarUrl: string;
}

export default function LessonCard({ 
  isPast,
  isUpcoming,
  fullName,
  subjectName,
  startTime,
  endTime,
  avatarUrl
}: LessonCardI) {
  return (
    <div className={clsx(
      "flex flex-col py-4 px-[10px] lg:pr-[10px] lg:pl-4 gap-[2px] border-l-2 border-b-1 border-b-neutral-50",
      isPast && "border-neutral-50 bg-white",
      !isPast && !isUpcoming && "border-electric-violet-100 bg-white",
      !isPast && isUpcoming && "bg-electric-violet-50 border-electric-violet-500",
    )}>

      <LessonTime 
        isPast={isPast}
        startTime={startTime}
        endTime={endTime}
      />

      <div className="flex flex-col">
        <LessonSubject name={subjectName} />

        <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center">
          <LessonAuthor
            isPast={isPast}
            fullName={fullName}
            className={"hidden lg:block"}
          />

          <Avatar avatarUrl={avatarUrl} />
        </div>
      </div>

    </div>
  )
}