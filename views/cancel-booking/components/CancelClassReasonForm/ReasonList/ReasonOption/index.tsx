import type { ReasonOptionProps } from "./types";
import RadioIndicator from "./RadioIndicator";
import ReasonLabel from "./ReasonLabel";
import clsx from "clsx";

export default function ReasonOption({
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
        "w-full flex justify-start items-center gap-2 lg:gap-5 px-3 py-[10px] lg:px-5 lg:py-4 bg-white rounded-xl border transition-all",
        selected ? "border-electric-violet-100" : "border-neutral-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <RadioIndicator checked={selected} />
      <ReasonLabel label={label} />
    </button>
  )
}