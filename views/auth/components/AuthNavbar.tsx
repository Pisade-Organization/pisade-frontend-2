"use client"
import { Menu } from "lucide-react"
import Image from "next/image"
export default function AuthNavbar() {
    return (
        <div className="bg-white w-full h-[64px] px-5 flex justify-between items-center">
            
            {/* LOGO */}
            <Image 
                src="/logos/pisade-dark.svg"
                alt="Pisade logo"
                width={91}
                height={30}
            />

            {/* MENU */}
            <button className="w-11 h-11 border border-neutral-50 rounded-[8px] flex justify-center items-center">
                <Menu width={20} height={20} />
            </button>

        </div>
    )
}