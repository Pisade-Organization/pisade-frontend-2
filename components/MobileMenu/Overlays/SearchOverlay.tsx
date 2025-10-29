"use client"

import { useSession } from "next-auth/react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Search } from "lucide-react"
import { Calendar } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchOverlay() {
  const router = useRouter()
  const { data, status } = useSession()
  return (
    <div className="py-3 flex flex-col gap-5">
      
      {status === "unauthenticated" && (
        <div className="rounded-[12px] border border-neutral-50 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Typography variant="title-1" color="neutral-900">
              Personalized learning, made simple.
            </Typography>

            <Typography variant="body-3" color="neutral-500">
              Join us and start your inspiring journey today.
            </Typography>
          </div>

          <div className="flex gap-2">
            <BaseButton typeStyle="outline" className="w-full" onClick={() => router.push('/tutor/signup')}>
              Become a tutor
            </BaseButton>

            <BaseButton className="w-full" onClick={() => router.push('/signin')}>
              Sign in
            </BaseButton>
          </div>
        </div>
      )}

      {/* GENERAL SECTION */}
      <div className="flex flex-col gap-4">
        <Typography variant="title-2" color="neutral-900">
          General
        </Typography>

        <div className="flex flex-col gap-3">

          {/* FIND TUTORS */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Search size={20} className="text-neutral-200" />
              <Typography variant="body-3" color="neutral-900">Find tutors</Typography>
            </div>
            <ChevronRight size={20} className="text-neutral-200" />
          </div>

          {/* DIVIDER */}
          <div className="w-full border-t border-neutral-50"/>

        </div>
      </div>

      {/* OTHER SECTION */}
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
    </div>
  )
}