"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackBtn() {
    const router = useRouter()
    
    const onBackClick = () => {
        router.back()
    }
    return (
        <button className="p-4 bg-white rounded-[8px]" onClick={onBackClick}>
            <ArrowLeft size={24} className="text-deep-royal-indigo-500"/>
        </button>
    )
}