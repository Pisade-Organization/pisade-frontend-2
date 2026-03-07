"use client";

import type { BookingDialogI } from "./types";
import { useState } from "react";
import AvailabilityGrid from "./AvailabilityGrid";
import BookingHeader from "./BookingHeader";
import TimezoneSelector from "./TimezoneSelector";
import DateNavigator from "./DateNavigator";
import BookingFooter from "./BookingFooter";

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
  onSlotSelect,
  onContinue,
  continueDisabled,
}: BookingDialogI) {
  const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);

  const handleSlotSelect = (date: string, startTime: string) => {
    setSelectedSlot({ date, startTime });
    onSlotSelect?.(date, startTime);
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
        availability={availability}
        selectedSlot={selectedSlot}
        onSlotSelect={handleSlotSelect}
      />
      
      <BookingFooter
        onContinue={onContinue ?? (() => {})}
        disabled={continueDisabled}
        isLoading={isSubmitting}
      />
    </div>
  );
}
