"use client"
import { useState, useLayoutEffect, useEffect } from "react"
import BillingMethodsHeader from "./BillingMethodsHeader"
import BillingMethodCard from "./BillingMethodCard"
import BaseButton from "@/components/base/BaseButton"
import { Plus } from "lucide-react"
import DesktopAddBillingMethodDialog from "./AddBillingMethod/DesktopAddBillingMethodDialog"
import MobileAddBillingMethodPage from "./AddBillingMethod/MobileAddBillingMethodPage"
import DeleteCardDialog from "./DeleteCardDialog"

export default function BillingMethods() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobilePageOpen, setIsMobilePageOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCardForDelete, setSelectedCardForDelete] = useState<{
    lastFourDigits: string
    cardType: string
    index: number
  } | null>(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024
    }
    return false
  })

  // Detect mobile - use useLayoutEffect for immediate synchronous update
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Prevent body scroll when mobile page is open
  useEffect(() => {
    if (isMobile && isMobilePageOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, isMobilePageOpen])

  const handleAddMethod = () => {
    if (isMobile) {
      setIsMobilePageOpen(true)
    } else {
      setIsDialogOpen(true)
    }
  }

  const handleDeleteCard = (index: number) => {
    const card = mockBillingMethods[index]
    setSelectedCardForDelete({
      lastFourDigits: card.lastFourDigits,
      cardType: card.cardType,
      index,
    })
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedCardForDelete) {
      // TODO: Call API to delete card
      console.log("Deleting card:", selectedCardForDelete)
      // await deleteBillingMethod(selectedCardForDelete.index)
      
      // For now, just close the dialog
      setIsDeleteDialogOpen(false)
      setSelectedCardForDelete(null)
    }
  }

  const handleSetDefault = (index: number) => {
    // TODO: Call API to set card as default
    console.log("Setting card as default:", index)
    // await setDefaultBillingMethod(index)
  }

  // Mock data - replace with actual data from API/state
  const mockBillingMethods = [
    {
      fullName: "John Doe",
      lastFourDigits: "1627",
      isDefault: true,
      cardType: "Mastercard",
    },
    {
      fullName: "John Doe",
      lastFourDigits: "4532",
      isDefault: false,
      cardType: "Visacard",
    },
  ]

  return (
    <>
      {/* Hide main content when mobile page is open */}
      <div className={`bg-white w-full flex flex-col gap-4 lg:py-8 lg:px-12 rounded-2xl ${isMobile && isMobilePageOpen ? 'hidden' : ''}`}>
        <BillingMethodsHeader />

        <div className="w-full flex flex-col gap-3">
          { mockBillingMethods.map((card, index) => (
            <BillingMethodCard
              key={index}
              fullName={card.fullName}
              lastFourDigits={card.lastFourDigits}
              isDefault={card.isDefault}
              cardType={card.cardType}
              onSetDefault={() => handleSetDefault(index)}
              onDelete={() => handleDeleteCard(index)}
            />
          ))}


          <div>
            <BaseButton 
              variant="secondary"
              typeStyle="borderless"
              className=""
              iconLeft={<Plus className="text-deep-royal-indigo-700 w-5 h-5" />}
              onClick={handleAddMethod}
            >
              Add Method
            </BaseButton>
          </div>

        </div>
      </div>

      {/* Desktop: Show Dialog */}
      {!isMobile && (
        <DesktopAddBillingMethodDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      )}

      {/* Mobile: Show Page as Full-Screen Overlay */}
      {isMobile && isMobilePageOpen && (
        <MobileAddBillingMethodPage 
          onBack={() => setIsMobilePageOpen(false)}
        />
      )}

      {/* Delete Card Dialog */}
      <DeleteCardDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        cardInfo={selectedCardForDelete ? {
          lastFourDigits: selectedCardForDelete.lastFourDigits,
          cardType: selectedCardForDelete.cardType,
        } : undefined}
      />
    </>
  )
}
