"use client"
import { Calendar } from "lucide-react";
import BaseButton from "@/components/base/BaseButton";

export default function MyScheduleBtn() {
    return (
        <>

            {/* MOBILE */}
            <button className="text-electric-violet-600 text-label-2 underline">
                My schedules
            </button>

            {/* DESKTOP */}
            <BaseButton
                className="hidden lg:flex justify-center items-center gap-2 text-white text-label-3"
            >
                <Calendar />

                My Schedules
            </BaseButton>
        </>
    )
}