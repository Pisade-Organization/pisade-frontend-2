"use client"

import Link from "next/link"
import { LogOut, Settings, UserRoundPen, Wallet } from "lucide-react"
import { signOut } from "next-auth/react"
import UserAvatar from "../UserAvatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TutorProfileDropdownProps {
  localePrefix: string
  avatarUrl?: string
  fullName?: string
}

export default function TutorProfileDropdown({
  localePrefix,
  avatarUrl,
  fullName,
}: TutorProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="rounded-full">
          <UserAvatar avatarUrl={avatarUrl} fullName={fullName} size={44} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="w-[220px] rounded-[12px] border border-neutral-50 p-1"
      >
        <DropdownMenuItem asChild className="cursor-pointer rounded-[8px] px-3 py-2">
          <Link href={`${localePrefix}/tutor/earnings-and-withdrawals`} className="flex items-center gap-2 text-neutral-800">
            <Wallet className="h-4 w-4 text-neutral-300" />
            Earnings & Withdrawals
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-[8px] px-3 py-2">
          <Link href={`${localePrefix}/settings/tutor/general`} className="flex items-center gap-2 text-neutral-800">
            <UserRoundPen className="h-4 w-4 text-neutral-300" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-[8px] px-3 py-2">
          <Link href={`${localePrefix}/settings/tutor`} className="flex items-center gap-2 text-neutral-800">
            <Settings className="h-4 w-4 text-neutral-300" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="cursor-pointer rounded-[8px] px-3 py-2 text-red-normal focus:text-red-normal data-[highlighted]:text-red-normal"
          onSelect={() => {
            void signOut({ callbackUrl: "/signin" })
          }}
        >
          <div className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
