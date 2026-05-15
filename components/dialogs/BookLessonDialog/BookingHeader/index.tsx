"use client"

import type { BookingHeaderProps } from "./BookingHeader.types";
import { useTranslations } from "next-intl";
import Typography from "@/components/base/Typography";
import Image from "next/image";
import { Star } from "lucide-react";

export default function BookingHeader({
  tutor
}: BookingHeaderProps) {
  const t = useTranslations("booking.stats");
  const { id, fullName, avatarUrl, rating, studentsCount, lessonsCount } = tutor;

  return (
    <div className="w-full flex justify-start items-center gap-4">  

    {/* AVATAR */}
    <Image 
      src={avatarUrl}
      alt="Tutor's avatar"
      width={64}
      height={64}
      className="rounded-xl"
    />

    {/* META + STATS */}
    <div className="w-full flex flex-col gap-2 items-start">
      <Typography variant="title-1" color="neutral-900">
        { fullName }
      </Typography>

      <div className="w-full flex justify-start items-center gap-5">
        {/* RATING */}
        <div className="inline-flex gap-1">
          <Star className="w-5 h-5 fill-yellow-normal text-yellow-normal"/>
          <div className="inline-flex gap-2">
            <Typography variant="headline-5" color="neutral-900">
              {rating}/5
            </Typography>

            <Typography variant="body-2" color="neutral-600">
              {t("rating")}
            </Typography>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="h-[27px] border-l border-neutral-50" />

        {/* STUDENTS COUNT */}
        <div className="inline-flex gap-2">
          <Typography variant="headline-5" color="neutral-900">
            { studentsCount }
          </Typography>

          <Typography variant="body-2" color="neutral-600">
            {t("students")}
          </Typography>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="h-[27px] border-l border-neutral-50" />

        {/* LESSONS COUNT */}
        <div className="inline-flex gap-2">
          <Typography variant="headline-5" color="neutral-900">
            { lessonsCount }
          </Typography>
          
          <Typography variant="body-2" color="neutral-600">
            {t("lessons")}
          </Typography>
        </div>

      </div>
    </div>

  </div>
  );
}