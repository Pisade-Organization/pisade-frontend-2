"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import ScheduleHeader from "../components/ScheduleHeader";
import ScheduleContent from "../components/ScheduleContent";
import BookingSummary from "@/components/shared/BookingSummary";
import BaseButton from "@/components/base/BaseButton";
import Navbar from "@/components/Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useBookingDetail } from "@/hooks/bookings/queries";
import { useRescheduleBooking } from "@/hooks/bookings/mutations";
import { fetchTutorDetailData } from "@/services/tutor";
import { TutorDetailData } from "@/services/tutor/types";
import { buildBookingAvailabilityFromTutor } from "@/lib/bookingAvailability";
import {
  DesktopOnly,
  MobileOnly,
  PageContainer,
  PageRoot,
  PrimaryPanel,
  SummaryPanel,
  TwoColumnLayout,
} from "@/components/layout/PagePrimitives";

export default function Reschedule() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.bookingId as string | undefined;
  const locale = (params?.locale as string | undefined) ?? "en";
  const { data: booking } = useBookingDetail(bookingId);
  const rescheduleMutation = useRescheduleBooking(bookingId);
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMobile = !isDesktop
  const [timezone, setTimezone] = useState("Etc/GMT+11");
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    // Calculate Monday of current week
    const today = new Date();
    const monday = new Date(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    startTime: string;
  } | null>(null);
  const [tutorData, setTutorData] = useState<TutorDetailData | null>(null);

  useEffect(() => {
    const loadTutorData = async () => {
      if (!booking?.tutor.id) return;
      const data = await fetchTutorDetailData(booking.tutor.id);
      setTutorData(data);
    };

    void loadTutorData();
  }, [booking?.tutor.id]);

  const handlePrevWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setCurrentWeekStart(newWeekStart);
  };

  const handleClose = () => {
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const currentLessonDate = useMemo(() => {
    return booking ? new Date(booking.schedule.startTime) : new Date()
  }, [booking])
  const currentLessonEnd = useMemo(() => {
    return booking ? new Date(booking.schedule.endTime) : new Date()
  }, [booking])
  const cancellationDeadline = useMemo(() => new Date(currentLessonDate), [currentLessonDate])
  const currentStartTime = useMemo(
    () => currentLessonDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    [currentLessonDate],
  )
  const currentEndTime = useMemo(
    () => currentLessonEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    [currentLessonEnd],
  )

  const availability = useMemo(
    () => buildBookingAvailabilityFromTutor(tutorData?.availability ?? {}, currentWeekStart),
    [currentWeekStart, tutorData?.availability],
  )

  // Calculate reschedule date/time from selected slot
  const rescheduleDate = useMemo(() => {
    if (!selectedSlot) return currentLessonDate;
    return new Date(selectedSlot.date);
  }, [selectedSlot, currentLessonDate]);

  const rescheduleStartTime = useMemo(() => {
    if (!selectedSlot) return currentStartTime;
    return selectedSlot.startTime;
  }, [selectedSlot, currentStartTime]);

  const rescheduleEndTime = useMemo(() => {
    if (!selectedSlot || !selectedSlot.startTime) return currentEndTime;
    // Assuming 50-minute lesson
    const [hours, minutes] = selectedSlot.startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + 50, 0, 0);
    return `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
  }, [selectedSlot, currentEndTime]);

  // Update ScheduleContent to handle slot selection
  const handleSlotSelect = (date: string, startTime: string) => {
    setSelectedSlot({ date, startTime });
  };

  const handleReschedule = () => {
    if (!bookingId || !selectedSlot || !booking) return;

    const oldStart = new Date(booking.schedule.startTime)
    const oldEnd = new Date(booking.schedule.endTime)
    const durationMinutes = Math.max(1, Math.round((oldEnd.getTime() - oldStart.getTime()) / 60000))

    const newStart = new Date(`${selectedSlot.date}T${selectedSlot.startTime}:00`)
    const newEnd = new Date(newStart)
    newEnd.setMinutes(newEnd.getMinutes() + durationMinutes)

    rescheduleMutation.mutate(
      {
        startTime: newStart.toISOString(),
        endTime: newEnd.toISOString(),
      },
      {
        onSuccess: () => {
          router.push(`/${locale}/class-management`)
        },
      },
    )
  }

  const summaryProps = {
    variant: "reschedule" as const,
    tutorName: booking?.tutor.name ?? "Tutor",
    countryUrl: "https://flagcdn.com/w40/th.png",
    avatarUrl: booking?.tutor.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
    subject: "Lesson",
    rating: booking?.tutor.rating ?? 0,
    studentsCount: booking?.tutor.studentCount ?? 0,
    lessonsCount: booking?.tutor.lessonCount ?? 0,
    cancellationDeadline,
    lessonName: "Booked lesson",
    date: currentLessonDate,
    startTime: currentStartTime,
    endTime: currentEndTime,
    timezone,
    lessonPrice: booking?.pricing.amount ?? 0,
    processingFee: 0,
    total: 0,
    rescheduleDate,
    rescheduleStartTime,
    rescheduleEndTime,
  }

  const actionLabel = rescheduleMutation.isPending ? "Rescheduling..." : "Reschedule"
  const actionDisabled = !selectedSlot || rescheduleMutation.isPending

  // Mobile: Full-screen layout
  if (isMobile) {
    return (
      <PageRoot className="bg-white">
        <div className="w-full px-4 pt-3 pb-2 border-b border-neutral-50">
          <PageNavigationHeader
            title="Reschedule"
            variant="mobile"
            onClose={handleClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full flex flex-col gap-5 px-4 py-5">
            <ScheduleHeader
              weekStartDate={currentWeekStart}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              variant="mobile"
              view="week"
              onViewChange={() => {}}
            />

            <ScheduleContent
              availability={availability}
              weekStartDate={currentWeekStart}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            <div className="w-full flex flex-col gap-5 py-2 px-4 rounded-2xl border border-neutral-50 bg-white">
              <BookingSummary {...summaryProps} />
            </div>

            <div className="w-full pb-6">
              <BaseButton
                className="w-full"
                variant="primary"
                disabled={actionDisabled}
                onClick={handleReschedule}
              >
                {actionLabel}
              </BaseButton>
            </div>

            {rescheduleMutation.isError ? (
              <p className="text-sm text-red-500">Failed to reschedule. Please try again.</p>
            ) : null}
          </div>
        </div>
      </PageRoot>
    );
  }

  // Desktop: Two-column layout
  return (
    <PageRoot>
      <DesktopOnly>
        <Navbar variant="student_dashboard" />
      </DesktopOnly>

      <PageContainer>
        <TwoColumnLayout className="gap-0 lg:gap-10">
          <PrimaryPanel>
            <PageNavigationHeader
              title="Reschedule"
              variant="desktop"
              onBack={handleBack}
            />
            
            <ScheduleHeader
              weekStartDate={currentWeekStart}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              variant="desktop"
              view="week"
              onViewChange={() => {}}
            />

            <ScheduleContent
              availability={availability}
              weekStartDate={currentWeekStart}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            <div className="w-full pt-4">
              <BaseButton
                className="w-full"
                variant="primary"
                disabled={actionDisabled}
                onClick={handleReschedule}
              >
                {actionLabel}
              </BaseButton>
            </div>

            {rescheduleMutation.isError ? (
              <p className="text-sm text-red-500">Failed to reschedule. Please try again.</p>
            ) : null}
          </PrimaryPanel>

          <SummaryPanel>
            <BookingSummary {...summaryProps} />
          </SummaryPanel>
        </TwoColumnLayout>
      </PageContainer>
    </PageRoot>
  );
}
