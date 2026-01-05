import type { DayAvailabilityI } from "../types";

export interface AvailabilityGridProps {
  availability: DayAvailabilityI[];
  selectedSlot?: {
    date: string;
    startTime: string;
  };
  onSlotSelect?: (date: string, startTime: string) => void;
}

