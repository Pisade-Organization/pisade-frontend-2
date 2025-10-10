"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function SearchNavbar() {
    return (
        <nav className="w-full flex justify-between items-center py-4 px-20 border-b border-[#F5F5F533] ">

            <div className="flex justify-between items-center gap-x-12">
                <Image
                    src="/logos/pisade.svg"
                    alt="Pisade Logo"
                    width={109}
                    height={36}
                    priority
                />

                <div className="flex justify-between gap-x-9 text-white text-body-2 items-center">
                    <div className="cursor-pointer">
                        Home
                    </div>

                    <div className="cursor-pointer">
                        Class
                    </div>

                    <div className="cursor-pointer">
                        Calendar
                    </div>
                </div>

            </div>

            <div className="flex justify-between items-center text-white gap-x-2 text-label-3">

                {/* Languages */}
                <button
                    className="w-[76px] h-[45px] rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
                    style={{
                        background: "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.534754) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.595) 100%);",
                    }}
                >
                    <div className="bg-black rounded-lg py-[10px] h-full w-full px-3 bg-gradient-to-r from-white/5 to-white/25">
                        <span>EN</span>
                        <ChevronDown size={20} className="inline ml-1" />
                    </div>
                    {/* </div> */}
                </button>

                {/* Sign up */}
                <div className="cursor-pointer py-3 px-4 bg-black rounded-lg">
                    Sign Up
                </div>

                {/* Sign in */}
                <div className="cursor-pointer bg-electric-violet-500 py-3 px-4 rounded-lg">
                    Sign In
                </div>


            </div>

        </nav>
    )
}