"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { ChevronDown } from "lucide-react"
import React from "react"

export default function MobileMenuHeader({
    setOpen
}: {
    setOpen: (open: boolean) => void;
}) {
    return (
        <div className="flex justify-between items-center">
            
            <Image 
                src="/logos/pisade-dark.svg"
                width={91}
                height={30}
                alt="Pisade logo"
            />

            <div className="flex justify-center items-center gap-x-4">
                <button className="py-3 px-4 flex justify-center items-center gap-x-[10px] rounded-lg border border-neutral-50 ">
                    <div className="text-label-3 text-neutral-500">
                        EN
                    </div>

                    <ChevronDown size={20} className="text-neutral-500" />
                </button>

                <X onClick={() => setOpen(false)} size={20} className="text-neutral-500"/>
            </div>
        </div>
    )
}