"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import BaseButton from "../base/BaseButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
  dark?: boolean
  studentStyle?: boolean
}

export default function LanguageSwitcher({ dark, studentStyle }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<"EN" | "TH">("EN")

  if (dark) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
            style={{
              background:
                "linear-gradient(110.21deg, rgba(255,255,255,0.7) 2.78%, rgba(255,250,203,0.53) 58.48%, rgba(255,57,57,0.07) 72.66%, rgba(255,255,255,0.59) 100%)",
            }}
          >
            <div className="bg-black rounded-lg px-4 py-3.5 bg-gradient-to-r from-white/5 to-white/25 text-white text-label-3">
              {language} <ChevronDown size={20} className="inline ml-1" />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="rounded-lg border-0 p-[1px] bg-transparent"
          style={{
            background:
              "linear-gradient(110.21deg, rgba(255,255,255,0.7) 2.78%, rgba(255,250,203,0.53) 58.48%, rgba(255,57,57,0.07) 72.66%, rgba(255,255,255,0.59) 100%)",
          }}
        >
          <div className="min-w-[92px] rounded-lg bg-black bg-gradient-to-r from-white/5 to-white/25 p-1">
            <DropdownMenuItem
              onClick={() => setLanguage("EN")}
              className="cursor-pointer rounded-md px-3 py-2 text-label-3 text-white focus:bg-white/20 focus:text-white data-[highlighted]:bg-white/20 data-[highlighted]:text-white"
            >
              EN
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLanguage("TH")}
              className="cursor-pointer rounded-md px-3 py-2 text-label-3 text-white focus:bg-white/20 focus:text-white data-[highlighted]:bg-white/20 data-[highlighted]:text-white"
            >
              TH
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (studentStyle) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-[12px] border border-neutral-50 py-[10px] pl-3 pr-4 flex items-center gap-[10px]"
          >
            <span className="text-label-3 text-neutral-700">{language}</span>
            <ChevronDown className="w-5 h-5 text-neutral-300" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[88px] rounded-[12px] border border-neutral-50 p-1">
          <DropdownMenuItem
            onClick={() => setLanguage("EN")}
            className="cursor-pointer rounded-[8px] px-3 py-2 text-label-3 text-neutral-700 focus:bg-neutral-25 focus:text-neutral-700 data-[highlighted]:bg-neutral-25 data-[highlighted]:text-neutral-700"
          >
            EN
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("TH")}
            className="cursor-pointer rounded-[8px] px-3 py-2 text-label-3 text-neutral-700 focus:bg-neutral-25 focus:text-neutral-700 data-[highlighted]:bg-neutral-25 data-[highlighted]:text-neutral-700"
          >
            TH
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <BaseButton variant="secondary" typeStyle="outline">
      EN <ChevronDown size={20} className="inline ml-1" />
    </BaseButton>
  )
}
