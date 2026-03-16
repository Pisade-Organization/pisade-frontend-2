import Image from "next/image"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"

export default function StudentInfoCard() {
  return (
    <div
      className="border border-neutral-50 bg-white p-4 gap-3 flex flex-col rounded-xl lg:rounded-t-xl lg:rounded-b-none shadow-[0px_1px_4px_0px_#0000001A] lg:shadow-none"
    >


      {/* PROFILE PIC + NAME + TIMEZONE */}
      <div className="flex gap-4 lg:gap-[10px]">
        <Image 
          src="/default_avatar.png"
          width={84}
          height={84}
          alt="Profile picture"
          className="h-[84px] w-[84px] rounded-full object-cover lg:h-[46px] lg:w-[46px]"
        />

        <div className="flex flex-col gap-1 lg:gap-0">
          <Typography variant="title-2" color="neutral-800">Somchai Alene</Typography>
          <Typography variant="body-3" color="neutral-300">Asia/Thai GMT +7:00</Typography>
        </div>
      </div>

      {/* TOTAL BALANCE */}
      <div className="w-full flex justify-between items-center">
        <Typography variant="body-3" color="neutral-500">Total balance</Typography>
        <Typography variant="title-2" color="deep-royal-indigo-500">฿123,000,000</Typography>
      </div>

      {/* TOP UP WALLET BUTTON */}
      <BaseButton>
        Top Up Wallet
      </BaseButton>
    </div>
  )
}
