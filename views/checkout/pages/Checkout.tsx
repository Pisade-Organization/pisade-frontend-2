"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import CheckoutMobileHeader from "../components/CheckoutMobileHeader"
import BookingSummary from "@/components/shared/BookingSummary"
import PaymentMethodSelector, {
  PAYMENT_METHODS,
} from "../components/PaymentDetailsSection/PaymentMethodSelector"
import PaymentMethodSelectorHeader from "../components/PaymentDetailsSection/PaymentMethodSelectorHeader"
import Navbar from "@/components/Navbar"
import SaveThisMethodSelect from "../components/SaveThisMethodSelect"
import PaymentConfirmationNotice from "../components/PaymentConfirmationNotice"
import PayButton from "../components/PayButton"
import type { PaymentMethodSelectorI } from "../components/PaymentDetailsSection/PaymentMethodSelector/types"
import { useBookingDetail } from "@/hooks/bookings/queries"
import { useCheckoutBooking } from "@/hooks/bookings/mutations"
import {
  DesktopOnly,
  MobileOnly,
  PageContainer,
  PageRoot,
  SummaryPanel,
  TwoColumnLayout,
} from "@/components/layout/PagePrimitives"

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeInstance
  }
}

interface StripeCardElement {
  mount: (selector: string) => void
  destroy: () => void
}

interface StripeElements {
  create: (type: "card", options?: unknown) => StripeCardElement
}

interface StripeInstance {
  elements: () => StripeElements
  createPaymentMethod: (params: {
    type: "card"
    card: StripeCardElement
  }) => Promise<{
    error?: { message?: string }
    paymentMethod?: { id: string }
  }>
  confirmCardPayment: (clientSecret: string) => Promise<{
    error?: { message?: string }
    paymentIntent?: { status?: string }
  }>
}

type PaymentMethod = PaymentMethodSelectorI["method"]

interface CheckoutResult {
  status?: string
  payment?: {
    clientSecret?: string | null
    qrCodeUrl?: string | null
  }
}

const STRIPE_SCRIPT_ID = "stripe-js-sdk"
const STRIPE_CARD_ELEMENT_ID = "#stripe-card-element"

export default function Checkout() {
  const router = useRouter()
  const params = useParams()
  const bookingId = params?.bookingId as string | undefined
  const locale = (params?.locale as string | undefined) ?? "en"
  const { data: booking } = useBookingDetail(bookingId)
  const checkoutMutation = useCheckoutBooking(bookingId)
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  const stripeRef = useRef<StripeInstance | null>(null)
  const cardElementRef = useRef<StripeCardElement | null>(null)

  const lessonStart = booking ? new Date(booking.schedule.startTime) : new Date()
  const lessonEnd = booking ? new Date(booking.schedule.endTime) : new Date()
  const startTime = lessonStart.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const endTime = lessonEnd.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const lessonPrice = booking?.pricing.amount ?? 0
  const processingFee = 0
  const totalAmount = lessonPrice + processingFee

  const [isStripeReady, setIsStripeReady] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("CARD")
  const [localError, setLocalError] = useState<string | null>(null)
  const [promptPayQrUrl, setPromptPayQrUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!stripePublishableKey) return

    const initializeStripe = () => {
      if (!window.Stripe) {
        setLocalError("Stripe SDK failed to load.")
        return
      }

      stripeRef.current = window.Stripe(stripePublishableKey)
      setIsStripeReady(true)
    }

    if (window.Stripe) {
      initializeStripe()
      return
    }

    const existingScript = document.getElementById(STRIPE_SCRIPT_ID)
    if (existingScript) {
      existingScript.addEventListener("load", initializeStripe)
      return () => {
        existingScript.removeEventListener("load", initializeStripe)
      }
    }

    const script = document.createElement("script")
    script.id = STRIPE_SCRIPT_ID
    script.src = "https://js.stripe.com/v3"
    script.async = true
    script.addEventListener("load", initializeStripe)
    document.body.appendChild(script)

    return () => {
      script.removeEventListener("load", initializeStripe)
    }
  }, [stripePublishableKey])

  useEffect(() => {
    if (!isStripeReady || selectedPaymentMethod !== "CARD") {
      if (cardElementRef.current) {
        cardElementRef.current.destroy()
        cardElementRef.current = null
      }
      return
    }

    if (!stripeRef.current || cardElementRef.current) {
      return
    }

    const cardContainer = document.querySelector(STRIPE_CARD_ELEMENT_ID)
    if (!cardContainer) {
      return
    }

    const elements = stripeRef.current.elements()
    const cardElement = elements.create("card", {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: "16px",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          "::placeholder": {
            color: "#a3a3a3",
          },
        },
      },
    })

    cardElement.mount(STRIPE_CARD_ELEMENT_ID)
    cardElementRef.current = cardElement

    return () => {
      if (cardElementRef.current) {
        cardElementRef.current.destroy()
        cardElementRef.current = null
      }
    }
  }, [isStripeReady, selectedPaymentMethod])

  const handlePay = async () => {
    if (!bookingId) return

    setLocalError(null)
    setPromptPayQrUrl(null)

    let paymentMethodId: string | undefined

    if (selectedPaymentMethod === "CARD") {
      if (!isStripeReady || !stripeRef.current || !cardElementRef.current) {
        setLocalError("Stripe is still loading. Please try again.")
        return
      }

      const paymentMethodResult = await stripeRef.current.createPaymentMethod({
        type: "card",
        card: cardElementRef.current,
      })

      if (paymentMethodResult.error) {
        setLocalError(paymentMethodResult.error.message ?? "Unable to read card details.")
        return
      }

      paymentMethodId = paymentMethodResult.paymentMethod?.id
      if (!paymentMethodId) {
        setLocalError("Stripe did not return a payment method id.")
        return
      }
    }

    try {
      const result = (await checkoutMutation.mutateAsync({
        method: selectedPaymentMethod,
        paymentMethodId,
      })) as CheckoutResult

      if (result.status !== "PENDING_TOPUP") {
        router.push(`/${locale}/class-management`)
        return
      }

      if (selectedPaymentMethod === "PROMPTPAY") {
        setPromptPayQrUrl(result.payment?.qrCodeUrl ?? null)
        return
      }

      const clientSecret = result.payment?.clientSecret
      if (!clientSecret) {
        setLocalError("Missing Stripe client secret for card confirmation.")
        return
      }

      if (!stripeRef.current) {
        setLocalError("Stripe is not available right now. Please try again.")
        return
      }

      const confirmation = await stripeRef.current.confirmCardPayment(clientSecret)
      if (confirmation.error) {
        setLocalError(confirmation.error.message ?? "Card confirmation failed.")
        return
      }

      if (confirmation.paymentIntent?.status === "succeeded") {
        router.push(`/${locale}/class-management`)
        return
      }

      setLocalError("Payment is still pending. Please wait for confirmation.")
    } catch {
      setLocalError("Payment failed. Please check your payment details and try again.")
    }
  }

  const isPayDisabled =
    !bookingId ||
    !booking?.allowedActions.pay ||
    (selectedPaymentMethod === "CARD" && !isStripeReady)

  if (!stripePublishableKey) {
    return (
      <PageRoot>
        <PageContainer>
          <p className="px-4 py-8 text-sm text-red-500">
            Stripe publishable key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
          </p>
        </PageContainer>
      </PageRoot>
    )
  }

  return (
    <PageRoot>
      <MobileOnly>
        <CheckoutMobileHeader />
      </MobileOnly>

      <DesktopOnly>
        <Navbar variant="student_dashboard" />
      </DesktopOnly>

      <PageContainer>
        <TwoColumnLayout className="gap-0 lg:gap-10">
          <SummaryPanel>
            <BookingSummary
              variant="checkout"
              tutorName={booking?.tutor.name ?? "Tutor"}
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl={booking?.tutor.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor"}
              subject="Lesson"
              rating={booking?.tutor.rating ?? 0}
              studentsCount={booking?.tutor.studentCount ?? 0}
              lessonsCount={booking?.tutor.lessonCount ?? 0}
              cancellationDeadline={lessonStart}
              lessonName="Booked lesson"
              date={lessonStart}
              startTime={startTime}
              endTime={endTime}
              timezone="Etc/GMT+11"
              lessonPrice={lessonPrice}
              processingFee={processingFee}
              total={totalAmount}
            />
          </SummaryPanel>

          <MobileOnly className="w-screen border-t border-neutral-100" />

          <div className="w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 pb-24 lg:pb-6 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
            <PaymentMethodSelectorHeader />
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />
            <SaveThisMethodSelect />
            <PaymentConfirmationNotice totalAmount={totalAmount} />

            {(checkoutMutation.isError || localError) && (
              <p className="text-sm text-red-500">
                {localError ?? "Payment failed. Please check your payment details and try again."}
              </p>
            )}

            {promptPayQrUrl && (
              <div className="rounded-xl border border-neutral-100 p-4 flex flex-col gap-2 items-start">
                <p className="text-sm text-neutral-700">
                  Scan this PromptPay QR code to complete your payment.
                </p>
                <img
                  src={promptPayQrUrl}
                  alt="PromptPay QR code"
                  className="w-48 h-48 object-contain"
                />
              </div>
            )}

            <PayButton
              paymentMethod={PAYMENT_METHODS[selectedPaymentMethod]}
              onPay={handlePay}
              isLoading={checkoutMutation.isPending}
              disabled={isPayDisabled}
            />
          </div>
        </TwoColumnLayout>
      </PageContainer>
    </PageRoot>
  )
}
