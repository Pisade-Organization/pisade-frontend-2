"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BookingDialog from "@/components/dialogs/BookLessonDialog/index";
import { fetchTutorDetailData } from "@/services/tutor";
import { TutorDetailData } from "@/services/tutor/types";
import { BookingDialogI } from "@/components/dialogs/BookLessonDialog/types";
import Navbar from "@/components/Navbar";
import TutorSummary from "@/components/shared/BookingSummary/TutorSummary/ index";
import CancellationNotice from "@/components/shared/BookingSummary/CancellationNotice";
import LessonInfo from "@/components/shared/BookingSummary/LessonInfo";
import TimezoneSelector from "@/components/dialogs/BookLessonDialog/TimezoneSelector";
import DateNavigator from "@/components/dialogs/BookLessonDialog/DateNavigator";
import AvailabilityGrid from "@/components/dialogs/BookLessonDialog/AvailabilityGrid";
import BookingFooter from "@/components/dialogs/BookLessonDialog/BookingFooter";
import { buildBookingAvailabilityFromTutor } from "@/lib/bookingAvailability";
import { useCreateBooking } from "@/hooks/bookings/mutations";

export default function Booking() {
  const params = useParams();
  const router = useRouter();
  const tutorId = params?.tutorId as string;
  const locale = (params?.locale as string) || "en";
  const [tutorData, setTutorData] = useState<TutorDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createBookingMutation = useCreateBooking();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch tutor data
  useEffect(() => {
    if (tutorId) {
      setLoading(true);
      fetchTutorDetailData(tutorId)
        .then((data) => {
          setTutorData(data);
        })
        .catch((error) => {
          console.error("Error fetching tutor data:", error);
          setTutorData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tutorId]);

  const handleClose = () => {
    router.replace(`/${locale}`);
  };

  const [selectedSlot, setSelectedSlot] = useState<{ date: string; startTime: string } | null>(null);
  const [timezone, setTimezone] = useState("Etc/GMT+11");
  const [selectedLessonDuration, setSelectedLessonDuration] = useState(50); // Default to 50 minutes

  const handleContinueToCheckout = async () => {
    if (!selectedSlot || !tutorData?.id) {
      return;
    }

    setSubmitError(null);

    const lessonStart = new Date(`${selectedSlot.date}T${selectedSlot.startTime}:00`);
    const lessonEnd = new Date(lessonStart.getTime() + selectedLessonDuration * 60 * 1000);

    try {
      const booking = await createBookingMutation.mutateAsync({
        tutorId: tutorData.id,
        startTime: lessonStart.toISOString(),
        endTime: lessonEnd.toISOString(),
      });

      router.push(`/${locale}/checkout/${booking.id}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
      setSubmitError("Unable to continue right now. Please try another time slot.");
    }
  };

  const bookingAvailability = useMemo<BookingDialogI["availability"]>(() => {
    return buildBookingAvailabilityFromTutor(tutorData?.availability ?? {});
  }, [tutorData?.availability]);

  // Calculate lesson details from selected slot
  const lessonDetails = useMemo(() => {
    if (!selectedSlot) return null;

    // Parse date and start time
    const lessonDate = new Date(selectedSlot.date);
    const [hours, minutes] = selectedSlot.startTime.split(':').map(Number);
    lessonDate.setHours(hours, minutes, 0, 0);

    // Calculate end time by adding duration
    const endTime = new Date(lessonDate);
    endTime.setMinutes(endTime.getMinutes() + selectedLessonDuration);

    // Calculate cancellation deadline (24 hours before lesson start)
    const cancellationDeadline = new Date(lessonDate);
    cancellationDeadline.setHours(cancellationDeadline.getHours() - 24);

    // Format times for display (HH:mm format)
    const formatTime = (date: Date) => {
      const h = date.getHours().toString().padStart(2, '0');
      const m = date.getMinutes().toString().padStart(2, '0');
      return `${h}:${m}`;
    };

    return {
      lessonDate,
      startTime: formatTime(lessonDate),
      endTime: formatTime(endTime),
      cancellationDeadline,
    };
  }, [selectedSlot, selectedLessonDuration]);

  // Prepare booking dialog props (for mobile)
  const bookingProps: BookingDialogI | null = tutorData
    ? {
        tutor: {
          id: tutorData.id,
          fullName: tutorData.fullName,
          avatarUrl: tutorData.avatarUrl,
          rating: tutorData.avgRating,
          studentsCount: tutorData.studentsCount,
          lessonsCount: tutorData.lessonsCount,
        },
        lessonOptions: [
          { durationMinutes: 25, price: 10, currency: "USD" },
          { durationMinutes: 50, price: 20, currency: "USD" },
        ],
        selectedLessonDuration: 25,
        timezone: timezone,
        utcOffset: "GMT -11:00",
        weekRange: {
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
        availability: bookingAvailability,
        selectedSlot: selectedSlot || undefined,
        isSubmitting: createBookingMutation.isPending,
        onSlotSelect: (date, startTime) => setSelectedSlot({ date, startTime }),
        onContinue: handleContinueToCheckout,
        continueDisabled: !selectedSlot || createBookingMutation.isPending,
      }
    : null;

  // Desktop: Two-column layout with TutorSummary and Calendar
  if (!isMobile) {
    return (
      <>
        {/* Desktop Navbar */}
        <div className="hidden lg:block">
          <Navbar variant="student_dashboard" />
        </div>

        {/* Main Content Container */}
        <div className="w-full py-2 px-4 lg:py-8 lg:px-20">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-600">Loading...</p>
            </div>
          ) : !tutorData ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-neutral-600">Tutor not found</p>
            </div>
          ) : (
            <div className="w-full flex flex-col lg:flex-row lg:gap-10">
              {/* Left Column - Tutor Summary */}
              <div className="w-full lg:max-w-[343px] lg:flex-1 flex flex-col gap-5 py-2 px-4 lg:p-6 lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
                <TutorSummary 
                  tutorName={tutorData.fullName}
                  countryUrl={tutorData.flagUrl || "https://flagcdn.com/w40/th.png"}
                  avatarUrl={tutorData.avatarUrl}
                  subject={tutorData.subject || tutorData.specialties?.join(" • ") || "Subject"}
                  rating={tutorData.avgRating}
                  studentsCount={tutorData.studentsCount}
                  lessonsCount={tutorData.lessonsCount}
                />

                {/* Conditional components - only show when slot is selected */}
                {lessonDetails && (
                  <>
                    <CancellationNotice deadline={lessonDetails.cancellationDeadline} />
                    
                    <LessonInfo 
                      lessonName={`${tutorData.subject || "Lesson"} (${selectedLessonDuration}-min lesson${selectedLessonDuration !== 1 ? 's' : ''})`}
                      date={lessonDetails.lessonDate}
                      startTime={lessonDetails.startTime}
                      endTime={lessonDetails.endTime}
                      timezone={timezone}
                      variant="checkout"
                    />
                  </>
                )}
              </div>

              {/* Right Column - Booking Calendar */}
              <div className="w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
                <TimezoneSelector
                  timezone={timezone}
                  onTimezoneChange={(tz) => setTimezone(tz)}
                />

                <DateNavigator />

                <AvailabilityGrid
                  availability={bookingAvailability}
                  selectedSlot={selectedSlot || undefined}
                  onSlotSelect={(date, startTime) => setSelectedSlot({ date, startTime })}
                />

                {submitError && (
                  <p className="text-sm text-red-500">{submitError}</p>
                )}

                <BookingFooter
                  onContinue={handleContinueToCheckout}
                  disabled={!selectedSlot || createBookingMutation.isPending}
                  isLoading={createBookingMutation.isPending}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // Mobile: Full-screen sheet with slide animation
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white z-50 flex flex-col h-screen"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-50">
          <h2 className="text-neutral-900 text-title-1">Book Lesson</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-neutral-600">Loading...</p>
            </div>
          ) : bookingProps ? (
            <BookingDialog {...bookingProps} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-neutral-600">Tutor not found</p>
            </div>
          )}
    </div>
      </motion.div>
    </AnimatePresence>
  );
}
