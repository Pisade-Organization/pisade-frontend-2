"use client"

import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { useMyProviders } from "@/hooks/settings/queries"
import { settingsQueryKeys } from "@/hooks/settings/queryKeys"
import { useStepSeven } from "@/hooks/tutors/onboarding/queries/useStepSeven"
import { useSaveStepSeven } from "@/hooks/tutors/onboarding/mutations/useUpdateStepSeven"
import { ProfileService } from "@/services/profile"
import type { AvailabilityDto } from "@/services/tutor/onboarding/types"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import ChooseYourTimezone from "./ChooseYourTimezone"
import SetYourAvailability from "./SetYourAvailability"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function dayNameToNumber(dayName: string): number {
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  return dayMap[dayName] ?? 0
}

function dayNumberToName(dayNumber: number): string {
  return days[dayNumber] || "Sun"
}

function normalizeAvailabilities(availabilities: AvailabilityDto[]) {
  return [...availabilities].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day
    return a.startTime.localeCompare(b.startTime)
  })
}

export default function OnboardingStepSeven() {
  const [timezone, setTimezone] = useState<string>("Asia/Bangkok")
  const [selectedSlots, setSelectedSlots] = useState<Record<string, Set<string>>>({})
  const [connectionError, setConnectionError] = useState("")
  const [connectionState, setConnectionState] = useState<"idle" | "connecting">(
    "idle",
  )

  const { data: stepSevenData, isLoading } = useStepSeven()
  const { data: providers = [], isLoading: providersLoading } = useMyProviders()
  const saveStepSeven = useSaveStepSeven()
  const { registerStepActions, unregisterStepActions, setCanContinue } =
    useOnboardingNavigation()
  const queryClient = useQueryClient()

  const saveStepSevenRef = useRef(saveStepSeven)
  const stepSevenDataRef = useRef(stepSevenData)
  const timezoneRef = useRef(timezone)
  const selectedSlotsRef = useRef(selectedSlots)
  const providersRef = useRef(providers)
  const googleCalendarPopupOriginRef = useRef<string | null>(null)

  useEffect(() => {
    saveStepSevenRef.current = saveStepSeven
    stepSevenDataRef.current = stepSevenData
    timezoneRef.current = timezone
    selectedSlotsRef.current = selectedSlots
    providersRef.current = providers
  })

  useEffect(() => {
    if (stepSevenData) {
      if (stepSevenData.timezone) {
        setTimezone(stepSevenData.timezone)
      }

      if (stepSevenData.availabilities?.length) {
        const newSelectedSlots: Record<string, Set<string>> = {}

        stepSevenData.availabilities.forEach((availability) => {
          const dayName = dayNumberToName(availability.dayOfWeek)
          if (!newSelectedSlots[dayName]) {
            newSelectedSlots[dayName] = new Set<string>()
          }
          newSelectedSlots[dayName].add(availability.startTime)
        })

        setSelectedSlots(newSelectedSlots)
      }
    }
  }, [stepSevenData])

  const googleProvider = providers.find((provider) => provider.provider === "GOOGLE")
  const isGoogleCalendarConnected = Boolean(googleProvider?.calendarConnected)

  useEffect(() => {
    const hasAnySlots = Object.values(selectedSlots).some((slots) => slots.size > 0)
    setCanContinue(hasAnySlots && isGoogleCalendarConnected && !providersLoading)
  }, [selectedSlots, isGoogleCalendarConnected, providersLoading, setCanContinue])

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.source !== "pisade-google-calendar") return
      if (
        googleCalendarPopupOriginRef.current &&
        event.origin !== googleCalendarPopupOriginRef.current
      ) {
        return
      }

      if (event.data.success) {
        setConnectionError("")
        await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.providers() })
      } else {
        setConnectionError(
          event.data.error || "Failed to connect Google Calendar.",
        )
      }

      setConnectionState("idle")
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [queryClient])

  const handleConnectGoogleCalendar = async () => {
    setConnectionError("")
    setConnectionState("connecting")
    googleCalendarPopupOriginRef.current = null

    try {
      const popup = window.open("about:blank", "_blank", "width=520,height=720")

      if (!popup) {
        throw new Error("Popup was blocked. Please allow popups and try again.")
      }

      const { authUrl } = await ProfileService.createGoogleCalendarAuthUrl()
      googleCalendarPopupOriginRef.current = new URL(authUrl).origin
      popup.location.href = authUrl
      popup.focus()
    } catch (error) {
      setConnectionError(
        error instanceof Error
          ? error.message
          : "Failed to connect Google Calendar.",
      )
      setConnectionState("idle")
    }
  }

  useEffect(() => {
    const validate = async () => {
      const hasAnySlots = Object.values(selectedSlotsRef.current).some(
        (slots) => slots.size > 0,
      )
      const googleConnected = providersRef.current.some(
        (provider) =>
          provider.provider === "GOOGLE" && provider.calendarConnected,
      )

      return hasAnySlots && googleConnected
    }

    const save = async () => {
      const availabilities: AvailabilityDto[] = []

      Object.entries(selectedSlotsRef.current).forEach(([dayName, timeSlots]) => {
        const dayNumber = dayNameToNumber(dayName)
        timeSlots.forEach((startTime) => {
          availabilities.push({
            day: dayNumber,
            startTime,
          })
        })
      })

      const payload = {
        timezone: timezoneRef.current,
        availabilities: normalizeAvailabilities(availabilities),
      }

      const existingAvailabilities: AvailabilityDto[] =
        stepSevenDataRef.current?.availabilities?.map((availability) => ({
          day: availability.dayOfWeek,
          startTime: availability.startTime,
        })) || []

      const existingPayload = {
        timezone: stepSevenDataRef.current?.timezone || "Asia/Bangkok",
        availabilities: normalizeAvailabilities(existingAvailabilities),
      }

      if (JSON.stringify(payload) === JSON.stringify(existingPayload)) {
        return
      }

      await saveStepSevenRef.current.mutateAsync(payload)
    }

    registerStepActions(7, { validate, save })
    return () => {
      unregisterStepActions(7)
    }
  }, [registerStepActions, unregisterStepActions])

  useEffect(() => {
    const hasAnySlots = Object.values(selectedSlots).some((slots) => slots.size > 0)
    setCanContinue(hasAnySlots && isGoogleCalendarConnected && !providersLoading)
  }, [selectedSlots, isGoogleCalendarConnected, providersLoading, setCanContinue])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-1">
          <Typography variant="title-2">Connect Google Calendar</Typography>
          <Typography variant="body-3" color="neutral-500">
            Link the tutor's Google account here so classes can be created under their Calendar.
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <BaseButton
            type="button"
            variant="secondary"
            onClick={handleConnectGoogleCalendar}
            disabled={connectionState === "connecting" || providersLoading}
          >
            {isGoogleCalendarConnected ? "Reconnect Google" : "Connect Google"}
          </BaseButton>
          <Typography
            variant="body-3"
            color={isGoogleCalendarConnected ? "green-normal" : "neutral-500"}
          >
            {isGoogleCalendarConnected ? "Connected" : "Not connected"}
          </Typography>
        </div>

        {connectionError ? (
          <Typography variant="body-3" color="red-normal">
            {connectionError}
          </Typography>
        ) : null}
      </div>

      <ChooseYourTimezone timezone={timezone} onTimezoneChange={setTimezone} />
      <SetYourAvailability
        selectedSlots={selectedSlots}
        onSelectedSlotsChange={setSelectedSlots}
      />
    </div>
  )
}
