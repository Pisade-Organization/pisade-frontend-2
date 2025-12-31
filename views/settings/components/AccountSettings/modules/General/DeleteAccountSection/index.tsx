"use client"
import { useState } from "react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import DeleteAccountFlow from "./DeleteAccountFlow"

export default function DeleteAccountSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Typography variant="title-1" color="neutral-900">
          Delete account
        </Typography>

        <BaseButton 
          typeStyle={{ base: "borderless", lg: "outline" }} 
          textColor="red-normal" 
          borderColor="red-normal"
          onClick={() => setIsDialogOpen(true)}
        >
          Delete my account
        </BaseButton>
      </div>

      <DeleteAccountFlow 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  )
}