"use client";

import RangeSlider from "react-range-slider-input";
import 'react-range-slider-input/dist/style.css';

export default function PriceRangeSlider({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  minPrice: number;
  setMinPrice: (minPrice: number) => void;
  maxPrice: number;
  setMaxPrice: (maxPrice: number) => void;
}) {
  const ABS_MIN = 0;
  const ABS_MAX = 3000;

  return (
    <div className="flex justify-center items-center gap-x-4 w-full">
      {/* Min box */}
      <div className="flex justify-center items-center text-neutral-700 text-body-2 gap-x-[2px] bg-[#F8F8F8] py-2 px-4 rounded-[12px]">
        <span>$</span>
        <span>{minPrice}</span>
      </div>

      {/* Two-thumb slider */}
      <div className="flex-1 px-4">
        <RangeSlider
          min={ABS_MIN}
          max={ABS_MAX}
          step={1}
          value={[minPrice, maxPrice]}
          onInput={([low, high]) => {
            setMinPrice(low);
            setMaxPrice(high);
          }}
          className="custom-slider"
        />
      </div>

      {/* Max box */}
      <div className="flex justify-center items-center gap-x-[2px] text-neutral-700 text-body-2 bg-[#F8F8F8] py-2 px-4 rounded-[12px]">
        <span>$</span>
        <span>{maxPrice}</span>
      </div>

      {/* Tailwind overrides */}
      <style jsx global>{`
        .custom-slider {
          height: 4px;
        }
        .custom-slider .range-slider__thumb {
          width: 12px;
          height: 12px;
          background: #6D08E8;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }
        .custom-slider .range-slider__range {
          background-color: #7a5af8;
        }
        .custom-slider .range-slider__track {
          background-color: #e5e5e5;
        }
      `}</style>
    </div>
  );
}
