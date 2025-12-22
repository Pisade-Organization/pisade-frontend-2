"use client"

import { useState, useEffect, useRef } from "react"
import { useStepSeven } from "@/hooks/tutors/onboarding/queries/useStepSeven"
import { useSaveStepSeven } from "@/hooks/tutors/onboarding/mutations/useUpdateStepSeven"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import ChooseYourTimezone from "./ChooseYourTimezone"
import SetYourAvailability from "./SetYourAvailability"
import type { AvailabilityDto } from "@/services/tutor/onboarding/types"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Helper to convert day name to day number (0 = Sunday, 6 = Saturday)
function dayNameToNumber(dayName: string): number {
  const dayMap: Record<string, number> = {
    "Sun": 0,
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thu": 4,
    "Fri": 5,
    "Sat": 6
  }
  return dayMap[dayName] ?? 0
}

// Helper to convert day number to day name
function dayNumberToName(dayNumber: number): string {
  return days[dayNumber] || "Sun"
}

export default function OnboardingStepSeven() {
  const [timezone, setTimezone] = useState<string>("Asia/Bangkok")
  const [selectedSlots, setSelectedSlots] = useState<Record<string, Set<string>>>({})
  
  const { data: stepSevenData, isLoading } = useStepSeven()
  const saveStepSeven = useSaveStepSeven()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepSevenRef = useRef(saveStepSeven)
  const timezoneRef = useRef(timezone)
  const selectedSlotsRef = useRef(selectedSlots)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepSevenRef.current = saveStepSeven
    timezoneRef.current = timezone
    selectedSlotsRef.current = selectedSlots
  })

  // Load existing data
  useEffect(() => {
    if (stepSevenData) {
      // Set timezone
      if (stepSevenData.timezone) {
        setTimezone(stepSevenData.timezone)
      }
      
      // Convert availabilities from API to selectedSlots format
      if (stepSevenData.availabilities && stepSevenData.availabilities.length > 0) {
        const newSelectedSlots: Record<string, Set<string>> = {}
        
        stepSevenData.availabilities.forEach(availability => {
          const dayName = dayNumberToName(availability.dayOfWeek)
          if (!newSelectedSlots[dayName]) {
            newSelectedSlots[dayName] = new Set<string>()
          }
          // Add startTime to the set for this day
          newSelectedSlots[dayName].add(availability.startTime)
        })
        
        setSelectedSlots(newSelectedSlots)
      }
    }
  }, [stepSevenData])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // Check if at least one timeslot is selected
      const hasAnySlots = Object.values(selectedSlotsRef.current).some(
        slots => slots.size > 0
      )
      return hasAnySlots
    }

    const save = async () => {
      // Transform selectedSlots to API format
      const availabilities: AvailabilityDto[] = []
      
      Object.entries(selectedSlotsRef.current).forEach(([dayName, timeSlots]) => {
        const dayNumber = dayNameToNumber(dayName)
        // Each selected time becomes an availability entry
        timeSlots.forEach(startTime => {
          availabilities.push({
            day: dayNumber,
            startTime: startTime
          })
        })
      })

      const payload = {
        timezone: timezoneRef.current,
        availabilities: availabilities
      }

      await saveStepSevenRef.current.mutateAsync(payload)
    }

    registerStepActions(7, { validate, save })
    return () => {
      unregisterStepActions(7)
    }
  }, [registerStepActions, unregisterStepActions])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <ChooseYourTimezone 
        timezone={timezone}
        onTimezoneChange={setTimezone}
      />
      <SetYourAvailability 
        selectedSlots={selectedSlots}
        onSelectedSlotsChange={setSelectedSlots}
      />
    </div>
  )
}