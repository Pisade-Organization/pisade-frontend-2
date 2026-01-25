import RadioIndicator from "../ReasonOption/RadioIndicator";
import ReasonLabel from "../ReasonOption/ReasonLabel";
import type { ReasonOptionProps } from "../ReasonOption/types";
import clsx from "clsx";

interface Props {
  id: string;
  selected: boolean;
  value: string;
  onSelect: (v: string) => void;
  onChange: (v: string) => void;
  disabled?: boolean;
}

export function OtherOption({
  id,
  label,
  selected,
  disabled,
  onSelect
}: ReasonOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      disabled={disabled}
      className={clsx(
        "w-full flex justify-start items-center gap-2 lg:gap-5 px-3 py-[10px] lg:px-5 lg:py-4 bg-white rounded-xl border",
        selected ? "border-electric-violet-100" : "border-neutral-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <RadioIndicator checked={selected} />

      <div className="w-full flex flex-col items-start gap-1">
        <ReasonLabel label={label} />
        <input 
          type="text" 
          className="w-full text-neutral-300 text-body-3 lg:text-body-2 outline-none" 
          placeholder="Enter here..." 
        />
      </div>
    </button>
  )
}