"use client";

import type { BookingDialogI } from "./types";
import { useState, useMemo } from "react";
import AvailabilityGrid from "./AvailabilityGrid";
import BookingHeader from "./BookingHeader";
import TimezoneSelector from "./TimezoneSelector";
import DateNavigator from "./DateNavigator";
import BookingFooter from "./BookingFooter";

// Mock data generator
function generateMockAvailability(weekStartDate: string): BookingDialogI["availability"] {
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

    // Generate time slots (14:00, 15:00, 16:00, 18:00, 21:30, 22:00, etc.)
    const timeSlots = [
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "21:30", "22:00"
    ].map((time) => ({
      startTime: time,
      isAvailable: Math.random() > 0.3, // 70% chance of being available
    }));

    availability.push({
      date: dateString,
      weekday,
      slots: timeSlots,
    });
  }

  return availability;
}

function getWeekRange(startDate: string) {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export default function BookingDialog({
  tutor,
  lessonOptions,
  selectedLessonDuration,
  timezone,
  utcOffset,
  weekRange,
  availability,
  selectedSlot: initialSelectedSlot,
  isSubmitting,
}: BookingDialogI) {
  const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);
  
  // Use provided availability or generate mock data
  const mockAvailability = useMemo(() => {
    if (availability && availability.length > 0) {
      return availability;
    }
    // Generate mock data for the current week
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday of current week
    return generateMockAvailability(weekStart.toISOString().split("T")[0]);
  }, [availability]);

  const handleSlotSelect = (date: string, startTime: string) => {
    setSelectedSlot({ date, startTime });
  };

  return (
    <div className="w-full flex flex-col py-2 px-4 gap-5 lg:p-6 lg:gap-6 lg:rounded-2xl">
      
      
      <div className="w-full hidden lg:flex">
        <BookingHeader tutor={tutor} />
      </div>
      
      <TimezoneSelector
        timezone={timezone}
        onTimezoneChange={(tz) => {
          // Handle timezone change
          console.log("Timezone changed to:", tz);
        }}
      />

      <DateNavigator />

      <AvailabilityGrid
        availability={mockAvailability}
        selectedSlot={selectedSlot}
        onSlotSelect={handleSlotSelect}
      />
      
      <BookingFooter tutorId={tutor.id} />
    </div>
  );
}