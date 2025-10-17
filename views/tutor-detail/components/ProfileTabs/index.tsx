import { cn } from "@/lib/utils"

export default function ProfileTabs({
    currentTab, setCurrentTab
}: {
    currentTab: "Overview" | "Availability calendar" | "Reviews & ratings" 
    setCurrentTab: (currentTab: "Overview" | "Availability calendar" | "Reviews & ratings" ) => void
}) {
    
    const onTabClick = (tab: "Overview" | "Availability calendar" | "Reviews & ratings" ) => {
        setCurrentTab(tab)
    }
    return (
        <div className="w-full flex justify-between items-center
            text-body-3 lg:text-body-2 text-neutral-700
            border-b
        ">

            <button 
            onClick={() => onTabClick('Overview')}
            className={cn(
                "w-full transition-all duration-200 pb-2",
                currentTab === "Overview" && "text-electric-violet-400 border-b border-electric-violet-400"
            )}>
                Overview
            </button>

            <button 
            onClick={() => onTabClick('Availability calendar')}
            className={cn(
                "w-full transition-all duration-200 pb-2",
                currentTab === "Availability calendar" && "text-electric-violet-400 border-b border-electric-violet-400"
            )}>
                Availability calendar
            </button>

            <button 
            onClick={() => onTabClick('Reviews & ratings')}
            className={cn(
                "w-full transition-all duration-200 pb-2",
                currentTab === "Reviews & ratings" && "text-electric-violet-400 border-b border-electric-violet-400"
            )}>
                Reviews & ratings
            </button>

        </div>
    )
}