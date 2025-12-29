"use client"

import { useState, useEffect } from "react"
import TimerCard from "./TimerCard"

export default function CountdownTimer({
    lessonTime
}: {
    lessonTime: Date
}) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const diff = lessonTime.getTime() - now.getTime();
            return Math.max(0, Math.floor(diff / 1000));
        };

        // Set initial time
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [lessonTime]);

    const hours = Math.floor(timeLeft / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return (
        <div className="flex justify-center items-center gap-4">
            
            <TimerCard value={hours} label="Hours" />

            <div className="text-headline-3 text-white"> 
                :
            </div>

            <TimerCard value={minutes} label="Minutes" />

            <div className="text-headline-3 text-white"> 
                :
            </div>

            <TimerCard value={seconds} label="Secs" />

        </div>
    )
}