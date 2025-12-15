import Typography from "@/components/base/Typography"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from "lucide-react"
export default function GoodPhoto() {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="inline-flex justify-between items-center ">
        <div className="inline-flex justify-start items-center gap-[10px]">
          <Check className="text-green-normal w-5 h-5 rounded-sm p-[2px] bg-green-light" />
          <Typography variant={{ base: "title-2" }} color="neutral-900">
            Good photo
          </Typography>
        </div>
      </AccordionTrigger>

      <AccordionContent className="flex flex-col gap-4 p-4">

        <div className="w-[311px] h-[195px] rounded-[10px] border bg-neutral-25 border-neutral-25">
        </div>

      <ul className="list-disc pl-4 flex flex-col gap-2">
        <li>
          <Typography variant={{ base: "body-3" }} color="neutral-700">
            All text is clear and readable
          </Typography>
        </li>
        <li>
          <Typography variant={{ base: "body-3" }} color="neutral-700">
            No glare or shadow
          </Typography>
        </li>
        <li>
          <Typography variant={{ base: "body-3" }} color="neutral-700">
            All corners visible
          </Typography>
        </li>
        <li>
          <Typography variant={{ base: "body-3" }} color="neutral-700">
            Not expired
          </Typography>
        </li>
        <li>
          <Typography variant={{ base: "body-3" }} color="neutral-700">
            Matches the name on your profile
          </Typography>
        </li>
      </ul>
        
      </AccordionContent>
    </AccordionItem>
  )
}