import { cn } from "@/lib/utils"

export default function ProfileTabs({
    currentTab, setCurrentTab
}: {
    currentTab: "Overview" | "Availability calendar" | "Reviews & ratings" 
    setCurrentTab: (currentTab: "Overview" | "Availability calendar" | "Reviews & ratings" ) => void
}) {
    
    const onTabClick = (tab: string) => {

    }
    return (
        <div className="flex justify-between items-center
            text-body-3 lg:text-body-2 text-neutral-700
        ">

            <button className={cn(
                "transition-all duration-200",
                currentTab === "Overview" && "text-electric-violet-400"
            )}>
                Overview
            </button>

            <button className={cn(
                "transition-all duration-200",
                currentTab === "Availability calendar" && "text-electric-violet-400"
            )}>
                Availability calendar
            </button>

            <button className={cn(
                "transition-all duration-200",
                currentTab === "Reviews & ratings" && "text-electric-violet-400"
            )}>
                Reviews & ratings
            </button>

        </div>
    )
}