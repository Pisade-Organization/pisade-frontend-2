"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import MobileMenu from "./MobileMenu/MobileMenu"
import BaseButton from "./base/BaseButton"

export default function SearchNavbar() {
    const router = useRouter();

    const onLogoClick = () => {
        router.push('/')
    }
    const onSigninClick = () => {
        router.push('/signin')
    }
    return (
        <nav className="w-full flex justify-between items-center py-4 px-4 lg:px-20 border-b border-[#F5F5F533] ">

            <div className="flex justify-between items-center gap-x-12">
                <Image
                    onClick={onLogoClick}
                    src="/logos/pisade.svg"
                    alt="Pisade Logo"
                    width={109}
                    height={36}
                    priority
                    className="cursor-pointer"
                />

            </div>

            <div className="hidden lg:flex justify-between items-center text-white gap-x-2 text-label-3">

                {/* Languages */}
                <button
                    className="w-[76px] h-[45px] rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
                    style={{
                        background: "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.534754) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.595) 100%)",
                    }}
                >
                    <div className="bg-black rounded-lg py-[10px] h-full w-full px-3 bg-gradient-to-r from-white/5 to-white/25">
                        <span>EN</span>
                        <ChevronDown size={20} className="inline ml-1" />
                    </div>
                    {/* </div> */}
                </button>

                {/* Sign up */}
                <BaseButton
                    variant="secondary"
                    typeStyle="borderless"
                >
                    Sign Up
                </BaseButton>

                {/* Sign in */}
                <BaseButton 
                    onClick={onSigninClick}>
                    Sign In
                </BaseButton>


            </div>


            {/* MOBILE NAVBAR */}
            <div className="lg:hidden flex justify-center items-center ">
                
                {/* SEARCH */}
                <button className="w-11 h-11  rounded-lg cursor-pointer flex justify-center items-center p-[1px]">
                    <Search width={20} height={20} color={'white'} />
                </button>
                
                {/* MENU */}
                <MobileMenu />
            </div>

        </nav>
    )
}