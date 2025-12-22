"use client"

import Typography from "@/components/base/Typography"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X } from "lucide-react"
import { useLayoutEffect, useState } from "react"

export default function BadPhoto() {
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
    <>
      {/* MOBILE */}
      {isMobile && (
        <AccordionItem value="item-2">
          <AccordionTrigger className="inline-flex justify-between items-center ">
            <div className="inline-flex justify-start items-center gap-[10px]">
              <X className="text-red-normal w-5 h-5 rounded-sm p-[2px] bg-red-light" />
              <Typography variant={{ base: "title-2" }} color="neutral-900">
                Bad photo
              </Typography>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col gap-4 p-4">
            <div className="w-[311px] h-[195px] rounded-[10px] border bg-neutral-25 border-neutral-25">
            </div>

            <ul className="list-disc pl-4 flex flex-col gap-2">
              <li>
                <Typography variant={{ base: "body-3" }} color="neutral-700">
                  Text is blurry or out of focus
                </Typography>
              </li>
              <li>
                <Typography variant={{ base: "body-3" }} color="neutral-700">
                  Glare makes it unreadable
                </Typography>
              </li>
              <li>
                <Typography variant={{ base: "body-3" }} color="neutral-700">
                  Missing corners or cropped edges
                </Typography>
              </li>
              <li>
                <Typography variant={{ base: "body-3" }} color="neutral-700">
                  Tilted or uneven surface
                </Typography>
              </li>
              <li>
                <Typography variant={{ base: "body-3" }} color="neutral-700">
                  Expired or mismatched name
                </Typography>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* DESKTOP */}
      {!isMobile && (
        <div className="flex flex-col rounded-xl border py-4 px-6 gap-4 border-neutral-100 bg-white">
          {/* TITLE */}
          <div className="inline-flex justify-start items-center gap-[10px]">
            <X className="rounded-sm p-[2px] w-5 h-5 text-red-normal bg-red-light"/>
            <Typography variant="title-2" color="neutral-900">
              Bad photo
            </Typography>
          </div>

          {/* BAD PHOTO EXAMPLE */}
          <div className="w-[319px] h-[200px] rounded-[10px] border border-neutral-25 bg-neutral-25" />

          {/* RULES */}
          <ul className="list-disc pl-4 flex flex-col gap-2">
            <li>
              <Typography variant={{ base: "body-3" }} color="neutral-700">
                Text is blurry or out of focus
              </Typography>
            </li>
            <li>
              <Typography variant={{ base: "body-3" }} color="neutral-700">
                Glare makes it unreadable
              </Typography>
            </li>
            <li>
              <Typography variant={{ base: "body-3" }} color="neutral-700">
                Missing corners or cropped edges
              </Typography>
            </li>
            <li>
              <Typography variant={{ base: "body-3" }} color="neutral-700">
                Tilted or uneven surface
              </Typography>
            </li>
            <li>
              <Typography variant={{ base: "body-3" }} color="neutral-700">
                Expired or mismatched name
              </Typography>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
