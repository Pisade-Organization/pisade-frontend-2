import Typography from "@/components/base/Typography"
import { ScanQrCode } from "lucide-react"
import { ChevronRight } from "lucide-react"

interface QRPaymentCardProps {
  onClick: () => void
}

export default function QRPaymentCard({ onClick }: QRPaymentCardProps) {
  return (
    <div 
      className="rounded-xl border border-neutral-50 p-3 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors gap-4"
      onClick={onClick}
    >
      <ScanQrCode  className="w-6 h-6 text-neutral-500"/>

      <div className="w-full flex flex-col">
        <Typography variant={{ base: "title-3" }} color="neutral-500">
          Promptpay QR
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-400">
          Top up via QR code
        </Typography>
      </div>

      <div className="w-9 h-9 flex justify-center items-center">
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-300"/>
      </div>
    </div>
  )
}