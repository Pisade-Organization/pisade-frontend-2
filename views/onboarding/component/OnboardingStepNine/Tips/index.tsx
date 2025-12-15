import Title from "./Title"
import GoodPhoto from "./GoodPhoto"
import { Accordion } from "@/components/ui/accordion"
export default function Tips() {
  return (
    <div className="w-full bg-white flex flex-col gap-5 pt-4 pb-5 px-4 lg:py-5 lg:px-8 rounded-b-[20px] ">
      <Title />

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <GoodPhoto />
          <GoodPhoto />
        </Accordion>
      </div>
    </div>
  )
}