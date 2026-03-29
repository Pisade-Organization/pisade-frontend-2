"use client";

import type { BookingDialogI } from "./types";
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
  currentDate,
  onPreviousWeek,
  onNextWeek,
  weekRange,
  availability,
  selectedSlot,
  isSubmitting,
  onSlotSelect,
  onContinue,
  continueDisabled,
}: BookingDialogI) {
  const handleSlotSelect = (date: string, startTime: string) => {
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

      <DateNavigator
        currentDate={currentDate}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
      />

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
