import type { TutorProfileSummary } from "./types";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Star } from "lucide-react";
import Typography from "@/components/base/Typography";
import { getTutorRankingBadgeSrc, getTutorRankingLabel } from "@/lib/tutorRanking";

interface TutorProfileContainerProps extends TutorProfileSummary {}

export default function TutorProfileContainer({
  avatarUrl,
  fullName,
  email,
  timezone,
  tutorRanking,
  rating,
  studentsCount,
  lessonsCount,
}: TutorProfileContainerProps) {
  const rankingBadgeSrc = getTutorRankingBadgeSrc(tutorRanking);
  const rankingLabel = getTutorRankingLabel(tutorRanking);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* PROFILE PICTURE + EDIT BUTTON */}
        <div className="w-[86px] h-[86px] relative">
          <Image 
            src={avatarUrl ?? "/default_avatar.png"}
            width={86}
            height={86}
            alt="Tutor profile"
            className="border border-neutral-50 rounded-full"
          />
          <button className="absolute p-[10px] -bottom-1 -right-1 rounded-full border-[1.5px] border-neutral-50 bg-white flex justify-center items-center">
            <Pencil className="w-3 h-3 text-neutral-600" />
          </button>
        </div>

        {/* NAME + EMAIL + TIMEZONE */}
        <div className="flex flex-col">
          <Typography variant="title-1" color="neutral-900">{fullName}</Typography>
          <Typography variant="body-3" color="neutral-500">{email}</Typography>
          <Typography variant="body-3" color="neutral-300">{timezone}</Typography>
        </div>

      </div>

      <div className="rounded-xl border-[1.5px] border-neutral-50 p-3 flex flex-col gap-4">
        {/* TUTOR RANKING */}
        <div className="flex justify-center items-center gap-1">
          {/* TUTOR RANKING IMAGE */}
          {rankingBadgeSrc ? (
            <Image
              src={rankingBadgeSrc}
              alt={`${rankingLabel} badge`}
              width={24}
              height={24}
            />
          ) : null}

          <div className="flex flex-col">
            <Typography variant="title-2" color="neutral-900">{rankingLabel}</Typography>
            <Typography variant="body-3" color="neutral-600">Ranking level</Typography>
          </div>
        </div>

          {/* DIVIDER */}
          <div className="w-full border-b border-neutral-50"/>

          {/* RATING + STUDENTS COUNT + LESSONS COUNT */}
          <div className="flex justify-between items-center px-1">
            {/* RATING */}
            <div className="flex flex-col">
              <div className="flex gap-[2px]">
                <Typography variant="title-2" color="neutral-900">{rating}/5</Typography>
                <Star className="w-5 h-5 fill-yellow-normal text-yellow-normal" />
              </div>
              <Typography variant="body-3" color="neutral-600">Rating</Typography>
            </div>

            {/* DIVIDER */}
            <div className="h-[32px] border-l border-neutral-50" />

            {/* STUDENS COUNT */}
            <div className="flex flex-col">
              <Typography variant="title-2" color="neutral-900">{studentsCount}</Typography>
              <Typography variant="body-3" color="neutral-600">Students</Typography>
            </div>

            {/* DIVIDER */}
            <div className="h-[32px] border-l border-neutral-50" />

            {/* LESSONS COUNT */}
            <div className="flex flex-col">
              <Typography variant="title-2" color="neutral-900">{lessonsCount}</Typography>
              <Typography variant="body-3" color="neutral-600">Lessons</Typography>
            </div>

        </div>
      </div>
    </section>
  );
}
