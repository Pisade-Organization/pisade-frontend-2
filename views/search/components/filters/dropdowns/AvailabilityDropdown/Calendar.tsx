"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dayjs from "dayjs";

export default function Calendar() {
  const today = dayjs();
  const maxDate = today.add(3, "month").endOf("month"); // 3 months ahead

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(today);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  // start of grid (Sunday before first day of month)
  const startDate = startOfMonth.startOf("week");
  // end of grid (Saturday after last day of month)
  const endDate = endOfMonth.endOf("week");

  const days: dayjs.Dayjs[] = [];
  let day = startDate.clone();
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handlePrev = () => {
    if (currentMonth.isAfter(today, "month")) {
      setCurrentMonth(currentMonth.subtract(1, "month"));
    }
  };

  const handleNext = () => {
    if (currentMonth.isBefore(maxDate, "month")) {
      setCurrentMonth(currentMonth.add(1, "month"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-start p-4 gap-2 bg-white rounded-lg">
      <div className="text-label-2 text-neutral-900 mb-2">Calendar</div>

      {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
            <button
                onClick={handlePrev}
                disabled={!currentMonth.isAfter(today, "month")}
                className="flex justify-center items-center rounded-full border-[1.5px] border-neutral-50 w-11 h-11 "
            >
                <ArrowLeft size={20} className="text-neutral-300"/>
            </button>

            <div className="text-neutral-900 text-label-2">
                {currentMonth.format("MMMM YYYY")}
            </div>

            <button
                onClick={handleNext}
                disabled={!currentMonth.isBefore(maxDate, "month")}
                className="flex justify-center items-center rounded-full border-[1.5px] border-neutral-50 w-11 h-11 "
            >
                <ArrowRight size={20} className="text-neutral-300"/>
            </button>
        </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 w-full text-center text-neutral-500 text-sm mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-y-2 w-full text-center">
        {days.map((day, idx) => {
            const isCurrentMonth = day.month() === currentMonth.month();
            const isSelected = day.isSame(selectedDate, "day");

            // disable days before today OR after maxDate
            const isDisabled = day.isBefore(today, "day") || day.isAfter(maxDate, "day");

            return (
            <div key={idx} className="w-9 h-9 mx-auto flex items-center justify-center">
                {isCurrentMonth ? (
                <button
                    onClick={() => !isDisabled && setSelectedDate(day)}
                    disabled={isDisabled}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition
                    ${isDisabled ? "opacity-30 cursor-not-allowed text-neutral-400" : "text-neutral-900"}
                    ${isSelected ? "bg-electric-violet-500 text-white text-body-3" : ""}
                    `}
                >
                    {day.date()}
                </button>
                ) : (
                // render empty white cell if it's not from current month
                <div className="w-9 h-9"></div>
                )}
            </div>
            );
        })}
        </div>

    </div>
  );
}
