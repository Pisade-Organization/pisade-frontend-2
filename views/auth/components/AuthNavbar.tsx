"use client"
import { Menu } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
export default function AuthNavbar({
    isAuth,
}: {
    isAuth: boolean
}) {
    const router = useRouter()
    const pathname = usePathname()
    const locale = pathname.split("/")[1] || "en"

    return (
        <div className="bg-white w-full h-[64px] px-5 flex justify-between items-center">
            
            {/* LOGO */}
            <button
                type="button"
                aria-label="Go to home page"
                className="cursor-pointer"
                onClick={() => router.push(`/${locale}`)}
            >
                <Image 
                    src="/logos/pisade-dark.svg"
                    alt="Pisade logo"
                    width={91}
                    height={30}
                />
            </button>

            {/* MENU */}
            {isAuth && (
                <button className="w-11 h-11 border border-neutral-50 rounded-[8px] flex justify-center items-center">
                    <Menu width={20} height={20} />
                </button>
            )}

        </div>
    )
}
