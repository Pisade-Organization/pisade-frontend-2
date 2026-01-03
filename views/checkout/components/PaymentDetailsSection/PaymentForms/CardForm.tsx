import Typography from "@/components/base/Typography"
import { CardIcon, CardDateIcon, CardCvcIcon } from "@/components/icons"

export default function CardForm() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Typography variant={{ base: "label-2" }} color="neutral-900">
        Card information
      </Typography>

      <div className="w-full grid grid-rows-2 grid-flow-row">

        {/* CARD NUMBER */}
        <div className="roundedt-xl border border-neutral-50 flex justify-between py-3 px-4">
          <input 
            type="text" 
            placeholder="121-3-56911-9"
            className="w-full"
          />

          <CardIcon width={32} height={20} className="w-[32px] h-[20px] lg:w-[38px] lg:h-[24px]"/>
        </div>

        {/* EXPIRY DATE + CVC */}
        <div className="w-full grid grid-cols-2">
          
          {/* EXPIRY DATE */}
          <div className="w-full py-3 px-4 rounded-bl-xl border-neutral-50 flex justify-betweem items-center">
            <input 
              type="text"
              placeholder="MM/YY"
              className="w-full"
            />
            <CardDateIcon width={32} height={20} className="w-[32px] h-[20px] lg:w-[38px] lg:h-[24px]"/>
          </div>

          {/* CVC */}
          <div className="w-full py-3 px-4 rounded-br-xl boder border-neutral-50 flex justify-between items-center">
            <input 
              type="text"
              placeholder="CVC"
              className="w-full"
            />

            <CardCvcIcon width={32} height={20} className="w-[32px] h-[20px] lg:w-[38px] lg:h-[24px]"/>
          </div>

        </div>

      </div>
    </div>
  )
}