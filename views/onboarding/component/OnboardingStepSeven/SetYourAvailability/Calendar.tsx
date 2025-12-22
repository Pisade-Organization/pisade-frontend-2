"use client";
import { useState, useMemo } from "react";
import Timeslot from "./Timeslot";
import Days from "./Days";



const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

interface ScheduleData {
  day: string;
  time: string[];
}

interface CalendarProps {
  isApplyToAllDaysMode?: boolean;
  selectedSlots: Record<string, Set<string>>;
  onSelectedSlotsChange: (slots: Record<string, Set<string>>) => void;
}

export default function Calendar({ 
  isApplyToAllDaysMode = false,
  selectedSlots,
  onSelectedSlotsChange
}: CalendarProps) {

  // Get active days (days with at least one selected timeslot)
  const activeDays = useMemo(() => {
    return days.filter(day => selectedSlots[day]?.size > 0);
  }, [selectedSlots]);

  // Format data as requested
  const scheduleData = useMemo<ScheduleData[]>(() => {
    return days
      .map(day => {
        const dayTimes = selectedSlots[day] ? Array.from(selectedSlots[day]) : [];
        if (dayTimes.length > 0) {
          return {
            day: getFullDayName(day),
            time: dayTimes
          };
        }
        return null;
      })
      .filter((item): item is ScheduleData => item !== null);
  }, [selectedSlots]);

  const handleTimeslotClick = (day: string, time: string) => {
    const prev = selectedSlots
    let newSlots: Record<string, Set<string>>
    
    // If "apply to all days" mode is active, apply to all days
    if (isApplyToAllDaysMode) {
      newSlots = { ...prev };
      
      // Check if the timeslot is already selected on any day
      const isTimeSelected = days.some(d => {
        const daySlots = prev[d] ? new Set(prev[d]) : new Set<string>();
        return daySlots.has(time);
      });
      
      // Apply toggle to all days
      days.forEach(d => {
        const currentDaySlots = newSlots[d] ? new Set(newSlots[d]) : new Set<string>();
        
        if (isTimeSelected) {
          // Remove from all days
          currentDaySlots.delete(time);
          if (currentDaySlots.size > 0) {
            newSlots[d] = currentDaySlots;
          } else {
            delete newSlots[d];
          }
        } else {
          // Add to all days
          currentDaySlots.add(time);
          newSlots[d] = currentDaySlots;
        }
      });
    } else {
      // Normal mode: only affect the clicked day
      newSlots = { ...prev };
      const currentDaySlots = newSlots[day] ? new Set(newSlots[day]) : new Set<string>();
      
      if (currentDaySlots.has(time)) {
        // Remove timeslot
        currentDaySlots.delete(time);
        if (currentDaySlots.size > 0) {
          newSlots[day] = currentDaySlots;
        } else {
          delete newSlots[day];
        }
      } else {
        // Add timeslot
        currentDaySlots.add(time);
        newSlots[day] = currentDaySlots;
      }
    }
    
    onSelectedSlotsChange(newSlots);
  };

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlots[day]?.has(time) || false;
  };

  // Log scheduleData whenever it changes (for debugging)
  console.log("Schedule Data:", scheduleData);

  return (
    <div className=" w-full flex flex-col gap-6">
      {/* Top days header */}
      <Days activeDays={activeDays} />

      {/* Grid */}
      <div className="w-full grid grid-cols-7  gap-2">

        {/* 7 day columns */}
        {days.map((day) => (
          <div key={day} className="flex flex-col gap-2 ">
            {times.map((time) => (
              <Timeslot 
                key={`${day}-${time}`} 
                time={time}
                isSelected={isSlotSelected(day, time)}
                onClick={() => handleTimeslotClick(day, time)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to convert abbreviated day names to full names
function getFullDayName(abbr: string): string {
  const dayMap: Record<string, string> = {
    "Mon": "Monday",
    "Tue": "Tuesday",
    "Wed": "Wednesday",
    "Thu": "Thursday",
    "Fri": "Friday",
    "Sat": "Saturday",
    "Sun": "Sunday"
  };
  return dayMap[abbr] || abbr;
}
