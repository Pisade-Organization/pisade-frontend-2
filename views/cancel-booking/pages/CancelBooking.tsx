"use client";

import { useRouter } from "next/navigation";
import { PageNavigationHeader } from "../components/PageNavigationHeader"
import CancelClassReasonForm from "../components/CancelClassReasonForm"
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BookingSummary from "@/components/shared/BookingSummary";

export default function CancelBooking() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  // Mock data - replace with actual booking data from API
  const cancellationDeadline = new Date("2024-10-16T09:00:00");
  const lessonDate = new Date("2024-09-07T18:00:00");

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Desktop Navbar - only visible on desktop */}
      <div className="hidden lg:block">
        <Navbar variant="student_dashboard" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden px-4">
        <PageNavigationHeader
          title="Cancel Booking"
          variant="mobile"
          onClose={handleClose}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block px-4 lg:px-20 lg:pt-8">
        <PageNavigationHeader
          title="Cancel Booking"
          variant="desktop"
          onBack={handleBack}
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full flex-1 py-2 px-4 lg:py-8 lg:px-20">
        <div className="w-full flex flex-col gap-5 lg:flex-row lg:gap-10">
          {/* Left Column - Cancel Class Reason Form */}
          <CancelClassReasonForm />

          {/* Right Column - Booking Summary */}
          <div className="w-full lg:max-w-[343px] lg:flex-1 border border-neutral-50 rounded-2xl">
            <BookingSummary
              variant="cancel"
              tutorName="Alana Somchai Degrey"
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
              subject="Physic • English"
              rating={4.5}
              studentsCount={20}
              lessonsCount={200}
              cancellationDeadline={cancellationDeadline}
              lessonName="English TEFL Lesson (50-min lessons)"
              date={lessonDate}
              startTime="18:00"
              endTime="21:00"
              timezone="Etc/GMT+11"
              lessonPrice={20.00}
              processingFee={0.30}
              total={20.00}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}