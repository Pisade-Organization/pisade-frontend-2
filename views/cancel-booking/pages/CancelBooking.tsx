"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { PageNavigationHeader } from "../components/PageNavigationHeader"
import CancelClassReasonForm from "../components/CancelClassReasonForm"
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BookingSummary from "@/components/shared/BookingSummary";
import { useBookingDetail } from "@/hooks/bookings/queries";
import { useCancelBooking } from "@/hooks/bookings/mutations";
import type { CancelReason } from "../components/CancelClassReasonForm/ReasonList/types";
import {
  DesktopOnly,
  MobileOnly,
  PageContainer,
  PageRoot,
  SummaryPanel,
  TwoColumnLayout,
} from "@/components/layout/PagePrimitives";

export default function CancelBooking() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.bookingId as string | undefined;
  const locale = (params?.locale as string | undefined) ?? "en";
  const { data: booking } = useBookingDetail(bookingId);
  const cancelBookingMutation = useCancelBooking(bookingId);

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const lessonDate = booking ? new Date(booking.schedule.startTime) : new Date();
  const lessonEnd = booking ? new Date(booking.schedule.endTime) : new Date();
  const cancellationDeadline = lessonDate;
  const startTime = lessonDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const endTime = lessonEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const lessonPrice = booking?.pricing.amount ?? 0;

  const handleCancelBooking = (reason: CancelReason) => {
    if (!bookingId) return;

    cancelBookingMutation.mutate(
      { reason },
      {
        onSuccess: () => {
          router.push(`/${locale}/class-management`);
        },
      },
    );
  };

  return (
    <PageRoot className="bg-white">
      <DesktopOnly>
        <Navbar variant="student_dashboard" />
      </DesktopOnly>

      <MobileOnly className="px-4">
        <PageNavigationHeader
          title="Cancel Booking"
          variant="mobile"
          onClose={handleClose}
        />
      </MobileOnly>

      <DesktopOnly className="px-4 lg:px-20 lg:pt-8">
        <PageNavigationHeader
          title="Cancel Booking"
          variant="desktop"
          onBack={handleBack}
        />
      </DesktopOnly>

      <PageContainer className="flex-1">
        <TwoColumnLayout>
          <CancelClassReasonForm
            onSubmit={handleCancelBooking}
            isSubmitting={cancelBookingMutation.isPending}
            errorMessage={
              cancelBookingMutation.isError
                ? "Failed to cancel booking. Please try again."
                : undefined
            }
          />

          <SummaryPanel className="border border-neutral-50 rounded-2xl">
            <BookingSummary
              variant="cancel"
              tutorName={booking?.tutor.name ?? "Tutor"}
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl={booking?.tutor.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor"}
              subject="Lesson"
              rating={booking?.tutor.rating ?? 0}
              studentsCount={booking?.tutor.studentCount ?? 0}
              lessonsCount={booking?.tutor.lessonCount ?? 0}
              cancellationDeadline={cancellationDeadline}
              lessonName="Booked lesson"
              date={lessonDate}
              startTime={startTime}
              endTime={endTime}
              timezone="Etc/GMT+11"
              lessonPrice={lessonPrice}
              processingFee={0}
              total={lessonPrice}
            />
          </SummaryPanel>
        </TwoColumnLayout>
      </PageContainer>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </PageRoot>
  );
}
