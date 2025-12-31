import Typography from "@/components/base/Typography";
import { ActiveBadge } from "./ActiveBadge";

interface CardDisplayI {
  isActive: boolean;
  bankName: string;
  lastFourDigits: string;
  expiryDate: string;
}

export default function CardDisplaySection({
  isActive,
  bankName,
  lastFourDigits,
  expiryDate
}: CardDisplayI) {
  return (
    <div className="py-5 px-4">
      <div className="rounded-2xl py-6 px-8 flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          {/* TODO: INSERT IMAGE OF CARD TYPE */}
          {isActive && <ActiveBadge />}
        </div>

        <div className="w-full text-start">
          <Typography variant="label-1" color="neutral-700">
            { bankName }
          </Typography>
        </div>

        <div className="w-full flex justify-between items-center">
          <Typography variant="label-3" color="neutral-500">
            ************{lastFourDigits}
          </Typography>

          <Typography variant="body-3" color="neutral-500"> 
            { expiryDate }
          </Typography>
        </div>
      </div>
    </div>
  )
}