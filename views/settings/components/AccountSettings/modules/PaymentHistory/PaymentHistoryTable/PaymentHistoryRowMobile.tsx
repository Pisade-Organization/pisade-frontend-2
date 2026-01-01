import { Dot, ScanQrCode } from "lucide-react";
import Typography from "@/components/base/Typography";
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types";
import { AmexIcon, DiscoverIcon, MastercardIcon, VisaIcon } from "@/components/icons/common";

interface PaymentHistoryRowMobileI {
  date: string;
  time: string;
  price: number;
  lastFourDigits?: string;
  cardType: string;
  status: PaymentStatus;
}

function getCardIcon(cardType: string) {
  const normalizedType = cardType.toUpperCase().trim();
  
  if (normalizedType.includes('PROMPTPAY') || normalizedType.includes('QR')) {
    return <ScanQrCode className="w-6 h-6 text-neutral-500" />;
  }
  if (normalizedType.includes('VISA')) {
    return <VisaIcon width={24} height={16} />;
  }
  if (normalizedType.includes('MASTERCARD') || normalizedType.includes('MASTER')) {
    return <MastercardIcon width={24} height={16} />;
  }
  if (normalizedType.includes('AMEX') || normalizedType.includes('AMERICAN EXPRESS')) {
    return <AmexIcon width={24} height={16} />;
  }
  if (normalizedType.includes('DISCOVER')) {
    return <DiscoverIcon width={24} height={16} />;
  }
  
  return null;
}

function getStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.COMPLETE:
      return "Complete";
    case PaymentStatus.PROCESSING:
      return "Processing";
    case PaymentStatus.FAILED:
      return "Failed";
    default:
      return status;
  }
}

export default function PaymentHistoryRowMobile({
  date,
  time,
  price,
  lastFourDigits,
  cardType,
  status
}: PaymentHistoryRowMobileI) {
  const cardIcon = getCardIcon(cardType);
  
  return (
    <div className="w-full pt-4 pb-5 border-b border-neutral-50">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="inline-flex gap-1">
            <Typography variant={{ base: "label-3" }} color="neutral-500">
              { date }
            </Typography>

            <Dot className="w-1 h-1 text-neutral-500"/>

            <Typography variant={{ base: "label-3" }} color="neutral-500">
              { time }
            </Typography>
          </div>

          <div className="inline-flex gap-1">
            {cardIcon && (
              <div className="flex items-center">
                {cardIcon}
              </div>
            )}

            <div className="inline-flex gap-1">
              <Typography variant={{ base: "label-3" }} color="neutral-700">
                { cardType }
              </Typography>

              {lastFourDigits && (
                <Typography variant={{ base: "body-3" }} color="neutral-500">
                  *****{lastFourDigits}
                </Typography>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <Typography variant={{ base: "title-2" }} color="neutral-700">
            { price }฿
          </Typography>

          <div className="flex items-center gap-1">
            <Dot className={
              "w-1 h-1 " + (
                status === PaymentStatus.COMPLETE ? "text-green-normal" :
                status === PaymentStatus.PROCESSING ? "text-yellow-normal" :
                status === PaymentStatus.FAILED ? "text-red-normal" :
                "text-neutral-500"
              )
            } />
            <Typography
              variant={{ base: "label-4" }}
              color={
                status === PaymentStatus.COMPLETE
                  ? "green-normal"
                  : status === PaymentStatus.PROCESSING
                  ? "yellow-normal"
                  : status === PaymentStatus.FAILED
                  ? "red-normal"
                  : "neutral-500"
              }
            >
              {getStatusLabel(status)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

