"use client";

import type { DayAvailabilityI, TimeSlotI } from "../types";
import type { AvailabilityGridProps } from "./AvailabilityGrid.types";
import Typography from "@/components/base/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function AvailabilityGrid({
  availability,
  selectedSlot,
  onSlotSelect,
}: AvailabilityGridProps) {
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const isDateInPast = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSlotSelected = (date: string, startTime: string) => {
    return selectedSlot?.date === date && selectedSlot?.startTime === startTime;
  };

  const DayColumn = ({ day }: { day: DayAvailabilityI }) => {
    const isPast = isDateInPast(day.date);

    return (
      <div className="flex flex-col gap-3 min-w-[80px] lg:min-w-0 w-full">
        {/* Day Header */}
        <div className="flex flex-col gap-1 w-full">
          <Typography
            variant="body-3"
            color={isPast ? "neutral-400" : "neutral-700"}
            className="w-full text-center"
          >
            {day.weekday}
          </Typography>
          <Typography
            variant="body-3"
            color={isPast ? "neutral-400" : "neutral-700"}
            className={cn(
              "w-full text-center",
              !isPast && "border-b-2 border-electric-violet-500 pb-0.5"
            )}
          >
            {day.date.split("-")[2]}
          </Typography>
        </div>

        {/* Time Slots */}
        <div className="w-full flex flex-col gap-2">
          {day.slots.map((slot: TimeSlotI) => {
            const selected = isSlotSelected(day.date, slot.startTime);
            const isDisabled = !slot.isAvailable || isPast;

            return (
              <button
                key={`${day.date}-${slot.startTime}`}
                onClick={() => {
                  if (!isDisabled && onSlotSelect) {
                    onSlotSelect(day.date, slot.startTime);
                  }
                }}
                disabled={isDisabled}
                className={cn(
                  "w-full py-2 px-3 rounded-lg border transition-colors",
                  "bg-white border-neutral-100",
                  isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:border-electric-violet-300 hover:bg-electric-violet-25",
                  selected && "border-electric-violet-500 bg-electric-violet-25",
                  !isPast && !isDisabled && "border-neutral-100"
                )}
              >
                <Typography
                  variant="body-3"
                  color={isDisabled ? "neutral-400" : "neutral-700"}
                >
                  {slot.startTime}
                </Typography>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Mobile: Swiper */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          className="!pb-4"
        >
          {availability.map((day) => (
            <SwiperSlide key={day.date} className="!w-auto">
              <DayColumn day={day} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden lg:grid lg:grid-cols-7 lg:gap-6">
        {availability.map((day) => (
          <DayColumn key={day.date} day={day} />
        ))}
      </div>
    </div>
  );
}

