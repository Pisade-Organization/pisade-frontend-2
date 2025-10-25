import Typography from "@/components/base/Typography"
import { Funnel } from "lucide-react"
export default function FilterHeader() {
    return (
        <div className="flex justify-center items-center gap-x-2">
            
            {/* FILTER */}
            <Typography variant="headline-4" color="neutral-700">
                Filters
            </Typography>

            {/* FUNNEL ICON */}
            <Funnel width={24} height={24} className="text-neutral-700"/>
        </div>
    )
}