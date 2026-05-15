"use client"

import { useState } from "react"
import PaymentMethodTitle from "./PaymentMethodTitle"
import QRPaymentSection from "./QRPaymentSection"
import PaymentHistory from "../PaymentHistory"
import BillingMethodCard from "../BillingMethods/BillingMethodCard"
import DeleteCardDialog from "../BillingMethods/DeleteCardDialog"
import DesktopAddBillingMethodDialog from "../BillingMethods/AddBillingMethod/DesktopAddBillingMethodDialog"
import MobileAddBillingMethodPage from "../BillingMethods/AddBillingMethod/MobileAddBillingMethodPage"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { Plus } from "lucide-react"
import { usePaymentMethods } from "@/hooks/payments/usePaymentMethods"
import { useRemovePaymentMethod, useSetDefaultPaymentMethod } from "@/hooks/payments/usePaymentMethodsMutations"
import { getCardBrandDisplayName } from "@/services/payments"

export default function PaymentMethod() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isMobileAddOpen, setIsMobileAddOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: paymentMethods = [], isLoading } = usePaymentMethods()
  const removeMethod = useRemovePaymentMethod()
  const setDefault = useSetDefaultPaymentMethod()

  const handleDelete = async () => {
    if (!deletingId) return
    await removeMethod.mutateAsync(deletingId)
    setDeletingId(null)
  }

  return (
    <div className="py-2 w-full flex flex-col gap-4 rounded-2xl lg:py-8 lg:px-12 bg-white">
      <PaymentMethodTitle />
      <QRPaymentSection />

      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Typography variant={{ base: "label-2", lg: "label-1" }} color="neutral-800">
            Saved Cards
          </Typography>

          <BaseButton
            variant="secondary"
            typeStyle="outline"
            iconLeft={<Plus className="h-4 w-4" />}
            className="hidden lg:flex"
            onClick={() => setIsAddOpen(true)}
          >
            Add card
          </BaseButton>

          <BaseButton
            variant="secondary"
            typeStyle="outline"
            iconLeft={<Plus className="h-4 w-4" />}
            className="flex lg:hidden"
            onClick={() => setIsMobileAddOpen(true)}
          >
            Add card
          </BaseButton>
        </div>

        {isLoading ? (
          <Typography variant={{ base: "body-3" }} color="neutral-400">
            Loading saved cards...
          </Typography>
        ) : paymentMethods.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-100 px-4 py-5">
            <Typography variant={{ base: "body-3" }} color="neutral-500">
              No saved cards yet. Add a card to pay for lessons quickly at checkout.
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <BillingMethodCard
                key={method.id}
                fullName={getCardBrandDisplayName(method.brand)}
                lastFourDigits={method.last4}
                isDefault={method.isDefault}
                cardType={method.brand}
                onSetDefault={() => setDefault.mutate(method.id)}
                onDelete={() => setDeletingId(method.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full">
        <PaymentHistory />
      </div>

      <DesktopAddBillingMethodDialog open={isAddOpen} onOpenChange={setIsAddOpen} />

      {isMobileAddOpen && (
        <MobileAddBillingMethodPage onBack={() => setIsMobileAddOpen(false)} />
      )}

      <DeleteCardDialog
        open={!!deletingId}
        onOpenChange={(open) => { if (!open) setDeletingId(null) }}
        onConfirm={handleDelete}
      />
    </div>
  )
}
