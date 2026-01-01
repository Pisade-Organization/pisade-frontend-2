import { Dot, ScanQrCode } from "lucide-react";
import Typography from "@/components/base/Typography";
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types";
import { AmexIcon, DiscoverIcon, MastercardIcon, VisaIcon } from "@/components/icons/common";

interface PaymentHistoryRowDesktopI {
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
    return <VisaIcon width={35} height={24} />;
  }
  if (normalizedType.includes('MASTERCARD') || normalizedType.includes('MASTER')) {
    return <MastercardIcon width={35} height={24} />;
  }
  if (normalizedType.includes('AMEX') || normalizedType.includes('AMERICAN EXPRESS')) {
    return <AmexIcon width={35} height={24} />;
  }
  if (normalizedType.includes('DISCOVER')) {
    return <DiscoverIcon width={35} height={24} />;
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

export default function PaymentHistoryRowDesktop({
  date,
  time,
  price,
  lastFourDigits,
  cardType,
  status
}: PaymentHistoryRowDesktopI) {
  const cardIcon = getCardIcon(cardType);
  
  return (
    <tr className="border-b border-neutral-50">
      <td className="py-4 px-4">
        <div className="inline-flex gap-1">
          <Typography variant="body-3" color="neutral-500">
            { date }
          </Typography>
          <Dot className="w-1 h-1 text-neutral-500"/>
          <Typography variant="body-3" color="neutral-500">
            { time }
          </Typography>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="inline-flex items-center gap-2">
          {cardIcon && (
            <div className="flex items-center">
              {cardIcon}
            </div>
          )}
          <div className="inline-flex gap-1">
            <Typography variant="body-3" color="neutral-700">
              { cardType }
            </Typography>
            {lastFourDigits && (
              <Typography variant="body-3" color="neutral-500">
                *****{lastFourDigits}
              </Typography>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <Typography variant="title-2" color="neutral-700">
          { price }฿
        </Typography>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="inline-flex items-center gap-1 justify-end">
          <Dot className={
            "w-5 h-5 " + (
              status === PaymentStatus.COMPLETE ? "text-green-normal" :
              status === PaymentStatus.PROCESSING ? "text-yellow-normal" :
              status === PaymentStatus.FAILED ? "text-red-normal" :
              "text-neutral-500"
            )
          } />
            <Typography
              variant="label-4"
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
      </td>
    </tr>
  )
}

