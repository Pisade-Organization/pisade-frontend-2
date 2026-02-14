"use client"

import Title from "./Title"
import GoodPhoto from "./GoodPhoto"
import { Accordion } from "@/components/ui/accordion"
import BadPhoto from "./BadPhoto"
import useMediaQuery from "@/hooks/useMediaQuery"

export default function Tips() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMobile = !isDesktop

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
