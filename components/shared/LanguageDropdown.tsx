import Typography from "../base/Typography"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LanguageDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-[10px] rounded-[8px] border border-neutral-50 py-[10px] px-3">
          <Typography variant="label-3" color="neutral-700">EN</Typography>
          <ChevronDown size={20} className="text-neutral-300"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        <DropdownMenuLabel className="cursor-pointer text-center">EN</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuLabel className="cursor-pointer text-center">TH</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}