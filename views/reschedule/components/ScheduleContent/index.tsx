"use client";

import { useMemo } from "react";
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
  availability = [],
  weekStartDate,
  selectedSlot,
  onSlotSelect,
}: ScheduleContentProps) {
  const weekAvailability = useMemo(() => {
    return availability
  }, [availability, weekStartDate]);

  // Check if there's any available slots
  const hasAvailableSlots = useMemo(() => {
    return weekAvailability.some(day => 
      day.slots.some(slot => slot.isAvailable)
    );
  }, [weekAvailability]);

  const handleSlotSelect = (date: string, startTime: string) => {
    if (onSlotSelect) {
      onSlotSelect(date, startTime);
    }
  };

  if (!hasAvailableSlots) {
    return (
      <div className="w-full lg:min-h-[420px] lg:flex lg:items-center lg:justify-center">
        <ScheduleEmptyState />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AvailabilityGrid
        availability={weekAvailability}
        selectedSlot={selectedSlot || undefined}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
}
