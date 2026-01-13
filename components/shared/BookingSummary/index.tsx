import TutorSummary from "./TutorSummary/ index";
import CancellationNotice from "./CancellationNotice";
import LessonInfo from "./LessonInfo";
import CheckoutInfo from "./CheckoutInfo";
import GuaranteeNotice from "./GuaranteeNotice";
import type { BookingSummaryProps } from "./types";

export default function BookingSummary(props: BookingSummaryProps) {
  const {
    variant,
    tutorName,
    countryUrl,
    avatarUrl,
    subject,
    rating,
    studentsCount,
    lessonsCount,
    cancellationDeadline,
    lessonName,
    date,
    startTime,
    endTime,
    timezone,
    lessonPrice,
    processingFee,
    total
  } = props;

  // Extract reschedule props only if variant is "reschedule"
  const rescheduleProps = variant === "reschedule" ? {
    rescheduleDate: props.rescheduleDate,
    rescheduleStartTime: props.rescheduleStartTime,
    rescheduleEndTime: props.rescheduleEndTime
  } : undefined;

  return (
    <div className="w-full flex flex-col py-2 px-4 gap-5 lg:p-6 lg:rounded-2xl lg:border lg:border-neuetral-50">
      
      <TutorSummary 
        tutorName={tutorName}
        countryUrl={countryUrl}
        avatarUrl={avatarUrl}
        subject={subject}
        rating={rating}
        studentsCount={studentsCount}
        lessonsCount={lessonsCount}
      />

      <CancellationNotice deadline={cancellationDeadline} />

      <LessonInfo 
        lessonName={lessonName}
        date={date}
        startTime={startTime}
        endTime={endTime}
        timezone={timezone}
        variant={variant}
        rescheduleDate={rescheduleProps?.rescheduleDate}
        rescheduleStartTime={rescheduleProps?.rescheduleStartTime}
        rescheduleEndTime={rescheduleProps?.rescheduleEndTime}
      />

      <div className="w-full border border-t border-neutral-100" />

      <CheckoutInfo 
        lessonPrice={lessonPrice}
        processingFee={processingFee}
        total={total}
      />

      <GuaranteeNotice />

    </div>
  )
}
