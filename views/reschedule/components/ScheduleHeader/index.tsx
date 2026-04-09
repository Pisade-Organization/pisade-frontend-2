"use client";

import { useMemo } from "react";
import type { CalendarView } from "@/views/schedule/components/ScheduleContent/calendar.utils";
import { startOfWeek } from "@/views/schedule/components/ScheduleContent/calendar.utils";
import WeekNavigator from "./WeekNavigator"
import ViewSelector from "./ViewSelector"

interface ScheduleHeaderProps {
  weekStartDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday?: () => void;
  variant: "mobile" | "desktop";
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  showViewSelector?: boolean;
}

export default function ScheduleHeader({
  weekStartDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  variant,
  view,
  onViewChange,
  showViewSelector = true,
}: ScheduleHeaderProps) {
  const { startDate, endDate } = useMemo(() => {
    const start = new Date(weekStartDate);
    const end = new Date(weekStartDate);

    if (view === "day") {
      return { startDate: start, endDate: end };
    }

    if (view === "month") {
      return {
        startDate: new Date(start.getFullYear(), start.getMonth(), 1),
        endDate: new Date(start.getFullYear(), start.getMonth() + 1, 0),
      };
    }

    const weekStart = startOfWeek(start);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return { startDate: weekStart, endDate: weekEnd };
  }, [view, weekStartDate]);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <WeekNavigator 
          startDate={startDate}
          endDate={endDate}
          variant={variant}
          onPrevWeek={onPrevWeek}
          onNextWeek={onNextWeek}
          onToday={onToday}
          view={view}
        />
      </div>

      {showViewSelector ? <ViewSelector view={view} onViewChange={onViewChange} /> : null}
    </div>
  )
}
