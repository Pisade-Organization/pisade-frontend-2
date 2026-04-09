import type { CalendarView } from "@/views/schedule/components/ScheduleContent/calendar.utils";

export interface WeekNavigatorProps {
  startDate: Date;
  endDate: Date;
  variant: 'mobile' | 'desktop';
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday?: () => void;
  view: CalendarView;
}

export interface NavButtonProps {
  onClick: () => void;
}
