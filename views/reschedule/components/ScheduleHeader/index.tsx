"use client";

import { useEffect, useMemo, useState } from "react";
import TimezoneSelector from "./TimezoneSelector"
import WeekNavigator from "./WeekNavigator"

interface ScheduleHeaderProps {
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
  weekStartDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export default function ScheduleHeader({
  timezone,
  onTimezoneChange,
  weekStartDate,
  onPrevWeek,
  onNextWeek,
}: ScheduleHeaderProps) {
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

  // Calculate start and end dates for the week (Monday to Sunday)
  const { startDate, endDate } = useMemo(() => {
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Sunday (6 days after Monday)
    return { startDate: start, endDate: end };
  }, [weekStartDate]);

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-4">
      <WeekNavigator 
        startDate={startDate}
        endDate={endDate}
        variant={isMobile ? 'mobile' : 'desktop'}
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
      />
      <TimezoneSelector 
        timezone={timezone}
        onTimezoneChange={onTimezoneChange}
      />
    </div>
  )
}