"use client"
import { Check } from "lucide-react"
import Typography from "@/components/base/Typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Do() {
  const datas = [
    "Your video should be between 30 seconds and 2 minutes long",
    "Record in horizontal mode and at eyelevel",
    "Use good lighting and a neutral background",
    "Make sure your face and eyes are fully visible (except for religious reasons)",
    "Highlight your teaching experience and any relevant teaching certification(s)",
    "Greet your students warmly andinvite them to book a lesson"
  ]
  return (
    <>
      {/* Desktop */}
      <div className="w-full hidden lg:flex flex-col justify-start items-start gap-4 p-6 rounded-[12px] border border-neutral-100">

        {/* Title */}
        <div className="flex justify-start items-center gap-[10px]">
          <div className="p-[2px] rounded-[4px] bg-green-light">
            <Check size={20} className="text-green-normal" />
          </div>

          <Typography variant="title-2" color="neutral-900">
            Do
          </Typography>
        </div>

        {/* DO INFO */}
        <div className="flex flex-col justify-center items-start gap-2 pl-6">
          {datas.map((data) => (
            <li key={data}>
              <Typography variant="body-3" color="neutral-700">
                { data }
              </Typography>
            </li>
          ))}
        </div>
      </div>

      {/* Mobile - Accordion */}
      <Accordion type="single" collapsible className="w-full lg:hidden">
        <AccordionItem value="item-1" className="border border-neutral-100 rounded-[12px] px-3">
          <AccordionTrigger >
            <div className="flex justify-start items-center gap-[10px]">
              <div className="p-[2px] rounded-[4px] bg-green-light">
                <Check size={20} className="text-green-normal" />
              </div>
              <Typography variant="title-2" color="neutral-900">
                Do
              </Typography>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="flex flex-col justify-center items-start gap-2 pl-6">
            {datas.map((data) => (
              <li key={data}>
                <Typography variant="body-3" color="neutral-700">
                  { data }
                </Typography>
              </li>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
