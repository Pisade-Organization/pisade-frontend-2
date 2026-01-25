import clsx from "clsx";

interface RadioIndicatorProps {
  checked: boolean;
}

export default function RadioIndicator({ checked }: RadioIndicatorProps) {
  return (
    <div 
      className={clsx(
        "h-[18px] w-[18px] rounded-full flex justify-center items-center border border-neutral-100"
      )}
    >
      
      <div className={clsx("w-3 h-3 rounded-full transition-all",
        checked ? "bg-electric-violet-500" : "bg-white"
      )} />
    </div>
  )
}