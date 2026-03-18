"use client"
import { useRouter } from "next/navigation"
import { PisadeDarkLogo } from "@/components/icons"
import LanguageDropdown from "@/components/shared/LanguageDropdown"

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="flex min-h-[64px] items-center justify-between gap-3 border border-neutral-50 bg-white px-3 py-4 sm:px-4 md:px-8 lg:px-20">
      <PisadeDarkLogo
        width={88}
        height={29}
        onClick={() => router.push('/')}
        className="cursor-pointer shrink-0 sm:w-[109px] sm:h-[36px]"
      />

      <div className="shrink-0">
        <LanguageDropdown />
      </div>

    </nav>
  )
}
