import TutorSummary from "./TutorSummary/ index";
import CancellationNotice from "./CancellationNotice";
import LessonInfo from "./LessonInfo";
import CheckoutInfo from "./CheckoutInfo";
import GuaranteeNotice from "./GuaranteeNotice";

export default function BookingSummary() {
  // Mock data based on the design
  const cancellationDeadline = new Date("2024-10-16T09:00:00");
  const lessonDate = new Date("2024-09-07T18:00:00"); // September 7, Friday, 6PM

  return (
    <div className="w-full flex flex-col py-2 px-4 gap-5 lg:p-6 lg:rounded-2xl lg:border lg:border-neuetral-50">
      
      <TutorSummary 
        tutorName="Alana Somchai Degrey"
        countryUrl="https://flagcdn.com/w40/th.png"
        avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
        subject="Physic • English"
        rating={4.5}
        studentsCount={20}
        lessonsCount={200}
      />

      <CancellationNotice deadline={cancellationDeadline} />

      <LessonInfo 
        lessonName="English TEFL Lesson (50-min lessons)"
        date={lessonDate}
        startTime="18:00"
        endTime="21:00"
        timezone="Etc/GMT+11"
      />

      <div className="w-full border border-t border-neutral-100" />

      <CheckoutInfo 
        lessonPrice={20.00}
        processingFee={0.30}
        total={20.00}
      />

      <GuaranteeNotice />

    </div>
  )
}