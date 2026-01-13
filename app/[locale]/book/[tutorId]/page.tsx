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

export default function Booking() {
  const params = useParams();
  const router = useRouter();
  const tutorId = params?.tutorId as string;
  const [tutorData, setTutorData] = useState<TutorDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    const locale = params?.locale || "en";
    router.replace(`/${locale}`);
  };

  // Mock availability generator (same as in BookingDialog)
  const generateMockAvailability = (weekStartDate: string): BookingDialogI["availability"] => {
    const weekdays: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[] = [
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];
    
    const startDate = new Date(weekStartDate);
    const availability: BookingDialogI["availability"] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split("T")[0];
      const weekday = weekdays[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1];

      const timeSlots = [
        "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "21:30", "22:00"
      ].map((time) => ({
        startTime: time,
        isAvailable: Math.random() > 0.3,
      }));

      availability.push({
        date: dateString,
        weekday,
        slots: timeSlots,
      });
    }

    return availability;
  };

  const [selectedSlot, setSelectedSlot] = useState<{ date: string; startTime: string } | null>(null);
  const [timezone, setTimezone] = useState("Etc/GMT+11");
  const [selectedLessonDuration, setSelectedLessonDuration] = useState(50); // Default to 50 minutes

  // Generate availability for current week
  const mockAvailability = useMemo(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday of current week
    return generateMockAvailability(weekStart.toISOString().split("T")[0]);
  }, []);

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
        availability: mockAvailability,
        selectedSlot: selectedSlot || undefined,
        isSubmitting: false,
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
                  availability={mockAvailability}
                  selectedSlot={selectedSlot || undefined}
                  onSlotSelect={(date, startTime) => setSelectedSlot({ date, startTime })}
                />

                <BookingFooter tutorId={tutorData.id} />
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