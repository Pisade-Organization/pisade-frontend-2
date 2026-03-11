"use client"

import { useState } from "react"
import BaseButton from "@/components/base/BaseButton"
import { EmptyBoxIcon } from "@/components/icons"
import Footer from "@/components/footer/Footer"
import ViewModeToggle from "@/views/search/components/filters/ViewModeToggle"

export default function CurrentTutorsPage() {
  const [mode, setMode] = useState<"list" | "grid">("list")

  return (
    <>
      <section className="flex min-h-[calc(100dvh-220px)] flex-col px-4 py-6 lg:px-20 lg:py-8 lg:gap-10">
      <div className="flex items-center justify-between">
        <div className="text-title-1 text-neutral-800 lg:text-headline-2">You currently have 0 tutor</div>
        <div className="hidden lg:block">
          <ViewModeToggle mode={mode} setMode={setMode} />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
        <EmptyBoxIcon className="w-[88px] h-[88px]" />

        <div className="flex flex-col items-center gap-1">
          <p className="text-title-3 lg:text-title-2 text-neutral-700 text-center">Time to Find Your Expert</p>
          <p className="text-body-3 lg:text-body-2 text-neutral-400 text-center">
            We see you haven&apos;t secured a tutor. Explore our available tutors and connect with the right one for you
            today!
          </p>
        </div>

        <BaseButton typeStyle={{ base: "outline", lg: "default" }}>Find my tutor</BaseButton>
      </div>
      </section>
      <Footer />
    </>
  )
}
