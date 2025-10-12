import { Calendar } from "lucide-react"
import { Heart } from "lucide-react"
import { MessageCircle } from "lucide-react"

export default function TutorActionButtons() {
    return (
        <div className="flex justify-center items-center gap-x-2">
            
            <div className="flex justify-center items-center gap-x-1">
                <Calendar size={44} className="p-[10px] text-neutral-700"/>

                <Heart size={44} className="p-[10px] text-neutral-700"/>

                <MessageCircle size={44} className="p-[10px] text-neutral-700"/>
            </div>

            <button className="text-label-2 text-white bg-electric-violet-500 py-3 px-4 rounded-xl transition-colors duration-200 hover:bg-electric-violet-600">
                Book trial lesson
            </button>
        </div>
    )
}