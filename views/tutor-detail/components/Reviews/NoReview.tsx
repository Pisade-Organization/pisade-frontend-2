"use client"
import Image from "next/image";
import BaseButton from "@/components/base/BaseButton";

export default function NoReview() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-7">
        <Image 
          src='/images/tutor-detail/no-review.svg'
          alt="No review icon"
          width={88}
          height={88}
        />

        <div className="flex flex-col justify-center items-center gap-1">

          <h1 className="text-title-2 text-neutral-700">
            Be the First to Review!
          </h1>

          <h2 className="text-body-2 text-neutral-400">
            This teacher hasn't received any ratings yet. 
            Share your experience and help others decide!
          </h2>

        </div>

        <BaseButton>
          Review Now
        </BaseButton>
    </div>
  );
}
