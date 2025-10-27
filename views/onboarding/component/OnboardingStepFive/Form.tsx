"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Info } from "lucide-react"
import Typography from "@/components/base/Typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function OnboardingStepFiveForm() {
  const [open, setOpen] = useState<string | undefined>("")
  return (
    <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="w-full">
      <AccordionItem value="item-1" 
      className={cn(
        "w-full border-none bg-white",
        open === "item-1" && "flex flex-col items-start pt-6 pb-8 px-8 gap-5",
        open !== "item-1" && "py-1 px-8"
      )}>

        <AccordionTrigger className={cn(
          "[&>svg]:hidden hover:no-underline",
          open === "item-1" && "flex flex-col justify-center items-start gap-1"
        )}>
          <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
            1. Introduce Yourself
          </Typography>

          { open === "item-1" && (
            <Typography variant="body-3" color="neutral-400">
              Show potential students who you are, your teaching experience, interests and hobbies
            </Typography>
          )}
        </AccordionTrigger>

        <AccordionContent className="w-full flex flex-col justify-center items-start gap-2">
          <textarea
            className="w-full rounded-[12px] h-[150px] py-3 px-4 border border-neutral-100 outline-none"
            placeholder="Hello, my name is... and I'm from..."
          />

          <div className="rounded-[15px] w-full flex justify-start items-center py-2 px-4 gap-2 bg-electric-violet-25">
            <Info size={16} className="text-deep-royal-indigo-500"/>
            <Typography variant={{ base: "body-4", lg: "body-3" }} color="deep-royal-indigo-500">
              Don’t include your last name or present your information in a CV format
            </Typography>
          </div>
        </AccordionContent>

      </AccordionItem>
    </Accordion>

  )
}