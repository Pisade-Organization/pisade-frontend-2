"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Trash2 } from "lucide-react"

interface DeleteCardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void
  cardInfo?: {
    lastFourDigits?: string
    cardType?: string
  }
}

export default function DeleteCardDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteCardDialogProps) {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleConfirm = () => {
    // TODO: Handle card deletion
    if (onConfirm) {
      onConfirm()
    }
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          [&>button]:hidden
          rounded-2xl sm:rounded-2xl
          p-0
          w-[343px]
          lg:w-[477px]
        "
      >
        {/* Dialog Title for accessibility - visually hidden since there's a visible title */}
        <DialogTitle className="sr-only">
          Delete Card
        </DialogTitle>

        <div className="w-full pt-6 pb-4 px-5 flex flex-col items-center gap-5 rounded-2xl border border-neutral-50 bg-white">

          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-red-light flex justify-center items-center p-[14px]">
              <Trash2 className="w-7 h-7 text-red-normal"/>
            </div>

            <Typography variant={{ base: "headline-5" }} color="neutral-900">
              Delete this card?
            </Typography>

            <Typography variant={{ base: "body-3" }} color="neutral-500" className="text-center">
              Are you sure you want to delete this card? <br/>
              This action cannot be undone.
            </Typography>
          </div>

          {/* CTA */}
          <div className="w-full grid grid-cols-2 gap-4">
            <BaseButton variant="secondary" typeStyle="borderless">
              Cancel
            </BaseButton>

            <BaseButton typeStyle="outline" 
              className="bg-white text-red-normal border-red-normal hover:bg-white hover:text-red-normal hover:border-red-normal lg:hover:bg-red-normal lg:hover:text-white lg:hover:border-red-normal"
            >
              Delete
            </BaseButton>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}
