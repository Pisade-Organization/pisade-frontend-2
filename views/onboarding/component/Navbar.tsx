"use client"
import { useRouter } from "next/navigation"
import { PisadeDarkLogo } from "@/components/icons"
import LanguageDropdown from "@/components/shared/LanguageDropdown"

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="flex justify-between items-center px-20 py-4 border border-neutral-50 bg-white">
      <PisadeDarkLogo 
        width={109}
        height={36}
        onClick={() => router.push('/')}
        className="cursor-pointer"
      />

      <LanguageDropdown />

    </nav>
  )
}