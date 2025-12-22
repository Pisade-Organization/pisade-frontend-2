"use client"
import { useEffect } from "react"

import Typography from "@/components/base/Typography"
import BaseSelect from "@/components/base/BaseSelect"
import { getTimeZones, TimeZone } from "@vvo/tzdb"

interface ChooseYourTimezoneProps {
  timezone: string
  onTimezoneChange: (timezone: string) => void
}

export default function ChooseYourTimezone({ timezone, onTimezoneChange }: ChooseYourTimezoneProps) {
  const timezones = getTimeZones().map((timezone: TimeZone) => ({ value: timezone.name, label: `${timezone.name}`}))
  
  return (
    <div className="bg-white w-full rounded-t-[20px] pt-4 pb-5 lg:py-5 px-4 lg:px-8 flex flex-col justify-center items-start gap-2 lg:gap-4">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Choose your timezone
      </Typography>      

      <BaseSelect
        options={timezones}
        value={timezone}
        onChange={onTimezoneChange}
      />
    </div>
  )
}