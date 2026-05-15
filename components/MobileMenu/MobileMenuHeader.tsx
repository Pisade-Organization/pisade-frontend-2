"use client"
import Image from "next/image"
import { X } from "lucide-react"
import React from "react"
import LanguageSwitcher from "../Navbar/LanguageSwitcher"

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
                <LanguageSwitcher studentStyle />

                <X onClick={() => setOpen(false)} size={20} className="text-neutral-500"/>
            </div>
        </div>
    )
}
