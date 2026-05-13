"use client"

import { forwardRef, useImperativeHandle, useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

export interface CardFormHandle {
  createPaymentMethod: () => Promise<string>
}

const CardForm = forwardRef<CardFormHandle>(function CardForm(_, ref) {
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    async createPaymentMethod() {
      if (!stripe || !elements) {
        throw new Error("Stripe is not ready. Please try again.")
      }
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error("Card form is not ready. Please try again.")
      }
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      })
      if (error) {
        throw new Error(error.message ?? "Invalid card details. Please check and try again.")
      }
      return paymentMethod.id
    },
  }))

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full rounded-xl border border-neutral-100 py-3 px-4">
        <CardElement
          onChange={(e) => setCardError(e.error?.message ?? null)}
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#18181b",
                fontFamily: "inherit",
                "::placeholder": { color: "#a1a1aa" },
              },
              invalid: { color: "#ef4444" },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      {cardError ? (
        <p className="text-xs text-red-500 px-1">{cardError}</p>
      ) : null}
    </div>
  )
})

export default CardForm
