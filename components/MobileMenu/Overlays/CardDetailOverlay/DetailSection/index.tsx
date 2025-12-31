import Typography from "@/components/base/Typography";
import DetailRow from "./DetailRow";

interface DetailSectionI {
  lastFourDigits: string;
  cardType: string;
}

export default function DetailSection({
  lastFourDigits,
  cardType
}: DetailSectionI) {
  return (
    <div className="py-5 px-4 w-full flex flex-col gap-6">
      <Typography variant="label-2" color="neutral-800">
        Details
      </Typography>

      <div className="w-full flex flex-col gap-3">
        <DetailRow 
          type="CARD_NUMBER"
          label={"************" + lastFourDigits}
        />

        <div className="w-full border-t border-neutral-50" />

        <DetailRow 
          type="CARD_TYPE"
          label={cardType}
        />
      </div>
    </div>
  )
}