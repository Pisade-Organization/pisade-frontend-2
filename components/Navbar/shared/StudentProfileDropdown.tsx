"use client"

import Link from "next/link"
import {
  Heart,
  LogOut,
  Settings,
  Wallet,
  WalletMinimal,
  type LucideIcon,
} from "lucide-react"
import { signOut } from "next-auth/react"
import UserAvatar from "../UserAvatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"

interface StudentProfileDropdownProps {
  localePrefix: string
  avatarUrl: string | null
  fullName: string
  email: string
  timezone: string
  totalBalance: number
}

type StudentMenuItem = {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  danger?: boolean
  onSelect?: () => void
}

export default function StudentProfileDropdown({
  localePrefix,
  avatarUrl,
  fullName,
  email,
  timezone,
  totalBalance,
}: StudentProfileDropdownProps) {
  const displayBalance = `฿${totalBalance.toLocaleString("en-US")}`
  const menuItems: StudentMenuItem[] = [
    {
      id: "my-wallet",
      label: "My Wallet",
      icon: Wallet,
      href: `${localePrefix}/student/wallet`,
    },
    {
      id: "saved-tutor",
      label: "Saved Tutor",
      icon: Heart,
      href: `${localePrefix}/student/tutors/favorites`,
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: WalletMinimal,
      href: `${localePrefix}/settings/student/payment-history`,
    },
    {
      id: "account-settings",
      label: "Account Settings",
      icon: Settings,
      href: `${localePrefix}/settings/student`,
    },
    {
      id: "log-out",
      label: "Log Out",
      icon: LogOut,
      danger: true,
      onSelect: () => {
        void signOut({ callbackUrl: "/signin" })
      },
    },
  ]

  const navItems = menuItems.filter((item) => !item.danger)
  const actionItems = menuItems.filter((item) => item.danger)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="rounded-full">
          <UserAvatar avatarUrl={avatarUrl ?? undefined} fullName={fullName} size={44} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="w-[320px] rounded-xl p-4 border border-neutral-50 bg-white flex flex-col gap-3"
      >
        {/* STUDENT PROFILE */}
        <div className="flex gap-3 items-start">
          <UserAvatar avatarUrl={avatarUrl ?? undefined} size={60} />
          <div>
            <Typography variant="title-2" color="neutral-800">{fullName}</Typography>
            <Typography variant="body-3" color="neutral-500">{email}</Typography>
            <Typography variant="body-3" color="neutral-300">{timezone}</Typography>
          </div>
        </div>

        {/* TOTAL BALANCE */}
        <div className="rounded-xl border-[1.5px] border-neutral-50 p-3 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Typography variant="body-3" color="neutral-500">Total balance</Typography>
            <Typography variant="title-1" color="deep-royal-indigo-500">{displayBalance}</Typography>
          </div>
          <BaseButton>
            Top Up Wallet
          </BaseButton>
        </div>

        {/* NAV LINKS */}
        <div className="pt-2">
          {navItems.map((item, index) => {
            const Icon = item.icon

            return (
              <div key={item.id}>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-[8px] px-1 py-2 transition-colors focus:bg-neutral-25 focus:text-neutral-800 data-[highlighted]:bg-neutral-25 data-[highlighted]:text-neutral-800"
                >
                  <Link href={item.href ?? "#"} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-neutral-200" />
                    <Typography variant="body-3" color="neutral-800">{item.label}</Typography>
                  </Link>
                </DropdownMenuItem>

                {index < navItems.length - 1 ? <div className="w-full border-b border-neutral-50" /> : null}
              </div>
            )
          })}

          {actionItems.length > 0 ? <div className="w-full border-b border-neutral-50 my-1" /> : null}

          {actionItems.map((item) => {
            const Icon = item.icon

            return (
              <DropdownMenuItem
                key={item.id}
                className="cursor-pointer rounded-[8px] px-1 py-2 transition-colors text-red-normal focus:bg-red-50 focus:text-red-normal data-[highlighted]:bg-red-50 data-[highlighted]:text-red-normal"
                onSelect={item.onSelect}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-red-normal" />
                  <Typography variant="body-3" color="red-normal">{item.label}</Typography>
                </div>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
