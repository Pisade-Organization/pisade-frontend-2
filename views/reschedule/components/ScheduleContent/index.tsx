"use client";

import { useState, useMemo } from "react";
import type { DayAvailabilityI } from "@/components/dialogs/BookLessonDialog/types";
import AvailabilityGrid from "@/components/dialogs/BookLessonDialog/AvailabilityGrid";
import ScheduleEmptyState from "../ScheduleEmptyState";

interface ScheduleContentProps {
  availability?: DayAvailabilityI[];
  weekStartDate: Date;
  selectedSlot?: {
    date: string;
    startTime: string;
  } | null;
  onSlotSelect?: (date: string, startTime: string) => void;
}

export default function ScheduleContent({
  availability,
  weekStartDate,
  selectedSlot,
  onSlotSelect,
}: ScheduleContentProps) {

  // Generate mock availability if not provided
  const mockAvailability = useMemo(() => {
    if (availability && availability.length > 0) {
      return availability;
    }

    // Generate mock availability for the week
    const weekdays: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[] = [
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];

    const startDate = new Date(weekStartDate);
    const generatedAvailability: DayAvailabilityI[] = [];

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

      generatedAvailability.push({
        date: dateString,
        weekday,
        slots: timeSlots,
      });
    }

    return generatedAvailability;
  }, [availability, weekStartDate]);

  // Check if there's any available slots
  const hasAvailableSlots = useMemo(() => {
    return mockAvailability.some(day => 
      day.slots.some(slot => slot.isAvailable)
    );
  }, [mockAvailability]);

  const handleSlotSelect = (date: string, startTime: string) => {
    if (onSlotSelect) {
      onSlotSelect(date, startTime);
    }
  };

  if (!hasAvailableSlots) {
    return <ScheduleEmptyState />;
  }

  return (
    <div className="w-full">
      <AvailabilityGrid
        availability={mockAvailability}
        selectedSlot={selectedSlot || undefined}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
}
