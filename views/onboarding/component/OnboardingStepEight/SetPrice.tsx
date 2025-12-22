import BaseInput from "@/components/base/BaseInput"
import Typography from "@/components/base/Typography"

export default function SetPrice({
  lessonPrice,
  setLessonPrice
}: {
  lessonPrice: string;
  setLessonPrice: (price: string) => void;
}) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setLessonPrice(numericValue);
  };

  return (
    <div className="bg-white rounded-t-[20px] 
    flex flex-col
    pt-4 pb-5 lg:py-5 px-4 lg:px-8 gap-5 lg:gap-4">
      {/* TITLE */}
      <div className="flex flex-col gap-[2px] lg:gap-1"> 
        <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">Set your 50 minutes lesson price</Typography>
        <Typography variant="body-3" color="neutral-400">
          Starting with a competitive price can help attract more students. Once you've aced your first few trial lessons, feel free to adjust this price to meet your goals.
        </Typography>
      </div>

      <div className="flex flex-col gap-1">
        <BaseInput
          leftIcon={
            <Typography variant="body-3" color="neutral-700">
              ฿
            </Typography>
          }
          placeholder="Enter Amount"
          value={lessonPrice}
          onChange={handlePriceChange}
        />

        <Typography variant="body-4" color="neutral-300">
          Price in THB only · We recommend you to set your initial lesson price to 100฿
        </Typography>
      </div>
    </div>
  )
}