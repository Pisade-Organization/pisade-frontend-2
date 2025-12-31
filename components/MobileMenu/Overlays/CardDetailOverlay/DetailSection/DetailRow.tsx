import { CreditCard, WalletCards } from "lucide-react";
import Typography from "@/components/base/Typography";

interface DetailRowI {
  type: "CARD_NUMBER" | "CARD_TYPE"
  label: string;
}

export default function DetailRow({
  type,
  label
}: DetailRowI) {
  return (
    <div className="w-full flex justify-start items-center">
      
      {/* ICON */}
      {type === "CARD_NUMBER" && <CreditCard size={24} className="text-neutral-500" />}
      {type === "CARD_TYPE" && <WalletCards size={24} className="text-neutral-500" />}
    
      {/* TITLE + LABEL */}
      <div className="flex flex-col gap-1">
        <Typography variant="body-4" color="neutral-400">
          {type === "CARD_NUMBER" && "Card number"}
          {type === "CARD_TYPE" && "Card type"}
        </Typography>

        <Typography variant="title-3" color="neutral-500">
          {label}
        </Typography>
      </div>
    </div>

  )
  
}   