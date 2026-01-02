"use client"
import Typography from "@/components/base/Typography"
import { ScanQrCode } from "lucide-react";
import { AmexIcon, DiscoverIcon, MastercardIcon, VisaIcon } from "@/components/icons/common";
import BillingCardActionMenu from "./BillingCardActionMenu";

interface BillingMethodCardI {
  fullName: string;
  lastFourDigits: string;
  isDefault: boolean;
  cardType: string;
  onSetDefault?: () => void;
  onDelete?: () => void;
}

function getCardIcon(cardType: string) {
  const normalizedType = cardType.toUpperCase().trim();
  
  if (normalizedType.includes('PROMPTPAY') || normalizedType.includes('QR')) {
    return <ScanQrCode className="w-6 h-6 text-neutral-500" />;
  }
  if (normalizedType.includes('VISA') ) {
    return <VisaIcon width={27} height={20} />;
  }
  if (normalizedType.includes('MASTERCARD') || normalizedType.includes('MASTER')) {
    return <MastercardIcon width={27} height={20} />;
  }
  if (normalizedType.includes('AMEX') || normalizedType.includes('AMERICAN EXPRESS')) {
    return <AmexIcon width={27} height={20} />;
  }
  if (normalizedType.includes('DISCOVER')) {
    return <DiscoverIcon width={27} height={20} />;
  }
  
  return null;
}

export default function BillingMethodCard({
  fullName,
  lastFourDigits,
  isDefault,
  cardType,
  onSetDefault,
  onDelete,
}: BillingMethodCardI) {
  return (
    <div className="rounded-lg bg-white border border-neutral-50 px-4 py-3 flex flex-col gap-1">

      <div className="w-full inline-flex space-between items-center gap-2">
        <div className="w-full flex justify-start items-center gap-2">
          <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
            { fullName }
          </Typography>

          {isDefault && (
            <div className="rounded-[4px] py-[2px] px-2 bg-electric-violet-25">
              <Typography variant={{ base: "body-4" }} color="electric-violet-400">
                Default
              </Typography>
            </div>
          )}
        </div>
        
        <BillingCardActionMenu 
          onSetDefault={onSetDefault}
          onDelete={onDelete}
        />

      </div>

      <div className="w-full flex justify-start items-center gap-2">
        {getCardIcon(cardType)}

        <Typography variant={{ base: "body-4", lg: "label-3" }} color="neutral-700">
          •••• {lastFourDigits}
        </Typography>
      </div>
    </div>
  )
}