export interface WeekNavigatorProps {
  startDate: Date;
  endDate: Date;
  variant: 'mobile' | 'desktop';
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export interface NavButtonProps {
  onClick: () => void;
}