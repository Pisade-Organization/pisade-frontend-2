import { NavButtonProps } from "./types";
import { ChevronRight } from "lucide-react";

export default function NextButton({
  onClick
}: NavButtonProps) {
  return (
    <button onClick={onClick}>
      <ChevronRight size={24} className="text-neutral-300" />
    </button>
  )
}