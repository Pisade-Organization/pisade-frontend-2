import { NavButtonProps } from "./types";
import { ChevronLeft } from "lucide-react";

export default function PrevButton({
  onClick
}: NavButtonProps) {
  return (
    <button onClick={onClick}>
      <ChevronLeft size={24} className="text-neutral-300" />
    </button>
  )
}