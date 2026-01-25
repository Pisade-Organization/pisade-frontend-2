"use client";

import { getTimezones } from "@/lib/getTimezones";
import Typography from "@/components/base/Typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimezoneSelectorProps {
  timezone: string;
  onTimezoneChange: (timezone: string) => void;
}

export default function TimezoneSelector({
  timezone,
  onTimezoneChange
}: TimezoneSelectorProps) {
  const timezoneOptions = getTimezones();
  const selectedTimezone = timezoneOptions.find(opt => opt.value === timezone);

  // Extract GMT offset from the label (format: "GMT -11:00" or "GMT+11:00")
  const getGmtOffset = (label: string) => {
    const match = label.match(/(GMT\s?[+-]\d+:\d+)/);
    return match ? match[1].replace(/\s+/g, " ") : "";
  };

  const timezoneName = selectedTimezone?.value || timezone || "";
  const gmtOffset = selectedTimezone ? getGmtOffset(selectedTimezone.label) : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "w-full border border-neutral-50 rounded-[12px] py-3 px-4 flex justify-between items-center bg-white hover:bg-neutral-50 transition-colors"
        )}
      >
        <div className="flex items-center gap-2">
          <Typography
            variant="body-3"
            color={timezone ? "neutral-700" : "neutral-300"}
          >
            {timezoneName}
          </Typography>
          {gmtOffset && (
            <Typography
              variant="body-3"
              color="neutral-400"
            >
              {gmtOffset}
            </Typography>
          )}
        </div>
        <ChevronDown className="h-4 w-4 text-neutral-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
        align="start"
      >
        {timezoneOptions.map((opt) => {
          const offset = getGmtOffset(opt.label);
          const name = opt.value;
          
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => {
                onTimezoneChange(opt.value);
              }}
              className={cn(
                "cursor-pointer flex items-center gap-2",
                timezone === opt.value && "bg-neutral-100"
              )}
            >
              <Typography variant="body-3" color="neutral-700">
                {name}
              </Typography>
              {offset && (
                <Typography variant="body-3" color="neutral-400">
                  {offset}
                </Typography>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
