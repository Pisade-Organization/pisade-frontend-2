"use client"
import { useState } from "react"
import Title from "./Title"
import Guide from "./Guide"
import DefaultHoursForAllDays from "./DefaultHoursForAllDays"
import Calendar from "./Calendar"

interface SetYourAvailabilityProps {
  selectedSlots: Record<string, Set<string>>
  onSelectedSlotsChange: (slots: Record<string, Set<string>>) => void
}

export default function SetYourAvailability({ selectedSlots, onSelectedSlotsChange }: SetYourAvailabilityProps) {
  const [isApplyToAllDays, setIsApplyToAllDays] = useState(false);

  return (
    <div className="flex flex-col justify-center items-start gap-4 pt-4 pb-5 lg:py-5 px-4 lg:px-8 rounded-b-[20px] bg-white">
      <Title />
      <Guide />
      <div className="w-full border-t border-electric-violet-50"/>
      <DefaultHoursForAllDays 
        onToggle={(checked) => {
          setIsApplyToAllDays(checked);
        }}
      />
      <Calendar 
        isApplyToAllDaysMode={isApplyToAllDays}
        selectedSlots={selectedSlots}
        onSelectedSlotsChange={onSelectedSlotsChange}
      />      
    </div>
  )
}