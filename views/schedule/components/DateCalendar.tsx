import Typography from "@/components/base/Typography";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const calendarSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 12 : -12,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -12 : 12,
    opacity: 0,
  }),
};

interface DateCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function DateCalendar({ selectedDate, onSelectDate }: DateCalendarProps) {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );
  const [navigationDirection, setNavigationDirection] = useState(0);
  const currentYear = displayDate.getFullYear();
  const currentMonth = displayDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const leadingEmptyCells = firstDayOfMonth.getDay();

  const monthLabel = displayDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const trailingEmptyCells = (7 - ((leadingEmptyCells + daysInMonth) % 7)) % 7;
  const isAtCurrentMonth =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedDayStart = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
  );

  useEffect(() => {
    setDisplayDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const handlePrevMonth = () => {
    setNavigationDirection(-1);
    setDisplayDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setNavigationDirection(1);
    setDisplayDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="border border-neutral-50 flex flex-col gap-[2px] p-4 bg-white">
      <div className="py-1 flex justify-between items-center">
        <Typography variant="title-2" color="neutral-900">
          {monthLabel}
        </Typography>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            disabled={isAtCurrentMonth}
          >
            <ChevronLeft
              className={`w-5 h-5 ${isAtCurrentMonth ? "text-neutral-200" : "text-neutral-900"} ${isAtCurrentMonth ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          </button>
          <button type="button" onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight className="w-5 h-5 text-neutral-900 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={navigationDirection}>
          <motion.div
            key={`${currentYear}-${currentMonth}`}
            className="grid grid-cols-7"
            custom={navigationDirection}
            variants={calendarSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            {weekdayLabels.map((label) => (
              <div key={label} className="w-9 h-9 flex items-center justify-center">
                <Typography variant="body-3" color="neutral-200">
                  {label}
                </Typography>
              </div>
            ))}

            {Array.from({ length: leadingEmptyCells }).map((_, index) => (
              <div key={`leading-empty-${index}`} className="w-9 h-9" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const cellDate = new Date(currentYear, currentMonth, day);
              const isToday = cellDate.getTime() === startOfToday.getTime();
              const isSelected = cellDate.getTime() === selectedDayStart.getTime();
              const isPast = cellDate.getTime() < startOfToday.getTime();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDate(cellDate)}
                  className="w-9 h-9 flex items-center justify-center"
                >
                  <Typography
                    variant="body-3"
                    color={isToday || isSelected ? "white" : isPast ? "neutral-200" : "neutral-900"}
                    className={isToday || isSelected ? "w-9 h-9 rounded-full bg-electric-violet-400 flex items-center justify-center" : ""}
                  >
                    {day}
                  </Typography>
                </button>
              );
            })}

            {Array.from({ length: trailingEmptyCells }).map((_, index) => (
              <div key={`trailing-empty-${index}`} className="w-9 h-9" />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
