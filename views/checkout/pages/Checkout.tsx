import CheckoutMobileHeader from "../components/CheckoutMobileHeader";
import TutorSummary from "../components/BookingSummary/TutorSummary/ index";
import CancellationNotice from "../components/BookingSummary/CancellationNotice";
import LessonInfo from "../components/BookingSummary/LessonInfo";
import CheckoutInfo from "../components/BookingSummary/CheckoutInfo";
import GuaranteeNotice from "../components/BookingSummary/GuaranteeNotice";
import PaymentMethodSelector from "../components/PaymentDetailsSection/PaymentMethodSelector";

export default function Checkout() {
  // Mock data based on the design
  const cancellationDeadline = new Date("2024-10-16T09:00:00");
  const lessonDate = new Date("2024-09-07T18:00:00"); // September 7, Friday, 6PM

  return (
    <>
      <CheckoutMobileHeader />
      <div className="w-full py-2 px-4 flex flex-col gap-5">
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
        <div className="w-full border-t border-neutral-100"/>
        <CheckoutInfo 
          lessonPrice={20.00}
          processingFee={0.30}
          total={20.00}
        />
        <GuaranteeNotice />

        <div className="w-screen border-t border-neutral-100"  />

        <PaymentMethodSelector />
        
      </div>
    </>
  )
}