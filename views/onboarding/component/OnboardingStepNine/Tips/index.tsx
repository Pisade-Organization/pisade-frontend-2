"use client"

import Title from "./Title"
import GoodPhoto from "./GoodPhoto"
import { Accordion } from "@/components/ui/accordion"
import BadPhoto from "./BadPhoto"
import { useState, useLayoutEffect } from "react"

export default function Tips() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024
    }
    return false
  })

  // detect mobile - use useLayoutEffect for immediate synchronous update
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div className="w-full bg-white flex flex-col gap-5 pt-4 pb-5 px-4 lg:py-5 lg:px-8 rounded-b-[20px] ">
      <Title />

      {isMobile ? (
        <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
          <GoodPhoto />
          <BadPhoto />
        </Accordion>
      ) : (
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <GoodPhoto />
          <BadPhoto />
        </div>
      )}
    </div>
  )
}