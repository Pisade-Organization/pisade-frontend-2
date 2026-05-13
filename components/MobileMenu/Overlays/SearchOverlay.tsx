"use client"

import { signOut, useSession } from "next-auth/react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import {
  Calendar,
  CalendarPlus2,
  CircleHelp,
  Glasses,
  Heart,
  House,
  LogOut,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  UsersRound,
  Wallet,
  WalletMinimal,
} from "lucide-react"
import { ChevronRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useMyProfile, useMyWalletSummary } from "@/hooks/settings/queries"

export default function SearchOverlay() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")[1] || "en"
  const { data, status } = useSession()
  const { data: profileData } = useMyProfile()
  const { data: myWalletSummary } = useMyWalletSummary()
  const displayBalance = `฿${(myWalletSummary?.balance ?? 0).toLocaleString("en-US")}`
  return (
    <div className="py-3 flex flex-col gap-5">
      
      {status === "unauthenticated" && (
        <div className="rounded-xl border border-neutral-50 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Typography variant="title-1" color="neutral-900">
              Personalized learning, made simple.
            </Typography>

            <Typography variant="body-3" color="neutral-500">
              Join us and start your inspiring journey today.
            </Typography>
          </div>

          <div className="flex gap-2">
            <BaseButton typeStyle="outline" className="w-full" onClick={() => router.push(`/${locale}/tutor/signup`)}>
              Become a tutor
            </BaseButton>

            <BaseButton className="w-full" onClick={() => router.push(`/${locale}/signin`)}>
              Sign in
            </BaseButton>
          </div>
        </div>
      )}

      {status === "authenticated" && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">

            <div className="rounded-full p-1 relative">
              <Image 
                src={data.user.avatarUrl || "/images/avatars/default-avatar.svg"}
                alt={`${data.user.fullName}'s Profile Picture`}
                width={86}
                height={86}
                className="rounded-full"
              />
              <button className="p-2.5 absolute right-0 bottom-0 rounded-full border-[1.5px] border-neutral-50 bg-white flex justify-center items-center">
                <Pencil className="w-3 h-3 text-neutral-600" />
              </button>
            </div>

            <div className="flex flex-col">
              <Typography variant="title-1" color="neutral-900">{data.user.fullName}</Typography>
              <Typography variant="body-3" color="neutral-500">{data.user.email}</Typography>
              <Typography variant="body-3" color="neutral-300">{profileData?.profile?.timezone ?? "-"}</Typography>
            </div>
          </div>

          <div className="p-3 flex flex-col gap-3 border-[1.5px] border-neutral-50 rounded-xl">
            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="neutral-500">Total balance</Typography>
              <Typography variant="title-1" color="deep-royal-indigo-500">{displayBalance}</Typography>
            </div>

            <BaseButton>Top Up Wallet</BaseButton>
          </div>
        </div>
      )}

      {/* GENERAL SECTION */}
      <div className="flex flex-col gap-4">
        <Typography variant="title-2" color="neutral-900">
          General
        </Typography>

        <div className="flex flex-col gap-3">
          {(status === "authenticated"
            ? [
                { label: "Home", icon: House },
                { label: "Tutors", icon: UsersRound },
                { label: "Class", icon: Glasses },
                { label: "Schedule", icon: CalendarPlus2 },
              ]
            : [{ label: "Find tutors", icon: Search }]
          ).map(({ label, icon: Icon }, index, items) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Icon size={20} className="text-neutral-200" />
                  <Typography variant="body-3" color="neutral-900">{label}</Typography>
                </div>
                <ChevronRight size={20} className="text-neutral-200" />
              </div>

              {index < items.length - 1 && <div className="w-full border-t border-neutral-50" />}
            </div>
          ))}

        </div>
      </div>

      {status === "authenticated" && (
        <div className="flex flex-col gap-4">
          <Typography variant="title-2" color="neutral-900">
            Account
          </Typography>

          <div className="flex flex-col gap-3">
            {[
              { label: "My Wallet", icon: Wallet },
              { label: "Account Settings", icon: Settings },
              { label: "Saved Tutor", icon: Heart },
              { label: "Transactions", icon: WalletMinimal },
              { label: "Safety & Trust", icon: ShieldCheck },
              { label: "Helps", icon: CircleHelp },
            ].map(({ label, icon: Icon }, index, items) => (
              <div key={label} className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Icon size={20} className="text-neutral-200" />
                    <Typography variant="body-3" color="neutral-900">{label}</Typography>
                  </div>
                  <ChevronRight size={20} className="text-neutral-200" />
                </div>

                {index < items.length - 1 && <div className="w-full border-t border-neutral-50" />}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="flex justify-center items-center gap-2 py-1"
            onClick={() => {
              void signOut({ redirect: false })
            }}
          >
            <LogOut className="w-5 h-5 text-red-normal" />
            <Typography variant="body-3" color="red-normal">Log out</Typography>
          </button>
        </div>
      )}

      {status !== "authenticated" && (
        <div className="flex flex-col gap-4">
          <Typography variant="title-2" color="neutral-900">
            Other
          </Typography>

          <div className="flex flex-col gap-3">

            {/* TERMS OF USE */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Search size={20} className="text-neutral-200" />
                <Typography variant="body-3" color="neutral-900">Terms of Use</Typography>
              </div>
              <ChevronRight size={20} className="text-neutral-200" />
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-neutral-50"/>

            {/* PRIVACY POLICY */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Calendar size={20} className="text-neutral-200" />
                <Typography variant="body-3" color="neutral-900">Privacy Policy</Typography>
              </div>
              <ChevronRight size={20} className="text-neutral-200" />
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-neutral-50"/>

          </div>
        </div>
      )}
    </div>
  )
}
