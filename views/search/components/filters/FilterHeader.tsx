"use client"
import { Funnel } from "lucide-react"
export default function FilterHeader() {
    return (
        <div className="flex justify-center items-center gap-x-2">
            
            {/* FILTER */}
            <div className="text-headline-4 text-neutral-700">
                Filters
            </div>

            {/* FUNNEL ICON */}
            <Funnel width={24} height={24} className="text-neutral-700"/>
        </div>
    )
}