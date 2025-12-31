import CardDetailHeader from "./CardDetailHeader";
import CardDisplaySection from "./CardDisplaySection";
import DetailSection from "./DetailSection";
import OthersSection from "./OthersSection";

interface CardDetailOverlayI {
  bankName: string;
  lastFourDigits: string;
  expiryDate: string;
  isActive: boolean;
  cardType: string;
  isDefault: boolean;
}

export default function CardDetailOverlay({
  bankName,
  lastFourDigits,
  expiryDate,
  isActive,
  cardType,
  isDefault
}: CardDetailOverlayI) {
  return (
    <div className="
    rounded-t-2xl border border-neutral-50 bg-white pt-4
    ">

      <CardDetailHeader />
      <CardDisplaySection 
        isActive={isActive}
        bankName={bankName}
        lastFourDigits={lastFourDigits}
        expiryDate={expiryDate}
      />
      <DetailSection 
        lastFourDigits={lastFourDigits}
        cardType={cardType}
      />
      <OthersSection 
        isDefault={isDefault}
      />

    </div>
  )
}