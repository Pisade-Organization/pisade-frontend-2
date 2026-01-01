"use client"
import { useState } from "react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import DeleteAccountFlow from "./DeleteAccountFlow"
import DeleteAccountHeader from "./DeleteAccountHeader"

export default function DeleteAccountSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="w-full flex justify-center lg:justify-between items-center bg-white lg:py-8 lg:px-12 rounded-b-2xl">
        <DeleteAccountHeader />

        <BaseButton 
          typeStyle={{ base: "borderless", lg: "outline" }} 
          textColor="red-normal" 
          borderColor="red-normal"
          className="hover:bg-red-normal hover:text-white w-full lg:w-auto"
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