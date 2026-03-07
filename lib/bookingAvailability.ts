type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface BookingAvailabilityDay {
  date: string;
  weekday: Weekday;
  slots: Array<{
    startTime: string;
    isAvailable: boolean;
  }>;
}

type TutorAvailabilityMap = {
  [key: string]: Array<{
    start: string;
    end: string;
  }>;
};

const weekDays: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function timeToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(value: number): string {
  const hours = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getWeekStart(date: Date): Date {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function buildSlotsForIntervals(intervals: Array<{ start: string; end: string }>) {
  const slots = new Set<string>();

  intervals.forEach((interval) => {
    const start = timeToMinutes(interval.start);
    const end = timeToMinutes(interval.end);
    for (let cursor = start; cursor < end; cursor += 30) {
      slots.add(minutesToTime(cursor));
    }
  });

  return Array.from(slots)
    .sort((a, b) => timeToMinutes(a) - timeToMinutes(b))
    .map((time) => ({
      startTime: time,
      isAvailable: true,
    }));
}

export function buildBookingAvailabilityFromTutor(
  availability: TutorAvailabilityMap = {},
  baseDate: Date = new Date(),
): BookingAvailabilityDay[] {
  const weekStart = getWeekStart(baseDate);

  return weekDays.map((weekday, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    return {
      date: date.toISOString().split("T")[0],
      weekday,
      slots: buildSlotsForIntervals(availability[weekday] ?? []),
    };
  });
}
