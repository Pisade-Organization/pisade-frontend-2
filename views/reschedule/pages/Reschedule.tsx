"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageNavigationHeader } from "../components/PageNavigationHeader";
import ScheduleHeader from "../components/ScheduleHeader";
import ScheduleContent from "../components/ScheduleContent";
import BookingSummary from "@/components/shared/BookingSummary";
import BaseButton from "@/components/base/BaseButton";
import Navbar from "@/components/Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Reschedule() {
  const router = useRouter();
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

  // Calculate start and end dates for the week (Monday to Sunday)
  const { startDate, endDate } = useMemo(() => {
    const start = new Date(currentWeekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Sunday (6 days after Monday)
    return { startDate: start, endDate: end };
  }, [currentWeekStart]);

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

  // Mock data - in real app, this would come from props or API
  const cancellationDeadline = useMemo(() => new Date("2025-09-26T13:00:00"), [])
  const currentLessonDate = useMemo(() => new Date("2025-09-27T13:00:00"), [])
  const currentStartTime = "13:00"
  const currentEndTime = "15:00"

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

  // Mobile: Full-screen layout
  if (isMobile) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="w-full px-4 pt-3 pb-2 border-b border-neutral-50">
          <PageNavigationHeader
            title="Reschedule"
            variant="mobile"
            onClose={handleClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full flex flex-col gap-5 px-4 py-5">
            {/* Schedule Header */}
            <ScheduleHeader
              timezone={timezone}
              onTimezoneChange={setTimezone}
              weekStartDate={currentWeekStart}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              variant="mobile"
            />

            {/* Schedule Content */}
            <ScheduleContent
              weekStartDate={currentWeekStart}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            {/* Instructor and Lesson Details */}
            <div className="w-full flex flex-col gap-5 py-2 px-4 rounded-2xl border border-neutral-50 bg-white">
              <BookingSummary
                variant="reschedule"
                tutorName="Alana Somchai Degrey"
                countryUrl="https://flagcdn.com/w40/th.png"
                avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                subject="Physic • English"
                rating={4.5}
                studentsCount={20}
                lessonsCount={200}
                cancellationDeadline={cancellationDeadline}
                lessonName="English TEFL Lesson (50-min lessons)"
                date={currentLessonDate}
                startTime={currentStartTime}
                endTime={currentEndTime}
                timezone={timezone}
                lessonPrice={20.00}
                processingFee={0.30}
                total={0}
                rescheduleDate={rescheduleDate}
                rescheduleStartTime={rescheduleStartTime}
                rescheduleEndTime={rescheduleEndTime}
              />
            </div>

            {/* Reschedule Button */}
            <div className="w-full pb-6">
              <BaseButton
                className="w-full"
                variant="primary"
                disabled={!selectedSlot}
              >
                Reschedule
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Two-column layout
  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar variant="student_dashboard" />
      </div>

      {/* Main Content Container */}
      <div className="w-full py-2 px-4 lg:py-8 lg:px-20">
        <div className="w-full flex flex-col lg:flex-row lg:gap-10">
          {/* Left Column - Schedule Calendar */}
          <div className="w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
            <PageNavigationHeader
              title="Reschedule"
              variant="desktop"
              onBack={handleBack}
            />
            
            <ScheduleHeader
              timezone={timezone}
              onTimezoneChange={setTimezone}
              weekStartDate={currentWeekStart}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
              variant="desktop"
            />

            <ScheduleContent
              weekStartDate={currentWeekStart}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            {/* Reschedule Button */}
            <div className="w-full pt-4">
              <BaseButton
                className="w-full"
                variant="primary"
                disabled={!selectedSlot}
              >
                Reschedule
              </BaseButton>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="w-full lg:max-w-[343px] lg:flex-1">
            <BookingSummary
              variant="reschedule"
              tutorName="Alana Somchai Degrey"
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
              subject="Physic • English"
              rating={4.5}
              studentsCount={20}
              lessonsCount={200}
              cancellationDeadline={cancellationDeadline}
              lessonName="English TEFL Lesson (50-min lessons)"
              date={currentLessonDate}
              startTime={currentStartTime}
              endTime={currentEndTime}
              timezone={timezone}
              lessonPrice={20.00}
              processingFee={0.30}
              total={0}
              rescheduleDate={rescheduleDate}
              rescheduleStartTime={rescheduleStartTime}
              rescheduleEndTime={rescheduleEndTime}
            />
          </div>
        </div>
      </div>
    </>
  );
}
