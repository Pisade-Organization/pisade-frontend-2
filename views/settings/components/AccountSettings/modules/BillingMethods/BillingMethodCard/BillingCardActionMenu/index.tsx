"use client"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Typography from "@/components/base/Typography"

import { EllipsisVertical } from "lucide-react"

interface BillingCardActionMenuProps {
  onSetDefault?: () => void
  onDelete?: () => void
}

export default function BillingCardActionMenu({
  onSetDefault,
  onDelete,
}: BillingCardActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSetDefault = () => {
    if (onSetDefault) {
      onSetDefault()
    }
    setIsOpen(false)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    }
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button>
          <EllipsisVertical className="w-4 h-4 text-neutral-200" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-auto rounded-xl bg-white border border-neutral-50 p-0">
        
        <button 
          className="rounded-t-xl w-full bg-white py-[10px] px-4 flex justify-center items-center hover:bg-neutral-50 transition-all"
          onClick={handleSetDefault}
        >
          <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-700">
            Set as default
          </Typography>
        </button>

        <div className="w-full border-t border-neutral-50"/>

        <button 
          className="rounded-b-xl w-full  bg-white py-[10px] px-4 hover:bg-neutral-50 transition-all"
          onClick={handleDelete}
        >
          <Typography variant={{ base: "body-3", lg: "body-2" }} color="red-normal">
            Delete card
          </Typography>
        </button>


      </PopoverContent>
    </Popover>
  )
}