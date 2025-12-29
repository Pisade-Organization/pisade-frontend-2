"use client"
import { Calendar } from "lucide-react";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";

export default function MyScheduleBtn() {
    return (
        <>
          {/* MOBILE */}
          <button className="lg:hidden">
            <Typography variant="label-2" color="electric-violet-600" underline>
              My Schedule
            </Typography>
          </button>


          {/* DESKTOP */}
          <BaseButton
              variant="secondary"
              className="hidden lg:flex"
              iconLeft={<Calendar />}
          >
              My Schedule
          </BaseButton>
      </>
    )
}