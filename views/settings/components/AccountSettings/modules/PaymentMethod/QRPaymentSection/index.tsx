"use client"
import { useState } from "react"
import QRPaymentSectionTitle from "./QRPaymentSectionTitle"
import QRPaymentCard from "./QRPaymentCard"
import PromptPayTopUpDialog from "./PromptPayTopUpDialog"

export default function QRPaymentSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="w-full flex flex-col gap-2">
      <QRPaymentSectionTitle />
      <QRPaymentCard onClick={() => setIsDialogOpen(true)} />
      <PromptPayTopUpDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  )
}